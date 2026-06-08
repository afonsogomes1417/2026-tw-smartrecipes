const fs = require("fs");
const path = require("path");

// Diretório raiz do projeto
const projectRoot = path.resolve(__dirname, "..");

// Padrões dos relatórios a remover
const reportPatterns = [
  /^grade-report-test-grupo\d+\.html$/,
  /^grade-report-mini\.html$/,
];

try {
  const filesToDelete = fs
    .readdirSync(projectRoot)
    .filter(file =>
      reportPatterns.some(pattern => pattern.test(file))
    );

  if (filesToDelete.length === 0) {
    console.log("Nenhum ficheiro encontrado para remoção.");
    process.exit(0);
  }

  for (const file of filesToDelete) {
    const filePath = path.join(projectRoot, file);

    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath, { force: true });
      console.log(`✓ Removido: ${file}`);
    }
  }

  console.log(`\nLimpeza concluída. ${filesToDelete.length} ficheiro(s) removido(s).`);

} catch (error) {
  console.error("Erro durante a limpeza:", error.message);
  process.exit(1);
}