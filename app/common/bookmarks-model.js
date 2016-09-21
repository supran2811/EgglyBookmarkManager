angular.module('app.model.bookmarks',[

])
.service('BookmarksModel',function($http,$q){

    var model = this,
    bookmarks,
    URL = {FETCH : "data/bookmarks.json"};

  extractData = function(result){
    bookmarks = result.data;
      return bookmarks;
  }

  findBookmarkById = function(bookmarkId){
       return _.find(bookmarks , function(b){
           return b.id === parseInt(bookmarkId,10);
       })
  }
  
    
  model.getBookmarks  = function(){
      return bookmarks?$q.when(bookmarks):$http.get(URL.FETCH).then(extractData);
  };

  model.createBookmark  = function(bookmark){
        bookmark.id = bookmarks.length;
        bookmarks.push(bookmark);
  };

  
  model.getBookmarkById = function(bookmarkId){

      var defered = $q.defer();
      
      if(bookmarks){
          
          defered.resolve(findBookmarkById(bookmarkId))
      }
      else{
           model.getBookmarks().then(function(bookmarks){
                defered.resolve(findBookmarkById(bookmarkId));
           })
      }

      return defered.promise;
  };

  model.updateBookmark = function(bookmark){

          index = _.findIndex(bookmarks  , function(b){
            return b.id === bookmark.id;
          })

            bookmarks[index] = bookmark;
        
  };
  
  model.deleteBookmark = function(bookmark){
       _.remove(bookmarks , function(b){
             return b.id == bookmark.id;
       });
  }; 
  
});
