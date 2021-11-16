var timeBlockContainer = $(".container")
//creates hour and call createtimeblocks func to display markup
let tasksHashMap = new Map();
var listtasks = []
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
    
    var slotContainer = $("<div>").
                        addClass("row  slotcontainer")
                        .attr("id",hour)
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
//local storage function
function setLocalStorage(){
    
    console.log(listtasks)
    localStorage.setItem("tasks3",JSON.stringify(listtasks))
}
//on eventEnrty click,changes to textarea to edit
$(".container").on("click",".evententry", function(){
    var text = $(this).
                html().
                trim()
    var textarea = $("<textarea>").
                    addClass("eventinput col-10").
                    val(text)
    $(this).replaceWith(textarea)
    textarea.trigger("focus")
})
//when clicked outside, it converts back to default p but wont save
//until the corresponding button is clicked
$(".container").on("blur","textarea", function(){
    var text = $(this).
                val().
                trim()
    var eventEntry = $("<p>").
                    addClass("col-10 bg-danger evententry").
                    html(text)             
    $(this).replaceWith(eventEntry)    
})
$(".container").on("click","button",function(){

    var key = $(this).closest("div").attr("id")
    var value = $(this).closest("div").find(".evententry").html()
    
    //send it to local storage!!
    tasksHashMap.set(key,value)
    for (const [key, value] of tasksHashMap.entries()) {
        var obj = {}
        obj.id = key
        obj.entry = value
      }
    listtasks.push(obj)
    setLocalStorage()
    //console.log(tasksHashMap.entries())
})
















createBusinessHours();



//get's the current day and date
$("#currentDay").html(moment().format('dddd, MMMM Do'))










//*****************GOOD TO KNOW STUFF************************************************** */

// document.querySelector(".container").addEventListener("click",function(e){

//     if(e.target.matches("button")){
//         console.log(e.target.closest("div").querySelector(".evententry").innerHTML)
//     }
// })


