import { Change } from '../types/change';

// Symulacja danych dla testowania
const mockChanges: Change[] = [
  {
    id: 'ECR-001',
    title: 'Zmiana materiału obudowy turbiny',
    description: 'Zamiast aluminium użyć kompozytu węglowego, co zwiększy wytrzymałość i zmniejszy wagę.',
    author: 'Jan Kowalski',
    createdAt: '2025-02-10T10:30:00Z',
    status: 'New',
    priority: 'High',
    impactArea: 'Production',
    requiredDate: '2025-05-01',
    justification: 'Obecny materiał jest podatny na korozję w warunkach morskich.',
    // Nowe pola
    boatRange: 'range-001', // SX
    model: 'model-001', // SX320
    suggestedBy: 'Dział Inżynierii',
    typeOfChange: 'type-001', // Improvement
    reasonOfChange: 'reason-002', // Quality Issue
    estimatedCostOfLabor: 12500,
    estimatedCostOfParts: 45000,
    votingStatus: 'Pending'
  },
  {
    id: 'ECR-002',
    title: 'Modyfikacja procedury montażu silnika',
    description: 'Uproszczenie procedury montażu poprzez zmianę kolejności instalacji komponentów.',
    author: 'Anna Nowak',
    createdAt: '2025-02-15T14:45:00Z',
    status: 'InProgress',
    priority: 'Medium',
    impactArea: 'Production',
    requiredDate: '2025-04-15',
    justification: 'Aktualna procedura jest czasochłonna i generuje wiele błędów montażowych.',
    // Nowe pola
    boatRange: 'range-001', // SX
    model: 'model-002', // SX400
    suggestedBy: 'Dział Produkcji',
    typeOfChange: 'type-003', // New Feature
    reasonOfChange: 'reason-004', // Cost Optimization
    estimatedCostOfLabor: 8000,
    estimatedCostOfParts: 12000,
    votingStatus: 'InProgress'
  },
  {
    id: 'ECR-003',
    title: 'Zmiana dostawcy układów sterowania',
    description: 'Przejście z dostawcy A na dostawcę B ze względu na lepszą jakość i niższe koszty.',
    author: 'Piotr Wiśniewski',
    createdAt: '2025-02-20T09:15:00Z',
    status: 'Approved',
    priority: 'Medium',
    impactArea: 'Sourcing',
    requiredDate: '2025-03-30',
    justification: 'Obecny dostawca ma problemy z terminowością dostaw i jakością produktów.',
    // Nowe pola
    boatRange: 'range-002', // NX
    model: 'model-003', // NX380
    suggestedBy: 'Dział Zakupów',
    typeOfChange: 'type-002', // Correction
    reasonOfChange: 'reason-002', // Quality Issue
    estimatedCostOfLabor: 0,
    estimatedCostOfParts: 25000,
    votingStatus: 'Completed',
    votes: [
      {
        id: 'vote-001',
        userId: 'user-001',
        userName: 'Marek Nowak',
        decision: 'Yes',
        timestamp: '2025-02-22T10:30:00Z'
      },
      {
        id: 'vote-002',
        userId: 'user-002',
        userName: 'Aleksandra Kowalska',
        decision: 'Yes',
        timestamp: '2025-02-22T11:15:00Z'
      },
      {
        id: 'vote-003',
        userId: 'user-003',
        userName: 'Tomasz Lewandowski',
        decision: 'No',
        timestamp: '2025-02-22T14:45:00Z',
        comments: 'Potrzebne więcej danych o jakości produktów nowego dostawcy.'
      }
    ]
  },
  {
    id: 'ECR-004',
    title: 'Aktualizacja dokumentacji technicznej silnika SF-100',
    description: 'Aktualizacja rysunków technicznych i specyfikacji po wprowadzonych zmianach.',
    author: 'Magdalena Lewandowska',
    createdAt: '2025-02-25T11:20:00Z',
    status: 'Resolved',
    priority: 'Low',
    impactArea: 'Documentation',
    requiredDate: '2025-03-15',
    justification: 'Dokumentacja jest nieaktualna po ostatnich zmianach konstrukcyjnych.',
    // Nowe pola
    boatRange: 'range-003', // FX
    model: 'model-004', // FX590
    suggestedBy: 'Dział Techniczny',
    typeOfChange: 'type-003', // New Feature
    reasonOfChange: 'reason-005', // Regulatory Compliance
    estimatedCostOfLabor: 5000,
    estimatedCostOfParts: 0,
    votingStatus: 'Completed',
    votes: [
      {
        id: 'vote-004',
        userId: 'user-001',
        userName: 'Marek Nowak',
        decision: 'Yes',
        timestamp: '2025-02-26T09:30:00Z'
      },
      {
        id: 'vote-005',
        userId: 'user-002',
        userName: 'Aleksandra Kowalska',
        decision: 'Yes',
        timestamp: '2025-02-26T10:15:00Z'
      }
    ]
  },
  {
    id: 'ECR-005',
    title: 'Modyfikacja systemu chłodzenia w modelu X-500',
    description: 'Dodanie dodatkowego wentylatora i zmodyfikowanie układu chłodzenia w celu poprawy wydajności.',
    author: 'Robert Zieliński',
    createdAt: '2025-03-01T13:10:00Z',
    status: 'UnderReview',
    priority: 'Critical',
    impactArea: 'Design',
    requiredDate: '2025-04-01',
    justification: 'Obecny system chłodzenia jest niewystarczający przy długotrwałej pracy pod obciążeniem.',
    // Nowe pola
    boatRange: 'range-001', // SX
    model: 'model-001', // SX320
    suggestedBy: 'Dział Inżynierii',
    typeOfChange: 'type-001', // Improvement
    reasonOfChange: 'reason-003', // Safety Concern
    estimatedCostOfLabor: 18000,
    estimatedCostOfParts: 32000,
    votingStatus: 'InProgress'
  },
  {
    id: 'ECR-006',
    title: 'Zmiana procedury testów jakościowych',
    description: 'Wprowadzenie dodatkowych testów wytrzymałościowych i wydłużenie czasu testów.',
    author: 'Katarzyna Dąbrowska',
    createdAt: '2025-03-05T10:05:00Z',
    status: 'Rejected',
    priority: 'Medium',
    impactArea: 'Quality',
    requiredDate: '2025-04-10',
    justification: 'Zwiększona liczba reklamacji z powodu awarii po dłuższym okresie użytkowania.',
    // Nowe pola
    boatRange: 'range-002', // NX
    model: 'model-003', // NX380
    suggestedBy: 'Dział Jakości',
    typeOfChange: 'type-002', // Correction
    reasonOfChange: 'reason-001', // Customer Request
    estimatedCostOfLabor: 15000,
    estimatedCostOfParts: 5000,
    votingStatus: 'Canceled'
  },
];

