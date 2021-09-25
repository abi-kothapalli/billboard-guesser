import React, { Component } from "react";
import SongPanel from "./songPanel";

export default class SongDashboard extends Component {
    /**
     * @brief                       Formats content for results screen when user submits guess
     * @details                     Formats content for the modal that is displayed when
     *                              the user submits a guess. Depending on whether the user had
     *                              the correct answer, it will display the correct order of the
     *                              songs and tell them which songs they misplaced if they did not
     *                              have the correct guess.
     *
     * @param {boolean} correct     Whether or not the user's guess was correct
     * @returns                     Output for the body of the modal that displays results
     */
    formatOutput = (correct) => {
        // The songs that the user just submitted a guess for will now be the oldPanels prop

        // We copy the oldPanels into a local var and then use the compareSongs() method to put them
        // in the correct order, so that we can determine if the user's guess was correct.
        let panels = [...this.props.oldPanels];
        panels.sort(this.compareSongs);

        if (correct) {
            return (
                // Displays the correct order that the user also got
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
                // Displays the user's order of songs, highlighting in red the songs that they misplaced,
                // and then shows the actual order of the songs
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

    /**
     * @brief                           Gets color to format songs if user gets a guess wrong
     * @details                         Compares the user's placement of a song to what song should
     *                                  actually be in that placement, and colors the song red if it is
     *                                  out of place and colors it black (normal) otherwise
     *
     * @param {Array} sortedPanels      Array of the songs in the correct order
     * @param {Dictionary} panel        Individual song
     * @param {int} idx                 User's placement of the individual song
     * @returns                         Hex code to either the black (correct) or red (incorrect) color
     *
     * @pre                             All songs are being displayed on the model in the default black color
     * @post                            Songs that the user misplaced are highlighted in red
     */
    getColor = (sortedPanels, panel, idx) => {
        // If the user's placement of the song in panel is at index, that means they got it correct
        // so the default color is returned. Otherwise, red is returned to indicate that the color was wrong.
        if (panel === sortedPanels[idx]) {
            return "#212529";
        } else {
            return "#df4759";
        }
    };

    /**
     * @brief                       Function to compare which of two songs is higher ranked
     * @details                     Function that is used by the Array.sort() method to put the
     *                              songs in the correct order, so that they can be compared to the
     *                              order the user put them in.
     *
     * @param {Dictionary} a        A given song
     * @param {Dictionary} b        Another song to be compared to a and then sorted
     *
     * @returns                     Returns -1 if a should be before b, 1 if b should be before
     *                              a, and 0 if they are the same song.
     */
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

    /**
     * @brief       Render function for SongDashboard component
     * @details     Render function for SongDashboard component that loads in the
     *              individuals songs as SongPanel components. Also displays the Guess!
     *              button that the user clicks when they want to submit their guess, and
     *              two modals, one that displays when a user has a correct guess, and the
     *              other when the user has an incorrect guess.
     *
     * @returns     SongDashboard component
     */
    render() {
        return (
            <div>
                {/* Displays each individuall SongPanel for each song that should be in the UI */}
                {this.props.panels.map((panel) => (
                    <React.Fragment>
                        <SongPanel
                            songInfo={panel}
                            onMove={this.props.onMove}
                        />
                    </React.Fragment>
                ))}

                {/* Button for user to submit guess */}
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-success btn-lg shadow-lg mb-3"
                        id="guessBtn"
                        onClick={this.props.onGuess}
                    >
                        Guess!
                    </button>
                </div>

                {/* Modal that displays when the user submits a correct guess */}
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

                {/* Modal that displays when the user submits an incorrect guess */}
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
