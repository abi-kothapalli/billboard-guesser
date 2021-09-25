import React, { Component } from "react";

class NavBar extends Component {
    /**
     * @brief                       Gets neccessary statistic to load into Player Stats menu
     * @details                     Based on statistic type (current or not current) and type (total guesses,
     *                              total correct, or average difficulty), returns the correct statistic
     *
     * @param {boolean} current     current === true means trying to get stats for current game,
     *                              current === false means trying to get all time stats
     * @param {int} type            type === 0 means trying to get total correct guesses
     *                              type === 1 means trying to get total number of guesses
     *                              type === 2 means trying to get average song difficulty
     * @returns                     Returns appropriate statistic based on parameters
     */
    formatStats = (current, type) => {
        if (current) {
            if (this.props.runStats) {
                const { totalCorrect, totalGuesses, difficultySum } =
                    this.props.runStats;

                if (type === 0) {
                    return totalCorrect;
                } else if (type === 1) {
                    return totalGuesses;
                } else {
                    if (totalGuesses === 0) {
                        return this.props.songDifficulty;
                    } else {
                        const avg = difficultySum / totalGuesses;
                        // Round avg to 2 decimal places
                        return (Math.round(avg * 100) / 100).toFixed(2);
                    }
                }
            } else {
                return "Loading...";
            }
        } else {
            if (this.props.allStats) {
                const { totalCorrect, totalGuesses, difficultySum } =
                    this.props.allStats;

                if (type === 0) {
                    return totalCorrect;
                } else if (type === 1) {
                    return totalGuesses;
                } else {
                    if (totalGuesses === 0) {
                        return this.props.songDifficulty;
                    } else {
                        const avg = difficultySum / totalGuesses;
                        // Round avg to 2 decimal places
                        return (Math.round(avg * 100) / 100).toFixed(2);
                    }
                }
            } else {
                return "Loading...";
            }
        }
    };

    /**
     * @brief           Render function for NavBar component
     * @details         Render function for NavBar that displays logo/title, current and
     *                  high scores, and the settings menu (which contains the menu to change
     *                  difficulty, see the game rules, get player statistics, and reset the game)
     *
     * @returns         NavBar component
     */
    render() {
        return (
            <React.Fragment>
                <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid mx-auto">
                        {/* Logo and Title */}
                        <a
                            className="navbar-brand"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                            href="#"
                        >
                            <img
                                src="favicon144.png"
                                alt=""
                                width="30"
                                className="logo pull-left d-inline-block align-text-top mx-2"
                            />
                            Billboard Guesser Game
                        </a>

                        {/* Current score display */}
                        <div className="mr-auto">
                            <button
                                type="button"
                                tabIndex="-1"
                                className="btn btn-primary btn-sm"
                                disabled
                            >
                                Current Score: {this.props.currScore}
                            </button>
                        </div>

                        <div className="dropdown navbar-text">
                            {/* High score display */}
                            <button
                                type="button"
                                tabIndex="-1"
                                className="btn btn-danger btn-sm mx-2"
                                disabled
                            >
                                High Score: {this.props.highScore}
                            </button>

                            {/* Settings menu */}
                            <button
                                type="button"
                                className="btn btn-sm btn-dark dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className="fa fa-gear fa-lg" />
                            </button>

                            {/* Dropdown menu that displays when settings menu is clicked */}
                            <div
                                style={{ textAlign: "center", width: 200 }}
                                className="dropdown-menu dropdown-menu-right"
                            >
                                {/* Menu to change difficulty */}
                                <span>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() =>
                                            this.props.onDifficulty(-1)
                                        }
                                        disabled={this.props.songDifficulty < 3}
                                    >
                                        <span className="fa fa-minus fa-sm" />
                                    </button>
                                    <button
                                        type="button"
                                        tabIndex="-1"
                                        className="btn btn-outline-dark btn-sm mx-2"
                                        disabled
                                    >
                                        Songs: {this.props.songDifficulty}
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() =>
                                            this.props.onDifficulty(1)
                                        }
                                        disabled={this.props.songDifficulty > 9}
                                    >
                                        <span className="fa fa-plus fa-sm" />
                                    </button>
                                </span>
                                <div className="dropdown-divider"></div>

                                {/* Game rules button */}
                                <a
                                    className="dropdown-item btn-info"
                                    id="infoBtn"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#infoModal"
                                >
                                    <span className="fa fa-info-circle" /> Game
                                    Rules
                                </a>
                                <div className="dropdown-divider"></div>

                                {/* Player stats button */}
                                <a
                                    className="dropdown-item btn-primary"
                                    id="statsBtn"
                                    href="#"
                                    data-toggle="modal"
                                    data-target="#statsModal"
                                >
                                    <span className="fa fa-bar-chart" /> Player
                                    Stats
                                </a>
                                <div className="dropdown-divider"></div>

