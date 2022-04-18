export function setupBoardClassic(i) {
    let piece = "";
    switch(i) {
        case 0:
            piece = "white-rook";
            break;
        case 1:
            piece = "white-knight";
            break;
        case 2:
            piece = "white-bishop";
            break;
        case 3:
            piece = "white-queen";
            break;
        case 4:
            piece = "white-king";
            break;
        case 5:
            piece = "white-bishop";
            break;
        case 6:
            piece = "white-knight";
            break;
        case 7:
            piece = "white-rook";
            break;
        case 8:
            piece = "white-pawn";
            break;
        case 9:
            piece = "white-pawn";
            break;
        case 10:
            piece = "white-pawn";
            break;
        case 11:
            piece = "white-pawn";
            break;
        case 12:
            piece = "white-pawn";
            break;
        case 13:
            piece = "white-pawn";
            break;
        case 14:
            piece = "white-pawn";
            break;
        case 15:
            piece = "white-pawn";
            break;
        case 48:
            piece = "black-pawn";
            break;
        case 49:
            piece = "black-pawn";
            break;
        case 50:
            piece = "black-pawn";
            break;
        case 51:
            piece = "black-pawn";
            break;
        case 52:
            piece = "black-pawn";
            break;
        case 53:
            piece = "black-pawn";
            break;
        case 54:
            piece = "black-pawn";
            break;
        case 55:
            piece = "black-pawn";
            break;
        case 56:
            piece = "black-rook";
            break;
        case 57:
            piece = "black-knight";
            break;
        case 58:
            piece = "black-bishop";
            break;
        case 59:
            piece = "black-queen";
            break;
        case 60:
            piece = "black-king";
            break;
        case 61:
            piece = "black-bishop";
            break;
        case 62:
            piece = "black-knight";
            break;
        case 63:
            piece = "black-rook";
            break;
        default:
            break;
    }
    return piece;
};
