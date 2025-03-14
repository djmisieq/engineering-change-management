// Base interface for dictionary items
export interface DictionaryItem {
  id: string;
  name: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface BoatRange extends DictionaryItem {}

export interface BoatModel extends DictionaryItem {
  boatRangeId: string; // Reference to BoatRange
}

export interface ChangeType extends DictionaryItem {
  code: string; // For example "3 - Improvement"
}

export interface ChangeReason extends DictionaryItem {}

// Type to define responses from dictionary APIs
export interface DictionaryResponse<T extends DictionaryItem> {
  items: T[];
  total: number;
}
