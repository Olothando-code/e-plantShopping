import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart
const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // If item doesn't exist, add it to cart
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1),
        });
      }
      
      // Update cart totals
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      );
      
      // Save to localStorage (optional)
      localStorage.setItem('cart', JSON.stringify(state));
    },

    // Remove item from cart
    removeItem: (state, action) => {
      const itemId = action.payload;
      
      // Find the item to get its quantity
      const itemToRemove = state.items.find(item => item.id === itemId);
      
      if (itemToRemove) {
        // Remove item from array
        state.items = state.items.filter(item => item.id !== itemId);
        
        // Update totals
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= (itemToRemove.price * itemToRemove.quantity);
        
        // Save to localStorage (optional)
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    // Update quantity of an item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      
      if (itemToUpdate && quantity >= 0) {
        // Calculate the difference in quantity
        const quantityDifference = quantity - itemToUpdate.quantity;
        
        // Update the item's quantity
        itemToUpdate.quantity = quantity;
        
        // Update the item's total price
        itemToUpdate.totalPrice = itemToUpdate.price * quantity;
        
        // Update cart totals
        state.totalQuantity += quantityDifference;
        state.totalAmount += (itemToUpdate.price * quantityDifference);
        
        // If quantity is 0, remove the item
        if (quantity === 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
        
        // Save to localStorage (optional)
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },

    // Toggle cart visibility
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    // Load cart from localStorage
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          return { ...state, ...parsedCart };
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    },

    // Increment quantity by 1
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.items.find(item => item.id === itemId);
      
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
        itemToUpdate.totalPrice = itemToUpdate.price * itemToUpdate.quantity;
        
        // Update cart totals
        state.totalQuantity += 1;
        state.totalAmount += itemToUpdate.price;
        
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },

    // Decrement quantity by 1
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToUpdate = state.items.find(item => item.id === itemId);
      
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;
        itemToUpdate.totalPrice = itemToUpdate.price * itemToUpdate.quantity;
        
        // Update cart totals
        state.totalQuantity -= 1;
        state.totalAmount -= itemToUpdate.price;
        
        localStorage.setItem('cart', JSON.stringify(state));
      } else if (itemToUpdate && itemToUpdate.quantity === 1) {
        // If quantity becomes 0, remove item
        cartSlice.caseReducers.removeItem(state, { payload: itemId });
      }
    },
  },
});

// Export actions
export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  loadCartFromStorage,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selectors for accessing cart state
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;

// Helper function to calculate item total
export const calculateItemTotal = (item) => {
  if (!item) return 0;
  return (item.price * (item.quantity || 1)).toFixed(2);
};

// Helper function to calculate cart total
export const calculateCartTotal = (items) => {
  if (!items || items.length === 0) return '0.00';
  
  const total = items.reduce((sum, item) => {
    return sum + (item.price * (item.quantity || 1));
  }, 0);
  
  return total.toFixed(2);
};
