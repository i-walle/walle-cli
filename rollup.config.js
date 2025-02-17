 import commonjs from "@rollup/plugin-commonjs";
 import json from "@rollup/plugin-json";
 import nodeResolve from "@rollup/plugin-node-resolve";
 import typescript from "@rollup/plugin-typescript";
// import { defineConfig } from "rollup";
// import nodeExternals from "rollup-plugin-node-externals";

async function loadConfig() {
  const nodeExternals = await import('rollup-plugin-node-externals');
  return {
    input: 'src/index.ts',
    output: {
      dir: "dist",    // 输出目录
      format: 'cjs',
    },
    plugins: [
      nodeResolve(),
      typescript(),
      commonjs(),
      json(),
      nodeExternals.default({
        devDeps: false,
      }), // 注意：动态导入的模块需要通过 .default 访问
    ],
  };
}
export default loadConfig();

// export default defineConfig([
//   {
//     input: {
//       index: "src/index.ts", // 入口文件
//     },
//     output: [
//       {
//         dir: "dist",    // 输出目录
//         format: "cjs",  // 输出commonjs格式
//       },
//     ],
//     plugins: [
//         nodeResolve(),
//         nodeExternals.default({
//           devDeps: false,
//         }),
//         commonjs(),
//         json(),
//         typescript(),
//     ],
//   },
// ])