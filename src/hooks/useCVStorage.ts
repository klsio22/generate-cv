import { useReducer, useEffect, useCallback } from 'react';
import type { SavedCV } from '../types';
import { defaultCV } from '../data/defaultCV';

const STORAGE_KEY = 'cv-data';



const generateNewCV = (index: number = 0): SavedCV => {
  return {
    ...defaultCV,
    id: crypto.randomUUID(),
    title: index === 0 ? 'Novo Currículo' : `Novo Currículo ${index + 1}`,
    updatedAt: Date.now(),
  };
};

// Reducer State & Actions
type State = {
  cvs: SavedCV[];
  activeId: string | null;
  initialized: boolean;
};


interface InitFromStorageAction {
  type: 'INIT_FROM_STORAGE';
}

interface CreateAction {
  type: 'CREATE';
  payload: SavedCV;
}

interface DeleteAction {
  type: 'DELETE';
  payload: { idToDelete: string; newCVIfEmpty: SavedCV };
}

interface UpdateAction {
  type: 'UPDATE';
  payload: { id: string; data: Partial<SavedCV>; updatedAt: number };
}

interface SelectAction {
  type: 'SELECT';
  payload: string;
}

interface ResetAction {
  type: 'RESET';
  payload: SavedCV[];
}

type Action =
  | InitFromStorageAction
  | CreateAction
  | DeleteAction
  | UpdateAction
  | SelectAction
  | ResetAction;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CREATE': {
      return {
        ...state,
        cvs: [...state.cvs, action.payload],
        activeId: action.payload.id,
      };
    }
    case 'DELETE': {
      const { idToDelete, newCVIfEmpty } = action.payload;
      const remaining = state.cvs.filter((cv) => cv.id !== idToDelete);

      if (remaining.length === 0) {
        return {
          ...state,
          cvs: [newCVIfEmpty],
          activeId: newCVIfEmpty.id,
        };
      }

      let newActiveId = state.activeId;
      if (state.activeId === idToDelete) {
        newActiveId = remaining[0].id;
      }

      return {
        ...state,
        cvs: remaining,
        activeId: newActiveId,
      };
    }
    case 'UPDATE': {
      const { id, data, updatedAt } = action.payload;
      const newCvs = state.cvs.map((cv) =>
        cv.id === id ? { ...cv, ...data, updatedAt } : cv
      );
      return {
        ...state,
        cvs: newCvs,
      };
    }
    case 'SELECT': {
      return {
        ...state,
        activeId: action.payload,
      };
    }
    case 'RESET': {
      const newCvs = action.payload;
      return {
        ...state,
        cvs: newCvs,
        activeId: newCvs.length > 0 ? newCvs[0].id : null,
      };
    }
    default:
      return state;
  }
}

// Initializer function to read from localStorage synchronously
function initCVState(): State {
  let initialCvs: SavedCV[] = [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        initialCvs = parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse CV data', e);
  }

  if (initialCvs.length === 0) {
    initialCvs = [generateNewCV()];
  }

  return {
    cvs: initialCvs,
    activeId: initialCvs[0].id,
    initialized: true,
  };
}

export function useCVStorage() {
  const [state, dispatch] = useReducer(reducer, null, initCVState);

  // Persist to storage whenever cvs change
  useEffect(() => {
    if (state.initialized && state.cvs.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cvs));
    }
  }, [state.cvs, state.initialized]);

  const createCV = useCallback(() => {
    const newCV = generateNewCV(state.cvs.length);
    dispatch({ type: 'CREATE', payload: newCV });
  }, [state.cvs.length]);

  const deleteCV = useCallback((id: string) => {
    // Pre-generate a new CV in case deletions make the list empty
    const newCVIfEmpty = generateNewCV();
    dispatch({
      type: 'DELETE',
      payload: { idToDelete: id, newCVIfEmpty },
    });
  }, []);

  const clearAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
    const newCV = generateNewCV(0);
    dispatch({ type: 'RESET', payload: [newCV] });
  }, []);

  const updateCV = useCallback((id: string, data: Partial<SavedCV>) => {
    dispatch({
      type: 'UPDATE',
      payload: { id, data, updatedAt: Date.now() },
    });
  }, []);

  const setActiveId = useCallback((id: string) => {
    dispatch({ type: 'SELECT', payload: id });
  }, []);

  const activeCV = state.cvs.find((cv) => cv.id === state.activeId) || null;

  return {
    cvs: state.cvs,
    activeId: state.activeId,
    activeCV,
    setActiveId,
    createCV,
    updateCV,
    deleteCV,
    clearAll,
  };
}
