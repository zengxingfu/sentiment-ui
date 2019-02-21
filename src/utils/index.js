import Json2csvParser from "json2csv";
import saveAs from "file-saver";

export function generateCSV(weibo_list, filename) {
    const fields = [];
    for (const key in weibo_list[0]) {
        fields.push(key);
    }
    // const opts = { fields };
    const parser = new Json2csvParser.Parser({
        fields,
        withBOM: true
    });
    const csv = parser.parse(weibo_list);
    const blob = new Blob([csv], {
        type: "text/csv"
    });
    saveAs(blob, filename);
}