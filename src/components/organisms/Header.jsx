import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onCartOpen }) => {
  const location = useLocation();
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode, cartItemCount, wishlistCount } = useAppContext();
  const navItems = [
    { to: "/", label: "Home", icon: "Home" },
    { to: "/category/toys", label: "Toys", icon: "Gamepad2" },
    { to: "/category/art-supplies", label: "Art", icon: "Palette" },
    { to: "/category/school-items", label: "School", icon: "BookOpen" },
    { to: "/category/games", label: "Games", icon: "Puzzle" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
              <ApperIcon name="Gift" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display text-primary">Toybox Market</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Educational Fun for Kids</p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            
            <div className="flex items-center space-x-4">
              <Link
                to="/wishlist"
                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ApperIcon name="Heart" size={24} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
</Link>

              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ApperIcon name="ShoppingCart" size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105
                ${location.pathname === item.to || location.pathname.includes(item.label.toLowerCase())
                  ? "bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary" 
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }
              `}
            >
              <ApperIcon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Search */}
        <div className="lg:hidden py-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Mode Toggle */}

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                      ${location.pathname === item.to || location.pathname.includes(item.label.toLowerCase())
                        ? "bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary" 
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                      }
                    `}
                  >
                    <ApperIcon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <div className="relative">
                    <ApperIcon name="Heart" size={24} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Wishlist</span>
</Link>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onCartOpen();
                  }}
                  className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <div className="relative">
                    <ApperIcon name="ShoppingCart" size={24} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">Cart</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;