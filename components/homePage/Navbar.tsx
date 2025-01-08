import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
 import PersonIcon from '@mui/icons-material/Person';
import {useAppSelector} from "@/redux/store";
import Link from 'next/link'

export default function Navbar () {
    const username = useAppSelector(state => state.user.username)
    return (
        <div className={'flex items-center justify-between bg-blue-500 p-[5px_10%] rounded-md'}>
            <div className={'flex'}>
                <div>
                    <PlayCircleOutlineIcon />
                </div>
                <p className={'text-[20px]'}>IPlay</p>
            </div>
            <button className={'bg-white rounded-2xl flex items-center px-[10px] hover:cursor-pointer'}>
                <div className={'p-[5px]'}>
                    <PersonIcon className={'text-black'} />
                </div>
                <Link className={'text-blue-500'} href={username? "#":'/auth'}>
                    { !username? "Login" : username}
                </Link>
            </button>
        </div>
    )
}