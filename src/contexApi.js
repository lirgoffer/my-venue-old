import React,{ createContext,useState , useEffect} from "react";


const AllData = createContext()

const addresIp = 'http://172.20.10.2'

const KEYUSER = 'userLogOlam'


export const  Data = ({children})=>{

    const [user,setUser]= useState(null)
    const [allHall,setAllHall] = useState([])




// עידכון בתחילת הרצת האצר 
    const updateStart = ()=>{

        console.log('ppp');

        let user = localStorage.getItem(KEYUSER)
        // localStorage.removeItem(KEYUSER)
        setUser(user)

        fetch(`${addresIp}/allHall`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setAllHall(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }


// פונקציות בתחברות והרשמה 
    const signUp = async ( username,password,maile,)=>{
        return await fetch(`${addresIp}/newUser`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                username,
                password,
                maile,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data != false){
                localStorage.setItem(KEYUSER,JSON.stringify(data))
                updateStart()
                console.log(data);
            }
            return(data)
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const logIn = async (password,maile)=>{
        return await fetch(`${addresIp}/logIn`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                password,
                maile,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data == false){
                return false
            }
            else{
                localStorage.setItem(KEYUSER,JSON.stringify(data))
                updateStart()
                return data
            }
        })
        .catch(err=>{
            console.log(err);
        })




    }



// פונקציות עדכון סיסמה 
    const sendCodeToUpdatePassword =  async(maile) =>{
        return await fetch(`${addresIp}/getCodeToSebd`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                maile
            })
        })
        .then(res=>res.json())
        .then(data=>{
            return  data
        })
        .catch(err=>{
            console.log(err);
        })
    }

    const checkCode = async (codePssword,maile) =>{
        return await fetch(`${addresIp}/checkCodePasswrd`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                codePssword,
                maile
            })
        })
        .then(res=>res.json())
        .then(data=>{
            return data
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const updatePsswordServer = async (password,maile,codePssword) =>{
        return await fetch(`${addresIp}/updatePssword`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                password ,
                maile ,
                codePssword
            })
        })
        .then(res=>res.json())
        .then((data)=>{
            return data
        })
        .catch(err=>{
            console.log(err);
        })
    }


// קבלת כל התגובות של האולם 
    const getComment = async (IdVailu)=>{
        return await fetch(`${addresIp}/getCommentHall`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                IdVailu
            })
        })
        .then(res=>res.json())
        .then(data=>data)
        .catch(err=>{
            console.log(err);
        })
    }

    const getNameComment = async (userId) =>{
        return await fetch(`${addresIp}/getNameUserComment`,{
            headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
            method:'POST',
            body:JSON.stringify({
                userId
            })
        })
        .then(res=>res.json())
        .then(data=>{
            return data.nameUser
        })
        .catch(err=>{
            console.log(err);
        })
    }




// הןספת תגובה 

   const AddCommentServer = async (userId,rating,text,eventDay,eventYear,unusualtime,upgrade,timeAdd,IdVailu)=>{
    return await fetch(`${addresIp}/addNewComment`,{
        headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
        method:'POST',
        body:JSON.stringify({
            userId,
            rating,
            text,
            eventDay,
            eventYear,
            unusualtime,
            upgrade,
            timeAdd,
            IdVailu
        })
    })
    .then(res=>res.json())
    .then(data=>{
        return data
    })
    .catch((e)=>{
        console.log(e);
    })
   }

    useEffect(()=>{
        updateStart()
    },[])







    return(
        <AllData.Provider value={{allHall,signUp,user,logIn,sendCodeToUpdatePassword,checkCode,updatePsswordServer,getComment,getNameComment,AddCommentServer}}>{children}</AllData.Provider>
    )
}


export default AllData