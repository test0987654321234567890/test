document.getElementById("main").innerHTML=`
<header id="header" class="header header_liff">
            <h1 class="headh">LIFFツール</h1>
            <nav >
                <div class="table-wrap">
                    <table class="table">
                      <tr>
                        <td><a class="heada" href="#toke">Token関係</a></td>
                        <td><a class="heada" href="#unico">通常ユニコ連投</a></td>
                        <td><a class="heada" href="#funi">Flexユニコ連投</a></td>
                        <td><a class="heada" href="#unik">ユニコ解析</a></td>
                        <td><a class="heada" href="#flexid">Flex送信</a></td>
                        <td><a class="heada" href="#img_url">Flexテンプレート</a></td>
                        <td><a class="heada" href="#ocurl">OCリンク変換</a></td>
                        <td><a class="heada" href="#help">使い方・ヘルプ</a></td>
                      </tr>
                    </table>
                  </div>
            </nav>
        </header>
        <header class="err" id="errbar">
            <span id="err"></span>
        </header>
        <br id="toke">
        <br>
        <h3 >Token関係</h3>
        <p>
            liff-token:<input type="text" id="token" value="null"><button type="button" onclick=set()>設定</button>
        </p>
        <button type="button" onclick=pc()>tokenを転送</button><button type="button" onclick=clos()>tokenを保持して閉じる(a)</button><button type="button" onclick=openB()>ブラウザで開く</button>
        <p>
            メッセージ送信<input type=text id=test value="てすと"><button type="button" onclick=test()>送信</button>
        </p>
        <br id="unico">
        <br>
        <h3>通常ユニコ連投</h3>
        <p><input type="number" id="xxint" size="5" value="100">回<br><input type="number" id="rate" size="5" value="700">ミリ秒<br></p>
<span id="but"></span><button type="button" onclick=check2() >最大文字数</button><br>
<button type="button" onclick=sendMsg() >改行砲</button><button type="button" onclick=run2() >ユニコ手動投下</button>
<p><span id="check"><br><br></span></p>
<p>前につける文字列<input type="text" id="1str" size="20" value="" oninput=check()></p>
<p>　　　　+</p>
<p>ユニコ<input type="text" id="uni" size="20" value="͢" oninput=check()><button type="button" onclick=uniPad() >ユニコ一覧</button></p>
<p>重ねる回数<input type="number" id="xint" size="5" value="10000" oninput=check()></p>
<p>　　　　+</p>
<p>後につける文字列<input type="text" id="2str" size="20" value="" oninput=check()></p>
<div id="uniPad"></div>
<p >「ブラウザで開く」を押して外部ブラウザで開けば重くなりません</p>
<br id="funi">
<br>
<h3>Flexユニコ連投</h3>
            <p>
                投下回数:<input type="number" id="xint" size="5" value="4">回
            </p>
            <p>5回以上連投するとポリます</p>
            <p>
                投下間隔:<input type="number" id="rate" size="5" value="700">ミリ秒
            </p>
            <span id="but">
                <button type="button" onclick=run() >連投開始</button></button>
            </span>
            <p>
                ユニコ:<input type=text id=uni value="ࣿ" oninput=check()>
            <button type="button" onclick=uniPad()>ユニコ一覧</button></p>
            <p>
                重ねる数:<input type=number id=xuni value="16990" oninput=check()>
            </p>
            <p>
                表示するテキスト:<input type=text id="txt" value="$◄████▌=≡≡" oninput=check()>
            </p>
            <p>※$の部分がユニコに置換されます</p>
            <span id="col2">
                <p style="background-color: #888;color: #000000;">表示する色:</p>
            </span>
            <input type=text id="col" value="000000" oninput="sample()">
            <p>
                通知用テキスト:<input type=text id="alt" value="This is a Flex Bomb">
            </p>
            <div id="uniPad"></div>
<br id="unik"><br>
<h3>ユニコ解析</h3>
<p>解析するユニコ <input type="text" id="uni" size="20" value="" oninput=uniK()><button type="button" onclick=uniK() >解析</button></p>
<p id="flex">結果：</p>
<div id="spam"></div><div id="res"></div>
<br id="flexid">
<h3>Flex送信</h3><textarea id="flexJson" rows="10" cols="40" onblur="seikei()" >
    </textarea><p><span id="seikeierr"></span></p><button type="button" onclick=flexSend(1) >送信</button><br>
    <section>
    <h3>画像url生成</h3>
    <p><a href="line://nv/profile">アイコン画像を変換する画像にして</a>、変換を押してurlに変換できます。変換したurlはアイコンを再度変更しても変わりません。</p>
    <button type="button" onclick= img2url()>変換</button>
    <div id="img_url"></div>
    <br>
    <h3>テンプレート</h3>
    <section>
    <h3>あいさつメッセージ</h3>
    <p>通知メッセージ<input type="text" id="Balt" size="20" value="よろしくお願いします"></p>
    <p>あいさつ文<input type="text" id="Binfo" size="20" value="よろしくお願いします"></p>
    <p>ボタン名<input type="text" id="BbutName" size="20" value="大事なノートを見る"></p>
    <p>ボタンuri<input type="text" id="BbutUri" size="20" value="https://line.me"></p>
    <button type="button" onclick= Bout()>トークに送信</button><br><br>
    </section>
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
    <button type="button" onclick= Iout()>トークに送信</button><br><br id="url">
    </section>
    <br id="ocurl">
    <br>
    <h3>OCリンク変換</h3>
    <p>url:<input type="url" id="url">
        <button type="button" onclick= OCurl()>変換</button></p>
        <p>変換する形式</p><select id="outtype">
          <option value="line://">line://</option>
          <option value="https://line.me/R/">https://line.me/R/</option>
          <option value="https://line.me/S/">https://line.me/S/(LINEアプリからのみ利用可)</option>
          <option value="https://line.naver.jp/R/">https://line.naver.jp/R/</option>
          <option value="https://line.naver.jp/S/">https://line.naver.jp/S/(LINEアプリからのみ利用可)</option>
        </select>
        <p>変換結果</p>
        <p>urlの形式:<span id="type"></span></p>
        <p>通報リンク<br><input type="text" id="rep" size="20" onclick={this.select();this.focus();}></p>
        <p>参加リンク<br><input type="text" id="join" size="20" onclick={this.select();this.focus();}></p>
        <p>招待リンク<br><input type="text" id="inv" size="20" onclick={this.select();this.focus();}></p>
        <p>webデータ<br><input type="text" id="squ" size="20" onclick={this.select();this.focus();}></p>
        <p>ticket<br><input type="text" id="tic" size="20" onclick={this.select();this.focus();}></p>
        <div id="ocview"></div>
        <br id="help"><br>
        <h3>ヘルプ</h3>
        <p>
            <a href="https://line.me/R/oaMessage/@228jbgfo/">バグ報告・質問等はこちらへ</a>
        </p>
        <br><p>このサイトではis.gdの短縮URL apiを使用しています</p>
`
var errtimer;
var errtimer_;
liffmod.init().then()

function err(msg) {
    let errbox=document.getElementById("err");
    errbox.innerHTML=msg;
    clearInterval(errtimer);
    errtimer_=1000;
    errtimer=setInterval(function(){
        let bar=document.getElementById("errbar")
        errtimer_=errtimer_-10;
        bar.style=`background-color: rgba(255, 0, 0, ${errtimer_/1000});`
        if (errtimer_==0){
            clearInterval(errtimer);
            document.getElementById("err").innerHTML=""
        }
    },40)
}
function logbar(msg) {
    let errbox=document.getElementById("err");
    errbox.innerHTML=msg;
    clearInterval(errtimer);
    errtimer_=1000;
    errtimer=setInterval(function(){
        let bar=document.getElementById("errbar")
        errtimer_=errtimer_-10;
        bar.style=`background-color: rgba(0, 255, 255, ${errtimer_/1000});`
        if (errtimer_==0){
            clearInterval(errtimer);
            document.getElementById("err").innerHTML=""
        }
    },40)
}