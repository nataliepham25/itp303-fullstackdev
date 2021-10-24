const APIKEY = "9a8418030133417387190eba26289675"

const startingCity = localStorage.getItem("dropdown");

console.log("starting city is: " + startingCity);
if (startingCity) {
    $("#dropdown").val(startingCity);
}

//"https://api.weatherbit.io/v2.0/current/?key=9a8418030133417387190eba26289675&city=Raleigh,NC"

const getWeatherData = (city) => {
    $.ajax({
        method: "GET",
        url: "https://api.weatherbit.io/v2.0/current/",
        data: {
            key: APIKEY,
            city: city,
        },
        dataType: "json"
    }).done((data) => {
        console.log(data);
        $("#weather").html("<p>Today's weather in "
            + data.data[0].city_name + ": <br> Temperature is "
            + (data.data[0].temp * 1.8 + 32).toFixed(1) + "Â°. "
            + data.data[0].weather.description + ". Feels like "
            + (data.data[0].app_temp * 1.8 + 32).toFixed(1) + "Â°."
            + "</p>");
    });
}

getWeatherData($("#dropdown").val());

$("#dropdown").on("change", () => {
    getWeatherData($("#dropdown").val())
    localStorage.setItem("dropdown", $("#dropdown").val());
    console.log("Local storage set to: " + localStorage.getItem("dropdown"));
});

$("#task-list").on("click", "p", function () {
    $(this).toggleClass("struck");
});

$("#task-list").on("click", ".square", function () {
    $(this).parent().fadeOut();
    window.scrollTo(0, 0);
});

$("#newItem").submit(function (e) {
    e.preventDefault();
    if ($("#input-text").val() != "") {
        var newItem = $("<li class='task'></li>").append("<i class='fas fa-times-circle square'></i>");

        newItem = newItem.append("<p class='itemText'>" + $("#input-text").val() + "</p>");
        $("#task-list").append(newItem);
        $("#input-text").val("");
    }

})