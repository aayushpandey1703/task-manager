const mailjet = require('node-mailjet').connect("707fdd3a46bbfe99c421a7d2703dc1fc", "17fa75ac5374db61de78c81a62eb7be7")
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "aleronpeterson@gmail.com",
        "Name": "Aayush"
      },
      "To": [
        {
          "Email": "aleronpeterson@gmail.com",
          "Name": "Aayush"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
