# Chmurowy System Zarządzania Zmianą Inżynieryjną

## Opis projektu

System do zarządzania zmianami inżynieryjnymi (Engineering Change Management), który umożliwia sprawne wprowadzanie, śledzenie i zatwierdzanie modyfikacji w procesach produkcji. System zapewnia pełną transparentność i zgodność zmian poprzez procesy weryfikacji, akceptacji i dokumentowania (ECN/ECR).

## Szczegółowy poradnik uruchomienia w GitHub Codespaces

### Przygotowanie

1. Na stronie repozytorium kliknij zielony przycisk "Code"
2. Przejdź do zakładki "Codespaces"
3. Kliknij "Create codespace on main"
4. Poczekaj na pełne uruchomienie środowiska Codespaces

### Metoda 1: Jednokrokowe uruchomienie (zalecane)

Ta metoda używa kompleksowego skryptu, który wykonuje wszystkie niezbędne kroki:

```bash
chmod +x ./codespaces-start.sh
./codespaces-start.sh
```

Skrypt automatycznie:
- Instaluje i konfiguruje Node.js 16
- Instaluje zależności npm
- Wykonuje diagnostykę portów
- Konfiguruje zmienne środowiskowe
- Uruchamia aplikację z odpowiednimi ustawieniami

### Metoda 2: Krok po kroku

Jeśli wolisz ręczne wykonanie poszczególnych kroków:

#### Krok 1: Zainstaluj właściwą wersję Node.js

```bash
# Zainstaluj Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Załaduj NVM do bieżącej sesji
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Zainstaluj i użyj Node.js 16
nvm install 16
nvm use 16

# Sprawdź wersję
node -v
# Powinna wyświetlić się wersja 16.x.x
```

#### Krok 2: Zainstaluj zależności

```bash
# Usuń istniejące zależności
rm -rf node_modules
rm -f package-lock.json

# Zainstaluj zależności z flagą legacy-peer-deps
npm install --legacy-peer-deps
```

#### Krok 3: Uruchom aplikację z odpowiednimi flagami

```bash
# Ustaw zmienne środowiskowe i uruchom aplikację
BROWSER=none HOST=0.0.0.0 PORT=3000 DANGEROUSLY_DISABLE_HOST_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm start
```

### Diagnostyka i rozwiązywanie problemów

Po uruchomieniu aplikacji, przejdź do zakładki PORTS w dolnym panelu i upewnij się, że port 3000 jest widoczny. Jeśli nie jest publiczny, kliknij prawym przyciskiem myszy i zmień widoczność na "Public".

#### Problem: Port 3000 nie jest aktywny

Wykonaj następujące czynności diagnostyczne:

```bash
# Uruchom skrypt diagnostyczny portów
chmod +x ./diagnose-port.sh
./diagnose-port.sh
```

Następnie przetestuj port za pomocą prostego serwera Express:

```bash
# Uruchom testowy serwer Express
chmod +x ./test-express.sh
./test-express.sh
```

Jeśli testowy serwer Express działa poprawnie, a aplikacja React nie, oznacza to, że problem leży w aplikacji React, a nie w konfiguracji portu.

#### Problem: Błąd "digital envelope routines::unsupported"

Ten błąd występuje w nowszych wersjach Node.js. Rozwiązanie:

```bash
# Uruchom skrypt naprawczy wersji Node.js
chmod +x ./fix-node-version.sh
./fix-node-version.sh
```

#### Problem: Uproszczona wersja aplikacji

Jeśli nadal masz problemy, możesz przetestować uproszczoną wersję aplikacji:

```bash
# Przełącz na uproszczoną wersję aplikacji
chmod +x ./switch-app-version.sh
./switch-app-version.sh simple

# Uruchom aplikację
npm start
```

#### Sprawdzenie logów aplikacji

```bash
# Uruchom z pełnymi logami
npm start --verbose
```

### Dostęp do uruchomionej aplikacji

Gdy aplikacja jest uruchomiona:

1. Przejdź do zakładki "PORTS" w dolnym panelu Codespaces
2. Znajdź port 3000 (powinien być opisany jako "React App")
3. Upewnij się, że port ma widoczność "Public"
4. Kliknij ikonę "Open in Browser" obok portu 3000

Aplikacja otworzy się w nowej karcie przeglądarki.

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
