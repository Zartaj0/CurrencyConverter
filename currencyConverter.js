const axios = require('axios');

const getExchangeRate = async (fromCurrency,toCurrency)=>{
  
 axios.get('http://api.currencylayer.com/live?access_key=485ee24b4cefc557411750d36d72e3a5')
  .then((res)=>{
    const rate = res.data.quotes;
    const usd = 1 / rate[`USD${fromCurrency}`];
    const exchangeRate = usd * rate[`USD${toCurrency}`];
    
    return exchangeRate

    //Another Aproach
    // const usd = 1 / rate[`USD${fromCurrency}`];
    // const exchangeRate = usd * rate[`USD${toCurrency}`];

  });

};
//getExchangeRate('USD','INR')

 const getCountries = async (c)=>{
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${c}`)

        return response.data.map(country => country.name.common).join(',')

 }




 const convertCurrency = async (fromCurrency,toCurrency,amount)=>{
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
 
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate);
  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
 }
 
 convertCurrency('INR','USD',100000)
     .then(data => console.log(data));