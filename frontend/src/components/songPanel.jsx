import React, { Component } from "react";

export default class SongPanel extends Component {
    render() {
        return (
            <div>
                <div
                    className="card flex-row flex-wrap mx-auto my-3 shadow"
                    style={{ width: "100%", position: "center" }}
                >
                    <div className="card-header border-0 songPanelImgDiv">
                        <img
                            src={this.props.songInfo.picture}
                            className="songPanelImg mx-auto"
                            alt={this.props.songInfo.title}
                        />
                    </div>
                    <div className="card-body card-block my-auto panelBody">
                        <h3 className="card-title">
                            {this.props.songInfo.title}
                        </h3>
                        <h5 className="card-text">
                            {this.props.songInfo.artist}
                        </h5>
                    </div>
                    <div className="my-auto mr-3 mx-auto">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg mt-2 mb-1 mr-2"
                            style={{ height: "100%" }}
                        >
                            <span className="fa fa-arrow-up fa-lg" />
                        </button>
                        <br />
                        <button
                            type="button"
                            className="btn btn-primary btn-lg mt-1 mb-2 mr-2"
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
