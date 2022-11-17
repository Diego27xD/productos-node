import mongoose from "mongoose";

const Contacto = mongoose.model("Contacto",
    new mongoose.Schema({
        nombre: String,
        apellidos: String,
        correo: String,
        fecha_nac: String,
        foto: String
    },
    {
        timestamps:true,
        versionKey:false
    })
)
export default Contacto