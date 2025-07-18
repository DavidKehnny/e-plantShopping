import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0)
      .toFixed(2);
  };

  // Early return if cart is empty
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your cart is empty.</h2>
        <button
          className="get-started-button"
          onClick={(e) => {
            e.preventDefault();
            onContinueShopping();
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // <- fixed to dispatch string instead of object
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // <- fixed to dispatch string instead of object
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn" style={{ marginTop: '20px', color: 'black' }}>
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert('Functionality to be added for future reference')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
