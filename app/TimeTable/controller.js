const TimeTable= require("./model")
const Course = require('../Courses/model')
const Level = require('../Levels/model')
const Day = require('./dayModel')
const DayAction = require('./dayActionModel')
const {missingParameterError}  = require("../utils/error")
const _  = require('lodash')
// const moment = require('moment')
 
const addTimeTableByLevel= (req, res )=>{
  const {level, days} = req.body 
  if(!level) return res.status(500).send(missingParameterError('Level'))
  if(!days) return res.status(500).send(missingParameterError('Days'))

  Level.findById(level)
  .populate({path:'department', select:"name"})
  .then((async level=>{  
      if(level.timeTable)  return res.status(500).send({error:` ${level.department.name} ${level.number} already has a timetable`})
      await  TimeTable.create({
         level:level._id
       }).then( async timeTable=>{
         await Level.findByIdAndUpdate(level.id,{timeTable:timeTable._id})
         .then(()=>{
              days.map(async (day)=>{
                await  Day.create({
                  weekDay:day.weakDay,
                  timeTable:timeTable._id
                }).then( async currentDay=>{
                    await  TimeTable.findByIdAndUpdate(timeTable._id, { $push:{days:currentDay._id} })
                    .then(
                      
                      async ()=>{
                       await day.courses.map( async (course) =>{
                          await  DayAction.create({...course})
                        .then( async dayAction=>{
                            await Day.findByIdAndUpdate(currentDay._id, {
                                $push:{dayActions:dayAction._id}
                            })
                        })
                        .catch(err=>{
                          console.log(err)
                          res.status(500).send({error:"please an error occurred"})
                        })
                       })
                    }
                    
                    )
                    .catch(err=>{
                      console.log(err)
                      res.status(500).send({error:"please an error occurred"})
                    })
                })
                .catch(err=>{
                  console.log(err)
                   res.status(500).send({error:"please an error occurred"})
                })
              })
         })
         .catch(err=>{
          console.log(err)
          res.status(500).send({error:"please an error occurred"})
         })
       })
       .catch( async err=>{
         console.log(err)
          await   res.status(500).send({error:`please ${level} was not found`})
       })
      await res.send({message:"Successfully create timetable"})
  }))
}

const getTimeTableByLevel=(req, res)=>{
  const {level} = req.params
  if(!level) return res.status(500).select(missingParameterError('level'))
  Level.findById(level)
  .then(foundLevel=>{
      TimeTable.findById(foundLevel.timeTable)
      .populate({path:'days',
                populate:{
                  path:'dayActions',
                  model:'DayAction',
                  select:'startTime endTime course location',
                    populate:{
                        path:"course",
                        model:"Courses",
                        select:'courseCode description  -_id',
                    }
                },})
                .lean()
                .exec()
      .then(timeTable=>{
        if(timeTable)
          return res.send(_.sortBy(timeTable.days,['weekDay']))
        return res.status(500).send({error:' this department does not have a time table'})
      })
  })
}

module.exports = {
    addTimeTableByLevel,
    getTimeTableByLevel,
};