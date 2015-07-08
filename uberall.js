uberall = new Mongo.Collection("uberall");

if (uberall.galaxies === undefined) {
    console.log('No galaxy found');
}
;

if (Meteor.isClient) {
    Accounts.ui.config({
        forceEmailLowercase: true,
    });
    accountsUIBootstrap3.setLanguage('de');

    Template.footer.helpers({
        galaxyCount: function () {
            return 0; // uberall.galaxies.find().count();
        },
        startime: function () {
            return Math.round(new Date().getTime() / 1000 + 24 * 365 * 24 * 60 * 60); // time plus 24 years
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}
