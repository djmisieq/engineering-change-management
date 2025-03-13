# Chmurowy System Zarządzania Zmianą Inżynieryjną

## Opis projektu

System do zarządzania zmianami inżynieryjnymi (Engineering Change Management), który umożliwia sprawne wprowadzanie, śledzenie i zatwierdzanie modyfikacji w procesach produkcji. System zapewnia pełną transparentność i zgodność zmian poprzez procesy weryfikacji, akceptacji i dokumentowania (ECN/ECR).

## Funkcjonalności

- Formularz "Request for Change" do zgłaszania zmian inżynieryjnych
- Dashboard z listą zgłoszeń z podziałem na etapy procesu
- Szczegółowy widok zgłoszenia z prezentacją statusu i historii
- Proces zatwierdzania zmian z wieloetapowym workflow

## Technologie

- Frontend: React z TypeScript
- UI Library: Material-UI
- Routing: React Router
- Zarządzanie stanem: React Hooks
- Mock API: do symulacji backendu

## Uruchomienie projektu

### Wymagania wstępne

- Node.js >= 18.x
- npm >= 9.x

### Instalacja i uruchomienie

1. Sklonuj repozytorium:
```bash
git clone https://github.com/djmisieq/engineering-change-management.git
cd engineering-change-management
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom aplikację:
```bash
npm start
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

## Struktura projektu

```
src/
├── components/      # Komponenty wielokrotnego użytku
├── pages/           # Główne widoki/strony aplikacji
├── services/        # Usługi i API
├── types/           # Definicje typów TypeScript
├── App.tsx          # Główny komponent aplikacji
└── index.tsx        # Punkt wejściowy aplikacji
```

## Rozwój projektu

Projekt jest rozwijany iteracyjnie, począwszy od MVP skoncentrowanego na froncie, a następnie rozszerzany o pełną integrację z backendem i dodatkowe funkcjonalności.

### Plany rozwoju

- Integracja z rzeczywistym backendem
- System zarządzania rolami i uprawnieniami
- Generowanie dokumentów ECN w formacie PDF
- Integracja z systemem ERP
- Moduł komunikacji wewnętrznej
