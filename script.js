let selectedDay = "";
let selectedPlace = "";
let selectedTime = "";

let shareMessage = "";


// Sounds
let kickSound = new Audio("./kick.mp3");
let goalSound = new Audio("./goal.mp3");
let missSound = new Audio("./miss.mp3");

kickSound.volume = 1;
goalSound.volume = 1;
missSound.volume = 1;



// ACCEPT CALL-UP

function acceptCall(){

    kickSound.play();

    let ball = document.getElementById("ball");

    ball.classList.add("kick");


    setTimeout(()=>{

        document.getElementById("screen1").classList.add("hidden");

        document.getElementById("screen2").classList.remove("hidden");


    },1500);

}





// DECLINE

function declineCall(){

    missSound.play();


    let ball = document.getElementById("ball");

    ball.classList.add("miss");



    setTimeout(()=>{


        document.getElementById("screen1").classList.add("hidden");

        document.getElementById("result").classList.remove("hidden");



        document.getElementById("finalText").innerHTML = `

        <h1>❌ MISS!</h1>

        <p>The shot went wide.</p>

        <br>

        <p>Maybe another weekend.</p>

        <br>

        <h2>⚽ Good luck!</h2>

        `;



    },1500);

}





// DAY

function chooseDay(day){

    selectedDay = day;


    document.getElementById("screen2").classList.add("hidden");

    document.getElementById("screen3").classList.remove("hidden");

}





// PLACE

function choosePlace(place){

    selectedPlace = place;


    document.getElementById("screen3").classList.add("hidden");

    document.getElementById("screen4").classList.remove("hidden");

}





// TIME

function chooseTime(time){


    selectedTime = time;


    goalSound.play();


    document.getElementById("screen4").classList.add("hidden");


    document.getElementById("result").classList.remove("hidden");



    document.getElementById("finalText").classList.add("goal");



    document.getElementById("finalText").innerHTML = `


    <h1>🥅 GOOOOOOAAALLL!! ⚽</h1>


    <h2>🏆 Match Confirmed!</h2>


    <p>
    📅 ${selectedDay}
    </p>


    <p>
    📍 ${selectedPlace}
    </p>


    <p>
    🕒 ${selectedTime}
    </p>


    <br>


    <p>
    See you this weekend! 😄🇫🇷
    </p>


    `;



    shareMessage = `

⚽ Weekend Match Result

📅 ${selectedDay}

📍 ${selectedPlace}

🕒 ${selectedTime}

See you this weekend! 😄

`;



    document.getElementById("shareBtn").classList.remove("hidden");


}





// SHARE RESULT

function shareResult(){


    if(navigator.share){


        navigator.share({

            title:"⚽ Weekend Match Result",

            text:shareMessage

        });


    }

    else{


        alert("Take a screenshot and share it 🙂");


    }


}
