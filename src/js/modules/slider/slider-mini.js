import Slider from "./slider"

export default class MiniSlider extends Slider {
    constructor(container,previous,next,activeClass,animate,autoplay){
        super(container,previous,next,activeClass,animate,autoplay);
        
    }



    decorizeSlides(){
        
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass)
            if(this.animate){
                slide.querySelector(".card__title").style.opacity = "0.4"
                slide.querySelector(".card__controls-arrow").style.opacity = "0"
             }
        });

        if(!this.slides[0].closest('button')){ /* Якщо актив. слайд не кнопка то додаєм activeClass */
            this.slides[0].classList.add(this.activeClass)
        }


        if(this.animate){
            this.slides[0].querySelector(".card__title").style.opacity = "1"
            this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1"
         }
    }

    nextSlide(){
        if(this.slides[1].tagName === "BUTTON" && this.slides[2].tagName === "BUTTON" ){
            let active = this.slides[0]
            let firstBtn = this.slides[1]
            let secondBtn = this.slides[2]
            this.container.appendChild(active)
            active.after(firstBtn)
            firstBtn.after(secondBtn)

            this.decorizeSlides()
        }
    
        else{
            this.container.appendChild(this.slides[0]) // first elem go to the end for list
            this.decorizeSlides()}
    }
    bindTriggers() {
        this.next.addEventListener('click', () => {
            this.nextSlide() 
            if(this.autoplay){
                this.stopStartSlides()
            }
            })

        this.previous.addEventListener('click', () => {
                /* Просто кнопки і слайди знаодяться в одному контейнері */

            for(let i = this.slides.length-1; i>0; i--){
                if(this.slides[i].tagName !== "BUTTON"){
                    let active = this.slides[i]
                    this.container.insertBefore(active,this.slides[0])
                    this.decorizeSlides()
                    break
                }
                
            }

            if(this.autoplay){
                this.stopStartSlides()
            }

        })
    }
    autoplaySlides() {
        
            
            let interval = setInterval(function() {this.nextSlide()}.bind(this),7000)
            this.interval = interval
    }
    stopStartSlides() {
        clearTimeout(this.timeout)
                clearInterval(this.interval)
                this.timeout = setTimeout(function() {
                    this.interval = setInterval(function() {this.nextSlide()}.bind(this),5000)

                }.bind(this),7000)
    }
    bindmouseEnter() {
        
        
        
        this.container.childNodes.forEach(child =>{
            child.addEventListener('mouseenter',() => { // Коли наводим мишу на слайдер то анімація зупиняється
            clearInterval( this.interval)
        })
        child.addEventListener('mouseleave',() => {
            this.stopStartSlides()        })
        })
    }

    init() {
        try{
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow : hidden;
            align-items: flex-start;
        
        `
        
        if(this.autoplay){
            
            this.autoplaySlides()
            this.bindmouseEnter()
          }
        this.bindTriggers()
        this.decorizeSlides()
        }catch(e){}
    }
}