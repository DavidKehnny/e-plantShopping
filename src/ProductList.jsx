import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({}); // Track added plants by name

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        }
        // Add more as needed...
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20"
        }
        // Add more as needed...
      ]
    }
    // Add more categories...
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center', // fixed typo here
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  // Added this function for Add to Cart button
  const handleAddToCart = (plant) => {
    // TODO: Dispatch addItem action here if using Redux
    console.log('Add to cart:', plant.name);

    // Mark this plant as added to cart (for UI feedback)
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt="logo"
              height="60px"
            />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div style={styleObjUl}>
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowCart(false);
              }}
              style={styleA}
            >
              Plants
            </a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                height="48"
                width="48"
              >
                <circle cx="80" cy="216" r="12" fill="white" />
                <circle cx="184" cy="216" r="12" fill="white" />
                <path
                  d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                  fill="none"
                  stroke="#faf9f9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((section) => (
            <div key={section.category} className="plant-category">
              <h2>{section.category}</h2>
              <div className="plant-list">
                {section.plants.map((plant) => (
                  <div key={plant.name} className="plant-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <span>{plant.cost}</span>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={!!addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
