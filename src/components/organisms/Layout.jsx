import { useState } from "react";
import Header from "./Header";
import CartSidebar from "./CartSidebar";

const Layout = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartOpen={() => setIsCartOpen(true)} />
      
      <main className="relative">
        {children}
      </main>
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
};

export default Layout;