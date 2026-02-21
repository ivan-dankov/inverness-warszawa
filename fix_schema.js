import * as fs from "fs";
import * as glob from "glob";

const pattern = "/Users/ivandankov/Documents/Dev Projects/inverness-warszawa/src/pages/**/{uslugi,services,poslugy}/*.astro";
const files = glob.sync(pattern);

let filesUpdated = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const priceRegex1 = /"price":\s*"(\d+)-(\d+)"/g;
    if (priceRegex1.test(content)) {
        content = content.replace(priceRegex1, '"price": "$1"');
        changed = true;
    }
    const priceRegex2 = /"price":\s*"(\d+)\+"/g;
    if (priceRegex2.test(content)) {
        content = content.replace(priceRegex2, '"price": "$1"');
        changed = true;
    }

    const providerRegex = /("provider":\s*{\s*"@type":\s*"LocalBusiness",\s*"name":\s*"Gentle Piercing")/g;

    if (providerRegex.test(content) && !content.includes('"telephone":')) {
        content = content.replace(providerRegex, `$1,
      "image": "https://gentlepiercing.pl/preview.png",
      "telephone": "+48573818260"`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        filesUpdated++;
        console.log(`Updated: ${file}`);
    }
}

console.log(`Finished executing. Total files updated: ${filesUpdated}`);
