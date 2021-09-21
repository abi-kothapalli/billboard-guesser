# Change++ Coding Challenge: Billboard Guesser Game

## Usage

To run the final product, first navigate to a directory on your local machine where you would like to download the project.

In this directory, run:

    git clone git@github.com:ChangePlusPlusVandy/change-coding-challenge-2021-abi-kothapalli.git

Navigate into the downloaded directory with:

    cd change-coding-challenge-2021-abi-kothapalli/

To run the entire application (both the frontend and backend), run:

    npm run app

To run only the frontend:

    npm run frontend

To run only the backend:

    npm run backend

The frontend should then be accessible at http://localhost:3000/ and the backend should be accessible at http://localhost:8080/.

## Project Structure

### Base Structure

    .
    ├── backend                         # Contains all code to run the NodeJS RESTful API backend
    ├── frontend                        # Contains all code to run the ReactJS frontend UI
    ├── node_modules
    ├── PROJECT_SPEC.md                 # Original project specifications
    ├── README.md                       # README file
    ├── output.csv
    ├── package-lock.json
    └── package.json

### Backend

    .
    ├── backend
    │   ├── node_modules
    │   ├── chromedriver
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── scraper.py                  # Python web scraping script to retrieve Billboards Hot 100 songs
    │   ├── scraper2.py
    │   ├── server.js                   # RESTful API backend built using NodeJS
    │   └── test.py                     # Testing script to test integration of script into Node backend
    └── ...

### Frontend

    .
    ├── ...
    ├── frontend
    │   ├── node_modules
    │   ├── public                      # Contains index.html and favicons for webpage
    │   ├── src
    │   │   ├── components              # Contains all components built into webpage
    │   │   ├── App.css                 # Contains some CSS styling
    │   │   ├── App.js                  # Contains main App component
    │   │   ├── App.test.js
    │   │   ├── index.css
    │   │   ├── index.js                # Renders App component on page
    │   │   ├── reportWebVitals.js
    │   │   ├── setupTests.js
    │   │   ├── setupTests.js
    │   ├── .gitignore
    │   ├── README.md
    │   ├── package-lock.json
    │   ├── package.json
    └── ...

## Reflection

## Future Steps
