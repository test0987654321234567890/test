var liffmod={
    accessToken:undefined,
    hash:{
        getAccessToken: function(){
            var hashString = location.hash.substr(1);
            if (hashString) {
                var hashAry = hashString.split('&');
                for (let i = 0; i < hashAry.length; ++i) {
                    if (hashAry[i].substring(0, 12) == "access_token") {
                        return hashAry[i].substr(13);
                    }
                }
            } else {
                return null
    }},getContextToken: function(){
        var hashString = location.hash.substr(1);
        if (hashString) {
            var hashAry = hashString.split('&');
            for (let i = 0; i < hashAry.length; ++i) {
                if (hashAry[i].substring(0, 13) == "context_token") {
                    return hashAry[i].substr(14);
                }
            }
        } else {
            return null
}},
    },
    token:{
        sendMessages:function (m, t) {
            return new Promise(function(callback,ngCallback) {
            let j = JSON.stringify({
                messages: m
            });
            fetch("https://api.line.me/message/v3/share", {
                "headers": {
                    "accept": "application/json",
                    "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
                    "authorization": `Bearer ${t}`,
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "pragma": "no-cache",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site",
                    "x-requested-with": "jp.naver.line.android"
                },
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": j,
                "method": "POST",
                "mode": "cors",
                "credentials": "omit"
            }).then((data)=>data.json()).then((res)=>{
                console.log(res);
                if (res.message) {
                    ngCallback(res.message)
                }
                if (res.status) {
                    callback("ok")
                }
            }
            ).catch((e)=>ngCallback("fetch error: "+e));
        })},
        getProfile:function (t) {
            return new Promise(function(callback,ngCallback) {
                fetch("https://api.line.me/v2/profile", {
      "headers": {
        "accept": "application/json",
        "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": `Bearer ${t}`,
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-requested-with": "jp.naver.line.androie"
      },
      "referrer": "https://piloking.github.io/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
    }).then((data)=>data.json()).then((res)=>{
    callback(res)
    }).catch((e)=>ngCallback("fetch error: "+e))
        })}
        
    },
    init : function () {
        return new Promise(function(callback, ngCallback) {
        var token=liffmod.hash.getAccessToken();
        if (token) {
            liffmod._init(token).catch((e)=>{if (!liffmod.accessToken) {ngCallback("初期化に失敗しました : "+e)}}).then((o)=>liffmod.getContext()).then((p)=>liffmod.getProfile()).then((q)=>{if (liffmod.accessToken) {callback("init: ok")}})
        } else {
            ngCallback("初期化に失敗しました")
        }
    });
    },
    _init : function (t) {
        return new Promise(function(callback, ngCallback) {
        fetch(`https://api.line.me/oauth2/v2.1/verify?access_token=${t}`, {
            "headers": {
                "accept": "application/json",
                "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrer": "https://piloking.github.io/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        }).then((data)=>data.json()).then((res)=>{
            if (res.error) {
                ngCallback("TokenErr: "+res.error)
            }
            if (res.scope) {
                liffmod.accessToken = t;
                console.log("Success");
                callback("Success");
            }
        }
        ).catch((e)=>ngCallback("fetch error: "+e));
    })
    },
    setAccessToken:function (t) {
        return new Promise(function(callback,ngCallback) {
        liffmod._init(t).then((m)=>callback(m)).catch((e)=>ngCallback(e))
    })
    },
    sendMessages:function (m){
        return new Promise(function(callback,ngCallback) {
        let tok=liffmod.accessToken;
        liffmod.token.sendMessages(m,tok).then((c)=>callback(c)).catch((e)=>ngCallback(e))
    })
    },
    isToken:function (t) {
        return new Promise(function(callback,ngCallback) {
        fetch(`https://api.line.me/oauth2/v2.1/verify?access_token=${t}`, {
            "headers": {
                "accept": "application/json",
                "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site"
            },
            "referrer": "https://piloking.github.io/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        }).then((data)=>data.json()).then((res)=>{
            console.log(res);
            if (res.error) {
                callback(false)
            }
            if (res.scope) {
                liffmod.accessToken = t;
                callback(true)
            }
        }
        ).catch(ngCallback("fetch error"));
        ;
    })},
    getProfile:function () {
        return new Promise(function(callback,ngCallback) {
            let tok=liffmod.accessToken;
            liffmod.token.getProfile(tok).then((m)=>{liffmod.profile=m;callback(m)}).catch((e)=>ngCallback(e))
        })
    },
    getContext:function (conToken,t) {
        return new Promise(function(callback,ngCallback) {
            if (!conToken) {
                conToken = liffmod.hash.getContextToken();
            }if (!conToken) {
                conToken = ".eyJlcnJvciI6IuODj-ODg-OCt-ODpeOBq2NvbnRleHRUb2tlbuOBjOWQq-OBvuOCjOOBpuOBhOOBvuOBm-OCkyJ9"
            }

        let conAry = conToken.split('.');
        let text=_base(conAry[1]);
        fetch(`data:text/plain;charset=utf-8;base64,` + text).then(response => response.text()).then(text=>{
            if(!t){
            liffmod.context=JSON.parse(text)}
            callback(JSON.parse(text));
        });})
    },
    context:null,
    profile:null,
    createURL:function () {
        return new Promise(function(callback,ngCallback) {
        let context=liffmod.context;
        let cont={
            liffId:context.liffId,
            scope:context.scope,
            userId:context.userId,
            type:context.type,
            squareMemberId:context.squareMemberId,
        };
        cont=JSON.stringify(cont);
        cont=_base64Encode(cont);
        cont.then((a)=>{
        callback(location.origin+location.pathname+location.search+`#to=liff_mod&access_token=${liffmod.accessToken}&context_token=create.${a}`)
        })})
    }
}
function _base(base64url) {
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding > 0) {
      return base64 + '===='.slice(padding);
    } 
    return base64;
}
function _base64Encode(...parts) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => {
        const offset = reader.result.indexOf(",") + 1;
        resolve(reader.result.slice(offset));
      };
      reader.readAsDataURL(new Blob(parts));
    });
}
function _baseurl(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=*$/g, '')
}