let url = "https://striveschool-api.herokuapp.com/api/product/";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id"); 
    let sezioneProdotti = document.getElementById("prodotti");

    fetch(`${url}${id}`, {
        headers: {
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3NjEyMzdmNmI0YjAwMTU0MjhmZGUiLCJpYXQiOjE3MTgzOTEzNDQsImV4cCI6MTcxOTYwMDk0NH0.c3dO6wqYRyeAPbLerUCzPVjiB3qM_Zl4AEsk_Sp_Ky0",
            "content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        // Aggiungi prodotto
        sezioneProdotti.innerHTML = `
        <h1 CLASS="text-center pt-4 pb-4">DETTAGLI PRODOTTO</h1>
          <h2 class="card-title">${data.name}</h2>
          <div class="card mb-3" style="max-width: 2000px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.imageUrl}" class="img-fluid rounded-start" alt="${data.id}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h2 class="card-title">${data.name}</h2>
        <p class="card-text"><small class="text-body-secondary">${data.description}</small></p>
        <p class="card-text">${data.price} € iva inclusa.</p>
      </div>
    </div>
  </div>
</div>  `;

           
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        sezioneProdotti.innerHTML = `<p>Errore nel caricamento del prodotto</p>`;
    });
});

var SCROLLER_LENGTH = 60;
var HEIGHT = 7;
var theInput = $('#theInput');
var fps = 30;

var myMessage = textToLED('spedizione -- gratuita ');
var leftPointer = SCROLLER_LENGTH + 1;
var rightPointer = 0;
var furthestLeftPoint = 0 - myMessage.length;

theInput.change(function(){
  clearLights();
  myMessage = textToLED(this.value);
  furthestLeftPoint = 0 - myMessage.length;
  leftPointer = SCROLLER_LENGTH + 1;
});

function clearLights(){
  var lightsOn = $('.on');
  lightsOn.removeClass('on');
  lightsOn.addClass('off');
}
function setLight(row, col, state){
  var theLight = $('.'+row+'_'+col);
  
  if(theLight.hasClass('on') && !state){
    theLight.removeClass('on');
    theLight.addClass('off');
  }else if(theLight.hasClass('off') && state){
    theLight.removeClass('off');
    theLight.addClass('on');
  }
}

function drawMessage(messageArray, leftPointer){
  var messageLength = messageArray.length;
  var totalScrollLength = SCROLLER_LENGTH + messageLength;
  
  if(messageLength>0){
    
		for(var col=0;col<messageLength;col++){
      for(var row=0;row<HEIGHT;row++){
        var offsetCol = leftPointer + col;
        
        if(offsetCol<SCROLLER_LENGTH || offsetCol >= 0){
          setLight(row,offsetCol,messageArray[col][row]);
        }
        
      }
    }
    
  }
}

function textToLED(theWord){
  var theMessage = [];
  theWord = theWord.toUpperCase();
  for(var i=0;i<theWord.length;i++){
    theMessage.push(charToLED(theWord.charAt(i)));
    theMessage.push(charToLED());
  }
  
  var flatten = [];
  flatten = flatten.concat.apply(flatten, theMessage);
  
  return flatten;
}

