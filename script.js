let match = {
  day: "",
  place: "",
  food: "",
  time: ""
};


// =======================
// SOUNDS (same folder)
// =======================

const kickSound = new Audio("kick.mp3");
const goalSound = new Audio("goal.mp3");
const missSound = new Audio("miss.mp3");



// =======================
// LOADING
// =======================

window.addEventListener("load", () => {

  setTimeout(() => {

    const loading = document.getElementById("loadingScreen");

    if(loading){
      loading.style.display = "none";
    }

  },4000);

});




// =======================
// SCREEN CHANGE
// =======================

function showScreen(id){

const screens = [
"screen1",
"screen2",
"screen3",
"chefScreen",
"screen4",
"result"
];


screens.forEach(screen=>{

let el=document.getElementById(screen);

if(el){
el.classList.add("hidden");
}

});


document.getElementById(id)
.classList.remove("hidden");

}




// =======================
// ACCEPT CALL
// =======================

function acceptCall(){


kickSound.currentTime=0;
kickSound.play();


let ball=document.getElementById("ball");


ball.style.transition=
"all 1.4s ease";


ball.style.left="75%";

ball.style.bottom="45%";

ball.style.transform=
"translateX(-50%) rotate(720deg) scale(.7)";



setTimeout(()=>{


showScreen("screen2");


resetBall();


},1500);



}




// =======================
// DECLINE
// =======================

function declineCall(){


missSound.currentTime=0;
missSound.play();



let ball=document.getElementById("ball");


ball.style.left="90%";

ball.style.bottom="75%";

ball.style.transform=
"rotate(-720deg)";



setTimeout(()=>{


showScreen("result");


document.getElementById("finalText").innerHTML=`

<h1>❌ MISS!</h1>

<p>
The shot went wide.
</p>

<h2>
Maybe next weekend ⚽
</h2>

`;



},1500);



}





function resetBall(){

let ball=document.getElementById("ball");


ball.style.transition="none";

ball.style.left="50%";

ball.style.bottom="90px";

ball.style.transform=
"translateX(-50%)";

}




// =======================
// DAY
// =======================

function chooseDay(day){

match.day=day;

showScreen("screen3");

}




// =======================
// PLACE
// =======================

function choosePlace(place){

match.place=place;


if(place.includes("Homemade")){

showScreen("chefScreen");

}

else{

showScreen("screen4");

}

}




// =======================
// FOOD
// =======================

function continueToTime(){


let food =
document.getElementById("foodInput").value;



if(food.trim()===""){

alert("👨‍🍳 Please enter your favourite dish");

return;

}


match.food=food;


showScreen("screen4");


}





// =======================
// TIME
// =======================

function chooseTime(time){


match.time=time;


startFinalShot();


}





// =======================
// FINAL SHOT
// =======================

function startFinalShot(){


showScreen("result");



document.getElementById("finalText").innerHTML=`

<h1>⚽ Final Shot...</h1>

<p>
The striker is ready!
</p>

`;



let ball=document.getElementById("ball");


setTimeout(()=>{


kickSound.currentTime=0;

kickSound.play();



ball.style.transition=
"all 1.5s cubic-bezier(.2,.8,.3,1)";



ball.style.left="50%";

ball.style.bottom="430px";

ball.style.transform=
"translateX(-50%) rotate(720deg) scale(.5)";



},700);



setTimeout(()=>{


goalSound.currentTime=0;

goalSound.play();


let goal=document.getElementById("goal");

goal.classList.add("goalShake");



celebrate();



},2300);



}





// =======================
// CELEBRATION
// =======================

function celebrate(){


document.getElementById("finalText").innerHTML=`

<h1>
🥅 GOOOOOOAAALLL!! ⚽🎉
</h1>


<h2>
🏆 Match Confirmed
</h2>


<p>
📅 ${match.day}
</p>


<p>
📍 ${match.place}
</p>


${match.food ?
`<p>👨‍🍳 ${match.food}</p>`
:""}


<p>
🕒 ${match.time}
</p>


<p>
See you this weekend 😄
</p>


`;



createConfetti();


document
.getElementById("shareBtn")
.classList.remove("hidden");


}





// =======================
// CONFETTI
// =======================

function createConfetti(){


let box=
document.getElementById("confetti");


if(!box) return;



for(let i=0;i<60;i++){


let piece=document.createElement("span");


piece.style.position="absolute";

piece.style.width="8px";

piece.style.height="14px";

piece.style.left=
Math.random()*100+"%";

piece.style.top="-20px";


piece.style.background="white";


piece.style.animation=
`drop 3s linear`;


box.appendChild(piece);


}


}



const confettiStyle=
document.createElement("style");


confettiStyle.innerHTML=`

@keyframes drop {

to {

transform:
translateY(700px)
rotate(720deg);

opacity:0;

}

}

`;


document.head.appendChild(confettiStyle);






// =======================
// SHARE
// =======================

function shareResult(){


let text=

`⚽ Weekend Match Confirmed!

📅 ${match.day}

📍 ${match.place}

${match.food ? "👨‍🍳 "+match.food : ""}

🕒 ${match.time}

GOOOAL! 🎉`;



if(navigator.share){


navigator.share({

title:"Weekend Match",

text:text

});


}

else{


navigator.clipboard.writeText(text);

alert("📋 Result copied!");

}


}
