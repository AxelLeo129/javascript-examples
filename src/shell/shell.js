const shelljs = require("shelljs");

const deleteSecrets = async () => {
  const secrets = [];
  secrets.forEach((e) => {
    shelljs.exec(`kubectl delete secret ${e} --namespace=iqs`);
  });
};

module.exports = { deleteSecrets };
