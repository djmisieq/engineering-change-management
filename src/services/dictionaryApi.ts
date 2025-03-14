import { 
  DictionaryItem, 
  DictionaryResponse,
  BoatRange,
  BoatModel,
  ChangeType,
  ChangeReason
} from '../types/dictionaries';

// Symulacja opóźnienia sieciowego
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Przykładowe dane dla słownika zakresów łodzi
const mockBoatRanges: BoatRange[] = [
  {
    id: 'range-001',
    name: 'SX',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'range-002',
    name: 'NX',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'range-003',
    name: 'FX',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'range-004',
    name: 'RX',
    isArchived: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-02-15T00:00:00Z'
  }
];

// Przykładowe dane dla słownika modeli łodzi
const mockBoatModels: BoatModel[] = [
  {
    id: 'model-001',
    name: 'SX320',
    boatRangeId: 'range-001',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'model-002',
    name: 'SX400',
    boatRangeId: 'range-001',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'model-003',
    name: 'NX380',
    boatRangeId: 'range-002',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'model-004',
    name: 'FX590',
    boatRangeId: 'range-003',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// Przykładowe dane dla słownika typów zmian
const mockChangeTypes: ChangeType[] = [
  {
    id: 'type-001',
    name: 'Improvement',
    code: '3 - Improvement',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'type-002',
    name: 'Correction',
    code: '2 - Correction',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'type-003',
    name: 'New Feature',
    code: '1 - New Feature',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'type-004',
    name: 'Cost Reduction',
    code: '4 - Cost Reduction',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// Przykładowe dane dla słownika powodów zmian
const mockChangeReasons: ChangeReason[] = [
  {
    id: 'reason-001',
    name: 'Customer Request',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'reason-002',
    name: 'Quality Issue',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'reason-003',
    name: 'Safety Concern',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'reason-004',
    name: 'Cost Optimization',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'reason-005',
    name: 'Regulatory Compliance',
    isArchived: false,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

// Generyczna funkcja do pobierania elementów słownika
const getDictionaryItems = async <T extends DictionaryItem>(
  items: T[],
  includeArchived: boolean = false
): Promise<DictionaryResponse<T>> => {
  await delay(300);
  
  const filteredItems = includeArchived 
    ? items 
    : items.filter(item => !item.isArchived);
  
  return {
    items: [...filteredItems],
    total: filteredItems.length
  };
};

// Funkcje API dla poszczególnych słowników
export const getBoatRanges = async (includeArchived: boolean = false): Promise<DictionaryResponse<BoatRange>> => {
  return getDictionaryItems(mockBoatRanges, includeArchived);
};

export const getBoatModels = async (
  rangeId?: string,
  includeArchived: boolean = false
): Promise<DictionaryResponse<BoatModel>> => {
  await delay(300);
  
  let filteredItems = mockBoatModels;
  
  // Filtruj po zakresie łodzi, jeśli podano
  if (rangeId) {
    filteredItems = filteredItems.filter(model => model.boatRangeId === rangeId);
  }
  
  // Filtruj zarchiwizowane, jeśli nie uwzględniamy
  if (!includeArchived) {
    filteredItems = filteredItems.filter(item => !item.isArchived);
  }
  
  return {
    items: [...filteredItems],
    total: filteredItems.length
  };
};

export const getChangeTypes = async (includeArchived: boolean = false): Promise<DictionaryResponse<ChangeType>> => {
  return getDictionaryItems(mockChangeTypes, includeArchived);
};

export const getChangeReasons = async (includeArchived: boolean = false): Promise<DictionaryResponse<ChangeReason>> => {
  return getDictionaryItems(mockChangeReasons, includeArchived);
};

// Funkcje do zarządzania słownikami (dla administratora)

// Dodaj nowy element do słownika
export const addDictionaryItem = async <T extends DictionaryItem>(
  collection: T[],
  item: Omit<T, 'id' | 'createdAt' | 'isArchived'>
): Promise<T> => {
  await delay(500);
  
  const newItem = {
    ...item,
    id: `item-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isArchived: false
  } as T;
  
  collection.push(newItem);
  return newItem;
};

// Aktualizuj element słownika
export const updateDictionaryItem = async <T extends DictionaryItem>(
  collection: T[],
  id: string,
  updates: Partial<Omit<T, 'id' | 'createdAt'>>
): Promise<T> => {
  await delay(500);
  
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error(`Item with ID ${id} not found`);
  }
  
  const updatedItem = {
    ...collection[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  collection[index] = updatedItem;
  return updatedItem;
};

// Archiwizuj element słownika
export const archiveDictionaryItem = async <T extends DictionaryItem>(
  collection: T[],
  id: string
): Promise<T> => {
  return updateDictionaryItem(collection, id, { isArchived: true });
};

// Przywróć zarchiwizowany element słownika
export const restoreDictionaryItem = async <T extends DictionaryItem>(
  collection: T[],
  id: string
): Promise<T> => {
  return updateDictionaryItem(collection, id, { isArchived: false });
};
