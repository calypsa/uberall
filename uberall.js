Galaxies = new Mongo.Collection('Galaxies');

function setPixel(imageData, r, g, b, a) {
    imageData.data[0] = r;
    imageData.data[1] = g;
    imageData.data[2] = b;
    imageData.data[3] = a;
    return imageData;
}

if (Meteor.isClient) {
    Accounts.ui.config({
        forceEmailLowercase: true,
    });
    accountsUIBootstrap3.setLanguage('de');
    Accounts.onLogin(function () {
        // noop
    });

    Template.starmap.onRendered(function () {
        $('#starmap').height($('.footer').offset().top - $('#starmap').offset().top - 20);
        $('#starmap').width($('.navbar').width());
        var size = {
            height: $('#starmap').height(),
            width: $('#starmap').width()
        };
        var c = document.getElementById("starmap");
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, size.width, size.height);
        var img = ctx.createImageData(1, 1);
        for (var i = 0; i < 2500; i++) {
            img.data[0] = 1;
            img.data[1] = 1;
            img.data[2] = 1;
            img.data[3] = Math.round(Math.random() * 127 + 1);
            var pos = {
                x: Math.round(Math.random() * size.width + 1),
                y: Math.round(Math.random() * size.height + 1)
            };
            ctx.putImageData(img, pos.x, pos.y);
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
