import mongoose from "mongoose";
const connect = () => {
    mongoose.connect(process.env.URL_BASE_DATOS)
    const db = mongoose.connection
    db.on('error', (error) => console.log(error))
    db.once('open', () => console.log("Connected to your Database"))
}
export default connect;
