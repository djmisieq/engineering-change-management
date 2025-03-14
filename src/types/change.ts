import { BoatRange, BoatModel, ChangeType, ChangeReason } from './dictionaries';

export interface Change {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  status: ChangeStatus;
  priority: ChangePriority;
  
  // Nowe pola zgodne z wymaganiami
  boatRange?: string; // ID z słownika BoatRange
  model?: string; // ID z słownika BoatModel
  suggestedBy?: string; // Osoba, która zasugerowała zmianę
  typeOfChange?: string; // ID z słownika ChangeType
  reasonOfChange?: string; // ID z słownika ChangeReason
  estimatedCostOfLabor?: number;
  estimatedCostOfParts?: number;
  
  // Istniejące pola opcjonalne
  impactArea?: string;
  requiredDate?: string;
  justification?: string;
  history?: ChangeHistoryItem[];
  comments?: Comment[];
  attachments?: Attachment[];
  
  // Pola związane z głosowaniem
  votingStatus?: VotingStatus;
  votes?: Vote[];
}

export type ChangeStatus =
  | 'New'
  | 'UnderReview'
  | 'InProgress'
  | 'Approved'
  | 'Implementing'
  | 'Resolved'
  | 'Rejected';

export type ChangePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type VotingStatus = 'Pending' | 'InProgress' | 'Completed' | 'Canceled';

export interface Vote {
  id: string;
  userId: string;
  userName: string;
  decision: 'Yes' | 'No';
  timestamp: string;
  comments?: string;
}

export interface ChangeHistoryItem {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  oldValue?: string;
  newValue?: string;
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}
