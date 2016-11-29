

// ----global variables-----

//number of deaths per year
var deathsNum;

//empty HTML string 
var htmlStr= "";

//start x and y positions for sinking boats 
var xval=50;
var yval=200;

//number of floating boats
var j;

//number of sinking boats
var sinkingBoats;

var space = 16;       // space between each boat in the wave 
var w;                // Width of the boats' wave (their movement)
var theta = 0.0;      // Angle of boats' wave
var amplitude = 40.0; // Height of boat's wave
var period = 500.0;   // Number of pixels for each period
var plus;             // Value for incrementing x
var y_values; 

// function to add the death toll to the screen once a button is clicked
function makeHTMLd(deaths, year){
  htmlStr="";
  htmlStr+="<div class= 'Numbers'>";
  htmlStr+= "<h4>" + "Death Toll: " + deaths +"</h4>" ;
  htmlStr+= "</div>";
  $('#Numbers').html(htmlStr);
}

/* function to requestdata from the UNHCR
Takes one parameter, the year, and returns the refugee death toll of that year */
function deaths(year) {
    // the URL to the UNHCR data 
    var url = "http://data.unhcr.org/api/stats/mediterranean/deaths.json";
    //Adding the 'year' parameter to the search query
    url += '?' + $.param({
      'year': year,
      
    });
    //Make the ajax call
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',

      error: function(error){
        console.log(error);
      },
      success: function(data){
        /* Get the value of the first property of the object returned(number of deaths)
        Then Call the function makeHTMLd to add the death toll to the screen 
        */
        deathsNum= data[0].value;
        console.log("deaths:", deathsNum);
        makeHTMLd(deathsNum, year);
        
      }
        });

}

// *Usage of the perlin noise to create a wave is adapted from Daniel Shiffman's example

//the starting x and y position of the boats
var xpos = 0;
var ypos= 400;

//variable storing the velocity of the boats
var velocity=2;

//second dimension for noise wave (to create a 2D noise)
var yoff = 0.0;        

//variable to storing the year to get the data for
var current;

function setup() {

  //Create canvas and load boat image
  createCanvas(windowWidth, windowHeight);
  img = loadImage("boat.png");

  //Assign a width for the boats' wave movement
  w = windowWidth+16;
  //assign the value for incrementing x
  plus = (TWO_PI / period) * space;

  //array storing y values of the boats' wave 
  y_values = new Array(floor(w/space));
 
  /*
  function that takes in the year according to the clicked button, 
   retrieves the death toll of that year,
   and sets the 'current' variable to that year
  */
  function displayInfo(year){
       console.log(year);
       deaths(year);
       current=year;
         
  }

  // functions for each button click 
  
  $('#button2010').click(function(){
      displayInfo(2010);
  });

  $('#button2011').click(function(){
      displayInfo(2011);
  });

  $('#button2012').click(function(){
      displayInfo(2012);
  });

  $('#button2013').click(function(){
      displayInfo(2013);
  });

  $('#button2014').click(function(){
      displayInfo(2014);
  });

  $('#button2015').click(function(){
      displayInfo(2015);
  });

  $('#button2016').click(function(){
      displayInfo(2016);
  });
  
}


function draw() {
  background(156,156,156);

  
  /* increment the variable for the x position by the current velocity
  to cause the boats to move horizontally  */
  xpos = xpos + velocity;
 
  // Assign the color of the noise wave (sea waves) 
  fill(0,105,148);
 
  // start recording vertices to begin drawing the noise wave 
  beginShape(); 
  
  //Initialize x offset (first dimension) at the start of every row (as y offset increases)
  var xoff = 0;     
  
  
  for (var x = 0; x <= windowWidth; x += 15) {

    //assign the original number of floating points
    j=18;
    var y;

    //change the wave according to the data gotten for each year  
    switch(current) {
      case 2010:
          /* 1.use the noise function, which generates smooth gradients
            using the Perlin Noise function, to create a wave
            2. use the map funtion to map the result of the noise function
            from the old range to the new specified one
          */
          y = map(noise(xoff, yoff), 0, 1, 300,200);
          break;
      case 2011:
          y = map(noise(xoff, yoff), 0, 2, 50,700);
          j=j-6;
          break;
      case 2012:
           y = map(noise(xoff, yoff), 0, 2, 100,500);
          j=j-2;
          break;
      case 2013:
           y = map(noise(xoff, yoff), 0, 2, 100,600);
          j=j-3;
          break;
      case 2014:
           y = map(noise(xoff, yoff), 0, 2, 50,800);
          j=j-15;
          break;
      case 2015:
            y = map(noise(xoff, yoff), 0, 2, 50,850);
           j=j-16;
           break;
      case 2016:
            y = map(noise(xoff, yoff), 0, 2, 10,900);
           j=j-18;
           break;
      default:
          y= map(noise(xoff, yoff), 0, 1, 300,200);


}
 
    //variable storing the number of boats that sank   
    sinkingBoats= (18-j);
    console.log(sinkingBoats);  

    vertex(x, y); 
    
    //increment x offset 
    xoff += 0.05;
    }

    // increment y offset after each row is done
    yoff+= 0.01;
       
    //asign vertices for the wave 
    vertex(width, height+100);
    vertex(0, height);


    // Stop recording vertices for the sea wave, and draw it
    endShape(CLOSE);

   //----Sinking boat movement----
    
    //increment the positions of the sinking boats
    xval = xval + 2;
    yval= yval +2;
         
      
    for (var b=0; b<sinkingBoats; b++){
      //increment both the x and y position of the boats to show sinking
      image(img, xval+b*random(95,100), yval+b*20, 50, 50);
    } 

    //Place remaining boats in random positions, and create their wave-movement
    for (var i=0; i<=j; i++){
      if (Math.floor(i/2)===(i/2) & Math.floor(i/3)!==(i/3)){
        ypos=300;
      }
      if (Math.floor(i/3)===(i/3) & Math.floor(i/2)!==(i/2)){
        ypos=450;
      }
      if (Math.floor(i/5)===(i/5)){
        ypos=500;
      }
      if (Math.floor(i/3)===(i/3) & Math.floor(i/2)===(i/2)){
        ypos=350;
      }
      calcWave(21-j);
      drawWave(i);
    }       

} 

function calcWave(num) {
  // Increment theta according to the number of remaining boats
  
  theta += (0.0007*num);

  /* Perform the sine function on each x, 
  and store the result in y_values array */

  var x = theta;
  for (var i = 0; i < y_values.length; i++) {
    y_values[i] = sin(x)*amplitude;
    x+=plus;
      
  }
}

function drawWave(i) {
  // Draw the wave, which consists of the remaining boats at each location 
  for (var x = 0; x<i; x++) {
  image(img, i*4*space, ypos+y_values[i], 50, 50);
  }
}
 



