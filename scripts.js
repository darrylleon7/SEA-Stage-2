/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

/* 

How to code in JS is primary
Goal: make catalogue website
1. Filter Feature
    a. Create icon that has a popup
    b. when you put in specifications in data structure we only show things with specific id
    c. remove and display data with the specifc id

2. Search Feature
    a. create search bar itself
    b. when you search in search bar we look for thigns with name ""shirt""  or "pants" if nothing similar "print whatever" in database (object)
    c. on enter we go to all the things similar in a page

  3. Data Management Steps
    a. Console log the data and get that working and print the individual image link dynamically
    b. You want to make an image in html and then connect that to javascript and then dynamically display images there
    c. Add a title above the image and use a div to bundle together then done!
*/


//New JS Code Below

function toggleSidebar(){                
  document.getElementById("sidebar").classList.toggle('active');
}

// Scroll Detection Code
let lastScrollTop = 0;        //here is the intial start of the page and increases when the user scrolls down (vertically), updates when the user scrolls
const hamburger = document.getElementById("hamburger");   // here we're getting the element ID of "hamburger"
window.addEventListener("scroll", function(){       // this listens/waits for when the user is scrolling to activate the function
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;  // this gets the current scroll position "window.pageYOffset" is the current way to get vertical scrolls and the other one is a fallback for old browsers

  if(scrollTop > lastScrollTop){      //this compares the new scroll position value to the old one and makes the hamburger bar to disappear (hence meaning the user is scrolling down)
    hamburger.style.opacity= "0";
    hamburger.style.pointerEvents = "none";
  }else{                             // else once it scrolls up the hamburger appears again
    hamburger.style.opacity= "1";
    hamburger.style.pointerEvents = "auto";
  }

  lastScrollTop = scrollTop;    //keeps track of scroll postion 
});

// Search Bar Code
let allData = [];  //this here stores all the data of the images/information from the JSON File, starts off as an empty array
const searchInput = document.getElementById("search");  //here I am taking the search bar input field from the HTML and JS is looking for the ID "search" , this allows us to get whatever the user puts in
const searchBtn = document.getElementById("search-btn"); // here we're looking for the ID "search-btn" which is the actual search button and will trigger a search once clicked on
const container = document.getElementById("image-container"); //targets the <div> element where the images are shown and will either display the matching images or show "no result found"


function displayImages(images) {  //utilizing a reusable function i'm able to call this multiple times, it takes the images parameter from the JSON file
  container.innerHTML = "";     //clears the container before adding new images, if not placed new images would stack on old ones
  images.forEach(item => {     //loops through each item in the images array using "forEach"
    const img = document.createElement("img");  //Dynamically creates a new <img> element through code
    img.src = item.link;    //sets the images source url to the value from the JSON data
    container.appendChild(img);  //this will add the img to the page now becoming visible

    img.style.objectFit = "cover";  //down below gives styling to each <img> element creating a more sleeker look seperating each item
    img.style.width = "200px";
    img.style.margin = "10px";
    img.style.border="1px solid black"
    img.style.backgroundColor="white"
    img.style.borderRadius="30px"
    
  });
}

document.addEventListener("DOMContentLoaded", function(){ //this line waits for the HTML & CSS to load before executing this code, the reason we do this so that the code doesn't execute before everything else missing an important <div> or <img> tag that is esstinal for it to run accordingly
  
  fetch("data.json")            //here we're telling JS to fetch(access) the information from the JSON file
    .then(response => response.json())   //Once the data/file has be downloaded succesfully, "response.json" converts into an JS array from the JSON format
    .then(data => {     //this line is executed once the JSON data has be converted into usable JS
      allData = data;   //saves the full JSON data into "allData" and is important for later when searching for it 
      displayImages(data.slice(0, 50)); // "displayImages" shows them on the website and display's first 50 items initially (0 to 49), creates a new array
      
      searchBtn.addEventListener("click", function () {   // this actives once the search button is clicked
        const query = searchInput.value.trim().toLowerCase();  //here is where it gets whatever the user typed in the search box, .value (reads the input), .trim (removes any spaces made before or after the value placed), .toLowerCase (ensures everything is made lower case to that "Jeans" or "JEANS" are not confused for two different things)
        console.log("Search query:", query); //usefull for debuding and prints out the value into the console
      
        const filtered = allData.filter(item =>           //here we're filtering the fullData array matching it with the search input 
          item.filename.toLowerCase().includes(query)     //here we're looking at the filename of each JSON data & checking if the user's input is in the filename string
        );
        
        if (filtered.length > 0) {  //if there are matches display those images
          displayImages(filtered);
        } else {
          container.innerHTML = "<p>No results found.</p>";     //if nothing comes up, display this message
        }
      });
    })
    .catch(error => console.error("Something Went Wrong:", error)); //if anything failes it is console logged
});









//End of new JS Code



// const FRESH_PRINCE_URL =
//   "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
// const CURB_POSTER_URL =
//   "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
// const EAST_LOS_HIGH_POSTER_URL =
//   "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// // This is an array of strings (TV show titles)
// let titles = [
//   "Fresh Prince of Bel Air",
//   "Curb Your Enthusiasm",
//   "East Los High",
// ];
// // Your final submission should have much more data than this, and
// // you should use more than just an array of strings to store it all.

// // This function adds cards the page to display the data in the array
// function showCards() {
//   const cardContainer = document.getElementById("card-container");
//   cardContainer.innerHTML = "";
//   const templateCard = document.querySelector(".card");

//   for (let i = 0; i < titles.length; i++) {
//     let title = titles[i];

//     // This part of the code doesn't scale very well! After you add your
//     // own data, you'll need to do something totally different here.
//     let imageURL = "";
//     if (i == 0) {
//       imageURL = FRESH_PRINCE_URL;
//     } else if (i == 1) {
//       imageURL = CURB_POSTER_URL;
//     } else if (i == 2) {
//       imageURL = EAST_LOS_HIGH_POSTER_URL;
//     }

//     const nextCard = templateCard.cloneNode(true); // Copy the template card
//     editCardContent(nextCard, title, imageURL); // Edit title and image
//     cardContainer.appendChild(nextCard); // Add new card to the container
//   }
// }

// function editCardContent(card, newTitle, newImageURL) {
//   card.style.display = "block";

//   const cardHeader = card.querySelector("h2");
//   cardHeader.textContent = newTitle;

//   const cardImage = card.querySelector("img");
//   cardImage.src = newImageURL;
//   cardImage.alt = newTitle + " Poster";

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  // console.log("new card:", newTitle, "- html: ", card);
// }

// This calls the addCards() function when the page is first loaded
// document.addEventListener("DOMContentLoaded", showCards);

// function quoteAlert() {
//   console.log("Button Clicked!");
//   alert(
//     "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
//   );
// }

// function removeLastCard() {
//   titles.pop(); // Remove last item in titles array
//   showCards(); // Call showCards again to refresh
// }
