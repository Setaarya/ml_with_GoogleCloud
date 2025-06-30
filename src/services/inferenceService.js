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
    const score = (await prediction.data())[0];

    return score > 0.5 ? 'Cancer' : 'Non-cancer';
};

module.exports = { predictImage };