// Simuluje opóźnienie sieciowe
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Pobierz wszystkie zmiany
export const getMockChanges = async (): Promise<Change[]> => {
  await delay(500);
  return [...mockChanges];
};

// Pobierz zmianę po ID
export const getChangeById = async (id: string): Promise<Change> => {
  await delay(300);
  const change = mockChanges.find(c => c.id === id);
  if (!change) {
    throw new Error(`Change with ID ${id} not found`);
  }
  return { ...change };
};

// Dodaj nową zmianę
export const submitChangeRequest = async (data: any): Promise<Change> => {
  await delay(800);
  const newChange: Change = {
    id: `ECR-${String(mockChanges.length + 1).padStart(3, '0')}`,
    title: data.title,
    description: data.description,
    author: 'Bieżący użytkownik', // W rzeczywistej aplikacji byłby to zalogowany użytkownik
    createdAt: new Date().toISOString(),
    status: 'New',
    priority: data.priority,
    // Nowe pola
    boatRange: data.boatRange,
    model: data.model,
    suggestedBy: data.suggestedBy,
    typeOfChange: data.typeOfChange,
    reasonOfChange: data.reasonOfChange,
    estimatedCostOfLabor: data.estimatedCostOfLabor,
    estimatedCostOfParts: data.estimatedCostOfParts,
    votingStatus: 'Pending',
    // Istniejące pola
    impactArea: data.impactArea,
    requiredDate: data.requiredDate,
    justification: data.justification,
  };
  
  mockChanges.push(newChange);
  return newChange;
};

