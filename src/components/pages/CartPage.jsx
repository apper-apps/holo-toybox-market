import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CartPage = () => {
  const { cart, cartTotal, cartItemCount, clearCart, mode } = useAppContext();

  const handleCheckout = () => {
    toast.success("Order placed successfully! 🎉");
    clearCart();
  };

  const handleClearCart = () => {
    clearCart();
    toast.info("Cart cleared");
  };

  // Tax and shipping calculations
  const subtotal = cartTotal;
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  if (mode !== "parent") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Empty 
          title="Cart not available in Kid Mode"
          description="Switch to Parent Mode to view and manage your shopping cart"
          actionText="Go to Wishlist"
          actionLink="/wishlist"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="text-center py-8 lg:py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge variant="primary" size="md" className="mb-4">
          🛡️ Parent Mode
        </Badge>
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-accent to-orange-400 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ApperIcon name="ShoppingCart" size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-800">
            Shopping Cart
          </h1>
        </div>
        
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Review your items and proceed to checkout
        </p>
      </motion.div>

      {cart.length === 0 ? (
        <Empty 
          title="Your cart is empty"
          description="Add some amazing toys and supplies to get started!"
          actionText="Start Shopping"
          actionLink="/"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                  Cart Items ({cartItemCount})
                </h2>
                {cart.length > 0 && (
                  <Button
                    onClick={handleClearCart}
                    variant="ghost"
                    size="sm"
                    className="text-error hover:bg-error/10"
                  >
                    <ApperIcon name="Trash2" size={16} className="mr-1" />
                    Clear Cart
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item) => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="text-sm text-success font-medium">
                      ✓ Free shipping on orders over $50
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="CreditCard" size={18} />
                    <span>Proceed to Checkout</span>
                  </Button>
                  
                  <Button
                    onClick={() => window.history.back()}
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Shield" size={16} className="text-success" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Truck" size={16} className="text-success" />
                      <span>Free shipping on orders $50+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="RotateCcw" size={16} className="text-success" />
                      <span>30-day return policy</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;