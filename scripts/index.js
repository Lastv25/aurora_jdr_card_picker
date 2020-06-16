
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
var cardNum = 78;


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

function getInfosonCard(data, pick, reversed)
{
   console.log("card Info");
   console.log(pick);
   if (reverse == 0){
        console.log(data.filter(data => data.Name === pick)[0].Name);
        console.log(data.filter(data => data.Name === pick)[0].Negative);
   } else {
        console.log(data.filter(data => data.Name === pick)[0].Name);
        console.log(data.filter(data => data.Name === pick)[0].Positive);
   }
   console.log(data.filter(data => data.Name === pick)[0].Neutral);
}

function parseData(url, cardName, reversed, callBack) {   //papa parse is async so need callback function
    Papa.parse(url, {linebreak:"\r\n",
        delimiter: ",",
        header:true,
        download:true,
        skipEmptyLines: true,
        complete: function(results) {
            //console.log(results.fields);
            callBack(results.data, cardName, reversed);
        }
    });
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

    const rand = Math.random() < (1-probaR/100);

	if (rand == 0){
        var pick = tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit+ "_R";
        if (tarot_deck[increment].Suit.localeCompare("Major") == 0){ // if major
            changeCard(tarot_deck[increment].Value, 0);
            parseData("lastv25.github.io/tarot_meaning.csv", tarot_deck[increment].Value, 0, getInfosonCard);
        } else {
            changeCard(tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit, 0);
            parseData("lastv25.github.io/tarot_meaning.csv", tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit, 0, getInfosonCard);
        }
    } else {
        var pick = tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit ;
        if (tarot_deck[increment].Suit.localeCompare("Major") == 0){ // if major
            changeCard(tarot_deck[increment].Value, 1);
            parseData("lastv25.github.io/tarot_meaning.csv", tarot_deck[increment].Value, 1, getInfosonCard);
        } else {
            changeCard(tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit, 1);
            parseData("lastv25.github.io/tarot_meaning.csv", tarot_deck[increment].Value + "_" + tarot_deck[increment].Suit, 1, getInfosonCard);
        }
    }

   increment = increment+1;
   cardNum = cardNum-1;
   var newText = cardNum.toString()+ " remaining cards";
   document.getElementById("CardsNumber").innerHTML = newText;

   if (increment == 77){
        Reset();
   }
   console.log(pick);

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