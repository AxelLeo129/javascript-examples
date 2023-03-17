const oracledb = require("oracledb");

const oracleConn = async () => {
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
    {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    }
  );
  const row = result.rows;
  console.log(row[0]);
};

module.exports = { oracleConn };
