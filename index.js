const couchbase = require("couchbase");
const SftpClient = require("ssh2-sftp-client");
const oracledb = require("oracledb");
const cassandra = require("cassandra-driver");
const shelljs = require("shelljs");
const redis = require("redis");
const k8s = require("@kubernetes/client-node");
const { encode, decode } = require("js-base64");
const request = require('superagent')
const soap = require('soap');
const soapRequest = require('easy-soap-request');
const xmlDecoder = require('xml-decoder');
const fs = require('fs');

async function tryFs() {

}

async function fixKeyNameOfJson(json) {
  let newJson = json;
  for (let key of Object.keys(newJson)) {
      let newName = key.replaceAll('@', '').trim();
      if (newName.includes(":")) {
          let nameParts = newName.split(':');
          newName = nameParts[nameParts.length - 1]
      }
      if (typeof newJson[key] == 'object') {
          newJson[newName] = await fixKeyNameOfJson(newJson[key]);
      } else {
          newJson[newName] = newJson[key];
      }
      if (['@', ':'].find(ele => key.includes(ele))) delete newJson[key];
      if (['soapenv', 'get', 'tag', 'xml', 'S', 'add'].find(ele => newName === ele)) delete newJson[newName];
  }
  return newJson;
}

const easySoapClient = async (url, xml) => {
  const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': '',
  }
  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 5000 }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  console.log(headers);
  json = await fixKeyNameOfJson(xmlDecoder(body, {mergeAttrs: true}));
  console.log(json.Envelope.Body.WC_Opportunity_BSInsert_Input);
  console.log(statusCode);
}

const clientSOAP = async (url, xml, soapAction, typeWs) => {
  const options = {
      disableCache: true,
  }
  let message = "Check file name and the folder name";
  if (typeWs == 1) {
      message = "Check if the URL is a URL with SOAP service";
  }
  return new Promise((resolve, reject) => {
      try {
      soap.createClient(url, options, function (err, client) {
              if (err) {
                  reject(`${err}`)
              }
              if (client) {
                console.log(client.describe());
                  if(!Object.keys(client).includes(soapAction)) reject(new Error(`This action: '${soapAction}' is undefined.`));
                  const args = {_xml: xml}
                  client[soapAction](args, (error, response) => {
                      if (error) reject(`${error}`)
                      else resolve(response);
                  }, {
                      postProcess: (_xml) => _xml.replace(_xml, args._xml)
                  })
              } else {
                  reject(message)
              }
      });
  } catch(err1) {
      reject(`${err1}`)
  }
  })
}

const soapFunction = async () => {
  try {
    //const response = await clientSOAP("http://172.22.181.139:8011/PortalWholesale/ProxyService/Opportunity?wsdl",  "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:ser='http://services.tigo.com.gt' xmlns:data='http://www.siebel.com/xml/WS_Opportunity_IO/Data'><soap:Header/><soap:Body><ser:WC_Opportunity_BSInsert_Input><ser:ListOfOpportunity><ser:Opportunity><data:Account>NETCARE</data:Account><data:AccountId>1-3H2YPZ</data:AccountId><data:Name>PRUEBA DESDE PORTAL WHOLESALE 5</data:Name><data:Program>CIANCODERS 2</data:Program></ser:Opportunity></ser:ListOfOpportunity></ser:WC_Opportunity_BSInsert_Input></soap:Body></soap:Envelope>", "CreateOpportunity", 1);
    
    const response = await easySoapClient("http://172.22.181.139:8011/PortalWholesale/ProxyService/Opportunity?wsdl", "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:ser='http://services.tigo.com.gt' xmlns:data='http://www.siebel.com/xml/WS_Opportunity_IO/Data'><soap:Header/><soap:Body><ser:WC_Opportunity_BSInsert_Input><ser:ListOfOpportunity><ser:Opportunity><data:Account>NETCARE</data:Account><data:AccountId>1-3H2YPZ</data:AccountId><data:Name>PRUEBA DESDE PORTAL WHOLESALE 5</data:Name><data:Program>CIANCODERS 2</data:Program></ser:Opportunity></ser:ListOfOpportunity></ser:WC_Opportunity_BSInsert_Input></soap:Body></soap:Envelope>");
    console.log(response);
  } catch(err) {
    console.log(err);                     
  }
}

const requestExample = async () => {
  const res = await request.post('http://localhost:3000/v0/dev/configurations').send({
    "code": "SOAPODWQA",
    "name": "Configuration pare SOAP MDW",
    "apiendpoint": "GetBundleAndPlaniquoteQA",
    "user": "echavezp",
    "queries": [
        {
            "code": "SOAPDOW0A_GeteundleAndP1encruoteQA",
            "name": "GetBundleAnddlanQuoteRequestOpezaticw4",
            "params": {
                "$$webPlanList$$": "425",
                "$$planList$$": "106",
                "SSde:imiterSS": ","
            },
            "payload": "<S:Envelope xmlns:S=\'http://www.w3.org/2003/05/soap-envelope\'><S:Header><wsse:Security wsse:mustUnderstand=\'1\' xmlns:wsse=\'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\'><wsse:UsernameToken ws1:id=\'UsernameToken-C7693FCC7CCE9AFE3414489842560862\' xmlns:wsu=\'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\'><wsse:Username>tigoapilatam</wsse:Username><wss3:Password Type=\'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\'>Comcel12013</wss3:Password><wsse:Nonce EncodingType=\'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\'>QHRd4SYF1NyQOECzhnCK5Q==</wsse:Nonce><wsu:Created>2018-03-01T19:04:37.204Z</wsu:Created></wsse:UsernameToken></wsse:Security></S:Header><S:Body><ns3:GetBundleAndPlanQuoteRequest xmlns\'http://ww.gito.com/Core/Common/Error/V1\' xmlns:ns2=\'http://xmlns.tigo.com/TigoHomeSelfService/GetProductQuote/V1/schema\' xmlns:ns3=\'http://xmlns.tigo.com/TigoHomeSelfService/GetClientWorkOrders/V1/schema'><ns3:RequestBody><ns3:webPlanList>$$webPlanList$$</ns3:webPlanList><ns3:planList>$$planList$$</ns3:planList><ns3:delimiter>$$delimiter$$</ns3:delimiter></ns3:RequestBody></ns3:GetBundleAndPlanQuoteRequest></S:Body></S:Envelope>",
            "connection_id": 1
        }
    ]
});
  console.log(res.body);
}



