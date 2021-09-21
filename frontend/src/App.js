import React, { Component } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import "./App.css";
import SongDashboard from "./components/songDashboard";
import axios from "axios";

export default class App extends Component {
    state = {
        songDifficulty: 3,
        currScore: 0,
        highScore: 0,
        panels: [
            {
                title: "Way 2 Sexy",
                artist: "Drake Featuring Future & Young Thug",
                picture:
                    "https://charts-static.billboard.com/img/2021/09/drake-p3d-way-2-sexy-hhn-155x155.jpg",
                first: true,
                last: false,
            },
            {
                title: "Bad Habits",
                artist: "Ed Sheeran",
                picture:
                    "https://charts-static.billboard.com/img/2021/07/ed-sheeran-tiy-bad-habits-fce-155x155.jpg",
                first: false,
                last: false,
            },
            {
                title: "Stay",
                artist: "The Kid LAROI & Justin Bieber",
                picture:
                    "https://charts-static.billboard.com/img/2021/07/the-kid-laroi-qev-stay-ens-155x155.jpg",
                first: false,
                last: true,
            },
        ],
    };

    handleDifficulty = (delta) => {
        const songDifficulty = this.state.songDifficulty + delta;
        this.setState({ songDifficulty });
    };

    handleMove = (song, up) => {
        console.log("Detected");
        let newPanels = [...this.state.panels];
        const idx = newPanels.indexOf(song);
        if (up) {
            newPanels[idx - 1] = { ...song };
            newPanels[idx] = { ...this.state.panels[idx - 1] };

            if (idx === 1) {
                newPanels[idx - 1].first = true;
                newPanels[idx].first = false;
            }

            if (idx === newPanels.length - 1) {
                newPanels[idx - 1].last = false;
                newPanels[idx].last = true;
            }
        } else {
            newPanels[idx + 1] = { ...song };
            newPanels[idx] = { ...this.state.panels[idx + 1] };

            if (idx === 0) {
                newPanels[idx + 1].first = false;
                newPanels[idx].first = true;
            }

            if (idx === newPanels.length - 2) {
                newPanels[idx + 1].last = true;
                newPanels[idx].last = false;
            }
        }
        this.setState({ panels: newPanels });
    };

    handleReset = () => {
        const songDifficulty = 3;
        const currScore = 0;
        const highScore = 0;

        this.setState({ songDifficulty, currScore, highScore });
    };

    constructor() {
        super();
        axios.get("http://localhost:8080/").then((res) => console.log(res));
    }

    render() {
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
                    <SongDashboard
                        panels={this.state.panels}
                        onMove={this.handleMove}
                    />
                </main>
            </React.Fragment>
        );
    }
}
