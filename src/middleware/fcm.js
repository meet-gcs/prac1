const FCM = require("fcm-node");
const serverKey = process.env.SERVER_KEY;
const fcm = new FCM(serverKey);

const sendMessage = (req, res) => {
  const message = {
    to: "fU8TtghFRWyu6mZBdSqjrf:APA91bHHKFjTXVyLyHF9FfEFgU7ialCcLVSGzHI8fb1kUyPQhG3VeHT7mdUSG1_2xVdst95KuqVCtpR9WbryKgS73Z072RJp-mHLVKtEJzsU6sfdONbGKcaApSiKVmihH3vSNLdN3AXL",
    notification: {
      title: " New login",
      body: '{"Message from node js app"}',
    },

    data: {
      title: "ok cdfsdsdfsd",
      body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = sendMessage;
