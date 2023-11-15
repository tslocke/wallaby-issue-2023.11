module.exports = function () {
  return {
    resolveGetters: true,

    logLimits: {
      inline: {
        depth: 12,
      }
    },

    runMode: "onSave",

  };
};
