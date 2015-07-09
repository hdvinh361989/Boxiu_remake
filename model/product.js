/**
 * Created by vinh on 6/14/2015.
 */
Product = new Mongo.Collection('product');

var schema = {};
Product.allow({
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

//Lay 50 chu dau tien trong introduction
schema.profile = new SimpleSchema({
    brand: {
        type: String
    },
    name: {
        type: String
    },
    introduction: {
        type: String
    },
    shortIntroduction: {
        type: String,
        autoValue: function () {
            intro = this.field('profile.introduction');
            if (this.isInsert) {
                return intro.value.split(' ').slice(0,30).join(' ');
            } else if (this.isUpsert) {
                return intro.value.split(' ').slice(0,30).join(' ');
            } else {
                this.unset();
            }

        }
    },
    direction: {
        type: String,
        optional: true
    },
    price: {
        type: Number
    },
    discountRate: {
        type: Number,
        optional: true
    },
    discountPrice: {
        type: Number,
        optional: true,
        autoValue: function () {
            var price = this.field('profile.price');
            var discountRate = this.field('profile.discountRate');
            if ( (price.isSet) || (discountRate.isSet)) {
                return price.value * ((100 - discountRate.value) / 100);
            } else {
                this.unset();
            }
        }
    },
    quantity: {
        type: Number,
        optional: true
    },
    size: {
        type: String,
        optional: true
    },
    type: {
        type: String,
        index: 1
    }
});

schema.product = new SimpleSchema({
    profile: {
        type: schema.profile
    },
    category: {
        type: [String],
        optional: true
    },
    childProducts: {
        type: [String],
        optional: true,
        index: 1
    },
    parentBoxes: {
        type: [String],
        optional: true,
        index: 1
    },
    tags: {
        type: [String],
        index: 1,
        optional: true
    },
    image: {
        type: String,
        optional: true,
        defaultValue: 'defaultImage.jpg'
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
    },
    published: {
        type: Boolean,
        optional: true,
        defaultValue: true
    }
});

Product.attachSchema(schema.product);