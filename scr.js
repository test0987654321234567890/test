var token, tk1, tk2, tk3, tk4, tk5;
var apptype = 0;
var tasiro = "";
var kaiseki = `<p>解析するユニコ <input type="text" id="uni" size="20" value="" oninput=uniK()><button type="button" onclick=uniK() >解析</button></p>
<p>結果：</p>
<div id="res"></div>`;
var tasiroUni = `<p><span id="err2"></span>　</p>
<p><span id="to1"></span>token1:<input type="text" id="tok1" size="20" value="" oninput=isToken(1)></p>
<p><span id="to2"></span>token2:<input type="text" id="tok2" size="20" value="" oninput=isToken(2)></p>
<p><span id="to3"></span>token3:<input type="text" id="tok3" size="20" value="" oninput=isToken(3)></p>
<p><span id="to4"></span>token4:<input type="text" id="tok4" size="20" value="" oninput=isToken(4)></p>
<p><span id="to5"></span>token5:<input type="text" id="tok5" size="20" value="" oninput=isToken(5)></p>
<p>タイマー:<input type="number" id="time" size="20" value="0" >分</p>
<span id="but2"><button type="button" onclick=run3() >スタート</button></span><button type="button" onclick=check2() >最大文字数</button>
<p><span id="check"><br><br></span>　</p>
<section>
<p>前につける文字列<input type="text" id="1str" size="20" value="" oninput=check()></p>
<p>　　　　+</p>
<p>ユニコ<input type="text" id="uni" size="20" value="a" oninput=check()><button type="button" onclick=uniPad() >ユニコ一覧</button></p>
<p>重ねる回数<input type="number" id="xint" size="5" value="10000" oninput=check()></p>
<p>　　　　+</p>
<p>後につける文字列<input type="text" id="2str" size="20" value="" oninput=check()></p>
<div id="uniPad"></div>
</section>`;
var helpHtml = `<h2>～各表示と機能の説明～</h2>
<h3>tokenが指定されていません</h3><p>urlにtokenが指定されていない場合表示されます。正しいurlを使用してください。</p>
<h3>Error:エラーメッセージ ,Success: ,Send: ok</h3><p>それぞれ、送信に失敗/認証に失敗・認証に成功・送信に成功、を表します。認証に失敗した場合正しいurlを使っているか確認してください。</p>
<h3>liff-token:[] 設定</h3><p>[]の中にtokenを表示しています。tokenを入力して設定を押すと変更できます。</p>
<h3>tokenを転送</h3><p>開くとメッセージ送信等が外部から可能になるurlを転送する画面を開きます。</p>
<h3>tokenを保持して閉じる</h3><p>外部からのメッセージ送信等を可能にした状態で画面を閉じます。(androidのみ)</p>
<h3>メッセージ送信:[] 送信</h3><p>[]の中のテキストを送信します。動作確認等に利用してください。</p>
<h3>通報リンク変換,ユニコ自動連投,Flexメッセージ生成,使い方/ヘルプ</h3><p>押すとそれぞれの画面を表示します</p>
<h3>通報リンク変換:</h3>
<p>url:[] の中に招待リンクや通報リンク、参加リンクを入れて変換を押すとurlを変換できます。<br>リンクをコピーを押して変換したリンクをコピーできます。</p>
<h3>ユニコ自動連投:</h3>
<p>まずユニコ[] に連投したいユニコを入力してください。「ユニコ一覧」を押すと下にユニコの一覧が出ます。ユニコを押すと入力できます。<br>次に前につける文字と後につける文字を入力してください。ユニコの前と後にこの文字が表示されます。<br>重ねる回数は文字を入力すると自動で変わります。「最大文字数」を押すと設定可能な最大文字数にできます。<br>
「連投開始」を押すと上の[]回で設定した回数[]ミリ秒で連投されます。連投を停止したいときは連投停止を押すと止まります。<br>単品で投下するときは「ユニコ手動投下」を押してください。「改行砲」を押すと改行砲が打てます。</p>
<h3>Flexメッセージ生成:</h3>
<p>json直打ちにjsonを入力して送信を押すとそのjsonメッセージを送ることができます。<br>
また、投票箱・ライブトーク・オープンチャット利用制限・オープンチャット招待のflexメッセージも生成可能です。</p>
<h3>多機能連投:</h3>
<p>token:[]に投下する垢のtokenを入力してください。ユニコとタイマーを設定して「スタート」を押すとタイマーで連投出来ます。</p>
<h2>～よくある質問～</h2>
<h3>Q.liffアプリを利用するとmid(LINEが一意にユーザーに割り当てた識別子)を抜かれますか？</h3>
<p>A.ありません。liffアプリはuid(サービス提供者ごとにLINEが一意にユーザーに割り当てた識別子)を取得できますが、midに変換することはできません。</p>`;
var urlHenkan = `<p>url:<input type=text id=url><button type="button" onclick= OCurl()>変換</button></p><p>urlの形式:<span id="type"></span></p><p>通報リンク<br><span id="rep"></span></p><p>参加リンク<br><span id="join"></span></p><p>招待リンク<br><span id="inv"></span></p><p>webデータ<br><span id="squ"></span></p><p>ticket<br><span id="tic"></span></p>`;
var flexTool = `<p>json直打ち<p><textarea id="flexJson" rows="10" cols="40" onblur="seikei()">
[{"type": "flex","altText":"あいうえお","contents":{
    "type": "bubble",
    "body": {
        "type": "box",
        "layout": "horizontal",
        "contents": [
            {
                "type": "text",
                "text": "あいうえお",
                "size": "xl",
                "weight": "bold",
                "color": "#ff0000"
            }
        ]
    }
}}]
</textarea><p><span id="seikeierr"></span></p><button type="button" onclick=flexSend(1) >送信</button><br>
<section>
<h3>画像url生成</h3>
<p><a href="line://nv/profile">アイコン画像を変換する画像にして</a>、変換を押してurlに変換できます。変換したurlはアイコンを再度変更しても変わりません。</p>
<button type="button" onclick= img2url()>変換</button>
<div id="img_url"><div>
<br>
<h3>投票箱</h3>
<p>通知メッセージ<input type="text" id="Valt" size="20" value="[投票] "></p>
<p>タイトル<input type="text" id="Vtitle" size="20" value="[投票] "></p>
<p>説明文<input type="text" id="Vinfo" size="20" value="投票に参加してみましょう"></p>
<p>ボタン名<input type="text" id="VbutName" size="20" value="投票する"></p>
<p>ボタンuri<input type="text" id="VbutUri" size="20" value="https://line.me"></p>
<p>投票uri<input type="text" id="Vuri" size="20" value="https://line.me"></p>
<p>画像url<input type="text" id="VimgUrl" size="20" value="https://scdn.line-apps.com/n/_1/poll/static/icon-message-1024.971665e3.png"></p>
<button type="button" onclick= Vout()>トークに送信</button><br><br>
</section>
<section>
<h3>ライブトーク</h3>
<p>通知メッセージ<input type="text" id="Lalt" size="20" value="ライブトークが始まりました"></p>
<p>タイトル<input type="text" id="Ltitle" size="20" value="オープンチャット"></p>
<p>説明文<input type="text" id="Linfo" size="20" value="ライブトークが始まりました。ライブに参加してみましょう。"></p>
<p>ボタン名<input type="text" id="LbutName" size="20" value="ライブトークに参加"></p>
<p>ボタンuri<input type="text" id="LbutUri" size="20" value="https://line.me"></p>
<p>オプ画像url<input type="text" id="LimgUrl" size="20" value="https://obs.line-scdn.net/0hrKkn3t_FLWRWFz-5ynlSMwRKJgZldTNvdCM5AzZocTAzTAxSbw8baSxCGjAzcghZIRAEQzVoAT96RgxSNiQHAzp_FTB6TBxzLSQXcjhEBiQ9XDZoYg0S/f256x256"></p>
<button type="button" onclick= Lout()>トークに送信</button><br><br>
</section>
<section>
<h3>オープンチャット利用制限</h3>
<p>通知メッセージ<input type="text" id="Oalt" size="20" value="オープンチャット利用制限：１日間"></p>
<p>タイトル<input type="text" id="Otitle" size="20" value="オープンチャット利用制限：１日間"></p>
<p>説明文<input type="text" id="Oinfo" size="20" value="運営への批判などが含まれたコンテンツをシェアした疑いがあるため、サービスの利用が制限されました。禁止事項に関する詳細は、以下のリンクをご確認ください。"></p>
<p>ボタン名<input type="text" id="ObutName" size="20" value="安心・安全ガイドライン"></p>
<p>ボタンuri<input type="text" id="ObutUri" size="20" value="https://line.me"></p>
<p>サービスuri<input type="text" id="Ourl" size="20" value="https://line.me"></p>
<button type="button" onclick= Oout()>トークに送信</button><br><br>
</section>
<section>
<h3>オープンチャット招待</h3>
<p>通知メッセージ<input type="text" id="Ialt" size="20" value="オープンチャットに招待されました"></p>
<p>タイトル<input type="text" id="Ititle" size="20" value="オープンチャット"></p>
<p>説明文<input type="text" id="Iinfo" size="20" value="招待されました。"></p>
<p>ボタン名<input type="text" id="IbutName" size="20" value="参加する"></p>
<p>ボタンuri<input type="text" id="IbutUri" size="20" value="https://line.me"></p>
<p>オプ画像url<input type="text" id="IimgUrl" size="20" value="https://obs.line-scdn.net/0hrKkn3t_FLWRWFz-5ynlSMwRKJgZldTNvdCM5AzZocTAzTAxSbw8baSxCGjAzcghZIRAEQzVoAT96RgxSNiQHAzp_FTB6TBxzLSQXcjhEBiQ9XDZoYg0S/f256x256"></p>
<button type="button" onclick= Iout()>トークに送信</button><br><br>
</section>`;
var unicode = `<p><input type="number" id="xxint" size="5" value="100">回<br><input type="number" id="rate" size="5" value="700">ミリ秒<br></p>
<span id="but"></span><button type="button" onclick=check2() >最大文字数</button><br>
<button type="button" onclick=sendMsg() >改行砲</button><button type="button" onclick=run2() >ユニコ手動投下</button>
<p><span id="check"><br><br></span></p>
<section>
<p>前につける文字列<input type="text" id="1str" size="20" value="" oninput=check()></p>
<p>　　　　+</p>
<p>ユニコ<input type="text" id="uni" size="20" value="͢" oninput=check()><button type="button" onclick=uniPad() >ユニコ一覧</button></p>
<p>重ねる回数<input type="number" id="xint" size="5" value="10000" oninput=check()></p>
<p>　　　　+</p>
<p>後につける文字列<input type="text" id="2str" size="20" value="" oninput=check()></p>
<div id="uniPad"></div>
</section>`;
var button1 = document.getElementById('button1');
var app = document.getElementById('app');
liff_init();
function liff_init() {
    var hashString = location.hash.substr(1);
    if (location.protocol=="http:"){
        location.href="https://liff-tool.f5.si/"+location.hash
    }
    if (!(location.protocol=="file:")){
        isliff();
    }
    if (hashString) {
        var hashAry = hashString.split('&');
        for (let i = 0; i < hashAry.length; ++i) {
            if (hashAry[i].substring(0, 12) == "access_token") {
                token = hashAry[i].substr(13);
            }
        }
    } else {
        document.getElementById('err').innerHTML = "tokenが指定されていません";
        token=null
    }
    document.getElementById('token').value = token;
    if (token) {
        init(token)
    }
}
function set() {
    token = document.getElementById('token').value;
    init(token);
}
function init(t) {
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
        token = null;
        if (res.error) {
            document.getElementById('err').innerHTML = "Error: " + res.error;
        }
        if (res.scope) {
            document.getElementById('err').innerHTML = "Success: " + res.scope;
            token = t;
        }
    }
    );
}
function send(m) {
    let j = JSON.stringify({
        messages: m
    });
    fetch("https://api.line.me/message/v3/share", {
        "headers": {
            "accept": "application/json",
            "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
            "authorization": `Bearer ${token}`,
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
    }).catch((err)=>document.getElementById('err').innerHTML = "Error: " + err).then((data)=>data.json()).then((res)=>{
        console.log(res);
        if (res.message) {
            document.getElementById('err').innerHTML = "Error: " + res.message;
            return false
        }
        if (res.status) {
            document.getElementById('err').innerHTML = "Send: " + res.status;
            return true
        }
    }
    );
}
function pc() {
    open("https://line.me/R/share?text=https%3A%2F%2Fliff-tool.f5.si%2F%23liff-tool%26access_tokens" + token);
}
function openB() {
    open("https://liff-tool.f5.si/#liff-tool&access_tokenb" + token);
}
function clos() {
    open("https://x.gd/8WPF7")
}
function isliff() {
    if (!Cookies.get("isAgree")) {
        location.href = "./agree.html" + location.hash
    }
}
function test() {
    let test = document.getElementById('test').value;
    send([{
        type: "text",
        text: test
    }])
}
function url() {
    saveApp();
    button1.innerHTML = `<button type="button" onclick= kuni() >unicode解析</button><button type="button" onclick= url() id="RED" >通報リンク変換</button><button type="button" onclick= uni()>ユニコ自動連投</button><button type="button" onclick= flex()>Flexメッセージ生成</button><button type="button" onclick= tUni()>多機能連投</button><button type="button" onclick= help()>使い方/ヘルプ</button>`;
    app.innerHTML = urlHenkan;
    apptype = 1;
    setApp();
}
function uni() {
    saveApp();
    button1.innerHTML = `<button type="button" onclick= kuni() >unicode解析</button><button type="button" onclick= url()>通報リンク変換</button><button type="button" onclick= uni() id="RED">ユニコ自動連投</button><button type="button" onclick= flex()>Flexメッセージ生成</button><button type="button" onclick= tUni()>多機能連投</button><button type="button" onclick= help()>使い方/ヘルプ</button>`;
    app.innerHTML = unicode;
    apptype = 2;
    setApp();
}
function flex() {
    saveApp();
    button1.innerHTML = `<button type="button" onclick= kuni() >unicode解析</button><button type="button" onclick= url()>通報リンク変換</button><button type="button" onclick= uni()>ユニコ自動連投</button><button type="button" onclick= flex() id="RED">Flexメッセージ生成</button><button type="button" onclick= tUni()>多機能連投</button><button type="button" onclick= help()>使い方/ヘルプ</button><button type="button" onclick= altuni()>flex-unicode</button>`;
    app.innerHTML = flexTool;
    apptype = 3;
    setApp();
}
function help() {
    saveApp();
    app.innerHTML = helpHtml;
    apptype = 0;
    button1.innerHTML = `<button type="button" onclick= kuni() >unicode解析</button><button type="button" onclick= url()>通報リンク変換</button><button type="button" onclick= uni()>ユニコ自動連投</button><button type="button" onclick= flex()>Flexメッセージ生成</button><button type="button" onclick= tUni()>多機能連投</button><button type="button" onclick= help() id="RED" >使い方/ヘルプ</button>`;
}
function tUni() {
    saveApp();
    button1.innerHTML = `<button type="button" onclick= kuni() >unicode解析</button><button type="button" onclick= url()>通報リンク変換</button><button type="button" onclick= uni()>ユニコ自動連投</button><button type="button" onclick= flex() >Flexメッセージ生成</button><button type="button" onclick= tUni() id="RED">多機能連投</button><button type="button" onclick= help()>使い方/ヘルプ</button>`;
    app.innerHTML = tasiroUni;
    apptype = 4;
    setApp();
}
function kuni() {
    saveApp();
    button1.innerHTML = `<button type="button" onclick= kuni() id="RED" >unicode解析</button><button type="button" onclick=url()>通報リンク変換</button><button type="button" onclick=uni()>ユニコ自動連投</button><button type="button" onclick=flex()>Flexメッセージ生成</button><button type="button" onclick= tUni()>多機能連投</button><button type="button" onclick= help()>使い方/ヘルプ</button>`;
    app.innerHTML = kaiseki;
    apptype = 5;
    setApp();
}
function altuni(){
    saveApp()
    location.href="./alt-unicode.html#"+token
}
function saveApp() {
    if (apptype == 1) {
        Cookies.set("OCurl", document.getElementById("url").value, {
            expires: 50
        });
    } else if (apptype == 2) {
        var msg = document.getElementById("uni").value;
        var bef = document.getElementById("1str").value;
        var aft = document.getElementById("2str").value;
        var x = document.getElementById("xint").value;
        var xx = document.getElementById("xxint").value;
        var rate = document.getElementById("rate").value;
        Cookies.set("uni", msg, {
            expires: 50
        });
        Cookies.set("1str", bef, {
            expires: 50
        });
        Cookies.set("2str", aft, {
            expires: 50
        });
        Cookies.set("xint", x, {
            expires: 50
        });
        Cookies.set("xxint", xx, {
            expires: 50
        });
        Cookies.set("rate", rate, {
            expires: 50
        });
    } else if (apptype == 3) {
        var flexc=document.getElementById("flexJson").value;
        Cookies.set("flexJson", flexc , {
            expires: 50
        });
    } else if (apptype == 4) {
        var msg = document.getElementById("uni").value;
        var bef = document.getElementById("1str").value;
        var aft = document.getElementById("2str").value;
        var x = document.getElementById("xint").value;
        var t1 = document.getElementById("tok1").value;
        var t2 = document.getElementById("tok2").value;
        var t3 = document.getElementById("tok3").value;
        var t4 = document.getElementById("tok4").value;
        var t5 = document.getElementById("tok5").value;
        var ti = document.getElementById("time").value;
        Cookies.set("uni", msg, {
            expires: 50
        });
        Cookies.set("1str", bef, {
            expires: 50
        });
        Cookies.set("2str", aft, {
            expires: 50
        });
        Cookies.set("xint", x, {
            expires: 50
        });
        Cookies.set("tok1", t1, {
            expires: 50
        });
        Cookies.set("tok2", t2, {
            expires: 50
        });
        Cookies.set("tok3", t3, {
            expires: 50
        });
        Cookies.set("tok4", t4, {
            expires: 50
        });
        Cookies.set("tok5", t5, {
            expires: 50
        });
        Cookies.set("time", ti, {
            expires: 50
        });
    }
}
function setApp() {
    if (apptype == 1) {
        if (Cookies.get("OCurl")) {
            document.getElementById("url").value = Cookies.get("OCurl");
        }
    } else if (apptype == 2) {
        if (Cookies.get("uni")) {
            document.getElementById("uni").value = Cookies.get("uni");
            document.getElementById("1str").value = Cookies.get("1str");
            document.getElementById("2str").value = Cookies.get("2str");
            document.getElementById("xint").value = Cookies.get("xint");
            document.getElementById("xxint").value = Cookies.get("xxint");
            document.getElementById("rate").value = Cookies.get("rate");
        }
    } else if (apptype == 3) {
        if (Cookies.get("flexJson")) {
            document.getElementById("flexJson").value = Cookies.get("flexJson");
        }
    } else if (apptype == 4) {
        if (Cookies.get("uni")) {
            document.getElementById("uni").value = Cookies.get("uni");
            document.getElementById("1str").value = Cookies.get("1str");
            document.getElementById("2str").value = Cookies.get("2str");
            document.getElementById("xint").value = Cookies.get("xint");
            if (Cookies.get("tok2")) {
                document.getElementById("tok2").value = Cookies.get("tok2");
            }
            if (Cookies.get("tok3")) {
                document.getElementById("tok3").value = Cookies.get("tok3");
            }
            if (Cookies.get("tok4")) {
                document.getElementById("tok4").value = Cookies.get("tok4");
            }
            if (Cookies.get("tok5")) {
                document.getElementById("tok5").value = Cookies.get("tok5");
            }
            if (Cookies.get("time")) {
                document.getElementById("time").value = Cookies.get("time");
            }
        } if (token) {
            document.getElementById("tok1").value = token;
            tk1 = token;
        }
    }
}
function OCurl() {
    let url = document.getElementById("url").value;
    let type = "不正なurlです";
    var tic;
    let urll = 0;
    url = url.replace("line.me/ti/g2/", "line://ti/g2/");
    url = url.replace("line.me/R/", "line://");
    url = url.replace("https://", "");
    urll = url.lastIndexOf("line://");
    url = url.substr(urll);
    if (url.substr(7, 6) == "ti/g2/") {
        type = "招待リンク";
        var s = url.substr(13);
        tic = "";
        for (var i = 0; i < s.length; ++i) {
            if (s.charAt(i) == "?") {
                break
            } else {
                tic = tic + s.charAt(i)
            }
        }
    } else if (url.substr(7, 14) == "square/report?") {
        type = "通報リンク";
        tic = "";
        var s = url.substr(21);
        s = s.substr(s.lastIndexOf("ticket=") + 7);
        s = s + "&";
        s = s.substring(0, s.indexOf("&"));
        tic = s;
    } else if (url.substr(7, 12) == "square/join?") {
        type = "参加リンク";
        tic = "";
        var s = url.substr(19);
        s = s.substr(s.lastIndexOf("ticket=") + 7);
        s = s + "&";
        s = s.substring(0, s.indexOf("&"));
        tic = s;
    }
    if (tic) {
        document.getElementById("rep").innerHTML = "line://square/report?ticket=" + tic;
        document.getElementById("join").innerHTML = "line://square/join?ticket=" + tic;
        document.getElementById("inv").innerHTML = "https://line.me/ti/g2/" + tic;
        document.getElementById("squ").innerHTML = "https://square-api.line.me/smw/v2/static/sm/html/#/squareCover/" + tic + "?isTicket=true";
        document.getElementById("type").innerHTML = type;
        document.getElementById("tic").innerHTML = tic;
    } else {
        document.getElementById("type").innerHTML = "不正なurlです";
    }
}
function clip(type) {
    var txt;
    if (!navigator.clipboard) {
        alert("クリップボードに対応していません");
        return;
    }
    if (type == 0) {
        txt = document.getElementById("rep").innerHTML
    } else if (type == 1) {
        txt = document.getElementById("join").innerHTML
    } else if (type == 2) {
        txt = document.getElementById("inv").innerHTML
    }
    navigator.clipboard.writeText(txt);
    alert("コピーしました");
}
function seikei() {
    try {
    var msg = document.getElementById("flexJson").value;
    msg = JSON.parse(msg);
    msg = JSON.stringify(msg,null,2);
    document.getElementById("flexJson").value = msg;
    document.getElementById("seikeierr").innerHTML = " ";
} catch (error) {
    document.getElementById("seikeierr").innerHTML = error;
}
}
function flexSend(type) {
    seikei();
    var msg = document.getElementById("flexJson").value;
    document.getElementById('err').innerHTML = " "
    Cookies.set('rawjson', msg, {
        expires: 50
    });
    msg = JSON.parse(msg);
    if (type == 1) {
        send(msg);
    }
}
function Vout() {
    var alt = document.getElementById("Valt").value;
    var title = document.getElementById("Vtitle").value;
    var info = document.getElementById("Vinfo").value;
    var butName = document.getElementById("VbutName").value;
    var butUri = document.getElementById("VbutUri").value;
    var uri = document.getElementById("Vuri").value;
    var imag = document.getElementById("VimgUrl").value;
    document.getElementById("flexJson").value = `[{"type":"flex","altText":"${alt}","contents":{"type":"bubble","size":"kilo","direction":"ltr","hero":{"type":"image","url":"${imag}","aspectRatio":"260:173","aspectMode":"cover","size":"full"},"body":{"type":"box","layout":"vertical","contents":[{"type":"box","layout":"vertical","contents":[{"type":"text","weight":"bold","color":"#000000","maxLines":3,"wrap":true,"contents":[],"size":"17px","text":"${title}"},{"type":"text","text":"${info}","color":"#555555","size":"14px","margin":"5px","maxLines":3,"wrap":true,"offsetTop":"5px","offsetStart":"1px"}],"paddingTop":"12px","paddingBottom":"16px","paddingStart":"12px","paddingEnd":"12px"},{"type":"box","layout":"vertical","spacing":"none","contents":[{"type":"box","layout":"vertical","contents":[{"type":"text","text":"${butName}","color":"#42659a","size":"14px"}],"height":"57px","justifyContent":"center","alignItems":"center","action":{"type":"uri","label":"action","uri":"${butUri}"},"offsetTop":"2px"},{"type":"box","layout":"horizontal","contents":[],"width":"100%","height":"0.5px","margin":"4px","backgroundColor":"#0000000C","flex":0,"offsetBottom":"1px"},{"type":"box","layout":"horizontal","contents":[{"type":"box","layout":"horizontal","contents":[{"type":"image","url":"https://static.line-scdn.net/line_poll/edge/img/poll-flexIcon.png","align":"start","flex":0,"margin":"none","size":"16px","aspectMode":"fit","aspectRatio":"16:17"},{"type":"text","text":"投票","color":"#949494","size":"11px","align":"start","contents":[],"position":"relative","weight":"bold","margin":"6px"}],"alignItems":"center","justifyContent":"flex-start"},{"type":"image","flex":0,"align":"end","url":"https://vos.line-scdn.net/static/KOsdmDJ.png","size":"5px","aspectMode":"cover","aspectRatio":"5:8"}],"action":{"type":"uri","label":"action","uri":"https://line.me/R/share?text=運営はゴミ"},"spacing":"none","justifyContent":"space-between","alignItems":"center","paddingStart":"12px","paddingEnd":"12px","paddingTop":"10px","paddingBottom":"10px"}],"paddingAll":"none"}],"paddingAll":"none"}}}]`;
    flexSend(1);
}

function Lout() {
    var alt = document.getElementById("Lalt").value;
    var title = document.getElementById("Ltitle").value;
    var info = document.getElementById("Linfo").value;
    var butName = document.getElementById("LbutName").value;
    var butUri = document.getElementById("LbutUri").value;
    var imag = document.getElementById("LimgUrl").value;
    document.getElementById("flexJson").value = `[{"type": "flex","altText": "${alt}","contents": {"type": "bubble", "size": "kilo", "body": { "type": "box", "layout": "vertical", "contents": [ { "type": "image", "url": "https://obs.line-scdn.net/0hF3YRnB6wGRxkKwtVFGNmS2t9RDIIXw0XAB9IBzlUM0I0ZSg0PSU3Dl5qGHo", "aspectRatio": "260:395", "aspectMode": "cover", "position": "absolute", "align": "end", "size": "full" }, { "type": "box", "layout": "horizontal", "contents": [ { "type": "box", "layout": "vertical", "contents": [ { "type": "box", "layout": "vertical", "contents": [ { "type": "image", "url": "https://obs.line-scdn.net/0hIYLvh3INFnZxDwQ_B4ppIXlZS1gdewJ9FTtHbQxIHCgofxVwEDESRBcQCRkK", "position": "absolute", "size": "11px", "align": "start", "offsetTop": "7px", "offsetStart": "14px" }, { "type": "text", "text": "Live talk", "size": "9px", "color": "#06C755", "weight": "bold", "offsetStart": "29px", "align": "start", "offsetBottom": "md", "position": "absolute" } ], "position": "absolute", "width": "82px", "height": "26px", "cornerRadius": "20px", "backgroundColor": "#00000040", "offsetStart": "13px", "offsetTop": "13px" }, { "type": "box", "layout": "vertical", "contents": [ { "type": "image", "url": "${imag}", "aspectMode": "cover", "size": "full" } ], "width": "95px", "height": "95px", "cornerRadius": "100px", "offsetTop": "18%", "offsetStart": "32%" }, { "type": "box", "layout": "vertical", "contents": [ { "type": "text", "text": "${title}", "margin": "none", "size": "20px", "color": "#FFFFFF", "weight": "bold", "align": "center", "wrap": true, "maxLines": 2 }, { "type": "text", "text": "${info}", "color": "#ffffff80", "margin": "sm", "size": "13px", "weight": "regular", "maxLines": 2, "align": "center", "wrap": true } ], "position": "absolute", "offsetTop": "49%", "paddingStart": "28px", "paddingEnd": "28px" }, { "type": "box", "layout": "vertical", "contents": [ { "type": "box", "layout": "baseline", "contents": [ { "type": "filler" }, { "type": "icon", "url": "https://obs.line-scdn.net/0h5s5xAax5alwIAXhwhy0VCz9XN3JkdX5XbDU7Yn9fawJ4aWpecTd4YENAdzRiYWheKyZ6bA", "size": "12px", "offsetTop": "1.5px" }, { "type": "text", "text": "${butName}", "size": "12px", "color": "#ffffff", "weight": "bold", "maxLines": 1, "flex": 0, "wrap": true }, { "type": "filler" } ], "paddingTop": "5%", "paddingBottom": "5%", "spacing": "4px" } ], "backgroundColor": "#06C755", "height": "35px", "cornerRadius": "7px", "offsetStart": "10%", "offsetEnd": "10%", "offsetBottom": "7.5%", "position": "absolute", "justifyContent": "center" }, { "type": "button", "action": { "type": "uri", "uri": "${butUri}", "label": " " }, "position": "absolute", "height": "md", "style": "link", "offsetTop": "81%", "offsetStart": "none", "offsetEnd": "none" } ], "position": "relative" } ], "offsetStart": "0px", "offsetEnd": "0px", "width": "100%", "height": "100%", "position": "absolute" } ], "paddingAll": "0px", "cornerRadius": "0px", "backgroundColor": "#2a2a2a", "height": "378px", "width": "100%" }, "styles": { "body": { "backgroundColor": "#000000" }}}}]`;
    flexSend(1);
}

function Oout() {
    var alt = document.getElementById("Oalt").value;
    var title = document.getElementById("Otitle").value;
    var info = document.getElementById("Oinfo").value;
    var butName = document.getElementById("ObutName").value;
    var butUri = document.getElementById("ObutUri").value;
    var uri = document.getElementById("Ourl").value;
    document.getElementById("flexJson").value = `[{"type":"flex","altText":"${alt}","contents":{"type":"bubble","direction":"ltr","styles":{"footer":{"separator":true,"separatorColor":"#F0F0F0"}},"body":{"type":"box","layout":"vertical","contents":[{"type":"box","layout":"vertical","contents":[{"type":"text","text":"LINEオープンチャット","size":"sm","color":"#6486e3","weight":"bold","wrap":true},{"type":"text","text":"${title}","size":"xl","color":"#000000","weight":"bold","wrap":true}],"paddingTop":"sm","paddingBottom":"sm"},{"type":"box","layout":"vertical","contents":[{"type":"text","text":"${info}","size":"xs","color":"#555555","wrap":true}],"spacing":"sm","paddingTop":"md","paddingBottom":"md"},{"type":"box","layout":"vertical","contents":[{"type":"button","action":{"type":"uri","label":"${butName}","uri":"${butUri}"},"height":"sm"}],"paddingTop":"sm","paddingBottom":"sm"}],"spacing":"sm","paddingAll":"xl"},"footer":{"type":"box","layout":"horizontal","contents":[{"type":"box","layout":"vertical","contents":[{"type":"image","url":"https://obs.line-scdn.net/0hUoMuxuSZCkBwDCOxWCR1F0ZRASJDbhRLUi4acwFbDC8JaU0eHjpAL1INEXEPaU4THm0S","size":"full","position":"absolute","offsetTop":"0px","offsetBottom":"0px","offsetStart":"0px","offsetEnd":"0px"},{"type":"image","url":"https://vos.line-scdn.net/service-notifier/footer_profile_layer.png","size":"full","position":"absolute","offsetTop":"0px","offsetBottom":"0px","offsetStart":"0px","offsetEnd":"0px"}],"width":"20px","height":"20px"},{"type":"text","text":"LINE My inquiries","size":"xs","gravity":"center","color":"#999999","weight":"bold"},{"type":"box","layout":"horizontal","contents":[{"type":"image","url":"https://vos.line-scdn.net/service-notifier/footer_go_btn.png","size":"full","gravity":"center"}],"width":"12px"}],"spacing":"md","action":{"type":"uri","label":"action","uri":"${uri}"}},"size":"kilo"}}]`;
    flexSend(1);
}

function Iout() {
    var alt = document.getElementById("Ialt").value;
    var title = document.getElementById("Ititle").value;
    var info = document.getElementById("Iinfo").value;
    var butName = document.getElementById("IbutName").value;
    var butUri = document.getElementById("IbutUri").value;
    var imag = document.getElementById("IimgUrl").value;
    document.getElementById("flexJson").value = `[{"type": "flex","altText": "${alt}","contents":{"type":"bubble","size":"kilo","body":{"type":"box","layout":"vertical","contents":[{"type":"image","url":"${imag}","size":"full","aspectMode":"cover","aspectRatio":"260:328","align":"end"},{"type":"image","url":"https://obs.line-scdn.net/0hI5cYsbLMFhpeID8D4iVpTVx2SzQyVAIROhRHKSN8Ji5yflJTIxkP","size":"full","aspectRatio":"260:328","align":"end","aspectMode":"cover","position":"absolute"},{"type":"image","url":"https://obs.line-scdn.net/0hJ44fB5PeFRsJHzwCtGJqTDxJSDVlawEQbStEA21LFHl9fxcjdzEGLnJCTlomZk0Mai8","size":"full","aspectMode":"cover","aspectRatio":"260:328","align":"end","position":"absolute"},{"type":"box","layout":"horizontal","contents":[{"type":"box","layout":"vertical","contents":[{"type":"box","layout":"vertical","contents":[{"type":"text","text":"${title}","size":"lg","color":"#FFFFFF","weight":"bold","maxLines":4,"wrap":true,"margin":"none","align":"start"},{"type":"text","text":"${info}","color":"#ffffff","size":"xs","weight":"regular","margin":"sm"}],"offsetStart":"16.92%","offsetEnd":"17.31%","position":"absolute","offsetTop":"25%"},{"type":"box","layout":"baseline","contents":[{"type":"text","text":"${butName}","color":"#ffffff","weight":"bold","size":"sm","gravity":"center"},{"type":"icon","url":"https://obs.line-scdn.net/0hQpG1rFeGDl96SCdGxgZxCHUeU3EWPBpUHnxfaRwLDik5KwxWRV9DcEAJDzk","position":"relative","size":"xxs"}],"position":"absolute","offsetTop":"83.84%","spacing":"xxl","width":"100%","paddingStart":"16.92%","paddingEnd":"17.31%"},{"type":"button","action":{"type":"uri","label":" ","uri":"${butUri}"},"style":"link","height":"md","offsetTop":"79.26%","position":"absolute","offsetStart":"none","offsetEnd":"none"}],"position":"relative"}],"position":"absolute","offsetStart":"0px","offsetEnd":"0px","width":"100%","height":"100%"}],"paddingAll":"0px","width":"100%","height":"100%","backgroundColor":"#aaaaaa00"}}}]`;
    flexSend(1);
}

function Cout() {
    var alt = document.getElementById("Calt").value;
    var title = document.getElementById("Ctitle").value;
    var info = document.getElementById("Cinfo").value;
    var imag = document.getElementById("CimgUrl").value;
    var butName = document.getElementById("CbutName").value;
    var butUri = document.getElementById("CbutUri").value;
    document.getElementById("flexJson").value = `[{"type":"template","altText":"${alt}","template":{"type":"buttons","thumbnailImageUrl":"${imag}","imageAspectRatio": "rectangle","imageSize":"cover","imageBackgroundColor":"#FFFFFF","title":"${title}","text":"${info}","actions":[{"type":"uri","label":"${butName}","uri":"${butUri}"}]}}]`;
    flexSend(1);
}
function stop() {
    var xx = document.getElementById("xxint").value;
    if (xx == 0) {
        document.getElementById('but').innerHTML = "<button type=\"button\" onclick=run() >連投開始</button>";
        return;
    }
    saveApp();
    location.reload();

}
function stop2() {
    saveApp();
    location.reload();
}
function run() {
    document.getElementById('but').innerHTML = "<button type=\"button\" onclick=stop() id=\"RED\">連投停止</button>";
    //setc();
    var msg = document.getElementById("uni").value;
    var bef = document.getElementById("1str").value;
    var aft = document.getElementById("2str").value;
    var x = document.getElementById("xint").value;
    var xx = document.getElementById("xxint").value;
    var rate = document.getElementById("rate").value;
    if (xx == 0) {
        document.getElementById("xxint").value = 1;
        document.getElementById('but').innerHTML = "<button type=\"button\" onclick=run() >連投開始</button>";
        return;
    }
    msg = msg.repeat(x);
    msg = bef + msg + aft;
    //document.getElementById('err').innerHTML= msg;
    loopSleep(xx, rate, function(i) {
        sendMessage(msg);
        document.getElementById('xxint').value = xx - i - 1;
    });
    function sendMessage(msg) {
        send([{
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }])
    }
}

function sendMsg() {
    send([{
        type: 'text',
        text: "l\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nl",
    }, {
        type: 'text',
        text: "l\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nl",
    }, {
        type: 'text',
        text: "l\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nl",
    }, {
        type: 'text',
        text: "l\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nl",
    }, ]).then(()=>{
        document.getElementById('err').innerHTML = ""
    }
    ).catch((err)=>{
        document.getElementById('err').innerHTML = err
    }
    );
}

function check() {
    var msg = document.getElementById("uni").value.length;
    var bef = document.getElementById("1str").value.length;
    var aft = document.getElementById("2str").value.length;
    var x = document.getElementById("xint").value;
    var len = bef + aft + msg * x;
    if (len > 10000) {
        document.getElementById("xint").value = Math.floor((10000 - bef - aft) / msg);
        x = document.getElementById("xint").value;
        len = bef + aft + msg * x;
        document.getElementById('check').innerHTML = len + " - 自動修正<br>" + bef + "+" + msg + "x" + x + "+" + aft;
        if (document.getElementById('but')) {
            document.getElementById('but').innerHTML = "<button type=\"button\" onclick=run() >連投開始</button>"
        }
    } else {
        document.getElementById('check').innerHTML = len + " - 連投可能<br>" + bef + "+" + msg + "x" + x + "+" + aft;
        if (document.getElementById('but')) {
            document.getElementById('but').innerHTML = "<button type=\"button\" onclick=run() >連投開始</button>"
        }
    }
}
function check2() {
    document.getElementById("xint").value = 10000;
    check()
}

function run2() {
    //setc();
    check();
    var msg = document.getElementById("uni").value;
    var bef = document.getElementById("1str").value;
    var aft = document.getElementById("2str").value;
    var x = document.getElementById("xint").value;
    msg = msg.repeat(x);
    msg = bef + msg + aft;
    //document.getElementById('err').innerHTML= msg;
    send1Message(msg);
}

function send1Message(msg) {
    send([{
        type: 'text',
        text: msg
    }])
}
function uniPad() {
    let unico = ["ܑ", "ܰ", "ܱ", "ܲ", "ܳ", "ܴ", "ܵ", "ܶ", "ܷ", "ܸ", "ܹ", "ܺ", "ܻ", "ܼ", "ܽ", "ܾ", "ܿ", "݀", "݁", "݂", "݃", "݄", "݅", "݆", "݇", "݈", "݉", "݊", "ૺ", "ૻ", "ૼ", "ੈ", "଼", "ิ", "ุ", "ฺ", "้", "ີ", "ⷣ", "ⷵ", "ⷨ", "֦", "֘"];
    let uniP = document.getElementById("uniPad");
    let unibut = "";
    uniP.innerHTML = "";
    for (var i = 0; i < unico.length; ++i) {
        unibut = unibut + `<button type="button" onclick=setuni("${unico[i]}") id="unicpad">${unico[i]}</button>`;
    }
    uniP.innerHTML = unibut;
}
function setuni(u) {
    document.getElementById("uni").value = document.getElementById("uni").value + u;
    check();
}
function loopSleep(_loopLimit, _interval, _mainFunc) {
    var loopLimit = _loopLimit;
    var interval = _interval;
    var mainFunc = _mainFunc;
    var i = 0;
    var loopFunc = function() {
        var result = mainFunc(i);
        if (result === false) {
            // break機能
            return;
        }
        i = i + 1;
        if (i < loopLimit) {
            setTimeout(loopFunc, interval);
        }
    }
    loopFunc();
}
function run3() {
    var time = Math.floor(document.getElementById("time").value);
    document.getElementById('but2').innerHTML = "<button type=\"button\" onclick=stop2() >停止</button>";
    loopSleep(time, 60000, function(i) {
        if (document.getElementById("time")) {
            document.getElementById("time").value = time - i - 1;
            document.getElementById('but2').innerHTML = "<button type=\"button\" onclick=stop2() >停止</button>";
        }
        if ((time - i) == 1) {
            tRun();
        }
    });
}
function tRun() {
    var msg = document.getElementById("uni").value;
    var bef = document.getElementById("1str").value;
    var aft = document.getElementById("2str").value;
    var x = document.getElementById("xint").value;
    var xx = 10000000;
    var rate = 700;
    msg = msg.repeat(x);
    msg = bef + msg + aft;
    if ((!tk1 == "") && tk1) {
        tSend(msg, tk1, xx, rate);
    }
    ;if ((!tk2 == "") && tk2) {
        tSend(msg, tk2, xx, rate);
    }
    ;if ((!tk3 == "") && tk3) {
        tSend(msg, tk3, xx, rate);
    }
    ;if ((!tk4 == "") && tk4) {
        tSend(msg, tk4, xx, rate);
    }
    ;if ((!tk5 == "") && tk5) {
        tSend(msg, tk5, xx, rate);
    }
    ;
}
function tSend(m, t, xx, rate) {
    loopSleep(xx, rate, function(i) {
        sendMessage(m, t);
    });
    function sendMessage(msg, t) {
        send2([{
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }, {
            type: 'text',
            text: msg
        }], t)
    }
}

function send2(m, t) {
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
    }).catch((err)=>document.getElementById('err').innerHTML = "Error: " + err).then((data)=>data.json()).then((res)=>{
        if (res.message) {
            document.getElementById('err').innerHTML = "Error: " + res.message;
            return false
        }
        if (res.status) {
            document.getElementById('err').innerHTML = "Send: " + res.status;
            return true
        }
    }
    );
}

