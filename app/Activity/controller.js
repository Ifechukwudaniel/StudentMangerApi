var mongoose = require('mongoose');
const {missingParameterError}  = require("../utils/error")
const _ = require('lodash')
const DayActionModel = require('../TimeTable/dayActionModel')
const {convertTime12to24, convertTimeHourMinute} = require('../utils/timeConverter')
const Level = require('../Levels/model');
const { getWeekDates } = require('../utils/date');
const uuid = require('uuid').v4()
const moment = require('moment')
const getThisWeekActivityByLevel=(req, res, next)=>{
  const {level} = req.params
   Level.findById(level)
   .then(level=>{
       if(!level.timeTable){
         return res.status(500).send({error:'Could not find a time table for this level'})
       }
   DayActionModel.find({level})
   .populate({path:"course", select:'courseCode'})
   .lean().exec()
   .then((data)=>{
     let mon=  _.filter(data, {weekDay:1})
     let tue=  _.filter(data, {weekDay:2})
     let wen=  _.filter(data, {weekDay:3})
     let thu=  _.filter(data, {weekDay:4})
     let fri=  _.filter(data, {weekDay:5})
      mon.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
      tue.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
      wen.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
      thu.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
      fri.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))

      return res.send([{ dayOfWeek:'monday',activities:mon}, {dayOfWeek:'tuesday',activities:tue}, {dayOfWeek:'wednesday',activities:wen}, {dayOfWeek:"thursday",activities:thu}, {dayOfWeek:'friday',activities:fri}])
   })
   .catch((err)=>{
     return res.status(500).send({error:'Please an error occurred'})
   })
   })
   .catch((err)=>{
    return res.status(500).send({error:'Could not find level with this id'})
   })
 }


 const getTimeTableWeb=(req, res, next)=>{
  const {level} = req.params
  Level.findById(level)
  .then(level=>{
      if(!level.timeTable){
        return res.status(500).send({error:'Could not find a time table for this level'})
      }
       
       DayActionModel.find({level})
       .populate({path:"course", select:'courseCode'})
       .lean().exec()
       .then((data)=>{
        console.log(data)
        let dateDate = []
        let mon=  _.filter(data, {weekDay:1}) ,tue=  _.filter(data, {weekDay:2}) ,wen=  _.filter(data, {weekDay:3}), thu=  _.filter(data, {weekDay:4}),fri=  _.filter(data, {weekDay:5})
        mon.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
        tue.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
        wen.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
        thu.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
        fri.sort((a,b)=>(convertTime12to24(a.startTime) - convertTime12to24(b.startTime)))
        let dates = getWeekDates()
        console.log(dates)
        mon.map(data=>{
          dateDate.push({ id:data._id, 
               repeat:true, IsAllDay: false,
               Subject:data.course.courseCode, 
               Location:data.location,
               RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;',
               StartTime:new Date(dates[0].year,dates[0].month, dates[0].day,convertTimeHourMinute(data.startTime).hour,convertTimeHourMinute(data.startTime).minute),
               EndTime:new Date(dates[0].year,dates[0].month, dates[0].day,convertTimeHourMinute(data.endTime).hour,convertTimeHourMinute(data.endTime).minute)
            })
        })
        thu.map(data=>{
          dateDate.push({ id:data._id, 
            repeat:true, IsAllDay: false,
            Subject:data.course.courseCode, 
            Location:data.location,
            RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;',
            StartTime:new Date(dates[1].year,dates[1].month, dates[1].day,convertTimeHourMinute(data.startTime).hour,convertTimeHourMinute(data.startTime).minute),
            EndTime:new Date(dates[1].year,dates[1].month, dates[1].day,convertTimeHourMinute(data.endTime).hour,convertTimeHourMinute(data.endTime).minute)
         })
       })
       wen.map(data=>{
        dateDate.push({ id:data._id, 
          repeat:true, IsAllDay: false,
          Subject:data.course.courseCode, 
          Location:data.location,
          RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;',
          StartTime:new Date(dates[2].year,dates[2].month, dates[2].day,convertTimeHourMinute(data.startTime).hour,convertTimeHourMinute(data.startTime).minute),
          EndTime:new Date(dates[2].year,dates[2].month, dates[2].day,convertTimeHourMinute(data.endTime).hour,convertTimeHourMinute(data.endTime).minute)
       })
      })
      thu.map(data=>{
        dateDate.push({ id:data._id, 
          repeat:true, IsAllDay: false,
          Subject:data.course.courseCode, 
          Location:data.location,
          RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;',
          StartTime:new Date(dates[3].year,dates[3].month, dates[3].day,convertTimeHourMinute(data.startTime).hour,convertTimeHourMinute(data.startTime).minute),
          EndTime:new Date(dates[3].year,dates[3].month, dates[3].day,convertTimeHourMinute(data.endTime).hour,convertTimeHourMinute(data.endTime).minute)
        })
      })
       fri.map(data=>{
        dateDate.push({ id:data._id, 
          repeat:true, IsAllDay: false,
          Subject:data.course.courseCode, 
          Location:data.location,
          RecurrenceRule: 'FREQ=WEEKLY;INTERVAL=1;',
          StartTime:new Date(dates[4].year,dates[4].month, dates[4].day,convertTimeHourMinute(data.startTime).hour,convertTimeHourMinute(data.startTime).minute),
          EndTime:new Date(dates[4].year,dates[4].month, dates[4].day,convertTimeHourMinute(data.endTime).hour,convertTimeHourMinute(data.endTime).minute)
       })
     })
        return res.send(dateDate)
  })
  .catch((err)=>{
    return res.status(500).send({error:'Please an error occurred'})
  })
  })
  .catch((err)=>{
   return res.status(500).send({error:'Could not find level with this id'})
  })
 }

 const getTodayActivityByLevel=(req, res, next)=>{
  const {level} = req.params
  Level.findById(level)
  .then(level=>{
      if(!level.timeTable){
        return res.status(500).send({error:'Could not find a time table for this level'})
      }
      DayActionModel.find({level})
       .populate({path:"course", select:'courseCode'})
       .lean().exec()
       .then((data)=>{
         let today=  _.filter(data, {weekDay:moment().day()})
    
         today.sort((a,b)=>{
          return convertTime12to24(a.startTime) - convertTime12to24(b.startTime)
        })
      return res.send(today)
      })
     .catch((err)=>{
      console.log(err)
     })
  })
  .catch((err)=>{
   return res.status(500).send({error:'Could not find level with this id'})
  })
  
 }



module.exports = {
   getThisWeekActivityByLevel,
   getTodayActivityByLevel,
   getTimeTableWeb
};