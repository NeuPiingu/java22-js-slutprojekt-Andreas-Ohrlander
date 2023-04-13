let searchResult = [];
let imageSize = "";

function searchInput() {
  const searchInput = document.getElementById("search__input").value;
  const resultValue = document.getElementById("resultValue").value;
  imageSize = document.getElementById("size_select").value;
  const contentNode = document.getElementById("content");
  contentNode.innerHTML = "";
  fetch(
    "https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=2d877b5ee34e9e5c9b5ba651c8ccd69f&text=" +
      searchInput +
      "&format=json&nojsoncallback=1"
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < resultValue; i++) {
        searchResult.push(data.photos.photo[i]);
        createNewImgage(i);
      }

      searchResult = [];
    })
    .catch((error) => {
      console.log(error);
    });
}

function createNewImgage(i) {
  let newImg = document.createElement("img");
  newImg.src =
    "https://live.staticflickr.com/" +
    searchResult[i].server +
    "/" +
    searchResult[i].id +
    "_" +
    searchResult[i].secret +
    "_" +
    imageSize +
    ".jpg";
  document.getElementById("content").appendChild(newImg);
}

const inputValue = document.querySelector("#resultValue");
document.querySelector("#resultValue").addEventListener("input", (event) => {
  if (isNumber(inputValue.value) != true) {
    inputValue.value = "";
  } else if (inputValue.value > 100) {
    inputValue.value = "";
  }
});

function isNumber(char) {
  return /^\d+$/.test(char);
}

/* https://www.flickr.com/services/rest?method=flickr.photos.search&api_key=2d877b5ee34e9e5c9b5ba651c8ccd69f&text=text&format=json */
