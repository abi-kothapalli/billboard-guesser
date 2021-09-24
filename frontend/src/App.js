import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import NavBar from "./components/navbar";
import Loading from "./components/loading";
import SongDashboard from "./components/songDashboard";
import "./App.css";

export default class App extends Component {
    state = {
        backendActive: false,
        backendReady: false,
        songDifficulty: 3,
        currScore: 0,
        highScore: localStorage.getItem("highScore") || 0,
        panels: [],
        oldPanels: [],
        songBank: [],
        orderedSongIndices: [],
        testStats: {
            totalCorrect: 0,
            totalGuesses: 0,
            difficultySum: 0,
        },
        runStats: {
            totalCorrect: 0,
            totalGuesses: 0,
            difficultySum: 0,
        },
        allStats: JSON.parse(localStorage.getItem("allStats")) || {
            totalCorrect: 0,
            totalGuesses: 0,
            difficultySum: 0,
        },
    };

    handleDifficulty = (delta) => {
        const songDifficulty = this.state.songDifficulty + delta;
        let newPanels = [...this.state.panels];
        if (delta === -1) {
            let songToRemove =
                this.state.songBank[
                    this.state.orderedSongIndices[songDifficulty]
                ];

            let item = newPanels.filter(
                (song) =>
                    song.title === songToRemove.title &&
                    song.artist === songToRemove.artist
            )[0];

            const idx = newPanels.indexOf(item);
            newPanels.splice(idx, 1);
        } else {
            newPanels.push(
                this.state.songBank[
                    this.state.orderedSongIndices[songDifficulty - 1]
                ]
            );
            newPanels[newPanels.length - 2].last = false;
        }
        newPanels[newPanels.length - 1].last = true;
        this.setState({ songDifficulty, panels: newPanels });
    };

    handleMove = (song, up) => {
        let newPanels = [...this.state.panels];
        const idx = newPanels.indexOf(song);

        if (up) {
            newPanels[idx - 1] = { ...song };
            newPanels[idx] = { ...this.state.panels[idx - 1] };
        } else {
            newPanels[idx + 1] = { ...song };
            newPanels[idx] = { ...this.state.panels[idx + 1] };
        }

        newPanels[0].first = true;
        newPanels[1].first = false;
        newPanels[newPanels.length - 1].last = true;
        newPanels[newPanels.length - 2].last = false;

        this.setState({ panels: newPanels });
    };

    handleGuess = () => {
        let correct = true;
        let currScore = this.state.currScore;
        let highScore = this.state.highScore;

        let runStats = { ...this.state.runStats };
        let allStats = { ...this.state.allStats };

        runStats.totalGuesses++;
        allStats.totalGuesses++;
        runStats.difficultySum += this.state.songDifficulty;
        allStats.difficultySum += this.state.songDifficulty;

        for (let i = 1; i < this.state.songDifficulty && correct; i++) {
            if (
                parseInt(this.state.panels[i - 1].rank) >
                parseInt(this.state.panels[i].rank)
            ) {
                correct = false;
            }
        }

        if (correct) {
            $("#correctGuess").modal("show");
            currScore++;
            runStats.totalCorrect++;
            allStats.totalCorrect++;
        } else {
            $("#incorrectGuess").modal("show");
            currScore = 0;
        }

        if (currScore > highScore) {
            highScore = currScore;
        }

        this.setState({ currScore, highScore, runStats, allStats });
        localStorage.setItem("allStats", JSON.stringify(allStats));
        localStorage.setItem("highScore", highScore);
        this.handleSongLoad(this.state.songDifficulty);
    };

    handleReset = () => {
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

        localStorage.removeItem("allStats");
        localStorage.removeItem("highScore");
        this.handleSongLoad(3);
    };

    handleSongLoad = (songDifficulty) => {
        let songIndices = Array(100)
            .fill()
            .map((_, index) => index);
        let orderedSongIndices = this.shuffleIndices(songIndices);

        const oldPanels = this.state.panels;

        let panels = [];
        for (let i = 0; i < songDifficulty; i++) {
            panels.push(this.state.songBank[orderedSongIndices[i]]);
            panels[i].first = i === 0;
            panels[i].last = i === songDifficulty - 1;
        }
        this.setState({ orderedSongIndices, panels, oldPanels });
    };

    shuffleIndices = (indices) => {
        let currIdx = indices.length,
            randIdx;

        while (currIdx !== 0) {
            randIdx = Math.floor(Math.random() * currIdx);
            currIdx--;

            // And swap it with the current element.
            [indices[currIdx], indices[randIdx]] = [
                indices[randIdx],
                indices[currIdx],
            ];
        }

        return indices;
    };

    constructor() {
        super();
        axios
            .get("http://localhost:8080/")
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        backendActive: true,
                        backendReady: true,
                        songBank: res.data,
                    });
                    this.handleSongLoad(3);
                    document.getElementById("infoBtn").click();
                }
            })
            .catch((error) => {
                if (error.request.status === 0) {
                    // Backend server is not being detected
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

    render() {
        if (!this.state.backendActive || !this.state.backendReady) {
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
