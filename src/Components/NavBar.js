import React, {useContext,useEffect,useState} from 'react'
import Style from './NavBar.module.css'

import {ChatDappContext} from '../Context/ChatDappContext'
import Model from './Model'
import Error from './Error'
import { Link } from 'react-router-dom'
function NavBar() {
  const menuItems = [
    {
      menu:"All Users",
      link: "/allUser"
    },
    {
      menu:"CHAT",
      link: "/"
    },
    {
      menu:"CONTACT",
      link: "/"
    },
    {
      menu:"SETTING",
      link: "/"
    },
    {
      menu:"FAQ",
      link: "/"
    },
    {
      menu:"TERMS OF USE",
      link: "/"
    },
  ]

  const [active, setActive] = useState(1)
  const [open, setOpen] = useState(false)
  const [openModel, setOpenModel] = useState(false)

  const { account, userName, connectWallet } = useContext(ChatDappContext);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
        <img src="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png" alt="logo" width={50} height={50} ></img>
        </div>
        
        <div className={Style.NavBar_box_right}>
        {/* Desktop */}
        <div className={Style.NavBar_box_right_menu}>
          {menuItems.map((el,i)=>(
            <div
            onClick={()=>setActive(i+1)}
            key={i+1}
            className={`${Style.NavBar_box_right_menu_items} ${active === i+1 ? Style.active_btn: ""}`}
            >
              <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>{el.menu}</Link>
            </div>
          ))}
        </div>

        {/* Mobile */}
        {open && (
          <div className={Style.mobile_menu}>
          {menuItems.map((el,i)=>(
            <div
            onClick={()=>setActive(i+1)}
            key={i+1}
            className={`${Style.mobile_menu_items} ${active === i+1 ? Style.active_btn: ""}`}
            >
              <Link className={Style.mobile_menu_items_link} href={el.link}>{el.menu}</Link>
            </div>
          ))}

          <p className={Style.mobile_menu_btn}>
          <img src="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png" alt="close" width={50} height={50}
          onClick={()=> setOpen(false)}></img>
          </p>

        </div>
        )}
        
        {/* Connect Wallet */}

        <div className={Style.NavBar_box_right_connect}>
        {
          account == "" ? (<button onClick={()=> connectWallet()}> <span>Connect Wallet</span> </button>):
          (
            <button onClick={()=> setOpenModel(true)}>
              {""}
              <img src={userName? 'https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png' : 'https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png'} alt='Account image' width={20} height={20}></img>
              {""}
              <small>{userName || "Create account"}</small>
            </button>
          )
        }
        </div>
        <div>
          <div className={Style.NavBar_box_right_open} onClick={()=> setOpen(true)}>
          <img src="https://1000logos.net/wp-content/uploads/2016/11/meta-logo.png" alt="open" width={30} height={30}></img>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar