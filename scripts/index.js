
// Variables definitions
var suits = ["cups", "clubs", "pentacles", "swords"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "P", "Kn", "Q", "Kg"];
var major = ["The Fool", "The Magician", "The High Priest", "The Empress", "The Emperor", "The Hierophant",
                "The Lovers", "The Chariot", "Strenght", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man",
                "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgment",
                "The World"];

var tarot_deck;  // global deck variable
var increment = 0;
var getDrawButton = document.getElementById('drawButton');
var getShuffleButton = document.getElementById('shuffleButton');
var getprobaR = document.getElementById("probaR");

// Functions definitions
function getDeck()
{
	var deck = new Array();

	for(var i = 0; i < suits.length; i++)
	{
		for(var x = 0; x < values.length; x++)
		{
			var card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}

    for(var i = 0; i < major.length; i++)
	{
		var card = {Value: major[i], Suit: "Major"};
		deck.push(card);
	}
	console.log("Deck Created");
	tarot_deck = deck;
}


function shuffle()
{
	// for 2000 turns
	// switch the values of two random cards
	for (var i = 0; i < 2000; i++)
	{
		var location1 = Math.floor((Math.random() * tarot_deck.length));
		var location2 = Math.floor((Math.random() * tarot_deck.length));
		var tmp = tarot_deck[location1];

		tarot_deck[location1] = tarot_deck[location2];
		tarot_deck[location2] = tmp;
	}
	console.log("Deck Shuffeled");
}


function Draw()
{
    console.log("Draw function called");
    var probaR = getprobaR.value

    const rand = Math.random() < probaR/100;

	if (rand == 0){
        var pick = tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit+ "_R";
    } else {
        var pick = tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit ;
   }

   increment = increment+1;
   if (increment == 78){
        Reset()
   }
   console.log(pick)
}


function Reset()
{
    console.log("Reset function called");
    tarot_deck = getDeck();
    increment = 0;
}

// Events

window.onload = getDeck();
getDrawButton.addEventListener('click', Draw);
getShuffleButton.addEventListener('click', shuffle);
getprobaR.addEventListener('keyup', function(){
        var probaR = getprobaR.value;
      });