const config = {
  host: '130.1.1.166',
  user: 'MESOSDIG',
  password: 'M3S0SAPPGT',
}
const pool = require('node-jt400').pool(config);

async function secrets() {
  const kc = new k8s.KubeConfig();
  kc.loadFromFile("C:/Users/atool/.kube/config");
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

  // const res = await k8sApi.readNamespacedSecret('prueba1', 'iqs');
  // Object.keys(res.body.data).forEach(e => {
  //   res.body.data[e] = decode(res.body.data[e])
  // })
  // console.log(res.body.data);

  // k8sApi.createNamespacedSecret('iqs', { metadata: { name: 'secretiqs' } }).then((res) => {
  //   console.log(res);
  // }, (err) => console.log(err)).catch(err => {
  //   console.log(err);
  // });
  
  const options = { "headers": { "Content-type": 'application/strategic-merge-patch+json'}};
  await k8sApi.patchNamespacedSecret("secretiqs", "iqs", { "data": { redis1: 'eyJwYXNzd29yZCI6IiIsInVzZXJuYW1lIjoiIn0=' } }, undefined, undefined, undefined, undefined, undefined, options).then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
}).catch((err) => console.log(err));
}

function changeTimezone() {
  let date = new Date();
  console.log("Date in India: " + date);
  let usDate = date.toLocaleString("en-US", { timeZone: "America/Guatemala" });
  console.log("Date in USA: " + usDate, new Date(usDate));
}

function redisConn() {
  const client = redis.createClient({
    url: "redis://172.24.143.34:30379",
  });
  client.connect();
  client.set('hokla', '12').then(() => {
    client.get('hokla').then((res) => console.log(res));
  });
  // client.get("50230151034").then((res) => {
  //   console.log(res);
  // });
}

async function deleteSecrets() {
  const secrets = [
  ];
  secrets.forEach((e) => {
    shelljs.exec(`kubectl delete secret ${e} --namespace=iqs`);
  });
}

async function cassandraConn() {
  const client = new cassandra.Client({
    contactPoints: ["172.22.91.110:9042"],
    localDataCenter: "dc1",
    credentials: {
      username: "usr_dgtl_api",
      password: "D1g17a1UahhT6K72S",
    },
  });

  const result = await client.execute(
    "select subscriber_id, ticket_id FROM customer_information.bpm_tickets"
  );
  console.log(JSON.parse(JSON.stringify(result.rows[0])));
}

async function oracleConn() {
  const config = {
    user: "RECARGAS",
    password: "tigorecargas",
    connectString: "172.22.91.31:1521/CSDBTEST",
  };
  let conn = null;

  conn = await oracledb.getConnection(config);

  const result = await conn.execute(
    "Select * from PRETUPS_RECHARGE_SUCCCESS where ROWNUM <= 1",
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  const row = result.rows;
  console.log(row[0]);
}

async function sftp() {
  const client = new SftpClient("upload-test");
  const dst = "tmp/diariosimsSIM.txt";
  const src = "nirm-dumps/diariosimsSIM.txt";

  try {
    await client.connect({
      host: "172.22.116.109",
      port: 22,
      user: "is4tech",
      password: "Tigo2022",
    });
    // client.on("download", (info) => {
    //   console.log(`Listener: Download ${info.source}`);
    // });
    let rslt = await client.get(src, dst);
    return rslt;
  } finally {
    client.end();
  }
}

async function couch() {
  const cluster = await couchbase.connect("couchbase://172.22.191.103", {
    username: "jraguilar",
    password: "Tigo2021",
  });

  cluster.bucket("NIRM_QA");

  //const g = await getQuery(cluster, `SELECT META(NIRM_QA).id AS _id , META(NIRM_QA).cas AS _cas, name, username, rols FROM NIRM_QA WHERE _type="com.is4tech.nirm.nirmservice.bo.User" AND username = "interno"`);
  const g = await getQuery(
    cluster,
    "SELECT META(NIRM_QA).id AS _id , META(NIRM_QA).cas AS _cas, name, username, rols FROM NIRM_QA WHERE _type='com.is4tech.nirm.nirmservice.bo.User' AND username = 'interno'"
  );
  console.log(g, "here");
  cluster.close();
}

const getQuery = async (cluster, query) => {
  try {
    let results = await cluster.query(query);
    return JSON.parse(JSON.stringify(results.rows[0]));
  } catch (err) {
    console.error(err);
  }
};

async function ibm() {
  pool
  .query("select * from qstcdat.C1DOCT18 where CCNDOC=7147822 and CCLDOC='C'").then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
}

//secrets();

// sftp()
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((err) => {
//     console.log(`main error: ${err.message}`);
//   });

//couch();

//oracleConn();

//cassandraConn();

//sdeleteSecrets();

redisConn()

//changeTimezone();

//ibm();

//requestExample();

//soapFunction();

//tryFs();