import languageCodes from "./utils/languageCodes.js"
import httpRequest from "./utils/http-request.js"
import "regenerator-runtime/runtime";

const { languageInEnglish, alpha2Codes } = languageCodes;

const capitalize = (language) => {
  return language.charAt(0).toUpperCase() + language.toLowerCase().slice(1)
}

const getAlpha2Code = (language) => {
  const codeIndex = languageInEnglish.indexOf(language);
  const alpha2Code = codeIndex && alpha2Codes[codeIndex];
  return alpha2Code;
}

const countryExtractor = (countriesObject) => {
  // console.log("countriesObject: ") [ {name: "Argentina", capital: "Buenos Aires"},
  // console.log(countriesObject) //..{name: "Bolivia", capital: "Sucre"} ]

  const countriesArray = []
  for (const country in countriesObject) {
    // console.log(country) //country => idx: 0, 1, 2
    countriesArray.push(countriesObject[country].name)
  }
  return countriesArray
}

const countryListLookup = async (alpha2Code, handleResponse) => {
  // console.log("alpha2Code")
  // console.log(alpha2Code) // "es" 
  try {
    const res = await httpRequest(alpha2Code)
    handleResponse(res.data) // added after async course, as well as the one in the param
    // return countryExtractor(res.data) // unused after async course
  } catch (error) {
    return undefined;
  }
}

const getResponse = (language, listOfPlaces) => {
  return `${capitalize(language)} is spoken in ${listOfPlaces.length} countries around the world`
}

export {
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse
};