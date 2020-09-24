// var gcm = require('node-gcm');
 
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
 


let convertTime12to24 = (time12h) => {

  const [fullMatch, time, modifier] = '08:00 PM'.match(/(\d?\d:\d\d)\s*(\w{2})/i);

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM' || "pm") {
    hours = parseInt(hours, 10) + 12;
  }

  return hours;
}

convertTime12to24("08:00 PM")