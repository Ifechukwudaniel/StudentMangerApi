const moment = require("moment")

const getWeekDates= ()=>{
  let data = moment.weekdays()
   let realDate = data.filter((x)=>{
      if (x=="Sunday"|| x=="Saturday") {
        return false
      }
      return true
   })

  let xb = realDate.map((x)=>{
     return {year: moment().day(x).year(), month:moment().day(x).month(),day: moment().day(x).date()}
  })
  
  return xb
}

module.exports= {
  getWeekDates
}