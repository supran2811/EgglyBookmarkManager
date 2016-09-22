angular.module('categories.bookmarks.edit',[
    'app.model.bookmarks'

])
.config(function($stateProvider){

    $stateProvider.state("app.categories.bookmarks.edit",{
        url : "/bookmarks/:bookmarkId/edit",
        templateUrl:"app/categories/bookmarks/edit/bookmark-edit.tmpl.html",
        controller:"EditBookmarkCtrl as editBookmarkCtrl"
    })
})
.controller("EditBookmarkCtrl" , function($state , $stateParams , BookmarksModel){
        editBookmarkCtrl = this;
        BookmarksModel.getBookmarkById($stateParams.bookmarkId).then(function(bookmark){
            editBookmarkCtrl.bookmark = bookmark;
            editBookmarkCtrl.editBookmark = angular.copy(bookmark);
        });

        function goBack(){
                $state.go("app.categories.bookmarks");
        }

        function update(){
              BookmarksModel.updateBookmark(editBookmarkCtrl.editBookmark);
              goBack();
        }

        editBookmarkCtrl.updateBookmark = update;//BookmarksModel.updateBookmark;
        
        
});
