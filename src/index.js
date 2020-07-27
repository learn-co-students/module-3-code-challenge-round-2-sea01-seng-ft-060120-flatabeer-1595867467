// Code here
let beer = document.querySelector(".beer-details");
let description = document.querySelector(".description");
let img = document.querySelector("img");
let reviewForm = document.querySelector(".review-form");
let reviews = document.querySelector(".reviews");
let ul = beer.querySelector("ul");
ul.innerHTML = ``;

fetch(`http://localhost:3000/beers/1`)
  .then((res) => res.json())
  .then((content) => renderBeer(content));

const renderBeer = (item) => {
  let h2 = beer.querySelector("h2");
  let img = beer.querySelector("img");
  let textarea = beer.querySelector("textarea");

  h2.innerText = item.name;
  img.src = item.image_url;
  textarea.innerText = item.description;

  item.reviews.forEach((review) => buildReview(review));

  //add reviews
  reviewForm.addEventListener("submit", (e) => addReview(e, item));

  // update beer des
  description.addEventListener("submit", (e) => updateDes(e, item));
};

const buildReview = (review) => {
  let li = document.createElement("li");
  li.innerText = review;
  if (beer) {
    beer.appendChild(li);
  }
};

//add review
async function addReview(e, item) {
  e.preventDefault();
  let textCom = reviewForm.querySelector("textarea");
  textCom.textContent = e.target[0].value;

  let data = {
    reviews: e.target[0].value,
  };
  const testObj = await fetch("http://localhost:3000/beers/1").then((res) =>
    res.json()
  );

  let li = document.createElement("li");
  li.innerText = e.target[0].value;
  beer.appendChild(li);
  fetch(`http://localhost:3000/beers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "json-patch+json",
      // Accept: "json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

// update
const updateDes = (e, item) => {
  let data = e.target[0].value;
  let textarea = beer.querySelector("textarea");
  textarea.innerText = e.target[0].value;
  fetch(`http://localhost:3000/beers/1`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
