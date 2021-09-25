import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import NavBar from "./components/navbar";
import Loading from "./components/loading";
import SongDashboard from "./components/songDashboard";
import "./App.css";

export default class App extends Component {
    state = {
        backendActive: false, // Is backend running
        backendReady: false, // Is backend running but not finished webscraping
        songDifficulty: 3, // Number of songs to display per user guess
        currScore: 0, // Number of correct answers in a row

        // Gets high score from local storage so that the score persists across runs
        highScore: parseInt(localStorage.getItem("highScore")) || 0,

        // Contains info on each song so that they can be rendered on UI
        panels: [
            {
                rank: 1,
                title: "Sample",
                artist: "Sample",
                picture: "https://example.com/",
                first: true,
                last: false,
            },
        ],
        oldPanels: [], // Contains previous set of panels so that user can still see correct answer once they submit guess

        // Contains info on all 100 songs on Hot 100 in order from rank 1 to rank 100
        songBank: [
            {
                rank: 1,
                title: "Sample",
                artist: "Sample",
                picture: "https://example.com/",
            },
        ],
        orderedSongIndices: [], // Shuffles song indices so that user can increase or decrease difficulty and thus add or remove songs from UI

        // Stores user statistics for a given run
        runStats: {
            totalCorrect: 0,
            totalGuesses: 0,
            difficultySum: 0,
        },

        // Gets all time player statistics from local storage so that the stats persis and can be updated across runs
        allStats: JSON.parse(localStorage.getItem("allStats")) || {
            totalCorrect: 0,
            totalGuesses: 0,
            difficultySum: 0,
        },
    };

    /**
     * @brief               Handler for when user wants to change the difficulty of the game
     * @details             Changes in difficulty by either adding a song for increase in
     *                      difficulty or removing a song for decrease in difficulty
     *
     * @param {int} delta   Change in difficulty, can either be +1 or -1
     *
     * @pre                 UI is displaying n songs to user, where n = songDifficulty
     * @post                UI should display (n+delta) songs to user, and songDifficulty updated to (n+delta)
     */
    handleDifficulty = (delta) => {
        // Copy songDifficulty and panels to local variables
        const songDifficulty = this.state.songDifficulty + delta;
        let newPanels = [...this.state.panels];

        // Handle whether delta === -1 or delta === 1
        if (delta === -1) {
            // Remove the n-th song from the UI

            // This implementation makes it so that if there are n songs, user
            // adds (n+1)th song, reorders songs, and then removes a song, it
            // will always remove the same (n+1)th song, not simply the last song in the UI.
            // Thus the user cannot "choose" what song to remove, so it is resistant to cheating.

            let songToRemove =
                this.state.songBank[
                    this.state.orderedSongIndices[songDifficulty]
                ];

            // Find the item that needs to be removed in the newPanels array
            let item = newPanels.filter(
                (song) =>
                    song.title === songToRemove.title &&
                    song.artist === songToRemove.artist
            )[0];

            // Remove the song from the newPanels arr
            const idx = newPanels.indexOf(item);
            newPanels.splice(idx, 1);
        } else {
            // Add a new song to the newPanels arr
            newPanels.push(
                this.state.songBank[
                    this.state.orderedSongIndices[songDifficulty - 1]
                ]
            );
            // Previous ending element is no longer the last element
            newPanels[newPanels.length - 2].last = false;
        }
        // Ensure that final element has last = true after all changes
        newPanels[newPanels.length - 1].last = true;
        // Update state
        this.setState({ songDifficulty, panels: newPanels });
    };

    /**
     * @brief                       Handles when user wants to reorder songs
     * @details                     Moves a song up or down on UI based on user
     *                              input, updates edge cases
     *
     * @param {dictionary} song     Song which is being moved
     * @param {boolean} up          Whether song is being moved up or not (in
     *                              which case it is moving down)
     *
     * @pre                         If n is the song being moved, the current order
     *                              of songs on the UI may be a, b, ..., m, n, o, ..., y, z
     * @post                        New order of songs will be a, b, ..., n, m, o, ..., y, z (if up)
     *                              or a, b, ..., m, o, n, ..., y, z (if !up)
     */
    handleMove = (song, up) => {
        // Copy panels to local variable
        let newPanels = [...this.state.panels];
        const idx = newPanels.indexOf(song);

        // Reorder songs based on whether the song is being moved up or down
        if (up) {
            newPanels[idx - 1] = { ...song };
            newPanels[idx] = { ...this.state.panels[idx - 1] };
        } else {
            newPanels[idx + 1] = { ...song };
            newPanels[idx] = { ...this.state.panels[idx + 1] };
        }

        // Update first and last for the edge cases
        newPanels[0].first = true;
        newPanels[1].first = false;
        newPanels[newPanels.length - 1].last = true;
        newPanels[newPanels.length - 2].last = false;

        // Update state
        this.setState({ panels: newPanels });
    };

