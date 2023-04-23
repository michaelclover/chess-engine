export function processMove(p1, p2, whiteMove) {
    if(whiteMove === true && p1.colour === "black")
    {
        return false;
    }

    if(whiteMove === false && p1.colour === "white")
    {
        return false;
    }

    return true;
};
