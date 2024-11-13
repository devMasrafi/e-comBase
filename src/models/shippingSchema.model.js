import mongoose, { Schema } from "mongoose";
const shippingSchema = new Schema({
    sname: String,
    scountry: {
        type: String,
        default: "bangladesh"
    },
    saddress: String,
    scity: String,
    sdistrict: String,
    spostcode: String,
    sphone: String,
    semail: String,
}, {
    timestamps: true
})

export const Shipping = mongoose.model("Shipping", shippingSchema)