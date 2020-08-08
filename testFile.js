 let x = [
  {
      "_id": "5ea5ecedafbe007728d242d1",
      "course": {
          "courseCode": "Csc 125",
          "description": "An in to to bal ",
          "id": null
      },
      "startTime": "08.00 am",
      "endTime": "10.00 am",
      "location": "TEST hxdhhd"
  },
  {
      "_id": "5ea5ecedafbe007728d242d3",
      "course": {
          "courseCode": "Csc 125",
          "description": "An in to to bal ",
          "id": null
      },
      "startTime": "01.00 pm",
      "endTime": "03.00 pm",
      "location": "Biu chapelmmnns c cdc"
  },
  {
      "_id": "5ea5ecedafbe007728d242d2",
      "course": {
          "courseCode": "CSC 123",
          "description": "An in to to testing ",
          "id": null
      },
      "startTime": "10.00 am",
      "endTime": "12.00 pm",
      "location": "nnnd"
  }
]



x.sort((a,b)=>{
    if(a.startTime.slice(6,8)=='am' && b.startTime.slice(6,8)=='pm' ){
        console.log(a)
    }
})