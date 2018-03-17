

var config = {
    apiKey: "AIzaSyCeeHf3Cji5p8wtKJTZMJjlasv8Xx9R9sE",
    authDomain: "traingame-7be2b.firebaseapp.com",
    databaseURL: "https://traingame-7be2b.firebaseio.com",
    projectId: "traingame-7be2b",
    storageBucket: "traingame-7be2b.appspot.com",
    messagingSenderId: "273263384380"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var train;
  var destination;
  var firstTrain;
  var frequency;

  $("#add-train").on("click", function(event) {
    event.preventDefault();

    train = $("#train-input").val().trim();
    destination = $("#dest-input").val().trim();
    firstTrain = $("#first-input").val().trim();
    frequency = $("#freq-input").val().trim();

    database.ref().push({

        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  })