module.exports = (imagesArray) => {
  return imagesArray.map((image) => {
    return Object({
      url: image.filename,
      name: image.filename,
    });
  });
};
