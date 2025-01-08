'use client'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PersonIcon from '@mui/icons-material/Person';
import {useAppSelector} from "@/redux/store";
import Link from 'next/link'
import {useEffect, useState, useRef} from "react";
import Hamburger from 'hamburger-react';
import styles from '@/styles/home.module.css'

export default function Navbar () {
    const username = useAppSelector(state => state.user.username)
    const [isOpen, setOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement| null>(null);
    const toggleHamburger=()=>{
        setOpen(!isOpen);
    }
    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const SlideMenu =()=>{
        return (
            <div ref={menuRef} className={`${ isOpen ? "-translate-x-0 " : "-translate-x-full"} ${styles.hamburgerList}`}>
                <Link href={username? "#":'/auth'} className={styles.hamburgerListLink}>{username?'SignOut':'SignIn'}</Link>
            </div>
        )
    }
    return (
         <div>
             <div className={'flex items-center justify-between bg-blue-500 p-[5px_10%] rounded-md'}>
                 <div className={'flex'}>
                     <div>
                         <PlayCircleOutlineIcon />
                     </div>
                     <p className={'text-[20px]'}>IPlay</p>
                 </div>
                 <button className={'bg-white rounded-2xl items-center px-[10px] hover:cursor-pointer hidden md:flex'}>
                     <div className={'p-[5px]'}>
                         <PersonIcon className={'text-black'} />
                     </div>
                     <Link className={'text-blue-500'} href={username? "#":'/auth'}>
                         { !username? "Login" : username}
                     </Link>
                 </button>
                 <div className={'flex md:hidden'}>
                     <Hamburger toggle={toggleHamburger} toggled={isOpen}/>
                 </div>
             </div>
             {isOpen && <SlideMenu/>}
        </div>
    )
}