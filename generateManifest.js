const fs = require("fs");
const path = require("path");

const levels = ["starter", "level1", "level2", "level3", "level4", "level5", "boss"];
const expansions = ["wa", "ao", "wao"];
const output = {};

levels.forEach(level => {
  const levelPath = path.join(__dirname, "cards", level);
  const files = fs.readdirSync(levelPath).filter(f => /\.(png|jpe?g|gif)$/i.test(f));

  output[level] = { base: [], wa: [], ao: [], wao: [] };

  files.forEach(file => {
    const filePath = `cards/${level}/${file}`;
    const prefix = expansions.find(x => file.toLowerCase().startsWith(`${x}_`));
    if (prefix) {
      output[level][prefix].push(filePath);
    } else {
      output[level].base.push(filePath);
    }
  });
});

fs.writeFileSync("manifest.json", JSON.stringify(output, null, 2));
console.log("✅ manifest.json generated.");
