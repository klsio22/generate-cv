import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  Link,
} from '@react-pdf/renderer';
import styles from '../styles/pdfStyles';
import type { CVData } from '../types';
import { formatDate } from '../utils/textUtils';

export interface PDFPreviewProps {
  data: CVData;
}

const CVDocument: React.FC<PDFPreviewProps> = ({ data }) => {
  const skillsList =
    data.skills
      ?.split('\n')
      .map((s) => s.trim())
      .filter(Boolean) || [];
  const langsList = data.languages?.split('\n').filter((l) => l.trim()) || [];
  const softList = data.softSkills?.split('\n').filter((s) => s.trim()) || [];

  const normalizeUrl = (u?: string) => {
    if (!u) return '';
    return /^https?:\/\//i.test(u) ? u : `https://${u}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* MAIN CONTENT */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.fullName}>{data.fullName}</Text>
            {data.jobTitle && (
              <Text style={styles.jobTitle}>{data.jobTitle}</Text>
            )}
            <View style={styles.headerInfo}>
              {data.email && <Text>{data.email}</Text>}
              {data.phone && <Text>{data.phone}</Text>}
              {data.address && <Text>{data.address}</Text>}
              {(data.linkedin || data.github || data.portfolio) && (
                <View style={styles.linksContainer}>
                  {data.linkedin && (
                    <Link src={normalizeUrl(data.linkedin)} style={styles.linkText}>
                      LinkedIn: {data.linkedinName?.trim() ? `${data.linkedinName}` : ` ${data.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}`}
                    </Link>
                  )}

                  {data.github && (
                    <Link src={normalizeUrl(data.github)} style={styles.linkText}>
                      GitHub: {data.githubName?.trim() ? `${data.githubName}` : `${data.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}`}
                    </Link>
                  )}

                  {data.portfolio && (
                    <Link src={normalizeUrl(data.portfolio)} style={styles.linkText}>
                      Portfolio: {data.portfolioName?.trim() ? `${data.portfolioName}` : ` ${data.portfolio.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}`}
                    </Link>
                  )}
                </View>
              )}
            </View>
          </View>

          {/* Objective */}
          {data.objective && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>PERFIL</Text>
              <Text style={styles.objective}>{data.objective}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>EXPERIÊNCIA PROFISSIONAL</Text>
              {data.experience.map((exp) => (
                <View
                  key={`${exp.company}-${exp.role}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{exp.role}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)}
                    {exp.endDate ? ` - ${formatDate(exp.endDate)}` : ' - Atual'}
                  </Text>
                  {exp.description && (
                    <View style={styles.bulletList}>
                      {exp.description
                        .split('\n')
                        .filter((line) => line.trim())
                        .map((line) => (
                          <Text
                            key={`${exp.company}-${line.trim()}`}
                            style={styles.bulletItem}
                          >
                            • {line.trim()}
                          </Text>
                        ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>FORMAÇÃO ACADÊMICA</Text>
              {data.education.map((edu) => (
                <View
                  key={`${edu.institution}-${edu.course}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{edu.institution}</Text>
                  <Text style={styles.itemSubtitle}>{edu.course}</Text>
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startDate)}
                      {edu.endDate ? ` - ${formatDate(edu.endDate)}` : ''}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* All Skills */}
          {skillsList.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>HABILIDADES</Text>
              {skillsList.map((skill) => (
                <Text key={skill} style={styles.bulletItem}>
                  • {skill.trim().replace(/^•\s*/, '')}
                </Text>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>PROJETOS</Text>
              {data.projects.map((project) => (
                <View
                  key={`${project.name}-${project.id}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  {project.technologies && (
                    <Text style={styles.itemSubtitle}>{project.technologies}</Text>
                  )}
                  {(project.startDate || project.endDate) && (
                    <Text style={styles.itemDate}>
                      {formatDate(project.startDate)}
                      {project.endDate ? ` - ${formatDate(project.endDate)}` : ''}
                    </Text>
                  )}
                  {project.description && (
                    <Text style={styles.objective}>{project.description}</Text>
                  )}
                  {project.link && (
                    <Text style={styles.bulletItem}>
                      Link: {project.link}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {langsList.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>IDIOMAS</Text>
              {langsList.map((lang) => (
                <Text key={lang} style={styles.bulletItem}>
                  • {lang.trim()}
                </Text>
              ))}
            </View>
          )}

          {/* Soft Skills */}
          {softList.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>SOFT SKILLS</Text>
              {softList.map((s) => (
                <Text key={s} style={styles.bulletItem}>
                  • {s.trim()}
                </Text>
              ))}
            </View>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>REFERÊNCIAS</Text>
              {data.references.map((ref) => (
                <View
                  key={`${ref.name}-${ref.email || ref.phone}`}
                  style={styles.itemContainer}
                >
                  <Text style={styles.itemTitle}>{ref.name}</Text>
                  {ref.email && (
                    <Text style={styles.itemSubtitle}>E-mail: {ref.email}</Text>
                  )}
                  {ref.phone && (
                    <Text style={styles.itemSubtitle}>
                      Telefone: {ref.phone}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export const PDFPreview = ({ data }: PDFPreviewProps) => {
  return (
    <div className="h-192 max-h-max border border-gray-200 rounded-lg overflow-hidden w-full">
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <CVDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export { CVDocument };
export default PDFPreview;
