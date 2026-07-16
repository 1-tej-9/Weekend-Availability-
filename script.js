let match = {

day:"",
place:"",
food:"",
details:"",
time:""

};



// SOUNDS

const kickSound = new Audio("./kick.mp3");
const goalSound = new Audio("./goal.mp3");
const missSound = new Audio("./miss.mp3");


kickSound.volume = 1;
goalSound.volume = 1;
missSound.volume = 1;



function playSound(sound){

sound.pause();
sound.currentTime=0;

sound.play().catch(()=>{});

}





// LOADING

window.addEventListener("load",()=>{

setTimeout(()=>{

let loading=document.getElementById("loadingScreen");

if(loading){

loading.style.display="none";

}

},3000);


});







// SCREEN CONTROL


function showScreen(id){


[
"screen1",
"screen2",
"screen3",
"detailsScreen",
"chefScreen",
"screen4",
"result"

].forEach(x=>{

let el=document.getElementById(x);

if(el){

el.classList.add("hidden");

}

});


document.getElementById(id)
.classList.remove("hidden");


}








// ACCEPT


function acceptCall(){


playSound(kickSound);


let ball=document.getElementById("ball");


ball.style.transition="1.5s ease";

ball.style.left="70%";

ball.style.bottom="45%";

ball.style.transform=
"translateX(-50%) rotate(720deg)";



setTimeout(()=>{


showScreen("screen2");


resetBall();


},1500);


}







// DECLINE


function declineCall(){


playSound(missSound);


let ball=document.getElementById("ball");


ball.style.left="90%";

ball.style.bottom="80%";


setTimeout(()=>{


showScreen("result");


document.getElementById("finalText").innerHTML=`

<h1>❌ MISS!</h1>

<p>The shot went wide.</p>

<h2>Maybe another weekend ⚽</h2>

`;


},1200);


}








function resetBall(){

let ball=document.getElementById("ball");

ball.style.transition="none";

ball.style.left="50%";

ball.style.bottom="90px";

ball.style.transform="translateX(-50%)";


}







// DAY


function chooseDay(day){

match.day=day;

showScreen("screen3");


}








// PLACE


function choosePlace(place){


match.place=place;



if(place.includes("Homemade")){


showScreen("chefScreen");


}

else{


document.getElementById("detailsTitle").innerHTML =
"📍 Add details";


document.getElementById("detailsInput").value="";



if(place.includes("Café")){

document.getElementById("detailsTitle").innerHTML =
"☕ Café scouting report";

document.getElementById("detailsText").innerHTML =
"Need a place where the coffee is strong and the conversation survives. 😄";

}


else if(place.includes("Book")){


document.getElementById("detailsTitle").innerHTML =
"📚 Book Café mission";

document.getElementById("detailsText").innerHTML =
"Somewhere with books, coffee, and a chair that doesn't judge our reading speed. 😂";


}


else if(place.includes("Movie")){


document.getElementById("detailsTitle").innerHTML =
"🎬 Movie decision time";

document.getElementById("detailsText").innerHTML =
"Choose wisely... snacks will be watching your decision. 🍿😂";


}


}


showScreen("detailsScreen");


}



}







// DETAILS


function continueDetails(){


let value=
document.getElementById("detailsInput").value;


if(value.trim()==""){


alert("Please add some details 🙂");

return;


}



match.details=value;


showScreen("screen4");


}









// HOMEMADE


function continueToTime(){


let food=
document.getElementById("foodInput").value;


if(food.trim()==""){


alert("Please enter your favourite dish");

return;


}


match.food=food;


showScreen("screen4");


}







// TIME


function chooseTime(time){


match.time=time;


finalShot();


}







// FINAL SHOT


function finalShot(){


showScreen("result");



document.getElementById("finalText").innerHTML=`

<h1>⚽ Final shot...</h1>

<p>Almost there!</p>

`;



let ball=document.getElementById("ball");



setTimeout(()=>{


playSound(kickSound);



ball.style.transition=
"1.5s ease";


ball.style.left="50%";

ball.style.bottom="430px";

ball.style.transform=
"translateX(-50%) rotate(720deg)";



},700);





setTimeout(()=>{


playSound(goalSound);


document
.querySelector(".goal")
.classList.add("goalShake");



showResult();



},2200);



}







// RESULT


function showResult(){



document.getElementById("finalText").innerHTML=`

<h1>🥅 GOOOOOOAAALLL!! ⚽</h1>


<h2>🏆 Weekend plan locked in</h2>


<p>📅 ${match.day}</p>

<p>📍 ${match.place}</p>


${match.details ? 
`<p>📝 ${match.details}</p>`:""}



${match.food ? 
`<p>👨‍🍳 ${match.food}</p>`:""}



<p>🕒 ${match.time}</p>



<p>
See you this weekend! 😄⚽
</p>


`;



document
.getElementById("shareBtn")
.classList.remove("hidden");


createConfetti();


}








// CONFETTI


function createConfetti(){


let box=document.getElementById("confetti");


for(let i=0;i<40;i++){


let item=document.createElement("span");


item.style.position="absolute";

item.style.left=Math.random()*100+"%";

item.style.top="-20px";

item.style.width="8px";

item.style.height="12px";

item.style.background="white";

item.style.animation=
"drop 3s linear";


box.appendChild(item);


}


}








// SHARE


function shareResult(){


let text=

`⚽ Weekend plan locked in!

📅 ${match.day}

📍 ${match.place}

${match.details ? "📝 "+match.details:""}

${match.food ? "👨‍🍳 "+match.food:""}

🕒 ${match.time}

See you this weekend!`;



if(navigator.share){


navigator.share({

title:"Weekend Plan",

text:text

});


}

else{


navigator.clipboard.writeText(text);

alert("Result copied!");

}


}
