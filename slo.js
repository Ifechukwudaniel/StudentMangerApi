const axios = require('axios');
const  qs = require('qs');
var HTMLParser = require('node-html-parser');
var data = qs.stringify({
 '__VIEWSTATE': '/wEPDwUJNTMzNDU1NzA1D2QWAgIDDxYCHgxhdXRvY29tcGxldGUFA29mZmRkUqof2LAdE4XaTKVxV+vLr66d+Qk=',
'__VIEWSTATEGENERATOR': 'C2EE9ABB',
'__EVENTVALIDATION': '/wEdAARd9vtBLyjpHiBYSoOme+1hY3plgk0YBAefRz3MyBlTcHY2+Mc6SrnAqio3oCKbxYainihG6d/Xh3PZm3b5AoMQ9QuH9fLNL5w33RiP/YoinnH+MVI=',
'txtUserName': 'scn/csc/1803',
'txtPassword': 'password',
'btnLogin': 'Login' 
});
var config = {
  method: 'post',
  url: 'https://www.biuportal.net/LogIn.aspx',
  headers: { 
    'authority': 'www.biuportal.net', 
    'pragma': 'no-cache', 
    'cache-control': 'no-cache', 
    'upgrade-insecure-requests': '1', 
    'origin': 'https://www.biuportal.net', 
    'content-type': 'application/x-www-form-urlencoded', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36', 
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
    'sec-fetch-site': 'same-origin', 
    'sec-fetch-mode': 'navigate', 
    'sec-fetch-user': '?1', 
    'sec-fetch-dest': 'document', 
    'referer': 'https://www.biuportal.net/LogIn.aspx', 
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
    'cookie': 'ASP.NET_SessionId=zllvytfxj4tcdfgqot31ei0a'
  },
  data : data
};

axios(config)
.then(function (response) {
  const root = HTMLParser.parse(response.data);
  // console.log(root)
   console.log(root.querySelector("#lblErrorMessage").innerHTML)
  
})
.catch(function (error) {
  console.log(error);
});