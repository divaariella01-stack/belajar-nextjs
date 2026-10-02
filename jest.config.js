const nextJest = require("next/jest")();

const createJestConfig = nextJest;

const customJestConfig = {
  testEnvironment: "node",
};

module.exports = createJestConfig(customJestConfig);