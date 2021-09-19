import React, { Component } from "react";

export default class Counter extends Component {
    render() {
        return (
            <React.Fragment>
                <span
                    style={{ display: "inline-block", width: 50, padding: 10 }}
                    className={this.getBadgeClasses()}
                >
                    {this.formatValue()}
                </span>
                <button
                    onClick={() => this.props.onIncrement(this.props.counter)}
                    className="btn btn-secondary btn-sm"
                >
                    Increment
                </button>
                <button
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                    className="btn btn-danger btn-sm m-2"
                >
                    Delete
                </button>
            </React.Fragment>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }

    formatValue() {
        const { value } = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
}
