//create a variable that stores the info
let muppetNytTitle = jsonMuppetsNyt.response.docs;

let rowContainer = document.querySelector(".row");

for (let i = 0; i < muppetNytTitle.length; i++) {
  let obj = muppetNytTitle[i];
  let div = document.createElement('div');
  div.className = "card";
  let h5 = document.createElement('h5');
  let title = document.createTextNode(obj.headline.main);
  h5.appendChild(title);
  div.appendChild(h5);
  rowContainer.appendChild(div);

}
