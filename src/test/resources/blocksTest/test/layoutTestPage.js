SV.controller('popupPanelTest', function (el) {
    this.on = {};
    
    $(el).find("button").click(function () {
       var p = SV.controller($(el).find(".popupPanel"));
        if (p.visible()) {
            p.hide();
        } else {
            p.show();
        }
    });

});
