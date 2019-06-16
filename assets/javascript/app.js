//API key 
var apiKey= "6QlHklQAYdyxsSYBT1vHiN0UGOSifUUb"

//create the array of animals that will display in buttons
var animals = ["dog","cat","fish","pig","dolphin","shark","elephant"]


//loop to go thorugh each element of the array with the intention to create buttons for each
for(var i=0;i<animals.length;i++){
    //create buttons for each
    var btn = $("<button>")
    //create attribute names for each so we can use it in the API topic search
    btn.attr("data-animal-name", animals[i])
    //add text to each button 
    btn.text(animals[i]);
    //append each button to the DOM
    $("#list-of-animals").append(btn);}


//work on creating new buttons from user input: 
$("#submit").on("click",function(){
    //prevent page to refresh
    event.preventDefault();
    //get value user entered, and trim white spaces;
    var val = $("#user-entry").val().trim();
    console.log(val);
    if (val !==""){
    console.log(animals);
    //create button and add atribute to the button
    if(!animals.includes(val)){
    //testing the new animals have been added   
    animals.push(val);
    console.log(animals);
    //creating button for new animals
    var newButton= $("<button>")
    //and adding atributes to this buttons...
    newButton.attr("data-animal-name", val)
    //and text...
    newButton.text(val);
    //append each button to the DOM
    $("#list-of-animals").append(newButton);

    // !!!!!!make New buttons redeem API information as well, copy and paste button function!!!!!
    $(newButton).on("click", function click(){
            //clearing #pic-of-animals
        $("#pic-of-animals").html("");
        
        console.log("hola");
        
        var animal = $(this).attr("data-animal-name")
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" +apiKey+ "&limit=10"
        //ajax function
        $.ajax({
            url:queryURL,
            method: "GET"
            }) .then(function(response){
            // see inside the response
            console.log(response);
            
            //lets get arrayfrom response
            var apiInformation = response.data;
            //lets go through each value of the array
            for(var i=0;i<apiInformation.length;i++){
            //create div for the image and for the rating; 
            //create div
            var newDiv = $("<div>");
            //create p, and append rating 
            var newP = $("<p>");
            newP.text(apiInformation[i].rating);
            //create image element and add atrribute SRC to it, append it to div
            var pic = $("<img>");
            pic.attr("src", apiInformation[i].images.fixed_height_still.url);
            pic.attr("data-still",apiInformation[i].images.fixed_height_still.url);
            pic.attr("data-moving",apiInformation[i].images.fixed_height.url);
            pic.attr("status", "still");
            pic.attr("class","gif")
            newDiv.append(newP);
            newDiv.append(pic);
            //prepend div to the DIV ID#pic-of-animals in the dom
            $("#pic-of-animals").prepend(newDiv);
            }

            gif();
            });
        }); 
}
}
});
    




ajaxApi();

   


function ajaxApi(){
    //when clicking on each button
$("button").on("click", function click(){
    //clearing #pic-of-animals
$("#pic-of-animals").html("");

console.log("hola");
    var animal = $(this).attr("data-animal-name")

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" +apiKey+ "&limit=10"
//ajax function
$.ajax({
    url:queryURL,
    method: "GET"
    }) .then(function(response){
    // see inside the response
    console.log(response);
    
    //lets get arrayfrom response
    var apiInformation = response.data;
    //lets go through each value of the array
    for(var i=0;i<apiInformation.length;i++){
    //create div for the image and for the rating; 
    //create div
    var newDiv = $("<div>");
    //create p, and append rating 
    var newP = $("<p>");
    newP.text(apiInformation[i].rating);
    //create image element and add atrribute SRC to it, append it to div
    var pic = $("<img>");
    pic.attr("src", apiInformation[i].images.fixed_height_still.url);
    pic.attr("data-still",apiInformation[i].images.fixed_height_still.url);
    pic.attr("data-moving",apiInformation[i].images.fixed_height.url);
    pic.attr("status", "still");
    pic.attr("class","gif")
    newDiv.append(newP);
    newDiv.append(pic);
    //prepend div to the DIV ID#pic-of-animals in the dom
    $("#pic-of-animals").prepend(newDiv);  
         // conditionals to play or stop when clicking on them: 

    }

    gif();
    

    });

}); 
         

}

function gif(){

$(".gif").on("click", function(){
    console.log("hola");
  var status = $(this).attr("status");
  var still = $(this).attr("data-still");
  var moving = $(this).attr("data-moving");

  if (status === "still"){
      $(this).attr("src",moving);
      $(this).attr("status","moving")
  }
  else if(status==="moving"){
      $(this).attr("src",still);
      $(this).attr("status","still")

  }


}); 

}

 






