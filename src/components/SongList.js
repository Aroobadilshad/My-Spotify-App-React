import React, { useState, useEffect } from 'react';
import SongItem from './SongItem';

const SongList = ({ songs, currentSongIndex, isPlaying, onSongSelect, formatTime }) => {
  const [songDurations, setSongDurations] = useState({});

  useEffect(() => {
    // Load durations for all songs
    songs.forEach((song, index) => {
      const audio = new Audio(`${process.env.PUBLIC_URL}/${song.filePath}`);
      audio.addEventListener('loadedmetadata', () => {
        setSongDurations(prev => ({
          ...prev,
          [index]: audio.duration
        }));
      });
    });
  }, [songs]);

  return (
    <div>
      <div className="songList">
        <h1 className="text-2xl font-bold mb-8 max-sm:text-xl max-sm:mb-4 max-sm:px-2">Best of NCS-No copyright sound</h1>
      </div>
      <div className="songItemContainer mt-8 max-sm:mt-4">
        {songs.map((song, index) => (
          <SongItem
            key={index}
            song={song}
            index={index}
            isCurrentSong={currentSongIndex === index}
            isPlaying={isPlaying && currentSongIndex === index}
            duration={songDurations[index]}
            onPlay={() => onSongSelect(index)}
            formatTime={formatTime}
          />
        ))}
      </div>
    </div>
  );
};

export default SongList;
