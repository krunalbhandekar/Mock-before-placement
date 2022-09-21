import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom";
import Styles from "./Puppy.module.css"



const Puppy = () => {
  // const breed=Object.values(useParams())[0] 
  const {breed}=useParams()
 const [image, setimage] = useState([])
 
 const get=async()=>{

   await fetch(`https://dog.ceo/api/breed/${breed}/images`)
   .then((r)=>r.json())
   .then((d)=>{
     setimage(d.message)
    })
  }

  useEffect(()=>{
    get()
  },[])

  return (
   <>
   <h3>Images of {breed} breed</h3>

    <div className={Styles.img_div}>
        {breed && image?.map((e)=>{
            return <div key={e} className={Styles.div}>
                <img className={Styles.img} src={e}/>
            </div>
        })}
    </div>
    
   </>
  )
}

export default Puppy
