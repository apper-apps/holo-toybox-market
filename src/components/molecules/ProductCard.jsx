import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
const { mode, addToCart, toggleWishlist, isInWishlist, isInCart, setQuickViewProduct } = useAppContext();

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

const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <motion.div
      className="card group cursor-pointer overflow-hidden"
      onClick={handleCardClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
        />
        
        <button
          onClick={handleToggleWishlist}
          className={`
            absolute top-3 right-3 p-2 rounded-full transition-all duration-200 backdrop-blur-sm
            ${isInWishlist(product.Id)
              ? "bg-red-500 text-white scale-110" 
              : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110"
            }
          `}
        >
          <motion.div
            animate={isInWishlist(product.Id) ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <ApperIcon 
              name={isInWishlist(product.Id) ? "Heart" : "Heart"} 
              size={16}
              fill={isInWishlist(product.Id) ? "currentColor" : "none"}
            />
          </motion.div>
        </button>

        <div className="absolute top-3 left-3">
          {product.ageGroups.map((age, index) => (
            <Badge key={index} variant="age" size="sm" className="mr-1 mb-1">
              {age}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="default" size="sm">
            {product.category}
          </Badge>
          {product.tags.includes("featured") && (
            <Badge variant="accent" size="sm">
              ⭐ Featured
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xl font-bold text-primary">
            ${product.price}
          </div>
          
          {mode === "parent" ? (
            <Button
              onClick={handleAddToCart}
              variant={isInCart(product.Id) ? "success" : "primary"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <ApperIcon 
                name={isInCart(product.Id) ? "Check" : "ShoppingCart"} 
                size={14} 
              />
              <span>
                {isInCart(product.Id) ? "In Cart" : "Add to Cart"}
              </span>
            </Button>
) : (
            <Button
              onClick={handleQuickView}
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Eye" size={14} />
              <span>Quick View</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;