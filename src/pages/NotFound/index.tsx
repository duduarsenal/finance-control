import { useEffect, useState } from "react"

export function NotFound() {
    const [randomGif, setRandomGif] = useState<string>("");

    async function getRandomGif() {

        const dataStorage = localStorage.getItem('timer')
        const dataAtual = new Date().toJSON();
        const gifStorage = localStorage.getItem("gif")
        
        let response = null;
        if (dataStorage && (dataStorage < dataAtual)) {
            const dt = new Date(new Date().setSeconds(new Date().getSeconds() + 15)).toJSON();
            localStorage.setItem('timer', dt);

            const pathname = window.location.pathname.split("/")[1]
            const url = "https://api.giphy.com/v1/gifs/random"
            const key = import.meta.env.VITE_API_KEY
            const tag = ["rgb", "rubberduck", "trollface", "lgbt", "creepy"].includes(pathname) 
            ? pathname : "memes"
    
            const responseUrl = await fetch(`${url}?api_key=${key}&tag=${tag}`)
            
            response = await responseUrl.json();

            if (response?.data?.id) localStorage.setItem("gif", response?.data?.id)
            else return console.error(response)
                    
        } else {
            if(!dataStorage){
                const dt = new Date(new Date().setSeconds(new Date().getSeconds() + 15)).toJSON();
                localStorage.setItem('timer', dt);
            }
            response = gifStorage;
        }

        const gif = response?.data?.id ? response.data.id : response;

        setRandomGif(`https://i.giphy.com/${gif ?? '4EiGNSTfy4WC4'}.webp`)
    }

    useEffect(() => {
        getRandomGif()
    }, [])

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center justify-center gap-4 m-auto">
                <h4 className="text-6xl font-extrabold text-center">
                    PAGE NOT FOUND
                </h4>
                <img 
                    src={randomGif} 
                    alt="Random gif" 
                    className="object-cover overflow-hidden w-[400px] h-[300px] rounded-lg sepia" 
                    style={{borderTop: '10px solid transparent', borderBottom: '30px solid transparent', borderRight: '80px solid', borderLeft: '80px solid'}}
                />
                <p className="text-center text-[20px]">Ops... parece que essa página não existe</p>
            </div>
        </div>
    )
}