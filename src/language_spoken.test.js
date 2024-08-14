import {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse
} from './language_spoken.js';

it("converts array of country data objects to array of countries", () => {
  //arrange
  const inputObject = [
    { name: "Argentina", capital: "Buenos Aires" },
    { name: "Belize", capital: "Belmopan" },
    { name: "Bolivia", capital: "Sucre" }
  ]
  const expectedValue = ["Argentina", "Belize", "Bolivia"]

  //act
  // console.log(inputObject)
  const actualValue = countryExtractor(inputObject)
  // console.log("haha")
  // console.log(actualValue)
  //assert
  expect(actualValue).toEqual(expectedValue); // toEqual: deep-object equality checker
  expect(actualValue[0]).toBe("Argentina"); // toBe for simple object/single value comparison
  expect(actualValue).toContain("Belize");  // toContain: one of the element in expect match the given argument
  expect(actualValue[2] === "Bolivia").toBeTruthy(); // truthy fruity
  expect(actualValue[3]).not.toBeDefined(); // toBeDefined: index #3 is not defined => true 
})

//done is essential for testing async code
it("correctly fetches a list of countries", (done) => {
  const inputLanguageCode = "es";
  const expectedValue = "Argentina";

  countryListLookup(inputLanguageCode, (result) => {
    try {
      expect(result).toBeDefined();
      done(); //tell Jest that the asynchronous operation has been completed => Jest continue evaluating the result of the test
    }
    catch (error) {      
      done(error)
    }
  });
});