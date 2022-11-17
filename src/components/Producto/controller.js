import Producto from "../../models/Producto";
import { uploadToBucket, deleteObject } from "../../aws/s3";
//MOSTRAR

export const findAll = async(req, res) => {
    try {
        const productos = await Producto.find();
        return res.render('pages/index', {productos:productos})
        /* res.json({
            ok:true,
            data: Productos
        }) */
    } catch (error) {
        //console.log("Error al mostrar Productos")
        res.json({
            ok:false,
            error: error
        })
    }
}

export const create = async (req,res) => {
    try {
        const file = req.files.foto;
        //ENVIAMOS LA IMAGEN
        const result = await uploadToBucket(file)
        //RECIBIMOS LA IMAGEN Y LA GUARDAMOS EN LA BD
        await sendBaseData(req,result.Location)
        //console.log(req,result.Location)
        res.redirect('/')
    } catch (error) {
        console.log(error.message)
        /* res.json({
            ok:false,
            error: error
        }) */
    }
}

const sendBaseData = async (req, urlImage) => {
    try {
        const { body } = req;
        const {nombre, precio, stock, categoria, descripcion} = body
        const producto = new Producto({
            nombre:nombre,
            precio:precio,
            stock:stock,
            categoria:categoria,
            descripcion:descripcion,
            imagen: urlImage,
        });
        await producto.save()
    } catch (error) {
        console.log(error)
    }
}

export const update = async (req, res) => {
    try {
        const {body} = req;
        const id = req.body.id_editar;
        
        const dataUpdate = {
            nombre : body.nombre_edit,
            precio:body.precio_edit,
            stock:body.stock_edit,
            categoria:body.categoria_edit,
            descripcion:body.descripcion_edit,
        }
         if(req.files){
            const file = req.files.foto_edit;
            const producto = await Producto.findById(id)
            const keyImage = producto.imagen.split('/')[3]
            let params = {  Bucket: 's3-photosdf', Key: keyImage };
            await deleteObject(params)
            const result = await uploadToBucket(file)
            const imageUpdate = await result.Location
            dataUpdate.imagen = imageUpdate
            console.log("Existe el file")
         }
        
        await Producto.findByIdAndUpdate(id,{ $set:dataUpdate})
        res.redirect('/')
        
    } catch (error) {
        //console.log(error.message)
        res.json({
            ok:false,
            error: error.message
        })
    }
}
export const show = async(req, res) => {
    try {
        const {nombrec} = req.body
        console.log(req)
        
        const producto = await Producto.find({nombre: nombrec})
        res.render('pages/index', {productos:producto})
        console.log(Producto)
    } catch (error) {
        console.log(error)
    }
}

export const destroy = async (req, res) => {
    try {
        const id = req.params.id
        const producto = await Producto.findById(id)
        
        const keyImage = producto.imagen.split('/')[3]
        let params = {  Bucket: 's3-photosdf', Key: keyImage };
        await deleteObject(params)
        

        await Producto.findByIdAndDelete(id)

        console.log(keyImage)
        res.redirect('/')
        /* res.json({
            message: "Documento eliminado"
        }) */
    } catch (error) {
        //console.log(error.message)
        res.json({
            ok:false,
            error: error.message
        })
    }
}