const { predictImage } = require('../services/inferenceService');
const { savePrediction, getHistories } = require('../services/storeData');
const { InputError } = require('../exceptions/InputError');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  postPredictHandler: async (request, h) => {
    try {
      const { payload } = request;
      if (!payload || !payload.image) {
        throw new InputError('Image is required');
      }

      const file = payload.image;
      if (file._data.length > 1000000) {
        return h.response({
          status: 'fail',
          message: 'Payload content length greater than maximum allowed: 1000000'
        }).code(413);
      }

      const id = uuidv4();
      const result = await predictImage(file._data);
      const createdAt = new Date().toISOString();

      const suggestion = result === 'Cancer'
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.';

      const data = { id, result, suggestion, createdAt };
      await savePrediction(data);

      return h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
      }).code(201);

    } catch (error) {
      console.error(error);
      return h.response({
        status: 'fail',
        message: error instanceof InputError
          ? error.message
          : 'Terjadi kesalahan dalam melakukan prediksi'
      }).code(error instanceof InputError ? 400);
    }
  },

  getHistoriesHandler: async (_request, h) => {
    try {
      const histories = await getHistories();
      return h.response({
        status: 'success',
        data: histories
      }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'fail',
        message: 'Terjadi kesalahan saat mengambil riwayat'
      }).code(500);
    }
  }
};
