const fs = require("fs");
const path = require("path");
const { generateHtmlReport } = require("./report-html");

const outputDirectory = path.resolve(__dirname, "..");

// Idealmente estes dados deveriam vir de um JSON externo
const groups = require("./mock-groups.json");

let generatedReports = 0;
let failedReports = 0;
let totalScore = 0;

for (const group of groups) {
  try {
    const {
      filename,
      options,
      projectInfo,
      report,
      analysis,
    } = group;

    if (!filename || !report) {
      throw new Error("Invalid group configuration");
    }

    const html = generateHtmlReport(
      report,
      projectInfo,
      analysis,
      options
    );

    const outputPath = path.join(
      outputDirectory,
      filename
    );

    fs.writeFileSync(
      outputPath,
      html,
      "utf8"
    );

    generatedReports++;
    totalScore += report.score;

    console.log(
      `✓ Generated: ${filename} (${report.score}/${report.maxScore})`
    );

  } catch (error) {
    failedReports++;

    console.error(
      `✗ Failed to generate report: ${group.filename || "Unknown"}`
    );

    console.error(error.message);
  }
}

console.log("\n===== SUMMARY =====");
console.log(`Generated: ${generatedReports}`);
console.log(`Failed: ${failedReports}`);

if (generatedReports > 0) {
  console.log(
    `Average score: ${(totalScore / generatedReports).toFixed(2)}`
  );
}

console.log("\nAll reports processed.");