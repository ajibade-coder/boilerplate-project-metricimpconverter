'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const bodyParser  = require('body-parser');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    //console.log(req.query.input)
    let num = convertHandler.getNum(req.query.input) // checking if num is valid, if valid return a num else return falsy
    let uniSymbol = convertHandler.getUnit(req.query.input) // checking if symbol is valid, if valid return sysmbol else return falsy
    let result;
      
      if (num && uniSymbol) {
        let return_Num = convertHandler.convert(num, uniSymbol)
        let return_Unit = convertHandler.getReturnUnit(uniSymbol)
        let string_info = convertHandler.getString(num, uniSymbol, return_Num, return_Unit)
        result = {"initNum":num,"initUnit":uniSymbol,"returnNum":return_Num,"returnUnit":return_Unit,"string":string_info}
        res.json(result)
      } else {
        result = !num && !uniSymbol ? "invalid number and unit" : 
                  !num ? "invalid number" :
                  "invalid unit"
        res.send(result);
      }
  })

};
