
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCutNmws4pAi0KZvB1cdrR_U4l1EX-wzPE",
    authDomain: "testproject-f48f0.firebaseapp.com",
    databaseURL: "https://testproject-f48f0.firebaseio.com",
    projectId: "testproject-f48f0",
    storageBucket: "testproject-f48f0.appspot.com",
    messagingSenderId: "437430008317"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Trains
  $("#add-train-button").on("click", function(event) {
  event.preventDefault();
  console.log("clicked");

     // Grabs user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = moment($("#first-train").val().trim(), "DD/MM/YY").format("X");
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + newTrain.trainName + "</td><td>" + newTrain.destination + "</td><td>" +
  newTrain.firstTrain + "</td><td>" + newTrain.frequency + "</td><td>");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

$("#clear-all-button").on("click", function(event) {
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

