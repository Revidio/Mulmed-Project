
const track   = document.querySelector(".explore__track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  /* ---- helpers ------------------------------------------------------- */
  const GAP = parseFloat(getComputedStyle(document.documentElement)
                         .getPropertyValue('--prog-gap'));   // 32 px
  function cardsPerView(){
      const w = window.innerWidth;
      return w < 600 ? 1 : w < 900 ? 2 : 3;                 // 3 on desktops
  }
  function stepSize(){                                      // card + gap
      const cardWidth = track.firstElementChild.offsetWidth;
      return cardWidth + GAP;
  }
  function maxIndex(){
      return track.children.length - cardsPerView();
  }
  function move(){
      track.style.transform = `translateX(-${index * stepSize()}px)`;
  }

  /* ---- state --------------------------------------------------------- */
  let index = 0;

  /* ---- controls ------------------------------------------------------ */
  nextBtn.onclick = () => { if(index < maxIndex()){ index++; move(); } };
  prevBtn.onclick = () => { if(index > 0){ index--; move(); } };

  window.addEventListener('resize', () => {
      /* keep the current first-visible card centred on resize */
      index = Math.min(index, maxIndex());
      move();
  });

  /* first layout pass */
  window.addEventListener('load', move);



  document.getElementById("review-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const reviewText = document.getElementById("review-text").value.trim();
    const rating = document.getElementById("rating").value;

    if (!reviewText) return;

    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review__content";
    reviewDiv.innerHTML = `
      <p>${reviewText}</p>
      <div class="review__rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
      <hr style="margin: 1rem 0; border: 1px solid var(--primary-color-extra-light);">
    `;

    document.getElementById("user-reviews").prepend(reviewDiv);
    document.getElementById("review-form").reset();
  });