'use strict';

    
app.location = kendo.observable({   
    map: null,
    currentLocation: null
});
    
function loadMap() {  
    var mapOptions = {
      zoom: 8,
      center: new google.maps.LatLng(52.262822, 7.453923),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };                       
            
    app.location.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  
    $('#map-canvas').css('height', $(window).height() - 49);    
    
    placeMarker();
}

function placeMarker(){         
    navigator.geolocation.getCurrentPosition(function(position) {            
        app.location.currentLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);      
        app.location.map.panTo(app.location.currentLocation)

        new google.maps.Marker({
            map: app.location.map,
            position:  app.location.currentLocation,
            animation: google.maps.Animation.DROP
        });
    }, 
    function(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    });
}

// START_CUSTOM_CODE_contactsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    if (window.cordova) {
        document.addEventListener('deviceready', function() {
             
            
        }, false);
    }
    
    /*app.contactsView.set('title', 'Contacts');
    
    var dataSource = new kendo.data.DataSource({
        data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
    });
    
    app.contactsView.set('dataSource', dataSource);
    app.contactsView.set('alert', function (e) { alert(e.data.name); });*/
    
})();
// END_CUSTOM_CODE_contactsView