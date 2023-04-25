// p1 - the piece that is being moved.
// p2 - the piece that is being moved to.
// whiteMove - true if it's white's move.
// boardPieces - the list of all the board pieces. needed to determine if e.g. the move is legal.
// from - the index of the tile we're moving to. e.g. 0 = A1, 1 = B1, 62 = G8, 63 = H8.
// to - the index of the tile we're moving to.
export function IsLegalMove(p1, p2, whiteMove, boardPieces, from, to) {
    if(whiteMove === true && p1.colour === "black")
    {
        return false;
    }

    if(whiteMove === false && p1.colour === "white")
    {
        return false;
    }

    let legalMoves = [];
    switch(p1.constructor.name) {
        case "Pawn":
        {
            // check to see if there's anything blocking a single move forward.
            if(boardPieces[to].piece.constructor.name === "Empty") {
                if(p1.colour == "white") {
                    legalMoves.push(from + 8);
                    // check whether we can move two squares forward.
                    if(!p1.hasMoved) {
                        legalMoves.push(from + 16);
                    }
                }
                if(p1.colour == "black") {
                    legalMoves.push(from - 8);
                    if(!p1.hasMoved) {
                        legalMoves.push(from - 16);
                    }
                }
            }
            else {
                if(p1.colour == "white") {
                    if(to == (from + 7) && p2.colour == "black") {
                        legalMoves.push(from + 7);
                    }
                    if(to == (from + 9) && p2.colour == "black") {
                        legalMoves.push(from + 9);
                    }
                }
                if(p1.colour == "black") {
                    if(to == (from - 7) && p2.colour == "white") {
                        legalMoves.push(from - 7);
                    }
                    if(to == (from - 9) && p2.colour == "white") {
                        legalMoves.push(from - 9);
                    }
                }
            }

            break;
        }
        case "Bishop":
            break;
        case "Knight":
            break;
        case "Rook":
            break;
        case "King":
            break;
        case "Queen":
            break;
        default:
            return false; // empty square or some undetermined piece type.
    }

    if(legalMoves.includes(to)) {
        if(p1.constructor.name === "Pawn") {
            p1.hasMoved = true;
        }

        // check to see that the board state is valid. e.g. has an illegal move
        // been played that leaves the current player's king in check?

        return true;
    }
    else { // the move isn't legal.
        return false;
    }
};
