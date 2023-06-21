const { encrypt } = require("./src/bcrypt/bcrypt");
const { cassandraConn } = require("./src/cassandra/cassandra");
const { couch } = require("./src/couchbase/couchbase");
const { soapFunction } = require("./src/easy-soap/easy-soap");
const { oracleConn } = require("./src/oracle/oracle");
const { redisConn } = require("./src/redis/redis");
const { sftp } = require("./src/sftp/sftp");
const { deleteSecrets } = require("./src/shell/shell");
const { requestExample } = require("./src/superagent/superagent");
const { changeTimezone } = require("./src/date/date");
const { xmlHttpRequestFunction } = require("./src/xml-http/xml-http");
const { soapAxios } = require("./src/axios/axios");

// sftp().then((msg) => {
//     console.log(msg);
// }).catch((err) => {
//   console.log(`main error: ${err.message}`);
// });

//couch();

//oracleConn();

//cassandraConn();

//deleteSecrets();

//redisConn()

//changeTimezone();

//requestExample();

//soapFunction();

//tryFs();

//encrypt("password9").then((res) => console.log(res))

//xmlHttpRequestFunction('http://172.22.115.94:8080/services/ArServices', '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ars="http://www.huawei.com/bme/cbsinterface/arservices" xmlns:cbs="http://www.huawei.com/bme/cbsinterface/cbscommon" xmlns:arc="http://cbs.huawei.com/ar/wsservice/arcommon"><soapenv:Header/><soapenv:Body>    <ars:QueryBalanceRequestMsg>        <RequestHeader>            <cbs:Version>1</cbs:Version>            <cbs:BusinessCode>1</cbs:BusinessCode>            <cbs:MessageSeq>20230130074249905</cbs:MessageSeq>            <cbs:OwnershipInfo>                <cbs:BEID>101</cbs:BEID>                <cbs:BRID>101</cbs:BRID>            </cbs:OwnershipInfo>            <cbs:AccessSecurity>                <cbs:LoginSystemCode>102</cbs:LoginSystemCode>                <cbs:Password>xyYSFeOUi5DagegPuCQmUQ==</cbs:Password>                <cbs:RemoteIP></cbs:RemoteIP>            </cbs:AccessSecurity>            <cbs:OperatorInfo>                <cbs:OperatorID>101</cbs:OperatorID>                <cbs:ChannelID>1</cbs:ChannelID>            </cbs:OperatorInfo>            <cbs:TimeFormat>                <cbs:TimeType>1</cbs:TimeType>                <cbs:TimeZoneID>101</cbs:TimeZoneID>            </cbs:TimeFormat>        </RequestHeader>        <QueryBalanceRequest>            <ars:QueryObj>                <ars:SubAccessCode>                    <arc:PrimaryIdentity>40100100</arc:PrimaryIdentity>                </ars:SubAccessCode>            </ars:QueryObj>        </QueryBalanceRequest>    </ars:QueryBalanceRequestMsg></soapenv:Body></soapenv:Envelope>', 'text/xml;charset=UTF-8');
//xmlHttpRequestFunction('http://172.22.181.110:8011/APIs/GetOrdenesByIdClient/PS/GetOrdenesByIdClient_PUB', '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:get="http://xmlns.oracle.com/pcbpel/adapter/db/GetOrdenesByIdCliente"><soapenv:Header/><soapenv:Body><get:GetOrdenesByIdClienteInput><get:ORDEN_CODIGO_CLIENTE>1-1ABBA-406</get:ORDEN_CODIGO_CLIENTE>(holding)</get:GetOrdenesByIdClienteInput></soapenv:Body></soapenv:Envelope>');

//soapAxios();