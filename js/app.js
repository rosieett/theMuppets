// Set the default variables for what's being shown
var showType = "all";
var muppetType = "all";
var performer = "all";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyARsi6esToImrDjPI_qLXu4RVlCz3VRsfU",
  authDomain: "the-muppet-study.firebaseapp.com",
  projectId: "the-muppet-study",
  storageBucket: "the-muppet-study.appspot.com",
  messagingSenderId: "411415656571",
  appId: "1:411415656571:web:64d53ccc84c38732db0ade",
  measurementId: "G-XLNX7B1G36"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//When the page is loaded, run the javascript
$(document).ready(async function() {

  //SHOWING MUPPETS IN THE GRID without imgs being in the html

  let $grid = $('.grid');

  let db = firebase.firestore();

  let muppetDataResponse = await db.collection("muppets").get();

  let muppetData = [];

  muppetDataResponse.forEach(doc => {
      muppetData.push(doc.data());
  });

  muppetData.forEach((value, index) => {

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

    muppetFilter();
  });

  // init Isotope
  $isotopeGrid = $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

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
