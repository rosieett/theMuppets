//create a click function
$('button').on('click', function(){

  //get the data-category attr
  var dataType = $(this).attr('data-type');

  //get the data-show attr
  var dataShow = $(this).attr('data-show');

});

// init Isotope
var $grid = $('.grid').isotope({
  // options
});

//Initialize with jQuery
$('.grid').isotope({
  // options
  itemSelector: '.grid-item' ,
  layoutMode: 'fitRows'
});

// filter .animal items
$grid.isotope({ filter: '.animal' });

// filter .person
$grid.isotope({ filter: '.person' });

// filter .sesameStreet
$grid.isotope({ filter: '.sesameStreet' });

// filter .theMuppetShow
$grid.isotope({ filter: '.theMuppetShow' });

// show all items
$grid.isotope({ filter: '*' });



// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
