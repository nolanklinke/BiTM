  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKW4urxeIqeAunw2CTEBw1BqZZxaU6Zro",
    authDomain: "bitm-1b867.firebaseapp.com",
    databaseURL: "https://bitm-1b867.firebaseio.com",
    projectId: "bitm-1b867",
    storageBucket: "",
    messagingSenderId: "731402922500"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var userName = "";
  var userEmail = "";
  var userPass = "";

  $("#submitUser").on("click", function() {

    userName = $("#orangeForm-name").val().trim();
    userEmail = $("#orangeForm-email").val().trim();
    userPass = $("#orangeForm-pass").val().trim();

    database.ref().push({
        userName = userName,
        userEmail = userEmail,
        userPass = userPass,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


  });
