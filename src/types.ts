export interface Education {
  id: string;
  course: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[]; // Lista de conquistas/bullet points
}

export interface Reference {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CVData {
  fullName: string;
  jobTitle: string; // Cargo/posição
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio?: string;
  objective: string;
  education: Education[];
  experience: Experience[];
  skills: string;
  references?: Reference[];
}

export interface SavedCV extends CVData {
  id: string;
  title: string;
  updatedAt: number;
}
