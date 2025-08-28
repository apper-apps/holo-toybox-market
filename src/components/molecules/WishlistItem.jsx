import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import React from "react";
import { useAppContext } from "@/hooks/useAppContext";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const WishlistItem = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, mode, approveWishlistItem } = useAppContext();

  const handleAddToCart = () => {
    addToCart(item.product);
    toast.success(`${item.product.name} added to cart!`);
  };

  const handleRemove = () => {
    toggleWishlist(item.product);
    toast.info("Removed from wishlist");
  };

  const handleApprove = () => {
    if (approveWishlistItem) {
      approveWishlistItem(item.productId);
      toast.success("Item approved! ✅");
    }
  };

  const handleViewProduct = () => {
    navigate(`/product/${item.productId}`);
  };

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <div className="relative">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={handleViewProduct}
        />
        
        <div className="absolute top-3 left-3">
          {item.product.ageGroups.map((age, index) => (
            <Badge key={index} variant="age" size="sm" className="mr-1 mb-1">
              {age}
            </Badge>
          ))}
        </div>

        <div className="absolute top-3 right-3 space-y-2">
          {item.parentApproved && (
            <Badge variant="success" size="sm">
              ✓ Approved
            </Badge>
          )}
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <div>
          <h3 
            className="font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer line-clamp-2"
            onClick={handleViewProduct}
          >
            {item.product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {item.product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            ${item.product.price}
          </div>
          
          <Badge variant="default" size="sm">
            {item.product.category}
          </Badge>
        </div>

<div className="flex items-center justify-between pt-2 space-x-2">
          {mode === "parent" ? (
            <div className="flex space-x-2 w-full">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                className="flex-1 flex items-center justify-center space-x-1"
              >
                <ApperIcon name="ShoppingCart" size={14} />
                <span>Add to Cart</span>
              </Button>
              <Button
                onClick={handleRemove}
                variant="outline"
                size="sm"
                className="flex items-center justify-center"
              >
                <ApperIcon name="Heart" size={14} fill="currentColor" />
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2 w-full">
              <Button
                onClick={handleApprove}
                variant="success"
                size="sm"
                className="flex-1"
                disabled={item.parentApproved}
              >
                {item.parentApproved ? "Approved" : "Approve"}
              </Button>
              <Button
                onClick={handleRemove}
                variant="outline"
                size="sm"
                className="flex items-center justify-center"
              >
                <ApperIcon name="Heart" size={14} fill="currentColor" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistItem;