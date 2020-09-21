const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: Number },
    password: { type: String, minlength: 6 },
    email: { type: String, unique: true },
    resetToken: String,
    resetTokenExpiration: Date,
    googleId: String,
    facebookId: String,
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
    previousOrders: {
        orders: [
            {
                orderId: {
                    type: Schema.Types.ObjectId,
                    ref: "PreviousOrders",
                    required: true,
                },
            },
        ],
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
    },
});

mongoose.model("User", userSchema);