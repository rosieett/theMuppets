// Set the default variables for what's being shown
var showType = "all";
var muppetType = "all"

//-------DOCUMENT READY FUNCTION-------

//When the page is loaded, run the javascript
$(document).ready(function() {

  //SHOWING MUPPETS IN THE GRID without imgs being in the html
  $(muppetData).each(function(key,value){

    //jquery append - inserts inside the target
    var newItem = '<div class="grid-item" data-muppettype="';
    newItem = newItem + value.category + '" ' +  'data-showtype="' + value.show + '">' ;
    newItem = newItem + '<img src="images/muppetImages/'+value.filename+'.png" class="muppetImg" alt="'+value.muppet+'">';
    newItem = newItem + '</div>';

    $('.grid').append(newItem)


    console.log(value.muppet);

  });

  //----TOGGLED BUTTON COLOR CHANGE-----

      //function to make the button color change when in active state

  //---ShowType---

  //When I click on the filter buttons, run this function
  $('#showType .button').click(function(e){

    //prevent the submit button from refreshing the page
    e.preventDefault();

    //Get the Show - this lets you click on any button in this area and only need to write once
    showType = $(this).attr("id");

    //output these values to console.
    console.log("Showing muppets of type " + muppetType + " that appears on " + showType);

    muppetFilter();
  });

  //---MuppetType---

  //When I click on the filter buttons, run this function
  $('#muppetType .button').click(function(e){

      //prevent the submit button from refreshing the page
      e.preventDefault();

      //Get the Show - this lets you click on any button in this area and only need to write once
      muppetType = $(this).attr("id");

      //output these values to console.
      console.log("Showing muppets of type " + muppetType + " that appears on " + showType);

      muppetFilter();
  });

  //When I click on the filter buttons, run this function
  $('#reset .button').click(function(e){

      //prevent the submit button from refreshing the page
      e.preventDefault();

      //Get the Show - this lets you click on any button in this area and only need to write once
      muppetType = "all";
      showType = "all";

      //output these values to console.
      console.log("Showing muppets of type " + muppetType + " that appears on " + showType);

      muppetFilter();
  });


  // --------ISOTOPE FILTERING STYLES--------

    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      layoutMode: 'fitRows'
    });

    // filter items on button click
    $('.button').click(function() {
      $grid.isotope();
    });

    //---- Combination filters --------


    // store filter for each group
      var filters = {};

      // flatten object by concatting values
      function concatValues( obj ) {
        var value = '';
        for ( var prop in obj ) {
          value += obj[ prop ];
        }
        return value;
      }

});


//Overall Function
function muppetFilter (){

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
              function(key,value){

                //console.log to text
                // console.log($(this).data('showtype'));

              var itemShowType = jQuery(this).data("showtype");
              var itemMuppetType = jQuery(this).data("muppettype");

              if(itemShowType == showType || showType == "all"){
                  // The show matches
                  if(itemMuppetType == muppetType || muppetType == "all"){
                      jQuery(this).show();
                  }
              }
          }
      );
};
