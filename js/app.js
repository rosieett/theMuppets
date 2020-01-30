//c3 Charts
// var chart = c3.generate({
//     bindto: '#chart',
//     data: {
//       columns: [
//         ['data1', 30, 200, 100, 400, 150, 250],
//         ['data2', 50, 20, 10, 40, 15, 25]
//       ]
//     }
// });

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
