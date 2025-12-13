import { useRef, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { Printer, Menu } from 'lucide-react';
import type { CVData } from './types';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import { useCVStorage } from './hooks/useCVStorage';
import { Sidebar } from './components/Sidebar';

const emptyCV: CVData = {
  fullName: '',
  address: '',
  phone: '',
  email: '',
  linkedin: '',
  objective: '',
  education: [],
  experience: [],
  skills: '',
};

function App() {
  const { cvs, activeId, activeCV, setActiveId, createCV, updateCV, deleteCV } =
    useCVStorage();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { register, control, reset } = useForm<CVData>({
    defaultValues: activeCV || emptyCV,
  });

  // Reset form when active CV changes
  // Reset form when active CV changes (by ID)
  useEffect(() => {
    if (activeCV) {
      reset(activeCV);
    }
    // We only want to reset when the ID changes, not when the data content changes while editing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, reset]);

  // Watch all fields to update preview and storage
  const data = useWatch({ control }) as CVData;

  // Auto-save changes to storage
  useEffect(() => {
    if (activeId && data) {
      // Debounce could be good here, but for local storage it's fast enough usually
      // We need to avoid saving if data hasn't actually changed or is just initial
      // For now, simplicity: update on change.
      updateCV(activeId, data);
    }
  }, [data, activeId, updateCV]); // Warning: updateCV needs to be stable or this loops. It is stable in hook.

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  if (!activeCV) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

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
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="bg-white shadow p-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 -ml-2 rounded-md hover:bg-gray-100 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                Gerador de Currículo ABNT
              </h1>
            </div>

            <button
              onClick={() => reactToPrintFn()}
              className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-md hover:bg-indigo-700 transition text-sm md:text-base whitespace-nowrap"
            >
              <Printer size={20} />
              <span className="hidden md:inline">Gerar PDF / Imprimir</span>
              <span className="md:hidden">PDF</span>
            </button>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full p-4 lg:p-8 max-w-7xl">
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
                    defaultValue={activeCV.title}
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
                  defaultValues={activeCV}
                  onSubmit={() => {}}
                  register={register}
                  control={control}
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

              {/* The wrapper handles the scaling and overflow for the preview on screen */}
              <div className="overflow-auto border rounded bg-gray-300 p-4 flex justify-center shadow-inner max-h-[calc(100vh-200px)]">
                <CVPreview ref={contentRef} data={data} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
