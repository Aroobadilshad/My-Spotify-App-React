import React from 'react';

const SongItem = ({ song, index, isCurrentSong, isPlaying, duration, onPlay, formatTime }) => {
  return (
    <div className="h-12 flex bg-white w-1/2 text-black my-3 justify-between items-center rounded-full max-lg:w-[70%] max-lg:h-11 max-md:w-[90%] max-md:h-10 max-md:my-2 max-sm:h-auto max-sm:w-full max-sm:my-2 max-sm:px-2 max-sm:py-1">
      <img 
        src={`${process.env.PUBLIC_URL}/${song.coverPath}`} 
        alt={song.songName}
        className="w-11 mx-6 rounded-full max-lg:w-10 max-lg:mx-4 max-md:w-8 max-md:mx-2 max-sm:w-8 max-sm:mx-2"
      />
      <span className="songName flex-1 max-sm:text-sm max-sm:max-w-[120px] max-sm:whitespace-nowrap max-sm:overflow-hidden max-sm:text-ellipsis">
        {song.songName}
      </span>
      <span className="timestamp mx-6 flex items-center max-lg:mx-4 max-md:mx-2 max-sm:mx-1 max-sm:text-xs">
        {duration ? formatTime(duration) : '00:00'}
        <i 
          className={`fas ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} cursor-pointer text-base ml-2 max-sm:text-sm`}
          onClick={onPlay}
        />
      </span>
    </div>
  );
};

export default SongItem;
