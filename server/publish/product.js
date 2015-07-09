/**
 * Created by vinh on 6/17/2015.
 */
Meteor.publish('allProduct', function () {
    return Product.find();
});

Meteor.publish('saleBoxes', function () {
    return Product.find(
        {
            typeOfProduct: 'box'
        },
        {
            sort: {createdDate: -1},
            limit: 4
        });
});

Meteor.publish('oneProduct', function (productID) {
    return Product.find({_id: productID});
});

Meteor.publish('relatedProduct', function (tags) {
    return Product.find(
        {
            tags: {
                $in: tags
            }
        },
        {
            sort: {createdDate: -1},
            limit: 5
        }
    );
});

Meteor.publish('product_admin', function (options, search, type) {
    Counts.publish(this, 'numberOfProduct', Product.find({
        $and: [
            {
                $or: [
                    {
                        'profile.brand': {$regex: '.*' + search || '' + '.*', $options: 'i'}
                    },
                    {
                        'profile.name': {$regex: '.*' + search || '' + '.*', $options: 'i'}
                    }
                ]
            },
            {
                'profile.type': {$exists: true, $regex: type || '.*', $options: 'i'}
            }

        ]
    }), {noReady: true});

    return Product.find({
        $and: [
            {
                $or: [
                    {
                        'profile.brand': {$regex: '.*' + search || '' + '.*', $options: 'i'}
                    },
                    {
                        'profile.name': {$regex: '.*' + search || '' + '.*', $options: 'i'}
                    }
                ]
            },
            {
                'profile.type': {$exists: true, $regex: type || '.*', $options: 'i'}
            }

        ]
    }, options)
});
