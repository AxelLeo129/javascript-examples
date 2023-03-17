const xmlDecoder = require("xml-decoder");
const { XMLHttpRequest } = require("xmlhttprequest");

const fixKeyNameOfJson = async (json) => {
  let newJson = json;
  for (let key of Object.keys(newJson)) {
    let newName = key.replace(/@/g, "").trim();
    if (newName.includes(":")) {
      let nameParts = newName.split(":");
      newName = nameParts[nameParts.length - 1];
    }
    if (typeof newJson[key] == "object") {
      newJson[newName] = await fixKeyNameOfJson(newJson[key]);
    } else {
      newJson[newName] = newJson[key];
    }
    if (["@", ":"].find((ele) => key.includes(ele))) delete newJson[key];
    if (
      ["soapenv", "get", "tag", "xml", "S", "add"].find(
        (ele) => newName === ele
      )
    )
      delete newJson[newName];
  }
  return newJson;
};

const xmlHttpRequestFunction = async (url, xml, contentType = "application/xml") => {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", contentType);

  xhr.onreadystatechange = async function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(await fixKeyNameOfJson(xmlDecoder(xhr.responseText)));
    }
  };

  xhr.send(xml);
};

module.exports = { xmlHttpRequestFunction };
