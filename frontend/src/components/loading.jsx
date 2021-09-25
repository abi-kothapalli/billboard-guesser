import React, { Component } from "react";
import axios from "axios";

export default class Loading extends Component {
    // If the backend is active, refresh the page every 2 seconds to check when it is ready,
    // if it is not active, refresh the page every 7 seconds until the backend is running
    state = { seconds: this.props.backendActive ? 2 : 7 };

    // Start running timer after the component mounts, and every time the component updates
    componentDidMount() {
        this.handleTimer();
    }

    componentDidUpdate() {
        this.handleTimer();
    }

    /**
     * @brief       Handler for timer on loading screen
     * @details     Counts down the seconds, and when it hits 0, it handles it as
     *              appropriate depending on the status of the backend server.
     *
     * @pre         App is displaying only the NavBar and Loading components
     * @post        Either seconds counts down 1, or when it hits 0, it handles it as appropriate.
     */
    handleTimer = () => {
        const seconds = this.state.seconds;
        if (seconds > 0) {
            // Count down seconds
            setTimeout(() => this.setState({ seconds: seconds - 1 }), 1000);
        } else {
            // Timer has hit 0
            if (!this.props.backendActive) {
                // Backend is not even active so we are waiting for the backend to start running.
                // We simply reload the page here.
                window.location.reload();
            } else {
                // Backend is active, but likely sending back 425 ("Too Early") since the webscraper
                // has not yet finished running.
                axios
                    .get("http://localhost:8080/")
                    .then((res) => {
                        // If res is successfully recieved, that means webscraper is finished and
                        // backend ready, so we simply reload the page to send the user into the gameplay
                        window.location.reload();
                    })
                    .catch((error) => {
                        if (error.request.status === 0) {
                            // Backend server is not being detected
                            window.location.reload();
                        } else {
                            if (error.response.status === 425) {
                                // Backend server is still loading, so keep counting
                                this.setState({ seconds: 2 });
                            } else {
                                // Some other error with the backend, so reload to handle it
                                window.location.reload();
                            }
                        }
                    });
            }
        }
    };

    /**
     * @brief           Render function for Loading component
     * @details         Either renders a loading screen if waiting on backend, or a message
     *                  to the user that the backend is not running
     *
     * @returns         Loading component
     *
     * @pre             Component is displaying message to user depending on whether backend is
     *                  active or not
     * @post            Component will countdown or reload the page when seconds is 0, in an
     *                  attempt to continuously try resolving the issue with the backend
     */
    render() {
        if (!this.props.backendActive) {
            // Display message that the backend is not being detected
            return (
                <div className="mt-3">
                    <div className="jumbotron">
                        <h1 className="display-4">Oh, no!</h1>
                        <p className="lead">
                            <strong>
                                We could not reach the backend server.
                            </strong>{" "}
                            Please ensure that the backend server is active when
                            trying to access this webpage. Once the backend
                            server is active, you may manually refresh this page
                            or wait for the page to automatically reload.
                        </p>
                        <hr className="my-4" />
                        <div className="d-flex align-items-center">
                            <p>
                                This webpage will automatically be reloaded in{" "}
                                {this.state.seconds} seconds...
                            </p>
                            <div
                                className="spinner-border ml-auto"
                                role="status"
                                aria-hidden="true"
                            ></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            // Display message that the backend is not ready yet and the page will load once ready
            return (
                <div className="mt-3">
                    <div className="jumbotron">
                        <h1 className="display-4">Loading...</h1>
                        <p className="lead">
                            <strong>This webpage is currently loading.</strong>{" "}
                            Please be patient.
                        </p>
                        <hr className="my-4" />
                        <div className="d-flex align-items-center">
                            <p>
                                This webpage will automatically be reloaded once
                                ready.
                            </p>
                            <div
                                className="spinner-border ml-auto"
                                role="status"
                                aria-hidden="true"
                            ></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
