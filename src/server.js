function start(application, port = 3081) {
  application.listen(port, () => {
    console.log(`Server listen on port ${port}`);
  });
}

module.exports = {
  start
};
