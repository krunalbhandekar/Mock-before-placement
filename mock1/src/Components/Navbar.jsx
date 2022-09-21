import React from 'react'
import {NavLink} from "react-router-dom";
import Styles from "./Navbar.module.css"




const Navbar = () => {

  const activeStyle={
    color:"red"
  }
  const style={
    color:"black"
  }
  return (
    <div className={Styles.nav}>
      <NavLink style={({isActive})=>(isActive ? activeStyle : style)} to="/">Home</NavLink>
      <NavLink style={({isActive})=>(isActive ? activeStyle : style)} to="/puppy/:breed">Puppy</NavLink>
      <NavLink style={({isActive})=>(isActive ? activeStyle : style)} to="/search">Search</NavLink>
    </div>
  )
}

export default Navbar
