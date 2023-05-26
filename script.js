const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('condition');
const weatherDescription = document.getElementById('weather-description');
const weatherContainer = document.getElementById("weather-container");
const address = document.getElementById('address');
const todayDate = document.getElementById('date');


//to call weather api for search input location
function search(e){
    // console.log(e);
    if(e.key=="Enter" || e.type === 'click'){//p press e.key=p
        if(input.value!==""){
            callApi(input.value);
        }
        return;
    }

   
        // callApi(e.target.value);

}
input.addEventListener('keypress',search);
searchBtn.onclick = search;

function callApi(location){
    console.log(location);

    //modern way to make/do http req to get/post/ data from server
    const apiKey = '0259dc96fb66cf3d5392191c67fa9e24';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    // fetch(apiUrl)
    // .then((response)=>response.json())
    // .then((responseData)=>{
    //     console.log(responseData);
    //     if(responseData.cod==200){
    //         const weatherIconCode=responseData.weather[0]?.icon;
    //             const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
    //             const Days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    //             const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    //             const date = new Date();
    
    //             const CurrentLocationWeather = {
    //                 address:`${responseData.name}, ${responseData.sys.country}`,
    //                 todayDate:`${Days[date.getDay()-1]} ${date.getDate()} ${months[date.getMonth()-1]}`,
    //                 temperature:Math.floor(responseData.main.temp ) + "&deg;C",
    //                 weatherCondition:responseData.weather[0]?.main,
    //                 weatherDescription:`Today weather is ${responseData.weather[0].description}`,
    //                 weatherIconUrl:weatherIconUrl
    //             }
    
    //             window.localStorage.setItem('previousSearchedWeather',JSON.stringify(CurrentLocationWeather));
    
    //             temperature.innerHTML=CurrentLocationWeather.temperature;
    //             weatherCondition.innerText=CurrentLocationWeather.weatherCondition;
    //             weatherDescription.innerText=CurrentLocationWeather.weatherDescription;
    //             // weatherIcon.setAttribute('src',CurrentLocationWeather.weatherIconUrl);
    //             address.innerText=CurrentLocationWeather.address;
    //             todayDate.innerText=CurrentLocationWeather.todayDate;
    
    //             const img =document.createElement('img');
    //             img.src = CurrentLocationWeather.weatherIconUrl;
    //             img.classList.add('bg-white');
    //             weatherCondition.appendChild(img);
    
    //             // const span = document.createElement('span');
    //             // const address = document.createElement('p');
    //             // address.innerText=`${responseData.name}, ${responseData.sys.country}`;
    //             // weatherContainer.prepend(address);
    
              
            


    //     }else{
    //         // todayDate.innerText=`Write Name of City Properly, City By this "${location}" name not exist in our database`;
    //         temperature.innerText="";
    //         todayDate.innerText="";
    //         address.innerText="";
    //         weatherCondition.innerText="";

    //         const img =document.createElement('img');
    //         img.src = "https://cdn-icons-png.flaticon.com/128/2748/2748614.png";
    //         weatherCondition.appendChild(img);
    //         // weatherIcon.setAttribute('src',"https://cdn-icons-png.flaticon.com/128/2748/2748614.png");
    //     }
    // })
    // .catch((e)=>{
    //     console.log("error",e);
    // });


    /* Older Way , events way*/
    const xhr = new XMLHttpRequest();
    //initialize an request method
    xhr.open('Get',apiUrl,true);

    //events
    xhr.onload=()=>{
        //both response as text
        console.log(xhr.response);
        console.log(xhr.responseText);
        const responseData = JSON.parse(xhr.response);
        console.log(responseData);
            if(responseData.cod==200){
                const weatherIconCode=responseData.weather[0]?.icon;
                    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
                    const Days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
                    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
                    const date = new Date();
        
                    const CurrentLocationWeather = {
                        address:`${responseData.name}, ${responseData.sys.country}`,
                        todayDate:`${Days[date.getDay()-1]} ${date.getDate()} ${months[date.getMonth()-1]}`,
                        temperature:Math.floor(responseData.main.temp ) + "&deg;C",
                        weatherCondition:responseData.weather[0]?.main,
                        weatherDescription:`Today weather is ${responseData.weather[0].description}`,
                        weatherIconUrl:weatherIconUrl
                    }
        
                    window.localStorage.setItem('previousSearchedWeather',JSON.stringify(CurrentLocationWeather));
        
                    temperature.innerHTML=CurrentLocationWeather.temperature;
                    weatherCondition.innerText=CurrentLocationWeather.weatherCondition;
                    weatherDescription.innerText=CurrentLocationWeather.weatherDescription;
                    // weatherIcon.setAttribute('src',CurrentLocationWeather.weatherIconUrl);
                    address.innerText=CurrentLocationWeather.address;
                    todayDate.innerText=CurrentLocationWeather.todayDate;
        
                    const img =document.createElement('img');
                    img.src = CurrentLocationWeather.weatherIconUrl;
                    img.classList.add('bg-white');
                    weatherCondition.appendChild(img);
        
                    // const span = document.createElement('span');
                    // const address = document.createElement('p');
                    // address.innerText=`${responseData.name}, ${responseData.sys.country}`;
                    // weatherContainer.prepend(address);
        
                  
                
    
    
            }else{
                temperature.innerText="";
                todayDate.innerText="";
                address.innerText="";
                weatherCondition.innerText="";
    
                const img =document.createElement('img');
                img.src = "https://cdn-icons-png.flaticon.com/128/2748/2748614.png";
                weatherCondition.appendChild(img);
            }
    }
    xhr.onerror=()=>{}

    //req send method/make http req
    xhr.send();
};



//create element and add text
window.onload=function(){  
    const CurrentLocationWeather=JSON.parse(localStorage.getItem("previousSearchedWeather"));
    if(CurrentLocationWeather){//not null     
        temperature.innerHTML=CurrentLocationWeather.temperature;
        weatherCondition.innerText=CurrentLocationWeather.weatherCondition;
        weatherDescription.innerText=CurrentLocationWeather.weatherDescription;
        // weatherIcon.setAttribute('src',CurrentLocationWeather.weatherIconUrl);
        address.innerText=CurrentLocationWeather.address;
        todayDate.innerText=CurrentLocationWeather.date;

        const img =document.createElement('img');
        img.src = CurrentLocationWeather.weatherIconUrl;
        img.classList.add('bg-white');
        weatherCondition.appendChild(img);
     }
}
window.onunload=function(){

}

// What is ${} in programming?
//In Javascript the ${} is used to insert a variable to a string.
// ${} = template string 

// string interpolation=String interpolation in JavaScript is a process in which an expression is inserted or placed in the string.

//In JavaScript, the template string implements the string interpolation. A template string is defined by wrapping a sequence of characters into a pair of backticks `I'm template string` . The template string placeholders have the format ${expression} , for example `The number is ${number}`