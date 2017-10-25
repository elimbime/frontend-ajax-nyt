
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var container = 

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview  
    var street = $('#street').val(); 
    var city = $('#city').val();
    var adress = street +","+city; 
    var urlAdress = encodeURIComponent(adress.trim()); 
    $body.append('<img class="bgimg" src=http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+urlAdress+'>');
    // YOUR CODE GOES HERE!  
    $greeting.text("You want live in "+city ); 

    var urlNyt = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    var params = {
      'api-key': "843ec920599e452fa83ab934c7ebb0f6", 
      'q': city
    }; 

    $.getJSON(urlNyt,params, function(data){
      $nytHeaderElem.text("New York Times Articles About " + city); 
      var docs = data.response.docs; 
      var length = docs.length; 
      for (var index = 0; index < length; index++) {
        var doc = docs[index];
        $nytElem.append('<li class="article">'+ 
        '<a href="'+ doc.web_url+'">'+ doc.headline.main+'</a>'+
        '<p>'+doc.snippet+'</p>'+
        '</li>'); 
      }
    }).error(function(){
      $greeting.text("An error occured during your Ajax call !!!!");
    }); 

    var urlWikipdedia = "https://en.wikipedia.org/w/api.php"; 

    var paramsWikipedia = { 
      'action': 'opensearch', 
      'search': city, 
      'format': 'json', 
    }; 

    $.ajax({
      dataType: "jsonp",
      url: urlWikipdedia,
      data: paramsWikipedia,
      success: function(data){
        var articles = data[1]; 
        var artilcesLinks =  data[3]; 
        var length = articles.length; 
        for (var index = 0; index < length; index++) {
          $wikiElem.append('<li><a href="'+artilcesLinks[index]+'">'+ articles[index]+'</a></li>'); 
        } 
      }
    }).error(function(){
      $greeting.text("An error occured during your Ajax call !!!!");
    });

    return false;
}

$('#form-container').submit(loadData);


