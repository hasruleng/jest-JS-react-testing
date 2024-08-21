import CurrencyComparison from './currency_comparison';

// Task 10: Import and mock fetchData
import fetchData from './utils/fetch-data';
jest.mock('./utils/fetch-data');  // Corrected path

const testSalary = new CurrencyComparison(50000)
    
// Task 1: Create a test for testSalary.currencyConversion below
it("Test currencyConversion: Gets conversion rate for currency", () => {
    //arrange
    const currencyCode1 = 'CAD';
    const expectedValue1 = 1.21;
    const currencyCode2 = 'EUR';
    const expectedValue2   
   = 0.82;
    const rates = {
      "MXN": 19.9021,
      "CAD": 1.2121, 
      "EUR": 0.8235
    };
  
    //act
    const rates_currency1 = testSalary.currencyConversion(rates, currencyCode1);
    const rates_currency2 = testSalary.currencyConversion(rates, currencyCode2);
  
    //assert
    expect(rates_currency1).toBe(expectedValue1);
    expect(rates_currency2).toBe(expectedValue2);
});

// Task 5: Create a test for testSalary.hourlyPayUSD below
it("Test hourly pay USD", () => {
  //arrange
  const salary = new CurrencyComparison(50000);
  const rateCAD = 1.21;
  let expectedResult = (testSalary.salary / rateCAD) / (50 * 40);

  //act
  const hourlyPayInCAD = salary.hourlyPayUSD(rateCAD);
  console.log(expectedResult)
  //assert
  expect(hourlyPayInCAD).toBeCloseTo(expectedResult);
});

// Task 6: Complete this test!
it("Respond with different salaries based on currency", (done) => {
  //arrange
  const currency = "CAD"
  const exchangeRate = 1.21
  const expectedValue = {
    USD: 25,
    CAD: 20.66,
    salary: 50000,
  }

  //act
  testSalary.response(currency, exchangeRate, (result) => {
    //assert
    try{
        expect(result).toBeDefined();
        // console.log(result);
        done()
    }
    catch(error){
      done(error)
    }
  })
})

// Task 10 & 11: Complete this test!
it("Receives current currency exchange data", async ()=>{
  //arrange
  const mockResponse = {
    status : "Mock",
    data: {
      "base": "USD",
      "rates": {
        "CCD": 50,
      },
      "date": "2021-05-17"
    }
  }
  const expectedValue = [{"CCD": 50}, "Mock"];

  // Mock the resolved value of fetchData
  fetchData.mockResolvedValueOnce(mockResponse); 
  
  //act
  const actualValue = await testSalary.fetchCurrentExchange() 
  
  //assert
 
})
