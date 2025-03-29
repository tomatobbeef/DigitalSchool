//封装fetch请求数据方法
class fetchFun {
    constructor(obj){
        this.baseURL = obj.baseURL
        this.headers = obj.headers
    }

    get = (url, data, headers) => this._request(url, 'GET', data, headers = this.headers)

    post = (url, data, headers) => this._request(url, 'POST', data, headers = this.headers)

    // _request(请求路径，请求方法，传输数据参数)
    _request(url, method, data, headers) {
        let str = ''
        for(let key in data) { 
            str+= key + '=' + data[key] + '&'
        }
        str = str.substring(0, str.length-1)
        return new Promise((resolve, reject) => {
            let urlStr = url
            if (urlStr.startsWith('/')) { 
                urlStr = this.baseURL+url
            }
            fetch(urlStr, method === 'POST' ? {
                method: method,
                headers: new Headers(headers),
                body: str
            } : {
                method: method,
                headers: new Headers(headers)
            })
            .then(response => response.json())
            .then(data => {
                    resolve(data)
                })
            .catch(err => reject(err))
        })
    }
}

const fetchAPI = new fetchFun({
    baseURL:'',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
})
