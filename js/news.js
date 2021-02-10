import { nyTimesKey } from "./keys.js";

create function to retrieve info from NYTimes
const muppetsNewYorkTimes = async () => {

  //Retrieve information from the URl
  const muppetsNytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=(’muppets’)&begin_date=20200101&api-key=2cgcwOVTzV8ysIeRYSecL4dSRdAwI9Rd';
  // create a variable to go get my url and store it
  const muppetResponse = await fetch(muppetsNytimesUrl);
  // if it's not ok, let's get out of here
  if (!muppetResponse.ok) {
    throw new Error('failed to retrieve muppets from nytimes');
  } else if (!sesameResponse.ok) {
    throw new Error('failed to retrieve sesamest from nytimes');
  }

  // transform response into JSON
  const jsonMuppetsNyt = await muppetResponse.json();
  let muppetInfo = jsonMuppetsNyt.response.docs;

  let rowContainer = document.querySelector(".row");

  for (let i = 0; i < muppetInfo.length; i++) {
    let obj = muppetInfo[i];
    let col = document.createElement('div');
        col.className = "col-4 mb-4";
    let card = document.createElement('div');
        card.className = "card";
        card.style = "width: 18rem;";
    let cardBody = document.createElement('div');
        cardBody.className = "card-body";
    let imgLink = `http://www.nytimes.com/` + obj.multimedia[0].url;
    let embed = document.createElement('div');
        embed.className = "embed-responsive embed-responsive-4by3 card-image-top";
    let embedR = document.createElement('div');
        embedR.className = "embed-responsive-item articleImage"
        embedR.style.backgroundImage = "url('" + imgLink + "')";
    let title = document.createTextNode(obj.headline.main);
    let h6 = document.createElement('h6');
        h6.className = "card-title";
    let anchor = document.createElement("a");
        anchor.className = "btn btn-primary";
        anchor.target = "_blank";
        anchor.innerText = "Go to Article"
        anchor.href = obj.web_url;


  	h6.appendChild(title);
    cardBody.appendChild(h6);
    cardBody.appendChild(anchor);
    card.appendChild(embed);
    embed.appendChild(embedR);
    card.appendChild(cardBody);
    col.appendChild(card)
  	rowContainer.appendChild(col);
  }
}


//
// const sesamestNewYorkTimes = async () => {
//
//   const sesamestNytimesUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=(’sesame street’)&begin_date=20200101&pub_date&api-key=${nyTimesKey}`;
//   const sesameResponse = await fetch(sesamestNytimesUrl);
//
//   // transform response into JSON
//   const jsonSesameStNyt = await sesameResponse.json();
//   let sesameStInfo = jsonSesameStNyt.response.docs;
//
//   let rowContainer = document.querySelector(".row");
//
//   for (let i = 0; i < sesameStInfo.length; i++) {
//     let obj = sesameStInfo[i];
//     let col = document.createElement('div');
//         col.className = "col-4 mb-4";
//     let card = document.createElement('div');
//         card.className = "card";
//         card.style = "width: 18rem;";
//     let cardBody = document.createElement('div');
//         cardBody.className = "card-body";
//     let imgLink = `http://www.nytimes.com/` + obj.multimedia[0].url;
//     let embed = document.createElement('div');
//         embed.className = "embed-responsive embed-responsive-4by3 card-image-top";
//     let embedR = document.createElement('div');
//         embedR.className = "embed-responsive-item articleImage"
//         embedR.style.backgroundImage = "url('" + imgLink + "')";
//     let title = document.createTextNode(obj.headline.main);
//     let h6 = document.createElement('h6');
//         h6.className = "card-title";
//     let anchor = document.createElement("a");
//         anchor.className = "btn btn-primary";
//         anchor.target = "_blank";
//         anchor.innerText = "Go to Article"
//         anchor.href = obj.web_url;
//     let summary = document.createTextNode(obj.abstract);
//     let abstract = document.createElement('p');
//         abstract.className = "card-text";
//     let pubDate = obj.pub_date;
//         pubDate = pubDate.slice(0,10);
//     let pubDateBetter = document.createTextNode(pubDate);
//     let published = document.createElement('p');
//         published.className = "card-text about mb-0 mt-0";
//
//   	h6.appendChild(title);
//     published.appendChild(pubDateBetter);
//     cardBody.appendChild(published);
//     abstract.appendChild(summary);
//     cardBody.appendChild(h6);
//     cardBody.appendChild(abstract);
//     cardBody.appendChild(anchor);
//     card.appendChild(embed);
//     embed.appendChild(embedR);
//     card.appendChild(cardBody);
//     col.appendChild(card)
//   	rowContainer.appendChild(col);
//   }
// }
//
//


// DOM is ready for manipulation
const onLoadHandler = () => {
  console.log('Dom is ready');
  try {
    console.log('All is well')
  } catch (err) {
    console.log("yeah this isn't working...")
  }
  muppetsNewYorkTimes();
  // sesamestNewYorkTimes();

};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onLoadHandler);
} else {
  onLoadHandler();
}
