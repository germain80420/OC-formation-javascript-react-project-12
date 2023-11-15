import { useEffect, useState } from "react"
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/data";


const baseUrl = "http://localhost:3000";

export function useApiSportSee(query,idUser){
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error,setError] = useState(false)
    const endpoint = getEndpointByQuery(query,idUser)
    
    useEffect(()=>{
        if(process.env.REACT_APP_DATA_FROM_API==='false'){
            const mockedData = getMockedDataByQuery(query,idUser)
            if(mockedData===undefined){
                setError(true)
            }
            setIsLoading(false)
            setData(mockedData)
        }
        else{
            setIsLoading(true)
            async function fetchData(){
                try{
                    const url = baseUrl+"/"+endpoint
                    const response = await fetch(url)
                    const data = await response.json()
                    const extractedData = getDataByQuery(data,query)
                    setData(extractedData)
                    console.log(extractedData)
                    if(extractedData==="utilisateur inconnu")
                        setError(true)                
                }catch(error){
                    setError(true)
                }finally{
                    setIsLoading(false);
                }
            }
            fetchData();        
        }
       
    },[query,idUser,endpoint])

    return {data,isLoading,error}


}

function getEndpointByQuery(query,idUser){
    let uri = "user/"+idUser
    switch(query){
        
        case "averageSessions":
            return uri+"/average-sessions"
        case "activity":
            return uri+"/activity"
        case "performance":
            return uri+"/performance"
        default :
         return uri
        
    }
}
function getMockedDataByQuery(query,idUser){
    let userMainData = USER_MAIN_DATA.find(data=>data.id===parseInt(idUser))
    switch(query){
        case "firstName":
            return userMainData.userInfos.firstName
        case "keyData":
            return userMainData.keyData
        case "todayScore":
            return (userMainData.todayScore!=null?userMainData.todayScore:userMainData.score)*100
        case "activity":
            return USER_ACTIVITY.find(data=>data.userId===parseInt(idUser)).sessions
        case "performance":
            return USER_PERFORMANCE.find(data=>data.userId===parseInt(idUser)).data
        case "averageSessions":   
            return USER_AVERAGE_SESSIONS.find(data=>data.userId===parseInt(idUser)).sessions
        default : 
            return null

    }
}
function getDataByQuery(data,query){
    if(data){
        switch(query){
            case "firstName":
                return data==="can not get user"?"utilisateur inconnu":data.data.userInfos.firstName
            case "keyData":
                return data==="can not get user"?"utilisateur inconnu":data.data.keyData
            case "todayScore":
                return data==="can not get user"?"utilisateur inconnu":(data.data.todayScore!=null?data.data.todayScore:data.data.score)*100
            case "activity":
                return data==="can not get user"?"utilisateur inconnu":data.data.sessions
            case "performance":
                return data==="can not get user"?"utilisateur inconnu":data.data.data
            case "averageSessions":   
                return data==="can not get user"?"utilisateur inconnu":data.data.sessions
            default : 
                return null

        }
    }
    


}
