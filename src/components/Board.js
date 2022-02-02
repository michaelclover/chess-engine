import React from 'react';
import Square from './Square';

const totalSquares = 64;

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: [totalSquares],
        }
    }

    render() {
        let squares = [];
        for(let i = 0; i < totalSquares; ++i) {
            squares.push(<Square value={i}/>);
        }
        return <div>{squares}</div>;
    }
}

export default Board;