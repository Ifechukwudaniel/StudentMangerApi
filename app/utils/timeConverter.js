 const  convertTime12to24 = (time12h) => {
  const [fullMatch, time, modifier] = time12h.match(/(\d?\d:\d\d)\s*(\w{2})/i);

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = 0;
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }

  return parseInt(hours)
}


module.exports = {
  convertTime12to24
}