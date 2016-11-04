// Web3js
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());
var twinSpirit = web3.eth.contract(
	[{
	    constant: true,
	    inputs: [],
	    name: "title",
	    outputs: [{
	        name: "",
	        type: "string"
	    }],
	    type: "function"
	}]).at("0x0fbd11b5cb42b7351e677d88783eb941f0e5fc5f");


// IOT interaction
var humidityPrec = 30;
var temperaturePrec = 30;

setInterval(
	function(){ 
		$.get("https://iot.seeed.cc/v1/node/GroveTempHumD0/humidity?access_token=1218704a2dba32119cc9dc463462410c", function(data, status){
        	// alert("Data: " + data + "\nStatus: " + status);
        	var hum = (data.humidity+humidityPrec)/2;

        	$(".hum").html(hum.toString());

			// var valeurPercent = valeur;
			$('.humidity-bar').css('width',hum +'%');
			humidityPrec = data.humidity;
		
    	});

		$.get("https://iot.seeed.cc/v1/node/GroveTempHumD0/temperature?access_token=1218704a2dba32119cc9dc463462410c", function(data, status){
    		var temp = (data.celsius_degree+temperaturePrec)/2-1;

			$(".temp").html(temp.toString());

    		$('.temperature-bar').css('width', temp*3+'%');
			temperaturePrec = data.celsius_degree;	

    	});
			// valeurPrecPrec = valeurPrec;
			// valeurPrec = valeur;

			
	 }

, 500);

window.onload = function() {


			
};

function lacouleurRouge(){
	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/0/0?access_token=1218704a2dba32119cc9dc463462410c");


}
function lacouleurBlanche(){
	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/250/250?access_token=1218704a2dba32119cc9dc463462410c");


}

function lacouleurVerte(){
	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/0/250/0?access_token=1218704a2dba32119cc9dc463462410c");


}

function lacouleurBleu(){
	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/0/0/250?access_token=1218704a2dba32119cc9dc463462410c");


}


function letexte(){
		$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/string/0/0/Merci?access_token=1218704a2dba32119cc9dc463462410c");

}

function vibration(){


	$.post("https://iot.seeed.cc/v1/node/GenericDOutD2/onoff/1?access_token=1218704a2dba32119cc9dc463462410c");
	//strombo
	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/10/10?access_token=1218704a2dba32119cc9dc463462410c");
	setTimeout(function(){	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/250/10?access_token=1218704a2dba32119cc9dc463462410c");
	}, 600);
	setTimeout(function(){	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/10/250?access_token=1218704a2dba32119cc9dc463462410c");
	}, 1200);


	setTimeout(function(){
		$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/250/10/10?access_token=1218704a2dba32119cc9dc463462410c");
		setTimeout(function(){	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/250/10?access_token=1218704a2dba32119cc9dc463462410c");
		}, 400);
		setTimeout(function(){	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/10/10/250?access_token=1218704a2dba32119cc9dc463462410c");
		}, 800);
		setTimeout(function(){	$.post("https://iot.seeed.cc/v1/node/GroveLCDRGBI2C0/backlight_color_rgb/0/0/0?access_token=1218704a2dba32119cc9dc463462410c");
		}, 1200);

	},1800);

	//end vibration
 	setTimeout(function(){$.post("https://iot.seeed.cc/v1/node/GenericDOutD2/onoff/0?access_token=1218704a2dba32119cc9dc463462410c");
	}, 2400);

}




