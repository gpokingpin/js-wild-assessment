// Get the geographic location from the browser

/* the code below declares options with a timeout of 5 seconds(5000) and maximum age of 0 meaning its non-existant */

function assembleImageSource(photosOb) {
    return 'https://farm${photoObj.farm}.staticflicker/' + 
    `${photoObj.server}/` +
    `${photoObj.id}_${photoObj.secret}.jpg`    
}

function showPhotos (data) {
    console.log(data)
    photosArray - data.photos.photo

    //look at the first photo and turn it into an <img src=___> tag
    console.log(assembleImageSource(photosArray[0]))
}

function processResponse(response) {
    let responsePromise = response.json()
    responsePromise.then(showPhotos)
    
}


function useCurrentLocation(){

    /* LEAVE TIMEOUT AT 2000 as it times OUT anything before that */

let options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

/* the following function gives the current location with latitude and longitude */

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    requestPhotos(pos.coords)
}

/* the following function throws an error message if not able to get the geolocation */

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    requestPhotos(fallBackLocation)
}

navigator.geolocation.getCurrentPosition(success, error, options);
}

// Construct the query URL




// Use fetch to send the request to Flickr

let url = (https://flickr.com/services/rest/?api_key=5c18d7cf47a3a9fdf8f4b4347aa206f0&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=39.76574&lon=-86.1579024&text=dog)

let fetchPromise - fetch(url)

fetchPromise.then(processResponse)
    )

// Process the response data into an object


// Use the values in the response object to construct an image source URL

// photos.search is method we are using


/**   Get the geographic location from the browser
 Construct the query URL
 Use fetch to send the request to Flickr
 Process the response data into an object
 Use the values in the response object to construct an image source URL */