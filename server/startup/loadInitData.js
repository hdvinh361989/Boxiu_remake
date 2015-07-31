/**
 * Created by vinh on 6/14/2015.
 */
Meteor.startup(function () {
    if (Article.find().count() === 0) {
        var article = [
            {
                'title': 'First article',
                'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'tag': '#lamdep',
                'createdDate': new Date(),
                'modifiedDate': new Date(),
                'metaDescription': 'First BBox article',
                'featureImage': 'blog-00.jpg'
            },
            {
                'title': 'Second article',
                'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'tag': '#lamdep',
                'createdDate': new Date(),
                'modifiedDate': new Date(),
                'metaDescription': 'Second BBox article',
                'featureImage': 'blog-01.jpg'
            },
            {
                'title': 'Third article',
                'body': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'tag': '#songkhoe',
                'createdDate': new Date(),
                'modifiedDate': new Date(),
                'metaDescription': 'Third BBox article',
                'featureImage': 'blog-02.jpg'
            }
        ];
        for (var i = 0; i < article.length; i++) {
            Article.insert(article[i]);
        }
    }
    if (Product.find().count() === 0) {
        var product = [
            {
                profile: {
                    'brand': 'memebox',
                    'name': 'Chocolate & Wine Box 1',
                    'introduction': 'Chocolate and wine for every occasion! Whether you’re getting ready to go out, or set on being cozy by the fireplace, we can’t think of a better combination. Especially after a long week when all you want to do is wind down, relax and remember #ohwefancy.',
                    'price': 59,
                    'discountRate': 20,
                    'type': 'box',
                    'size': '5 item'
                },
                'image': 'box-00.jpg',
                'tags': ['#ohwefancy']
            },
            {
                profile: {
                    'brand': 'memebox',
                    'name': 'Chocolate & Wine Box 2',
                    'introduction': 'Chocolate and wine for every occasion! Whether you’re getting ready to go out, or set on being cozy by the fireplace, we can’t think of a better combination. Especially after a long week when all you want to do is wind down, relax and remember #ohwefancy.',
                    'price': 59,
                    'discountRate': 20,
                    'type': 'box',
                    'size': '5 item'
                },
                'image': 'box-00.jpg',
                'tags': ['#ohwefancy']
            },
            {
                profile: {
                    'brand': 'memebox',
                    'name': 'Chocolate & Wine Box 3',
                    'introduction': 'Chocolate and wine for every occasion! Whether you’re getting ready to go out, or set on being cozy by the fireplace, we can’t think of a better combination. Especially after a long week when all you want to do is wind down, relax and remember #ohwefancy.',
                    'price': 59,
                    'discountRate': 20,
                    'type': 'box',
                    'size': '5 item'
                },
                'image': 'box-00.jpg',
                'tags': ['#ohwefancy']
            },
            {
                profile: {
                    'brand': 'memebox',
                    'name': 'Chocolate & Wine Box 4',
                    'introduction': 'Chocolate and wine for every occasion! Whether you’re getting ready to go out, or set on being cozy by the fireplace, we can’t think of a better combination. Especially after a long week when all you want to do is wind down, relax and remember #ohwefancy.',
                    'price': 59,
                    'discountRate': 20,
                    'type': 'box',
                    'size': '5 item'
                },
                'image': 'box-00.jpg',
                'tags': ['#ohwefancy']
            },
            {
                profile: {
                    'brand': 'memebox',
                    'name': 'Chocolate & Wine Box 5',
                    'introduction': 'Chocolate and wine for every occasion! Whether you’re getting ready to go out, or set on being cozy by the fireplace, we can’t think of a better combination. Especially after a long week when all you want to do is wind down, relax and remember #ohwefancy.',
                    'price': 59,
                    'discountRate': 20,
                    'type': 'box',
                    'size': '5 item'
                },
                'image': 'box-00.jpg',
                'tags': ['#ohwefancy']
            }

        ];
        for (var j = 0; j < product.length; j++) {
            Product.insert(product[j]);
        }
    }
    if (Category.find().count() === 0) {
        var category = [
            {
                name: 'Duong da'
            },
            {
                name: 'Trang rang'
            },
            {
                name: 'Ban ngay'
            },
            {
                name: 'Ban dem'
            }
        ];

        for (var k = 0; k < category.length; k++) {
            Category.insert(category[k]);
        }
    }


/*    if (Meteor.users.find().count() === 2) {
        var option = {
            username: 'admin3',
            emails: 'hdvinh361989@gmail.com',
            password: '123'
        };

        var id = Accounts.createUser(option);
        Roles.addUsersToRoles(id, ['admin'])

    }
    Images.remove();*/
});