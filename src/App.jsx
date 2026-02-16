import React from 'react';
import Navbar from './NewPagesComponent/Navbar.jsx'; // Ensure the filename matches your Navbar file
import backgroundImage from './assets/black_clover.webp'; 

function App() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    overflowX: 'hidden' // Prevents horizontal scroll issues with animations
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      
      {/* Your main content goes here */}
      <div className="text-center">
        <h1 className="font-oswald text-6xl md:text-8xl tracking-tighter uppercase">
          Surpass Your Limits
        </h1>
        <p className="mt-4 opacity-70 tracking-widest">RIGHT HERE, RIGHT NOW</p>
      </div>
    </div>
  );
}

export default App;