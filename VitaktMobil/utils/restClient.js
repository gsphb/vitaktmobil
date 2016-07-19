(function () {  
app.rest = {
    POST: function(callNumber)
    {
        var message = {
            ClientSource: "VitaktMobil",
            Vertragsnummer: 0,      // Vertragsnummer ist ein int! Darf nicht null sein.
            CallnummerMitCrc: callNumber,
            DeviceOs: device.platform,
            OSversion: device.version,
            AppVersion: app.infoService.viewModel.ActualVersion,
            Mobilnummer: ""
        };
        
        var jsonString = kendo.stringify(message);
        console.log("Sending: " + jsonString);
         $.ajax({
            method: "POST",
            timeout: 8000,
            headers: {
                "Authorization": "Basic " + btoa(global.p.getString() + ":" + global.q.getString()),
                "Accept": "application/json"
            },
            url: app.restURL + '/mobile/activateapp',
            data: jsonString,
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
        })
        .done(function (data) {     // früher success()
            // Nachricht erfolgreich gesendet...
            app.activationService.viewModel.set("Telefonnummer", data.Mobilnummer);
            app.activationService.viewModel.set("Callnummer", data.Callnummer);
            global.isRegistered = true;
            if (app.settingsService.viewModel.ZonenNutzen) {
                // Sicherheitszonen verwenden. Abrufen...
                app.settingsService.viewModel.zonenKonfigAbrufen(function (success, zonesChanged) {
                    if (success) {
                        app.locationService.activateDeactivateGeoWatcher(false);
                    } else {                                // Fehler beim Abruf der Daten
                        // TODO der Umstand muss irgendwie behandelt werden. Der Vorgang muss zeitverzögert wiederholt werden!
                        console.log('Zonenkonfiguration konnte nicht abgefragt werden!');
                    }
                });
            }
        })
        .fail(function (xhr) {      // früher error()
            // Nachricht konnte nicht gesendet werden!
            //var log = kendo.format("{0:yyyy-MM-dd HH:mm:ss}", new Date()) + ': activateApp() Nachricht konnte nicht gesendet werden! Fehler: ' + xhr.status;
            //app.infoService.viewModel.set("Logmessages", log);
        })
        .always(function (xhr, textStatus, jqXHR) {    // früher complete()
            if (jqXHR.status === 200)                // 200 = Success
            {
                setTimeout(function () {
                    app.application.hideLoading();
                    callback(jqXHR.status);
                }, 2000);
            }
            else {
                app.application.hideLoading();
                callback(jqXHR.status);
            }
        });
    }
}
      
})();