    /**
     * @brief       Handler for when user submits guess
     * @details     Checks if order of songs is correct, then updates scores and
     *              player stats as necessary, and finally loads next round of songs
     *
     * @pre         currScore, highScore, runStats, allStats, and UI is set
     * @post        currScore = highScore = 0 if user incorrect, increment if correct.
     *              runStats and allStats are updated with new user guess. Show user whether
     *              they were correct or not, and load new songs into UI.ß
     */
    handleGuess = () => {
        let correct = true;

        // Copy state vars to local vars
        let currScore = this.state.currScore;
        let highScore = this.state.highScore;

        let runStats = { ...this.state.runStats };
        let allStats = { ...this.state.allStats };

        // Update runStats and allStats
        runStats.totalGuesses++;
        allStats.totalGuesses++;
        runStats.difficultySum += this.state.songDifficulty;
        allStats.difficultySum += this.state.songDifficulty;

        // Loop through songs to check if user's guess was correct
        for (let i = 1; i < this.state.songDifficulty && correct; i++) {
            if (
                parseInt(this.state.panels[i - 1].rank) >
                parseInt(this.state.panels[i].rank)
            ) {
                correct = false;
            }
        }

        // Update currScore, runStats, and allStats based on if user was correct
        if (correct) {
            $("#correctGuess").modal("show");
            currScore++;
            runStats.totalCorrect++;
            allStats.totalCorrect++;
        } else {
            $("#incorrectGuess").modal("show");
            currScore = 0;
        }

        // Update if user has new highScore
        if (currScore > highScore) {
            highScore = currScore;
        }

        // Update state
        this.setState({ currScore, highScore, runStats, allStats });

        // Store allStats and highScore to local storage so that the data persists across runs
        localStorage.setItem("allStats", JSON.stringify(allStats));
        localStorage.setItem("highScore", highScore);

        // Load new songs into UI
        this.handleSongLoad(this.state.songDifficulty);
    };

    /**
     * @brief       Handler for when user wants to reset game
     * @details     Resets all scores and player stats to clean slate, and resets data in local storage.
     *              Also resets the current songs in the UI and changes songDifficulty back to 3 (default).
     *
     * @pre         currScore, highScore, runStats, and allStats contain updated numbers on players gameplay.
     *              There are also (songDifficulty) songs loaded into the UI
     * @post        currScore = highScore = 0, runStats and allStats are reset,
     *              songDifficulty = 3, and new songs loaded into UI.
     */
    handleReset = () => {
        // Prevents user from resetting app while backend is not completely ready, as this would cause the app to crash
        if (!this.state.backendActive || !this.state.backendReady) {
            return;
        }

        // Reset all specified variables
        this.setState({
            currScore: 0,
            highScore: 0,
            songDifficulty: 3,
            allStats: {
                totalCorrect: 0,
                totalGuesses: 0,
                difficultySum: 0,
            },
            runStats: {
                totalCorrect: 0,
                totalGuesses: 0,
                difficultySum: 0,
            },
        });

        // Clear data from local storage
        localStorage.removeItem("allStats");
        localStorage.removeItem("highScore");

        // Load new songs into the UI
        this.handleSongLoad(3);
    };

