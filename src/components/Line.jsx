import React from 'react';

const Line = ({WORD_LENGTH, guess}) => {
    const tiles = [];
    for(let i=0;i<5; i++) {
        const char = guess[i];
        tiles.push(<div key={i} className='tile'>{char}</div>)
    }
  return (
    <div className='line'>{tiles}</div>
  )
}

export default Line;