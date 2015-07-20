Galaxies = new Mongo.Collection('Galaxies');

if (Meteor.isClient) {
    Accounts.ui.config({
        forceEmailLowercase: true,
    });
    accountsUIBootstrap3.setLanguage('de');
    Accounts.onLogin(function () {
        // noop
    });

    Template.starmap.onRendered(function () {
	var size = {
	    height: Math.round($('.footer').offset().top - $('#starmap').offset().top - 20),
            width: Math.round($('.navbar').width())
	}
	$('#starmap').css('height', size.height);
	$('#starmap').css('width', size.width);
        var c = document.getElementById("starmap");
	c.height = size.height;
	c.width = size.width;
	var ctx = c.getContext("2d");
	ctx.lineWidth = 1;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, size.width, size.height);
	ctx.fillStyle = "#fff";
        for (var i = 0; i < 1000; i++) {
            var pos = {
                x: Math.round(Math.random() * size.width + 1),
                y: Math.round(Math.random() * size.height + 1)
            };
	    ctx.globalAlpha = Math.random();
            ctx.fillRect(pos.x, pos.y, 1, 1);
        }
    });

    Template.footer.helpers({
        galaxyCount: function () {
            return Galaxies.find().count();
        },
        starTime: function () {
            return Session.get('startime');
        }
    });
    setInterval(function () {
        Session.set('startime', Math.round(new Date().getTime() / 1000 + 24 * 365 * 24 * 60 * 60));
    }, 1000);
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}
