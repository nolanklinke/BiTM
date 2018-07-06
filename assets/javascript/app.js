//array of top 10 marker caps
var topCoins = ["bitcoin", "litecoin", "etherium", "bitcoin cash", "xrp", "stellar", "tether", "iota", "cardano"];
//images/icons of topTenCoins
var topTenImages = [
    '<img src="assets/images/btc.svg">',
    '<img src="assets/images/ltc.svg">',
    '<img src="assets/images/eth.svg">',
    '<img src="assets/images/bch.svg">',
    '<img src="assets/images/xrp.svg">',
    '<img src="assets/images/xlm.svg">',
    '<img src="assets/images/usdt.svg">',
    '<img src="assets/images/miota.svg">',
    '<img src="assets/images/ada.svg">',

];

//array to push user choices to - used to generate graphs to display
var userCoinChoice = [];

//loop to create images and append to page
for (var i = 0; i < topCoins.length; i++) {

    var newDiv = $("<div>").html(topTenImages[i] + topCoins[i]);
    newDiv.attr("data-name", topCoins[i]);
    newDiv.addClass("d-inline cryptoIcon m-2");
    $("#icons").append(newDiv);

};

//places border around selection and pushes to array
// no duplicates allowed

$(".cryptoIcon").on("click", function () {

    

    var userChoice = $(this).attr("data-name");

    var index = userCoinChoice.indexOf(userChoice);
    
//if (index !== -1) array.splice(index, 1);   

    if (index === -1) {
        $(this).addClass("border border-success");

        userCoinChoice.push(userChoice);

    } else if (index !== -1) {
        $(this).removeClass("border border-success");

        userCoinChoice.splice(index, 1);
    }

    console.log(userCoinChoice);

    });


$("#btnGo").on("click", function () {

    $("#graphs").text(userCoinChoice);

})



//function to show appropriate crypto graph upon selection of crpyto icons
/*
$("#btnGo").on("click", function (){
    var search = $(this).attr("data-name");

    //var queryUrl = ***"API GOES HERE" + search + "REST OF API GOES HERE"***

    $.ajax({
        url: queryUrl,
        method: "GET"

    }).then(function(response){
        console.log(response);

        var results = response.data;

        var graphDiv = $("<div>")

    });
});
*/

