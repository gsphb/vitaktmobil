'use strict';

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            console.log(device)
            if (device.platform === "Android" && device.version > 4.0 ||
                device.platform === "iOS" && device.version > 6.1) 
            {
                    app.state.set('isSupported', true);
            }
            else 
            {
                    app.state.set('isSupported', false);
            }  
        }, false);
    }
    else 
    {
        app.state.set('isSupported', false);
    } 
})();
// END_CUSTOM_CODE_homeView




// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_kendoUiMobileApp