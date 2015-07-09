/**
 * Created by vinh on 6/25/2015.
 */
Tag = new Mongo.Collection('tag');
SimpleSchema.debug = true;
Tag.allow({
    insert: function (userId, category) {
        return userId && Roles.userIsInRole(userId, ['admin']);
    },
    update: function (userId, category, fields, modifier) {
        return userId && Roles.userIsInRole(userId, ['admin']);
    },
    remove: function (userId, category) {
        return userId && Roles.userIsInRole(userId, ['admin']);
    }
});

var schema = new SimpleSchema({

    name: {
        type: String,
        index: 1
    },
    description: {
        type: String,
        optional: true
    },
    createdDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    updatedDate: {
        type: Date,
        optional: true,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true
    }

});

Tag.attachSchema(schema);