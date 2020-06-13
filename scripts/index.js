
// Variables definitions
var suits = ["cups", "clubs", "pentacles", "swords"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "P", "Kn", "Q", "Kg"];
var major = ["The Fool", "The Magician", "The High Priest", "The Empress", "The Emperor", "The Hierophant",
                "The Lovers", "The Chariot", "Strenght", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man",
                "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgment",
                "The World"];

var tarot_deck;  // global deck variable
var increment = 1;
var getDrawButton = document.getElementById('drawButton');
var getShuffleButton = document.getElementById('shuffleButton');

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


function shuffle(deck)
{
	// for 2000 turns
	// switch the values of two random cards
	for (var i = 0; i < 2000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}


function Draw()
{
    console.log("Draw function called");
    var probaR = document.getElementById("probaR");
    console.log(probaR);
    const rand = Math.random() < probaR/100;
    console.log(parseInt(probaR, 10));
    console.log(rand);

	if (rand == 0){
	    console.log(tarot_deck[increment].Value + " " + tarot_deck[increment].Suit+ " R");
        var pick = tarot_deck[increment].Value + " " + tarot_deck[increment].Suit+ " R";
    } else {
        console.log(tarot_deck[increment].Value + " " + tarot_deck[increment].Suit);
        var pick = tarot_deck[increment].Value + " " + tarot_deck[increment].Suit ;
   }

   increment = increment+1;
}


// Events

window.onload = getDeck();
getDrawButton.addEventListener('click', Draw);
getShuffleButton.addEventListener('click', shuffle);