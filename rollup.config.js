import copy from "rollup-plugin-copy";

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
      // Copy files to public
      copy({
        targets: [
          { src: "src/index.html", dest: "public" },
          { src: "src/index.html", dest: "public" },
          { src: "dist/index.js", dest: "public/js" },
        ],
        hook: 'writeBundle'
      }),
    ],
  },
];
