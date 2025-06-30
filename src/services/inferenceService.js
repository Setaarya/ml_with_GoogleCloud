const tf = require('@tensorflow/tfjs-node');
const { getModel } = require('./loadModel');

async function predictImage(imageBuffer) {
    const model = getModel();

    const imageTensor = tf.node.decodeImage(imageBuffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(tf.scalar(255.0));

    const prediction = model.predict(imageTensor);
    const label = await prediction.data();
    const confidenceScore = Math.max(...label) * 100;

    return score = confidenceScore <= 50 ? 'Non-cancer' : 'Cancer'; 
};

module.exports = { predictImage };
