import fs from 'fs'
import S3 from 'aws-sdk/clients/s3'

const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
//console.log(accessKeyId)
const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});
//CARGAR IMAGEN
export const uploadToBucket = (file) => {
    //console.log(file)
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket:nameBucket,
        Key:file.name,
        Body:stream
    };
    return storage.upload(params).promise();
}
//ELIMINAR IMAGEN
export const deleteObject = (params) => {
    storage.deleteObject(params, function(err, data){
        if(err){
            console.log(err, err.stack);  // error
        }else{
            console.log('Eliminado correctamente');
        } 
    })
}