
function createLevelFromNumber(x, department){
  let start= 100  
  let array = []
  for (let index = 1; index <=x; index++) {
    array.push({number:index*start, department})
  }

  return array
}

module.exports = {
  createLevelFromNumber
}