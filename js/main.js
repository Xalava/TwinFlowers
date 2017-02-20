// Web3js
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());
var twinSpirit = web3.eth.contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contributors","outputs":[{"name":"addr","type":"address"},{"name":"amount","type":"uint256"},{"name":"name","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getContributor","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"donatorName","type":"string"}],"name":"openDonation","outputs":[],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]).at("0x8be41da759e242fdf3a01029ef113d3282d7a6c5");

function donatorsList(){
    var donators = twinSpirit.contributors;
    var dolist ="";
    for (var i = donators.length - 1; i >= 0; i--) {
        dolist = dolist +"<li>" + i +" "+	 donators[i].name + " " + donators[i].amount + " ETH </li>";
    };
    return  dolist;
};


window.onload = function() {
    document.getElementById("sculptureName").innerHTML = twinSpirit.getContributor(0);
}


// cn.wio interaction

// Setup 
var humidityPrec = 30;
var temperaturePrec = 30;
var wioToken = "e16195696512ece1c990eb3f3552b24a";

// update values
setInterval(
	function(){ 
    
    // grap list of donors


    document.getElementById("donatorsList").innerHTML = donatorsList();

		$.get("https://cn.wio.seeed.io/v1/node/GroveTempHumD0/humidity?access_token="+wioToken, function(data, status){
        	// alert("Data: " + data + "\nStatus: " + status);
        	var hum = (data.humidity+humidityPrec)/2;

        	$(".hum").html(hum.toString());

			// var valeur&Percent = valeur;
			$('.humidity-bar').css('width',hum +'%');
				if (hum<40){
					$('.humidity-bar').css('background-color',"red");

				}
			humidityPrec = data.humidity;
		
    	});

		$.get("https://cn.wio.seeed.io/v1/node/GroveTempHumD0/temperature?access_token="+wioToken, function(data, status){
    		var temp = (data.celsius_degree+temperaturePrec)/2-2;

			$(".temp").html(temp.toString());

    		$('.temperature-bar').css('width', temp*3+'%');
    		if (temp>30){
					$('.temperature-bar').css('background-color',"red");
				}
			temperaturePrec = data.celsius_degree;	

    	});
			// valeurPrecPrec = valeurPrec;
			// valeurPrec = valeur;

			
	 }

, 500);

window.onload = function() {


			
};


// library
function lacouleurRouge(){
	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/0/0?access_token="+wioToken)


}
function lacouleurBlanche(){
	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/250/250?access_token="+wioToken)


}

function lacouleurVerte(){
	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/0/250/0?access_token="+wioToken)


}

function lacouleurBleu(){
	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/0/0/250?access_token="+wioToken)


}


function letexte(){
		$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/string/0/0/Merci?access_token="+wioToken)

}

function vibration(){


	$.post("https://cn.wio.seeed.io/v1/node/GenericDOutD2/onoff/1?access_token="+wioToken)
	//strombo
	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/10/10?access_token="+wioToken)
	setTimeout(function(){	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/250/10?access_token="+wioToken)
	}, 600);
	setTimeout(function(){	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/10/250?access_token="+wioToken)
	}, 1200);


	setTimeout(function(){
		$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/10/10?access_token="+wioToken)
		setTimeout(function(){	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/250/10?access_token="+wioToken)
		}, 400);
		setTimeout(function(){	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/10/250?access_token="+wioToken)
		}, 800);
		setTimeout(function(){	$.post("https://cn.wio.seeed.io/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/0/0/0?access_token="+wioToken)
		}, 1200);

	},1800);

	//end vibration
 	setTimeout(function(){$.post("https://cn.wio.seeed.io/v1/node/GenericDOutD2/onoff/0?access_token="+wioToken)
	}, 2400);

}




