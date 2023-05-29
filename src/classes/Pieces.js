export class Piece {

    constructor(colour, name) {
        this.colour = colour;
        this.name = name;
    }

}

export class Pawn extends Piece {

    // we need to know this to determine whether we can move two places or not.
    hasMoved = false;

    constructor(colour, name) {
        super(colour, name);
    }

}

export class Bishop extends Piece {

    constructor(colour, name) {
        super(colour, name);
    }

}

export class Knight extends Piece {

    constructor(colour, name) {
        super(colour, name);
    }

}

export class Rook extends Piece {

    hasMoved = false;

    constructor(colour, name) {
        super(colour, name);
    }

}

export class King extends Piece {

    // we need to know this to determine whether we can castle or not.
    hasCastled = false;
    hasMoved = false;

    constructor(colour, name) {
        super(colour, name);
    }

}

export class Queen extends Piece {

    constructor(colour, name) {
        super(colour, name);
    }

}

export class Empty extends Piece {

    constructor(colour, name) {
        super(colour, name);
    }
}
