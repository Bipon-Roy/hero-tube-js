const fetchCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const category = data.data;
    // console.log(category[0].category);
    const catBtnContainer = document.getElementById("categoryBtn-container");
    category.map((cat) => {
        console.log(cat);
        const div = document.createElement("div");
        div.innerHTML = ` <button
        class="bg-secondary-gray px-5 py-2 rounded text-[#252525B3] text-base font-semibold cursor-pointer"
    >
        ${cat.category}
    </button>`;
        catBtnContainer.appendChild(div);
    });
};

fetchCategory();
