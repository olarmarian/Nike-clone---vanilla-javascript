const collectionDOM = document.querySelector(".collection");
const ads = document.querySelector('.ads');
const adsSection = document.querySelector('.advertisment-section')
const overlayMenu = document.querySelector(".fa-bars");
const overlayMenuDOM = document.querySelector(".menu-overlay");
const overlayMenuList = document.querySelector(".menu-overlay-list");

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

let open = false; // condition for showing the overlay menu
let once = 0;
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
    
    
})