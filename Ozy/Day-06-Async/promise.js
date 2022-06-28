const myPromise = new Promise((resolve, reject) => {
  let condition = false;

  if (condition) {
    resolve("Promise is resolved");
  } else {
    reject("Promise is rejected");
  }
});

myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((message) => {
    console.log(message);
  });
