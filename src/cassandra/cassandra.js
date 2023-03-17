const cassandra = require("cassandra-driver");

const cassandraConn = async () => {
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
};

module.exports = { cassandraConn };
