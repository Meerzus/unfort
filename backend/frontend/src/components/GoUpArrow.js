import React from 'react';

function GoUpArrow() {

    const goUpHandler = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <button id='go-up-btn' onClick={goUpHandler}>
            <i className="fa-solid fa-arrow-up" id='go-up-arrow'></i>
        </button>
    );
}

export default GoUpArrow;