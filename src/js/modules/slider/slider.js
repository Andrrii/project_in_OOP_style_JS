export default  class Slider{
    // Класс-прототип
    constructor({container=null,btns = null,
        next =null, previous = null,
        activeClass = "",animate,autoplay}={}) {
        this.container = document.querySelector(container);
        this.slides = this.container.children;
        this.btns = document.querySelectorAll(btns)
        this.previous = document.querySelector(previous)
        this.next = document.querySelector(next)
        this.activeClass = activeClass
        this.animate = animate
        this.autoplay = autoplay
        this.slideIndex = 1
    }

    

    
}