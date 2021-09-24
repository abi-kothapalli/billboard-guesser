import React, { Component } from "react";
import SongPanel from "./songPanel";

export default class SongDashboard extends Component {
    formatOutput = (correct) => {
        let panels = [...this.props.oldPanels];
        panels.sort(this.compareSongs);

        if (correct) {
            return (
                <React.Fragment>
                    <br /> <br />
                    <strong style={{ color: "#42ba96" }}>
                        The correct order was:
                    </strong>
                    <br />
                    <ol className="answer">
                        {panels.map((panel) => (
                            <React.Fragment>
                                <li>{`${panel.title} — ${panel.artist} (Rank: ${panel.rank})`}</li>
                            </React.Fragment>
                        ))}
                    </ol>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <br /> <br />
                    <strong style={{ color: "#df4759" }}>
                        Your order was:
                    </strong>
                    <br />
                    <ol className="answer">
                        {this.props.oldPanels.map((panel, idx) => (
                            <React.Fragment>
                                <li
                                    style={{
                                        color: this.getColor(
                                            panels,
                                            panel,
                                            idx
                                        ),
                                    }}
                                >{`${panel.title} — ${panel.artist} (Rank: ${panel.rank})`}</li>
                            </React.Fragment>
                        ))}
                    </ol>
                    <strong style={{ color: "#df4759" }}>
                        The correct order was:
                    </strong>
                    <br />
                    <ol>
                        {panels.map((panel) => (
                            <React.Fragment>
                                <li>{`${panel.title} — ${panel.artist} (Rank: ${panel.rank})`}</li>
                            </React.Fragment>
                        ))}
                    </ol>
                </React.Fragment>
            );
        }
    };

    getColor = (sortedPanels, panel, idx) => {
        if (panel === sortedPanels[idx]) {
            return "#212529";
        } else {
            return "#df4759";
        }
    };

    compareSongs = (a, b) => {
        a.rank = parseInt(a.rank);
        b.rank = parseInt(b.rank);

        if (a.rank < b.rank) {
            return -1;
        }
        if (a.rank > b.rank) {
            return 1;
        }
        return 0;
    };

    render() {
        return (
            <div>
                {this.props.panels.map((panel) => (
                    <React.Fragment>
                        <SongPanel
                            songInfo={panel}
                            onMove={this.props.onMove}
                        />
                    </React.Fragment>
                ))}
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-success btn-lg shadow-lg mb-3"
                        id="guessBtn"
                        onClick={this.props.onGuess}
                    >
                        Guess!
                    </button>
                </div>

                <div
                    className="modal fade"
                    id="correctGuess"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="staticBackdropLabel"
                                    style={{ color: "#42ba96" }}
                                >
                                    Correct!
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                You got it right!{"\n"}
                                {this.formatOutput(true)}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="modal fade"
                    id="incorrectGuess"
                    data-backdrop="static"
                    data-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="staticBackdropLabel"
                                    style={{ color: "#df4759" }}
                                >
                                    Incorrect!
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                You got it wrong, sorry!{"\n"}
                                {this.formatOutput(false)}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
