const knowledgeBase = [

{
    keywords:["hücre"],
    response:"Hücre, canlıların yapısal ve işlevsel temel birimidir. Tüm canlılar bir veya daha fazla hücreden oluşur."
},

{
    keywords:["dna"],
    response:"DNA, canlıların kalıtsal bilgisini taşıyan moleküldür ve hücrelerin nasıl çalışacağını belirleyen talimatları içerir."
},

{
    keywords:["rna"],
    response:"RNA, DNA'daki genetik bilgilerin protein üretiminde kullanılmasını sağlayan moleküldür."
},

{
    keywords:["mitoz"],
    response:"Mitoz, bir hücrenin iki genetik olarak özdeş yavru hücre oluşturacak şekilde bölünmesidir."
},

{
    keywords:["mayoz"],
    response:"Mayoz, üreme hücrelerini oluşturan ve kromozom sayısını yarıya indiren hücre bölünmesidir."
},

{
    keywords:["ozmoz"],
    response:"Ozmoz, suyun yarı geçirgen bir zardan düşük yoğunluklu ortamdan yüksek yoğunluklu ortama geçmesidir."
},

{
    keywords:["difüzyon","difuzyon"],
    response:"Difüzyon, maddelerin yoğunluğun fazla olduğu ortamdan az olduğu ortama doğru yayılmasıdır."
},

{
    keywords:["enzim"],
    response:"Enzimler, canlılardaki kimyasal reaksiyonları hızlandıran biyolojik katalizörlerdir."
},

{
    keywords:["protein"],
    response:"Proteinler, hücrelerin yapı taşı olan ve birçok biyolojik görevi yerine getiren büyük moleküllerdir."
},

{
    keywords:["atom"],
    response:"Atom, maddenin temel yapı taşıdır ve proton, nötron ile elektronlardan oluşur."
},

{
    keywords:["molekül"],
    response:"Molekül, iki veya daha fazla atomun kimyasal bağlarla birleşmesiyle oluşur."
},

{
    keywords:["element"],
    response:"Element, yalnızca tek tür atomdan oluşan saf maddedir."
},

{
    keywords:["bileşik","bilesik"],
    response:"Bileşik, iki veya daha fazla farklı elementin kimyasal olarak birleşmesiyle oluşan maddedir."
},

{
    keywords:["asit"],
    response:"Asitler, suda çözündüğünde hidrojen iyonu veren maddelerdir."
},

{
    keywords:["baz"],
    response:"Bazlar, hidrojen iyonu alan veya hidroksit iyonu veren maddelerdir."
},

{
    keywords:["ph"],
    response:"pH, bir çözeltinin asidik ya da bazik olduğunu gösteren ölçektir."
},

{
    keywords:["periyodik tablo"],
    response:"Periyodik tablo, elementleri atom numaralarına göre düzenleyen sistemdir."
},

{
    keywords:["yer çekimi","yerçekimi"],
    response:"Yer çekimi, kütleye sahip cisimlerin birbirini çekmesini sağlayan temel kuvvettir."
},

{
    keywords:["kuvvet"],
    response:"Kuvvet, bir cismin hareketini veya şeklini değiştirebilen etkidir."
},

{
    keywords:["enerji"],
    response:"Enerji, iş yapabilme veya değişim meydana getirebilme kapasitesidir."
},

{
    keywords:["hız","hiz"],
    response:"Hız, bir cismin belirli bir yöndeki hareket oranını ifade eder."
},

{
    keywords:["ivme"],
    response:"İvme, hızın zamana göre değişim oranıdır."
},

{
    keywords:["momentum"],
    response:"Momentum, bir cismin kütlesi ile hızının çarpımıdır."
},

{
    keywords:["kara delik"],
    response:"Kara delik, çekim kuvveti ışığın bile kaçamayacağı kadar güçlü olan uzay bölgesidir."
},

{
    keywords:["yıldız","yildiz"],
    response:"Yıldızlar, çekirdeklerinde füzyon reaksiyonları gerçekleşen dev sıcak gaz küreleridir."
},

{
    keywords:["gezegen"],
    response:"Gezegenler, yıldızların etrafında dönen büyük gök cisimleridir."
},

{
    keywords:["galaksi"],
    response:"Galaksi, milyarlarca yıldız, gaz ve toz bulutundan oluşan dev sistemlerdir."
}

];

function askAI(){

    const input = document.getElementById("question");
    const question = input.value;

    if(question.trim() === "") return;

    const q = question.toLowerCase();

    const chat = document.getElementById("chat");

    let response = "";

for(const topic of knowledgeBase){

    if(
        topic.keywords.some(keyword =>
            q.includes(keyword)
        )
    ){
        response = topic.response;
        break;
    }
}

if(response === ""){

    response =
    "Bu konu şu anda Compendium AI Beta'nın bilgi tabanında bulunmuyor. Bilgi tabanı sürekli geliştirilmektedir.";
}
    chat.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    const thinkingId = "ai-" + Date.now();

    chat.innerHTML += `
        <div class="ai-message" id="${thinkingId}">
            Thinking...
        </div>
    `;

    setTimeout(() => {

        document.getElementById(thinkingId).innerHTML = response;

    },1000);

    input.value="";
}

document
.getElementById("question")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        askAI();
    }

});