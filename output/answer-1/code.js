const fs = require("fs");
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;

async function task() {
    const data = await CSVToJSON().fromFile(
        `${__dirname}/../../input/question-1/main.csv`
    );
    data.sort((a, b) => Number(a.Year) - Number(b.Year));
    const fields = Object.keys(data[0]);
    fields.splice(fields.indexOf("Year"), 1);
    fields.splice(fields.indexOf("Total"), 1);
    const result = {};

    for (const yearData of data) {
        const decade = Math.trunc(yearData.Year / 10) * 10;
        if (!result[decade]) {
            //initialize
            result[decade] = yearData;
        } else {
            //add
            for (const field of fields) {
                if (field === "Population")
                    result[decade][field] = yearData[field];
                else
                    result[decade][field] =
                        Number(result[decade][field]) + Number(yearData[field]);
            }
        }
    }

    const transformedResult = [];

    for (const [decade, decadeData] of Object.entries(result)) {
        decadeData["Decade"] = decade;
        delete decadeData.Year;
        delete decadeData.Total;
        transformedResult.push(decadeData);
    }

    const csvData = JSONToCSV(transformedResult, {
        fields: ["Decade", ...fields],
    });
    fs.writeFileSync(`${__dirname}/main.csv`, csvData);
}

task();
console.log("Generating Output 1");
