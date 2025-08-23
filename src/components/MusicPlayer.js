import React from 'react';

const MusicPlayer = ({ 
  currentSong, 
  isPlaying, 
  progress, 
  currentTime, 
  duration, 
  onPlayPause, 
  onNext, 
  onPrevious, 
  onProgressChange, 
  formatTime 
}) => {
  return (
    <div className="w-full h-[90px] bg-black sticky text-white bottom-0 flex items-center justify-center flex-col max-sm:h-auto max-sm:py-2">
      <input 
        type="range" 
        id="myProgressBar" 
        min="0" 
        value={progress || 0} 
        max="100"
        onChange={onProgressChange}
        className="w-[80vw] cursor-pointer mb-2 max-sm:mt-2"
        style={{accentColor: 'rgb(24, 180, 232)'}}
      />
      <div className="icons flex items-center justify-center max-sm:mt-2">
        <i 
          className="fas fa-3x fa-step-backward cursor-pointer mx-1 max-sm:text-xl max-sm:mx-1" 
          onClick={onPrevious}
        />
        <i 
          className={`fas fa-3x ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} cursor-pointer mx-1 max-sm:text-xl max-sm:mx-1`}
          onClick={onPlayPause}
        />
        <i 
          className="fas fa-3x fa-step-forward cursor-pointer mx-1 max-sm:text-xl max-sm:mx-1" 
          onClick={onNext}
        />
      </div>
      <div className="songInfo absolute left-[10vw] font-varela max-lg:left-[7vw] max-lg:text-sm max-md:left-[5vw] max-md:text-sm max-sm:left-[5vw] max-sm:bottom-[60px] max-sm:text-xs">
        <img 
          src={`${process.env.PUBLIC_URL}/playing.jpg`} 
          width="42" 
          alt="" 
          className={`inline-block mr-2 transition-opacity duration-400 max-sm:w-10 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
        <span>
          {currentSong.songName} ({formatTime(currentTime)}/{formatTime(duration)})
        </span>
      </div>
    </div>
  );
};

export default MusicPlayer;
