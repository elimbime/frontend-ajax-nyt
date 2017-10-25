
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $body.append('<img class="bgimg" src=http://maps.googleapis.com/maps/api/streetview?size=600x300&location=79%20Rue%20Quincampoix,Paris">');
    // YOUR CODE GOES HERE!
    var city = "paris"; 
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "843ec920599e452fa83ab934c7ebb0f6", 
      'q': city
    });
    $.getjson({
      url: url,
      method: 'GET',
      data: data,
      success: function(data){
          console.log(data); 
      }
    }).done(function(result) {
      console.log(result);
    }).fail(function(err) {
      throw err;
    });
    
    return false;
}

$('#form-container').submit(loadData);


