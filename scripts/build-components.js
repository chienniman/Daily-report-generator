const { build } = require("esbuild");
const glob = require("glob");

async function bundleComponents() {
  try {
    const files = glob.sync("./components/**/*.js", {
      ignore: ["./components/shared/**/*"],
    });

    await build({
      entryPoints: files,
      bundle: true,
      minify: true,
      outdir: "./dist/components/",
    });
    console.log("打包元件成功");
  } catch (error) {
    console.error("打包元件失敗", error);
    process.exit(1);
  }
}

bundleComponents();
