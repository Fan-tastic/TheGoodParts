$('#Submit').on("click",function(){
    
     var strKey = "strKey"; 
     var storage = window.localStorage; 
     var strValue = document.getElementById("SStopID").value; 
            if (storage) { 
            storage.setItem(strKey, strValue);   
        } else { 
            Cookie.write(strKey, strValue);  
        } 
            if(storage.getItem(strKey)!=null){ 
                alert('Stop ID '+storage.getItem(strKey)+' is stored '); 
            }else if(Cookie.read(strKey)!=null){ 
                alert(Cookie.read(strKey)+' cookie'); 
            } 

 var StID = $('#SStopID').val();
 var theUrl = "http://developer.trimet.org/ws/V1/arrivals/appID/26905EAEEBA02217C9448D594?json=true&locIDs=" + StID;
            $.getJSON(theUrl, function(json){
                console.log(json.resultSet);
                var d1 = new Date(json.resultSet.arrival[0].scheduled);
                var d2 = new Date(json.resultSet.arrival[1].scheduled);
                var time1 = d1.toLocaleTimeString();
                var time2 = d2.toLocaleTimeString();
                var P1Lng = json.resultSet.location[0].lng;
                var P1Lat = json.resultSet.location[0].lat;
                var latlng = new google.maps.LatLng(P1Lat,P1Lng); 
                var myOptions = { 
                    zoom: 14, 
                    center: latlng, 
                    mapTypeId: google.maps.MapTypeId.ROADMAP 
                }; 
                var map = new google.maps.Map(document.getElementById("map"), myOptions); 
                   var trafficLayer = new google.maps.TrafficLayer();
                    trafficLayer.setMap(map);
                var marker = new google.maps.Marker({ 
                    position: latlng, 
                    map: map  
                 
                });                 
                $('#stopID').text('Stop ID: ' + json.resultSet.location[0].locid);
                $('#stopName').text(json.resultSet.location[0].desc);
                $('#fullSign1').text(json.resultSet.arrival[0].fullSign);
                $('#scheduled1').text("Scheduled at: " + time1);
                $('#fullSign2').text(json.resultSet.arrival[1].fullSign);
                $('#scheduled2').text("Scheduled at: " + time2);
                $('#x').text("longitude: " + P1Lng);
                $('#y').text("latitude:  " + P1Lat);
          });
        });

            $('#ShowRoutes').on("click",function(){
            var theUrl2 = "http://developer.trimet.org/ws/V1/RouteConfig/appID/26905EAEEBA02217C9448D594?json=true";
            $('#ShowR').append("<tr><td>RouteNO</td><td>Description</td></tr>");
            $.getJSON(theUrl2, function(json){
                console.log(json.resultSet);
                var routeArray = json.resultSet.route;
                for (var i = 0; i<routeArray.length;i++){
                var RoutesNO = routeArray[i].route;
                var RouteDesc = json.resultSet.route[i].desc;
                console.log(RoutesNO);
                console.log(RouteDesc);                
                $('#ShowR').append("<tr><td>" + RoutesNO + "</td><td>"+ RouteDesc + "</td></tr>");
       }     
    });
 });

function init() { 
    var strKey = "strKey"; 
    var storage = window.localStorage; 
            if(storage.getItem(strKey)!=null){ 
                alert(storage.getItem(strKey)+' was your last input Stop ID'); 
            }else if(Cookie.read(strKey)!=null){ 
                alert(Cookie.read(strKey)+' cookie'); 
            } 

if (navigator.geolocation) { 
//getCurrentPosition 
navigator.geolocation.getCurrentPosition(function (position) { 
var coords = position.coords; 
//latitude longitude
var Clatlng = new google.maps.LatLng(coords.latitude, coords.longitude); 
var CmyOptions = { 
zoom: 14, 
center: Clatlng, 
mapTypeId: google.maps.MapTypeId.ROADMAP //Map type
}; 
//Create Map 
var Cmap = new google.maps.Map(document.getElementById("map"), CmyOptions); 
//Mark on Map
var Cmarker = new google.maps.Marker({ 
position: Clatlng, 
map: Cmap 
}); 
//Open Alert Window 
var CinfoWindow = new google.maps.InfoWindow({ 
content: "CurrentPosition"
}); 
CinfoWindow.open(Cmap, Cmarker); 
}, 
function (error) { 
//Errors 
switch (error.code) { 
case 1: 
alert("The location service to be rejected"); 
break; 
case 2: 
alert("Can't get location information"); 
break; 
case 3: 
alert("Getting the message timeout"); 
break; 
default: 
alert("Unknown error"); 
break; 
} 
}); 
} else { 
alert("Your browser doesn't support HTML5 to obtain location information"); 
} 
}
