import { createContext, useState } from "react";
import run from "../Confige/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async(prompt) => {
        setResultData("")
        setLoding(true)
        setShowResult(true)
        let response;
        if(response !== undefined){
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[prompt,...prev])
            setRecentPrompt(input || prompt)
            response = await run(input || prompt)
        }
        let responsarray = response.split("**")
        let newres = ""
        for(let i=0;i<responsarray.length;i++){
            if(i===0 || i%2!==1){
                newres += responsarray[i]
            }
            else{
                newres += "<b>" +responsarray[i]+"</b>"
            }
        }
        let newres2 = newres.split("*").join("</br>")
        let newresponsearray = newres2.split(" ")
        for(let i=0;i<newresponsearray.length;i++){
            const next = newresponsearray[i]
            delayPara(i,next+" ")
        }
        setLoding(false)
        setInput("")

    }

    const [input,setInput] = useState("")
    const [recentPrompt,setRecentPrompt] = useState("")
    const [prevPrompts,setPrevPrompts] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoding] = useState(false)
    const [resultData,setResultData] = useState("") 

    const delayPara = (index,next) => {
        setTimeout(function () {
            setResultData(prev=>prev+next)
        },75*index)
    }

    const Newchat = () => {
        setInput("")
        setRecentPrompt("")
        setShowResult(false
            
        )
        setLoding(false)
        setResultData("")
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        Newchat,
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider