const axios = require('axios')
const xml2Json = require('xml2json')
const fs = require('fs')


findCourses = async (i) => {
   const data = await axios.get(`https://www.biuportal.net/Services/CbtClientRequests.aspx?OPERATION=LOADMCQQUESTIONS&CODE=83ea7147-07af-11ea-af0c-00155d65d005&COURSESN=${i}`,  {
     timeout: 30000
   })
   .then(({data})=>{
         
      //       var d =  xml2Json.toJson(data)
      //       let x = {NewDataSet:{Table1:{RESPONSE:"Inactive Examination"}}}
      
      //       // console.log(data)
            
      //        if(JSON.parse(d).NewDataSet.Table1.RESPONSE=== x.NewDataSet.Table1.RESPONSE){
      //            console.log('f')
      //        }
      //        else{
      //          fs.appendFile(`code.txt`,`${i} \n`, ()=>{
                  
      //           })  
      //        }
      
      //     })
      //     .catch(err=>{
      //         console.log(err.message)
      //        console.log(i,'1')
      //     })
  }


//   async function findCourse (i){
//    await axios.get(`https://www.biuportal.net/Services/CbtClientRequests.aspx?OPERATION=LOADMCQQUESTIONS&CODE=83ea7147-07af-11ea-af0c-00155d65d005&COURSESN=${i}`)
//    .then(({data})=>{
         
//       var d =  xml2Json.toJson(data)
//       let x = {NewDataSet:{Table1:{RESPONSE:"Inactive Examination"}}}

//       // console.log(data)
      
//        if(JSON.parse(d).NewDataSet.Table1.RESPONSE=== x.NewDataSet.Table1.RESPONSE){
//            console.log('f')
//        }
//        else{
//          fs.appendFile(`code.txt`,`${i} \n`, ()=>{
            
//           })  
//        }

//     })
//     .catch(err=>{
//         console.log(err.message)
//        console.log(i,'1')
//     })
//     setTimeout(()=>{

//     }, 1000)
//  }
 

// for (let index = 0; index < 7000; index++) {
//     findCourse(index)
//     .catch(err=>{
//        console.log(err)
//     })
// }


// const array = [{ id: 'asdf'}, { id: 'foo' }, { id: 'bar' }]; 
// let users = [];
// let promises = [];
// for (i = 0; i < 7000; i++) {
//   promises.push(
//    axios.get(`https://www.biuportal.net/Services/CbtClientRequests.aspx?OPERATION=COURSEDETAILS&COURSESN=${i}`) 
//     .then(response => {
//       users.push(response);
//     })
//     .catch(err=>{
//        console.log('err',i)
//     })
//   )
// }

// Promise.all(promises).then(() => console.log(users));