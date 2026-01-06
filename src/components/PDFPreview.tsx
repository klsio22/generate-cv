import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
} from '@react-pdf/renderer';
import type { CVData } from '../types';

export interface PDFPreviewProps {
  data: CVData;
}

// Create PDF styles maintaining the original design
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    position: 'relative',
    paddingTop: 24,
  },

  sidebar: {
    width: '25%',
    backgroundColor: '#1e3a8a', // blue-900
    color: '#ffffff',
    padding: 24,
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },

  sidebarContent: {
    position: 'relative',
    top: 24,
  },

  mainContent: {
    width: '75%',
    padding: 32,
    flexDirection: 'column',
    marginLeft: '25%',
  },

  sidebarName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e40af',
  },
  sidebarSection: {
    marginBottom: 16,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ffffff',
  },
  sidebarText: {
    fontSize: 9,
    marginBottom: 4,
    color: '#ffffff',
    lineHeight: 1.6,
  },
  sidebarLink: {
    fontSize: 9,
    color: '#ffffff',
    textDecoration: 'underline',
    marginBottom: 6,
  },
  header: {
    marginBottom: 24,
  },
  fullName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  headerInfo: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 4,
  },
  sectionContent: {
    marginBottom: 12,
  },
  itemContainer: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#4b5563',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  objective: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  skillItem: {
    fontSize: 9,
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 1.6,
  },
});

// Helper function to format dates
const formatDate = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  return dateStr.trim();
};

// Wrap text into multiple lines (by character limit) and truncate after maxLines
// naive chunking by characters to account for long tokens (URLs)
const wrapAndTruncate = (
  text: string | undefined,
  lineLimit = 30,
  maxLines = 2
): string => {
  if (!text) return '';
  const chunks: string[] = [];
  for (let i = 0; i < maxLines; i++) {
    const start = i * lineLimit;
    const end = start + lineLimit;
    if (start >= text.length) break;
    chunks.push(text.slice(start, end));
  }
  const used = chunks.join('');
  const overflow = text.length > used.length;
  
  if (!overflow) return chunks.join('\n');
  const last = chunks.at(-1) || '';
  chunks[chunks.length - 1] = last.slice(0, Math.max(0, lineLimit - 3)) + '...';
  return chunks.join('\n');
};

// PDF Document Component
const CVDocument: React.FC<PDFPreviewProps> = ({ data }) => {
  const skillsList =
    data.skills
      ?.split('\n')
      .map((s) => s.trim())
      .filter(Boolean) || [];
  const topSkills = skillsList.slice(0, 6);
  const langsList = data.languages?.split('\n').filter((l) => l.trim()) || [];
  const softList = data.softSkills?.split('\n').filter((s) => s.trim()) || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
            {/* Name */}
            <Text style={styles.sidebarName}>{data.fullName}</Text>

            {/* Contact Section */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contato</Text>
              {data.email && (
                <Text style={styles.sidebarText}>{data.email}</Text>
              )}
              {data.phone && (
                <Text style={styles.sidebarText}>{data.phone}</Text>
              )}
              {data.linkedin && (
                <Link style={styles.sidebarLink} src={data.linkedin}>
                  {wrapAndTruncate(data.linkedin, 24, 1)}
                </Link>
              )}
              {data.portfolio && (
                <Link style={styles.sidebarLink} src={data.portfolio}>
                  {wrapAndTruncate(data.portfolio, 30, 2)}
                </Link>
              )}
            </View>

            {/* Main Skills Section */}
            {topSkills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Principais competências</Text>
                {topSkills.map((skill) => (
                  <Text key={skill} style={styles.skillItem}>
                    • {skill.replace(/^•\s*/, '')}
                  </Text>
                ))}
              </View>
            )}

            {/* Languages */}
            {langsList.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Idiomas</Text>
                {langsList.map((lang) => (
                  <Text key={lang} style={styles.sidebarText}>
                    {lang.trim()}
                  </Text>
                ))}
              </View>
            )}

            {/* Soft Skills */}
            {softList.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Soft Skills</Text>
                {softList.map((s) => (
                  <Text key={s} style={styles.sidebarText}>
                    • {s.trim()}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>

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
    <div
      style={{
        height: 800,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <CVDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export { CVDocument };
export default PDFPreview;
