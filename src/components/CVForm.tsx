import * as React from 'react';
import {
  useFieldArray,
  type Control,
  type UseFormRegister,
  type Path,
} from 'react-hook-form';
import type { CVData } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface CVFormProps {
  defaultValues: CVData;
  onSubmit: (data: CVData) => void;
  register: UseFormRegister<CVData>;
  control: Control<CVData>;
  onSave?: () => void;
}

// Helper for section header
const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3 border-b pb-1">
    {title}
  </h3>
);

export const CVForm: React.FC<CVFormProps> = ({
  register,
  control,
  onSave,
}) => {
  const callSave = () => {
    if (onSave) onSave();
  };

  const reg = (name: Path<CVData>) => ({ ...register(name), onBlur: callSave });
  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({
    control,
    name: 'experience',
  });

  const {
    fields: refFields,
    append: appendRef,
    remove: removeRef,
  } = useFieldArray({
    control,
    name: 'references',
  });

  return (
    <div className="bg-white p-6 shadow rounded-lg space-y-4">
      <SectionHeader title="Dados Pessoais" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            {...reg('fullName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cargo / Posição
          </label>
          <input
            {...reg('jobTitle')}
            placeholder="Ex: Desenvolvedor de Software"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...reg('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            {...reg('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Endereço
          </label>
          <input
            {...reg('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            {...reg('linkedin')}
            placeholder="Ex: linkedin.com/in/seu-perfil"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Portfólio
          </label>
          <input
            {...reg('portfolio')}
            placeholder="Ex: www.seusite.com.br"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
      </div>

      <SectionHeader title="Objetivo Profissional" />
      <div>
        <textarea
          {...reg('objective')}
          rows={3}
          className="mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Descreva seu objetivo profissional..."
        />
      </div>

      <SectionHeader title="Experiência Profissional" />
      {expFields.map((field, index) => (
        <div
          key={field.id}
          className="bg-gray-50 p-4 rounded-md mb-3 border relative"
        >
          <button
            type="button"
            onClick={() => removeExp(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Empresa
              </label>
              <input
                {...reg(`experience.${index}.company`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cargo
              </label>
              <input
                {...reg(`experience.${index}.role`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Início
              </label>
              <input
                {...reg(`experience.${index}.startDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Término
              </label>
              <input
                {...reg(`experience.${index}.endDate`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Descrição das Atividades
              </label>
              <textarea
                {...reg(`experience.${index}.description`)}
                rows={3}
                className="mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendExp({
            id: '',
            role: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
          })
        }
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Experiência
      </button>

      <SectionHeader title="Formação Acadêmica" />
      {eduFields.map((field, index) => (
        <div
          key={field.id}
          className="bg-gray-50 p-4 rounded-md mb-3 border relative"
        >
          <button
            type="button"
            onClick={() => removeEdu(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Curso
              </label>
              <input
                {...reg(`education.${index}.course`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instituição
              </label>
              <input
                {...reg(`education.${index}.institution`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Início
              </label>
              <input
                {...reg(`education.${index}.startDate`)}
                placeholder="Ex: 2018"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Término
              </label>
              <input
                {...reg(`education.${index}.endDate`)}
                placeholder="Ex: 2022"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendEdu({
            id: '',
            course: '',
            institution: '',
            startDate: '',
            endDate: '',
          })
        }
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Formação
      </button>

      <SectionHeader title="Habilidades e Qualificações" />
      <div>
        <textarea
          {...reg('skills')}
          rows={4}
          className="mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Liste suas principais habilidades (uma por linha)..."
        />
      </div>

      <SectionHeader title="Referências" />
      {refFields.map((field, index) => (
        <div
          key={field.id}
          className="bg-gray-50 p-4 rounded-md mb-3 border relative"
        >
          <button
            type="button"
            onClick={() => removeRef(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                {...reg(`references.${index}.name`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                {...reg(`references.${index}.email`)}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                {...reg(`references.${index}.phone`)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          appendRef({
            id: '',
            name: '',
            email: '',
            phone: '',
          })
        }
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Referência
      </button>
    </div>
  );
};
