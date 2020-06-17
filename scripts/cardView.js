
// Variables definitions
var suits = ["cups", "clubs", "pentacles", "swords"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "P", "Kn", "Q", "Kg"];
var major = ["The Fool", "The Magician", "The High Priest", "The Empress", "The Emperor", "The Hierophant",
                "The Lovers", "The Chariot", "Strenght", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man",
                "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgment",
                "The World"];

var tarot_deck;  // global deck variable
var cardSelection = document.getElementById("cardSelector");


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

	// populating dropdown menu
	var cardSelect = document.getElementById("cardSelector");
	for(index in tarot_deck) {
        if (tarot_deck[index].Suit.localeCompare("Major") == 0){ // if major
            cardSelect.options[cardSelect.options.length] = new Option(tarot_deck[index].Value, index);
        } else {
            cardSelect.options[cardSelect.options.length] = new Option(tarot_deck[index].Value+"_"+tarot_deck[index].Suit, index);
        }
    }
    console.log("Menu populated");
}

function getInfosonCard(data, pick)
{

   var cardInfos = pick+"<br>";
   console.log("card Info");

   console.log("Positive");
   console.log(data.filter(data => data.Name === pick)[0].Positive);
   cardInfos = cardInfos +"<br>" + "Positive attributes: <br>" + data.filter(data => data.Name === pick)[0].Positive;
   console.log("Negative");
   console.log(data.filter(data => data.Name === pick)[0].Negative);
   cardInfos = cardInfos +"<br>" + "Negative attributes: <br>" + data.filter(data => data.Name === pick)[0].Negative;
   console.log(data.filter(data => data.Name === pick)[0].Neutral);
   cardInfos = cardInfos +"<br>Neutral Attributes: <br>"+data.filter(data => data.Name === pick)[0].Neutral;
   document.getElementById("CardInfo").innerHTML = cardInfos;

}

function parseData(url, cardName, callBack) {   //papa parse is async so need callback function
    Papa.parse(url, {linebreak:"\r\n",
        delimiter: ",",
        header:true,
        download:true,
        skipEmptyLines: true,
        complete: function(results) {
            //console.log(results.fields);
            callBack(results.data, cardName);
        }
    });
}

function changeCard(card_name)
{
    var name = "images/cards/" + card_name + ".jpg";

    document.getElementById('imageOnClick').src= name;
	console.log("Card Changed");
}


function test()
{
    console.log("test function");
    console.log(cardSelection.options[cardSelection.selectedIndex].text);
    changeCard(cardSelection.options[cardSelection.selectedIndex].text);
    parseData("lastv25.github.io/tarot_meaning.csv", cardSelection.options[cardSelection.selectedIndex].text, getInfosonCard);
}

function Reset()
{
    console.log("Reset function called");
    tarot_deck = getDeck();
    increment = 0;
}

// Events

window.onload = getDeck();
cardSelection.addEventListener("click", test);