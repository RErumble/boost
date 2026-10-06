AOS.init()

//인트로 슬라이더
const wordSwiper = new Swiper('.app-intro .swiper', {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
  allowTouchMove: false,
  autoplay: {
    delay: 2000
  },
  speed:1000
});

//챌린지 섹션 슬라이더
const challengeSlider = new Swiper('.challenge-list', {
  loop:true,
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2000
  },
  speed:1000
});

//챌린지 스크롤 슬라이더
const verticalScroll = new Swiper('.vertical-scroll', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  mousewheel: true,
});

// 헤더 - 스크롤 시 bar 너비 + header 변경
let bar = document.querySelector('.bar')
let header = document.querySelector('header')
let mainVisual = document.querySelector('.main-visual')

window.addEventListener('scroll',() => {
  //스크롤 bar 너비
  let body_h = document.body.offsetHeight //전체 높이
  let view_h = window.innerHeight //뷰포트 높이
  let per = window.scrollY/(body_h-view_h) * 100
  bar.style.width = per + '%'
  
  //header 변경 (progress 투명 변경)
  if(window.scrollY > mainVisual.offsetHeight - header.offsetHeight){
    header.classList.add('drop')
    document.querySelector('.scroll-progress').style.background='#ffffff'
  }
  else{
    header.classList.remove('drop')
    document.querySelector('.scroll-progress').style.background = 'transparent'
  }
})

// full menu 모달
let menuBtn = document.querySelector('header .all-menu')
let fullMenu = document.querySelector('.full-menu')
let closeBtn = document.querySelector('.full-menu button.close')

menuBtn.addEventListener('click', () => {
  fullMenu.classList.add('open')
  wordSwiper.forEach((word) => {
    word.autoplay.stop()
  })
  challengeSlider.autoplay.stop()
})
closeBtn.addEventListener('click', () => {
  fullMenu.classList.remove('open')
  wordSwiper.forEach((word) => {
    word.autoplay.start()
  })
  challengeSlider.autoplay.start()
})

//챌린지 섹션 모달 구현
let modalContainer = document.querySelector('.modal-container')
let dim = document.querySelector('.dim')
let slides = document.querySelectorAll('.challenge-list .swiper-slide')
let contents = document.querySelectorAll('.modal article > div')

slides.forEach((slide) => {
  slide.addEventListener('click', () => {
    modalContainer.classList.add('open')
    challengeSlider.autoplay.stop()
    
    let el = document.querySelector('.' + slide.dataset.topic)
    contents.forEach((div) => {
      div.classList.remove('open')
    })
    el.classList.add('open')
  })
})
dim.addEventListener('click', () => {

  modalContainer.classList.remove('open')
  challengeSlider.autoplay.start()
})

// faq 아코디언
let faq_ul = document.querySelectorAll('.faq-container ul')

faq_ul.forEach((faq) => {
  faq.addEventListener('click',() => {
    faq.classList.toggle('drop-open')
  })
})

//서비스 드롭다운
let serviceList = document.querySelector('.service-list ul')
let selected = document.querySelector('li.selected')
let serviceCta = document.querySelector('a.go-service')

serviceList.addEventListener('click', (ev) => {
  let target = ev.target
  let selectText = selected.innerText //기존 선택 목록
  let selectData = selected.dataset.linkname //기존 선택 링크
  selected.innerText = target.innerText //선택 목록 변경
  selected.dataset.linkname = target.dataset.linkname //선택 링크 변경
  target.innerText = selectText
  target.dataset.linkname = selectData
  serviceList.classList.toggle('drop')
  serviceCta.href = 'https://boost-up.online/' + selected.dataset.linkname
})

let topBtn = document.querySelector('.go-top')

topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})