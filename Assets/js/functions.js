//variables
  var search = $('#search');
  var items = $('.item');
  var results = $('.text');


results.hide();

// masonry
if(window.innerWidth > 770){
  $('.grid').masonry({
    itemSelector: '.item',
    columnWidth: 160,
    gutter: 13
  });
}

//Form Event Listener
$('form').submit(function (sub) {
  sub.preventDefault();

//AJAX Request
var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
var searchTerm = search.val();
var flickrOptions = {
  tags: searchTerm,
  format: "json"
};
  function displayPhotos(data) {
    results.show("fast");

    // cycles through flickr data
    $.each(data.items, function (i,photo) {
        //selects a .item div and adds photo to background
        items.eq(i).css("background-image",'url("' + photo.media.m + '")');
        //sets time out
        setTimeout(function(){
          items.eq(i).addClass('is-visible');
        }, 200 * i);

        if( $(this).eq(i) === 19 ){
          return false
        }
    });

  }

  $.getJSON(flickerAPI, flickrOptions, displayPhotos);
});

//reset
$('button').click(function(){
  items.removeClass('is-visible');
  results.hide();
})
