'use strict';

app.notruf = kendo.observable({  
    isActivated: false,
    onShow: function() {console.log("Test");},
    afterShow: function() {},
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.notruf.set('title', 'Home');   
    app.notruf.set('onNotrufClick', function (e) { console.log(e); 
    app.openLink("http://www.google.de"); });  
})();
// END_CUSTOM_CODE_homeView