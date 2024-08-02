export function getRainInfo(weather) {
  const rainInfo = {
    text: 'Uppehåll ',
    color: 'green.3',
    pop: '',
  };

  if (weather?.rain) {
    rainInfo.text =
      weather.rain['1h'].toFixed(1).toString() + ' mm/h ';
    rainInfo.color = 'cyan.4';
  }
  if (weather?.snow) {
    rainInfo.text =
      weather.snow['1h'].toFixed(1).toString() + ' mm/h ';
    rainInfo.color = 'cyan.0';
  }
  if (weather?.pop) {
    rainInfo.pop = (weather.pop * 100).toFixed(0).toString() + '%';
  }

  return rainInfo;
}
