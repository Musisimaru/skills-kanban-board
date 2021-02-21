import copy from "rollup-plugin-copy";
import typescript from "rollup-plugin-typescript2";

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
          { src: "html/index.html", dest: "public" },
          { src: "dist/index.js", dest: "public/js" },
          { src: "img", dest: "public" },
          { src: "styles/css", dest: "public" },
          { src: "styles/fonts", dest: "public" },
        ],
        hook: "writeBundle",
      }),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
];
