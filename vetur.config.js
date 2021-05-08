// vetur.config.js
module.exports = {
    settings: {
      "vetur.useWorkspaceDependencies": true,
      "vetur.experimental.templateInterpolationService": false,
    },

    projects: [

      {
        // **required**

        root: "./frontend",
        // **optional** default: `'package.json'`

        package: "./package.json",
        globalComponents: ["./src/components/**/*.vue"],
      },
    ],
  };