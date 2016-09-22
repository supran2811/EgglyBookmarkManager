angular.module('categories.bookmarks.create',[
        'app.model.bookmarks'           
])
.config(function($stateProvider){
    
    $stateProvider.state("app.categories.bookmarks.create",{
        url : "/bookmarks/create",
        templateUrl:"app/categories/bookmarks/create/bookmark-create.tmpl.html",
        controller: "CreateBookmarkCtrl as createBookmarkCtrl"
    });
   
})
.controller("CreateBookmarkCtrl",function($state,$stateParams , BookmarksModel){
    createBookmarkCtrl = this;
    
    goBack = function(){

        $state.go("app.categories.bookmarks");
    }

    resetForm = function(){
        createBookmarkCtrl.newBookmark = {title:"",url:"",category:$stateParams.category};
        
    }

    createBookmark = function(){
            BookmarksModel.createBookmark(createBookmarkCtrl.newBookmark);
            goBack();
    }

    createBookmarkCtrl.createBookmark = createBookmark;
    resetForm();

});