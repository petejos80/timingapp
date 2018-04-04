// Initialize Firebase
var config = {
  apiKey: "AIzaSyCutNmws4pAi0KZvB1cdrR_U4l1EX-wzPE",
  authDomain: "testproject-f48f0.firebaseapp.com",
  databaseURL: "https://testproject-f48f0.firebaseio.com",
  projectId: "testproject-f48f0",
  storageBucket: "testproject-f48f0.appspot.com",
  messagingSenderId: "437430008317"
};

// Initial Values
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

  // Initial Values
  // var trainName = "";
  // var destination = "";
  // var firstTrain = "";
  // var frequency = "";
  // var tMinutesTillTrain = "";
  // var nextTrain = "";

  // Retrive values from fields
  trainName = $("#train-name")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  firstTrain = $("#first-train")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

    dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
    });
  });

//   // ADD FORECATING LOGIC
//   // Convert first time value to UNIX time
//   var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
//   console.log("This is first time converted: " + firstTimeConverted);

//   // Current Time
//   var currentTime = moment();
//   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//   // Difference between the times
//   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
//   console.log("DIFFERENCE IN TIME: " + diffTime);

//   // Time apart (remainder)
//   var tRemainder = diffTime % frequency;
//   console.log("TIME APART (REMAINDER): " + tRemainder);

//   // Minute Until Train
//   var tMinutesTillTrain = frequency - tRemainder;
//   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

//   // Next train arrival
//   var trainArrival = moment().add(tMinutesTillTrain, "minutes");
//   var nextTrain = moment(trainArrival).format("hh:mm A");
//   console.log("Train Arrival: " + trainArrival);
//   console.log("Next Train" + nextTrain);
// // console.log("Train Arrival: " + moment(trainArrival).format("hh:mm"));
//   // Code for the push
//   dataRef.ref().push({
//     trainName: trainName,
//     destination: destination,
//     firstTrain: firstTrain,
//     frequency: frequency,
//     tMinutesTillTrain: tMinutesTillTrain,
//     nextTrain: nextTrain,
//     dateAdded: firebase.database.ServerValue.TIMESTAMP
//   });
// });

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on(
  "child_added",
  function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    // find current time
    // find how far train from current time
    // find when next train is

    var now = moment();
    console.log("Current moment" + now);

    var unixNow = moment.unix(now);
    console.log("This is unix time " + unixNow);

    var firstTrainUnix = moment(childSnapshot.val().firstTrain, "HH:mm");
    console.log("First train val unix " + firstTrainUnix);

    var fromNow = moment(firstTrainUnix).fromNow();
    console.log("Moment from now: " + fromNow);

    





    // TEST SECTION
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log("This is first time converted (TEST1): " + firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME (TEST1): " + moment(currentTime).format("hh:mm"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME (TEST1): " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log("TIME APART (REMAINDER) (TEST1): " + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // // Next train arrival
    // var trainArrival = moment().add(tMinutesTillTrain, "minutes");
    // var nextTrain = moment(trainArrival).format("hh:mm A");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





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










  // ADD FORECATING LOGIC
  // Convert first time value to UNIX time
  // var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  // console.log("This is first time converted (TEST1): " + firstTimeConverted);

  // // Current Time
  // var currentTime = moment();
  // console.log("CURRENT TIME (TEST1): " + moment(currentTime).format("hh:mm"));

  // // Difference between the times
  // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // console.log("DIFFERENCE IN TIME (TEST1): " + diffTime);

  // Time apart (remainder)
  // var tRemainder = diffTime % frequency;
  // console.log("TIME APART (REMAINDER): " + tRemainder);

  // // Minute Until Train
  // var tMinutesTillTrain = frequency - tRemainder;
  // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // // Next train arrival
  // var trainArrival = moment().add(tMinutesTillTrain, "minutes");
  // var nextTrain = moment(trainArrival).format("hh:mm A");
  // console.log("Train Arrival: " + trainArrival);
  // console.log("Next Train" + nextTrain);




















    

    // $("#train-table > tbody").append(
    //   "<tr><td>" +
    //     childSnapshot.val().trainName +
    //     "</td><td>" +
    //     childSnapshot.val().destination +
    //     "</td><td>" +
    //     childSnapshot.val().frequency +
    //     "</td><td>" +
    //     childSnapshot.val().nextTrain +
    //     "</td><td>" +
    //     childSnapshot.val().tMinutesTillTrain +
    //     "</td><td>"
    // );

    // Handle the errors
//   },
//   function(errorObject) {
//     console.log("Errors handled: " + errorObject.code);
//   }
// );

// dataRef
//   .ref()
//   .orderByChild("dateAdded")
//   .limitToLast(1)
//   .on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#train-name").text(snapshot.val().trainName);
//     $("#destination").text(snapshot.val().destination);
//     $("#first-train").text(snapshot.val().firstTrain);
//     $("#frequency").text(snapshot.val().frequency);
//     $("#frequency").text(snapshot.val().tMinutesTillTrain);
//     //  $("#frequency").text(snapshot.val().nextTrain);
//   });

// =====================================================================================================================

//      // Grabs user input
//   var trainName = $("#train-name").val().trim();
//   var destination = $("#destination").val().trim();
//   var firstTrain = moment($("#first-train").val().trim(), "DD/MM/YY").format("X");
//   var frequency = $("#frequency").val().trim();

//   // Creates local "temporary" object for holding train data
//   var newTrain = {
//     trainName: trainName,
//     destination: destination,
//     firstTrain: firstTrain,
//     frequency: frequency
//   };

//   // Uploads train data to the database
//   dataRef.ref().on("child_added", function(childSnapshot) {

//     // Log everything that's coming out of snapshot
//     console.log(childSnapshot.val().trainName);
//     console.log(childSnapshot.val().destination);
//     console.log(childSnapshot.val().firstTrain);
//     console.log(childSnapshot.val().frequency);

//   // Alert
//   alert("Train successfully added");

//   // Add each train's data into the table
//   $("#train-table > tbody").append("<tr><td>" + newTrain.trainName + "</td><td>" + newTrain.destination + "</td><td>" +
//   newTrain.firstTrain + "</td><td>" + newTrain.frequency + "</td><td>");

// // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
// dataRef.ref().on("child_added", function(childSnapshot) {

//     // Log everything that's coming out of snapshot
//     console.log(childSnapshot.val().trainName);
//     console.log(childSnapshot.val().destination);
//     console.log(childSnapshot.val().firstTrain);
//     console.log(childSnapshot.val().frequency);

//     // full list of items to the well
//     $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
//       " </span><span class='member-email'> " + childSnapshot.val().email +
//       " </span><span class='member-age'> " + childSnapshot.val().age +
//       " </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");

//   // Clears all of the text-boxes
//   $("#train-name").val("");
//   $("#destination").val("");
//   $("#first-train").val("");
//   $("#frequency").val("");
// });

// $("#clear-all-button").on("click", function(event) {
//   $("#train-name").val("");
//   $("#destination").val("");
//   $("#first-train").val("");
//   $("#frequency").val("");
// });




















// ADDED VALUES

// var now = moment();
// console.log("Current moment" + now);

// var unixNow = moment.unix(now);
// console.log("This is unix time " + unixNow);

// var firstTrainUnix = moment(childSnapshot.val().firstTrain, "HH:mm");
// console.log("First train val unix " + firstTrainUnix);

// var fromNow = moment(firstTrainUnix).fromNow();
// console.log("Moment from now: " + fromNow);
