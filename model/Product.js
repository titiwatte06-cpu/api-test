import shcema from "../config/shcema.js";
import mongoose from "mongoose";

const Product = mongoose.model("Product",shcema)


export default Product