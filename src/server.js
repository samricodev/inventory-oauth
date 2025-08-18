function start(application, port = 3000) {
  application.listen(port, () => {
    console.log(`Server listen on port ${port}`);
  });
}

module.exports = {
  start
};
