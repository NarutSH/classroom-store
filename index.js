const productContainer = document.querySelector(".product-container");
const searchInput = document.querySelector(".search-input");
const btnContainer = document.querySelector(".btn-container");

let products = [];

const generateData = (productsArray) => {
  productsArray.map((product) => {
    const data = `<div class="card">
        <img
          src=${product.image}
          alt=${product.title}
          class="card-image"
        />
    
        <h2 class="card-title">${product.title}</h2>
        <div class="card-description">${product.description}</div>
        <div class="card-footer">
          <div class="card-price">$ ${product.price}</div>
          <div class="card-subtotal">⭐${product.rating.rate} (${product.rating.count})</div>
        </div>
      </div>`;

    productContainer.insertAdjacentHTML("beforeend", data);
  });
};

const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const json = await res.json();
  products = json;
  generateData(json);
};

const getAllCategories = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const json = await res.json();

  await json.map((item) => {
    const data = `<button class="btn-category">${item}</button>`;
    btnContainer.insertAdjacentHTML("beforeend", data);
  });

  const btnArray = Array.from(btnContainer.childNodes);

  btnArray.map((btn) => {
    btn.addEventListener("click", (ev) => {
      productContainer.innerHTML = "";
      searchInput.value = "";

      btnArray.map((b) => {
        b.classList.remove("btn-active");
      });

      ev.target.classList.add("btn-active");

      const filterProducts = products.filter(
        (product) => product.category === ev.target.innerHTML
      );

      generateData(filterProducts);
    });
  });

  btnContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="btn-clear">Clear</button>`
  );

  document.querySelector(".btn-clear").addEventListener("click", () => {
    productContainer.innerHTML = "";
    searchInput.value = "";
    btnArray.map((b) => {
      b.classList.remove("btn-active");
    });
    generateData(products);
  });
};

const onHandleSearch = (ev) => {
  const btnArray = Array.from(btnContainer.childNodes);

  productContainer.innerHTML = "";
  btnArray?.map((b) => {
    b.classList.remove("btn-active");
  });

  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(ev.target.value.toLowerCase())
  );

  generateData(filterProducts);
};

getProducts();
getAllCategories();
searchInput.addEventListener("input", onHandleSearch);
