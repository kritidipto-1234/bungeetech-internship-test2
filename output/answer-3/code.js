const fs = require("fs");
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("json2csv").parse;

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function sort(data) {
    const n = data.length;
    let swapped = 1;
    while (swapped !== 0) {
        swapped = 0;
        for (let j = 0; j < n - 1; j++) {
            if (
                Number(data[j]["Red Cards"]) < Number(data[j + 1]["Red Cards"])
            ) {
                swap(data, j, j + 1);
                swapped = 1;
            }

            if (
                Number(data[j]["Red Cards"]) ===
                    Number(data[j + 1]["Red Cards"]) &&
                Number(data[j]["Yellow Cards"]) <
                    Number(data[j + 1]["Yellow Cards"])
            ) {
                swap(data, j, j + 1);
                swapped = 1;
            }
        }
    }
}

async function task() {
    const data = await CSVToJSON().fromFile(
        `${__dirname}/../../input/question-3/main.csv`
    );

    sort(data);

    const csvData = JSONToCSV(data, {
        fields: ["Team", "Yellow Cards", "Red Cards"],
    });
    fs.writeFileSync(`${__dirname}/main.csv`, csvData);
}

task();
console.log("Generating Output 3");
