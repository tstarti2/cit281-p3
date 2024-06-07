// Project: CIT 281 Project 3
// Author: Tyler Startin

// Fastify and node fs init
const fs = require("fs");
const fastify = require("fastify")({
  logger: true
})

// Import code module
const { coinCount, coins } = require("./p3-modules");

// Declare a route, read in index.html
fastify.get('/', function (request, reply) {
  const homepage = fs.readFile('index.html', 'utf8', (err, homepage) => {
    // Arrow function that displays displays error message or data from index.html
    if (err) {
      console.log(err);
      reply
      .code(500)
      .header("Content-Type", "text/html; charset=utf-8")
      .send('Something went wrong')
    }
  reply
  .code(200)
  .header("Content-Type", "text/html; charset=utf-8")
  .send(homepage);})
});

// Just about all of this code was adapted from the week 5 code post on Canvas. 

// Declare new path /coin
fastify.get("/coin", (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  // Convert denom and count to integers, call coinCount()
  const coinToInt = { denom: parseInt(denom), count: parseInt(count) }; // combine
  const coinCountResult = coinCount(coinToInt);
  // Print the values of count and denom followed by the calculation result from coinCountResult
  const data = `<h2>Value of ${count} of ${denom} is ${coinCountResult}</h2><br /><a href="/">Home</a>`;
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(data);
});

// Declare new path /coins
fastify.get("/coins", (request, reply) => {
  const { option } = request.query;
  // Declare coins array for case 2
  // Allow options 1 or 2, calculate the answers based on values using coinCount()
  switch (option) {
    case "1":
      coinCountResult = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      break;
    case "2":
      coinCountResult = coinCount(...coins);
      break;
    default:
      coinCountResult = 0;
      break;
  }
  // Print value of selected option or default value
  const data = `<h2>Coin value: ${coinCountResult}</h2><br /><a href="/">Home</a>`;
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(data);
});

// Handle invalid paths
fastify.get('*', function (request, reply) {
  let invalid = `Invalid path`;
  reply
  .code(200)
  .header("Content-Type", "application/json; charset=utf-8")
  .send(invalid);
});

// Run the server
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});