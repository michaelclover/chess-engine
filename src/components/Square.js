import React from 'react';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClickToggled: false,
            number: props.number,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        // unicode blank character to stop the button moving when toggled.
        const content = this.state.isClickToggled ? this.state.number : "\u2060"; 
        return (
            <button class="square" onClick={this.handleClick}>{content}</button>
        );
    }

    handleClick() {
        this.setState(prevState => ({
            isClickToggled: !prevState.isClickToggled
        }));
    }
}

export default Square;