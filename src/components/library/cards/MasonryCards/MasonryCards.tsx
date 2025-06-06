import React from 'react';

import card1 from '../../../../assets/images/MasonryCard/card_1.jpg';
import card10 from '../../../../assets/images/MasonryCard/card_10.jpg';
import card11 from '../../../../assets/images/MasonryCard/card_11.jpg';
import card12 from '../../../../assets/images/MasonryCard/card_12.jpg';
import card13 from '../../../../assets/images/MasonryCard/card_13.jpg';
import card14 from '../../../../assets/images/MasonryCard/card_14.jpg';
import card15 from '../../../../assets/images/MasonryCard/card_15.jpg';
import card2 from '../../../../assets/images/MasonryCard/card_2.jpg';
import card3 from '../../../../assets/images/MasonryCard/card_3.jpg';
import card4 from '../../../../assets/images/MasonryCard/card_4.jpg';
import card5 from '../../../../assets/images/MasonryCard/card_5.jpg';
import card6 from '../../../../assets/images/MasonryCard/card_6.jpg';
import card7 from '../../../../assets/images/MasonryCard/card_7.jpg';
import card8 from '../../../../assets/images/MasonryCard/card_8.jpg';
import card9 from '../../../../assets/images/MasonryCard/card_9.jpg';

const images = [
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  card8,
  card9,
  card10,
  card11,
  card12,
  card13,
  card14,
  card15,
];

const MasonryCards: React.FC = () => {
  return (
    <div className="max-h-200 overflow-hidden overflow-y-auto">
      <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="mb-4 break-inside-avoid rounded-lg bg-white shadow overflow-hidden"
          >
            <img
              src={src}
              alt={`Masonry card ${idx + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryCards;
