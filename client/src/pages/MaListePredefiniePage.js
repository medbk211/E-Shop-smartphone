import React from 'react';
import MaListePredefinie from '../componnet/MaListePredefinie';

export default function MaListePredefiniePage({ favoris, removeFromFavorise ,addToCart}) {
  return (
    <div>
      <MaListePredefinie favoris={favoris} removeFromFavorise={removeFromFavorise} addToCart={addToCart} />
    </div>
  );
}
