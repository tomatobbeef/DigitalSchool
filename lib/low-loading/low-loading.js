/**
 * low-loading层构造方法
 */
function LowLoading(){
    /***
     * @param {loadClass:loadClass,size:size,preColor:preColor,childColor:childColor}
     */
    this.open = function(obj){
        let loadClass,preColor,childColor
        if(arguments.length==0){ // 调用无参
            loadClass   = 'round-no1'
            preEl       = document.body
        }else{
            loadClass   = obj.loadClass
            preColor    = obj.preColor
            childColor  = obj.childColor
            size        = obj.size
            preEl       = obj.preEl
        }

        if(loadClass==undefined||loadClass==''){ loadClass = 'round-no1' }

        let eleObj = this.eleObj(loadClass,preEl)

        // 判断调用颜色方法
        if((preColor!=undefined&&preColor!='')&&(childColor!=undefined&&childColor!='')){
            // console.log(1)
            this.colorStyle(preColor,childColor)
        }
        // 判断调用大小方法
        if(size!=undefined&&size!=''){
            // console.log(1)
            this.sizeStyle(size)
        }
    }

    /**
     * @param   { Bool } 默认为false
     * @return  { Bool }
     */
    this.close = function(bool){
        if(bool){
            // 删除dom节点，彻底删除loading层
            let low_loading = document.querySelector('.low-loading')
            low_loading.parentNode.removeChild(low_loading)
            return
        }

        // 默认false，不删除节点
        let preEle = this.eleObj().preEle
        preEle.style.display = 'none'
    }
}

// 创建loading元素
LowLoading.prototype.create = function (loadClass){
    let div = document.createElement('div')
    let i = document.createElement('i')
    div.classList.add('low-loading')
    i.classList.add(loadClass)
    div.appendChild(i)
    return div
}

// 生成loading层并返回loading两级元素
LowLoading.prototype.eleObj = function (loadClass,preEl){
    // 判断是否已有loading层，有直接返回，无则创建
    if(document.querySelector('.low-loading')){
        let preEle = document.querySelector('.low-loading')
        return {preEle:preEle,childEle:preEle.children[0]}
    }else{
        let div = this.create(loadClass)
        preEl.appendChild(div)
        let preEle = document.querySelector('.low-loading')
        return {preEle:preEle,childEle:preEle.children[0]}
    }
}

// 自定义loading颜色
LowLoading.prototype.colorStyle = function (preColor,childColor){
    // console.log(arguments)
    document.body.style.setProperty('--pre', preColor)
    document.body.style.setProperty('--child', childColor)
}
// 自定义loading大小
LowLoading.prototype.sizeStyle = function (size){
    // console.log(arguments)
    document.body.style.setProperty('--size', size)
}

var loading = new LowLoading()
