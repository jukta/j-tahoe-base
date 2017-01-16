SV.controller('dropdown', function (el) {
    this.on = {};
    var self = this;
    var show = false;

    $(el).find("button").click(function () {
        if (show) {
            self.hide();
        } else {
            self.show();
        }
    });

    $(el).find("li").click(function (e) {
        self.hide();
        var act = $(e.target).attr("action");
        SV.fire(el, act, {});
    });

    this.show = function () {
        $(el).find("ul").show();
        show = true;
        setTimeout(function () {
            $(window).bind("click", clickHandler);
        }, 100);
    };

    this.hide = function () {
        $(el).find("ul").hide();
        show = false;
        $(window).unbind("click", clickHandler);
    };

    var clickHandler = function (e) {
        if (e.target != el && $(el).find(e.target).size() == 0) {
            self.hide();
        }
    }

});