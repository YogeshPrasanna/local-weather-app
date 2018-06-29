$(document).ready(function() {
    var callLocation = function callLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                catchData(position.coords.latitude, position.coords.longitude);
            });
        } else {
            alert("please share the location");
        }
    };

    function catchData(latitude, longitude) {
        var url =
            "http://api.openweathermap.org/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&APPID=2898d089486f107dc2565963788c9842";
        console.log(url);
        var output = $.ajax({
            url: url,
            type: "GET",
            dataType: "jsonp",
            data: {},
            success: function(data) {
                console.log(data);
                var temp = Math.ceil(data.main.temp_max - 273.15),
                    desc = data.weather[0]["description"],
                    humidity = data.main.humidity;

                $("#feel").html(desc);
                $("#temp").html(temp + "&deg;c");
                $("#humid").html("Humidity : " + humidity + " %");

                if (
                    desc === "clear sky" ||
                    desc === "few clouds" ||
                    desc === "sky is clear" ||
                    desc == "scattered clouds"
                ) {
                    $("body").css({
                        "background-image": "url(https://static.pexels.com/photos/116717/pexels-photo-116717.jpeg)",
                        "background-size": "100vw 100vh"
                    });
                    $("#weather-icon").css({
                        "background-image": "url(https://s25.postimg.org/58eqofkan/clear_sky.png)"
                    });
                } else if (desc === "overcast clouds") {
                    $("body").css({
                        "background-image":
                            "url(http://www.nasa.gov/sites/default/files/thumbnails/image/smap-weather.jpg)",
                        "background-size": "100vw 100vh"
                    });
                    $("#weather-icon").css({
                        "background-image": "url(https://s25.postimg.org/omk61v14v/overcast_clouds.png)"
                    });
                } else if (desc === "broken clouds") {
                    $("body").css({
                        "background-image": "url(https://static.pexels.com/photos/112065/pexels-photo-112065.jpeg)",
                        "background-size": "100vw 100vh"
                    });
                    $("#weather-icon").css({
                        "background-image": "url(https://s25.postimg.org/pat0kszun/broken_clouds.png)"
                    });
                } else if (desc === "light rain" || desc === "moderate rain" || desc === "heavy rain") {
                    $("body").css({
                        "background-image": "url(https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg)",
                        "background-size": "100vw 100vh"
                    });
                    $("#weather-icon").css({
                        "background-image": "url(https://s25.postimg.org/8ht5uw8e7/light_rain.png)"
                    });
                } else if (desc == "light snow" || desc == "moderate snow" || desc == "heavy snow") {
                    $("body").css({
                        "background-image": "url(https://static.pexels.com/photos/29845/pexels-photo-29845.jpg)",
                        "background-size": "100vw 100vh"
                    });
                    $("#weather-icon").css({
                        "background-image": "url(https://s25.postimg.org/4ggo2z5hb/snow.png)"
                    });
                } else {
                    $("body").css({
                        "background-image": "url(https://static.pexels.com/photos/6566/sea-sky-clouds-weather.jpg)",
                        "background-size": "100vw 100vh"
                    });
                }
            },
            error: function(err) {
                alert("err");
            }
        });

        $.getJSON(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                latitude +
                "," +
                longitude +
                "&key=AIzaSyDduLo1-GPOYH6S5katr779jwWcSYQyEdc",
            function(data) {
                console.log(data);
                console.log(data.results[0].address_components[2].long_name);
                $("#area").html(
                    data.results[0].address_components[2].long_name +
                        " , " +
                        data.results[0].address_components[4].long_name +
                        " , " +
                        data.results[0].address_components[6].long_name +
                        " , " +
                        data.results[0].address_components[7].long_name
                );
            }
        );
        // $('#area').html(data.responseJSON.results[0].address_components[2].long_name);

        // $.ajax({
        //     url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+ longitude+"&key=AIzaSyDduLo1-GPOYH6S5katr779jwWcSYQyEdc",
        //     type: 'GET',
        //     dataType: 'jsonp',
        //     area: {},
        //     success: function(area) {
        //         console.log(area);
        //     },
        //     error: function() {
        //         console.log('could not fetch area');
        //     }
        // });
    }

    // if(window.navigatior.userAgent.includes('Chrome') === 'true'){
    //  alert("Unfortunately Browsers such as chrome , Brave and Browsers in android doesn\'t support Geolocation , so Please view this app in Mozilla Firefox or Microsoft Edge or IE");
    // }else{
    // callLocation();
    // }

    if (window.navigator.userAgent.includes("Chrome") == true) {
        //alert("Unfortunately Browsers such as chrome , Brave and Browsers in android doesn\'t support Geolocation , so Please view this app in Mozilla Firefox or Microsoft Edge or IE");
        var callLocation = function callLocation() {
            var geoSuccess = function(position) {
                // Do magic with location
                startPos = position;
                position.coords.latitude = startPos.coords.latitude;
                position.coords.longitude = startPos.coords.longitude;
                catchData(position.coords.latitude, position.coords.longitude);
            };
            var geoError = function(error) {
                return null;
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
            } else {
                alert("please share the location");
            }
        };

        callLocation();
    } else {
        callLocation();
    }
});
