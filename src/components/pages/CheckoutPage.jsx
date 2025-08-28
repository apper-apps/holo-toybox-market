import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/hooks/useAppContext";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import CartItem from "@/components/molecules/CartItem";
import ApperIcon from "@/components/ApperIcon";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartTotal, 
    cartItemCount, 
    clearCart, 
    checkoutData,
    updateCheckoutData,
    clearCheckoutData
  } = useAppContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      toast.info("Your cart is empty");
      navigate("/");
    }
  }, [cart, navigate]);

  const steps = [
    { id: 1, title: "Address", icon: "MapPin" },
    { id: 2, title: "Payment", icon: "CreditCard" },
    { id: 3, title: "Review", icon: "Check" }
  ];

  const validateAddressStep = () => {
    const newErrors = {};
    const { address } = checkoutData;

    if (!address.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!address.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!address.email?.trim()) newErrors.email = "Email is required";
    if (address.email && !/\S+@\S+\.\S+/.test(address.email)) newErrors.email = "Invalid email format";
    if (!address.phone?.trim()) newErrors.phone = "Phone is required";
    if (!address.street?.trim()) newErrors.street = "Street address is required";
    if (!address.city?.trim()) newErrors.city = "City is required";
    if (!address.state?.trim()) newErrors.state = "State is required";
    if (!address.zipCode?.trim()) newErrors.zipCode = "ZIP code is required";
    if (!address.country?.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentStep = () => {
    const newErrors = {};
    const { payment } = checkoutData;

    if (!payment.method) newErrors.method = "Payment method is required";
    
    if (payment.method === "card") {
      if (!payment.cardNumber?.trim()) newErrors.cardNumber = "Card number is required";
      if (payment.cardNumber && !/^\d{16}$/.test(payment.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Invalid card number";
      }
      if (!payment.expiryDate?.trim()) newErrors.expiryDate = "Expiry date is required";
      if (payment.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiryDate)) {
        newErrors.expiryDate = "Invalid expiry date (MM/YY)";
      }
      if (!payment.cvv?.trim()) newErrors.cvv = "CVV is required";
      if (payment.cvv && !/^\d{3,4}$/.test(payment.cvv)) newErrors.cvv = "Invalid CVV";
      if (!payment.cardName?.trim()) newErrors.cardName = "Cardholder name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressChange = (field, value) => {
    updateCheckoutData({
      ...checkoutData,
      address: { ...checkoutData.address, [field]: value }
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handlePaymentChange = (field, value) => {
    updateCheckoutData({
      ...checkoutData,
      payment: { ...checkoutData.payment, [field]: value }
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateAddressStep()) {
        setCurrentStep(2);
        toast.success("Address saved!");
      }
    } else if (currentStep === 2) {
      if (validatePaymentStep()) {
        setCurrentStep(3);
        toast.success("Payment details saved!");
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Order placed successfully! 🎉");
      clearCart();
      clearCheckoutData();
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      handlePaymentChange('cardNumber', formatted);
    }
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    handlePaymentChange('expiryDate', value);
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-800 mb-2">
          Checkout
        </h1>
        <p className="text-gray-600">Complete your purchase in just a few steps</p>
      </motion.div>

      {/* Progress Steps */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center space-x-4 bg-white rounded-xl p-4 shadow-card">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
                  ${currentStep >= step.id
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                <ApperIcon name={step.icon} size={16} />
              </div>
              <span
                className={`
                  ml-2 font-medium transition-colors duration-200
                  ${currentStep >= step.id ? "text-primary" : "text-gray-500"}
                `}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-gray-300 ml-4" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <ApperIcon name="MapPin" size={20} className="text-primary mr-2" />
                    Shipping Address
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        value={checkoutData.address.firstName}
                        onChange={(e) => handleAddressChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                        className={errors.firstName ? "border-error" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-error text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        value={checkoutData.address.lastName}
                        onChange={(e) => handleAddressChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                        className={errors.lastName ? "border-error" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-error text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={checkoutData.address.email}
                        onChange={(e) => handleAddressChange('email', e.target.value)}
                        placeholder="Enter email address"
                        className={errors.email ? "border-error" : ""}
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        value={checkoutData.address.phone}
                        onChange={(e) => handleAddressChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        className={errors.phone ? "border-error" : ""}
                      />
                      {errors.phone && (
                        <p className="text-error text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <Input
                        value={checkoutData.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        placeholder="Enter street address"
                        className={errors.street ? "border-error" : ""}
                      />
                      {errors.street && (
                        <p className="text-error text-sm mt-1">{errors.street}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        value={checkoutData.address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="Enter city"
                        className={errors.city ? "border-error" : ""}
                      />
                      {errors.city && (
                        <p className="text-error text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <Input
                        value={checkoutData.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        placeholder="Enter state"
                        className={errors.state ? "border-error" : ""}
                      />
                      {errors.state && (
                        <p className="text-error text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        value={checkoutData.address.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        placeholder="Enter ZIP code"
                        className={errors.zipCode ? "border-error" : ""}
                      />
                      {errors.zipCode && (
                        <p className="text-error text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        value={checkoutData.address.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                        className={`input-field ${errors.country ? "border-error" : ""}`}
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                      {errors.country && (
                        <p className="text-error text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <ApperIcon name="CreditCard" size={20} className="text-primary mr-2" />
                    Payment Details
                  </h2>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'card', label: 'Credit Card', icon: 'CreditCard' },
                        { id: 'paypal', label: 'PayPal', icon: 'Wallet' },
                        { id: 'apple', label: 'Apple Pay', icon: 'Smartphone' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => handlePaymentChange('method', method.id)}
                          className={`
                            p-4 border-2 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2
                            ${checkoutData.payment.method === method.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-gray-200 hover:border-primary/50"
                            }
                          `}
                        >
                          <ApperIcon name={method.icon} size={18} />
                          <span className="font-medium">{method.label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.method && (
                      <p className="text-error text-sm mt-2">{errors.method}</p>
                    )}
                  </div>

                  {/* Credit Card Form */}
                  {checkoutData.payment.method === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <Input
                          value={checkoutData.payment.cardName}
                          onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                          placeholder="Name on card"
                          className={errors.cardName ? "border-error" : ""}
                        />
                        {errors.cardName && (
                          <p className="text-error text-sm mt-1">{errors.cardName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <Input
                          value={checkoutData.payment.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          className={errors.cardNumber ? "border-error" : ""}
                        />
                        {errors.cardNumber && (
                          <p className="text-error text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <Input
                            value={checkoutData.payment.expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={errors.expiryDate ? "border-error" : ""}
                          />
                          {errors.expiryDate && (
                            <p className="text-error text-sm mt-1">{errors.expiryDate}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <Input
                            value={checkoutData.payment.cvv}
                            onChange={(e) => handlePaymentChange('cvv', e.target.value.replace(/\D/g, ''))}
                            placeholder="123"
                            maxLength={4}
                            className={errors.cvv ? "border-error" : ""}
                          />
                          {errors.cvv && (
                            <p className="text-error text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Other payment methods */}
                  {checkoutData.payment.method === 'paypal' && (
                    <div className="text-center py-8">
                      <ApperIcon name="Wallet" size={48} className="text-primary mx-auto mb-4" />
                      <p className="text-gray-600">You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}

                  {checkoutData.payment.method === 'apple' && (
                    <div className="text-center py-8">
                      <ApperIcon name="Smartphone" size={48} className="text-primary mx-auto mb-4" />
                      <p className="text-gray-600">Use Touch ID or Face ID to pay with Apple Pay.</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  {/* Order Review */}
                  <Card>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                      <ApperIcon name="Package" size={20} className="text-primary mr-2" />
                      Order Review
                    </h2>
                    
                    <div className="space-y-4">
                      <AnimatePresence>
                        {cart.map((item) => (
                          <CartItem key={item.productId} item={item} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </Card>

                  {/* Address Summary */}
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <ApperIcon name="MapPin" size={18} className="text-primary mr-2" />
                      Shipping Address
                    </h3>
                    <div className="text-gray-600">
                      <p>{checkoutData.address.firstName} {checkoutData.address.lastName}</p>
                      <p>{checkoutData.address.street}</p>
                      <p>{checkoutData.address.city}, {checkoutData.address.state} {checkoutData.address.zipCode}</p>
                      <p>{checkoutData.address.country}</p>
                      <p className="mt-2">
                        <span className="font-medium">Email:</span> {checkoutData.address.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {checkoutData.address.phone}
                      </p>
                    </div>
                  </Card>

                  {/* Payment Summary */}
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <ApperIcon name="CreditCard" size={18} className="text-primary mr-2" />
                      Payment Method
                    </h3>
                    <div className="text-gray-600">
                      {checkoutData.payment.method === 'card' && (
                        <div>
                          <p className="font-medium">Credit Card</p>
                          <p>**** **** **** {checkoutData.payment.cardNumber?.slice(-4)}</p>
                          <p>{checkoutData.payment.cardName}</p>
                        </div>
                      )}
                      {checkoutData.payment.method === 'paypal' && (
                        <p className="font-medium">PayPal</p>
                      )}
                      {checkoutData.payment.method === 'apple' && (
                        <p className="font-medium">Apple Pay</p>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            className="flex justify-between items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex space-x-4">
              <Button
                onClick={() => navigate("/cart")}
                variant="ghost"
                className="flex items-center space-x-2"
              >
                <ApperIcon name="ArrowLeft" size={16} />
                <span>Back to Cart</span>
              </Button>

              {currentStep > 1 && (
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="ChevronLeft" size={16} />
                  <span>Previous</span>
                </Button>
              )}
            </div>

            <div>
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="flex items-center space-x-2"
                >
                  <span>Continue</span>
                  <ApperIcon name="ChevronRight" size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  variant="primary"
                  size="lg"
                  disabled={isProcessing}
                  className="flex items-center space-x-2 min-w-[160px]"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Check" size={18} />
                      <span>Place Order</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Order Summary Sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="sticky top-4">
            <Card>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItemCount})</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg text-gray-800">
                    <span>Total</span>
                    <span className="text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-success font-medium">
                    Secure checkout guaranteed
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;