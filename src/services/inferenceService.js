const tf = require('@tensorflow/tfjs-node');
const { getModel } = require('./loadModel');

async function predictImage(imageBuffer) {
    const model = getModel();

    const imageTensor = tf.node.decodeImage(imageBuffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat();

    const prediction = model.predict(imageTensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;
 
    return confidenceScore <= 50 ? 'Non-cancer' : 'Cancer'; 
};

module.exports = { predictImage };
