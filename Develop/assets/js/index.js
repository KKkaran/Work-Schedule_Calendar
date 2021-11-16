var timeBlockContainer = $(".container")
//creates hour and call createtimeblocks func to display markup
let tasksHashMap = new Map();
var list = []
var ot = ""
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
                    addClass("col-1 savebtn")
                    .html("lock")
    slotContainer.append(timeStamp,eventEntry,updateBtn)
    timeBlockContainer.append(slotContainer)
}
//local storage function
function setLocalStorage(){
    //listtasks = []//empty the list
    for (const [key, value] of tasksHashMap.entries()) {
        var obj = {}
        obj.id = key
        obj.entry = value
        list.push(obj)
    }
    localStorage.setItem("tasks3",JSON.stringify(list))
}
function getLocalStorage(){
    var t = localStorage.getItem("tasks3")
    //var list = []
    list = JSON.parse(t)

    list.forEach(p =>{
        console.log(p.id,p.entry)
        var id = `#${p.id}`
        console.log($(id).find(".evententry").html(p.entry))
    })
}
//on eventEnrty click,changes to textarea to edit
$(".container").on("click",".evententry", function(){
    var text = $(this).
                html().
                trim()
    ot = text;
    var textarea = $("<textarea>").
                    addClass("eventinput col-10").
                    val(text)
    $(this).closest("div").find(".savebtn").css("background-color","green")
    $(this).closest("div").find(".savebtn").html("Save")

    $(this).replaceWith(textarea)
    textarea.trigger("focus")
})
//when clicked outside, it converts back to default p but wont save
//until the corresponding button is clicked
$(".container").on("blur","textarea", function(){
    var text = $(this).
                val().
                trim()
    if(ot === text){//no change made in text entry
        $(this).closest("div").find(".savebtn").css("background-color","lightgrey")
        $(this).closest("div").find(".savebtn").html("lock")

    }

    var eventEntry = $("<p>").
                    addClass("col-10 bg-danger evententry").
                    html(text)             
    $(this).replaceWith(eventEntry)    
})
$(".container").on("click","button",function(){

    var key = $(this).closest("div").attr("id")
    var value = $(this).closest("div").find(".evententry").html()
    
    //send it to local storage!!
    if(value === ot){

    }else{
        tasksHashMap.set(key,value)
        $(this).closest("div").find(".savebtn").css("background-color","lightgrey")
        $(this).closest("div").find(".savebtn").html("lock")

    }


    setLocalStorage()
    //console.log(tasksHashMap.entries())
})
















createBusinessHours();
getLocalStorage()


//get's the current day and date
$("#currentDay").html(moment().format('dddd, MMMM Do'))










//*****************GOOD TO KNOW STUFF************************************************** */

// document.querySelector(".container").addEventListener("click",function(e){

//     if(e.target.matches("button")){
//         console.log(e.target.closest("div").querySelector(".evententry").innerHTML)
//     }
// })


