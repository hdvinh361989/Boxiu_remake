/**
 * Created by vinh on 7/9/2015.
 */
Meteor.publish('images', function (filter, options, searchTxt) {

    //console.log('.*' + searchTxt || '' + '.*');
    //console.log(filter);

    Counts.publish(this, 'numberOfImages', Images.find({

        $and:[
            {
                'original.name': {$regex: '.*' + searchTxt || '' + '.*', $options: 'i'}
            },
            {
                uploadedAt: filter
            }
        ]

    }), {noReady: true});

    return Images.find(
        {
            $and:[
                {
                    'original.name': {$regex: '.*' + searchTxt || '' + '.*', $options: 'i'}
                },
                {
                    uploadedAt: filter
                }
            ]
        },
        options
    );
});

Meteor.publish('recent', function () {
    var date = new Date();
    var year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();
    date = new Date(year.toString(), month.toString(), day.toString());
   return Images.find(
       {uploadedAt: {$gte: new Date()}}
   );
});