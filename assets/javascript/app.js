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

for (var i = 0; i <= topCoins.length; i++) {

    var newSpan = $("<span>").html(topTenImages[i]);
    newSpan.attr("data-name", topCoins[i]);
    $("#icons").append(newSpan);

};