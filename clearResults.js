export function clearPreviousResults() {
  const existingWeatherBoard = document.querySelector('.weather-board');
  if (existingWeatherBoard) {
    existingWeatherBoard.remove();
  }
}
export function clearPrevDetailedResults() {
  const existingDetailedBoard = document.querySelector('.detailed-results');
  if (existingDetailedBoard) {
    existingDetailedBoard.remove();
  }
}