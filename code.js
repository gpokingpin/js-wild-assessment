let fallBackLocation = {
    latitude: 48.8575,
    longitude: 2.2982
} // Paris

let photosArray = []
let currentPhotoIndex = 0

function assembleImageSorceURL(photoObj) {
    return `https://farm${photoObj.farm}.staticflickr.com/` +
        `${photoObj.server}/` +
        `${photoObj.id}_${photoObj.secret}.jpg`;
};


function showPhotos(data) {
    console.log(data)
    photosArray = data.photos.photo
    let imageUrl = assembleImageSorceURL(photosArray[0]);
    console.log(imageUrl)

}
//Look at the first photo and turn it into an <img src = ____> tag
//append the image tag to the page


function processResponse(response) {
    let responsePromise = response.json()
    responsePromise.then(showPhotos)
}

function requestPhotos(location) {
    console.log("Requesting photos near " + location.latitude + ", " + location.longitude)

    //* SETTING UP API KEY *//

    let myApiKey = "5c18d7cf47a3a9fdf8f4b4347aa206f0"
    let url = 'https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=' + myApiKey + '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=' + location.latitude + '&lon=' + location.longitude + '&text=car'
    let fetchPromise = fetch(url)
    fetchPromise.then(processResponse)
}

// Get the geographic location from the browser

function useCurrentLocation(pos) {
    console.log("Using actual loaction")
    console.log(pos)
    requestPhotos(pos.coords)

    //* FALLBACK LOCATION *//

    function useFallbackLocation() {
        console.log("Using fallback location")
        requestPhotos(fallBackLocation)
    }



}

//* CURRENT LOCATION *//

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

//** STEP FIVE */
// Step Five - Display the first image

// Append an image element onto the <main> element on the page, using the above URL as the src attribute. The browser will then fetch and display the photo.


function constructImageURL (photoObj) { 
console.log (photoObj)

document.body.append(photoObj)

    
}