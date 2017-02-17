SV.controller('pageLayout', function (el) {
    this.on = {};

    var children = $(el).children();
    var cNum = 0;
    var colTempl = $("<div class='column'></div>");
    var panTempl = $("<div class='wrp'></div>");
    $(el).html(colTempl.clone());

    var rebuild = function () {
        var w = $(el).outerWidth();
        var w1 = $(el).find(".column").outerWidth();
        var colNum = Math.floor(w / w1);

        if (cNum == colNum) return;
        $(el).html(colTempl.clone());
        for (var i = 0; i < colNum - 1; i++) {
            $(el).append(colTempl.clone());
        }
        var cols = $(el).find(".column");
        for (var j = 0; j < children.length; j++) {
            $(cols[j % colNum]).append(panTempl.clone().html(children[j]));
            SV.initControllers($(children[j]));
        }
        cNum = colNum;
    };

    $(window).resize(function () {
        rebuild();
    });

    rebuild();

});

SV.controller('splitLayout', function (el) {
    this.on = {};
    var hold = false;
    var divider = $(el).find(".divider");
    var leftPane = $(el).find(".left-pane");
    var rightPane = $(el).find(".right-pane");
    var dividerWidth = divider.outerWidth();

    divider.mousedown(function (e) {
        hold = true;
        leftPane.addClass("no-select");
        rightPane.addClass("no-select");
        $(window).bind("mousemove", moveHandler);
        $(window).bind("mouseup", upHandler);
    });

    var upHandler = function (e) {
        $(window).unbind("mouseup", upHandler);
        $(window).unbind("mousemove", moveHandler);
        leftPane.removeClass("no-select");
        rightPane.removeClass("no-select");
        hold = false;
    };

    var moveHandler = function (e) {
        var pos = e.pageX - $(el).position().left;
        var w = $(el).innerWidth();
        if (pos <= 0) {
            pos = 0;
        } else if (pos >= w - dividerWidth) {
            pos = w - dividerWidth;
        }
        divider.css('left', pos);
        leftPane.width(pos);
        rightPane.width(w - pos - dividerWidth);
    };

    var handlePanes = function () {
        var w = $(el).innerWidth();
        var pos = divider.position().left;
        if (pos > w) {
            divider.css('left', w - dividerWidth);
        }
        leftPane.width(pos);
        rightPane.width(w - pos - dividerWidth);
    };

    $(window).resize(function () {
        handlePanes();
    });

    handlePanes();
});

SV.controller('popupPanel', function (el) {
    this.on = {};
    var self = this;
    var show = false;

    this.visible = function () {
        return show;
    };

    this.show = function () {
        $(el).show();
        show = true;
        setTimeout(function () {
            $(window).bind("click", clickHandler);
        }, 100);
    };

    this.hide = function () {
        $(el).hide();
        show = false;
        $(window).unbind("click", clickHandler);
    };

    var clickHandler = function (e) {
        if (e.target != el && $(el).find(e.target).size() == 0) {
            self.hide();
        }
    }

});

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