function isToken(n) {
    var t;
    t = document.getElementById("tok" + n).value;
    init2(t, n)

}

function init2(t, n) {
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
            document.getElementById('err2').innerHTML = "Error: " + res.error;
            document.getElementById("to" + n).innerHTML = "Error-";
            if (n == 1) {
                tk1 = null;
            } else if (n == 2) {
                tk2 = null;
            } else if (n == 3) {
                tk3 = null;
            } else if (n == 4) {
                tk4 = null;
            } else if (n == 5) {
                tk5 = null;
            }
        }
        ;if (res.scope) {
            document.getElementById('err2').innerHTML = "Success: " + res.scope;
            document.getElementById("to" + n).innerHTML = "";
            if (n == 1) {
                tk1 = t;
            } else if (n == 2) {
                tk2 = t;
            } else if (n == 3) {
                tk3 = t;
            } else if (n == 4) {
                tk4 = t;
            } else if (n == 5) {
                tk5 = t;
            }
        }
    }
    );
}
function delC() {
    Cookies.remove('isAgree');
    Cookies.remove('uni');
    Cookies.remove('1str');
    Cookies.remove('2str');
    Cookies.remove('xint');
    Cookies.remove('xxint');
    Cookies.remove('rate');
    Cookies.remove('OCurl');
    Cookies.remove('flexJson');
}
function img2url() {
    fetch("https://api.line.me/v2/profile", {
  "headers": {
    "accept": "application/json",
    "accept-language": "ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": `Bearer ${token}`,
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://line-toolbox.f5.si/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then((data)=>data.json()).then((res)=>{
    if (res.pictureUrl){
        document.getElementById("img_url").innerHTML=`<p>変換結果</p><img src="${res.pictureUrl}" alt="img"/><p>url: ${res.pictureUrl}</p>`
    }
})
}
function uniK() {
    let uni=document.getElementById("uni").value;
    document.getElementById("res").innerHTML="";
    uni = [...uni];
    for (let i = 0; i < uni.length; i++) {
        let u=uni[i];
        if (!document.getElementById(u)){
            document.getElementById("res").innerHTML=document.getElementById("res").innerHTML+`<p>ユニコ<input type="text" size="20" value="${u}">×数量<input type="number" id="${u}" size="20" value="0"></p>`
        }
    }
    for (let i = 0; i < uni.length; i++) {
        let u=uni[i];
        if (document.getElementById(u)){
            document.getElementById(u).value=parseInt(document.getElementById(u).value,10)+1;
        }
    }
}