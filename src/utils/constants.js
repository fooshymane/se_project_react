const coordinates = { lat: "40.179299", lon: "-75.540995"};
const apiKey = "0ccc4fe9afe40c8cbd4e7c5320b6005b";

 

const baseUrl = process.env.NODE_ENV === "production" 
  ? "https://api.wtwrharfoush.jumpingcrab.com"
  : "http://localhost:3001";




const weatherConditionImages = {
    day: {
        
        clear: {
            name: "clear",
            image: new URL("../assets/day/clear-sky.svg", import.meta.url).href,
        },
        
        clouds: {
            name: "cloudy",
            image: new URL("../assets/day/cloudy.svg", import.meta.url).href,
        },
        
        fog: {
          name: "fog",
          image: new URL("../assets/day/fog.svg", import.meta.url).href,
        },
        
        rain: {
            name: "rain",
            image: new URL("../assets/day/rain.svg", import.meta.url).href,

        },
        
        snow: {
            name: "snow",
            image: new URL("../assets/day/snow.svg", import.meta.url).href,

        },
        
        storm: {
            name: "storm",
            image: new URL("../assets/day/storm.svg", import.meta.url).href,

        },
    },
      
    night: {
        
        clear: {
            name: "clear",
            image: new URL("../assets/night/clear.svg", import.meta.url).href,

        },
        
        clouds: {
            name: "cloudy",
            image: new URL("../assets/night/cloudy.svg", import.meta.url).href,

        },
        
        fog: {
            name: "fog",
            image: new URL("../assets/night/fog.svg", import.meta.url).href,

        },
        
        rain: {
            name: "rain",
            image: new URL("../assets/night/rain.svg", import.meta.url).href,

        },
        
        snow: {
            name: "snow",
            image: new URL("../assets/night/snow.svg", import.meta.url).href,

        },
        
        storm: {
            name: "storm",
            image: new URL("../assets/night/storm.svg", import.meta.url).href,

        },

    },
}

export { coordinates, apiKey, weatherConditionImages, baseUrl };