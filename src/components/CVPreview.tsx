import * as React from 'react';
import type { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }: CVPreviewProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const primaryColor = '#4657F1';

    const styles = {
      titleClass: 'font-bold text-3xl mb-2',
      subtitleClass: 'text-sm uppercase font-normal',
      sectionTitleClass: 'uppercase font-bold text-[14px] mb-3',
      textClass: 'text-[12px] leading-relaxed mb-2',
      itemTitleClass: 'font-bold text-[12px] mb-1',
      itemMetaClass: 'text-[12px] mb-2',
      listItemClass: 'text-[12px] leading-relaxed',
      eduInstitutionClass: 'font-bold text-[12px]',
      eduCourseClass: 'text-[12px]',
      eduDateClass: 'text-[12px] text-gray-600',
      skillsItemClass: 'text-[12px]',
      refBlockClass: 'mb-3 text-sm',
    } as const;

    return (
      <div
        ref={ref}
        className="bg-white text-black pt-8 px-12 w-[210mm] min-h-[297mm] shadow-lg mx-auto print:shadow-none print:w-full print:mx-0"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <div className="flex justify-between ">
          {/* Header - Nome e Cargo */}
          <div className="flex flex-col w-1/2">
            <h1 className={styles.titleClass} style={{ color: primaryColor }}>
              {data.fullName}
            </h1>
            <p className={styles.subtitleClass}>
              {data.jobTitle || 'Profissional'}
            </p>
          </div>
          <div className="w-2/5">
            {/* CONTATO */}
            <div className="mb-6">
              <h2
                className={styles.sectionTitleClass}
                style={{ color: primaryColor }}
              >
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
                {data.address && (
                  <p>
                    <span className="font-semibold">Endereço:</span>{' '}
                    {data.address}
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
                  className={styles.sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  PERFIL
                </h2>
                <p className={styles.textClass}>{data.objective}</p>
              </div>
            )}

            {/* EXPERIÊNCIA PROFISSIONAL */}
            {data.experience && data.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className={styles.sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  EXPERIÊNCIA PROFISSIONAL
                </h2>
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="mb-5">
                    <p className={styles.itemTitleClass}>{exp.role}</p>
                    <p className={styles.itemMetaClass}>
                      {exp.company} | {exp.startDate} - {exp.endDate}
                    </p>
                    {exp.description && (
                      <ul className="list-disc ml-5 space-y-1">
                        {exp.description
                          .split('\n')
                          .filter((line) => line.trim())
                          .map((line, i) => (
                            <li key={i} className={styles.listItemClass}>
                              {line.trim()}
                            </li>
                          ))}
                      </ul>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-disc ml-5 space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className={styles.listItemClass}>
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

          <div className="flex justify-between pt-10">
            {/* FORMAÇÃO ACADÊMICA */}
            {data.education && data.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className={styles.sectionTitleClass}
                  style={{ color: primaryColor }}
                >
                  FORMAÇÃO ACADÊMICA
                </h2>
                {data.education.map((edu, idx) => (
                  <div key={idx} className="mb-4">
                    <p className={styles.eduInstitutionClass}>
                      {edu.institution}
                    </p>
                    <p className={styles.eduCourseClass}>{edu.course}</p>
                    <p className={styles.eduDateClass}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}

                {/* SOFT SKILLS */}
                {data.softSkills && data.softSkills.trim() && (
                  <div className="mb-6">
                    <h2
                      className={styles.sectionTitleClass}
                      style={{ color: primaryColor }}
                    >
                      SOFT SKILLS
                    </h2>
                    <ul className="space-y-1">
                      {data.softSkills
                        .split('\n')
                        .filter((s) => s.trim())
                        .map((s, i) => (
                          <li key={i} className={styles.listItemClass}>
                            {s.trim()}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="block w-2/5">
              {/* HABILIDADES */}
              {data.skills && (
                <div className="mb-6">
                  <h2
                    className={styles.sectionTitleClass}
                    style={{ color: primaryColor }}
                  >
                    HABILIDADES
                  </h2>
                  <ul className="space-y-1">
                    {data.skills
                      .split('\n')
                      .filter((skill) => skill.trim())
                      .map((skill, idx) => (
                        <li key={idx} className={styles.skillsItemClass}>
                          {skill.trim().startsWith('•')
                            ? skill.trim()
                            : `• ${skill.trim()}`}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* IDIOMAS */}
              {data.languages && data.languages.trim() && (
                <div className="mb-6">
                  <h2
                    className={styles.sectionTitleClass}
                    style={{ color: primaryColor }}
                  >
                    IDIOMAS
                  </h2>
                  <ul className="space-y-1">
                    {data.languages
                      .split('\n')
                      .filter((l) => l.trim())
                      .map((l, i) => (
                        <li key={i} className={styles.listItemClass}>
                          {l.trim()}
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* CUSTOM FIELDS */}
              {data.customFields && data.customFields.length > 0 && (
                <div className="mb-6">
                  {data.customFields.map((cf, i) =>
                    cf.label && cf.value ? (
                      <div key={i} className="mb-3">
                        <p className={styles.itemTitleClass}>{cf.label}</p>
                        <p className={styles.listItemClass}>{cf.value}</p>
                      </div>
                    ) : null
                  )}
                </div>
              )}

              {/* REFERÊNCIAS */}
              {data.references && data.references.length > 0 && (
                <div className="mb-6">
                  <h2
                    className={styles.sectionTitleClass}
                    style={{ color: primaryColor }}
                  >
                    REFERÊNCIAS
                  </h2>
                  {data.references.map((ref, idx) => (
                    <div key={idx} className={styles.refBlockClass}>
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
