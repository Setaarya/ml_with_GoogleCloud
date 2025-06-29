const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

module.exports.savePrediction = async (data) => {
  await firestore.collection('predictions').doc(data.id).set(data);
};

module.exports.getHistories = async () => {
  const snapshot = await firestore.collection('predictions').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    history: doc.data()
  }));
};
