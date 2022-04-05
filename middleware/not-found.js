const notFound = (req, res) => {
  res.status(404).send("<h1>ERROR 404 NOT FOUND</h1>");
};

module.exports = notFound;
