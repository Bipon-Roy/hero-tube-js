const fetchCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const category = data.data;
    // console.log(category[0].category);
    const catBtnContainer = document.getElementById("categoryBtn-container");
    category.map((cat) => {
        // console.log(cat);
        const div = document.createElement("div");
        div.innerHTML = `
        <button
           class="bg-secondary-gray px-4 md:px-5 py-2 rounded text-[#252525B3] text-sm md:text-base font-semibold cursor-pointer"
           onclick="displayCard('${cat.category_id}')"
           >
           ${cat.category}
        </button>`;
        catBtnContainer.appendChild(div);
    });
};

const displayCard = async (categoryId) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const cardNumber = data.data;
    // console.log(data.data);
    const cardsContainer = document.getElementById("card-container");
    cardsContainer.textContent = "";

    if (cardNumber.length > 0) {
        cardsContainer.classList =
            "mx-6 lg:mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5";
        cardNumber.forEach((cardInfo) => {
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
                  <div class="px-2 py-1 bg-[#171717] w-fit rounded-md absolute right-3 top-[160px]">
                      <p class="text-white text-sm ${
                          time ? "block" : "hidden"
                      } ">${hours} hrs ${minutes} min ago</p>
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
            // const verified = cardInfo.authors[0].verified;
            // console.log(verified);
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
