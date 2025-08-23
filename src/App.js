import React, { useState, useRef, useEffect } from 'react';
import Navigation from './components/Navigation';
import SongList from './components/SongList';
import MusicPlayer from './components/MusicPlayer';

const songs = [
  {songName: "true love", filePath: "1.mp3", coverPath: "cover.jpg"},
  {songName: "relaxe-sound", filePath: "2.mp3", coverPath: "cover2.jpg"},
  {songName: "beat", filePath: "3.mp3", coverPath: "cover3.jpg"},
  {songName: "no way", filePath: "4.mp3", coverPath: "cover4.jpg"},
  {songName: "Rock on", filePath: "5.mp3", coverPath: "cover5.jpg"}, 
  {songName: "motivational", filePath: "6.mp3", coverPath: "cover6.jpg"},
  {songName: "hindi music", filePath: "7.mp3", coverPath: "cover7.jpg"},
  {songName: "drop it", filePath: "8.mp3", coverPath: "cover8.jpg"},
  {songName: "hopeful", filePath: "9.mp3", coverPath: "cover9.jpg"},
  {songName: "better-day", filePath: "10.mp3", coverPath: "cover10.jpg"},
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentSongIndex]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const playPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => console.log("Audio play error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const playSpecificSong = (index) => {
    if (currentSongIndex === index && isPlaying) {
      // If same song is playing, pause it
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Play new song or resume paused song
      setCurrentSongIndex(index);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.load(); 
        audioRef.current.play().catch(error => console.log("Audio play error:", error));
      }, 100);
    }
  };

  const nextSong = () => {
    const nextIndex = currentSongIndex >= songs.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play().catch(error => console.log("Audio play error:", error));
    }, 100);
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex <= 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play().catch(error => console.log("Audio play error:", error));
    }, 100);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  return (
    <div className="min-h-screen" style={{background: 'antiquewhite'}}>
      <Navigation />
      
      <div className="min-h-[75vh] bg-black text-white my-6 mx-auto w-[70%] p-8 rounded-lg flex flex-col font-varela bg-cover bg-right bg-no-repeat max-lg:w-[90%] max-lg:p-5 max-md:w-[95%] max-md:p-4 max-sm:min-h-screen max-sm:bg-black/90 max-sm:m-0 max-sm:p-0 max-sm:w-full" 
           style={{backgroundImage: `url(${process.env.PUBLIC_URL}/back-img.jpg)`}}>
        <SongList 
          songs={songs}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          onSongSelect={playSpecificSong}
          formatTime={formatTime}
        />
      </div>

      <MusicPlayer
        currentSong={songs[currentSongIndex]}
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={playPause}
        onNext={nextSong}
        onPrevious={previousSong}
        onProgressChange={handleProgressChange}
        formatTime={formatTime}
      />

      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/${songs[currentSongIndex].filePath}`}
        onEnded={nextSong}
        preload="metadata"
      />
    </div>
  );
}

export default App;
