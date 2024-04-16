import axios from "axios"

const getUserHighScore = async ()=>{
    const userHighScore = await axios.post('localhost:3000/update-highscore')
}