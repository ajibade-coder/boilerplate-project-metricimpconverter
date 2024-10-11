const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite("Function convertHandler.getNum(input)", function() {

    test("Whole number input", function(done) { // test 1
      let input = "30L";
      assert.equal(convertHandler.getNum(input), 30);
      done();
    });

    test("decimal number input", function(done) { // test 2
        let input = "5.5km"
        assert.equal(convertHandler.getNum(input), 5.5);
        done();
    })

    test("fractional input", function(done) { // test 3
        let input = "5/2mi"
        assert.equal(convertHandler.getNum(input), 2.5)
        done();
    })

    test("fractional input with a decimal", function(done) { // test 4
        let input = "5.4/3L"
        assert.equal(convertHandler.getNum(input), 1.8)
        done();
    })

    test("error on a double-fraction", function(done) { // test 5
        let input = "3/2/3Km"
        assert.equal(convertHandler.getNum(input), false)
        done()
    })

    test("numerical input of 1 when no numerical input is provided", function(done) { // test 6
        let input ="kg"
        assert.equal(convertHandler.getNum(input), 1)
        done();
    })

     test("For Each Valid Unit Inputs", function(done) { // test  7
      var input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG"
      ];
      input.forEach(function(a) {
        let correct_sysmbol = a.toLowerCase() == "l" ? a.toUpperCase() : a.toLowerCase()
        //console.log(a, correct_sysmbol)
        assert.equal(convertHandler.getUnit(32 + a), correct_sysmbol);
      });
      done();
    });

    test("an error for an invalid input unit", function(done) { ///// ///////////////////////////test 8
        let input = "45kgg"
        assert.equal(convertHandler.getUnit(input), false)
        done();
    })

     //////////////////////////////////////////////// test 9
    test("For Each Valid Unit Inputs", function(done) {
      let input = ["gal", "L", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });


    test("spelled-out string unit for each valid input", function(done) { ///////////////////////////// test 10
        let input = ["gal", "l", "mi", "km", "lbs", "kg"];
        let expected = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]

        input.forEach((ele, i) => assert.equal(convertHandler.spellOutUnit(ele), expected[i]));
        done();
    })
///////////////////////////////////////////////////////////////test 11 - 16
////////////////////////////////////
 suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function(done) {
      var input = [5, "l"];
      var expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function(done) {
      var input = [5, "mi"];
      var expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function(done) {
      var input = [5, "km"];
      var expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function(done) {
      var input = [5, "lbs"];
      var expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function(done) {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });

//////////////////////////////////////////////
////////////////////////////////////////////

  })

});