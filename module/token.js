import dotenv from "dotenv";

const Token = (function () {
  function get() {
    if (typeof process !== "undefined" && process.env) {
      dotenv.config();
      return process.env.API_KEY;
    }
    if (import.meta.env !== undefined) {
      return import.meta.env.VITE_API_KEY;
    }
  }

  return {
    get,
  };
})();

export default Token;
