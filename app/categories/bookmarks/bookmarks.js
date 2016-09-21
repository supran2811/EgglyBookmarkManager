angular.module('categories.bookmarks',[
        'app.model.bookmarks',
        "categories.bookmarks.create",
        "categories.bookmarks.edit",
        "app.model.categories"
        
])
.config(function($stateProvider){
    $stateProvider.state("app.categories.bookmarks",{
             url:"categories/:category",
             views:{
                 "bookmarks@":{
                     templateUrl : "app/categories/bookmarks/bookmarks.tmpl.html",
                     controller: "BookmarkCtrl as bookmarkListCtrl"
                 }
             }
     })
})
.controller("BookmarkCtrl" , function($stateParams,BookmarksModel,CategoriesModel){
    var bookmarkListCtrl = this;
    CategoriesModel.setCurrentCategory($stateParams.category);
    BookmarksModel.getBookmarks().then(function(bookmarks){

         bookmarkListCtrl.bookmarks = bookmarks;
    });

    bookmarkListCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
    bookmarkListCtrl.deleteBookmark = BookmarksModel.deleteBookmark;
    //console.log("currentCategory"+bookmarkListCtrl.getCurrentCategoryName());
})

