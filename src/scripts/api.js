const BASE_URL = 'http://34.101.248.168:3000';

const ENDPOINT = {
  predict: `${BASE_URL}/predict`,
};

class PredictAPI {
  static async predict(data) {
    const response = await fetch(ENDPOINT.predict, {
      method: 'POST',
      body: data,
    });

    // Ambil body JSON dari respons, baik itu sukses maupun error
    const json = await response.json();

    // Periksa apakah status respons BUKAN 'ok' (artinya status bukan 2xx)
    // Jika tidak ok, maka ini adalah sebuah error.
    if (!response.ok) {
      // Lemparkan (throw) sebuah error baru dengan pesan yang didapat dari body JSON backend.
      // Error ini akan ditangkap oleh blok 'catch' di main.js.
      throw new Error(json.message);
    }

    // Jika respons 'ok', kembalikan body JSON sebagai data sukses.
    return json;
  }
}
