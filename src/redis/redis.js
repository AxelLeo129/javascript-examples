const redis = require("redis");

const redisConn = async () => {
  const client = redis.createClient({
    url: "redis://172.24.143.34:30379",
  });
  client.connect();
  client.set("hokla", "12").then(() => {
    client.get("hokla").then((res) => console.log(res));
  });
  client.get("50230151034").then((res) => {
    console.log(res);
  });
};

module.exports = { redisConn };
