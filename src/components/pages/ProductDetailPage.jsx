import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { productService } from "@/services/api/productService";
import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    isInCart 
  } = useAppContext();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await productService.getById(productId);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    const inWishlist = isInWishlist(product.Id);
    if (inWishlist) {
      toast.info("Removed from wishlist");
    } else {
      toast.success("Added to wishlist! ❤️");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;
  if (!product) return <Error message="Product not found" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <motion.div
        className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">
          Home
        </button>
        <ApperIcon name="ChevronRight" size={16} />
        <button 
          onClick={() => navigate(`/category/${product.category.toLowerCase().replace(' ', '-')}`)}
          className="hover:text-primary transition-colors"
        >
          {product.category}
        </button>
        <ApperIcon name="ChevronRight" size={16} />
        <span className="text-gray-800 font-medium">{product.name}</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Product Images */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Main Image */}
          <div className="relative">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-card"
            />
            
            <button
              onClick={handleToggleWishlist}
              className={`
                absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-200
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
                  name="Heart" 
                  size={20}
                  fill={isInWishlist(product.Id) ? "currentColor" : "none"}
                />
              </motion.div>
            </button>
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200
                    ${selectedImage === index 
                      ? "border-primary shadow-md scale-105" 
                      : "border-gray-200 hover:border-primary/50"
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
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Title and Price */}
          <div>
            <div className="flex items-center space-x-3 mb-2">
              {product.ageGroups.map((age, index) => (
                <Badge key={index} variant="age" size="sm">
                  {age} years
                </Badge>
              ))}
              <Badge variant="default" size="sm">
                {product.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            
            <div className="text-4xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Safety Information */}
          <Card className="bg-gradient-to-r from-success/5 to-green-400/5 border border-success/20">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <ApperIcon name="Shield" size={20} className="text-success mr-2" />
              Safety Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Age Recommendation:</span>
                <Badge variant="success" size="sm">
                  {product.safetyInfo.ageRecommendation}
                </Badge>
              </div>
              
              {product.safetyInfo.certifications && (
                <div>
                  <span className="text-sm text-gray-600 block mb-1">Certifications:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.safetyInfo.certifications.map((cert, index) => (
                      <Badge key={index} variant="success" size="sm">
                        ✓ {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {product.safetyInfo.warnings && product.safetyInfo.warnings.length > 0 && (
                <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <div className="flex items-start space-x-2">
                    <ApperIcon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-warning block mb-1">Warnings:</span>
                      {product.safetyInfo.warnings.map((warning, index) => (
                        <p key={index} className="text-sm text-gray-700">{warning}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <ApperIcon 
              name={product.stock > 0 ? "Check" : "X"} 
              size={16} 
              className={product.stock > 0 ? "text-success" : "text-error"} 
            />
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-success" : "text-error"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
<div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <ApperIcon name="Minus" size={16} />
                </button>
                <span className="w-12 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-full bg-primary hover:bg-purple-600 text-white flex items-center justify-center transition-colors"
                >
                  <ApperIcon name="Plus" size={16} />
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                variant={isInCart(product.Id) ? "success" : "primary"}
                size="lg"
                className="flex-1 flex items-center justify-center space-x-2"
                disabled={product.stock === 0}
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
                onClick={handleToggleWishlist}
                variant="outline"
                size="lg"
                className="flex items-center justify-center px-4"
              >
                <ApperIcon 
                  name="Heart" 
                  size={18}
                  fill={isInWishlist(product.Id) ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>

          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetailPage;