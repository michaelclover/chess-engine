import React from 'react';
import * as Pieces from '../classes/Pieces';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickToggled: false,
            number: props.number, // the square number - todo: write helper function to convert number to square name.
            pieceName: props.pieceName,
            // piece: piece // deduced from the pieceName and created here.
        };
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        // unicode blank character to stop the button moving when toggled.
        const content = this.state.isClickToggled ? this.state.number : "\u2060";
        return (
            <button type="submit" className={`square ${this.props.pieceName}`} onClick={this.handleClick}>{content}</button>
        );
    }

    handleClick() {
        this.setState(prevState => ({
            isClickToggled: !prevState.isClickToggled
        }));
    }
}

export default Square;
