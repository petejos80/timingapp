// Initialize Firebase
var config = {
  apiKey: "AIzaSyCutNmws4pAi0KZvB1cdrR_U4l1EX-wzPE",
  authDomain: "testproject-f48f0.firebaseapp.com",
  databaseURL: "https://testproject-f48f0.firebaseio.com",
  projectId: "testproject-f48f0",
  storageBucket: "testproject-f48f0.appspot.com",
  messagingSenderId: "437430008317"
};

// Global variables
var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = "";
var tMinutesTillTrain = "";
var nextTrain = "";

firebase.initializeApp(config);

var dataRef = firebase.database();

// 2. Button for adding Trains
$("#add-train-button").on("click", function(event) {
  event.preventDefault();
  console.log("clicked");

    // Clear values from fields
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");


  // RETRIEVE VALUES FROM FORM FIELDS
  // ========================================================
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train").val().trim();
  frequency = $("#frequency").val().trim();

    dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
    });
  });


// PUSH CONTENT TO FIREBASE
// ==================================================================================

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on(
  "child_added",
  function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    // TEST SECTION
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("This is first time converted: " + firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log("TIME APART (REMAINDER): " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
    console.log("MINUTES AWAY: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("NEXT ARRIVAL: " + moment(nextTrain).format("hh:mm"));


    // APPEND ITEMS TO HTML
    // ==================================================================================
    // full list of items to the well
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(childSnapshot.val().trainName),
        $("<td>").text(childSnapshot.val().destination),
        $("<td>").text(childSnapshot.val().frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm A")),
        $("<td>").text(tMinutesTillTrain)
      )
    );    
  });

// CLEAR ITEMS FROM FORM ON DELETE BUTTON CLICK
// ======================================================================================
$("#clear-all-button").on("click", function(event) {
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});