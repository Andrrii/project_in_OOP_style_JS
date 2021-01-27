export default class VideoPlayer{
    constructor(triggers,overlay) {
        this.btns = document.querySelectorAll(triggers)
        this.overlay = document.querySelector(overlay)
        this.close = this.overlay.querySelector('.close')
    }


    bindTriggers(){
        this.btns.forEach(btn => {
            btn.addEventListener('click',() => {
                if(document.querySelector('iframe#frame')) //fix bug || Коли другий раз відкpиваєм відео,то воно не запускається
                {
                    this.overlay.style.display = "flex"

                }else{
                const path = btn.getAttribute('data-url') // Шлях до відео
                this.createPlayer(path)
                }
            })
        })
    }

    bindClosebtn(){
        this.close.addEventListener('click',() => {
            this.overlay.style.display = 'none'
            this.player.pauseVideo();
        })
    }    
    createPlayer(url){ 
        this.player = new YT.Player('frame', {
            height : '100%',
            width : '100%',
            videoId : `${url}`
        });

        this.overlay.style.display = "flex"
    }

    

    init(){
     // Добавляєм YouTube aр    i
        const tag = document.createElement('script')
        tag.src = "https://www.youtube.com/iframe_api"

        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag,firstScriptTag)

        this.bindTriggers()
        this.bindClosebtn()
    }
}