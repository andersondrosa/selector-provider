import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");

export default {
  input: "src/index.tsx", // Ponto de entrada do seu código
  output: [
    {
      file: packageJson.main, // Saída para CommonJS (CJS)
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module, // Saída para ES Modules (ESM)
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(), // Exclui peerDependencies
    resolve(), // Resolve imports de node_modules
    commonjs(), // Converte CommonJS para ES Modules
    typescript({ tsconfig: "./tsconfig.json" }), // Suporte para TypeScript
    postcss({
      modules: true, // Suporte para CSS Modules
      extract: false, // Inclui CSS no JavaScript
    }),
  ],
  external: [...Object.keys(packageJson.peerDependencies || {})], // Exclui peerDependencies do bundle final
};
