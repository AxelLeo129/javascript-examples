const soapRequest = require("easy-soap-request");
const soap = require('soap');

const easySoapClient = async (url, xml) => {
  const sampleHeaders = {
    "user-agent": "sampleTest",
    "Content-Type": "text/xml;charset=UTF-8",
    soapAction: "",
  };
  const { response } = await soapRequest({
    url: url,
    headers: sampleHeaders,
    xml: xml,
    timeout: 5000,
  }); // Optional timeout parameter(milliseconds)
  const { headers, body, statusCode } = response;
  console.log(headers);
  json = await fixKeyNameOfJson(
    xmlDecoder(body, {
      mergeAttrs: true,
    })
  );
  console.log(json.Envelope.Body.WC_Opportunity_BSInsert_Input);
  console.log(statusCode);
};

const clientSOAP = async (url, xml, soapAction, typeWs) => {
  const options = {
    disableCache: true,
    xmlns: "http://schemas.xmlsoap.org/soap/envelope/",
    endpoint: url,
  };
  let message = "Check file name and the folder name";
  if (typeWs == 1) {
    message = "Check if the URL is a URL with SOAP service";
  }
  return new Promise((resolve, reject) => {
    try {
      soap.createClient(null, options, function (err, client) {
        if (err) {
          reject(`${err}`);
        }
        if (client) {
          console.log(client.describe());
          if (!Object.keys(client).includes(soapAction))
            reject(new Error(`This action: '${soapAction}' is undefined.`));
          const args = {
            _xml: xml,
          };
          client[soapAction](
            args,
            (error, response) => {
              if (error) reject(`${error}`);
              else resolve(response);
            },
            {
              postProcess: (_xml) => _xml.replace(_xml, args._xml),
            }
          );
        } else {
          reject(message);
        }
      });
    } catch (err1) {
      reject(`${err1}`);
    }
  });
};

const soapFunction = async () => {
  try {
    const response = await clientSOAP("http://172.22.115.94:8080/services/ArServices", '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ars="http://www.huawei.com/bme/cbsinterface/arservices" xmlns:cbs="http://www.huawei.com/bme/cbsinterface/cbscommon" xmlns:arc="http://cbs.huawei.com/ar/wsservice/arcommon"><soapenv:Header/><soapenv:Body><ars:QueryBalanceRequestMsg><RequestHeader><cbs:Version>1</cbs:Version><cbs:BusinessCode>1</cbs:BusinessCode><cbs:MessageSeq>20230130074249905</cbs:MessageSeq><cbs:OwnershipInfo><cbs:BEID>101</cbs:BEID><cbs:BRID>101</cbs:BRID></cbs:OwnershipInfo><cbs:AccessSecurity><cbs:LoginSystemCode>102</cbs:LoginSystemCode><cbs:Password>xyYSFeOUi5DagegPuCQmUQ==</cbs:Password><cbs:RemoteIP></cbs:RemoteIP></cbs:AccessSecurity><cbs:OperatorInfo><cbs:OperatorID>101</cbs:OperatorID><cbs:ChannelID>1</cbs:ChannelID></cbs:OperatorInfo><cbs:TimeFormat><cbs:TimeType>1</cbs:TimeType><cbs:TimeZoneID>101</cbs:TimeZoneID></cbs:TimeFormat></RequestHeader><QueryBalanceRequest><ars:QueryObj><ars:SubAccessCode><arc:PrimaryIdentity>40100100</arc:PrimaryIdentity></ars:SubAccessCode></ars:QueryObj></QueryBalanceRequest></ars:QueryBalanceRequestMsg></soapenv:Body></soapenv:Envelope>', "", 1);
    //const response = await easySoapClient("http://172.22.181.139:8011/PortalWholesale/ProxyService/Opportunity?wsdl", "<soap:Envelope xmlns:soap='http://www.w3.org/2003/05/soap-envelope' xmlns:ser='http://services.tigo.com.gt' xmlns:data='http://www.siebel.com/xml/WS_Opportunity_IO/Data'><soap:Header/><soap:Body><ser:WC_Opportunity_BSInsert_Input><ser:ListOfOpportunity><ser:Opportunity><data:Account>NETCARE</data:Account><data:AccountId>1-3H2YPZ</data:AccountId><data:Name>PRUEBA DESDE PORTAL WHOLESALE 5</data:Name><data:Program>CIANCODERS 2</data:Program></ser:Opportunity></ser:ListOfOpportunity></ser:WC_Opportunity_BSInsert_Input></soap:Body></soap:Envelope>");
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { soapFunction };
