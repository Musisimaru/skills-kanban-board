export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "iife",
      },
    ],
    plugins: [
      // todo: попозже накидаем сюда плагинов
    ],
  },
];