                                {/* Reset button */}
                                <a
                                    className="dropdown-item btn-danger"
                                    id="resetBtn"
                                    href="#"
                                    onClick={this.props.onReset}
                                >
                                    <span className="fa fa-rotate-right" />
                                    {"\t"}Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Modal that displays game rules */}
                <div
                    className="modal fade"
                    id="infoModal"
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
                                    style={{ color: "#5bc0de" }}
                                >
                                    Welcome to (the amazingly named) Billboard
                                    Guesser Game!
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
                                You will be shown a random selection of songs
                                from the Billboard Hot 100 Chart. Your objective
                                is to put the songs in the same order that they
                                appear on the Hot 100 Chart. <br /> <br />
                                Use the
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm mx-1"
                                >
                                    Arrows <span className="fa fa-arrow-up" />{" "}
                                    <span className="fa fa-arrow-down" />
                                </button>
                                on each song to put the songs in the order you
                                would like, and then use the{" "}
                                <button className="btn btn-success btn-sm mx-1">
                                    Guess!
                                </button>{" "}
                                button at the bottom of the page when you think
                                you have the right order. Your{" "}
                                <button
                                    type="button"
                                    tabIndex="-1"
                                    className="btn btn-primary btn-sm mx-1"
                                    disabled
                                >
                                    Current Score
                                </button>{" "}
                                and{" "}
                                <button
                                    type="button"
                                    tabIndex="-1"
                                    className="btn btn-danger btn-sm mx-1"
                                    disabled
                                >
                                    High Score
                                </button>{" "}
                                will be displayed at the top of the screen.
                                <br />
                                <br />
                                You can increase the difficulty of the game by
                                using the{" "}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-dark mx-1"
                                >
                                    Settings{" "}
                                    <span className="fa fa-gear fa-lg" />
                                </button>{" "}
                                menu in the top right corner of the screen. You
                                can also refer back to these{" "}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-info mx-1"
                                >
                                    <span className="fa fa-info-circle" /> Game
                                    Rules
                                </button>{" "}
                                again in this menu if you wish. You will also
                                find your current and all time{" "}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary mx-1"
                                >
                                    <span className="fa fa-bar-chart" /> Player
                                    Stats
                                </button>{" "}
                                in this menu. <br />
                                <br />
                                If at any point you would like to reset the game
                                to a clean slate, you can use the{" "}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger mx-1"
                                >
                                    <span className="fa fa-rotate-right" />
                                    {"\t"}Reset
                                </button>{" "}
                                button in the{" "}
                                <button
                                    type="button"
                                    className="btn btn-sm btn-dark mx-1"
                                >
                                    Settings{" "}
                                    <span className="fa fa-gear fa-lg" />
                                </button>{" "}
                                menu.{" "}
                                <strong style={{ color: "#d9534f" }}>
                                    Use this button with caution, as it cannot
                                    be undone.
                                </strong>
                                <br />
                                <br />
                                <strong style={{ color: "#5bc0de" }}>
                                    {" "}
                                    Good luck!{" "}
                                </strong>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    data-dismiss="modal"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal that displays player stats */}
                <div
                    className="modal fade"
                    id="statsModal"
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
                                    style={{ color: "#0275d8" }}
                                >
                                    Player Statistics
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
                                <strong>Current Game Statistics:</strong>
                                <ul>
                                    <li>
                                        Total{" "}
                                        <span style={{ color: "#5cb85c" }}>
                                            Correct
                                        </span>{" "}
                                        Guesses: {this.formatStats(true, 0)}
                                    </li>
                                    <li>
                                        Total{" "}
                                        <span style={{ color: "#f0ad4e" }}>
                                            Attempted
                                        </span>{" "}
                                        Guesses: {this.formatStats(true, 1)}
                                    </li>
                                    <li>
                                        Average{" "}
                                        <span style={{ color: "#d9534f" }}>
                                            Song Difficulty
                                        </span>{" "}
                                        Count: {this.formatStats(true, 2)}
                                    </li>
                                </ul>
                                <hr />
                                <strong>All Time Statistics:</strong>
                                <ul>
                                    <li>
                                        Total{" "}
                                        <span style={{ color: "#5cb85c" }}>
                                            Correct
                                        </span>{" "}
                                        Guesses: {this.formatStats(false, 0)}
                                    </li>
                                    <li>
                                        Total{" "}
                                        <span style={{ color: "#f0ad4e" }}>
                                            Attempted
                                        </span>{" "}
                                        Guesses: {this.formatStats(false, 1)}
                                    </li>
                                    <li>
                                        Average{" "}
                                        <span style={{ color: "#d9534f" }}>
                                            Song Difficulty
                                        </span>{" "}
                                        Count: {this.formatStats(false, 2)}
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NavBar;
