//Initialize our database
const database = firebase.database();

//Push to database
$("#submitTrain").on("click", function (event) {
    event.preventDefault();

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

    $("#TrainName").val("");
    $("#destinationName").val("");
    $("#firstTrainTime").val("");
    $("#frequencyTrain").val("");
});

//Firebase watcher adds to html after child added
database.ref().on("child_added", function(trainCreated){

    let tFrequency = trainCreated.val().freqTrain;
    let firstTime = trainCreated.val().firstTrain;
    const firstTimeConverted = moment(firstTime,"HH:mm").subtract(1,"years");
    const currentTime = moment();
    const diffTime = moment().diff(moment(firstTimeConverted),"minutes");
    const tRemainder = diffTime % tFrequency;
    const tMinutesTillTrain = tFrequency - tRemainder;
    const nextTrain = moment().add(tMinutesTillTrain,"minutes");
    


    const newRow = $("<tr>");
    newRow.append(`<td> ${trainCreated.val().trainName}</td>`);
    newRow.append(`<td> ${trainCreated.val().destination}</td>`);
    newRow.append(`<td> ${trainCreated.val().firstTrain}</td>`);
    newRow.append(`<td> ${trainCreated.val().freqTrain}</td>`);
    newRow.append(`<td> ${moment(nextTrain).format("hh:mm")}</td>`);
    newRow.append(`<td> ${tMinutesTillTrain}</td>`);
    $("tbody").append(newRow);
});