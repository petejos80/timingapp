
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

  var dataRef = firebase.database();

  // 2. Button for adding Trains
  $("#add-train-button").on("click", function(event) {
  event.preventDefault();
  console.log("clicked");

 // Initial Values
 var trainName = "";
 var destination = "";
 var firstTrain = 0;
 var frequency = "";

   // Retrive values from fields
   trainName = $("#train-name").val().trim();
   destination = $("#destination").val().trim();
   firstTrain = $("#first-train").val().trim();
   frequency = $("#frequency").val().trim();

   // Code for the push
   dataRef.ref().push({

    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

 // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
 dataRef.ref().on("child_added", function(childSnapshot) {

   // Log everything that's coming out of snapshot
   console.log(childSnapshot.val().trainName);
   console.log(childSnapshot.val().destination);
   console.log(childSnapshot.val().firstTrain);
   console.log(childSnapshot.val().frequency);

   // full list of items to the well
     $("#train-table > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
     childSnapshot.val().frequency + "</td><td>");

 // Handle the errors
 }, function(errorObject) {
   console.log("Errors handled: " + errorObject.code);
 });

 dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

   // Change the HTML to reflect
   $("#train-name").text(snapshot.val().trainName);
   $("#destination").text(snapshot.val().destination);
   $("#first-train").text(snapshot.val().firstTrain);
   $("#frequency").text(snapshot.val().frequency);
 });




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

