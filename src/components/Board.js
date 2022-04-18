import React from 'react';
import Square from './Square';
import * as Helpers from '../helpers/Helpers';

const NUM_OF_SQUARES = 64;

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: [],
        }

        this.setupBoard();
    }

    setupBoard() {
        for(let i = 0; i < NUM_OF_SQUARES; ++i) {
            let piece = Helpers.setupBoardClassic(i);
            this.state.squares.push(<Square number={i} pieceName={piece}/>);
        }
    }

    render() {
        return (
            <div class="board">
                <div class="odd-row">{this.state.squares.slice(0, 8)}</div>
                <div class="even-row">{this.state.squares.slice(8, 16)}</div>
                <div class="odd-row">{this.state.squares.slice(16, 24)}</div>
                <div class="even-row">{this.state.squares.slice(24, 32)}</div>
                <div class="odd-row">{this.state.squares.slice(32, 40)}</div>
                <div class="even-row">{this.state.squares.slice(40, 48)}</div>
                <div class="odd-row">{this.state.squares.slice(48, 56)}</div>
                <div class="even-row">{this.state.squares.slice(56, 64)}</div>
            </div>
        );
    }
}

export default Board;
