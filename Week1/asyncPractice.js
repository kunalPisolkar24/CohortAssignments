function func() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log("hello");
    }, 3000);
    reject("done");
  });
}

async function fun2() {
    let val = await func();
    console.log(val);
}

fun2();