const fs = require("fs");
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;

async function task() {
    const data = await CSVToJSON().fromFile(
        `${__dirname}/../../input/question-2/main.csv`
    );
    const result = {};

    for (const { occupation, age } of data) {
        if (!result[occupation]) {
            result;
            result[occupation] = { min: age, max: age };
        } else {
            result[occupation].min = Math.min(
                Number(result[occupation].min),
                Number(age)
            );
            result[occupation].max = Math.max(
                Number(result[occupation].max),
                Number(age)
            );
        }
    }

    const transformedResult = [];
    for (const [occupation, minmaxdata] of Object.entries(result)) {
        transformedResult.push({ occupation, ...minmaxdata });
    }

    transformedResult.sort((a, b) => {
        return a.occupation.localeCompare(b.occupation);
    });

    const csvData = JSONToCSV(transformedResult, {
        fields: ["occupation", "min", "max"],
    });
    fs.writeFileSync(`${__dirname}/main.csv`, csvData);
}

task();
console.log("Generating Output 2");
