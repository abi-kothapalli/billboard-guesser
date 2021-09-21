import React, { Component } from "react";
import axios from "axios";

export default class Loading extends Component {
    state = { seconds: this.props.backendActive ? 2 : 7 };

    componentDidMount() {
        this.handleTimer();
    }

    componentDidUpdate() {
        this.handleTimer();
    }

    handleTimer = () => {
        const seconds = this.state.seconds;
        if (seconds > 0) {
            setTimeout(() => this.setState({ seconds: seconds - 1 }), 1000);
        } else {
            if (!this.props.backendActive) {
                window.location.reload();
            } else {
                axios
                    .get("http://localhost:8080/")
                    .then((res) => {
                        window.location.reload();
                    })
                    .catch((error) => {
                        if (error.request.status === 0) {
                            // Backend server is not being detected
                            window.location.reload();
                        } else {
                            // Backend server is still loading, so keep counting
                            if (error.response.status === 425) {
                                this.setState({ seconds: 1 });
                            } else {
                                window.location.reload();
                            }
                        }
                    });
            }
        }
    };

    render() {
        if (!this.props.backendActive) {
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
