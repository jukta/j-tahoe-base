SV.controller('tabsPanel', function (el) {
    this.on = {};
    var self = this;
    
    var tab = $(el).find(".tab").first();
    tab.addClass("selected");


    var tabs = $(el).find(".tabContent").hide();

    // for (var i = 0; i < tabs.length; i++) {
    //     if (selected != $(tabs[i]).attr()) {
    //         $(tabs[i]).hide();
    //     } else {
    //         $(tabs[i]).show();
    //     }
    // }
    
    this.on["tab"] = function(data, next) {
        var name = $(data.target).attr("name");
        self.select(name);
    };
    
    this.select = function (name) {
        if (name == self.selected) return;
        $(el).find(".tab[name='" + self.selected + "']").removeClass("selected");
        $(el).find(".tabContent[name='" + self.selected + "']").hide();
        self.selected = name;
        $(el).find(".tab[name='" + self.selected + "']").addClass("selected");
        $(el).find(".tabContent[name='" + self.selected + "']").show();
    };

    this.select(tab.attr("name"));

});