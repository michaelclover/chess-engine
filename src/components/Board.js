import React from 'react';
import Square from './Square';
import * as Helpers from '../helpers/Helpers';
import * as Logic from '../logic/Logic';
import * as Pieces from '../classes/Pieces';

const NUM_OF_SQUARES = 64;

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: [],
            pieces: [],
            boardFlipped: false, // white starts at the bottom.
            from: -1, // store the current tile drag index.
            whiteMove: true, // white or black to move.
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.setupBoard();
    }

    setupBoard() {
        for(let i = 0; i < NUM_OF_SQUARES; ++i) {
            let piece = Helpers.setupBoardClassic(i);
            this.state.squares.push(<Square number={i}
                                            piece={piece}
                                            notation={Helpers.indexToTileNotation[i]}
                                            onMouseDown={this.onMouseDown}
                                            onMouseUp={this.onMouseUp}/>);
            this.state.pieces.push(piece); // I'm not sure how to access 'piece' in the above array,
            // so I've copied reference to the element here, in pieces.
        }
    }

    onMouseDown(from) {
        this.setState(prevState => ({
            from: from
        }));
    }

    onMouseUp(to) {
        let from = this.state.from;
        if(to === this.state.from || // dropped and dragged on same tile.
           to === -1) { // piece number is invalid.
              return;
        }

        let squares = this.state.squares;
        let pieces = this.state.pieces;

        if(Logic.processMove(this.state.pieces[from], this.state.pieces[to], this.state.whiteMove)) {
            pieces[to] = pieces[from];
            pieces[from] = new Pieces.Empty("", "empty-square");

            squares[from] = <Square number={from}
                                    piece={pieces[from]}
                                    notation={Helpers.indexToTileNotation[from]}
                                    isFirstMove={false}
                                    onMouseDown={this.onMouseDown}
                                    onMouseUp={this.onMouseUp}/>;

            squares[to] = <Square number={to}
                                  piece={pieces[to]}
                                  notation={Helpers.indexToTileNotation[to]}
                                  isFirstMove={false}
                                  onMouseDown={this.onMouseDown}
                                  onMouseUp={this.onMouseUp}/>;

            this.state.whiteMove = !this.state.whiteMove;

            this.setState(prevState => ({
                squares: squares
            }));
        }
    }

    render() {
        if(!this.state.boardFlipped) {
            return (
                <div class="board">
                    <div class="odd-row">{this.state.squares.slice(56, 64)}</div>
                    <div class="even-row">{this.state.squares.slice(48, 56)}</div>
                    <div class="odd-row">{this.state.squares.slice(40, 48)}</div>
                    <div class="even-row">{this.state.squares.slice(32, 40)}</div>
                    <div class="odd-row">{this.state.squares.slice(24, 32)}</div>
                    <div class="even-row">{this.state.squares.slice(16, 24)}</div>
                    <div class="odd-row">{this.state.squares.slice(8, 16)}</div>
                    <div class="even-row">{this.state.squares.slice(0, 8)}</div>
                </div>
            );
        }
        else {
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
}

export default Board;
