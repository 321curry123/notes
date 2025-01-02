// 默认rollup打包的时候会查找到当前目录下的这个文件
// 采用es模块来编写配置文件
import ts from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // 当前文件的绝对路径
const __dirname = path.dirname(__filename); // 当前文件所在文件夹的绝对路径

// 打包的配置对象
export default {
  input: "./src/index.ts", // 项目入口
  output: {
    file: path.resolve(__dirname, "dist/boundle.js"), // 打包后的位置
    format: "iife",
    sourcemap: true, // 断点调试时可以在未编译的代码处调试
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts"], // 第三方包的入口文件可以是js或ts文件
    }),
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
  ],
};
