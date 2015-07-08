uberall = new Mongo.Collection("uberall");

if (Meteor.isClient) {
    Template.footer.helpers({
        startime: function () {
            return Math.round(new Date().getTime() / 1000 + 24 * 365 * 24 * 60 * 60); // time plus 24 years
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}
