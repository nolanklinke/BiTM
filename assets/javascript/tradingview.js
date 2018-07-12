$("#show-graphs").hide();

//does not show widget until button is clicked
$("#btnGo").on("click", function () {

  $("#show-graphs").show();


new TradingView.MediumWidget(
    {
    "container_id": "tv-medium-widget",
    "symbols": [
      [userCoinChoice]  
    ],
    "greyText": "Quotes by",
    "gridLineColor": "#e9e9ea",
    "fontColor": "#83888D",
    "underLineColor": "#dbeffb",
    "trendLineColor": "#4bafe9",
    "width": "1000px",
    "height": "400px",
    "locale": "en"
  }
    );
  });
  

//arrays of top coins and symbols for widget
var topCoinsName = ["Bitcoin", "Litecoin", "Etherium", "Bitcoin Cash", "Xrp", "Stellar", "Tether", "Iota", "Cardano"];
var topCoinsSym = 
["COINBASE:BTCUSD",
"KRAKEN:LTCUSD", 
"KRAKEN:ETHUSD",
"KRAKEN:BCHUSD",
"KRAKEN:XRPUSD",
"KRAKEN:XLMUSD",
"KRAKEN:USDTUSD",
"BINANCE:IOTABTC", 
"BITTREX:ADABTC"];


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
for (var i = 0; i < topCoinsName.length; i++) {

  var newDiv = $("<button>").html(topTenImages[i] + topCoinsName[i]);
  newDiv.attr("data-name", topCoinsSym[i]);
  newDiv.addClass("d-inline cryptoIcon m-1");
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




