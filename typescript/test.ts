const a: number = 1;
console.log(a);

//我们在使用ts的时候需要将编写的ts代码转换成js再运行

// 1.可以通过typescript这个模块 来进行文件的编译
// npm install typescript -g 全局的包只能在命令行中使用: tsc
// 最终直接生成js文件在运行。
// tsc --init 初始化ts的配置文件

//2.vscode插件来实现代码的运行(适合临时测试)
// code-runner如果是js文件内部会直接采用node +文件名来执行此文件， 如果是ts文件需要通过ts-node 来直接执行
//npm install ts-node -g

//3. 通过构建工具将代码编译成js再去执行(webpack,rooluo,esbuild)
// npm i rollup rollup-plugin-typescript2 typescript @rollup/plugin-node-resolve -D
// rollup: 构建工具  rollup-plugin-typescript2: 将rollup与typescript连接起来的桥梁 @rollup/plugin-node-resolve: 可以使用node的方式解析第三方模块
