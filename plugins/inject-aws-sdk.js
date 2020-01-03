import { config, Endpoint, S3 } from 'aws-sdk';
import Vue from 'vue';
const uuidv4 = require('uuid/v4');

const CELLAR_ADDON_KEY_ID = process.env.CELLAR_ADDON_KEY_ID;
const CELLAR_ADDON_KEY_SECRET = process.env.CELLAR_ADDON_KEY_SECRET;
const CELLAR_ADDON_HOST = process.env.CELLAR_ADDON_HOST;


config.update({accessKeyId: CELLAR_ADDON_KEY_ID, secretAccessKey: CELLAR_ADDON_KEY_SECRET});
const endpoint = new Endpoint(CELLAR_ADDON_HOST);
const s3 = new S3({ endpoint });

const uploadFile = async (file) => {
        await s3.upload({
            Body: file,
            Key: uuidv4(),
            Bucket: "sopolyglot-dev",
            ACL: 'public-read'
        }, (err, data) => {
            if (err) {
                console.log(err);
            }
            const myData = data
        });
        return myData
    

}
// const uploadFile = (file) => {

//     return new Promise((resolve, reject) => {
//         s3.upload({
//             Body: file,
//             Key: uuidv4(),
//             Bucket: "sopolyglot-dev",
//             ACL: 'public-read'
//         }, (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(data.Location)
//         });
//     })

// }
s3.uploadFile = uploadFile;

Vue.prototype.$s3 = s3