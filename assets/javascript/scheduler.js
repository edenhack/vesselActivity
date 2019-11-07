//Initialize our database
const database = firebase.database();

//Push to database
$("#submitTrain").on("click", function (event) {
    const trainName = $("#TrainName").val().trim();
    const destination = $("#destinationName").val().trim();
    const firstTrain = $("#firstTrainTime").val().trim();
    const freqTrain = $("#frequencyTrain").val().trim();

    database.ref().push({
        trainName,
        destination,
        firstTrain,
        freqTrain,
    });
});

//Firebase watcher adds to html after child added
database.ref().on("child_added", function(trainCreated){
    //log the snapshots
    console.log(trainCreated.val().trainName);
    console.log(trainCreated.val().destination);
    console.log(trainCreated.val().firstTrain);
    console.log(trainCreated.val().freqTrain);

    const newRow = $("<tr>");
    newRow.append(`<td> ${trainCreated.val().trainName}</td>`);
    newRow.append(`<td> ${trainCreated.val().destination}</td>`);
    newRow.append(`<td> ${trainCreated.val().firstTrain}</td>`);
    newRow.append(`<td> ${trainCreated.val().freqTrain}</td>`);
})