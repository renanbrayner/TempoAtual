window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section')
    const temperatureSpan = document.querySelector('.degree-section span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            //a api da darksky não permite o acesso a partir de host local logo um proxy é necessário
            //the api darksky doenst let the access from local host (proxy needed)
            //47b68eeab6227a1c25e90ad214ebcec0 a chave ultra secreta da API grátis/the ultra secret key of a free API
            const api = `${proxy}https://api.darksky.net/forecast/47b68eeab6227a1c25e90ad214ebcec0/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data=> {
                    console.log(data);
                    const {temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Conversão para celsius
                    let celsius = (temperature - 32) * (5/9)
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));
                    //chang to celsius
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "°F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent= Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }

                    })
                });
        });
    }
    //icones
    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});