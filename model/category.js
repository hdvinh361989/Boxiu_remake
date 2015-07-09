/**
 * Created by vinh on 6/25/2015.
 */
Category = new Mongo.Collection('category');
SimpleSchema.debug = true;
Category.allow({
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
    parent: {
        type: String,
        optional: true
    },
    children: {
        type: [String],
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    items: {
        type: [String],
        optional: true
    },
    type: {
        type: String,
        optional: true
    },
    count: {
        type: Number,
        optional: true,
        autoValue: function () {
            var item = this.field('item');
            if (this.isSet) {
                return item.value.length;
            }
            this.unset();
        }
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

Category.attachSchema(schema);