

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

  $( document ).ready(function() {

  var train;
  var destination;
  var firstTrain;
  var frequency;

  // When clicked adds train data
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    train = $("#train-input").val().trim();
    destination = $("#dest-input").val().trim();
    firstTrain = $("#first-input").val().trim();
    frequency = $("#freq-input").val().trim();

    // Empties input fields after add-train button is clicked
    $("#train-input").val("");
    $("#dest-input").val("");
    $("#first-input").val("");
    $("#freq-input").val("");

    database.ref().push({

        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    return false;

  });

  // child added function

  database.ref().on("child_added", function(snapshot) {

		// Logs all of the user-input data to the console
		console.log(snapshot.val().train + " = train");
		console.log(snapshot.val().destination + " = destination");
		console.log(snapshot.val().firstTrain + " = nextTrain");
    console.log(snapshot.val().frequency +" = frequency");
    

    // Variables for child added inputs
    var train = snapshot.val().train;
		var destination = snapshot.val().destination;
		var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;
    
    // Moment JS
    var timeHour = moment().format('H');
		var timeMin = moment().format('m');
		var ftHour = moment(firstTrain, "HH:mm").format('H');
		var ftMin = moment(firstTrain, "HH:mm").format('m');

		var ftMoment = (ftHour * 60) + (ftMin * 1);
    var timeMoment = (timeHour * 60) + (timeMin * 1);
    
    // How much time passed since first train
    var diff = timeMoment - ftMoment;

    // How many trains so far
    var trainsSinceFirst = Math.floor(diff/frequency);

    // How long until the next train
    var nextTrain = ((trainsSinceFirst + 1) * frequency) + ftMoment;

    if (ftMoment < timeMoment) {
        var minAway = nextTrain - timeMoment;
        var nextTrain = moment().add(minAway, "minutes").format("HH:mm");
    } else {
        var nextTrain = firstTrain;
        var minAway = ftMoment - timeMoment;
    };

    $("#table-body").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");

  });
  
});