var mongoose = require('mongoose');
const {missingParameterError}  = require("../utils/error")
const _ = require('lodash')
const DayActionModel = require('../TimeTable/dayActionModel')
const {convertTime12to24} = require('../utils/timeConverter')
const moment = require('moment')

const getThisWeekActivityByLevel=(req, res, next)=>{
  const {level} = req.params
   DayActionModel.find({level})
   .populate({path:"course", select:'courseCode'})

   .lean().exec()
   .then((data)=>{
     let mon=  _.filter(data, {weekDay:1})
     let tue=  _.filter(data, {weekDay:2})
     let wen=  _.filter(data, {weekDay:3})
     let thu=  _.filter(data, {weekDay:4})
     let fri=  _.filter(data, {weekDay:5})
     let x = mon.sort((a,b)=>{
          let aTime = convertTime12to24(a.startTime)
          let  bTime = convertTime12to24(b.startTime)
           if (aTime > bTime) return a
           if (bTime> aTime) return b;
      })
  
    console.log(x)
      return res.send([{ dayOfWeek:'monday',activities:mon}, {dayOfWeek:'tuesday',activities:tue}, {dayOfWeek:'wednesday',activity:wen}, {dayOfWeek:"thursday",activities:thu}, {dayOfWeek:'friday',activities:fri}])
   })
   .catch((err)=>{
    console.log(err)
   })
 }

 const getTodayActivityByLevel=(req, res, next)=>{
  const {level} = req.params
   DayActionModel.find({level})
   .populate({path:"course", select:'courseCode'})
   .lean().exec()
   .then((data)=>{
     let today=  _.filter(data, {weekDay:moment().day()+1})
      return res.send(today)
   })
   .catch(()=>{

   })
 }



module.exports = {
   getThisWeekActivityByLevel,
   getTodayActivityByLevel
};