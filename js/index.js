//jquery append

// Set the default variables for what's being shown
var showType = "all";
var muppetType = "all"


//When the page is loaded, run the javascript
$(document).ready(function() {

  $(muppetData).each(function(key,value){

    //jquery append - inserts inside the target
    var newItem = '<div class="grid-item" data-muppettype="';
    newItem = newItem + value.category + '" ' +  'data-showtype="' + value.show + '">' ;
    newItem = newItem + '<img src="images/muppetImages/'+value.filename+'.png" class="muppetImg" alt="'+value.muppet+'">';
    newItem = newItem + '</div>';

    $('.grid').append(newItem)


    console.log(value.muppet);

  });

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

  });



function muppetFilter (){
  //hide everyone
  $('.grid-item').hide();

  //show just the ones I want
  jQuery(".grid .grid-item").each(
              function(key,value){
                console.log($(this).data('showtype'));
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
