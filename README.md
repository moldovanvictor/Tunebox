# Tunebox

Tunebox is a digital music library where you can visualize artists, their albums, and view a description and list of songs for each album. It also includes an autocomplete search component to provide suggestions as you enter a search query.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/moldovanvictor/tunebox.git
    cd tunebox
    ```

2. **Navigate to the server directory and install dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **Navigate to the client directory and install dependencies:**
    ```bash
    cd ../client
    npm install
    ```

## Running the Project

1. **Start the JSON server:**
    ```bash
    cd server
    npm run json-server
    ```

    This will start the JSON server at `http://localhost:3001`.

2. **Start the Vue client:**
    ```bash
    cd ../client
    npm run serve
    ```

    This will start the Vue development server at `http://localhost:8080`.

## Project Structure
```
Tunebox/
├── client/
│ ├── node_modules/
│ ├── public/
│ │ ├── favicon.ico
│ │ └── index.html
│ ├── src/
│ │ ├── assets/
│ │ │ └── logo.png
│ │ ├── components/
│ │ │ ├── AlbumDetails.vue
│ │ │ ├── ArtistDetails.vue
│ │ │ ├── ArtistList.vue
│ │ │ ├── HelloWorld.vue
│ │ │ └── SearchBar.vue
│ │ ├── router/
│ │ │ └── index.js
│ │ ├── App.vue
│ │ ├── main.js
│ │ ├── babel.config.js
│ │ ├── jsconfig.json
│ │ ├── package-lock.json
│ │ ├── package.json
│ │ └── vue.config.js
├── data/
│ └── data.json
├── server/
│ ├── node_modules/
│ ├── package-lock.json
│ ├── package.json
│ └── server.js
├── .gitignore
├── LICENSE
├── package-lock.json
└── package.json
```
## Features

- List all artists and their albums.
- View detailed descriptions of albums and their songs.
- Add, edit, and delete artists, albums, and songs.
- Autocomplete search functionality for artists, albums, and songs.

## Technologies Used

- Vue.js
- JSON Server
- Node.js

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
