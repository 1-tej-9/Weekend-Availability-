let match = {
  day: "",
  place: "",
  food: "",
  time: ""
};


// =======================
// LOADING
// =======================

window.addEventListener("load", () => {

  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
  }, 4000);

});



// =======================
// SCREEN CONTROL
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

    let element=document.getElementById(screen);

    if(element){
      element.classList.add("hidden");
    }

  });


  document.getElementById(id)
  .classList.remove("hidden");

}



// =======================
// ACCEPT CALL
// =======================

function acceptCall(){

  const btn=document.getElementById("acceptBtn");

  btn.innerHTML="⚽ Game On!";

  setTimeout(()=>{

    showScreen("screen2");

  },1200);


}



// =======================
// DECLINE
// =======================

function declineCall(){

  document.querySelector(".card").innerHTML=

  `
  <h1>😢 Player unavailable</h1>
  <p>
  Maybe next weekend we will get the full squad together ⚽
  </p>
  `;

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
// CHEF MENU
// =======================

function continueToTime(){

  let food=document.getElementById("foodInput").value;


  if(food.trim()===""){

    alert("👨‍🍳 Tell the chef what you want!");

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


  startGame();

}




// =======================
// GAME SEQUENCE
// =======================

function startGame(){

  showScreen("result");


  document.getElementById("finalText").innerHTML=

  `
  <h1>⚽ Game On!</h1>
  <p>
  Preparing the final kick...
  </p>
  `;


  setTimeout(()=>{

    shootBall();

  },1000);

}




// =======================
// BALL SHOOT
// =======================

function shootBall(){

  let ball=document.getElementById("ball");

  let goal=document.getElementById("goal");


  ball.style.transition=
  "all 1.5s cubic-bezier(.17,.67,.35,1.3)";


  ball.style.bottom="430px";

  ball.style.left="50%";

  ball.style.transform=
  "translateX(-50%) scale(.55) rotate(720deg)";


  setTimeout(()=>{


    goal.classList.add("goalShake");


    celebration();


  },1500);



}



// =======================
// CELEBRATION
// =======================

function celebration(){


  document.getElementById("finalText").innerHTML=

  `
  <h1>🎉 GOOOOAL!!! ⚽</h1>

  <p>
  📅 ${match.day}<br>
  📍 ${match.place}<br>
  ${match.food ? "👨‍🍳 "+match.food+"<br>" : ""}
  🕒 ${match.time}
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

  const area=document.getElementById("confetti");


  for(let i=0;i<80;i++){


    let piece=document.createElement("span");


    piece.style.position="absolute";

    piece.style.width="8px";

    piece.style.height="14px";

    piece.style.background=
    "white";

    piece.style.left=
    Math.random()*100+"%";

    piece.style.top="-20px";


    piece.style.transform=
    `rotate(${Math.random()*360}deg)`;


    piece.style.animation=
    `fall ${2+Math.random()*3}s linear`;


    area.appendChild(piece);


  }


}



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

    title:"Weekend Football Plan",

    text:text

  });

 }

 else{

  navigator.clipboard.writeText(text);

  alert("📋 Match result copied!");

 }


}



// =======================
// CONFETTI ANIMATION
// =======================

const style=document.createElement("style");

style.innerHTML=`

@keyframes fall{

from{

transform:translateY(0) rotate(0);

opacity:1;

}


to{

transform:translateY(700px) rotate(720deg);

opacity:0;

}

}

`;

document.head.appendChild(style);
