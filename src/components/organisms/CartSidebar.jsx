import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import ApperIcon from "@/components/ApperIcon";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, cartTotal, cartItemCount, clearCart } = useAppContext();

const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Shopping Cart ({cartItemCount})
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <ApperIcon name="ShoppingCart" size={32} className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 text-sm">Add some amazing toys and supplies!</p>
                  </div>
                  <Button onClick={onClose} variant="primary">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <CartItem key={item.productId} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
<Button
                    onClick={handleCheckout}
                    variant="primary"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="CreditCard" size={18} />
                    <span>Checkout</span>
                  </Button>

                  <Button
                    onClick={handleViewCart}
                    variant="outline"
                    className="w-full"
                  >
                    View Full Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;