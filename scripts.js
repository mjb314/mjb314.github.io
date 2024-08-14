// Define global variables
var navWidth;


// Functions to open and close navigation bar
function openNav() {
  document.getElementById("sidenav").style.width = navWidth;
  document.getElementById("nav-contents").style.opacity='100%';
  document.getElementById("close").style.opacity='100%';
  document.getElementById("open").style.opacity='0%';
  document.getElementById("pagecontent").style.marginLeft= navWidth;
  document.getElementById("sidenav").style.overflow='auto';
  localStorage.setItem('nOpen', "o");
}

function closeNav() {
  document.getElementById("sidenav").style.width = "3rem";
  document.getElementById("nav-contents").style.opacity='0%';
  document.getElementById("close").style.opacity='0%';
  document.getElementById("open").style.opacity='100%';
  document.getElementById("pagecontent").style.marginLeft= "3rem";
  document.getElementById("sidenav").style.overflow='hidden';
  localStorage.setItem('nOpen', "c");
}

function toggleContacts() {
  if (localStorage.getItem('cOpen') === "o") {
  document.getElementById('contactTile').style.height = '0';
  document.getElementById('contactTile').style.padding = '0 5%';
  document.getElementById('contactTile').style.marginTop = '0';
  document.getElementById('contact').classList.toggle('active');
  localStorage.setItem('cOpen', "c");
  }
  else {
  document.getElementById('contactTile').style.height = '6.5rem';
  document.getElementById('contactTile').style.padding = '5%';
  document.getElementById('contactTile').style.marginTop = '5%';
  document.getElementById('contact').classList.toggle('active');
  localStorage.setItem('cOpen', "o");
  }
}


function initNav() {

  // Get navbar width variable from CSS
  navWidth = getComputedStyle(document.body).getPropertyValue('--navWidth');

  // Turn off transition effects during loading
  const transitionedElements = ["sidenav","nav-contents","close","open","pagecontent","contact","contactTile"];
  transitionedElements.forEach((element) => {
    document.getElementById(element).classList.add('notransition');
  });

  // ToDo
  // If on mobile set nat to closed if nOpen is not set

  // Set nav to initial position
  if (localStorage.getItem('nOpen') === "c") {
    closeNav();
  }
  else {
    localStorage.setItem('nOpen', "o");
    openNav();
  }


  // Theme changer

  // DOM elements
  const themeButton = document.getElementById('themechanger');
  const crest = document.getElementById('crest');
  const body = document.body;

  // Define themes and logo filenames
  const themes = ["cam","emma","rg"];
  const theme_crests = ["cam-crest.svg","emma-crest.svg","rg-crest.png"];
  const nthemes = themes.length; // number of themes
  const crest_path = 'imgs/crests/'; // file containing crests

  // Apply the cached theme on reload
  const theme = localStorage.getItem('theme');

  if (theme) { // if there is already a theme in storage
    body.classList.add(theme); // apply theme to body
    var ind = themes.indexOf(theme); // find the index of the theme
    crest.src = crest_path.concat(theme_crests[ind]); // set the correct crest
  }
  else { // if no theme stored
    localStorage.setItem('theme', themes[0]); // initialise to first theme
    var ind = 0; // set index
    body.classList.add(themes[0]); // apply theme
    crest.src = crest_path.concat(theme_crests[0]); // set the correct crest
  }

  // Button Event Handler
  themeButton.onclick = () => {
    var prev = ind; // store previous index
    ind++; // increment index
    ind %= nthemes; // modulus to create index
    body.classList.replace(themes[prev], themes[ind]); // swap in new theme
    crest.src = crest_path.concat(theme_crests[ind]); // set new crest
    localStorage.setItem('theme', themes[ind]); // store new theme
  };


  // Contacts event Handler

  if (localStorage.getItem('cOpen') === "o") {
    /* When the page is changed, the style.css script reloads and closes the
    contacts tile. So, if it is supposed to be open, run the open function to
    keep it open across pages. */
    localStorage.setItem('cOpen', "c");
    toggleContacts();
  }
  else {
    localStorage.setItem('cOpen', "c");
  }

  document.getElementById('contact').onclick = toggleContacts;

  // Turn back on transition effects
  transitionedElements.forEach((element) => {
    document.getElementById(element).offsetHeight; // Trigger a reflow, flushing the CSS changes
    document.getElementById(element).classList.remove('notransition');
  });
}

function initModal() {
  // Modal popup Handler
  var modal = document.getElementById('modal');
  var modalOpen = document.getElementById('Mopen');
  var modalClose = document.getElementById('Mclose');
  var cvNavBtn = document.getElementById('cvNavBtn');

  if (modal) { /* required as modal object is not on all pages */
      function openModal() {
        modal.style.opacity = "100%";
        modal.style.visibility = "visible";
        cvNavBtn.classList.add('active');
      }
      function closeModal() {
        modal.style.opacity = "0%";
        modal.style.visibility = "hidden";
        cvNavBtn.classList.remove('active');
      }
      
      if (modalOpen) {
        modalOpen.onclick = openModal;
      } /* simarly CV tile not on all pages */

      /* Nav an modal close are on all pages */
      cvNavBtn.onclick = openModal;
      modalClose.onclick = closeModal;

      /* If click away from the popup */
      window.onclick = function(event) {
        if (event.target == modal) {
          closeModal();
        }
      }
  }
}