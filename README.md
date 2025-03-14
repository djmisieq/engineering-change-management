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

### ⚠️ Ważna informacja o wersji Node.js

Projekt wymaga Node.js w wersji 16. Nowsze wersje (17+) powodują błędy OpenSSL.

### Krok 1: Otwórz repozytorium w Codespaces

1. Na stronie repozytorium kliknij zielony przycisk "Code"
2. Przejdź do zakładki "Codespaces"
3. Kliknij "Create codespace on main"

### Krok 2: Napraw wersję Node.js

Po otwarciu Codespaces, wykonaj poniższy skrypt aby zainstalować poprawną wersję Node.js:

```bash
bash ./fix-node-version.sh
```

Skrypt ten:
- Zainstaluje NVM (Node Version Manager)
- Zmieni wersję Node.js na 16
- Przeinstaluje zależności npm

### Krok 3: Uruchom aplikację

Po naprawieniu wersji Node.js, uruchom aplikację standardowym poleceniem:

```bash
npm start
```

### Krok 4: Sprawdź działanie aplikacji

1. W dolnym panelu Codespaces znajdź zakładkę "PORTS"
2. Port 3000 powinien być widoczny jako "React App" z widocznością "Public"
3. Kliknij "Open in Browser" przy porcie 3000

## Rozwiązywanie problemów z Codespaces

### Błąd "digital envelope routines::unsupported"

Błąd ten występuje w nowszych wersjach Node.js (17+) przy starszych aplikacjach React. Rozwiązanie:

```bash
bash ./fix-node-version.sh
```

### Inne problemy:

1. W przypadku problemów z komponentami, możesz przełączyć się na uproszczoną wersję aplikacji:
   ```bash
   bash ./switch-app-version.sh simple
   npm start
   ```

2. Aby wrócić do pełnej wersji:
   ```bash
   bash ./switch-app-version.sh restore
   npm start
   ```

3. W przypadku problemów z Codespaces, możesz utworzyć nową instancję:
   - Zamknij bieżący Codespace
   - Utwórz nowy Codespace
   - Uruchom skrypt naprawiający wersję Node.js

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
