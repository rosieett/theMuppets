// Set the default variables for what's being shown
var showType = "all";
var muppetType = "all";
var $grid;

//-------------------------------------------------------------//
//-------DOCUMENT READY FUNCTION-------//
//-------------------------------------------------------------//


//When the page is loaded, run the javascript
$(document).ready(function() {


  //SHOWING MUPPETS IN THE GRID without imgs being in the html
  $(muppetData).each(function(key, value) {

    //jquery append - inserts inside the target
    var newItem = '<div class="grid-item" data-muppetType="' +value.category+ '" data-performer="' +value.originalVoice+ '" data-showType="' +value.show+ '" data-bothType="' +value.bothTypeBut+ '">';
    // console.log(newItem)
    newItem = newItem + '<img src="images/muppetImages/' + value.filename + '.png" class="muppetImg" alt="' + value.muppet + '">';
    newItem = newItem + '<p>'+value.muppet+'</p>';
    newItem = newItem + '</div>';

    // add in newItem (the structure of the filename for the muppet images) to the grid
    $('.grid').append(newItem);

  });

  // external js: isotope.pkgd.js

  // external js: isotope.pkgd.js


// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    muppetType: '[data-muppetType]',
  }
});

// filter functions
var filterFns = {
  // show if number is greater than 50
  numberGreaterThan50: function() {
    var number = $(this).find('.number').text();
    return parseInt( number, 10 ) > 50;
  },
  // show if name ends with -ium
  ium: function() {
    var name = $(this).find('.name').text();
    return name.match( /ium$/ );
  }
};

// bind filter button click
$('#muppetType').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-muppetType');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});

// bind sort button click
$('#sorts').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});



});
