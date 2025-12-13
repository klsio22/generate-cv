import * as React from 'react';
import type { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }: CVPreviewProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    // Styling constants - cor azul da imagem: #4657F1
    const primaryColor = '#4657F1';
    const sectionTitleClass = 'uppercase font-bold text-[12px] mb-3';
    const textClass = 'text-sm leading-relaxed mb-2';

    return (
      <div
        ref={ref}
        className="bg-white text-black p-14 w-[210mm] min-h-[297mm] shadow-lg mx-auto print:shadow-none print:w-full print:mx-0"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <div className="flex justify-between ">
          {/* Header - Nome e Cargo */}
          <div className="flex flex-col w-1/2">
            <h1
              className="font-bold text-4xl mb-2"
              style={{ color: primaryColor }}
            >
              {data.fullName}
            </h1>
            <p className="text-xl uppercase font-normal">
              {data.jobTitle || 'Profissional'}
            </p>
          </div>
          <div className="w-50">
            {/* CONTATO */}
            <div className="mb-6">
              <h2 className={sectionTitleClass} style={{ color: primaryColor }}>
                CONTATO
              </h2>
              <div className="space-y-2 text-sm">
                {data.email && (
                  <p>
                    <span className="font-semibold">E-mail:</span> {data.email}
                  </p>
                )}
                {data.portfolio && (
                  <p>
                    <span className="font-semibold">Portfólio:</span>{' '}
                    {data.portfolio}
                  </p>
                )}
                {data.linkedin && (
                  <p>
                    <span className="font-semibold">LinkedIn:</span>{' '}
                    {data.linkedin}
                  </p>
                )}
                {data.phone && (
                  <p>
                    <span className="font-semibold">Telefone:</span>{' '}
                    {data.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Layout de duas colunas: 65% esquerda, 35% direita */}
        <div className="flex flex-col">
          {/* Coluna Esquerda - 65% */}
          <div className="">
            {/* PERFIL */}
            {data.objective && (
              <div className="mb-6">
                <h2
                  className={sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  PERFIL
                </h2>
                <p className={textClass}>{data.objective}</p>
              </div>
            )}

            {/* EXPERIÊNCIA PROFISSIONAL */}
            {data.experience && data.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className={sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  EXPERIÊNCIA PROFISSIONAL
                </h2>
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="mb-5">
                    <p className="font-bold text-[11px] mb-1">{exp.role}</p>
                    <p className="text-[11px] mb-2">
                      {exp.company} | {exp.startDate} - {exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="list-disc ml-5 space-y-1">
                        {exp.description
                          .split('\n')
                          .filter((line) => line.trim())
                          .map((line, i) => (
                            <li key={i} className="text-sm leading-relaxed">
                              {line.trim()}
                            </li>
                          ))}
                      </ul>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm leading-relaxed">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {/* FORMAÇÃO ACADÊMICA */}
            {data.education && data.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className={sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  FORMAÇÃO ACADÊMICA
                </h2>
                {data.education.map((edu, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="font-bold text-[11px]">{edu.institution}</p>
                    <p className="text-[11px]">{edu.course}</p>
                    <p className="text-[11px] text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="block w-62.5">
              {/* HABILIDADES */}
              {data.skills && (
                <div className="mb-6">
                  <h2
                    className={sectionTitleClass}
                    style={{ color: primaryColor }}
                  >
                    HABILIDADES
                  </h2>
                  <ul className="space-y-1">
                    {data.skills
                      .split('\n')
                      .filter((skill) => skill.trim())
                      .map((skill, idx) => (
                        <li key={idx} className="text-sm">
                          {skill.trim().startsWith('•')
                            ? skill.trim()
                            : `• ${skill.trim()}`}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* REFERÊNCIAS */}
              {data.references && data.references.length > 0 && (
                <div className="mb-6">
                  <h2
                    className={sectionTitleClass}
                    style={{ color: primaryColor }}
                  >
                    REFERÊNCIAS
                  </h2>
                  {data.references.map((ref, idx) => (
                    <div key={idx} className="mb-3 text-sm">
                      <p className="font-bold">{ref.name}</p>
                      {ref.email && <p>E-mail: {ref.email}</p>}
                      {ref.phone && <p>Telefone: {ref.phone}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';
