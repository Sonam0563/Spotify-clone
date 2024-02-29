console.log('lets write java script');
let songs;
let currentsong = new Audio();
function secondsToMinutesSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    var formattedMinutes = ('0' + minutes).slice(-2);
    var formattedSeconds = ('0' + remainingSeconds).slice(-2);

    return formattedMinutes + ':' + formattedSeconds;
}
async function getsongs(){
let a = await fetch("http://127.0.0.1:5500/songs/")
let response = await a.text();
console.log(response)
let div = document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a")
let songs=[]
for(let index=0;index<as.length;index++){
    const element = as[index];
    if(element.href.endsWith(".mp3")){
        songs.push(element.href.split("/songs/")[1])
    }
}

return songs 

}
const playMusic=(track,pause= false )=>{
    //let audio = new Audio()
    currentsong.src="/songs/" + track
    if(!pause){
        currentsong.play()
    }
    
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML =decodeURI(track)
        document.querySelector(".songtime").innerHTML ="00:00/00:00"
} 

async function main(){
   
    //get the list of all song
    let songs = await getsongs()
    playMusic(songs[0],true)
    //show aal the song in the playlist
    console.log(songs)
     let songUL =document.querySelector(".songlist").getElementsByTagName("ul")[0]
     for (const song of songs) {
          songUL.innerHTML = songUL.innerHTML + `<li>  
          <img class="invert" src="music.svg" alt="">
         
          <div class="info">
              <div>${song.replaceAll("%20", " ")}</div>
              <div>Song Artist</div>
          </div>
          <div class="playnow">
              <span>play now</span>
              <img class ="invert" src="play.svg" alt="">
          </div>
       </li>`;
           
        
}
//attach an evevnt listener to each song
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element =>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML)
    })

})
//attach an event to play next and previous
play.addEventListener("click",()=>{
    if(currentsong.paused){
        currentsong.play()
        play.src="pause.svg"
    }
    else{
        currentsong.pause()
        play.src = "play.svg"
    }

})
   //listen for time update event
   currentsong.addEventListener("timeupdate",()=>{
    console.log(currentsong.currentTime,currentsong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.
        currentTime)}:${secondsToMinutesSeconds(currentsong.duration)}`
    document.querySelector(".circle").style.left= (currentsong.currentTime/
    currentsong.duration)*100 + "%";
   })
   //add an event listener to seekbar
   document.querySelector(".seekbar").addEventListener("click", e=>{

   })
   //add an event listner to seekbar
   document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent = (e.offsetX/e.target.getBoundingClientRect().width
    )*100;
    document.querySelector(".circle").style.left= percent + "%";
    currentsong.currentTime = ((currentsong.duration)*percent)/100
   })

   //add an event listener for hamburger
   document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left= "0"
   })
   //add an event listner for close
   document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left= "-110%"
   })

    //add an event listner to previous 
    previous.addEventListener("click", ()=>{
        console.log("previous clicked")
        console.log(currentsong)
        let index =songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if((index-1) > length){
            playMusic(songs[index+1])
        }
    })
     //add an event listner to next 
     next.addEventListener("click", ()=>{
        currentsong.pause()
        console.log("next clicked")

        let index =songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if((index+1) < songs.length-1){
            playMusic(songs[index+1])
        }
    })
    //add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener
    ("change", (e)=>{
        console.log("stting volume to", e.target.value,"/100")
        currentsong.volume = parseInt(e.target.value)/100
    })


}
main()