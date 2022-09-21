import React,{useState} from 'react'
import Styles from "./Search.module.css"

const Search = () => {
    const [image, setimage] = useState([])
    const [value, setvalue] = useState("")
    const [toggle, settoggle] = useState(false)


    const getdata=async()=>{
         await fetch(`https://dog.ceo/api/breed/${value}/images`)
        .then((r)=>r.json())
        .then((d)=>{
            setimage(d.message)
        })
    }
    const getimages=()=>{
        settoggle(true)
        getdata()
        // setvalue("")
    }

  return (
    <>

    <div className={Styles.form}>
     <input type="text" placeholder='enter breed name' value={value} onChange={(e)=>setvalue(e.target.value)} />
     <button onClick={getimages}>Get images</button>
    </div>
{toggle?<h3>Images of {value} breed</h3>:null}
   

    <div className={Styles.img_div}>
        {image?.map((e)=>{
            return <div key={e} className={Styles.div}>
                <img className={Styles.img} src={e}/>
            </div>
        })}
    </div>
    </>
  )
}

export default Search
