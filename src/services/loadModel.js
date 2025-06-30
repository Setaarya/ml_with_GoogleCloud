const tf = require('@tensorflow/tfjs-node');

let model;

// Fungsi ini akan dipanggil sekali saat server start
async function loadAppModel() {
    console.log('Loading model from GCS...');
    model = await tf.loadGraphModel('https://storage.googleapis.com/model_storage_yulianto/model-in-prod/model.json');
    console.log('Model loaded successfully.');
}

// Fungsi ini akan dipanggil setiap kali ada request prediksi
function getModel() {
    if (!model) {
        throw new Error('Model is not loaded yet!');
    }
    return model;
}

module.exports = { loadAppModel, getModel };
