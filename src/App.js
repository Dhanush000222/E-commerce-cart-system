// CartApp.jsx
import React, { useState } from 'react';
import './App.css'; // Make sure this file exists

const initialProducts = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
];

export default function CartApp() {
  const [cart, setCart] = useState([]);
  const [products] = useState(initialProducts);

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h2>🛒 E-commerce Cart</h2>

      <h3>Products</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button className="button" onClick={() => addToCart(p.id)}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h3>Cart</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li className="cart-item" key={item.product.id}>
                <span className="cart-item-name">{item.product.name}</span>
                <span className="cart-item-quantity">
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    min="0"
                    onChange={e => updateQuantity(item.product.id, parseInt(e.target.value))}
                    style={{ marginLeft: '5px', width: '50px' }}
                  />
                  <button
                    className="button"
                    onClick={() => removeFromCart(item.product.id)}
                    style={{ marginLeft: '10px', backgroundColor: 'red' }}
                  >
                    Remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: ${getTotal()}</div>
          <button className="button" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
