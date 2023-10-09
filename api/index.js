const { S3 } = require('aws-sdk');
const parseMultipart = require('parse-multipart');

const BUCKET = process.env.BUCKET;

const s3 = new S3();

module.exports.handler = async (event) => {
  try {
    // Pura tiedosto extractFile-funktiolla
    const { filename, data } = extractFile(event);
    // Tallenna tiedosto Amazon S3:een
    await s3.putObject({ Bucket: BUCKET, Key: filename, Body: data, ACL: 'public-read',}).promise();
    // Palauta HTTP 200 -vastaus, joka sisältää linkin tallennettuun tiedostoon
    return {
      statusCode: 200,
      body: JSON.stringify({ link: `https://${BUCKET}.s3.amazonaws.com/${filename}` }),
    };
    // Jos tapahtuu virhe, palauta HTTP 500 -vastaus
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.stack }),
    };
  }
};

function extractFile(event) {
  // Haetaan rajapinta (boundary) pyynnön Content-Type -otsikosta
  const boundary = parseMultipart.getBoundary(event.headers['Content-Type']);
  // Puretaan moniosainen pyyntö ja tallennetaan osat 'parts'-taulukkoon
  const parts = parseMultipart.Parse(
    Buffer.from(event.body, 'base64'),
    boundary
  );
  // Otetaan taulukon ensimmäinen osa, joka sisältää tiedoston nimen ja datan
  const [{ filename, data }] = parts;
  // Palautetaan tiedoston nimi ja data objektina
  return {
    filename,
    data,
  };
}
