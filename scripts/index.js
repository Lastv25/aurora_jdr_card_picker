
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
var reversed = 0;


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

function getInfosonCard(card_name, reversed)
{
   console.log("Parsing test 3");
   const csvData = Papa.parse("lastv25.github.io/tarot_meaning.csv", {linebreak:"\r\n",
    delimiter: ",",header:true, skipEmptyLines: true,}).data
   console.log(csvData);
   console.log(csvData.filter(data => data.Name === "The Tower")[0].Name);
}

function changeCard(card_name, reverse)
{
    var name = "images/cards/" + card_name + ".jpg";

    if (reverse == 0) {// if reversed
        if (reversed == 1) {// if already reversed
                document.getElementById('imageOnClick').src= name;
        } else {
            document.getElementById('imageOnClick').src= name;
            document.getElementById("imageOnClick").style.transform = "rotate(180deg)";
            reversed = 1;
        }
    } else {
        if (reversed == 1) {// if already reversed
            document.getElementById('imageOnClick').src= name;
            document.getElementById("imageOnClick").style.transform = "rotate(0deg)";
            reversed = 0;
        } else {
            document.getElementById('imageOnClick').src= name;
        }
    }
	console.log("Card Changed");
}

function Draw()
{
    console.log("Draw function called");
    var probaR = getprobaR.value

    const rand = Math.random() < probaR/100;

	if (rand == 0){
        var pick = tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit+ "_R";
        if (tarot_deck[increment].Suit.localeCompare("Major") == 0){ // if major
            changeCard(tarot_deck[increment].Value, 0)
        } else {
            changeCard(tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit, 0)
        }
    } else {
        var pick = tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit ;
        if (tarot_deck[increment].Suit.localeCompare("Major") == 0){ // if major
            changeCard(tarot_deck[increment].Value, 1)
        } else {
            changeCard(tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit, 1)
        }
    }

   increment = increment+1;
   if (increment == 78){
        Reset();
   }
   console.log(pick);
   getInfosonCard(tarot_deck[increment].Value, 1);

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