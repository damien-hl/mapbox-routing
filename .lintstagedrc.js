export default {
  "**/*.js?(x)": (filenames) =>
    filenames.map((filename) => `prettier --write '${filename}'`),
};
