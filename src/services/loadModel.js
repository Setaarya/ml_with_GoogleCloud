const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    return tf.loadGraphModel('https://storage.googleapis.com/model_storage_yulianto/model-in-prod/model.json');
}
module.exports = loadModel;