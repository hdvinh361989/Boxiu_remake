/**
 * Created by vinh on 7/9/2015.
 */
Images = new FS.Collection("images", {
    stores: [
        new FS.Store.GridFS('Original')
    ],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

Images.allow(
    {
        insert: function (userId) {
            return userId && Roles.userIsInRole(userId, ['admin']);
        },
        remove: function (userId) {
            return userId && Roles.userIsInRole(userId, ['admin']);
        },
        download: function () {
            return true;
        },
        update: function (userId) {
            return userId && Roles.userIsInRole(userId, ['admin']);
        }
    }
);