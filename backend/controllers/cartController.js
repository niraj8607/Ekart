import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
    // 🌟 FIX 1: Universal userId extraction
    const userId = req.id || req.userId || req.user?._id || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "User ID missing!" });

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [], totalPrice: 0 }, // Khali cart bhejein array ke bajaye
      });
    }
    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    // 🌟 FIX 1: Universal userId extraction
    const userId = req.id || req.userId || req.user?._id || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "User ID missing! Check token." });

    const { productId } = req.body;
    console.log("Found User ID:", userId);
    console.log("Found Product ID:", productId);

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // If cart does not exist
    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: 1,
            price: product.productPrice,
          },
        ],
        totalPrice: product.productPrice,
      });
    } else {
      // Find if product is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If product exists -> increase quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        // If new product -> push to cart
        cart.items.push({
          productId,
          quantity: 1,
          price: product.productPrice,
        });
      }

      // Recalculate the total price
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + (item.price * item.quantity), 
        0
      );
    }

    // Save to the cart
    await cart.save();

    // Populate product detail before sending response
    const populatedCart = await Cart.findById(cart._id).populate("items.productId");
    
    res.status(200).json({
      success: true, 
      message: "Product added to cart successfully",
      cart: populatedCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    // 🌟 FIX 1: Universal userId extraction
    const userId = req.id || req.userId || req.user?._id || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "User ID missing!" });

    const { productId, type } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    if (type === "increase") item.quantity += 1;
    // 🌟 FIX 2: String error theek kiya
    if (type === "decrease" && item.quantity > 1) item.quantity -= 1;

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    );

    await cart.save();
    
    // 🌟 FIX 3: "Items.productId" ko "items.productId" kiya
    cart = await cart.populate("items.productId");
    res.status(200).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    // 🌟 FIX 1: Universal userId extraction
    const userId = req.id || req.userId || req.user?._id || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "User ID missing!" });

    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    );

    await cart.save();
    
    res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};