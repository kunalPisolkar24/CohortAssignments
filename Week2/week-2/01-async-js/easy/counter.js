
function startCounter() {
  let count = 0;
  const intervalId = setInterval(() => {
    console.clear();
    count++;
    if (count === 10) {
      clearInterval(intervalId);
    }
    console.log(count);
  }, 1000);
}

startCounter();