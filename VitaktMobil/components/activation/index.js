'use strict';

app.activation = kendo.observable({  
    callnumber: null,
    onActivateClick: function() {
        activateApp(app.activation.callnumber,
            function()
            {
                
            }, 
            function(errorCode)
            {
                console.log("Error in activation: " + errorCode)
            }
        );
        
        localStorage["isActivated"] = true;
        app.mobileApp.navigate('components/notruf/view.html');
    },
    onCallVitaktClick: function() {
        console.log("Call");
    },
});

function activateApp(callNumber, onSuccess, onError) 
{
    if (callNumber === null || callNumber <= 0) {
        onError(-1);
        return;
    }
    
    console.log("Activating with " + callNumber);

    app.rest.POST(callNumber);


}

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {    
    app.state.set('isActivated', localStorage["isActivated"] === "true");
})();
// END_CUSTOM_CODE_homeView