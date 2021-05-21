const openSearchBtn = document.querySelector('#openSearch');
const inputWrap = document.querySelector('#inputWrap');
const closeButton = document.querySelector('#buttonClose');
const headerTop = document.querySelector('#headerTop');
const slider = document.querySelector('#slider');
const newsBlock = document.querySelector('#news');
const goTopButton = document.querySelector('#goTopButton');
const dropbutton = document.querySelector('#dropbutton');
const body = document.querySelector('body');
const dropDown = document.querySelectorAll('.nav-drop');
const list = document.querySelectorAll('.dropdown');
var dataRev;
var dataNews;
function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}
dropbutton.addEventListener('click',changeImage);
readTextFile("./data/reviews.json", function (text) {
  dataRev = JSON.parse(text);
  drawRev(slider, dataRev);
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    responsive:{
      0:{
          items:1,
          nav:true
      },
      768:{
          items:2,
          nav:false
      },
      992:{
          items:3,
          nav:true,
          loop:false
      }
  }
  });
});
readTextFile("./data/news.json", function (text) {
  dataNews = JSON.parse(text);
  drawNews(newsBlock, dataNews);
});

jQuery(document).ready(function ($) {
  $('.popup-content').magnificPopup({
    type: 'inline'
  });
});

$('.image-link').magnificPopup({
  type: 'image',
  mainClass: 'mfp-with-zoom',

  zoom: {
    enabled: true,

    duration: 300,
    easing: 'ease-in-out',

    opener: function (openerElement) {
      return openerElement.is('img') ? openerElement : openerElement.find('img');
    }
  }
});
openSearchBtn.addEventListener('click', openInput);
closeButton.addEventListener('click', closeInput);
document.addEventListener('click', removeClass);
for (let i of dropDown) {
  i.addEventListener('click', setArrow);
}

function setArrow() {
  this.parentNode.classList.toggle('shevron-bot');
}
function removeClass(e) {
  for (let i of list) {
    i.classList.remove('shevron-bot');
  }
}
function changeImage (){
  dropbutton.classList.toggle("drop-button-arrow");
  body.classList.toggle('dark-body');
}

function openInput() {
  inputWrap.classList.add('open-input');
}
function closeInput() {
  inputWrap.classList.remove('open-input');
}
window.addEventListener('scroll', checkScroll);
function checkScroll() {
  if (pageYOffset > 300) {
    goTopButton.classList.add('go-top-active');
    headerTop.classList.add('header-fix');
  }
  else {
    goTopButton.classList.remove('go-top-active');
    headerTop.classList.remove('header-fix');
  }
}

function drawRev(block, fromFile) {
  while (block.firstChild) {
    block.removeChild(block.firstChild);
  }

  for (let i = 0; i < fromFile.length; i++) {
    var stars = '';
    for (let j = 0; j < 5; j++) {
      j < fromFile[i].stars ? stars += `<span class="icon-star-full icon-star-full-gold"></span>` : stars += `<span class="icon-star-full"></span>`;
    }

    let revItem = `<div class="slide">
                      <div class="slide-wrap-text ${fromFile[i].text.length > 200 ? `slide-cut` : ``}">
                        <p class="slide-text">${fromFile[i].text}</p>
                      </div>
                      <div class="slide-info">
                        <img class="slide-image" src="${fromFile[i].image}" loading="lazy" alt="rewiewer photo">
                        <div class="slide-description">
                          <h4 class="slide-name">${fromFile[i].name}</h4>
                          <span class="slide-city">${fromFile[i].city}</span>
                          <div class="stars">
                            ${stars}
                          </div>
                        </div>
                      </div>
                    </div>`;
    block.innerHTML += revItem;
  }
}
function drawNews(block, fromFile) {
  for (let i = 0; i < fromFile.length; i++) {
    let revItem = `<div class="col-12 col-md-6 col-lg-4">
                  <div class="news-item-wrap">
                    <a href="${fromFile[i].link}">
                      <img src="${fromFile[i].image}" loading="lazy" alt="${fromFile[i].alt}">
                    </a>
                    <a href="${fromFile[i].link}" class="news-title">${fromFile[i].title}</a>
                    <span class="news-date">${fromFile[i].date}</span>
                    <p class="news-text">${fromFile[i].text}</p>
                  </div>
                </div>`;
    block.innerHTML += revItem;
  }
}