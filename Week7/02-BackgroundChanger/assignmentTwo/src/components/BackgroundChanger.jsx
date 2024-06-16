import React, { useState } from 'react';
import './BackgroundChanger.css'; 

const BackgroundChanger = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default: white

  const colors = {
    '#153448': 'Dark Blue',
    '#3C5B6F': 'Blue', 
    '#948979': 'Gray', 
    '#DFD0B8': 'Beige' 
  };

  const handleChangeBackground = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="container" style={{ backgroundColor }}>
      <div className="button-group">
        {Object.entries(colors).map(([colorCode, colorName]) => (
          <button 
            key={colorCode} 
            style={{ backgroundColor: colorCode }}
            onClick={() => handleChangeBackground(colorCode)}
          >
            {colorName}
          </button>
        ))}
        <button style={{ color: 'black' }} onClick={() => handleChangeBackground('#FFFFFF')}>Default</button>
      </div>
    </div>
  );
};

export default BackgroundChanger;