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
}

navigator.geolocation.getCurrentPosition(success, error);


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
    return data
};

function requestPhotos(location) {
    console.log("Requesting photos near " + location.latitude + ", " + location.longitude)


    /** prossessResponse area */

    function processResponse(response) {
        let responsePromise = response.json()
        responsePromise.then(showPhotos)
    }

    /** this is where my photos are showing up */

    let counter = 0
    let image = document.createElement("img")
    let currentPhoto = photosArray[counter]

    function showPhotos(data) {
        console.log(data)
        photosArray = data.photos.photo
        let imageUrl = assembleImageSorceURL(photosArray[0]);
        console.log(imageUrl)
        let button = document.createElement("button")
        button.textContent = 'Next Photo';

        button.setAttribute("id", "showPhotos");
        document.body.append(button)
        document.getElementById("showPhotos").onclick = function () { myFunction() };
        function myFunction() {

            // console.log(photosArray[counter])
            image.src = assembleImageSorceURL(photosArray[counter])

            // photosArray = photosArray

            document.body.append(image)


            counter++

            if (counter > 4) {

                location.reload;

                counter = 0


            }
        }


        /** THIS IS WHERE THE PHOTOS RENDOR TO THE PAGE */
        //     photosArray.forEach(photo => {
        //     let image = document.createElement("img")
        //     image.src = assembleImageSorceURL(photo) 
        //     photosArray = photosArray
        //     document.body.append(image)
        // });    
    }

    //Look at the first photo and turn it into an <img src = ____> tag
    //append the image tag to the page

    //* SETTING UP API KEY *//

    let myApiKey = "5c18d7cf47a3a9fdf8f4b4347aa206f0"
    let url = 'https://shrouded-mountain-15003.herokuapp.com/https://api.flickr.com/services/rest/?api_key=' + myApiKey + '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=' + location.latitude + '&lon=' + location.longitude + '&text=car'
    let fetchPromise = fetch(url)
    fetchPromise.then(processResponse)
}

// Get the geographic location from the browser

function useCurrentLocation(pos) {
    console.log("Using actual loaction")
    console.log(pos.coords)
    // requestPhotos(pos.coords)

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



/*
Development Plan:
----------------------------------
A. Get location that we want to see photos of
  1. use Geolocation API to get coordinates (lat and lon) or use a fallback location
    - [ this is a link to the documentation ]
B. Get photo info from Flickr
  1. use fetch() to send a GET request to flickr.com/services/rest
    - Include the lat and lon
    - Include a search term
  2. Process the promises to get the photo data
    - Convert JSON to a usable object ("rehydrate")
    - Send the photo data to a display function
C. Display photos
  1. Create the image URLs from the photo data (function)
    - https://www.flickr.com/services/api/misc.urls.html
  2. Insert an <img> tag into the page
    - crate an img element
    - set src attribute to image URL
    - append the element to the right place in the document
  3. Display link to the image's Flickr page (function)
    - (Same stuff as the img tag)
D. Provide a way to advance through photos
*/