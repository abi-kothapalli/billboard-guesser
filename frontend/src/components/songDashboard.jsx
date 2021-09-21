import React, { Component } from "react";
import SongPanel from "./songPanel";
import $ from "jquery";

export default class SongDashboard extends Component {
    handleGuess = () => {
        let cond = false;

        if (cond) {
            $("#correctGuess").modal("show");
        } else {
            $("#incorrectGuess").modal("show");
        }
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
                        onClick={this.handleGuess}
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
                            <div className="modal-body">You got it right!</div>
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
                                You got it wrong, sorry!
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
