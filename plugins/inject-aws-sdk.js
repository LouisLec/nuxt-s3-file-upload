import { config, Endpoint, S3 } from 'aws-sdk';
import Vue from 'vue';

const CELLAR_ADDON_KEY_ID = process.env.CELLAR_ADDON_KEY_ID;
const CELLAR_ADDON_KEY_SECRET = process.env.CELLAR_ADDON_KEY_SECRET;
const CELLAR_ADDON_HOST = process.env.CELLAR_ADDON_HOST;


config.update({accessKeyId: CELLAR_ADDON_KEY_ID, secretAccessKey: CELLAR_ADDON_KEY_SECRET});
const endpoint = new Endpoint(CELLAR_ADDON_HOST);
const s3 = new S3({ endpoint });
Vue.prototype.$s3 = s3;