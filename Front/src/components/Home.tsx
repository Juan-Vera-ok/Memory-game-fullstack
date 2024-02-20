import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import "../css/custom.css"
import { start } from "@popperjs/core";



export default function Home(props)
{


    var sounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellow: new Audio ("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
      };

    const min= 1;
    const max= 5;

    const [pattern, setPattern] = useState<number[]>([]);
    const [userPattern, setUserPattern] = useState<number[]>([]);
    const [userHighScore,setUserHighScore]=useState(0);
    const [lights,setLights] = useState<{
        redLight : null|boolean
        greenLight: null|boolean
        blueLight:null|boolean
        yellowLight:null|boolean
    }>({redLight:false,
        greenLight:false,
        blueLight:false,
        yellowLight:false} )
    const [isPlaying, setisPlaying] = useState<boolean>(false)
    
    function generateRandomNumber() {
        
        const newPattern = [...pattern];
        const randomNumber = Math.trunc(Math.random() * (max - min) + min);
        newPattern.push(randomNumber);
        return newPattern;
    };
    
    const checkPattern = async (userPattern:number[]) => {
        let lost=false
        console.log({pattern,userPattern})
        for (let i=0;i<userPattern.length;i++){
            if(pattern[i]!=userPattern[i]){
                lost=true
                break;
            }
        }

        
        if (lost) {
            setisPlaying(false)
            setPattern([]);
            setUserPattern([]);        
        } else {if(pattern.length===userPattern.length){
            
            const newPattern=generateRandomNumber();
            await setTimeout(()=>{showPattern(newPattern)},1000)
            
            setPattern(newPattern)
            setUserPattern([]);
            if(userPattern.length>userHighScore){setUserHighScore(userHighScore+1)}
            
        }
        }
    
    };
    
    const showPattern = async(pattern:number[])=> {
        setisPlaying(false)
        console.log("AAAAAAAAAAAAA",pattern)
        for (const element of pattern) {
            if (element === 1) {
                sounds.red.play()
                setLights((prevLights) => ({ ...prevLights, redLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, redLight: false }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
            }
            if(element===2){
                sounds.green.play()
                setLights((prevLights) => ({ ...prevLights, greenLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, greenLight: false }));
                await new Promise((resolve) => setTimeout(resolve, 250));
            }
            if(element===3){
                sounds.blue.play()
                setLights((prevLights) => ({ ...prevLights, blueLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, blueLight: false }));
                
                await new Promise((resolve) => setTimeout(resolve,250));
            }
            if(element===4){
                sounds.yellow.play()
                setLights((prevLights) => ({ ...prevLights, yellowLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, yellowLight: false }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                
            }
        };
        setisPlaying(true)
        console.log(pattern+" pattern POSTA")
    }
    
    const handleOnClick = async (color:"red"|"green"|"blue"|"yellow")=>{
        if(!isPlaying){return}
        const newUserPattern = [...userPattern];
        if(color === "red"){
            sounds.red.play()    
            const newNumber = 1
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern);

            setLights((prevLights) => ({ ...prevLights, redLight: true }));
                
            await new Promise((resolve) => setTimeout(resolve, 250));
            setLights((prevLights) => ({ ...prevLights, redLight: false }));
            
            await new Promise((resolve) => setTimeout(resolve, 250));

        }
        if(color === "green"){
            sounds.green.play()
            const newNumber = 2
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern);

            setLights((prevLights) => ({ ...prevLights, greenLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, greenLight: false }));
                await new Promise((resolve) => setTimeout(resolve, 250));
        }
        if(color === "blue"){
            sounds.blue.play()
            const newNumber = 3
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern);

            setLights((prevLights) => ({ ...prevLights, blueLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, blueLight: false }));
                
                await new Promise((resolve) => setTimeout(resolve,250));
        }
        if(color === "yellow"){
            sounds.yellow.play()
            const newNumber = 4
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern); 

            setLights((prevLights) => ({ ...prevLights, yellowLight: true }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, yellowLight: false }));
                
                await new Promise((resolve) => setTimeout(resolve, 250));
        }
        await checkPattern(newUserPattern);
        
        console.log(userPattern+" el Pattern del usuario")
    }
    
  
    const startGame = async () => {
        if(pattern.length!=0){return}
        setPattern([])
        setUserPattern([])
        const newPattern = generateRandomNumber();
        await setTimeout(()=>{showPattern(newPattern)},1000)
        setPattern(newPattern)
    };
    





/*useEffect(()=>{
    if(isPlaying){       
       
        if(userPattern.length>=1&&userPattern.length===pattern.length){
            if(checkPattern()){
                setTimeout(showPattern, 2500)
                
        }}
        
        if(pattern.length>=1&&userPattern.length===0){
            setTimeout(showPattern, 2500)
        }
    }
    
         
        
    
    
    return()=>{
        
    }
},[pattern,userPattern]) */
    

    return(
        <div >
            <Navbar setUserAuth={props.setUserAuth}></Navbar>
            <div className="gameContainer">
            <div className={(lights.redLight===true)?"square redLight":"square red"} onClick={()=>{handleOnClick("red")}}></div>
            <div className={(lights.greenLight===true)?"square greenLight":"square green"} onClick={()=>{handleOnClick("green")}}></div>
            <div className={(lights.blueLight===true)?"square blueLight":"square blue"} onClick={()=>{handleOnClick("blue")}}></div>
            <div className={(lights.yellowLight===true)?"square yellowLight":"square yellow"} onClick={()=>{handleOnClick("yellow")}}></div>
            <div className="midCircle" onClick={ startGame}> {pattern.length===0?"Start": "Round "+pattern.length}</div>
            </div>
            <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">{pattern.length===0?undefined:"High score: "+userHighScore}</div>
            
        </div>
    )
}