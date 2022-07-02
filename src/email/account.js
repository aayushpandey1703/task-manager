const mailjet = require('node-mailjet').connect("707fdd3a46bbfe99c421a7d2703dc1fc", "17fa75ac5374db61de78c81a62eb7be7")

const sendWelcomeEmail=(email,name)=>{
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
            "Email": email,
            "Name": name
          }
        ],
        "Subject": "Greetings from Task-Manager.",
        "TextPart": "Task-manager",
        "HTMLPart": "Dear "+name+" <br>Welcome to Task-manager",
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })

}

const sendDeleteEmail=(email,name)=>{
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
            "Email": email,
            "Name": name
          }
        ],
        "Subject": "Greetings from Task-manager.",
        "TextPart": "How can we improve?",
        "HTMLPart": "<h3>Dear <b>"+name+"<br>You just deleted you task-manager account. Can you give us few minutes on we can improve? <br>Thank you",
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
}

module.exports={
  sendWelcomeEmail:sendWelcomeEmail,
  sendDeleteEmail:sendDeleteEmail
}
