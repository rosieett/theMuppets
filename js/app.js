// Set the default variables for what's being shown
var showType = "all";
var muppetType = "all";
var performer = "all";

//-------------------------------------------------------------//
//-------DOCUMENT READY FUNCTION-------//
//-------------------------------------------------------------//


//When the page is loaded, run the javascript
$(document).ready(function() {

  //SHOWING MUPPETS IN THE GRID without imgs being in the html

  let $grid = $('.grid');

  console.log(muppetData);

  muppetData.forEach((value, index) => {

      console.log(value);
      let $newItem = $('<div />');
      $newItem.addClass('grid-item');
      $newItem.attr('data-muppettype', value.category);
      $newItem.attr('data-performer', value.originalVoice.replace(/[^0-9A-Za-z]/gi, ''));
      $newItem.attr('data-showtype', value.show);

      let $img = $('<img />');
      $img.attr('src', 'images/muppetImages/' + value.filename + '.png');
      $img.attr('alt', value.muppet);
      $img.addClass('muppetImg');

      let $p = $('<p />').text(value.muppet);

      $newItem.append($img);
      $newItem.append($p);
      $grid.append($newItem);

  });

  //---ShowType---

  //When I click on the filter buttons, run this function
  $('#showType .button').click(function(e) {

    //prevent the submit button from refreshing the page
    e.preventDefault();

    //Get the Show - this lets you click on any button in this area and only need to write once
    showType = $(this).attr("id");

    // //output these values to console.
    // console.log("Showing muppets of type " + muppetType + " that appears on " + showType);

    muppetFilter();
  });

  //---MuppetType---

  //When I click on the filter buttons, run this function
  $('#muppetType .button').click(function(e) {

    //prevent the submit button from refreshing the page
    e.preventDefault();

    //Get the Show - this lets you click on any button in this area and only need to write once
    muppetType = $(this).attr("id");

    muppetFilter();
  });


  //When I click on the filter buttons, run this function
  $('#reset .button').click(function(e) {

    //prevent the submit button from refreshing the page
    e.preventDefault();

    //Get the Show - this lets you click on any button in this area and only need to write once
    muppetType = "all";
    showType = "all";
    performer = "all";

    // //output these values to console.
    // console.log("Showing muppets of type " + muppetType + " that appears on " + showType);

    muppetFilter();
  });


  // --------ISOTOPE FILTERING STYLES--------

  // init Isotope
  $isotopeGrid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

  //---- Combination filters --------


  // store filter for each group
  var filters = {};

  // flatten object by concatting values
  function concatValues(obj) {
    var value = '';
    for (var prop in obj) {
      value += obj[prop];
    }
    return value;
  }

});



//Overall Function
function muppetFilter() {

  //target buttons remove class
  $('.button').removeClass('is-clicked');

  //because of ShowType variable, this targets and adds the is-clicked class to any ids within showType
  $("#" + showType).addClass('is-clicked');

  //for the other variables
  $("#" + muppetType).addClass('is-clicked');


  //hide everyone
  $('.grid-item').hide();

  //show just the ones I want
  jQuery(".grid .grid-item").each(
    //loop to find each muppet div
    function(key, value) {

      //console.log to text
      // console.log($(this).data('showtype'));

      var itemShowType = $(this).data("showtype");
      var itemMuppetType = $(this).data("muppettype");
      var itemPerformer = $(this).data("performer")
      console.log(itemPerformer);
      console.log(performer);
      if (itemShowType == showType || showType == "all") {
        // The show matches
        if (itemMuppetType == muppetType || muppetType == "all") {
          //the performer matches
          if (itemPerformer == performer || performer == "all") {
            jQuery(this).show();
          }
        }
      }
    }
  );



  $isotopeGrid.isotope();
};
