export default class DownloadFile {
    constructor(triggersSelector){
        this.btns = document.querySelectorAll(triggersSelector)
        this.path = 'assets/img/mainbg.jpg'
    }

    downloadItem(path,e){
        const link = document.createElement('a')
        e.preventDefault()
        e.stopPropagation()
        link.setAttribute('href',path)
        link.setAttribute('download','test-picture')

        link.style.display = 'none'
        console.log(document.body.childNodes[1])
        document.body.childNodes[1].childNodes[1].appendChild(link)
        link.click() // Симулюєм натискання на кнопку 
        
        document.body.childNodes[1].childNodes[1].removeChild(link)
    }
    init(){
        this.btns.forEach(btn => {
            btn.addEventListener('click',(e) => {
              this.downloadItem(this.path,e)
            })
        })
    }
}