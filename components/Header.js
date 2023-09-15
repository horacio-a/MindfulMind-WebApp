
import { RxHamburgerMenu, RxReload } from 'react-icons/rx';
import { AiOutlineSetting } from 'react-icons/ai';

import { Lato } from 'next/font/google'
import { useState } from 'react';

const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})

export default function Header({ setSidebar, sidebar, refreshData }) {
    const [ReloadAnimation, setReloadAnimation] = useState(false)
    const ReloadFuntion = () => {
        if (ReloadAnimation !== true) {
            setReloadAnimation(true)
            refreshData()
            setTimeout(() => {
                setReloadAnimation(false)
            }, 1500);
        }

    }
    return (
        <header >
            <div className='leftSide'>

                <div className="conteinerBurgerMenu" onClick={() => { sidebar ? setSidebar(false) : setSidebar(true) }}>
                    <RxHamburgerMenu size={24} color='#fff' />
                </div>
                <div className={`appName ${lato.className}`}>
                    MINDFULMIND
                </div>
            </div>

            <div className='rightSide'>

                <RxReload size={20} onClick={() => { ReloadFuntion() }} className={` reloadIcon ${ReloadAnimation ? 'Animated' : 'NotAnimated'}`} />
                <div className='conteinerPicture'>
                    <div className='profielPicture'></div>
                    <div className='Setting'>
                        <AiOutlineSetting size={24} color='#fff' />

                    </div>

                </div>
            </div>



        </header>
    )
}
