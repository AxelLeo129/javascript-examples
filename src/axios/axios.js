const axios = require('axios');

const soapAxios = () => {
    axios.post("http://172.22.115.94:8080/services/BcServices", `<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/' xmlns:bcs='http://www.huawei.com/bme/cbsinterface/bcservices' xmlns:cbs='http://www.huawei.com/bme/cbsinterface/cbscommon' xmlns:bcc='http://www.huawei.com/bme/cbsinterface/bccommon'> 
    <soapenv:Header/>
    <soapenv:Body>
        <bcs:QueryCustomerInfoRequestMsg>
            <RequestHeader>
                <cbs:Version>1</cbs:Version>
                <cbs:BusinessCode>1</cbs:BusinessCode>
                <cbs:MessageSeq>20230130074249905</cbs:MessageSeq>
                <cbs:OwnershipInfo>
                    <cbs:BEID>101</cbs:BEID>
                    <cbs:BRID>101</cbs:BRID>
                </cbs:OwnershipInfo>
                <cbs:AccessSecurity>
                    <cbs:LoginSystemCode>102</cbs:LoginSystemCode>
                    <cbs:Password>xyYSFeOUi5DagegPuCQmUQ==</cbs:Password>
                    <cbs:RemoteIP></cbs:RemoteIP>
                </cbs:AccessSecurity>
                <cbs:OperatorInfo>
                    <cbs:OperatorID>101</cbs:OperatorID>
                    <cbs:ChannelID>1</cbs:ChannelID>
                </cbs:OperatorInfo>
                <cbs:TimeFormat>
                    <cbs:TimeType>1</cbs:TimeType>
                    <cbs:TimeZoneID>1</cbs:TimeZoneID>
                </cbs:TimeFormat>
            </RequestHeader>
            <QueryCustomerInfoRequest>
                <bcs:QueryObj>
                    <bcs:SubAccessCode>
                        <bcc:PrimaryIdentity>38232479</bcc:PrimaryIdentity>
                    </bcs:SubAccessCode>
                </bcs:QueryObj>
            </QueryCustomerInfoRequest>
        </bcs:QueryCustomerInfoRequestMsg>
    </soapenv:Body>
  </soapenv:Envelope>`, {
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
    },
  }).then((res) => {
    console.log(res)
  }).catch((err) => console.log(err));
  } 

  module.exports = { soapAxios }