import MainSlider from "./modules/slider//slider-main"
import MiniSlider from "./modules/slider/slider-mini"
import VideoPlayer from "./modules/videoPlayer"
import Difference from './modules/difference'
import Form from "./modules/form"
import ShowInfo from  "./modules/showInfo"
import DownloadFile from "./modules/download"

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
        activeClass: "feed__item-active",
        autoplay:true
    })
    feedSlider.init()

    const moduleSlider = new MainSlider({container: ".moduleapp",btns: ".next "}) // Slider на другій сторінці
    moduleSlider.render()

    const videoPlayer = new VideoPlayer('.showup .play','.overlay')
    videoPlayer.init()
    new VideoPlayer('.module__video-item .play','.overlay').init() // videoplayer на modules.html

    new Difference('.officerold','.officernew','.officer__card-item').init()
    new Form('.form').init()

     new ShowInfo('.plus__content').init()

     new DownloadFile('.download').init()
})