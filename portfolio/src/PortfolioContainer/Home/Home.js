import React from 'react'
import Header from '../Header/Header'
import Profile from '../Profile/Profile'
import Footer from '../Footer/Footer'
import './Home.css'
import ContactMe from '../ContactMe/ContactMe'


export default function Home() {
  return (
    <div className='home-container'>
        <Header/>
        <Profile/>
        <Footer/>
        <ContactMe/>
    </div>
  )
}
