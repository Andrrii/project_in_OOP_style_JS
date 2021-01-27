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
        if(this.slides[1].tagName == "BUTTON" && this.slides[2].tagName == "BUTTON" ){
            /* Просто кнопки і слайди знаодяться в одному контейнері */
            this.container.appendChild(this.slides[0]) //slide
            this.container.appendChild(this.slides[1]) //button
            this.container.appendChild(this.slides[2]) //button
            this.decorizeSlides()
        }else if (this.slides[1].tagName == "BUTTON"){
            this.container.appendChild(this.slides[0]) //slide
            this.container.appendChild(this.slides[1]) //button}
            this.decorizeSlides()
        }
        else{
        this.container.appendChild(this.slides[0]) // first elem go to the end for list
        this.decorizeSlides()
        }
    }
    bindTriggers() {
        this.next.addEventListener('click', () => {this.nextSlide()    
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

            

        })
    }

    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow : hidden;
            align-items: flex-start;
        
        `
        this.bindTriggers()
        this.decorizeSlides()
        if(this.autoplay){
            setInterval(() => this.nextSlide(),5000)
        }
    }
}