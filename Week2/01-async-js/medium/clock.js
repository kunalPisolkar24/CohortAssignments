function clock() {
    setInterval(function() {
        console.clear();
        let hour = new Date().getHours();
        let min = new Date().getMinutes();
        let sec = new Date().getSeconds();
        let amPm = hour >= 12 ? "PM" : "AM";
        console.log(hour + ":" + min + ":" + sec + " " + amPm);
    }, 1000);
}

clock()