Galaxies = new Mongo.Collection('Galaxies');

if (Meteor.isClient) {
    Accounts.ui.config({
        forceEmailLowercase: true,
    });
    accountsUIBootstrap3.setLanguage('de');
    Accounts.onLogin(function () {
        // noop
    });

    Template.main.helpers({
        isLoggedIn: function () {
            return Meteor.user();
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
