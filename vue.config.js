module.exports={
    devServer:{
        proxy:{
            "^/v2":{
                target:'https://api-v2.chuangkit.com',
                changeOrgin:true,
                pathRewrite:{
                    '/v2':''
                }
            },
            "^/yys":{
                target:'https://api.chuangkit.com',
                changeOrgin:true,
                pathRewrite:{
                    '/yys':''
                }
            },
            "/pub":{
                target:'https://pub-cdn-oss.chuangkit.com',
                changeOrgin:true,
                pathRewrite:{
                    '/pub':''
                }
            }
        }
    }
}