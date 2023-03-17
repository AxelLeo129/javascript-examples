const couchbase = require("couchbase");

const couch = async () => {
  const cluster = new couchbase.Cluster("couchbase://172.22.191.103", {
    username: "jraguilar",
    password: "Tigo2021",
  });
  cluster.bucket("NIRM_QA");
  const result = await cluster.ping();
  //const result1 = await cluster.query("SELECT META(NIRM_QA).id AS _id , META(NIRM_QA).cas AS _cas, name, username, rols FROM NIRM_QA WHERE _type='com.is4tech.nirm.nirmservice.bo.User' AND username = 'interno'");
  const result1 = await cluster.query(
    "update NIRM_QA set `status`= 'LIFE_CYCLE_STATE.6001' WHERE `_type` = 'com.is4tech.tigo.nirm.service.domain.Numeration' and numberData = 19000000"
  );
  console.log(result1.meta, " -- --  ", result1.rows);
};

module.exports = { couch };
