const homepageList = document.querySelector(".homepage-products-section");
const productsDOM = document.querySelector(".products-center");
const overlayMenu = document.querySelector(".fa-bars");
const overlayMenuDOM = document.querySelector(".menu-overlay");
const overlayMenuList = document.querySelector(".menu-overlay-list");
const shoesCategory = document.querySelector('.shoes-category-list')
const shoesCategoryTitle = document.querySelector('.shoes-category-title')

const categoryProducts = document.querySelector('.category');

const ads = document.querySelector('.ads');
const adsSection = document.querySelector('.advertisment-section')
const collectionDOM = document.querySelector(".collection");

const categoryGenre = document.querySelector(".category-genre");
const categoryType = document.querySelector(".category-type");

//filters
const filterBtn = document.getElementById("filter-btn");
const filterDOM = document.querySelector('.filters');

const colorsFilter = document.querySelector(".color-filter");
const colorsList = document.querySelector(".colors");

const brandsFilter = document.querySelector(".brand-filter");
const brandsList = document.querySelector(".brands");

const shoesFilter = document.querySelector(".shoes-filter");
const shoesList = document.querySelector(".shoes");

const iconsFilter = document.querySelector(".icon-filter");
const iconsList = document.querySelector(".icons");

const techFilter = document.querySelector(".tech-filter");
const techList = document.querySelector(".technology");

const shoeHeightFilter = document.querySelector(".s-h-filter");
const shoeHeightList = document.querySelector(".s-height");

const widthFilter = document.querySelector(".width-filter");
const widthList = document.querySelector(".s-width");

const shoeFeelFilter = document.querySelector(".s-f-filter");
const shoeFeelList = document.querySelector(".s-feel");

const surfaceFilter = document.querySelector(".surface-filter");
const surfaceList = document.querySelector(".surface");

const closureTypeFilter = document.querySelector(".closure-type-filter");
const closureTypeList = document.querySelector(".closure-type");

const benefitsFilter = document.querySelector(".benefits-filter");
const benefitsList = document.querySelector(".benefits");

const sizeFilter = document.querySelector(".size-filter");
const sizeList = document.querySelector(".sizes");



let filters = {}
let shoes = []

class Products{
    async getShoes(genre = "", category = ""){
        try{
            if( shoes.length === 0){
                let data_from_server = await fetch('shoes.json');
                let data_json = await data_from_server.json();
                let data = await data_json.shoes;
                
                if(category !== ""){
                    data.forEach(item =>{
                        if(item.genre === genre && item.category === category){
                            shoes.push(item);
                        }
                    })
                }else{
                    data.forEach(item =>{
                        if(item.genre === genre){
                            shoes.push(item);
                        }
                    })
                }
            }
            return shoes;
        }catch(error){
            alert(error);
        }
    }

    async getFilteredShoes(){
        return shoes.filter(function(item){
            for( let key in filters){
                if(Array.isArray(item[key])){
                    if(!item[key].includes(filters[key])){
                        return false;
                    }
                }
                else if(item[key] === undefined || item[key] !== filters[key]){    
                    return false;
                }
            };
            return true;
        })
    }
}

class UI{
    constructor(){
        this.condition = true;
    }
    
    displayProducts(products){
        let result='';
        products.forEach(product=>{
            result+=`
                <div class="product-item">
                    <img class="img-item" src=${product.image[0]} alt="">
                    <div class="details-item">
                        <p class="title">${product.title}</p>
                        <p class="price">${product.price} LEI</p>
                    </div>
                    <p class="category-item">${product.genre}'s ${product.category}</p>
                    <p class="colors-item">${product.colors.length} Colors</p>
                </div>
            `;
        })
        productsDOM.innerHTML = result;
    }

    runAds(){
        if(this.condition){
            ads.innerHTML = `
            <div class="section-one">Free Returns. Return whatever you don't love within 30 days.</div>
            <div class="section-two">Learn more</div>
            `;
        }else{
            ads.innerHTML = `
            <div class="section-one">OUR LATEST  AND GREATEST, IN YOUR INBOX</div>
            <div class="section-two">Sign up</div>
            `;
        }
        this.condition = !this.condition;
    }

    adsLoop(){
        window.setInterval(this.runAds,2000);
    }

    setData(){
        let elements = shoesCategory.children;
        for(let i = 0; i < elements.length; i++){
            let count = 0;
            shoes.forEach(item =>{
                if(item.category.toLowerCase() === elements[i].innerText.split(" ")[0].toLowerCase()){
                    count = count + 1;
                }
            })
            elements[i].innerHTML = elements[i].innerText.split(" ")[0] + ` <span class="no-pieces">(${count})</span>`;
        }
        categoryGenre.innerHTML = filters.genre;

        shoesCategoryTitle.innerText = `${categoryGenre.innerText}'s all shoes`;
    }
}


let showMenu = false;
    
