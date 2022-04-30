import {
  nyTimesKey
}
from "./keys.js";
import {
  guardianKey
}
from "./keys.js";

async function getAPIData(url) {
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error('failed to retrieve site info');
  }
  // transform response into JSON
  const responseJson = await response.json();
  return responseJson;
}



// document.onreadystatechange = function () {
//   var state = document.readyState
//   if (state == 'interactive') {
//     document.getElementById('contents').style.visibility = "hidden";
//   } else if (state == 'complete') {
//     setTimeout(function () {
//       document.getElementById('interactive');
//       document.getElementById('load').style.visibility = "hidden";
//       document.getElementById('contents').style.visibility = "visible";
//     }, 1000);
//   }
// }

//When the page is loaded, run the javascript
$(document).ready(async () => {

  // NYT API Data
  const NYT_API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20200101&api-key=${nyTimesKey}`;
  const MUPPETS_NYT_API_URL = NYT_API_URL + '&q=(’muppets’)';
  const SESAME_STREET_NYT_API_URL = NYT_API_URL + '&q=(’sesame street’)';

  //Guard API data
  const GUARD_API_URL = `https://content.guardianapis.com/search?&api-key=${guardianKey}&show-fields=thumbnail,lastModified,body,trailText`;
  const MUPPETS_GUARD_API_URL = GUARD_API_URL + '&q=muppets';
  const SESAME_STREET_GUARD_API_URL = GUARD_API_URL + '&q=sesame%20street';

  // create a variable to go get my url and store it
  const muppetNytJson = await getAPIData(MUPPETS_NYT_API_URL);
  const sesameStreetNytJson = await getAPIData(SESAME_STREET_NYT_API_URL);
  const muppetGuardJson = await getAPIData(MUPPETS_GUARD_API_URL);
  const sesameStreetGuardJson = await getAPIData(SESAME_STREET_GUARD_API_URL);

  let muppetNytArticles = muppetNytJson.response.docs;
  let sesameStreetNytArticles = sesameStreetNytJson.response.docs;
  let muppetGuardArticles = muppetGuardJson.response.results;
  let sesameStreetGuardArticles = sesameStreetGuardJson.response.results;



  // ---------------

  // muppetNytArticles = muppetNytArticles.map(article => {

  //   let obj = {
  //     summary: article.abstract,
  //     publishDate: article.pub_date,
  //     title: article.headline.main,
  //     articleUrl: article.web_url,
  //     imgUrl: 'http://www.nytimes.com/' + article.multimedia[0].url,
  //     category: 'muppets',
  //     sourceClass: 'nytimes',
  //     newsSource: 'New York Times'
  //   };



  //   return obj;
  // });

  // sesameStreetNytArticles = sesameStreetNytArticles.map(article => {

  //   let obj = {
  //     summary: article.abstract,
  //     publishDate: article.pub_date,
  //     title: article.headline.main,
  //     articleUrl: article.web_url,
  //     imgUrl: 'http://www.nytimes.com/' + article.multimedia[0].url,
  //     category: 'sesame-street',
  //     sourceClass: 'nytimes',
  //     newsSource: 'New York Times'
  //   };

  //   return obj;
  // });

  muppetGuardArticles = muppetGuardArticles.map(article => {

    let obj = {
      summary: article.fields['trailText'],
      publishDate: article.webPublicationDate,
      title: article.webTitle,
      articleUrl: article.webUrl,
      imgUrl: article.fields['thumbnail'],
      category: 'muppets',
      sourceClass: 'guardian',
      newsSource: 'The Guardian'
    };

    return obj;
  });

  sesameStreetGuardArticles = sesameStreetGuardArticles.map(article => {

    let obj = {
      summary: article.fields['trailText'],
      publishDate: article.webPublicationDate,
      title: article.webTitle,
      articleUrl: article.webUrl,
      imgUrl: article.fields['thumbnail'],
      category: 'sesame-street',
      sourceClass: 'guardian',
      newsSource: 'The Guardian'
    };

    return obj;
  });


  let allArticles = [].concat(muppetNytArticles, sesameStreetNytArticles, muppetGuardArticles, sesameStreetGuardArticles);

  //create a sorted array
  let sortedallArticles = allArticles.sort((a, b) => (a.publishDate < b.publishDate) ? 1 : -1);

  let $grid = $('.grid');

  sortedallArticles.forEach((article, index) => {

    let $newItem = $('<div />');
    $newItem.addClass('grid-item ' + article.category + ' ' + article.sourceClass);

    let $card = $('<div />');
    $card.addClass('card');

    let $cardBody = $('<div />');
    $cardBody.addClass('card-body');

    let $cardImgEmbed = $('<div />');
    $cardImgEmbed.addClass('embed-responsive embed-responsive-4by3 card-image-top');

    let $cardImgEmbedItem = $('<div />');
    $cardImgEmbedItem.addClass('embed-responsive-item articleImage');
    $cardImgEmbedItem.css('background-image', "url('" + article.imgUrl + "')");

    let $title = $('<h6 />');
    $title.addClass('card-title');
    $title.text(article.title);

    let $anchor = $('<a />');
    $anchor.text('Go to Article');
    $anchor.addClass('btn btn-primary ');
    $anchor.attr('target', '_blank');
    $anchor.attr('href', article.articleUrl);

    let $abstract = $('<p />');
    $abstract.addClass('card-text');
    $abstract.text(article.summary);

    let $newsSource = $('<p />');
    $newsSource.addClass('card-text bold uppercase');
    $newsSource.text(article.newsSource);

    let $published = $('<p />');
    $published.addClass('card-text about mb-1 mt-0');
    $published.text(article.publishDate.slice(0, 10));

    $cardImgEmbed.append($cardImgEmbedItem);
    $card.append($cardImgEmbed);
    $card.append($cardBody);
    $cardBody.append($published);
    $cardBody.append($title);
    $cardBody.append($newsSource)
    $cardBody.append($abstract);
    $cardBody.append($anchor);

    $newItem.append($card);

    $grid.append($newItem);

  });


  // --------ISOTOPE FILTERING STYLES--------

  // init Isotope
  let $isotopeGrid = $grid.isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    fitRows: {
      gutter: 30
    },
    layoutMode: 'fitRows'
  });

  // filter items on button click
  $('.buttonGroup').on('click', 'a', function () {
    let filterValue = $(this).attr('data-filter');
    $grid.isotope({
      filter: filterValue
    });
  });

  $('.buttonGroup .button').not('.reset').on('click', function (e) {
    $(this).toggleClass("is-clicked");
  });

  $('.buttonGroup .reset').on('click', function (e) {
    $('.buttonGroup .button').removeClass("is-clicked");
  });


});