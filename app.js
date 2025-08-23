let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
   {songName : "true love",  filePath: "1.mp3", coverPath : "cover.jpg"},
   {songName : "relaxe-sound",  filePath: "2.mp3", coverPath : "cover2.jpg"},
   {songName : "beat",  filePath: "3.mp3", coverPath : "cover3.jpg"},
   {songName : "no way",  filePath: "4.mp3", coverPath : "cover4.jpg"},
   {songName : "Rock on",  filePath: "5.mp3", coverPath : "cover5.jpg"}, 
   {songName : "motivational",  filePath: "6.mp3", coverPath : "cover6.jpg"},
   {songName : "hindi music",  filePath: "7.mp3", coverPath : "cover7.jpg"},
   {songName : "drop it",  filePath: "8.mp3", coverPath : "cover8.jpg"},
   {songName : "hopeful",  filePath: "9.mp3", coverPath : "cover9.jpg"},
   {songName : "better-day",  filePath: "10.mp3", coverPath : "cover10.jpg"},
];

 

  let audioElement = new Audio(songs[0].filePath);

function formatTime(seconds) {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


songItems.forEach((element, i)=>{
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
   
     
   const tempAudio = new Audio(songs[i].filePath);
   tempAudio.addEventListener('loadedmetadata', () => {
      element.querySelector('.timestamp').innerText = formatTime(tempAudio.duration) + ' ';


      const playIcon = document.createElement('i');
      playIcon.id = i + 1;
      playIcon.className = 'fas songItemPlay fa-play-circle';
      element.querySelector('.timestamp').appendChild(playIcon);

  playIcon.addEventListener('click', (e) => {
         if(audioElement.paused || songIndex !== i) {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
         } else {
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
         }
      });
   });
});

masterPlay.addEventListener('click', () =>{
   if (audioElement.paused || audioElement.currentTime<0){
      try{
    audioElement.play()
      }
      catch(error){
     console.log("balle balle")
      };
      
   masterPlay.classList.remove( 'fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   gif.style.opacity = 1;
   }
   else{
    audioElement.pause();
masterPlay.classList.remove('fa-pause-circle');
masterPlay.classList.add('fa-play-circle');
gif.style.opacity = 0;
}
});

audioElement.addEventListener('timeupdate',()=>{   
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    
      
    const currentTime = formatTime(audioElement.currentTime);
    const totalTime = formatTime(audioElement.duration);
    document.getElementById('masterSongName').innerText = `${songs[songIndex].songName} (${currentTime}/${totalTime})`;
});
myProgressBar.addEventListener('change',()=> {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});


const makeAllPlays = () => {
   audioElement.pause(); 
   Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
   });
   

   masterPlay.classList.remove('fa-pause-circle');
   masterPlay.classList.add('fa-play-circle');
   gif.style.opacity = 0;
};

document.getElementById('next').addEventListener('click', () => {
   if (songIndex >= songs.length - 1) {
     songIndex = 0;
   } else {
     songIndex++;
   }
   

   makeAllPlays();
   

   audioElement.src = songs[songIndex].filePath;
   masterSongName.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
   
   
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   gif.style.opacity = 1;
   
   document.getElementById(songIndex+1).classList.remove('fa-play-circle');
   document.getElementById(songIndex+1).classList.add('fa-pause-circle');
 });
 document.getElementById('previous').addEventListener('click', () => {
   if (songIndex <= 0) {
     songIndex = songs.length - 1; 
   } else {
     songIndex--;
   }
   
     
   makeAllPlays();

   audioElement.src = songs[songIndex].filePath;
   masterSongName.innerText = songs[songIndex].songName;
   audioElement.currentTime = 0;
   audioElement.play();
  
   masterPlay.classList.remove('fa-play-circle');
   masterPlay.classList.add('fa-pause-circle');
   gif.style.opacity = 1;
   
   
   document.getElementById(songIndex+1).classList.remove('fa-play-circle');
   document.getElementById(songIndex+1).classList.add('fa-pause-circle');
});