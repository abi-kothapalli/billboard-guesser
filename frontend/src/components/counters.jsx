import React, { Component } from "react";
import Counter from "./counter";

export default class Counters extends Component {
    render() {
        const { onReset, counters, onDelete, onIncrement } = this.props;

        return (
            <div>
                {counters.map((counter) => (
                    <React.Fragment>
                        <Counter
                            key={counter.id}
                            onDelete={onDelete}
                            onIncrement={onIncrement}
                            counter={counter}
                        />
                        <br />
                    </React.Fragment>
                ))}
                <button
                    onClick={onReset}
                    className="btn btn-primary btn-sm m-2"
                >
                    Reset
                </button>
            </div>
        );
    }
}
