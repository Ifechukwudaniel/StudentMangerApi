const axios = require('axios');
const  qs = require('qs');
const firebase = require('./firebase')
var HTMLParser = require('node-html-parser');
const uuid = require('uuid')
const filePath = `image/users/${uuid.v4()}.jpg`


const signUser=(matricNumber, password)=>{
  return new Promise((resolve, reject)=>{
var data = qs.stringify({
 '__VIEWSTATE': '/wEPDwUJNTMzNDU1NzA1D2QWAgIDDxYCHgxhdXRvY29tcGxldGUFA29mZmRkUqof2LAdE4XaTKVxV+vLr66d+Qk=',
'__VIEWSTATEGENERATOR': 'C2EE9ABB',
'__EVENTVALIDATION': '/wEdAARd9vtBLyjpHiBYSoOme+1hY3plgk0YBAefRz3MyBlTcHY2+Mc6SrnAqio3oCKbxYainihG6d/Xh3PZm3b5AoMQ9QuH9fLNL5w33RiP/YoinnH+MVI=',
'txtUserName': matricNumber,
'txtPassword': password,
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

let userImg= ''

axios(config)
.then(function (response) {
  const root = HTMLParser.parse(response.data);
  if(root.querySelector("#lblErrorMessage")){
    reject({  Response:"FAILED",Message:root.querySelector("#lblErrorMessage").innerHTML})
 }
  else{
      userImg =root.querySelector("#imgPassport").getAttribute('src')
      var config = {
        method: 'get',
        url: 'https://www.biuportal.net/Students/Results/Results.aspx',
        headers: { 
          'authority': 'www.biuportal.net', 
          'pragma': 'no-cache', 
          'cache-control': 'no-cache', 
          'upgrade-insecure-requests': '1', 
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36', 
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
          'sec-fetch-site': 'same-origin', 
          'sec-fetch-mode': 'navigate', 
          'sec-fetch-user': '?1', 
          'sec-fetch-dest': 'document', 
          'referer': 'https://www.biuportal.net/LogIn.aspx', 
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
          'cookie': 'ASP.NET_SessionId=zllvytfxj4tcdfgqot31ei0a; ASP.NET_SessionId=giswpev3skkc0fqibabrr0vo'
        }
      };
      
      axios(config)
      .then(function (response) {
        const newData = HTMLParser.parse(response.data);
        const fullName = newData.querySelector("#HeaderContent_lblFullName").innerHTML
        const department = newData.querySelector("#HeaderContent_lblDepartment").innerHTML
        const level =parseInt(newData.querySelector("#HeaderContent_lblLevel").innerHTML)
         resolve({ Response:"SUCCESS",image:userImg,fullName, department,level})
      })
      .catch(function (error) {
        reject({Response:"FAILED",Message:"Please an error occurred"})
      });
  }
})
.catch(function (error) {
  reject({Response:"FAILED",Message:"Please an error occurred"})
});
})
}

signUser()
.then(data=>{
  console.log(data)
})
.catch(err=>{
  console.log(err)
})