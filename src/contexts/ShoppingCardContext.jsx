import React, { createContext, useState } from 'react';

export const ShoppingCardContext = createContext();

export const ShoppingCardProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(prevItem => prevItem.id === item.id && prevItem.type === item.type);
            if (existingItem) {
                return prevItems.map(prevItem =>
                    prevItem.id === item.id && prevItem.type === item.type
                        ? { ...prevItem, quantity: prevItem.quantity + 1 }
                        : prevItem
                );
            } else {
                return [...prevItems, { ...item, price: item.price, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Función para calcular el total del carrito
    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <ShoppingCardContext.Provider value={{ cartItems, addItemToCart, removeFromCart, updateQuantity, clearCart, getTotal }}>
            {children}
        </ShoppingCardContext.Provider>
    );
};
