# Fluffy Carnival

App to see the information about your favorites Tv show

## Table of Contents

- [About the Project](#about-the-project)
- [Installation](#installation)
- [Project Architecture](#project-architecture)
- [Contributing](#contributing)
- [License](#license)

## About the Project

This project is an application where users can search, list, and view information about TV shows. It provides a user-friendly interface for browsing and accessing details about various TV shows.

**Note**: This project was developed under a tight deadline, and certain features or design patterns may not have been fully implemented. However, the necessary foundation and tests have been included to demonstrate the intended architecture.

The project utilizes the BloC (Business Logic Component) design pattern to separate the business logic from the UI components. This pattern allows for better maintainability and testability of the codebase, as well as easier tracking of state changes.

## Installation

### Recommended IDE Setup

To set up your development environment, we recommend using the following IDE setup:

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

Clone the repository:

```sh
git clone https://github.com/OliverArthur/fluffy-carnival.git
```

Navigate to the project directory and install the dependencies. Make sure you have pnpm installed. If not, you can find installation instructions at [pnpm.io](https://pnpm.io/).

```sh
cd fluffy-carnival
pnpm install
```

To run the app, use the following command from the project root:

```sh
pnpm web:dev
```

This command will start the Vite server for the web app.

Other available commands:

- `pnpm core:build`
- `pnpm core:start`
- `pnpm core:test`
- `pnpm web:dev`
- `pnpm web:build`
- `pnpm web:lint`
- `pnpm web:test`
- `pnpm web:format`
- `pnpm build:prod`

## Project Architecture

The project follows a monorepo architecture. The business logic is located in the `core` package, and the UI is in the `web` package. This monorepo structure provides several benefits, including easier code sharing and improved maintainability.

### Core Package

The `core` package contains the business logic of the application. It consists of the following directories:

- `common`: Contains common utilities and shared components used by the application.
- `entities`: Contains entity models used in the application, such as `Country`, `Episodes`, `Image`, `Rating`, and `Show`.
- `services`: Contains service modules responsible for fetching data and performing operations, such as `search` and `show`.

### Web Package

The `web` package contains the UI components and application-specific code for the frontend. It consists of the following directories:

- `assets`: Contains static assets used in the UI, such as images or fonts.
- `components`: Contains reusable UI components, including `autocomplete`, `button`, `card`, `container`, `header`, `hero`, `input`, `layouts`, `navbar`, `sections`, and `slide`.
- `router`: Contains the router configuration for the application.
- `scss`: Contains SCSS stylesheets organized using the 7-1 pattern, including settings, tools, base styles, component styles, layout styles, module styles, and utility classes.
- `store`: Contains the Vuex store modules for managing state and performing actions related to searching shows, managing shows, and performing single search operations.
- `utils`: Contains utility functions or helper modules.
- `views`: Contains the Vue components representing different views of the application.

The project structure is organized in a way that separates the business logic from the UI. The core package focuses on pure business logic, avoiding strong dependencies on frameworks to ensure easier maintenance and portability. The UI components in the web package leverage modern JavaScript features like the `Proxy` API to enable reactivity and enhance the user experience.

### TODO

- Mobile version: Close the search bar after performing a search.
- Details: Add a back button. Currently, users have to use the back button from the browser.
- Improve the UI for the list: Add more information to the card and include a sidebar with all the genres for sorting by genres.
- Replace Pinia store with the BloC pattern to further separate the logic from the UI.
- Add more test.
