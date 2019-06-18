//API key 
var apiKey= "6QlHklQAYdyxsSYBT1vHiN0UGOSifUUb"

//create the array of animals that will display in buttons
var animals = ["dog","cat","fish","pig","dolphin","shark","elephant"]

//function with ajax function to call it and use in on button click and new button click
function ajaxfunction(animal) {
    //query url
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" +apiKey+ "&limit=10"
    //ajax function
    $.ajax({
        url:queryURL,
        method: "GET"
        }) .then(function(response){
            // see inside the response
            console.log(response);
            //lets get array from response
            var apiInformation = response.data;
            //lets go through each value of the array
            for(var i=0;i<apiInformation.length;i++){
                //create div for the image and for the rating; 
                //create div
                var newDiv = $("<div>");
                newDiv.attr("id","div");
                //create p, and add text in rating 
                var newP = $("<p>");
                newP.text("Gif Rating: " + apiInformation[i].rating);
                //create image element and add atrribute SRC to it, still and moving attribute, and append it to div
                var pic = $("<img>");
                pic.attr("src", apiInformation[i].images.fixed_height_still.url);
                pic.attr("data-still",apiInformation[i].images.fixed_height_still.url);
                pic.attr("data-moving",apiInformation[i].images.fixed_height.url);
                pic.attr("status", "still");
                pic.attr("class","gif")
                //append p and append image
                newDiv.append(newP);
                newDiv.append(pic);
                //prepend div to the DIV ID#pic-of-animals in the dom
                $("#pic-of-animals").prepend(newDiv);
            }

            gif();
        });
}

//loop to go thorugh each element of the array with the intention to create buttons for each
for(var i=0;i<animals.length;i++){
    //create buttons for each
    var btn = $("<button>")
    //create attribute names for each so we can use it in the API topic search
    btn.attr("data-animal-name", animals[i])
    //add text to each button 
    btn.text(animals[i]);
    //append each button to the DOM
    $("#list-of-animals").append(btn);
}

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
        $("#user-entry").val("");

        // !!!!!!make New buttons redeem API information as well, copy and paste button function!!!!!
        $(newButton).on("click", function click(){
            //clearing #pic-of-animals
            $("#pic-of-animals").html("");

            var animal = $(this).attr("data-animal-name")
        
            console.log("hola");
    
            ajaxfunction(animal);
        }); 
    }
    }
});
    

//when clicking on each button
$("button").on("click", function click(){
    //clearing #pic-of-animals
    $("#pic-of-animals").html("");
    //get the attribute data-animal-animal
    var animal = $(this).attr("data-animal-name");
    ajaxfunction(animal);
}); 

function gif(){
    //clicking on the pictures
    $(".gif").on("click", function(){
        var status = $(this).attr("status");
        var still = $(this).attr("data-still");
        var moving = $(this).attr("data-moving");
        //when the picture is still
        if (status === "still"){
            $(this).attr("src",moving);
            $(this).attr("status","moving")
        }
        //when the picture is moving
        else if(status==="moving"){
            $(this).attr("src",still);
            $(this).attr("status","still")
        }
    }); 
}

 






