/**
 * Created by vinh on 6/25/2015.
 */
Meteor.publish('category', function (searchTxt) {
    return Category.find(
        {
            name: {$regex: '.*' + searchTxt || '' + '.*', $options: 'i'}
        },
        {
            sort: {name: 1}
        }
    );
});