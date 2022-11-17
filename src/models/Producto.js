import mongoose from "mongoose";

const Producto = mongoose.model("Producto",
    new mongoose.Schema({
        nombre: String,
        precio: Number,
        stock: Number,
        categoria: String,
        descripcion: String,
        imagen: String,
    },
    {
        timestamps:true,
        versionKey:false
    })
)

export default Producto