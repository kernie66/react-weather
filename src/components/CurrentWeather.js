export default function CurrentWeather() {
  return(
    <div class="d-flex justify-content-between ml-2">
    <div class="d-flex ml-2 mr-1">
        <img src="weather_icons/PNG/256/day_partial_cloud.png" width="75px" height="75px" alt="Väder"/>
    </div>
    <div class="d-flex flex-column ml-1 mr-1 pl-1 py-0">
        <div class="d-flex">
            <span class="outline-lg text-center">
                Växlande molnighet
            </span>
        </div>
        <div class="d-flex justify-content-center">
            <span class="outline-md text-center pb-2">
                Uppehåll
            </span>
        </div>
    </div>
</div>

  )
}