document.addEventListener("DOMContentLoaded",()=>{
    const ui= new UI();
    const products = new Products();
    ui.adsLoop();
    filters.genre = localStorage.getItem("genre");
    //get all products
    products.getShoes(filters.genre)
        .then(products.getFilteredShoes())
        .then(products =>{
            ui.displayProducts(products);
            ui.setData();
    });
    overlayMenu.addEventListener('click',function(){
        if(showMenu){
            overlayMenuDOM.classList.remove("hidden");
        }else{
            overlayMenuDOM.classList.add("hidden");
        }
        showMenu = !showMenu;
    })
    shoesCategory.addEventListener('click',function(){
        let category = "";
        if(event.target && event.target.matches("li")){
            category = event.target.innerText.split(" ")[0];
        }else if(event.target && event.target.matches("span")){
            category = event.target.parentElement.innerText.split(" ")[0];
        }
        filters.category = category.toLowerCase();
        products.getFilteredShoes().then(products=>{
            ui.displayProducts(products);
            shoesCategoryTitle.innerText = `${categoryGenre.innerText}'s ${category} ${categoryType.innerText}`
        });
    });
  
    function handleMenu(event){
        localStorage.setItem("genre",event.target.innerText.toLowerCase());
        filters = {
            genre:localStorage.getItem("genre"),
        };
        shoes = [];
        products.getShoes(filters.genre)
            .then(products =>{
                ui.displayProducts(products);
                ui.setData();
        });
        categoryGenre.innerHTML = filters.genre;
        shoesCategoryTitle.innerText = `${categoryGenre.innerText}'s all shoes`;
        localStorage.setItem("type","shoes");
     }
    
    collectionDOM.addEventListener('click',function(){        
        handleMenu(event);
    })
    
    overlayMenuList.addEventListener('click',()=>{
        handleMenu(event);
    })
    
    let hidden = false;
    
    filterBtn.addEventListener('click',function () {
        if(getWidth() <= 800){
            filterDOM.classList.remove('filters');
            filterDOM.classList.add('filters-900px');
        }else{
            if(hidden){
                filterDOM.classList.add("hidden");
            }else{
                filterDOM.classList.remove("hidden");
            }
            hidden = !hidden;                
        }
        
    })

    colorsFilter.addEventListener('click',function(){
        handleFilters(this,colorsList);
    })
    colorsList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.colors = event.target.lastElementChild.innerHTML.toLowerCase();
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                });
        }else if(event.target && event.target.matches("div")){
            filters.colors = event.target.parentElement.lastElementChild.innerHTML.toLowerCase();
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                });
        }
    })

    brandsFilter.addEventListener('click',function(){
        handleFilters(this,brandsList);
    })
    brandsList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.brand = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items);
                    hideFilters();
                })
        }
    })

    shoesFilter.addEventListener('click',function(){
        handleFilters(this,shoesList);
    })
    shoesList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.shoes = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                })
        }
    })

    iconsFilter.addEventListener('click',function(){
        handleFilters(this,iconsList);
    })
    iconsList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.icon = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                })
        }
    })

    techFilter.addEventListener('click',function(){
        handleFilters(this,techList);
    })
    techList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.technology = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                })
        }
    })

    shoeHeightFilter.addEventListener('click',function(){
        handleFilters(this,shoeHeightList);
    })
    shoeHeightList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.shoeHeight = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                })
        }
    })

    widthFilter.addEventListener('click',function(){
        handleFilters(this,widthList);
    })
    widthList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.width = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                    hideFilters();
                })
        }
    })

    surfaceFilter.addEventListener('click',function(){
        handleFilters(this,surfaceList);
    })
    surfaceList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.surface = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                })
        }
    })

    benefitsFilter.addEventListener('click',function(){
        handleFilters(this,benefitsList);
    })
    benefitsList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.benefits = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                })
        }
    })

    sizeFilter.addEventListener('click',function(){
        handleFilters(this,sizeList);
    })

    sizeList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.size = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                })
        }
    })

    shoeFeelFilter.addEventListener('click',function(){
        handleFilters(this,shoeFeelList);
    })
    shoeFeelList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.shoeFeel = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                })
        }
    })


    closureTypeFilter.addEventListener('click',function(){
        handleFilters(this,closureTypeList);
    })
    closureTypeList.addEventListener('click',function(){
        if(event.target && event.target.matches("li")){
            filters.closure = event.target.innerText
            products.getFilteredShoes()
                .then(items =>{
                    ui.displayProducts(items)
                })
        }
    })

})

function handleFilters(target,filterList) { 
    if(target.children.length === 0){
        if(target.className === "fas fa-chevron-down"){
            target.className = "fas fa-chevron-up";
            target.parentElement.parentElement.removeChild(filterList);
        }else{
            target.className = "fas fa-chevron-down";
            target.parentElement.parentElement.appendChild(filterList);
        }
    }else{
        let chevron_icon = target.children[0].className;
        if(chevron_icon === "fas fa-chevron-down"){
            target.children[0].className = "fas fa-chevron-up";
            target.parentElement.removeChild(filterList);
        }else{
            target.children[0].className = "fas fa-chevron-down";
            target.parentElement.appendChild(filterList);
        }
    }
 }
 function hideFilters(){
    if(getWidth()<=800){
        
        filterDOM.classList.remove("filters-900px")
        filterDOM.classList.add("filters");
    }
}
function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }