/**
 * Created by vinh on 6/25/2015.
 */
Meteor.publish('tags', function (searchTxt) {
    return Tag.find(
        {
            name: {$regex: '.*' + searchTxt || '' + '.*', $options: 'i'}
        },
        {
            sort: {name: 1}
        }
    );
});