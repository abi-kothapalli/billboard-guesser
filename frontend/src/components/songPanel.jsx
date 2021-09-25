import React, { Component } from "react";

export default class SongPanel extends Component {
    /**
     * @brief       Render function for SongPanel component
     * @details     Render function for SongDashboard component that displays the song image,
     *              the song title and artist, and buttons so that the user can reorder
     *              the songs however they wish
     *
     * @returns     SongPanel component
     */
    render() {
        return (
            <div>
                <div
                    className="card flex-row flex-wrap mx-auto my-3 shadow"
                    style={{ width: "100%", position: "center" }}
                >
                    {/* Displays the image for the song */}
                    <div className="card-header border-0 songPanelImgDiv">
                        <img
                            src={this.props.songInfo.picture}
                            className="songPanelImg mx-auto"
                            alt={this.props.songInfo.title}
                        />
                    </div>

                    {/* Displays the song title and artist */}
                    <div className="card-body card-block my-auto panelBody">
                        <h3 className="card-title">
                            {this.props.songInfo.title}
                        </h3>
                        <h5 className="card-text">
                            {this.props.songInfo.artist}
                        </h5>
                    </div>

                    {/* Displays the two buttons for the user to move the song up or down.
                        Disables the up button if it is the first song on the page, and disables
                        the down button if it is the last song on the page. */}
                    <div className="my-auto mr-3 mx-auto">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg mt-2 mb-1 mr-2"
                            onClick={() =>
                                this.props.onMove(this.props.songInfo, true)
                            }
                            disabled={this.props.songInfo.first}
                        >
                            <span className="fa fa-arrow-up fa-lg" />
                        </button>
                        <br />
                        <button
                            type="button"
                            className="btn btn-primary btn-lg mt-1 mb-2 mr-2"
                            onClick={() =>
                                this.props.onMove(this.props.songInfo, false)
                            }
                            disabled={this.props.songInfo.last}
                        >
                            <span className="fa fa-arrow-down fa-lg" />
                        </button>
                    </div>
                    <div className="w-150"></div>
                </div>
            </div>
        );
    }
}
