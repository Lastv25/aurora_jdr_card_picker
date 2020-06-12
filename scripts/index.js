

var suits = ["cups", "clubs", "pentacles", "swords"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "P", "Kn", "Q", "Kg"];
var major = ["The Fool", "The Magician", "The High Priest", "The Empress", "The Emperor", "The Hierophant",
                "The Lovers", "The Chariot", "Strenght", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man",
                "Death", "Temperance", "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgment",
                "The World"];


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
	return deck;
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


function Draw(deck, probaR, increment)
{
    const rand = Math.random() < probaR/100;
	var card = deck[pick];
	if (rand == 0){
         var pick = card["Value"] + " " + card["Suit"] + " R";
    } else {
        var pick = card["Value"] + " " + card["Suit"] ;
   }
   console.log(pick);
	return pick;
}