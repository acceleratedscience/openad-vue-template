# OpenAD Vue Template

This a Vue template with some boilerplate code, meant as a quick-start for future IBM GUI projects.

> [!IMPORTANT]  
> Please update this template with the latest packages every time it is used to fork a new project.

### Included:

-   A Vite build of Vue with:
    -   **Vue Router**
    -   **Pinia** for state management
    -   **Vitest** for unit testing
    -   **Playwright** for end-to-end testing
    -   **ESLint** for code quality
    -   **Prettier** for code formatting
    -   **Vue DevTools 7** for debugging
-   Carbon Vue components + various fixes & improvements
-   Simplified and opinionated Carbon-based styles
-   A ready-to-roll main navigation
-   A modular API service with response/request interceptors
-   Flexible modal system
-   Baked-in responsive behavior
-   404 Error catching
-   A number of useful additional components:
    -   Icon compoment supporting dynamic SVG imports
    -   Breadcrumbs
    -   Collapsable sections
    -   Content loader
    -   Scroll-to-top icon
    -   A click-to-copy directive
-   A few example templates to get you started

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```