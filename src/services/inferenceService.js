const tf = require('@tensorflow/tfjs-node');
const { getModel } = require('./loadModel');

async function predictImage(imageBuffer) {
    const model = getModel();

    const imageTensor = tf.node.decodeImage(imageBuffer, 3)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(tf.scalar(255.0));

    const prediction = model.predict(imageTensor);
    const score = await prediction.data();
    
    const cancerProbability = score[];

    if (cancerProbability > 0.5) {
        return 'Cancer';
    } else {
        return 'Non-cancer';
    }
};

module.exports = { predictImage };
