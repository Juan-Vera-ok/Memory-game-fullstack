import React, { ReactNode, useEffect, useState } from "react"
import Navbar from "./Navbar"
import "../css/custom.css"
import "../css/retroHighScore.css"
import axios from "axios";

declare global{
    const BACKEND_URL: string
}

interface Props {
    onLogout: () => void;
}

export default function Home(props: Props) {
    var sounds = {
        green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
    };

    const min = 1;
    const max = 5;
    const [topUsers, setTopUsers] = useState<any[]>([])
    const [pattern, setPattern] = useState<number[]>([]);
    const [userPattern, setUserPattern] = useState<number[]>([]);
    const [userHighScore, setUserHighScore] = useState(0);
    const [lights, setLights] = useState<{
        redLight: null | boolean
        greenLight: null | boolean
        blueLight: null | boolean
        yellowLight: null | boolean
    }>({
        redLight: false,
        greenLight: false,
        blueLight: false,
        yellowLight: false
    })
    const [isPlaying, setisPlaying] = useState<boolean>(false)

    function generateRandomNumber() {

        const newPattern = [...pattern];
        const randomNumber = Math.trunc(Math.random() * (max - min) + min);
        newPattern.push(randomNumber);
        return newPattern;
    };

    const checkPattern = async (userPattern: number[]) => {
        let lost = false
        for (let i = 0; i < userPattern.length; i++) {
            if (pattern[i] != userPattern[i]) {
                lost = true
                break;
            }
        }


        if (lost) {
            setisPlaying(false)
            setPattern([]);
            setUserPattern([]);
        } else {
            if (pattern.length === userPattern.length) {

                const newPattern = generateRandomNumber();
                await setTimeout(() => { showPattern(newPattern) }, 1000)

                setPattern(newPattern)
                setUserPattern([]);
                if (userPattern.length > userHighScore) {
                    const newUserHighScore = userHighScore + 1;
                    setUserHighScore(newUserHighScore)
                    const response = axios.post(BACKEND_URL+'/update-highscore', { newUserHighScore }, 
                    { 
                        withCredentials:true,
                        headers: {
                        "Access-Control-Allow-Origin": "https://memory-game-client.onrender.com",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Headers": "*",
                    } })


                }

            }
        }

    };

    const showPattern = async (pattern: number[]) => {
        setisPlaying(false)
        for (const element of pattern) {
            if (element === 1) {
                sounds.red.play()
                setLights((prevLights) => ({ ...prevLights, redLight: true }));

                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, redLight: false }));

                await new Promise((resolve) => setTimeout(resolve, 250));
            }
            if (element === 2) {
                sounds.green.play()
                setLights((prevLights) => ({ ...prevLights, greenLight: true }));

                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, greenLight: false }));
                await new Promise((resolve) => setTimeout(resolve, 250));
            }
            if (element === 3) {
                sounds.blue.play()
                setLights((prevLights) => ({ ...prevLights, blueLight: true }));

                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, blueLight: false }));

                await new Promise((resolve) => setTimeout(resolve, 250));
            }
            if (element === 4) {
                sounds.yellow.play()
                setLights((prevLights) => ({ ...prevLights, yellowLight: true }));

                await new Promise((resolve) => setTimeout(resolve, 250));
                setLights((prevLights) => ({ ...prevLights, yellowLight: false }));

                await new Promise((resolve) => setTimeout(resolve, 250));

            }
        };
        setisPlaying(true)
    }

    const handleOnClick = async (color: "red" | "green" | "blue" | "yellow") => {
        if (!isPlaying) { return }
        const newUserPattern = [...userPattern];
        if (color === "red") {
            sounds.red.play()
            const newNumber = 1
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern);

            setLights((prevLights) => ({ ...prevLights, redLight: true }));

            await new Promise((resolve) => setTimeout(resolve, 250));
            setLights((prevLights) => ({ ...prevLights, redLight: false }));

            await new Promise((resolve) => setTimeout(resolve, 250));

        }
        if (color === "green") {
            sounds.green.play()
            const newNumber = 2
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern);

            setLights((prevLights) => ({ ...prevLights, greenLight: true }));

            await new Promise((resolve) => setTimeout(resolve, 250));
            setLights((prevLights) => ({ ...prevLights, greenLight: false }));
            await new Promise((resolve) => setTimeout(resolve, 250));
        }
        if (color === "blue") {
            sounds.blue.play()
            const newNumber = 3
            newUserPattern.push(newNumber);
            setUserPattern(newUserPattern);

            setLights((prevLights) => ({ ...prevLights, blueLight: true }));

            await new Promise((resolve) => setTimeout(resolve, 250));
            setLights((prevLights) => ({ ...prevLights, blueLight: false }));

            await new Promise((resolve) => setTimeout(resolve, 250));
        }
        if (color === "yellow") {
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

    }


    const startGame = async () => {
        if (pattern.length != 0) { return }
        setPattern([])
        setUserPattern([])
        const newPattern = generateRandomNumber();
        await setTimeout(() => { showPattern(newPattern) }, 1000)
        setPattern(newPattern)
    };

    useEffect(() => {
        const promiseUser = axios.get(BACKEND_URL+'/users')
        promiseUser.then((users) => { setTopUsers(users.data) })
        const promiseHighScore = axios.post(BACKEND_URL+'/highScore-current-user', {}, { 
            withCredentials:true,
            headers: {
            'Access-Control-Allow-Origin': 'https://memory-game-client.onrender.com',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        } })
        promiseHighScore.then((highscore) => {
            setUserHighScore(highscore.data)

        })

    }, [userHighScore])



    return (
        <div >
            <Navbar onLogout={props.onLogout}></Navbar>
            <div className="divYourHighScore">{"Your high score: " + userHighScore}</div>
            <div className="retroContainer retro">
                <div className="divTittle">
                    Top 5 best players

                    <div>
                    <div className="divRank">Rank
                        <div >{topUsers.map(user => { return <div>{topUsers.indexOf(user) + 1}</div> })}</div>
                    </div>
                    <div className="divUsers">User
                        <div >{topUsers.map(user => { return <div>{JSON.stringify(user.user, null, 4)}</div> })}</div>
                    </div>
                    <div className="divHighScores">Score
                        <div>{topUsers.map(user => { return <div>{JSON.stringify(user.highscore, null, 4)}</div> })}</div>

                    </div>
                    </div>
                </div>
            </div>
            <div className="gameContainer retro">
                <div className={(lights.redLight === true) ? "square redLight" : "square red"} onClick={() => { handleOnClick("red") }}></div>
                <div className={(lights.greenLight === true) ? "square greenLight" : "square green"} onClick={() => { handleOnClick("green") }}></div>
                <div className={(lights.blueLight === true) ? "square blueLight" : "square blue"} onClick={() => { handleOnClick("blue") }}></div>
                <div className={(lights.yellowLight === true) ? "square yellowLight" : "square yellow"} onClick={() => { handleOnClick("yellow") }}></div>
                <div className="midCircle retro" onClick={startGame}> {pattern.length === 0 ? "Start" : "Round " + pattern.length}</div>
            </div>
            

        </div>
    )
}