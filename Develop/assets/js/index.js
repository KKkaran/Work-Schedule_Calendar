console.log("working")
var timeBlockContainer = $(".container")
function createBusinessHours(){
    for(var t=0;t<9;t++){
        var hour = t+9;
        if(hour == 12){
            createTimeBlocks(12,"PM");
        }else if(hour >= 13){
            createTimeBlocks(hour%12,"PM");
        }else{
            createTimeBlocks(hour,"AM")
        }
        

    }
}
//creates the time blocks one by one
function createTimeBlocks(hour,am){
    console.log(`${hour}${am}`)
    var slotContainer = $("<div>").
                        addClass("row  slotcontainer")
    var timeStamp = $("<p>").
                    addClass("col-1 text-right p-3 timestamp").
                    html(`${hour}${am}`)
    var eventEntry = $("<p>").
                    addClass("col-10 bg-danger evententry").
                    html("")
    var updateBtn = $("<button>").
                    addClass("col-1")
                    .html("lock")
    slotContainer.append(timeStamp,eventEntry,updateBtn)
    timeBlockContainer.append(slotContainer)
}



















createBusinessHours();



//get's the current day and date
$("#currentDay").html(moment().format('dddd, MMMM Do'))
