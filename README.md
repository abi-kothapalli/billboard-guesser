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

If you encounter any errors when attempting to run the app, it may likely be due to dependency issues. Ensure you have the dependency that raised the error, and rerun the app.

## Project Structure

### Base Structure

    .
    ├── backend                         # Contains all code to run the Node.js RESTful API backend
    ├── frontend                        # Contains all code to run the React.js frontend UI
    ├── node_modules
    ├── PROJECT_SPEC.md                 # Original project specifications
    ├── README.md                       # This README file
    ├── output.csv
    ├── package-lock.json
    └── package.json                    # Contains some information regarding dependencies for the project and commands to run the app

### Backend

    .
    ├── backend
    │   ├── node_modules
    │   ├── botScraper.py               # Python web scraping script built with Beautiful Soup and Selenium that scrapes Billboards Hot 100 Charts
    │   ├── chromedriver                # Driver dependency for Chrome that is used by the Selenium web driver
    │   ├── package-lock.json
    │   ├── package.json                # Contains some information regarding dependencies for the backend
    │   └── server.js                   # RESTful API backend built using Node.js
    └── ...

### Frontend

    .
    ├── ...
    ├── frontend
    │   ├── node_modules
    │   ├── public                      # Contains index.html and favicons for webpage
    │   ├── src
    │   │   ├── components              # Contains all components built into webpage (Loading, NavBar, SongDashboard, SongPanel)
    │   │   ├── App.css                 # Contains some CSS styling
    │   │   ├── App.js                  # Contains main App component
    │   │   ├── App.test.js
    │   │   ├── index.css
    │   │   ├── index.js                # Renders App component on page
    │   │   ├── reportWebVitals.js
    │   │   ├── setupTests.js
    │   ├── README.md
    │   ├── package-lock.json
    │   ├── package.json                # Contains some information regarding dependencies for the frontend
    └── ...

## Reflection

I really enjoyed this project and am certain that I learned a lot of useful skills from it. When I first saw the project specifications, I was a bit overwhelmed, particularly because I did not have any experience with Node.js, React.js, or web scraping, and only moderate experience with HTML, CSS, and JavaScript. However, I learned a lot about Node.js, React.js, and web scraping with Python, and was honestly surprised that they were not as difficult as I expected. I also learned a good deal of Bootstrap to style my frontend, and a lot more JavaScript in general. Ultimately, I really enjoyed the experience of building this project from scratch, and I am very satisfied with my results.

## Future Steps

There are a few things that I would do with this application if I was given more time, but they are all minor things for the most part. First, while I did my best to optimize the frontend for a wide range of screen sizes, at a certain point, when the screen gets too small, the frontend begins to get distorted. This would be a problem if anyone on a tablet or phone wanted to use this, so I would need to optimize with a lot of CSS in the future.

Also, when the user tries to change the difficulty of the game in the frontend, the menu that is used to change the difficulty disappears after one click, preventing the user from increasing or decreasing the difficulty of the game by more than 1 at once. This is a minor annoyance, that I would attempt to fix if given more time.

I also was considering using a drag-n-drop feature for the user to order the songs on the frontend, but ultimately opted with using arrow buttons instead, as I liked the aesthetic more. Perhaps in the future I could’ve made both options available to the user, as drag-n-drop would certainly look very smooth and make the frontend feel more modern.

Finally, one larger-scale feature that I think would be cool is a system where the user could input their name, and save their name and high score to a MongoDB or someother database, and then generate a global leaderboard where users could compare their scores to each other and compete over time.