    /**
     * @brief                       Loads songs into the UI
     * @details                     Shuffles songs in songBank and loads the first
     *                              (songDifficulty) songs into the UI
     *
     * @param {int} songDifficulty  Number of songs to be loaded into the UI
     *
     * @pre                         songBank has all songs loaded into it. UI may or
     *                              may not already have songs in it
     * @post                        A random (songDifficulty) number of songs will
     *                              be loaded into the UI
     */
    handleSongLoad = (songDifficulty) => {
        // Get array [0, 1, 2, ..., 99] where each num is an index to a song in songBank
        let songIndices = Array(100)
            .fill()
            .map((_, index) => index);

        // Randomly shuffle the array of indices
        let orderedSongIndices = this.shuffleIndices(songIndices);

        // Copy songs into oldPanels before they are replaced
        const oldPanels = [...this.state.panels];

        // Add the first (songDifficulty) number of songs into panels
        let panels = [];
        for (let i = 0; i < songDifficulty; i++) {
            panels.push(this.state.songBank[orderedSongIndices[i]]);
            panels[i].first = i === 0;
            panels[i].last = i === songDifficulty - 1;
        }

        // Update the state to load the new songs into the UI
        this.setState({ orderedSongIndices, panels, oldPanels });
    };

    /**
     * @brief                   Shuffles an array
     * @details                 Shuffles an array of indices into a random order
     *
     * @param {int[]} indices   Array of indices to songs in songBank
     * @returns                 Shuffled array whose contents are identical to indices param
     */
    shuffleIndices = (indices) => {
        let currIdx = indices.length,
            randIdx;

        // Loop that randomly keeps swapping elements to currIdx, effectively shuffling the array
        while (currIdx !== 0) {
            randIdx = Math.floor(Math.random() * currIdx);
            currIdx--;

            [indices[currIdx], indices[randIdx]] = [
                indices[randIdx],
                indices[currIdx],
            ];
        }

        // Return the result of the shuffle
        return indices;
    };

    /**
     * @brief       Constructor of App component
     * @details     Function that is called when the webpage is first loaded. Attempts to
     *              communicate with backend and handles response as appropriate.
     *
     * @pre         Webpage is not yet loaded
     * @post        Frontend has attempted to connect with backend and handles response as appropriate
     */
    constructor() {
        super();
        axios
            .get("http://localhost:8080/")
            .then((res) => {
                // Response was received successfully with status 200 ("OK")
                if (res.status === 200) {
                    // Update state as appropriate and include data received from backend
                    this.setState({
                        backendActive: true,
                        backendReady: true,
                        songBank: res.data,
                    });

                    // Load songs into UI
                    this.handleSongLoad(3);

                    // Display instruction menu to user on startup
                    document.getElementById("infoBtn").click();
                }
            })
            .catch((error) => {
                if (error.request.status === 0) {
                    // Backend server is not being detected, i.e. it is not running
                    this.setState({
                        backendActive: false,
                        backendReady: false,
                    });
                } else {
                    // Backend server is active but is likely sending back 425, since web scraper is not finished
                    if (error.response.status === 425) {
                        this.setState({
                            backendActive: true,
                            backendReady: false,
                        });
                    } else {
                        this.setState({
                            backendActive: false,
                            backendReady: false,
                        });
                    }
                }
            });
    }

    /**
     * @brief       Render function for App component
     * @detail      Render function for App component that loads in subcomponents
     *              depending on the state of the backend
     *
     * @returns     App component
     */
    render() {
        if (!this.state.backendActive || !this.state.backendReady) {
            // If there is any sort of issue with the backend, show the loading screen
            return (
                <React.Fragment>
                    <NavBar
                        songDifficulty={this.state.songDifficulty}
                        onDifficulty={this.handleDifficulty}
                        currScore={this.state.currScore}
                        highScore={this.state.highScore}
                        onReset={this.handleReset}
                    />
                    <main className="container">
                        <Loading backendActive={this.state.backendActive} />
                    </main>
                </React.Fragment>
            );
        } else {
            // There is no issue with the backend, so start game normally
            return (
                <React.Fragment>
                    <NavBar
                        songDifficulty={this.state.songDifficulty}
                        onDifficulty={this.handleDifficulty}
                        currScore={this.state.currScore}
                        highScore={this.state.highScore}
                        onReset={this.handleReset}
                        runStats={this.state.runStats}
                        allStats={this.state.allStats}
                    />
                    <main className="container">
                        <SongDashboard
                            panels={this.state.panels}
                            oldPanels={this.state.oldPanels}
                            onMove={this.handleMove}
                            onGuess={this.handleGuess}
                        />
                    </main>
                </React.Fragment>
            );
        }
    }
}
