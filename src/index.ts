export const sum = (a: number, b: number) => {
  if ("development" === process.env.NODE_ENV) {
    console.log("boop"); //eslint-disable-line
  }
  return a + b;
};
