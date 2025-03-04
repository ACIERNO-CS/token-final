# API Integration Details


## Why CoinGecko?

Out of the three most popular cryptocurrency tracking APIs (Kraken, CoinGecko, and Coinbase) this project used CoinGecko. 
This choice came down to two main factors.

1. **Weight**  
This web service needs the bare minimum data in order to function - simply the current price of the token. Therefore, while it has more features, the heavier Kraken API is unnecessary. 
2. **Cost**  
Alongside the fact that I simply prefer CoinGecko over Coinbase, it also has a more substantial free tier, causing it to be the preferred choice.

## Endpoints
This project only needs to use the /coin/* endpoint to get all the data it needs to function. It is accessed through
```js
fetch(`https://api.coingecko.com/api/v3/coins/${name}`, {
    method: "GET",
    headers: {
        "content-type": "application/json",
        "x-cg-demo-api-key": DEMO_KEY,
    },
});
```
and is further detailed in the State Management page.