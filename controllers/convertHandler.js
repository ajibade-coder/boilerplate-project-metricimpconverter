function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    //if only unit is giving///
    switch (input.toLowerCase()) {
    case "gal":
    case "l":
    case "mi":
    case "km":
    case "lbs":
    case "kg":
      result = 1
      break;
    default:
      try {
       let digit = input.match(/[^a-zA-Z]+/)[0]//sperating the unit
       let reg = /^[0-9]+(?:\.[0-9]+)?(?:\/[0-9]+(?:\.[0-9]+)?)?$/ // checking if the input num is correct
  
  if (!reg.test(digit)) {
    result = false; // if test of characers not [0 -9] or "/" returm false
  } else {
    let index_num = digit.split('/') // split search result for further calculations
    result = index_num.length == 1 ? Number(index_num[0]) : // if not an improper fraction return the string with Number method
    index_num.length == 2 ? Number(index_num[0]) / Number(index_num[1]) : // if an improper fraction, divide it to a number 
    false; // if it an mixed fraction or a range of fractional num, return false;
  } 
  } catch {
    result = false
  }
  }//////////////////////////
    return result;
  };


  
  this.getUnit = function(input) {
    /////////////////////
    let result;
    let regex;
   // Regular expression to match the desired pattern
   regex = /(^|\d+)(mi|km|lbs|kg|gal|l)$/i;
  if (regex.test(input)) { // if desired pattern found
    regex = /(mi|km|lbs|kg|gal|l)$/i;// regex to extract it from the input
    let unitsysmbol = input.match(regex)[0].toLowerCase(); // storing it in a variable
    //console.log(unitsysmbol)
    switch(unitsysmbol) { //using switch statment to clean the unit symbol to upper or lowercase
    case "gal":
    case "mi":
    case "km":
    case "lbs":
    case "kg":
      result = unitsysmbol
      break
    default:
      result = unitsysmbol.toUpperCase()
    }
  } else { // if sysmbol is wrong, let result equall false
      result = false;
  }
  return result; // return result
    ////////////////////////
  };


  
  this.getReturnUnit = function(initUnit) {
    let result;
    let unit_lower = initUnit.toLowerCase()
    result = unit_lower == "l" ? "gal" :
      unit_lower == "gal" ? "L":
      unit_lower == "mi" ? "km":
      unit_lower == "km" ? "mi":
      unit_lower == "lbs" ? "kg":
      unit_lower == "kg" ? "lbs":
      false
    return result;
  };


  this.spellOutUnit = function(unit) {
    let result;
    let unit_lower = unit.toLowerCase()

    result =  unit_lower == "l" ? "liters" :
      unit_lower == "gal" ? "gallons":
      unit_lower == "mi" ? "miles":
      unit_lower == "km" ? "kilometers":
      unit_lower == "lbs" ? "pounds":
      unit_lower == "kg" ? "kilograms":
      false
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result 
    let unit_lower = initUnit.toLowerCase()
    result = unit_lower == "l" ? initNum / galToL :
      unit_lower == "gal" ? galToL * initNum :
      unit_lower == "mi" ? miToKm * initNum :
      unit_lower == "km" ? initNum / miToKm :
      unit_lower == "lbs" ? lbsToKg * initNum :
      unit_lower == "kg" ? initNum / lbsToKg :
      false
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    
    return result;
  };
  
}

module.exports = ConvertHandler;
