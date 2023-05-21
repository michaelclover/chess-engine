import * as Helpers from "../helpers/Helpers"

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
            // check for moving forward.
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
            // check for moving diagonal.
            else {
                if(p1.colour == "white") {
                    if(to == (from + 7) && p2.colour == "black") {
                        legalMoves.push(to);
                    }
                    if(to == (from + 9) && p2.colour == "black") {
                        legalMoves.push(to);
                    }
                }
                if(p1.colour == "black") {
                    if(to == (from - 7) && p2.colour == "white") {
                        legalMoves.push(to);
                    }
                    if(to == (from - 9) && p2.colour == "white") {
                        legalMoves.push(to);
                    }
                }
            }

            break;
        }
        case "Bishop":
        {
            let fromRowCol = Helpers.getRowColumnFromIndex(from);
            let toRowCol = Helpers.getRowColumnFromIndex(to);
            let dx = toRowCol[0] - fromRowCol[0]
            let dy = toRowCol[1] - fromRowCol[1]
            if(Math.abs(dx) == Math.abs(dy) && Math.abs(dx) > 0) {
                // now check to see which way we're moving, so we can
                // determine whether there are any pieces blocking our movement.
                let counter = 0;
                if(dy < 0 && dx > 0) { // up and left.
                    counter = 7;
                }
                else if(dy > 0 && dx > 0) { // up and right.
                    counter = 9;
                }
                else if(dy < 0 && dx < 0) { // down and left.
                    counter = -9;
                }
                else if(dy > 0 && dx < 0) { // down and right.
                    counter = -7;
                }

                let bIsMoveBlocked = false;
                for(let i = 0; i < Math.abs(dx) - 1; ++i) {
                    let piece = boardPieces[from + ((i + 1) * counter)].piece;
                    if(piece !== "undefined" && piece.name !== "empty-square") {
                        bIsMoveBlocked = true;
                        break;
                    }
                }

                if(!bIsMoveBlocked) {
                    // there's nothing blocking us from jumping to 'to' - now check
                    // that we can actually take 'to' - e.g. it's not our own piece.
                    if(p1.colour != p2.colour) {
                        legalMoves.push(to);
                    }
                }
            }

            break;
        }
        case "Knight":
        {
            let validMoves = [15, 17, 6, 10, -15, -17, -6, -10];
            for(const validMove of validMoves) {
                if(to == (from + validMove) && p1.colour != p2.colour) {
                    legalMoves.push(to);
                    break;
                }
            }

            break;
        }
        case "Rook":
        {
            if(p1.colour == p2.colour) {
                break;
            }
            legalMoves.push(to);
            let validLeft = [-1, -2, -3, -4, -5, -6, -7];
            let validRight = [1, 2, 3, 4, 5, 6, 7];
            let validUp = [8, 16, 24, 32, 40, 48, 56];
            let validDown = [-8, -16, -24, -32, -40, -48, -56];
            for(let i = 0; i < validLeft.length; ++i) {
                if(to == (from + validLeft[i])) {
                    for(let j = i - 1; j >= 0; --j) {
                        if(boardPieces[from + validLeft[j]].piece.constructor.name !== "Empty") {
                            legalMoves.clear();
                        }
                    }
                    break;
                }
                else if(to == (from + validRight[i])) {
                    for(let j = i - 1; j >= 0; --j) {
                        if(boardPieces[from + validRight[j]].piece.constructor.name !== "Empty") {
                            legalMoves.clear();
                        }
                    }
                    break;
                }
                else if(to == (from + validUp[i])) {
                    for(let j = i - 1; j >= 0; --j) {
                        if(boardPieces[from + validUp[j]].piece.constructor.name !== "Empty") {
                            legalMoves.clear();
                        }
                    }
                    break;
                }
                else if(to == (from + validDown[i])) {
                    for(let j = i - 1; j >= 0; --j) {
                        if(boardPieces[from + validDown[j]].piece.constructor.name !== "Empty") {
                            legalMoves.clear();
                        }
                    }
                    break;
                }
            }

            break;
        }
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
        if(p1.constructor.name === "King") {
            p1.hasMoved = true;
        }
        if(p1.constructor.name === "Rook") {
            p1.hasMoved = true;
        }

        // check to see that the board state is valid. e.g. has an illegal move
        // been played that leaves the current player's king in check?

        return true;
    }

    return false;
};
