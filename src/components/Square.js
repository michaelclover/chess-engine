import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickToggled: false,
            number: props.number, // the square number. Use helper function to convert to notation.
            pieceName: props.pieceName,
        };
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    render() {
        // unicode blank character to stop the button moving when toggled.
        const content = this.state.isClickToggled ? this.state.number : "\u2060";
        return (
            <button type="submit"
                    className={`square ${this.props.pieceName}`}
                    onClick={this.handleClick}
                    onMouseUp={this.onMouseUp}
                    onMouseDown={this.onMouseDown}>
                    {content}
            </button>
        );
    }

    onMouseUp(e) {
        //console.log("mouse up on tile: ", this.props.notation);
        this.props.onMouseUp(this.props.number); // lift state up to the board to handle the logic.
    }

    onMouseDown(e) {
        //console.log("mouse down on tile: ", this.props.notation);
        this.props.onMouseDown(this.props.number); // lift state up to the board to handle the logic.
    }
}

export default Square;
