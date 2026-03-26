import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  subTotal: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ["Created", "Processing", "Completed", "Cancelled"],
    default: "Created"
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "UPI", "Card", "NetBanking", "Wallet"],
    default: "Cash"
  },
  placedAt: {
    type: Date,
    default: Date.now
  },
  fulfilledAt: Date,
  notes: String
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
