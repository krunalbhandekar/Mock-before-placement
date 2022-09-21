import React, { useEffect,useState } from 'react'
import axios from "axios"
import Styles from "./Home.module.css"
import {Link } from "react-router-dom";



const Home = () => {
    const [data, setdata] = useState([])

    const get=async()=>{
      let r=await axios("https://dog.ceo/api/breeds/list/all")
      let n=Object.keys(r.data.message)
            setdata(n)
    }
    
    useEffect(()=>{
       get()
    },[])

  return (
    <>
    <h3>Name of breeds</h3>

    <div className={Styles.container}>
     {data.map((e,i)=>{
        return <div key={i} className={Styles.div}>
            <Link to={`/puppy/${e}`} className={Styles.breedname}>
            <p >{e}</p>

            </Link>
        </div>
     })}
    </div>
    
    </>
  )
}

export default Home
