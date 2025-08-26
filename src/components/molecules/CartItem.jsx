import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useAppContext();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(item.productId);
      toast.info("Item removed from cart");
    } else {
      updateCartQuantity(item.productId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
    toast.info("Item removed from cart");
  };

  const subtotal = item.product.price * item.quantity;

  return (
    <motion.div
      className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 line-clamp-1">
          {item.product.name}
        </h4>
        <p className="text-sm text-gray-600">
          ${item.product.price.toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <ApperIcon name="Minus" size={14} />
        </button>
        
        <span className="w-8 text-center font-semibold">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-primary hover:bg-purple-600 text-white flex items-center justify-center transition-colors"
        >
          <ApperIcon name="Plus" size={14} />
        </button>
      </div>

      <div className="text-right">
        <div className="font-bold text-primary">
          ${subtotal.toFixed(2)}
        </div>
        <button
          onClick={handleRemove}
          className="text-error hover:text-red-600 transition-colors text-sm"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;