let btn =document.querySelector("button");
let home=document.getElementById("home");
let homeSound=document.querySelector(".audio");
let homeBtn=document.getElementById("homee");
let gamewindow=document.getElementById("gamewindow");


btn.addEventListener("click",()=>{
    home.classList.add("hide");
    setTimeout(()=>{
        home.style.display="none"
        homeSound.innerHTML=`<audio src="./assets/home.mp3" style="display: none;"></audio>`;
        gamewindow.style.display="flex";
        gamewindow.classList.remove("getout");
    },1000);
});
homeBtn.addEventListener("click",()=>{
    home.classList.remove("hide");
    gamewindow.classList.add("getout");
    homeSound.innerHTML=`        <audio loop autoplay controls src="./assets/home.mp3" style="display: none;"></audio> 
`;     
   
    setTimeout(() => {
        home.style.display="flex";
        gamewindow.style.display="none";
    },1000);
});

// game code 

let audio1=document.getElementById("a1");
let audio2=document.getElementById("a2");
let audio3=document.getElementById("a3");
let audio4=document.getElementById("a4");
let audio5=document.getElementById("a5");
let audio6=document.getElementById("a6");

window.addEventListener("onload",()=>{audio1.play();});

let start=document.getElementById("start");
let gameSequence=[];
let userSequence=[];
let color=["red","yellow","blue","green"];
let starter=false;
let level=0;
let showlevel=document.getElementById("level");
let body=document.querySelector(".body");
let highscore=0;
let hiscore=document.getElementById("score");

console.log(start.innerHTML);
start.addEventListener("click",()=>{
    if(starter==false){
        starter=true;
        start.innerHTML=`<img src="./assets/bulb.jpeg">`
        levelup();
    }
});

function levelup(){
    userSequence=[];
    showlevel.innerHTML=`<h1>${level}</h1>`;
    level++;   
    let random=Math.floor(Math.random()*4);
    let randBtn=document.getElementById(color[random]);
    
    gameSequence.push(color[random]);
    console.log(gameSequence);
    // sequenceflash(randBtn);
    flash(randBtn);
}
function check(index){
    if(userSequence[index]==gameSequence[index]){
        if(userSequence.length==gameSequence.length){
            body.style.backgroundColor="green";
            audio5.innerHTML=`<audio autoplay src="./assets/leve up.mp3" style="display: none;"></audio>`;
           setTimeout(() => {
            body.style.backgroundColor="black";
            audio5.innerHTML=`<audio src="./assets/leve up.mp3" style="display: none;"></audio>`;
            levelup();
           },500);
        }
    }else{
        start.innerHTML=`<img src="./assets/sad.jpeg">`
        body.style.backgroundColor="red";
        audio6.innerHTML=`<audio autoplay src="./assets/game over.mp3" style="display: none;"></audio>`;
        setTimeout(() => {
            audio6.innerHTML=`<audio src="./assets/game over.mp3" style="display: none;"></audio>`;
            start.innerHTML=`<img src="./assets/play btn.png">`
            body.style.backgroundColor="black";
            if(highscore < level){
                highscore=level;
                hiscore.innerHTML=`<h3>Best Score : ${highscore-1}</h3>`
            }
            gameresert();
        }, 1000);
    }
        
}
function flash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 350);
}
// function sequenceflash(btn){
//     for(let i=0;i<gameSequence.length;i++){
//         sequencef(gameSequence[i],350)
//        .then(()=>{
//            console.log("done");
//        });
//     }
//     flash(btn);
// }
// function sequencef(cequenceNo,delay){
//     return new Promise((resolve, reject) =>{
//         cequenceNo.classList.add("flash");
//        setTimeout(() => {
//         cequenceNo.classList.remove("flash");
//        },delay);
//        resolve("done");
//     })
// };

// function sequenceflash(ele){
//     return new Promise((resolve, reject) =>{
//         for(let i=0;i<=gameSequence.length;i++){
//              let btn=document.getElementById(gameSequence[i]);
//              btn.classList.add("flash");
//              setTimeout(() => {
//                  btn.classList.remove("flash");
//              }, 350);
//          }
//     })
// };

function btnpress(){
    let btn=this;
    Sound(btn.getAttribute("id"));
    flash(btn);
    usercolor=btn.getAttribute("id");
    userSequence.push(usercolor);
    check(userSequence.length-1);
}
let allbtn=document.querySelectorAll(".box");
for(btn of allbtn){
    btn.addEventListener("click",btnpress);
}

function gameresert(){
    starter=false;
    level=0;
    gameSequence=[];
    userSequence=[];
}

function Sound(ele){
    if(ele=="red"){
        audio1.innerHTML=`<audio  autoplay src="./assets/simon btn 1.mp3" style="display: none;"></audio>`;
        num=1;
        timeout(audio1,num);
    }
    else if (ele=="yellow") {
        audio2.innerHTML=`<audio  autoplay src="./assets/simon btn 2.mp3" style="display: none;"></audio>`;
        setTimeout(() => {
            audio2.innerHTML=`<audio src="./assets/simon btn 2.mp3" style="display: none;"></audio>`;
        },1000);
    } 
    else if(ele=="green"){
        audio3.innerHTML=`<audio  autoplay src="./assets/simon btn 3.mp3" style="display: none;"></audio>`;
        num=3;
        timeout(audio3,num);
    }
    else{
        audio4.innerHTML=`<audio  autoplay src="./assets/simon btn 4.mp3" style="display: none;"></audio>`;
        num=4;
        timeout(audio4,num);
    }
}
function timeout(ele,n){
    setTimeout(() => {
        ele.innerHTML=`<audio src="./assets/simon btn ${n}.mp3" style="display: none;"></audio>`;
    },1000);
}