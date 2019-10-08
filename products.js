const collectionDOM = document.querySelector(".collection");
const ads = document.querySelector('.ads');
const adsSection = document.querySelector('.advertisment-section')
const overlayMenu = document.querySelector(".fa-bars");
const overlayMenuDOM = document.querySelector(".menu-overlay");
const overlayMenuList = document.querySelector(".menu-overlay-list");
const homepageProductsList = document.querySelectorAll(".homepage-products-list");
const homepageProductsListTitles = document.querySelectorAll(".homepage-products-list-title");
class UI{
    constructor(){
        this.condition = true;
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
}

let showMenu = false;

document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI();
    ui.adsLoop();
    
    function handleMenu(event){
        localStorage.setItem("genre",event.target.innerText.toLowerCase());
        filters = {
            genre:localStorage.getItem("genre"),
        };
        localStorage.setItem("type","shoes");
     }
    collectionDOM.addEventListener('click',function(){        
        handleMenu(event);
    })
    overlayMenuList.addEventListener('click',()=>{
        handleMenu(event);
    })
    overlayMenu.addEventListener('click',function(){
        if(showMenu){
            overlayMenuDOM.classList.add("hidden");
        }else{
            overlayMenuDOM.classList.remove("hidden");
        }
        showMenu = !showMenu;
    })
    homepageProductsList.forEach(list =>{
        list.children[0].addEventListener('click', () =>{
            for(let i = 1 ; i < list.children.length; i ++){
                if(list.children[i].classList.contains("homepage-products-list-item") && !list.children[i].classList.contains("display-list-items")){
                    list.children[i].classList.add("display-list-items")
                    list.children[i].classList.remove("hide-list-items")
                }else if(list.children[i].classList.contains("homepage-products-list-item") && list.children[i].classList.contains("display-list-items")){
                    list.children[i].classList.remove("display-list-items")
                    list.children[i].classList.add("hide-list-items")
                }          
            }
        });
    })
})