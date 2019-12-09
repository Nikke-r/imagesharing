'use strict';

const ExifImage = require('exif').ExifImage;

const getCoordinates = (imageFile) => {
  return new Promise((res, rej) => {
    try {
      new ExifImage({image: imageFile}, (error, exifData) => {
        if (error) {
          rej(error);
        } else {
          const longitude = gpsToDecimal(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
          const latitude = gpsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
          const coords = [latitude, longitude];
          res(coords);
        }
      })
    } catch (e) {

    }
  });
};

const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) +
      parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports = {
  getCoordinates
};