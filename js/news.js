import { nyTimesKey } from "./keys.js";
import { guardianKey } from "./keys.js";

async function getAPIData(url) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error('failed to retrieve site info');
    }
        // transform response into JSON
    const responseJson = await response.json();
    return responseJson;
}

//When the page is loaded, run the javascript
$(document).ready(async () => {

    // NYT API Data
    const NYT_API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20200101&api-key=${nyTimesKey}`;
    const MUPPETS_NYT_API_URL = NYT_API_URL + '&q=(’muppets’)';
    const SESAME_STREET_NYT_API_URL = NYT_API_URL + '&q=(’sesame street’)';

    //Guard API data
    const GUARD_API_URL = `https://content.guardianapis.com/search?show-fields=thumbnail&q=muppets&api-key=${guardianKey}`;
    const MUPPETS_GUARD_API_URL = GUARD_API_URL + '&q=muppets';
    const SESAME_STREET_GUARD_API_URL = GUARD_API_URL + '&q=sesame%20street';

    // create a variable to go get my url and store it
    const muppetNytJson = await getAPIData(MUPPETS_NYT_API_URL);
    const sesameStreetNytJson = await getAPIData(SESAME_STREET_NYT_API_URL);
    const muppetGuardJson = await getAPIData(MUPPETS_GUARD_API_URL);
    const sesameStreetGuardJson = await getAPIData(SESAME_STREET_GUARD_API_URL);

    let muppetArticles = muppetNytJson.response.docs;
    let sesameStreetArticles = sesameStreetNytJson.response.docs;
    let muppetGuardArticles = muppetGuardJson.response.results;
    let sesameStreetGuardArticles = sesameStreetGuardJson.response.results;

    // ---------------

    muppetArticles = muppetArticles.map(article => {

        let obj = {
            summary: article.abstract,
            publishDate: article.pub_date,
            title: article.headline.main,
            articleUrl: article.web_url,
            imgUrl: 'http://www.nytimes.com/' + article.multimedia[0].url,
            category: 'muppets',
            source: 'nytimes'
        };

        return obj;
    });

    sesameStreetArticles = sesameStreetArticles.map(article => {

        let obj = {
            summary: article.abstract,
            publishDate: article.pub_date,
            title: article.headline.main,
            articleUrl: article.web_url,
            imgUrl: 'http://www.nytimes.com/' + article.multimedia[0].url,
            category: 'sesame-street',
            source: 'nytimes'
        };

        return obj;
    });

    muppetGuardArticles = muppetGuardArticles.map(article => {

        let obj = {
            summary: article.pillarName,
            publishDate: article.webPublicationDate,
            title: article.webTitle,
            articleUrl: article.webUrl,
            imgUrl: article.fields['thumbnail'],
            category: 'muppets',
            source: 'guardian'
        };

        return obj;
    });


    let allArticles = [].concat(muppetArticles, sesameStreetArticles, muppetGuardArticles);
    console.log(allArticles);

    //SHOWING MUPPETS IN THE GRID without imgs being in the html

    let $grid = $('.grid');

    // console.log(allArticles);

    allArticles.forEach((article, index) => {

        let $newItem = $('<div />');
        $newItem.addClass('grid-item ' + article.category + ' ' + article.source);

        let $card = $('<div />');
        $card.addClass('card');

        let $cardBody = $('<div />');
        $cardBody.addClass('card-body');

        let $cardImgEmbed = $('<div />');
        $cardImgEmbed.addClass('embed-responsive embed-responsive-4by3 card-image-top');

        let $cardImgEmbedItem = $('<div />');
        $cardImgEmbedItem.addClass('embed-responsive-item articleImage');
        $cardImgEmbedItem.css('background-image', "url('" + article.imgUrl + "')");

        let $h6 = $('<h6 />');
        $h6.addClass('card-title');
        $h6.text(article.title);

        let $anchor = $('<a />');
        $anchor.text('Go to Article');
        $anchor.addClass('btn btn-primary ');
        $anchor.attr('target', '_blank');
        $anchor.attr('href', article.articleUrl);

        let $abstract = $('<p />');
        $abstract.addClass('card-text');
        $abstract.text(article.summary);

        let $published = $('<p />');
        $published.addClass('card-text about mb-0 mt-0');
        $published.text(article.publishDate.slice(0, 10));

        $cardImgEmbed.append($cardImgEmbedItem);
        $card.append($cardImgEmbed);
        $card.append($cardBody);
        $cardBody.append($published);
        $cardBody.append($h6);
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
    $('.buttonGroup').on( 'click', 'a', function() {
        let filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

});
