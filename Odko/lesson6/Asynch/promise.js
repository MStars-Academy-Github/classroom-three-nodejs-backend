const myPromise = new Promise((resolve, reject) => {
  let condition = false;
  if (condition) {
    resolve("Promise is RESOLVED");
  } else {
    reject("Promise is REJECT");
  }
});

myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((message) => {
    console.log(message);
  });
