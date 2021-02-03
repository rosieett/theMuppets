/*
  Please add all Javascript code to this file.
*/

//ASK: Image replacement and menu item replacement

const guardianKey = '036a5f2b-cda3-4792-9cad-fd8a5e1cc390';
const nyTimesKey = '2cgcwOVTzV8ysIeRYSecL4dSRdAwI9Rd';
const newsApiKey = 'eb2d1ced8c9149bb9a14349bd2cbe517';

//create function to retrieve info from NYTimes
const retrieveTitles = async () => {

  /*
  NYTIMES
  */

  //Retrieve information from the URl
  const muppetsNytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=(’muppets’)&begin_date=20200101&api-key=2cgcwOVTzV8ysIeRYSecL4dSRdAwI9Rd';
  const sesamestNytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=(’sesame street’)&begin_date=20200101&api-key=2cgcwOVTzV8ysIeRYSecL4dSRdAwI9Rd';

  // create a variable to go get my url and store it
  const muppetResponse = await fetch(muppetsNytimesUrl);
  const sesameResponse = await fetch(sesamestNytimesUrl);

      // if it's not ok, let's get out of here
      if (!muppetResponse.ok) {
        throw new Error('failed to retrieve muppets from nytimes');
      } else if (!sesameResponse.ok) {
        throw new Error ('failed to retrieve sesamest from nytimes');
      }

  // transform response into JSON
  const jsonMuppetsNyt = await muppetResponse.json();
  const jsonSesameNyt = await sesameResponse.json();

  // console.log('working');

  //create a variable that stores the first title
  var muppetNytTitle = jsonMuppetsNyt.response.docs;

  //muppet title loop
  for(var i = 0; i < muppetNytTitle.length; i++) {
    var obj = muppetNytTitle[i];
    var muppetsOnNytimes = obj.headline.main;
  }

  //sesame street title loop
  var sesameNytTitle = jsonSesameNyt.response.docs;
  // console.log('this:',muppetNytTitle);

  //sesame title loop
  for(var i = 0; i < sesameNytTitle.length; i++) {
    var obj = sesameNytTitle[i];
    var sesamestOnNytimes = obj.headline.main;
    console.log(sesamestOnNytimes);
  }

  //create a variable that stores the image that goes with it
  const muppetNytImage = jsonMuppetsNyt.response.docs;
  for(var i = 0; i < muppetNytImage.length; i++) {
    var obj = muppetNytImage[i];
    var muppetsImageOnNytimes = obj.multimedia[0].url
    muppetsImageOnNytimes = 'http://www.nytimes.com/'+ muppetsImageOnNytimes
    console.log(muppetsImageOnNytimes)
  }

  //create a variable that stores the image that goes with it
  const sesameNytImage = jsonSesameNyt.response.docs;
  for(var i = 0; i < jsonSesameNyt.length; i++) {
    var obj = jsonSesameNyt[i];
    var sesameImageOnNytimes = obj.multimedia[0].url
    sesameImageOnNytimes = 'http://www.nytimes.com/'+ sesameImageOnNytimes;
    console.log(sesameImageOnNytimes);
  }


  //create a variable that stores the category
  // const nytCategory = json.results[0].subsection;

  //Must provide either a full version or a summary of the article for the pop up screen.
  // const nytAbstract = json.results[0].abstract;

  //article links
  // const nytLink = json.results[0].url;
  // console.log('test here', nytLink)

  //replace the h3 title to become muppetNytTitle
  // document.getElementsByTagName("h3")[0].innerHTML = nytListTitle;

  // //when you click on it, it opens the popup
  // document.getElementsByTagName("h3")[0].addEventListener('click', function (event) {
  //   document.getElementById('popUp').querySelector('h1').innerHTML = nytListTitle;
  //   document.getElementById('popUp').querySelector('p').innerHTML = nytAbstract;
  //   document.getElementById("popUp").querySelectorAll('a')[1].href = nytLink;
  // })

  //replace the category
  // document.getElementsByTagName("h6")[0].innerHTML = nytCategory;

  //replace the image to match the title
  // document.querySelectorAll('img')[1].src = nytListImage;



};


// DOM is ready for manipulation
const onLoadHandler = () => {
  console.log('Dom is ready');
  try {
    console.log('All is well')
  } catch (err) {
    console.log("yeah this isn't working...")
  }
  retrieveTitles();

};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
  onLoadHandler();
}
