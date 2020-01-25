let url = "https://ipapi.co/json/";

let doc = el => {
  let element = document.querySelector(el);
  return element;
};

//Putting the keyword async before a function tells the function to return a Promise.
//if it doesnt return a promise the result is wrapped in a resolved promise
//"Await" waits for the promise to be settled (either resolved or rejected) and then returns the result

let locationApp = async url => {
  let response = await fetch(url)
    .then(async response => {
      return await response.json();
    })
    .catch(err => {
      console.log(err);
    });
  const {
    ip,
    latitude,
    longitude,
    timezone,
    currency_name,
    city,
    org
  } = response;
  doc("#ip").innerHTML = ip;
  doc("#location").innerHTML = city;
  doc("#longitude").innerHTML = longitude;
  doc("#latitude").innerHTML = latitude;
  doc("#provider").innerHTML = org;
  doc("#currency").innerHTML = currency_name;
  doc("#zone").innerHTML = timezone;

  var map;

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 10
    });
  }

  initMap();
};

let result = locationApp(url);
