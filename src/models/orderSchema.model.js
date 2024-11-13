import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        unique: true
    },
    total: Number,
    subTotal: Number,
    name: String,
    country: {
        type: String,
        default: "bangladesh"
    },
    address: String,
    city: String,
    district: String,
    postcode: String,
    phone: String,
    email: String,
    shippingCost: Number,
    paymentType: {
        type: String,
        enum: ["cod", "online"],
    },
    orderStatus: {
        type: String,
        enum: ["pending", "confirm", "proccesing", , "shipping", "delivered", "returned", "cancelled"],
    },
    returnInfo: String,
    isShipping: {
        type: Boolean,
        default: false
    },
    shipping: {
        type: mongoose.Types.ObjectId,
        ref: "Shipping"
    },
    orderedProducts: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
            },
            inventory: {
                type: mongoose.Types.ObjectId,
                ref: "Inventory",
            },
            price: Number,
            quantity: Number
        }
    ]
}, {
    timestamps: true
})

export const Order = mongoose.model("Order", orderSchema)