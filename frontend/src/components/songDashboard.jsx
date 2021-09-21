import React, { Component } from "react";
import SongPanel from "./songPanel";

export default class SongDashboard extends Component {
    state = {
        panels: [
            {
                title: "Way 2 Sexy",
                artist: "Drake Featuring Future & Young Thug",
                picture:
                    "https://charts-static.billboard.com/img/2021/09/drake-p3d-way-2-sexy-hhn-155x155.jpg",
            },
            {
                title: "Montero (Call Me By Your Name)",
                artist: "Dustin Lynch Featuring Lauren Alaina Or MacKenzie Porter",
                picture:
                    "https://charts-static.billboard.com/img/2009/04/drake-p3d-155x155.jpg",
            },
        ],
    };

    render() {
        return (
            <div>
                {this.state.panels.map((panel) => (
                    <React.Fragment>
                        <SongPanel songInfo={panel} />
                    </React.Fragment>
                ))}
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-success btn-lg shadow-lg mb-3"
                        id="guessBtn"
                    >
                        Guess!
                    </button>
                </div>
            </div>
        );
    }
}
