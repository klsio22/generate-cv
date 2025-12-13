import { useState, useEffect, useCallback, useRef } from 'react';
import type { CVData, SavedCV } from '../types';

const STORAGE_KEY = 'cv-data';

const defaultCV: CVData = {
  fullName: 'Seu Nome',
  address: 'Seu Endereço',
  phone: '(00) 00000-0000',
  email: 'seu.email@exemplo.com',
  linkedin: 'linkedin.com/in/seu-perfil',
  objective: 'Seu objetivo profissional aqui...',
  education: [],
  experience: [],
  skills: 'Suas habilidades...',
};

const generateNewCV = (index: number = 0): SavedCV => {
  return {
    ...defaultCV,
    id: crypto.randomUUID(),
    title: index === 0 ? 'Novo Currículo' : `Novo Currículo ${index + 1}`,
    updatedAt: Date.now(),
  };
};

export function useCVStorage() {
  // Lazy initialization to avoid effect cascading
  const [cvs, setCvs] = useState<SavedCV[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse CV data', e);
    }
    // Default to one CV if storage is empty
    return [generateNewCV()];
  });

  const [activeId, setActiveId] = useState<string | null>(() => {
    // Always select the first one on init if available
    return cvs.length > 0 ? cvs[0].id : null;
  });

  const initialized = useRef(false);

  // Mark initialized after mount (though we handled init in useState)
  useEffect(() => {
    initialized.current = true;
  }, []);

  const createCV = useCallback(() => {
    const newId = crypto.randomUUID();

    // We update state functionally
    setCvs((prev) => {
      const title = `Novo Currículo ${prev.length + 1}`;
      const newCV: SavedCV = {
        ...defaultCV,
        id: newId,
        title,
        updatedAt: Date.now(),
      };
      return [...prev, newCV];
    });

    // We set activeId
    setActiveId(newId);

    // Return a temporary object for immediate use if needed by caller
    // Note: The title mimics the logic inside the setter
    return {
      ...defaultCV,
      id: newId,
      title: 'Novo Currículo',
      updatedAt: Date.now(),
    };
  }, []);

  // Save to storage whenever cvs change
  useEffect(() => {
    // We only want to save if we are initialized or if we want to sync the initial state immediately?
    // Actually, usually we only save if changes happen.
    // But since we initialized from storage (or default), the state matches storage (or is a valid new default).
    // If we created a default, we might want to save it immediately?
    // The previous code only saved if `cvs.length > 0`.

    if (cvs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
    } else if (initialized.current) {
      // Only remove if we've initialized and cvs becomes empty
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [cvs]);

  const updateCV = useCallback((id: string, data: Partial<SavedCV>) => {
    setCvs((prev) =>
      prev.map((cv) =>
        cv.id === id
          ? {
              ...cv,
              ...data,
              updatedAt: Date.now(),
            }
          : cv
      )
    );
  }, []);

  const deleteCV = useCallback(
    (id: string) => {
      const remaining = cvs.filter((cv) => cv.id !== id);

      if (remaining.length === 0) {
        const newCV = generateNewCV();
        setCvs([newCV]);
        setActiveId(newCV.id);
      } else {
        setCvs(remaining);
        if (activeId === id) {
          setActiveId(remaining[0].id);
        }
      }
    },
    [cvs, activeId]
  );

  const activeCV = cvs.find((cv) => cv.id === activeId) || null;

  return {
    cvs,
    activeId,
    activeCV,
    setActiveId,
    createCV,
    updateCV,
    deleteCV,
  };
}
