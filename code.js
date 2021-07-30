// Get the geographic location from the browser

/* the code below declares options with a timeout of 5 seconds(5000) and maximum age of 0 meaning its non-existant */

function myFunction(){

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

/* the following function gives the current location with latitude and longitude */

function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

/* the following function throws an error message if not able to get the geolocation */

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
}

// Construct the query URL

https://flickr.com/services/rest/?api_key=5c18d7cf47a3a9fdf8f4b4347aa206f0



// Use fetch to send the request to Flickr


// Process the response data into an object


// Use the values in the response object to construct an image source URL

(function () {

    document.getElementById("uploadFile").onchange = function (el) {
        readURL(this)
        EXIF.getData(el.target.files[0], function () {

            EXIF.getData(this, () => {
                console.log(this)



                if (Object.keys(this.exifdata).length > 0) {

                    //display camera details    
                    camera_details(this.exifdata)
                    //display image details
                    generate_lat_lang(this)



                } else {
                    noDataAvailable()
                }

            });

        });
    }
    var image = document.getElementsByClassName('DisplayImage');
    for (var i = 0; i < image.length; i++) {
        image[i].addEventListener('click', function () {
            EXIF.getData(this, () => {
                if (Object.keys(this.exifdata).length > 0) {
                    //display camera details    
                    camera_details(this.exifdata)
                    //display image details
                    generate_lat_lang(this)
                } else {
                    noDataAvailable()

                }
            });
        });
    }


    // })();


    function readURL(input) {
        ///reading the Uploading file
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById("preview").src = e.target.result
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    function noDataAvailable() {

        document.getElementById("Lati").innerText = "N/A"
        document.getElementById("Long").innerText = "N/A"
        document.getElementById("cmm").innerText = "N/A"
        document.getElementById("resolution").innerText = "N/A"
        document.getElementById("datetime").innerText = "N/A"
        document.getElementById("iso").innerText = "N/A"
        document.getElementById("stp").innerText = "N/A"
        alert("No GPS Data Available")
    }

    //getting camera details 
    function camera_details(exifData = '') {
        var cmm = "N/A"
        var company = "N/A"
        if (exifData.Model) {
            cmm = exifData.Model;
        }
        if (exifData.Make) {
            company = exifData.Make;
        }

        //Camera Model
        document.getElementById("cmm").innerText = cmm + '-' + company
        //Image Resolution
        document.getElementById("resolution").innerText = (exifData.ImageHeight) ? exifData.ImageHeight : "N/A" + ' ' + (exifData.ImageWidth) ? exifData.ImageWidth : "N/A"
        //Image taken time
        document.getElementById("datetime").innerText = (exifData.DateTimeOriginal) ? exifData.DateTimeOriginal : "N/A"
        //Iso speed
        document.getElementById("iso").innerText = (exifData.ISOSpeedRatings) ? exifData.ISOSpeedRatings : "N/A"
        //lense shutter speed
        document.getElementById("stp").innerText = (exifData.ShutterSpeedValue) ? exifData.ShutterSpeedValue : "N/A"

    }

    function generate_lat_lang(imageData = '') {

        //geting cordinates of latitude
        var latDegree = imageData.exifdata.GPSLatitude[0].numerator;
        var latMinute = imageData.exifdata.GPSLatitude[1].numerator;
        var latSecond = imageData.exifdata.GPSLatitude[2].numerator / imageData.exifdata.GPSLatitude[2].denominator;

        document.getElementById("Lati").innerText = (latDegree + (latMinute / 60) + (latSecond / 3600)).toFixed(8);;
        //geting cordinates of longitude
        var lonDegree = imageData.exifdata.GPSLongitude[0].numerator;
        var lonMinute = imageData.exifdata.GPSLongitude[1].numerator;
        var lonSecond = imageData.exifdata.GPSLongitude[2].numerator / imageData.exifdata.GPSLongitude[2].denominator;
        document.getElementById("Long").innerText = (lonDegree + (lonMinute / 60) + (lonSecond / 3600)).toFixed(8);
    }
})

/**   Get the geographic location from the browser
 Construct the query URL
 Use fetch to send the request to Flickr
 Process the response data into an object
 Use the values in the response object to construct an image source URL */