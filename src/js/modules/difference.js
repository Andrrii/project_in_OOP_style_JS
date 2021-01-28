export default class Difference {
// Сторінка №2
    constructor(oldOfficer,newOfficer,items){
        this.oldOfficer = document.querySelector(oldOfficer)
        this.newOfficer = document.querySelector(newOfficer)
        this.oldItems = document.querySelectorAll(items)
        this.newItems = document.querySelectorAll(items)
        this.items = items
        this.oldCounter = 0
        this.newCounter = 0
    }


    hideItems(){
        function hideItem(selector,items){
            selector.querySelectorAll(items).forEach((item,i,arr) => {
                if (i!== arr.length-1) {
                    item.style.display = "none"
                }
            });
        }
        hideItem(this.oldOfficer,this.items)
        hideItem(this.newOfficer,this.items)
    }


    bindTriggers(container,selector,counter) {
        
        container.querySelector('.plus').addEventListener('click',() => {
            if (counter !== selector.length-2) {
                selector[counter].style.display = "flex"
                counter++
            }else{
                selector[counter].style.display = "flex"
                selector[selector.length-1].remove()
            }
        })
    }

    init() {
        this.hideItems()
        this.bindTriggers(this.oldOfficer,this.oldItems,this.oldCounter)
        this.bindTriggers(this.newOfficer,this.newItems,this.newCounter)

    }

}