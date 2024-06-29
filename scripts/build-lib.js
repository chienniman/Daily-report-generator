const { execSync } = require("child_process");

const files = [
  "./lib/excel/excel.js",
  "./lib/excel/table2excel.js",
  "./lib/excel/xlsx.js",
  "./lib/ppt/pptxgen.js",
  "./lib/dom2image.js",
  "./lib/jquery.js",
  "./lib/papaparse.js",
  "./lib/jschardet.js",
  "./lib/sweetalert2.js",
];

const outputFilePath = "./dist/lib/bundle.js";

const command = `uglifyjs ${files.join(" ")} -o ${outputFilePath} -c -m`;

try {
  execSync(command);
  console.log("打包 lib 成功", outputFilePath);
} catch (error) {
  console.error("失敗", error);
  process.exit(1);
}

