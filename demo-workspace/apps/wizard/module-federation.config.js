module.exports = {
  name: 'wizard',
  remotes: [],
  shared: (name, config) => {
    // We want lodash to be tree shaken, and bundled into each host/remote separately.
    if (name === 'lodash') {
      return false;
    }
  },
};