// Aktualizuj status zmiany
export const updateChangeStatus = async (id: string, newStatus: string): Promise<Change> => {
  await delay(500);
  const index = mockChanges.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error(`Change with ID ${id} not found`);
  }
  
  const updatedChange = { 
    ...mockChanges[index], 
    status: newStatus as any
  };
  
  mockChanges[index] = updatedChange;
  return updatedChange;
};

// Dodaj głos dla zmiany
export const addVoteForChange = async (
  changeId: string, 
  userId: string, 
  userName: string, 
  decision: 'Yes' | 'No', 
  comments?: string
): Promise<Change> => {
  await delay(500);
  const index = mockChanges.findIndex(c => c.id === changeId);
  if (index === -1) {
    throw new Error(`Change with ID ${changeId} not found`);
  }
  
  const change = mockChanges[index];
  
  // Inicjalizacja tablicy głosów, jeśli nie istnieje
  if (!change.votes) {
    change.votes = [];
  }
  
  // Sprawdź, czy użytkownik już głosował
  const existingVoteIndex = change.votes.findIndex(v => v.userId === userId);
  
  if (existingVoteIndex >= 0) {
    // Aktualizuj istniejący głos
    change.votes[existingVoteIndex] = {
      ...change.votes[existingVoteIndex],
      decision,
      comments,
      timestamp: new Date().toISOString()
    };
  } else {
    // Dodaj nowy głos
    const newVote = {
      id: `vote-${Date.now()}`,
      userId,
      userName,
      decision,
      comments,
      timestamp: new Date().toISOString()
    };
    
    change.votes.push(newVote);
  }
  
  // Aktualizuj status głosowania jeśli potrzeba
  if (change.votingStatus === 'Pending') {
    change.votingStatus = 'InProgress';
  }
  
  return { ...change };
};

// Zakończ głosowanie
export const completeVoting = async (changeId: string): Promise<Change> => {
  await delay(500);
  const index = mockChanges.findIndex(c => c.id === changeId);
  if (index === -1) {
    throw new Error(`Change with ID ${changeId} not found`);
  }
  
  const change = mockChanges[index];
  
  // Sprawdź czy można zakończyć głosowanie
  if (change.votingStatus !== 'InProgress') {
    throw new Error('Voting is not in progress');
  }
  
  // Zakończ głosowanie
  change.votingStatus = 'Completed';
  
  // Określ status zmiany na podstawie głosów
  if (change.votes) {
    const yesVotes = change.votes.filter(v => v.decision === 'Yes').length;
    const totalVotes = change.votes.length;
    
    // Jeśli więcej niż 50% głosów jest pozytywnych, zmiana jest zatwierdzona
    if (yesVotes / totalVotes > 0.5) {
      change.status = 'Approved';
    } else {
      change.status = 'Rejected';
    }
  }
  
  return { ...change };
};

// Anuluj głosowanie
export const cancelVoting = async (changeId: string): Promise<Change> => {
  await delay(500);
  const index = mockChanges.findIndex(c => c.id === changeId);
  if (index === -1) {
    throw new Error(`Change with ID ${changeId} not found`);
  }
  
  const change = mockChanges[index];
  
  // Sprawdź czy można anulować głosowanie
  if (change.votingStatus === 'Completed') {
    throw new Error('Voting is already completed');
  }
  
  // Anuluj głosowanie
  change.votingStatus = 'Canceled';
  
  return { ...change };
};
