let categoryMain;

const fetchCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const category = data.data;
    const catBtnContainer = document.getElementById("categoryBtn-container");
    let selectedBtn = null;
    category.forEach((cat) => {
        const div = document.createElement("div");
        const btn = document.createElement("button");
        btn.textContent = cat.category;
        btn.classList =
            "bg-secondary-gray px-4 md:px-5 py-2 rounded text-[#252525B3] text-sm md:text-base font-semibold cursor-pointer";
        btn.id = `${cat.category_id}`;
        btn.addEventListener("click", () => {
            if (selectedBtn) {
                selectedBtn.classList.remove("bg-main-color", "text-white");
                selectedBtn.classList.add("bg-secondary-gray", "text-[#252525B3]");
            }
            btn.classList.remove("bg-secondary-gray", "text-[#252525B3]");
            btn.classList.add("bg-main-color", "text-white");

            selectedBtn = btn;
            displayCard(cat.category_id);
        });
        div.appendChild(btn);
        catBtnContainer.appendChild(div);
    });
};

const displayCard = async (categoryId) => {
    categoryMain = categoryId;
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const cardList = data.data;
    // const cardList = await sortCard(categoryId);
    console.log(cardList);
    const cardsContainer = document.getElementById("card-container");

    cardsContainer.textContent = "";

    if (cardList.length > 0) {
        cardsContainer.classList =
            "mx-6 lg:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5";
        cardList.forEach((cardInfo) => {
            const time = cardInfo.others.posted_date;
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time - hours * 3600) / 60);
            const div = document.createElement("div");
            div.innerHTML = `
          <div class="card bg-base-100 mt-6">
              <figure class="rounded-lg">
                  <img
                      src="${cardInfo.thumbnail}"
                      class="w-full h-[200px]"
                      alt="Thumbnail"
                  />
              </figure>
              <div class="card-body px-0 py-4">
                  <div class="px-2 py-1 bg-[#171717] w-fit rounded-md absolute right-3 top-[160px] ${
                      time ? "block" : "hidden"
                  } ">
                      <p class="text-white text-sm">${hours} hrs ${minutes} min ago</p>
                  </div>
                  <div class="flex gap-4">
                      <img
                          src="${cardInfo.authors[0].profile_picture}"
                          alt="Profile"
                          class="rounded-full w-[45px] h-[45px]"
                      />
                      <div>
                          <p class="text-base font-bold">
                          ${cardInfo.title}
                          </p>
                          <div class="inline-flex gap-2">
                              <p class="text-[#171717B3] text-sm">${
                                  cardInfo.authors[0].profile_name
                              }</p>
                              <img src="./images/verified.png" alt="Verified Icon" class="${
                                  cardInfo.authors[0].verified ? "inline-flex" : "hidden"
                              }"/>
                          </div>
                          <p class="text-[#171717B3] text-sm">${cardInfo.others.views} views</p>
                      </div>
                  </div>
              </div>
          </div>`;
            cardsContainer.appendChild(div);
        });
    } else {
        cardsContainer.classList = "";
        const div = document.createElement("div");
        div.classList = "space-y-6 mt-36 flex items-center justify-center flex-col";
        div.innerHTML = ` <img src="./images/Icon.png" alt="Icon" class="" />
        <p class="text-[#171717] font-bold text-3xl text-center">
            Oops!! Sorry, There is no <br />content here
        </p>`;
        cardsContainer.appendChild(div);
    }
};

const sortCard = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`);
    const data = await res.json();
    let newCardList = data.data;
    newCardList.sort((a, b) => {
        // Extract the numeric values from the "views" strings
        const item1 = parseInt(a.others.views.replace("k", "000"), 10);
        const item2 = parseInt(b.others.views.replace("k", "000"), 10);

        // Compare in descending order
        return item2 - item1;
    });
    return newCardList;
};

const sortedCardsList = async (categoryId) => {
    const cardList = await sortCard(categoryId);
    console.log(cardList);
    const cardsContainer = document.getElementById("card-container");

    cardsContainer.textContent = "";

    if (cardList.length > 0) {
        cardsContainer.classList =
            "mx-6 lg:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5";
        cardList.forEach((cardInfo) => {
            const time = cardInfo.others.posted_date;
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time - hours * 3600) / 60);
            const div = document.createElement("div");
            div.innerHTML = `
          <div class="card bg-base-100 mt-6">
              <figure class="rounded-lg">
                  <img
                      src="${cardInfo.thumbnail}"
                      class="w-full h-[200px]"
                      alt="Thumbnail"
                  />
              </figure>
              <div class="card-body px-0 py-4">
                  <div class="px-2 py-1 bg-[#171717] w-fit rounded-md absolute right-3 top-[160px] ${
                      time ? "block" : "hidden"
                  } ">
                      <p class="text-white text-sm">${hours} hrs ${minutes} min ago</p>
                  </div>
                  <div class="flex gap-4">
                      <img
                          src="${cardInfo.authors[0].profile_picture}"
                          alt="Profile"
                          class="rounded-full w-[45px] h-[45px]"
                      />
                      <div>
                          <p class="text-base font-bold">
                          ${cardInfo.title}
                          </p>
                          <div class="inline-flex gap-2">
                              <p class="text-[#171717B3] text-sm">${
                                  cardInfo.authors[0].profile_name
                              }</p>
                              <img src="./images/verified.png" alt="Verified Icon" class="${
                                  cardInfo.authors[0].verified ? "inline-flex" : "hidden"
                              }"/>
                          </div>
                          <p class="text-[#171717B3] text-sm">${cardInfo.others.views} views</p>
                      </div>
                  </div>
              </div>
          </div>`;
            cardsContainer.appendChild(div);
        });
    } else {
        cardsContainer.classList = "";
        const div = document.createElement("div");
        div.classList = "space-y-6 mt-36 flex items-center justify-center flex-col";
        div.innerHTML = ` <img src="./images/Icon.png" alt="Icon" class="" />
        <p class="text-[#171717] font-bold text-3xl text-center">
            Oops!! Sorry, There is no <br />content here
        </p>`;
        cardsContainer.appendChild(div);
    }
};
fetchCategory();
