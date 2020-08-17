import axios from 'axios'

export function request(config){
    //1、创建axios的实例
    const instance=axios.create({
        baseURL:'http://152.136.185.210:8000/api/z8',
        timeout:500
    })

    //2、axios的拦截器
    //2.1 请求拦截的作用
    instance.interceptors.request.use(config=>{
        return config;
    },err=>{
        return err;
    })

    //2.2 响应拦截器
    instance.interceptors.response.use(res=>{
        return res.data;
    },err=>{
        console.log('来到了response拦截failure中');
        console.log(err);
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误'
                    break
                case 401:
                    err.message = '未授权的访问'
                    break
            }
        }
        return err
    })
    
    //3.发送真正的网络请求
    return instance(config)
}