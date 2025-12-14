import * as React from 'react';
import type { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = React.forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ data }: CVPreviewProps, ref: React.ForwardedRef<HTMLDivElement>) => {

    // Format date helper
    const formatDate = (dateStr: string | undefined): string => {
      if (!dateStr) return '';
      try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' });
      } catch {
        return dateStr;
      }
    };

    // --- Pagination logic -------------------------------------------------
    const mmToPx = (mm: number) => (mm * 96) / 28.4;
    const PAGE_HEIGHT_PX = mmToPx(297);
    const RESERVED_PX = 100; // top + bottom padding
    const PAGE_INNER_PX = PAGE_HEIGHT_PX - RESERVED_PX;

    const sectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
    const [pages, setPages] = React.useState<string[][]>([[]]);

    const sectionsOrder: string[] = [];

    const makeKey = (name: string, idx?: number) =>
      idx !== undefined ? `${name}-${idx}` : name;

    // Build section order
    sectionsOrder.push(makeKey('header'));
    if (data.objective) sectionsOrder.push(makeKey('objective'));
    if (data.experience && data.experience.length > 0) {
      data.experience.forEach((_, i) => sectionsOrder.push(makeKey('experience', i)));
    }
    if (data.education && data.education.length > 0) {
      sectionsOrder.push(makeKey('education'));
    }
    if (data.skills) sectionsOrder.push(makeKey('skills'));
    if (data.languages && data.languages.trim()) sectionsOrder.push(makeKey('languages'));
    if (data.softSkills && data.softSkills.trim()) sectionsOrder.push(makeKey('softSkills'));
    if (data.references && data.references.length > 0) {
      sectionsOrder.push(makeKey('references'));
    }

    // Render functions for each section
    const renderSection = (key: string) => {
      const [name, idxStr] = key.split('-');
      const idx = idxStr ? Number(idxStr) : undefined;

      switch (name) {
        case 'header':
          return (
            <div className="mb-6">
              <h1 className="font-bold text-2xl text-gray-900 mb-0.5">{data.fullName}</h1>
              <p className="text-xs text-blue-600 font-semibold">{data.jobTitle || 'Profissional'}</p>
              <div className="mt-2 space-y-0.5 text-xs text-gray-700">
                {data.email && <p>{data.email}</p>}
                {data.phone && <p>{data.phone}</p>}
                {data.address && <p>{data.address}</p>}
              </div>
            </div>
          );

        case 'objective':
          return (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-900 mb-2">PERFIL</h2>
              <p className="text-xs leading-relaxed text-gray-700 text-justify">{data.objective}</p>
            </div>
          );

        case 'experience': {
          if (idx === undefined || !data.experience?.[idx]) return null;
          const exp = data.experience[idx];
          return (
            <div className="item-container mb-5">
              <p className="font-bold text-sm text-gray-900">{exp.role}</p>
              <p className="text-xs text-gray-600 italic mb-1">{exp.company}</p>
              <div className="text-xs text-gray-600 mb-2">
                {formatDate(exp.startDate)}{exp.endDate ? ` - ${formatDate(exp.endDate)}` : ' - Atual'}
              </div>
              {exp.description && (
                <ul className="list-disc ml-4 space-y-0.5">
                  {exp.description
                    .split('\n')
                    .filter((line) => line.trim())
                    .map((line, i) => (
                      <li key={i} className="text-xs text-gray-700">
                        {line.trim()}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          );
        }

        case 'education': {
          const eduItems = data.education || [];
          if (eduItems.length === 0) return null;
          return (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-900 mb-3">FORMAÇÃO ACADÊMICA</h2>
              <div className="space-y-3">
                {eduItems.map((edu, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-sm text-gray-900">{edu.institution}</p>
                    <p className="text-xs text-gray-600 italic">{edu.course}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        case 'skills': {
          const skillsList = data.skills?.split('\n').filter((s) => s.trim()) || [];
          if (skillsList.length === 0) return null;
          return (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-900 mb-3">HABILIDADES</h2>
              <div className="space-y-2">
                {skillsList.map((skill, idx) => (
                  <div key={idx} className="">
                    <p className="text-xs text-gray-700">{skill.trim().replace(/^•\s*/, '')}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        case 'languages': {
          const langsList = data.languages?.split('\n').filter((l) => l.trim()) || [];
          if (langsList.length === 0) return null;
          return (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-900 mb-3">IDIOMAS</h2>
              <div className="space-y-2">
                {langsList.map((lang, idx) => (
                  <div key={idx} className="">
                    <p className="text-xs text-gray-700">{lang.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        case 'softSkills': {
          const softList = data.softSkills?.split('\n').filter((s) => s.trim()) || [];
          if (softList.length === 0) return null;
          return (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-900 mb-3">SOFT SKILLS</h2>
              <ul className="space-y-1">
                {softList.map((s, i) => (
                  <li key={i} className="text-xs text-gray-700">• {s.trim()}</li>
                ))}
              </ul>
            </div>
          );
        }

        case 'references': {
          const refs = data.references || [];
          if (refs.length === 0) return null;
          return (
            <div className="mb-6">
              <h2 className="font-bold text-sm text-gray-900 mb-3">REFERÊNCIAS</h2>
              <div className="space-y-3">
                {refs.map((ref, idx) => (
                  <div key={idx}>
                    <p className="font-bold text-sm text-gray-900">{ref.name}</p>
                    {ref.email && <p className="text-xs text-gray-600">E-mail: {ref.email}</p>}
                    {ref.phone && <p className="text-xs text-gray-600">Telefone: {ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        default:
          return null;
      }
    };

    // Measure sections and compute pages
    React.useLayoutEffect(() => {
      const measurements: { key: string; height: number }[] = [];

      sectionsOrder.forEach((key) => {
        const el = sectionRefs.current[key];
        if (!el) {
          measurements.push({ key, height: 0 });
          return;
        }
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const marginTop = parseFloat(style.marginTop || '0');
        const marginBottom = parseFloat(style.marginBottom || '0');
        const total = rect.height + marginTop + marginBottom;
        measurements.push({ key, height: total });
      });

      const newPages: string[][] = [];
      let currentPage: string[] = [];
      let acc = 0;

      measurements.forEach((m) => {
        if (acc + m.height > PAGE_INNER_PX && currentPage.length > 0) {
          newPages.push(currentPage);
          currentPage = [m.key];
          acc = m.height;
        } else {
          currentPage.push(m.key);
          acc += m.height;
        }
      });

      if (currentPage.length > 0) newPages.push(currentPage);

      setPages(newPages.length ? newPages : [[]]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // Hidden measurement container
    const measurementNodes = (
      <div
        style={{
          position: 'absolute',
          left: -9999,
          top: 0,
          visibility: 'hidden',
          width: '210mm',
        }}
      >
        {sectionsOrder.map((key) => (
          <div
            key={key}
            ref={(el) => {
              sectionRefs.current[key] = el;
            }}
            style={{ boxSizing: 'border-box', padding: '0 32px' }}
          >
            {renderSection(key)}
          </div>
        ))}
      </div>
    );

    // Sidebar content: contato + principais competências (com quebra de texto)
    const renderSidebar = () => {
      const skillsList = data.skills?.split('\n').map((s) => s.trim()).filter(Boolean) || [];
      const topSkills = skillsList.slice(0, 6);

      return (
        <div className="relative w-48 bg-linear-to-b from-blue-900 to-blue-800 text-white pt-6 px-3 flex flex-col min-h-full">
          <div className="mb-6 pb-4 border-b border-blue-700">
            <p className="font-bold text-xs text-white">{data.fullName}</p>
          </div>

          {/* Contato */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-white mb-1">Contato</h3>
            <div className="text-white text-xs leading-6 break-words">
              {data.email && <p className="break-words">{data.email}</p>}
              {data.phone && <p className="break-words">{data.phone}</p>}
              {/** opcional: campos extras comuns */}
              {(data.linkedin || data.portfolio) && (
                <div className="mt-0.5 space-y-0.5">
                  {data.linkedin && (
                    <a
                      href={data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words leading-tight mb-1.5 text-white underline block"
                    >
                      {data.linkedin}
                    </a>
                  )}
                  {data.portfolio && (
                    <a
                      href={data.portfolio.startsWith('http') ? data.portfolio : `https://${data.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words leading-tight text-white underline block"
                    >
                      {data.portfolio}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Principais competências */}
          {topSkills.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-white mb-1">Principais competências</h3>
              <ul className="text-white text-xs leading-6 list-none space-y-1">
                {topSkills.map((s, i) => (
                  <li key={i} className="break-words">{s.replace(/^•\s*/, '')}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex-1" />
        </div>
      );
    };

    // Main content
    const renderMainContent = (pageKeys: string[]) => (
      <div className="flex-1 px-8 py-6 overflow-hidden">
        {pageKeys.map((k) => (
          <div key={k}>{renderSection(k)}</div>
        ))}
      </div>
    );

    return (
      <div ref={ref} style={{ fontFamily: 'Arial, sans-serif' }}>
        {measurementNodes}
        {pages.map((pageKeys, pIdx) => (
          <div
            key={pIdx}
            className="bg-white text-black w-[210mm] h-[297mm] shadow-lg mx-auto flex print:shadow-none print:w-full print:mx-0"
            style={{ boxSizing: 'border-box', marginTop: pIdx === 0 ? 0 : 16 }}
          >
            {renderSidebar()}
            {renderMainContent(pageKeys)}
          </div>
        ))}
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';
