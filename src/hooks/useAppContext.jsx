import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  searchQuery: "",
  selectedCategory: "all",
  selectedAgeGroups: [],
  priceRange: [0, 200],
  quickViewProduct: null,
  checkoutData: {
    address: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    payment: {
      method: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: ""
    }
  }
};

function appReducer(state, action) {
switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.cart.find(item => item.productId === product.Id);
      
      if (existingItem) {
        const updatedCart = state.cart.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        const cartItem = {
          productId: product.Id,
          quantity,
          addedAt: new Date().toISOString(),
          product
        };
        return { ...state, cart: [...state.cart, cartItem] };
      }
    }
    case "UPDATE_CART_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity === 0) {
        const updatedCart = state.cart.filter(item => item.productId !== productId);
        return { ...state, cart: updatedCart };
      } else {
        const updatedCart = state.cart.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        );
        return { ...state, cart: updatedCart };
      }
    }
    case "REMOVE_FROM_CART": {
      const productId = action.payload;
      const updatedCart = state.cart.filter(item => item.productId !== productId);
      return { ...state, cart: updatedCart };
    }
    case "TOGGLE_WISHLIST": {
      const product = action.payload;
      const existingItem = state.wishlist.find(item => item.productId === product.Id);
      
      if (existingItem) {
        const updatedWishlist = state.wishlist.filter(item => item.productId !== product.Id);
        return { ...state, wishlist: updatedWishlist };
      } else {
        const wishlistItem = {
productId: product.Id,
          addedAt: new Date().toISOString(),
          parentApproved: state.mode === "parent",
          product
        };
        return { ...state, wishlist: [...state.wishlist, wishlistItem] };
      }
    }
    case "APPROVE_WISHLIST_ITEM": {
      const productId = action.payload;
      const updatedWishlist = state.wishlist.map(item =>
        item.productId === productId
          ? { ...item, parentApproved: true }
          : item
      );
      return { ...state, wishlist: updatedWishlist };
    }
    case "SET_SEARCH_QUERY": {
      return { ...state, searchQuery: action.payload };
    }
    case "SET_CATEGORY": {
      return { ...state, selectedCategory: action.payload };
    }
    case "SET_AGE_GROUPS": {
      return { ...state, selectedAgeGroups: action.payload };
    }
    case "SET_PRICE_RANGE": {
      return { ...state, priceRange: action.payload };
    }
    case "CLEAR_CART": {
      return { ...state, cart: [] };
    }
    case "SET_QUICK_VIEW_PRODUCT": {
      return { ...state, quickViewProduct: action.payload };
    }
    case "CLOSE_QUICK_VIEW": {
      return { ...state, quickViewProduct: null };
    }
    case "UPDATE_CHECKOUT_DATA": {
      return { ...state, checkoutData: action.payload };
    }
    case "CLEAR_CHECKOUT_DATA": {
      return { 
        ...state, 
        checkoutData: {
          address: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
          },
          payment: {
            method: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            cardName: ""
          }
        }
      };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("toybox-state", JSON.stringify({
cart: state.cart,
      wishlist: state.wishlist
    }));
}, [state.cart, state.wishlist]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("toybox-state");
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        if (parsedState.cart) {
          parsedState.cart.forEach(item => {
            dispatch({ type: "ADD_TO_CART", payload: { product: item.product, quantity: item.quantity } });
          });
        }
        if (parsedState.wishlist) {
          parsedState.wishlist.forEach(item => {
            dispatch({ type: "TOGGLE_WISHLIST", payload: item.product });
          });
        }
      } catch (error) {
        console.error("Error loading saved state:", error);
      }
    }
  }, []);

const value = {
    ...state,
    dispatch,
    // Helper functions
    addToCart: (product, quantity = 1) => dispatch({ type: "ADD_TO_CART", payload: { product, quantity } }),
    updateCartQuantity: (productId, quantity) => dispatch({ type: "UPDATE_CART_QUANTITY", payload: { productId, quantity } }),
    removeFromCart: (productId) => dispatch({ type: "REMOVE_FROM_CART", payload: productId }),
    toggleWishlist: (product) => dispatch({ type: "TOGGLE_WISHLIST", payload: product }),
    approveWishlistItem: (productId) => dispatch({ type: "APPROVE_WISHLIST_ITEM", payload: productId }),
    setSearchQuery: (query) => dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
    setCategory: (category) => dispatch({ type: "SET_CATEGORY", payload: category }),
    setAgeGroups: (ageGroups) => dispatch({ type: "SET_AGE_GROUPS", payload: ageGroups }),
    setPriceRange: (range) => dispatch({ type: "SET_PRICE_RANGE", payload: range }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    setQuickViewProduct: (product) => dispatch({ type: "SET_QUICK_VIEW_PRODUCT", payload: product }),
    closeQuickView: () => dispatch({ type: "CLOSE_QUICK_VIEW" }),
    updateCheckoutData: (data) => dispatch({ type: "UPDATE_CHECKOUT_DATA", payload: data }),
    clearCheckoutData: () => dispatch({ type: "CLEAR_CHECKOUT_DATA" }),
    // Computed values
    cartTotal: state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    cartItemCount: state.cart.reduce((count, item) => count + item.quantity, 0),
    wishlistCount: state.wishlist.length,
    isInWishlist: (productId) => state.wishlist.some(item => item.productId === productId),
    isInCart: (productId) => state.cart.some(item => item.productId === productId),
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}