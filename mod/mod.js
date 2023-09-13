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
            ).catch(ngCallback("fetch error"));
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
      "credentials": "include"
    }).then()
            })
        },
        getFriendship:function (t) {
            return new Promise(function(callback,ngCallback) {
                fetch("https://api.line.me/friendship/v1/status", {
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
      "referrer": "https://liff-playground.netlify.app/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });
    })}
    },
    init : function () {
        return new Promise(function(callback, ngCallback) {
        var token=liffmod.hash.getAccessToken;
        if (token) {
            liffmod._init(token).then((m)=>callback(m)).catch((e)=>ngCallback(e))
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
                callback("Success")
            }
        }
        ).catch(ngCallback("fetch error"));
    })
    },
    setAccessToken:function (t) {
        return new Promise(function(callback,ngCallback) {
        liffmod._init(t).then((m)=>callback(m)).catch((e)=>ngCallback(e))
    })
    },
    sendMessages:function (m){
        return new Promise(function(callback,ngCallback) {
        liffmod.token.sendMessages(m,liffmod.token).then((c)=>callback(c)).catch((e)=>ngCallback(e))
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
        })
    },
    getFriendship:function () {
        return new Promise(function(callback,ngCallback) {
        })}
}
