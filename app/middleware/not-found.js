const notFound = (req, res) => (res.status(404).send({ status: 'fail', message: 'Route does not exist' }));
module.exports = notFound;
