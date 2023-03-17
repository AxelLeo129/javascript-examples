const SftpClient = require("ssh2-sftp-client");

const sftp = async () => {
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
    client.on("download", (info) => {
      console.log(`Listener: Download ${info.source}`);
    });
    let rslt = await client.get(src, dst);
    return rslt;
  } finally {
    client.end();
  }
};

module.exports = { sftp };
