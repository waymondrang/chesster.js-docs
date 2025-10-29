const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        // https://stackoverflow.com/a/61785012
        "node_modules/chesster\.js/.+\.(j|t)sx?$": "ts-jest",
        ...tsJestTransformCfg,
    },
    transformIgnorePatterns: ["node_modules\/(?!chesster\.js\/.*)"],
};
