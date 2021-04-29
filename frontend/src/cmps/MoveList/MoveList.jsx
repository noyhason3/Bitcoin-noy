import React from 'react';
import { MovePreview } from '../MovePreview';

export const MoveList = ({ moves }) => {
  return (
    moves?.length > 0 && (
      <section className="move-list">
        <h3 className="moves-title">Your Last moves:</h3>
        <ul>
          {moves.map((move, idx) => (
            <li key={idx}>
              <MovePreview move={move} />
            </li>
          ))}
        </ul>
      </section>
    )
  );
};
