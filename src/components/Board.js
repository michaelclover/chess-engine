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
            tileInfo: [], // holds both the piece logical state and the piece render state.
            boardFlipped: false, // which way the board is rendered. false = white at the bottom.
            fromIndex: -1, // store the current tile drag index.
            whiteMove: true, // white or black to move.
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.setupBoard();
    }

    setupBoard() {
        for(let i = 0; i < NUM_OF_SQUARES; ++i) {
            let piece = Helpers.setupBoardClassic(i);
            let renderElem = <Square number={i} pieceName={piece.name} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}/>;
            this.state.tileInfo.push({"piece": piece, "renderElem": renderElem})
        }
    }

    onMouseDown(from) {
        this.setState(prevState => ({
            fromIndex: from
        }));
    }

    onMouseUp(toIndex) {
        // ignore the drag and drop if we've dragged and dropped on the same tile
        // or if the tile number is invalid.
        let fromIndex = this.state.fromIndex;
        if(toIndex === fromIndex ||
           toIndex === -1) {
              return;
        }

        let tileInfo = this.state.tileInfo;

        if(Logic.IsLegalMove(tileInfo[fromIndex].piece,
                             tileInfo[toIndex].piece,
                             this.state.whiteMove,
                             tileInfo,
                             fromIndex,
                             toIndex)) {
            // update the pieces game state.
            tileInfo[toIndex].piece = tileInfo[fromIndex].piece;
            tileInfo[fromIndex].piece = new Pieces.Empty("", "empty-square");

            // store the state in our react render components.
            tileInfo[fromIndex].renderElem = <Square number={fromIndex}
                                    pieceName={tileInfo[fromIndex].piece.name}
                                    onMouseDown={this.onMouseDown}
                                    onMouseUp={this.onMouseUp}/>;

            tileInfo[toIndex].renderElem = <Square number={toIndex}
                                  pieceName={tileInfo[toIndex].piece.name}
                                  onMouseDown={this.onMouseDown}
                                  onMouseUp={this.onMouseUp}/>;

            // invert the turn state after the move.
            this.state.whiteMove = !this.state.whiteMove;

            // call set state so react re-renders the props.
            this.setState(prevState => ({
                tileInfo: tileInfo
            }));
        }
    }

    render() {
        if(!this.state.boardFlipped) {
            return (
                <div class="board">
                    <div class="odd-row">{this.state.tileInfo.slice(56, 64).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.tileInfo.slice(48, 56).map(({renderElem}) => renderElem)}</div>
                    <div class="odd-row">{this.state.tileInfo.slice(40, 48).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.tileInfo.slice(32, 40).map(({renderElem}) => renderElem)}</div>
                    <div class="odd-row">{this.state.tileInfo.slice(24, 32).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.tileInfo.slice(16, 24).map(({renderElem}) => renderElem)}</div>
                    <div class="odd-row">{this.state.tileInfo.slice(8, 16).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.tileInfo.slice(0, 8).map(({renderElem}) => renderElem)}</div>
                </div>
            );
        }
        else {
            return (
                <div class="board">
                    <div class="odd-row">{this.state.squares.slice(0, 8).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.squares.slice(8, 16).map(({renderElem}) => renderElem)}</div>
                    <div class="odd-row">{this.state.squares.slice(16, 24).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.squares.slice(24, 32).map(({renderElem}) => renderElem)}</div>
                    <div class="odd-row">{this.state.squares.slice(32, 40).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.squares.slice(40, 48).map(({renderElem}) => renderElem)}</div>
                    <div class="odd-row">{this.state.squares.slice(48, 56).map(({renderElem}) => renderElem)}</div>
                    <div class="even-row">{this.state.squares.slice(56, 64).map(({renderElem}) => renderElem)}</div>
                </div>
            );
        }
    }
}

export default Board;
