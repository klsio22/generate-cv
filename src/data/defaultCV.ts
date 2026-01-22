import type { CVData } from '../types';

export const defaultCV: CVData = {
  fullName: 'Catarina Dantas',
  jobTitle: 'DESENVOLVEDORA DE SOFTWARE',
  address: '',
  phone: '(12) 456-7890',
  email: 'ola@grandesite.com.br',
  linkedin: 'www.linkedin.com/in/usuario',
  linkedinName: 'usuario-linkedin',
  github: 'github.com/usuario',
  githubName: 'usuario',
  portfolio: 'www.grandesite.com.br',
  portfolioName: 'meu-portfolio',
  objective:
    'Desenvolvedora de software e arquiteta de sistemas com experiência em projetar, programar e testar sistemas complexos. Minha expertise está nas linguagens de programação C#, Java e Ruby.',
  education: [
    {
      id: '1',
      course: 'Mestrado em Ciência da Computação',
      institution: 'Universidade de Monte Verde',
      startDate: 'Maio de 2030',
      endDate: 'Maio de 2032',
    },
    {
      id: '2',
      course: 'Ciência da Computação',
      institution: 'Universidade de Monte Verde',
      startDate: 'Jun 2026',
      endDate: 'Jun 2030',
    },
  ],
  experience: [
    {
      id: '1',
      role: 'Engenheira de Software Sênior',
      company: 'Macedo Design de Sistemas',
      startDate: 'Jan 2034',
      endDate: 'Jun 2038',
      description:
        'Liderou uma equipe de 10 engenheiros no desenvolvimento de uma nova arquitetura que aumentou o desempenho do sistema em 40% e reduziu os custos do servidor em 20%\nImplementou com sucesso protocolos de testes automatizados, reduzindo incidentes relacionados a bugs em 40% nos primeiros seis meses',
    },
    {
      id: '2',
      role: 'Desenvolvedora de Software',
      company: 'Cia. de Tecnologia Pinheiros',
      startDate: 'Set 2030',
      endDate: 'Dez 2033',
      description:
        'Melhorou o desempenho do app em 30% por meio da otimização de consultas ao banco de dados\nColaborou com sucesso com uma equipe de 5 desenvolvedores para concluir um grande projeto, entregando o produto final 1 semana antes do prazo de 6 meses e 15% abaixo do orçamento\nImplementou procedimentos de testes automatizados que reduziram os relatórios de bugs em 40%, aumentando a confiabilidade geral do software e a satisfação do cliente',
    },
  ],
  skills:
    'Análise de Sistemas\nPesquisa de Usuários\nMachine Learning\nMetodologia Ágil\nBanco de Dados',
  languages: '',
  softSkills: '',
  customFields: [],
  projects: [
    {
      id: '1',
      name: 'Sistema de Gestão Hospitalar',
      description: 'Desenvolvimento de sistema web completo para gestão de pacientes, agendamentos e registros médicos. Implementei a arquitetura backend com Java Spring Boot e frontend com React.',
      technologies: 'Java, Spring Boot, React, PostgreSQL',
      link: 'github.com/usuario/hospital-system',
      startDate: 'Jan 2032',
      endDate: 'Ago 2032',
    },
    {
      id: '2',
      name: 'App Mobile de Finanças Pessoais',
      description: 'Aplicativo mobile para controle de despesas e orçamento pessoal com gráficos de análise. Participei como desenvolvedora principal na implementação das funcionalidades de dashboard e relatórios.',
      technologies: 'React Native, Firebase, Expo',
      link: 'github.com/usuario/finance-app',
      startDate: 'Mar 2031',
      endDate: 'Jul 2031',
    },
  ],
  references: [
    {
      id: '1',
      name: 'Amanda Tomika',
      email: 'ola@grandesite.com.br',
      phone: '(12) 456-7890',
    },
  ],
};

export const emptyCV: CVData = structuredClone(defaultCV);
