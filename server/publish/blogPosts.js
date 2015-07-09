/**
 * Created by vinh on 6/17/2015.
 */
Meteor.publish('allArticle', function() {
   return Article.find();
});