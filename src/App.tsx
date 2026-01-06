import { useRef, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import type { CVData } from './types';
import { emptyCV } from './data/defaultCV';
import { CVForm } from './components/CVForm';
import { PDFPreview, CVDocument } from './components/PDFPreview';
import { useCVStorage } from './hooks/useCVStorage';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';

function App() {
  const {
    cvs,
    activeId,
    activeCV,
    setActiveId,
    createCV,
    updateCV,
    deleteCV,
    clearAll,
    duplicateCV,
  } = useCVStorage();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const initialValues = activeCV ?? emptyCV;
  const { register, control, reset, getValues } = useForm<CVData>({
    defaultValues: initialValues,
  });

  const skipSaveRef = useRef(false);

  useEffect(() => {
    if (activeCV) {
      skipSaveRef.current = true;
      reset(activeCV);
      const t = setTimeout(() => (skipSaveRef.current = false), 0);
      return () => clearTimeout(t);
    }
  }, [activeId, reset, activeCV]);

  const data = useWatch({ control }) as CVData;

  // Save only on explicit UI events (blur / keyup) triggered from the form.
  const handleSave = () => {
    if (skipSaveRef.current) return;
    if (!activeId || !data) return;
    const current = getValues();
    console.debug('[App] handleSave saving activeId=', activeId, 'education length=', current.education?.length);
    updateCV(activeId, current);
  };

  // Sidebar requests
  const handleRequestDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) deleteCV(pendingDeleteId);
    setPendingDeleteId(null);
    setShowDeleteModal(false);
  };

  const handleRequestClear = () => setShowClearModal(true);

  const handleConfirmClear = () => {
    clearAll();
    setShowClearModal(false);
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const currentCV = activeCV ?? emptyCV;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <Sidebar
        cvs={cvs}
        activeId={activeId}
        onSelect={(id) => {
          setActiveId(id);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        onCreate={() => {
          createCV();
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        onDelete={deleteCV}
        onDuplicate={(id: string) => {
          duplicateCV(id);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }}
        clearAll={clearAll}
        onRequestDelete={handleRequestDelete}
        onRequestClear={handleRequestClear}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Modals rendered at App level so they are outside sidebar stacking context */}
      <div>
        <Modal
          isOpen={showDeleteModal}
          title="Confirmar exclusão"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
        >
          <p>Tem certeza que deseja excluir este currículo?</p>
        </Modal>

        <Modal
          isOpen={showClearModal}
          title="Limpar dados"
          onCancel={() => setShowClearModal(false)}
          onConfirm={handleConfirmClear}
          confirmLabel="Limpar"
          cancelLabel="Cancelar"
        >
          <p>Limpar todos os currículos e restaurar valores padrão?</p>
        </Modal>
      </div>

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="bg-white shadow p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                Gerador de Currículo ABNT
              </h1>
            </div>

            <PDFDownloadLink
              document={<CVDocument data={data} />}
              fileName={`CV_${data.fullName.replaceAll(' ', '_')}.pdf`}
            >
              {({ loading }) => (
                <button
                  disabled={loading}
                  onClick={() => reactToPrintFn()}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-md hover:bg-indigo-700 transition text-sm md:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Printer size={20} />
                  <span className="hidden md:inline">Baixar Currículo</span>
                  <span className="md:hidden">PDF</span>
                </button>
              )}
            </PDFDownloadLink>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Editor Column */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Editar Informações
              </h2>
              <div key={activeId}>
                {/* CV Title Input */}
                <div className="bg-white p-6 shadow rounded-lg mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do documento
                  </label>
                  <input
                    type="text"
                    defaultValue={activeCV?.title ?? 'Novo Currículo'}
                    onBlur={(e) => {
                      if (activeId) {
                        updateCV(activeId, { title: e.target.value });
                      }
                    }}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    placeholder="Ex: Currículo Tech, Currículo Admin..."
                  />
                </div>

                <CVForm
                  defaultValues={currentCV}
                  onSubmit={() => {}}
                  register={register}
                  control={control}
                  onSave={handleSave}
                />
              </div>
            </div>

            {/* Preview Column */}
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-700">
                  Visualização
                </h2>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                  A4 Preview
                </span>
              </div>

              {/* PDF Download Button */}
              <div className="flex justify-center">
                <PDFPreview data={data} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
