// var gcm = require('node-gcm');

const moment = require("moment");

 
// // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
// var sender = new gcm.Sender('AAAA-VyZqgQ:APA91bGkDFBFfnDcTONG59-wVOHECImMnhE0aiqeGACUPqDAdOm9jLifadQcethlX_6_hEAFiytvVHKxaAaONlJHoHTvLt_22M8PZbT_SV1HEeKcT0SPKlzmSvCJDyrxa123Ymrl5vhN');
 
// // Specify which registration IDs to deliver the message to
// var tesr = 'cQmWVE6dQpONKasow8kvOn:APA91bFfSi3h6Q2SZwJZab9eDz83koW9G26twiEYLBCErNtHCm9v8c_cG00aX7zp4M2scTzkyZLAIAa_OIgFrucVGpNfRA_DIRBUFimzdcmR6bTsFUnpkjum6vGwnYzTMk1jwU1WBKTj'
// var message = new gcm.Message({
//     notification: {
//         color:'red',
//         click_action:"https://www.w3schools.com/",
//         sound:true,
//         title: "testing",
//         body: "This is a notification that will be displayed if your app is in the background.",
//         userInteraction:true
//     }
// });
 

 
// var registrationTokens = [];
// registrationTokens.push(tesr);
 
// // ... or retrying
// sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
//   if(err) console.error(err);
//   else    console.log(response);
// });
 


// const createLevelFromNumber =(x)=>{
//    let start= 100  
//    let array = []
//    for (let index = 1; index <=x; index++) {
//      array.push(index*start)
//    }

//    return array
// }


// console.log(createLevelFromNumber(4))

let data = moment.weekdays()
let xb = data.map((x)=>{
   return moment().day(x)
})

console.log(xb)