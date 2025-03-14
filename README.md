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

### Krok 2: Uruchom skrypt konfiguracyjny

Jeśli skrypt nie uruchomił się automatycznie, wykonaj:

```bash
bash ./setup-codespace.sh
```

Skrypt wykona następujące czynności:
- Sprawdzi, czy istnieją lokalne zmiany przed resetowaniem repozytorium
- Zapewni istnienie katalogu public z niezbędnymi plikami
- Zainstaluje zależności

### Krok 3: Uruchom aplikację

Ze względu na nowszą wersję Node.js w Codespaces, uruchom aplikację używając:

```bash
bash ./start-dev.sh
```

Skrypt ten ustawi odpowiednie zmienne środowiskowe, w tym `NODE_OPTIONS=--openssl-legacy-provider`, co rozwiązuje problemy z nowszymi wersjami Node.js.

### Krok 4: Sprawdź działanie aplikacji

1. W dolnym panelu Codespaces znajdź zakładkę "PORTS"
2. Port 3000 powinien być widoczny jako "React App" z widocznością "Public"
3. Kliknij "Open in Browser" przy porcie 3000

## Rozwiązywanie problemów z Codespaces

Jeśli napotkasz problemy z uruchomieniem aplikacji w Codespaces:

1. Upewnij się, że używasz skryptu `start-dev.sh`:
   ```bash
   bash ./start-dev.sh
   ```

2. Sprawdź, czy port 3000 jest ustawiony jako "Public" w zakładce "PORTS"

3. W przypadku problemów z komponentami, możesz przełączyć się na uproszczoną wersję aplikacji:
   ```bash
   bash ./switch-app-version.sh simple
   bash ./start-dev.sh
   ```

4. Aby wrócić do pełnej wersji:
   ```bash
   bash ./switch-app-version.sh restore
   bash ./start-dev.sh
   ```

5. W przypadku błędów zależności npm, spróbuj:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

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
