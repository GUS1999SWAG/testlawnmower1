// Initialize Google Maps
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 15,
    });

    const geocoder = new google.maps.Geocoder();

    const addressForm = document.getElementById('address-form');
    const addressInput = document.getElementById('address-input');
    const addressButton = document.getElementById('address-button');
    const dimensionsForm = document.getElementById('dimensions-form');
    const calculateButton = document.getElementById('calculate-button');

    let userLocation = null;
    let lawnmowerDimensions = null;

    // Function to geocode the user's entered address and display it on the map
    function geocodeAddress() {
        const address = addressInput.value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                const location = results[0].geometry.location;
                userLocation = location;
                map.setCenter(location);
                new google.maps.Marker({
                    map: map,
                    position: location,
                    title: 'Your Location'
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

    // Function to calculate and display the route
    function calculateRoute() {
        if (userLocation && lawnmowerDimensions) {
            // You would implement the route calculation logic here
            // This example just displays a line from the user's location
            // to a hardcoded destination (change this to your needs).
            const destination = new google.maps.LatLng(0.1, 0.1);
            const route = new google.maps.Polyline({
                path: [userLocation, destination],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });
            route.setMap(map);
        } else {
            alert('Please enter your address and lawnmower dimensions first.');
        }
    }

    // Attach event listeners
    addressForm.addEventListener('submit', function (e) {
        e.preventDefault();
        geocodeAddress();
    });

    dimensionsForm.addEventListener('submit', function (e) {
        e.preventDefault();
        lawnmowerDimensions = {
            length: document.getElementById('length').value,
            width: document.getElementById('width').value
        };
    });

    calculateButton.addEventListener('click', function () {
        calculateRoute();
    });
}