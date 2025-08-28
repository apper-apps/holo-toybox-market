import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ProductQuickView = () => {
  const navigate = useNavigate();
  const { 
    quickViewProduct, 
    closeQuickView, 
addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart 
  } = useAppContext();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    const inWishlist = isInWishlist(product.Id);
    if (inWishlist) {
      toast.info("Removed from wishlist");
    } else {
      toast.success("Added to wishlist! ❤️");
    }
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigate(`/product/${product.Id}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeQuickView}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lift max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-gray-800">Quick View</h2>
              <Badge variant="default" size="sm">
                {product.category}
              </Badge>
            </div>
            <button
              onClick={closeQuickView}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`
                    absolute top-4 right-4 p-3 rounded-full transition-all duration-200 backdrop-blur-sm
                    ${isInWishlist(product.Id)
                      ? "bg-red-500 text-white scale-110" 
                      : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110"
                    }
                  `}
                >
                  <ApperIcon 
                    name="Heart" 
                    size={20}
                    fill={isInWishlist(product.Id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`
                        flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                        ${selectedImageIndex === index 
                          ? "border-primary scale-105" 
                          : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-primary">
                ${product.price}
              </div>

              {/* Age Groups */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Age Groups</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ageGroups.map((age, index) => (
                    <Badge key={index} variant="age" size="md">
                      {age}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" size="sm">
                      {tag === "featured" ? "⭐ Featured" : tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
<div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    variant={isInCart(product.Id) ? "success" : "primary"}
                    size="lg"
                    className="flex-1 flex items-center justify-center space-x-2"
                  >
                    <ApperIcon 
                      name={isInCart(product.Id) ? "Check" : "ShoppingCart"} 
                      size={18} 
                    />
                    <span>
                      {isInCart(product.Id) ? "Added to Cart" : "Add to Cart"}
                    </span>
                  </Button>
                  
                  <Button
                    onClick={handleViewFullDetails}
                    variant="outline"
                    size="lg"
                    className="flex items-center justify-center space-x-2"
                  >
                    <ApperIcon name="ExternalLink" size={18} />
                    <span>Full Details</span>
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Product ID:</strong> #{product.Id}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductQuickView;