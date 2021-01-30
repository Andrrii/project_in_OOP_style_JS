export default class VideoPlayer{
    constructor(triggers,overlay) {
        this.btns = document.querySelectorAll(triggers)
        this.overlay = document.querySelector(overlay)
        this.close = this.overlay.querySelector('.close')
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)// Прив'язуєм контекст
    }


    bindTriggers(){
        this.btns.forEach((btn,i) => {

            try{
                
            const blockedElem = btn.closest('.module__video-item').nextElementSibling; // Отримуєм першого батька а потім його сусіда

            if(i %2 == 0){
                // на modules.html блокуєм спочатку кожну другу кнопку
                 blockedElem.setAttribute('data-disabled','true') 
            }
            }catch(e){}

            btn.addEventListener('click',() => {
               if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== "true") {
                this.activeBtn = btn

                if(document.querySelector('iframe#frame')) //fix bug || Коли другий раз відкpиваєм відео,то воно не запускається
                {
                    this.overlay.style.display = "flex"
                    if(this.path !== btn.getAttribute('data-url')){ // Якщо юзер клікнув на іншу кнопку
                        this.path = btn.getAttribute('data-url') // перезаписуєм шлях до відео
                        this.player.loadVideoById({videoId: this.path})
                    
                    }
                }else{
                    this.path = btn.getAttribute('data-url') // Шлях до відео
                this.createPlayer(this.path)
                }
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
            videoId : `${url}`,
            events: {
                'onStateChange':this.onPlayerStateChange // Якщо відео закінчилось
            }
        });

        this.overlay.style.display = "flex"
    }

    onPlayerStateChange(state) {
        try{
        // Коли юзер додивився перше відео,то друга  кнопка стає активною і він може див інше відео
        const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling; // Отримуєм першого батька а потім його сусіда
        const playBtn = this.activeBtn.querySelector('svg').cloneNode(true) // full copy

        if(state.data === 0)//Якщо відео закінчилось 
        {
            if(blockedElem.querySelector('.play__circle').classList.contains('closed')){
                blockedElem.querySelector('.play__circle').classList.remove('closed')
                blockedElem.querySelector('svg').remove()
                blockedElem.querySelector('.play__circle').appendChild(playBtn)
                blockedElem.querySelector('.play__text').classList.remove('attention')
                blockedElem.querySelector('.play__text').textContent = 'play video'
                blockedElem.style.opacity = 1
                blockedElem.style.filter = "none"
                blockedElem.setAttribute('data-disabled','false')
            }
        }
        }catch(e){}
    }

    init(){
        if(this.btns.length > 0){
            
        // Добавляєм YouTube aрi
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api"

            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode.insertBefore(tag,firstScriptTag)

            this.bindTriggers()
            this.bindClosebtn()
        }
    }
}