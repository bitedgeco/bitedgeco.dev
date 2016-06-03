"use strict";
(function () {
    //load map and set marker behavior 
    function loadMap(latitude, longitude){
        var mapOptions = {
            zoom: 5,
            center: {
                lat: latitude,
                lng: longitude
            }
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var marker = new google.maps.Marker({
            position: {
                lat: latitude,
                lng: longitude
            },
            draggable:true,
            map: map
        });

        marker.addListener("dragend", function(event){
            loadWeather(event.latLng.lat(), event.latLng.lng());
        });

        google.maps.event.addListener(map, 'click', function(event) {
            marker.setPosition(event.latLng);
            map.setCenter(event.latLng);
            loadWeather(event.latLng.lat(), event.latLng.lng());
        });
        
        map.setOptions({ draggableCursor: 'crosshair' });
    }
    // load weather
    function loadWeather(latitude, longitude){

        $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: "64d8990e4fdb37b42608f9844ad7a373",
            lat:    latitude,
            lon:    longitude,
            units: "metric"
        }).done(function(data){

            $('#placeName').html('<h2>' + data.city.name + ' ' + data.city.country + '</h2>');

            $('#today').html('<strong>Today</strong><img src="http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png"><p>min ' + data.list[0].temp.min + ' °C</p><p>max ' + data.list[0].temp.max + ' °C</p><p>' + data.list[0].weather[0].description);

            $('#tomorrow').html('<strong>Tomorrow</strong><img src="http://openweathermap.org/img/w/' + data.list[1].weather[0].icon + '.png"><p>min ' + data.list[1].temp.min + ' °C</p><p>max ' + data.list[1].temp.max + ' °C</p><p>' + data.list[1].weather[0].description);

            $('#dayAfterTomorrow').html('<strong>Day after tomorrow</strong><img src="http://openweathermap.org/img/w/' + data.list[2].weather[0].icon + '.png"><p>min ' + data.list[2].temp.min + ' °C</p><p>max' + data.list[2].temp.max + ' °C</p><p>' + data.list[2].weather[0].description);
        });
    }

    //search button click
    $('#searchButton').click( function(event){
        event.preventDefault();
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({ "address": $('#userSearch').val() }, function(results, status) {
        console.log(results)

        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();

        loadMap(latitude, longitude);
        loadWeather(latitude, longitude);
        });
    });
    
    loadMap(29.423017, -98.48527);
    loadWeather(29.423017, -98.48527);
})();