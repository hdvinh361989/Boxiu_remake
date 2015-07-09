/**
 * Created by vinh on 7/9/2015.
 */
Meteor.publish('images', function () {
   return Images.find({});
});