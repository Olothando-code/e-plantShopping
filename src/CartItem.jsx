import React from 'react';
import './CartItem.css';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  // Function to calculate total cost for this specific item
  const calculateTotalCost = (item) => {
    if (!item || !item.price || !item.quantity) return 0;
    return (item.price * item.quantity).toFixed(2);
  };

  // Handle increment button click
  const handleIncrement = () => {
    if (onIncrement) {
      onIncrement(item.id);
    }
  };

  // Handle decrement button click
  const handleDecrement = () => {
    if (onDecrement) {
      onDecrement(item.id);
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    if (onRemove) {
      onRemove(item.id);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image || '/default-plant.jpg'} alt={item.name} />
      </div>
      
      <div className="item-details">
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description || 'Beautiful plant for your home'}</p>
        <p className="item-price">Price: ${item.price?.toFixed(2) || '0.00'}</p>
        
        <div className="quantity-controls">
          <button 
            className="quantity-btn" 
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          
          <span className="quantity-display">{item.quantity}</span>
          
          <button 
            className="quantity-btn" 
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
          
          <button 
            className="remove-btn" 
            onClick={handleRemove}
            aria-label="Remove item from cart"
          >
            Remove
          </button>
        </div>
      </div>
      
      <div className="item-total">
        <h4>Item Total:</h4>
        <p className="total-cost">${calculateTotalCost(item)}</p>
      </div>
    </div>
  );
};

// Function to calculate total amount for entire cart (for parent component)
export const calculateTotalAmount = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) return '0.00';
  
  const total = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  return total.toFixed(2);
};

export default CartItem;
