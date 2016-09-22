angular.module('categories',[
    'app.model.categories'
])
.config(function($stateProvider){
    $stateProvider.state('app.categories',{

        url:"/",
        views:{

            "categories@":{
                templateUrl:"app/categories/categories.tmpl.html",
                controller: "CategoriesCtrl as categoriesListCtrl"
            },
            "bookmarks@":{
                     templateUrl : "app/categories/bookmarks/bookmarks.tmpl.html",
                     controller: "BookmarkCtrl as bookmarkListCtrl"
                 }

        }
    })
})
.controller("CategoriesCtrl" , function(CategoriesModel){
    categoriesListCtrl = this;
    CategoriesModel.getCategories().then(function(result){
        categoriesListCtrl.categories = result;
    });
});
