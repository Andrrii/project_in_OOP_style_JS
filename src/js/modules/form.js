export default class Form {
    constructor(forms){
        this.forms = document.querySelectorAll(forms)
        this.inputs = document.querySelectorAll('input')
        this.message ={
            loading : "Загрузка...",
            success: "Дякуємо ! Найбижчим часом  ми   зателефонуємо вам",
            failure:"Ой! Щось не так :( " 
        };

        this.path = "assets/question.php"
    }


    async checkMailInputs () {
        //Заполнение имени и комментария - только на русском языке.
        const mailInputs  = document.querySelectorAll('[type="email"]')
    
        mailInputs.forEach(input => {
            input.addEventListener("keypress",function(e){
                if( e.key.match(/[^a-z 0-9 @ \.]/ig) ){
                    e.preventDefault()
                    
                }else{input.style.cssText =   `
                border:none;
                `}
               
            })
            input.addEventListener("blur",function(e){
                let target = e.target;
                if( input.value.match(/[^a-z 0-9 @ \.]/ig) ){
                    //input.value = "Только русские буквы!!!"
                    input.value = ""
                    let test = input.getAttribute("placeholder")
                    let res = "Only English letters !!!"
                    
                    input.setAttribute("placeholder",res)
                   input.style.cssText =   `
                   border:3px dashed red;
                   `          
                    setTimeout(() => {
                        input.setAttribute("placeholder",test);
                    },1500)
                   
                }else{input.style.cssText =   `
                border:none;
                `}
            })
        })
    }

    initMask() {
        let setCursorPosition = (pos,elem) => {
            elem.focus()
    
            if (elem.setSelectionRange){
                elem.setSelectionRange(pos,pos) // Ставим курсор на вказаний елемент 
            }else if ( elem.createTextRange){ // for Internet Explorel and old browsers
                let range = elem.createTextRange()
    
                // internet
                //#region 
                /* 
                        015 -Range-TextRange-Selection
                        https://learn.javascript.ru/range-textrange-selection
    
                        015 HTMLInputElement.setSelectionRange-
                        https://developer.mozilla.org/ru/docs/Web/API/HTMLInputElement/setSelectionRange
    
                        015 RegExp.prototype.test-
                        https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    
                        015 String.prototype.replace-
                        https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    
                
                */
                //#endregion
    
                range.collapse(true) //read in the internet 
                range.moveEnd("character",pos)//read in the internet
                range.moveStart("character",pos)//read in the internet
                
                range.select()//read in the internet
            }
        }
        
        /*  Необходима маска или валидация номера телефона (нужное кол-во чисел, код). */
        function createMask(event) {
            let matrix = '+1 (__) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length){
                val = def
            }
    
            this.value = matrix.replace(/./g,function(a){ // Це |value| буде відображатись на сторінці
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a; // lesson 15 !!!!
            })
    
            if(event.type === 'blur')  // Якщо нажали за межі input  і маска пуста то поле очиститься 
            {
                if (this.value.length == 3){
                    this.value = ""
                }
            }else{
                setCursorPosition(this.value.length,this)
            }
        } 
    
    
        let inputs = document.querySelectorAll('[name="phone"]')
    
        inputs.forEach(input => {
            input.addEventListener("input",createMask)
            input.addEventListener("focus",createMask)
            input.addEventListener("blur",createMask)
    
            
    
        })
    }

    clearInputs(){
        this.inputs.forEach(input => {
            input.value = ""
        })
    }

    async  postData (url,data)  {
        
        let res = await fetch(url,{
            method: "POST",
            body: data
        });   
        
        return await res.text()
    }

    init() {
        this.checkMailInputs()
        this.initMask()
        this.forms.forEach(form => {
            form.addEventListener('submit',(e)=> {
                e.preventDefault()
                
                let statusMessage = document.createElement('div')
                statusMessage.style.cssText = `
                margin-top:15px;
                font-size: 18px;
                color:grey;
                
                `
                form.parentNode.appendChild(statusMessage)

                statusMessage.textContent = this.message.loading

                const formData = new FormData(form)

                this.postData(this.path,formData)
                .then(res =>{ 
                    console.log(res)
                    statusMessage.textContent = this.message.success
                })
                .catch(() => {
                    statusMessage.textContent = this.message.failure
                })

                .finally(() => {
                    this.clearInputs()
                    setTimeout(() =>{
                        statusMessage.remove()
                    },5000)
                })
            })
        })
    }


}