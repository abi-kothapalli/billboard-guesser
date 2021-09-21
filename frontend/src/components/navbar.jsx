import React, { Component } from "react";

class NavBar extends Component {
    render() {
        return (
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid mx-auto">
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
                    <div className="mr-auto">
                        <button
                            type="button"
                            tabIndex="-1"
                            className="btn btn-primary btn-sm"
                            disabled
                        >
                            Current Score: 0
                        </button>
                    </div>
                    <div className="dropdown navbar-text">
                        <button
                            type="button"
                            tabIndex="-1"
                            className="btn btn-danger btn-sm mx-2"
                            disabled
                        >
                            High Score: 0
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-dark dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="fa fa-gear fa-lg" />
                        </button>

                        <div
                            style={{ textAlign: "center", width: 200 }}
                            className="dropdown-menu dropdown-menu-right"
                        >
                            <span>
                                <button className="btn btn-secondary btn-sm">
                                    <span className="fa fa-minus fa-sm" />
                                </button>
                                <button
                                    type="button"
                                    tabIndex="-1"
                                    className="btn btn-outline-dark btn-sm mx-2"
                                    disabled
                                >
                                    Songs: 3
                                </button>
                                <button className="btn btn-secondary btn-sm">
                                    <span className="fa fa-plus fa-sm" />
                                </button>
                            </span>
                            <div className="dropdown-divider"></div>
                            <a
                                className="dropdown-item btn-danger"
                                id="resetBtn"
                                href="#"
                            >
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
