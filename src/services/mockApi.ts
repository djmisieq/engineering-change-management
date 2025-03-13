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