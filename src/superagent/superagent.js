const request = require("superagent");

const requestExample = async () => {
  const res = await request
    .post("http://localhost:3000/v0/dev/configurations")
    .send({
      code: "SOAPODWQA",
      name: "Configuration pare SOAP MDW",
      apiendpoint: "GetBundleAndPlaniquoteQA",
      user: "echavezp",
      queries: [
        {
          code: "SOAPDOW0A_GeteundleAndP1encruoteQA",
          name: "GetBundleAnddlanQuoteRequestOpezaticw4",
          params: {
            $$webPlanList$$: "425",
            $$planList$$: "106",
            "SSde:imiterSS": ",",
          },
          payload:
            "<S:Envelope xmlns:S='http://www.w3.org/2003/05/soap-envelope'><S:Header><wsse:Security wsse:mustUnderstand='1' xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'><wsse:UsernameToken ws1:id='UsernameToken-C7693FCC7CCE9AFE3414489842560862' xmlns:wsu='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd'><wsse:Username>tigoapilatam</wsse:Username><wss3:Password Type='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>Comcel12013</wss3:Password><wsse:Nonce EncodingType='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary'>QHRd4SYF1NyQOECzhnCK5Q==</wsse:Nonce><wsu:Created>2018-03-01T19:04:37.204Z</wsu:Created></wsse:UsernameToken></wsse:Security></S:Header><S:Body><ns3:GetBundleAndPlanQuoteRequest xmlns'http://ww.gito.com/Core/Common/Error/V1' xmlns:ns2='http://xmlns.tigo.com/TigoHomeSelfService/GetProductQuote/V1/schema' xmlns:ns3='http://xmlns.tigo.com/TigoHomeSelfService/GetClientWorkOrders/V1/schema'><ns3:RequestBody><ns3:webPlanList>$$webPlanList$$</ns3:webPlanList><ns3:planList>$$planList$$</ns3:planList><ns3:delimiter>$$delimiter$$</ns3:delimiter></ns3:RequestBody></ns3:GetBundleAndPlanQuoteRequest></S:Body></S:Envelope>",
          connection_id: 1,
        },
      ],
    });
  console.log(res.body);
};

module.exports = { requestExample };