function charToLED(theChar){
  var theLed = [];
	switch(theChar){
    case 'A' :
      theLed = [[false, false, true, true, true, true, true], 
                [false, true, false, false, true, false, false], 
                [true, false, false, false, true, false, false],
                [false, true, false, false, true, false, false],
                [false, false, true, true, true, true, true]];
      break;
    case 'B' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [false, true, true, false, true, true, false]];
      break;
		case 'C' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, false, false, false, true, false]]; 
      break;
     case 'D' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, true, true, true, true, false]]; 
      break;
    case 'E' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, false, false, false, true]];
      break;
    case 'F' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, false, false, false, false]];
      break;
    case 'G' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, true, false, true],
                [true, true, false, false, true, true, true]];
      break;
    case 'H' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, false, true, false, false, false],
                [false, false, false, true, false, false, false],
                [false, false, false, true, false, false, false],
                [true, true, true, true, true, true, true]];
      break;
    case 'I' :
      theLed = [[false, false, false, false, false, false, false], 
                [true, false, false, false, false, false, true],
                [true, true, true, true, true, true, true],
                [true, false, false, false, false, false, true],
                [false, false, false, false, false, false, false]];
      break;
    case 'J' :
      theLed = [[false, false, false, false, false, true, false], 
                [false, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, true, true, true, true, true, false],
                [true, false, false, false, false, false, false]];
      break;  
 	 case 'K' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, false, true, false, false, false],
                [false, false, true, false, true, false, false],
                [false, true, false, false, false, true, false],
                [true, false, false, false, false, false, true]];
      break;
 	 case 'L' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true]];
      break;
 	 case 'M' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, true, false, false, false, false, false],
                [false, false, true, false, false, false, false],
                [false, true, false, false, false, false, false],
                [true, true, true, true, true, true, true]];
      break;
 	 case 'N' :
      theLed = [[true, true, true, true, true, true, true], 
                [false, false, true, false, false, false, false],
                [false, false, false, true, false, false, false],
                [false, false, false, false, true, false, false],
                [true, true, true, true, true, true, true]];
      break;
 	 case 'O' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [true, false, false, false, false, false, true],
                [false, true, true, true, true, true, false]];
      break;
 	 case 'P' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [false, true, true, false, false, false, false]];
      break;
 	 case 'Q' :
      theLed = [[false, true, true, true, true, true, false], 
                [true, false, false, false, false, false, true],
                [true, false, false, false, true, false, true],
                [true, false, false, false, false, true, false],
                [false, true, true, true, true, false, true]];
      break;
 	 case 'R' :
      theLed = [[true, true, true, true, true, true, true], 
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [true, false, false, true, false, false, false],
                [false, true, true, false, true, true, true]];
      break;
 	 case 'S' :
      theLed = [[false, true, true, false, false, false, true], 
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, true, false, false, true],
                [true, false, false, false, true, true, false]];
      break;
 	 case 'T' :
      theLed = [[true, false, false, false, false, false, false], 
                [true, false, false, false, false, false, false],
                [true, true, true, true, true, true, true],
                [true, false, false, false, false, false, false],
                [true, false, false, false, false, false, false]];
      break;
 	 case 'U' :
      theLed = [[true, true, true, true, true, true, false], 
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, false, true],
                [true, true, true, true, true, true, false]];
      break;
 	 case 'V' :
      theLed = [[true, true, true, true, true, false, false], 
                [false, false, false, false, false, true, false],
                [false, false, false, false, false, false, true],
                [false, false, false, false, false, true, false],
                [true, true, true, true, true, false, false]];
      break;
 	 case 'W' :
      theLed = [[true, true, true, true, true, true, false], 
                [false, false, false, false, false, false, true],
                [false, false, false, false, true, true, false],
                [false, false, false, false, false, false, true],
                [true, true, true, true, true, true, false]];
      break;
 	 case 'X' :
      theLed = [[true, false, false, false, false, false, true], 
                [false, true, true, false, true, true, false],
                [false, false, false, true, false, false, false],
                [false, true, true, false, true, true, false],
                [true, false, false, false, false, false, true]];
      break;
 	 case 'Y' :
      theLed = [[true, false, false, false, false, false, false], 
                [false, true, false, false, false, false, false],
                [false, false, true, true, true, true, true],
                [false, true, false, false, false, false, false],
                [true, false, false, false, false, false, false]];
      break;
 	 case 'Z' :
      theLed = [[true, false, false, false, false, true, true], 
                [true, false, false, false, true, false, true],
                [true, false, false, true, false, false, true],
                [true, false, true, false, false, false, true],
                [true, true, false, false, false, false, true]];
      break;
    default:
      theLed = [[false, false, false, false, false, false, false]];
  }  
  return theLed;
}


function draw() {
	setTimeout(function() {
		requestAnimationFrame(draw);
    
    	 if(leftPointer==furthestLeftPoint){
        	leftPointer = SCROLLER_LENGTH + 1;
       }
    
       drawMessage(myMessage, leftPointer);
       leftPointer--;     
			
	}, 1000 / fps);
}

draw();