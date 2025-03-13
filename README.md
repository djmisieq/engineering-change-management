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

## Uruchomienie projektu w GitHub Codespaces

### Krok 1: Otwórz repozytorium w Codespaces

1. Na stronie repozytorium kliknij zielony przycisk "Code"
2. Przejdź do zakładki "Codespaces"
3. Kliknij "Create codespace on main"

### Krok 2: Poczekaj na inicjalizację środowiska

Środowisko zostanie automatycznie skonfigurowane dzięki plikowi `.devcontainer/devcontainer.json`.
Zależności zostaną zainstalowane automatycznie.

### Krok 3: Uruchom aplikację

```bash
npm start
```

### Krok 4: Sprawdź działanie aplikacji

1. W dolnym panelu Codespaces znajdź zakładkę "PORTS"
2. Port 3000 powinien być widoczny jako "React App" z widocznością "Public"
3. Kliknij "Open in Browser" przy porcie 3000

## Rozwiązywanie problemów z Codespaces

Jeśli napotkasz problemy z uruchomieniem aplikacji w Codespaces:

1. Sprawdź, czy port 3000 jest ustawiony jako "Public" w zakładce "PORTS"
2. Zrestartuj serwer aplikacji (`Ctrl+C` a następnie `npm start`)
3. Odśwież stronę w przeglądarce
4. Jeśli to nie pomoże, zrestartuj cały Codespace (zamknij i utwórz nowy)

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