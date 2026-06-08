const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const validateScript = path.resolve(__dirname, "validate-project.js");

const REQUIRED_DIRECTORIES = [
  "src/app",
  "src/app/core",
  "src/app/core/services",
  "src/app/core/models",
  "src/app/features",
  "src/app/shared",
];

const REQUIRED_FILES = [
  "src/app/app.routes.ts",
  "src/app/app.config.ts",
  "README.md",
  "PROJECT_INFO.md",
];

function createRequiredStructure(rootPath) {
  REQUIRED_DIRECTORIES.forEach((directory) => {
    fs.mkdirSync(path.join(rootPath, directory), {
      recursive: true,
    });
  });

  REQUIRED_FILES.forEach((file) => {
    fs.writeFileSync(path.join(rootPath, file), "", "utf8");
  });
}

let tempRoot;

try {
  tempRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), "grade-mini-")
  );

  createRequiredStructure(tempRoot);

  const htmlReportPath = path.resolve(
    process.cwd(),
    "grade-report-mini.html"
  );

  console.log(`Mini project created at: ${tempRoot}`);
  console.log("Running grade...\n");

  const result = spawnSync(
    process.execPath,
    [
      validateScript,
      "--grade",
      "--root",
      tempRoot,
      "--html",
      htmlReportPath,
    ],
    {
      stdio: "inherit",
    }
  );

  if (result.error) {
    throw result.error;
  }

  console.log(
    `\nHTML report saved to: ${htmlReportPath}`
  );

  process.exit(result.status || 0);

} catch (error) {
  console.error(
    "Error while generating grade report:",
    error.message
  );

  process.exit(1);

} finally {
  if (tempRoot && fs.existsSync(tempRoot)) {
    fs.rmSync(tempRoot, {
      recursive: true,
      force: true,
    });
  }
}