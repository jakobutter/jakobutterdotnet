const convertInput= document.getElementById('convert-input')
const convertButton= document.getElementById('convert-button')
const resultDisplay= document.querySelector('.result')

convertButton.addEventListener("click", () => {
    getAudio();
})

async function getAudio(){
    let link=convertInput.value;
    let parts=link.split("=");
    let videoId="";

    if (parts.length===2){
        videoId=parts[1];
        console.log(videoId);
    }
    else{
        console.log("error!")
    }

    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '53d6df19f4msh7d840ad207bf08bp1b83abjsne378edb2d0d8',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };
    

    const response = await fetch(url, options);
    const result = await response.json();
    resultDisplay.innerHTML = `<p class="title" >Video Title: ${result.title}</p>`;
    console.log(result);
    setTimeout( () =>{
        window.open(result.link, "_blank")
    },1000)
 
}
