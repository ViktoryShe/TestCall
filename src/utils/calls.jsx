export const addRandomRating = (call) => ({
    ...call,
    rating: Math.floor(Math.random() * 3 + 1)
  });
  
  export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };