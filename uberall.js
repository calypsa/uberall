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
            height: $('#starmap').height(),
            width: $('#starmap').width()
        };
        var c = document.getElementById("starmap");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, size.width, size.height);
        var starColors = ['#fff', '#ccc', '#999', '#666', '#333'];
        for (var i = 0; i < 5000; i++) {
            var color = starColors[Math.round(Math.random() * starColors.length)];
            ctx.fillStyle = color;
            var pos = {
                x: Math.round(Math.random() * size.width + 1),
                y: Math.round(Math.random() * size.height + 1)
            };
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
