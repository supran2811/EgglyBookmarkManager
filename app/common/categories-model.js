angular.module('app.model.categories',[])

.service('CategoriesModel',function($http,$q){

    var model = this,
    categories,
    currentCategory,
     URL = {FETCH: "data/categories.json"};
  
  extractData = function(result){
      categories = result.data;
      return categories;
  }

  model.getCategories = function(){
       return categories ?  $q.when(categories) :    $http.get(URL.FETCH).then(extractData);
  };
 
  model.setCurrentCategory = function(categoryName){
      model.getCategoryByName(categoryName).then(function(category){
          currentCategory = category;
      });
  };

  model.getCurrentCategory = function(){
      return currentCategory;
  };

  model.getCurrentCategoryName  = function(){
      value  =  currentCategory ? currentCategory.name:'';
      console.log(value);
      return value;
  };


  model.getCategoryByName = function(categoryName){

       var defered = $q.defer();


       findCategoryByName = function(){
          return  _.find(categories , function(c){
               return c.name == categoryName;
           })
       }

       if(categories){
           defered.resolve(findCategoryByName());
       } 
       else{
           model.getCategories().then(function(){
                defered.resolve(findCategoryByName());
           })
       }
        
        return defered.promise;

  };
  
});
