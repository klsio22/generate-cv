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

  const {
    fields: customFields,
    append: appendCustom,
    remove: removeCustom,
  } = useFieldArray({
    control,
    name: 'customFields',
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <div className="bg-white p-6 shadow rounded-lg space-y-4">
      <SectionHeader title="Dados Pessoais" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            id="fullName"
            {...reg('fullName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Cargo / Posição
          </label>
          <input
            id="jobTitle"
            {...reg('jobTitle')}
            placeholder="Ex: Desenvolvedor de Software"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            {...reg('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            id="phone"
            {...reg('phone')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Endereço
          </label>
          <input
            id="address"
            {...reg('address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            id="linkedin"
            {...reg('linkedin')}
            placeholder="Ex: linkedin.com/in/seu-perfil"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
          <label htmlFor="linkedinName" className="block text-xs font-medium text-gray-600 mt-2">Nome a exibir (LinkedIn)</label>
          <input
            id="linkedinName"
            {...reg('linkedinName')}
            placeholder="Ex: João Silva"
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700">
            GitHub
          </label>
          <input
            id="github"
            {...reg('github')}
            placeholder="Ex: github.com/seu-usuario"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
          <label htmlFor="githubName" className="block text-xs font-medium text-gray-600 mt-2">Nome a exibir (GitHub)</label>
          <input
            id="githubName"
            {...reg('githubName')}
            placeholder="Ex: usuario"
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm sm:text-sm border p-2"
          />
        </div>
        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
            Portfólio
          </label>
          <input
            id="portfolio"
            {...reg('portfolio')}
            placeholder="Ex: www.seusite.com.br"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          />
          <label htmlFor="portfolioName" className="block text-xs font-medium text-gray-600 mt-2">Nome a exibir (Portfólio)</label>
          <input
            id="portfolioName"
            {...reg('portfolioName')}
            placeholder="Ex: Meu Portfolio"
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm sm:text-sm border p-2"
          />
        </div>
      </div>

      <SectionHeader title="Objetivo Profissional" />
      <div>
        <label htmlFor="objective" className="sr-only">Objetivo Profissional</label>
        <textarea
          id="objective"
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
            onClick={() => {
              removeExp(index);
              // let react-hook-form update internal state, then trigger save
              setTimeout(() => callSave(), 0);
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`experience-${index}-company`} className="block text-sm font-medium text-gray-700">Empresa</label>
              <input
                id={`experience-${index}-company`}
                {...reg((`experience.${index}.company`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`experience-${index}-role`} className="block text-sm font-medium text-gray-700">Cargo</label>
              <input
                id={`experience-${index}-role`}
                {...reg((`experience.${index}.role`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`experience-${index}-startDate`} className="block text-sm font-medium text-gray-700">Início</label>
              <input
                id={`experience-${index}-startDate`}
                {...reg((`experience.${index}.startDate`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`experience-${index}-endDate`} className="block text-sm font-medium text-gray-700">Término</label>
              <input
                id={`experience-${index}-endDate`}
                {...reg((`experience.${index}.endDate`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`experience-${index}-description`} className="block text-sm font-medium text-gray-700">Descrição das Atividades</label>
              <textarea
                id={`experience-${index}-description`}
                {...reg((`experience.${index}.description`) as Path<CVData>)}
                rows={3}
                className="mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          appendExp({
            id: '',
            role: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
          });
          setTimeout(() => callSave(), 0);
        }}
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
            onClick={() => {
              removeEdu(index);
              setTimeout(() => callSave(), 0);
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`education-${index}-course`} className="block text-sm font-medium text-gray-700">Curso</label>
              <input
                id={`education-${index}-course`}
                {...reg((`education.${index}.course`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`education-${index}-institution`} className="block text-sm font-medium text-gray-700">Instituição</label>
              <input
                id={`education-${index}-institution`}
                {...reg((`education.${index}.institution`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`education-${index}-startDate`} className="block text-sm font-medium text-gray-700">Início</label>
              <input
                id={`education-${index}-startDate`}
                {...reg((`education.${index}.startDate`) as Path<CVData>)}
                placeholder="Ex: 2018"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`education-${index}-endDate`} className="block text-sm font-medium text-gray-700">Término</label>
              <input
                id={`education-${index}-endDate`}
                {...reg((`education.${index}.endDate`) as Path<CVData>)}
                placeholder="Ex: 2022"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`education-${index}-topics`} className="block text-sm font-medium text-gray-700">Tópicos / Disciplinas (uma por linha)</label>
              <textarea
                id={`education-${index}-topics`}
                {...reg((`education.${index}.topics`) as Path<CVData>)}
                placeholder={"Ex: Deep Learning\nNatural Language Processing\nAdvanced Operating Systems"}
                rows={3}
                className="mt-1 block w-full h-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          appendEdu({
            id: '',
            course: '',
            institution: '',
            startDate: '',
            endDate: '',
            topics: '',
          });
          setTimeout(() => callSave(), 0);
        }}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Formação
      </button>

      <SectionHeader title="Projetos" />
      {projectFields.map((field, index) => (
        <div
          key={field.id}
          className="bg-gray-50 p-4 rounded-md mb-3 border relative"
        >
          <button
            type="button"
            onClick={() => {
              removeProject(index);
              setTimeout(() => callSave(), 0);
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`projects-${index}-name`} className="block text-sm font-medium text-gray-700">Nome do Projeto</label>
              <input
                id={`projects-${index}-name`}
                {...reg((`projects.${index}.name`) as Path<CVData>)}
                placeholder="Ex: Sistema de Gestão Hospitalar"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`projects-${index}-technologies`} className="block text-sm font-medium text-gray-700">Tecnologias</label>
              <input
                id={`projects-${index}-technologies`}
                {...reg((`projects.${index}.technologies`) as Path<CVData>)}
                placeholder="Ex: Java, React, PostgreSQL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`projects-${index}-startDate`} className="block text-sm font-medium text-gray-700">Início</label>
              <input
                id={`projects-${index}-startDate`}
                {...reg((`projects.${index}.startDate`) as Path<CVData>)}
                placeholder="Ex: Jan 2023"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`projects-${index}-endDate`} className="block text-sm font-medium text-gray-700">Término</label>
              <input
                id={`projects-${index}-endDate`}
                {...reg((`projects.${index}.endDate`) as Path<CVData>)}
                placeholder="Ex: Ago 2023"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`projects-${index}-link`} className="block text-sm font-medium text-gray-700">Link (GitHub, Deploy, etc)</label>
              <input
                id={`projects-${index}-link`}
                {...reg((`projects.${index}.link`) as Path<CVData>)}
                placeholder="Ex: github.com/usuario/projeto"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor={`projects-${index}-description`} className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                id={`projects-${index}-description`}
                {...reg((`projects.${index}.description`) as Path<CVData>)}
                placeholder="Descreva o projeto, suas funcionalidades e sua contribuição..."
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          appendProject({
            id: '',
            name: '',
            description: '',
            technologies: '',
            link: '',
            startDate: '',
            endDate: '',
          });
          setTimeout(() => callSave(), 0);
        }}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Projeto
      </button>

      <SectionHeader title="COMPETÊNCIAS TÉCNICAS" />
      <div>
        <label htmlFor="skills" className="sr-only">COMPETÊNCIAS TÉCNICAS</label>
        <textarea
          id="skills"
          {...reg('skills')}
          rows={4}
          className="mt-1 block w-full h-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Liste suas principais habilidades (uma por linha)..."
        />
      </div>

      <SectionHeader title="Idiomas" />
      <div>
        <label htmlFor="languages" className="sr-only">Idiomas</label>
        <textarea
          id="languages"
          {...reg('languages')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Ex: Português (Nativo)\nInglês (Avançado)..."
        />
      </div>

      <SectionHeader title="Soft Skills" />
      <div>
        <label htmlFor="softSkills" className="sr-only">Soft Skills</label>
        <textarea
          id="softSkills"
          {...reg('softSkills')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Ex: Comunicação, Trabalho em equipe..."
        />
      </div>

      <SectionHeader title="COMPETÊNCIAS INTERPESSOAIS DEMONSTRADAS" />
      <div>
        <label htmlFor="interpersonalSkills" className="sr-only">Competências Interpessoais Demonstradas</label>
        <textarea
          id="interpersonalSkills"
          {...reg('interpersonalSkills')}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
          placeholder="Descreva competências interpessoais demonstradas (um parágrafo ou tópicos por linha)..."
        />
      </div>

      <SectionHeader title="Campos Personalizados" />
      {customFields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 p-4 rounded-md mb-3 border relative">
          <button
            type="button"
            onClick={() => {
              removeCustom(index);
              setTimeout(() => callSave(), 0);
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`customFields-${index}-label`} className="block text-sm font-medium text-gray-700">Rótulo</label>
              <input
                id={`customFields-${index}-label`}
                {...reg((`customFields.${index}.label`) as Path<CVData>)}
                placeholder="Ex: Certificações"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`customFields-${index}-value`} className="block text-sm font-medium text-gray-700">Valor</label>
              <input
                id={`customFields-${index}-value`}
                {...reg((`customFields.${index}.value`) as Path<CVData>)}
                placeholder="Conteúdo do campo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          appendCustom({ id: '', label: '', value: '' });
          setTimeout(() => callSave(), 0);
        }}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Campo
      </button>

      <SectionHeader title="Referências" />
      {refFields.map((field, index) => (
        <div
          key={field.id}
          className="bg-gray-50 p-4 rounded-md mb-3 border relative"
        >
          <button
            type="button"
            onClick={() => {
              removeRef(index);
              setTimeout(() => callSave(), 0);
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor={`references-${index}-name`} className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                id={`references-${index}-name`}
                {...reg((`references.${index}.name`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`references-${index}-email`} className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id={`references-${index}-email`}
                {...reg((`references.${index}.email`) as Path<CVData>)}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label htmlFor={`references-${index}-phone`} className="block text-sm font-medium text-gray-700">Telefone</label>
              <input
                id={`references-${index}-phone`}
                {...reg((`references.${index}.phone`) as Path<CVData>)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          appendRef({
            id: '',
            name: '',
            email: '',
            phone: '',
          });
          setTimeout(() => callSave(), 0);
        }}
        className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <Plus size={18} className="mr-1" /> Adicionar Referência
      </button>
    </div>
  );
};
