'use client'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Browse(params: {firstComponent: React.ReactNode,secondComponent: React.ReactNode}) {
    const [searchQuery, setSearchQuery] = useState<string>('')

    return (
        <main>
                <form className='border-[1px] border-white flex w-full md:w-[400px] rounded-[10px] overflow-hidden'>
                    <input type="text" placeholder={"Search artist"} value={searchQuery}
                           onChange={(e) => { setSearchQuery(e.target.value)}}
                        className={`w-[90%] px-[10px] h-[50px] focus:outline-none outlie-none`}/>
                        <div className='w-[10%]'>
                            <SearchIcon className={"w-[100%] h-[50px] hover:cursor-pointer hover:bg-gray-300 hover:text-gray-900"}/>
                        </div>
                </form>
            <section className={"flex flex-col w-full px-[10px] border-white border-[1px] border-rounded-[10px]"}>
                {params.firstComponent}
                { params.secondComponent}
            </section>
        </main>
    )
}