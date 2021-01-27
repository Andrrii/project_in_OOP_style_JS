import MainSlider from "./modules/slider//slider-main"
import MiniSlider from "./modules/slider/slider-mini"
import VideoPlayer from "./modules/videoPlayer"


window.addEventListener("DOMContentLoaded",() => {
    const mainslider = new MainSlider({container:'.page',btns:'.next'})
    mainslider.render()
    const showUpSlider = new MiniSlider({
        container:".showup__content-slider",
        previous: ".showup__prev",
        next: ".showup__next",
        activeClass: "card-active",
        animate:true
    })
    showUpSlider.init()

    const modulesSlider = new MiniSlider({
        container:".modules__content-slider",
        previous: ".modules__info-btns .slick-prev",
        next: ".modules__info-btns .slick-next",
        activeClass: "card-active",
        animate:true,
        autoplay:true
    })
    modulesSlider.init()

    const feedSlider = new MiniSlider({
        container:".feed__slider",
        previous: ".feed__slider .slick-prev",
        next: ".feed__slider .slick-next",
        activeClass: "feed__item-active"
    })
    feedSlider.init()

    const videoPlayer = new VideoPlayer('.showup .play','.overlay')
    videoPlayer.init()


})