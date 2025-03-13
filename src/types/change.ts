export interface Change {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  status: ChangeStatus;
  priority: ChangePriority;
  impactArea?: string;
  requiredDate?: string;
  justification?: string;
  history?: ChangeHistoryItem[];
  comments?: Comment[];
  attachments?: Attachment[];
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