
import { RxCardStack, RxCalendar, RxText } from 'react-icons/rx';
import { Lato } from 'next/font/google'

const lato = Lato({
    weight: '700',
    subsets: ['latin'],
})

export default function Sidebar({ sidebar, setPage, page }) {
    return (
        <aside className={`Sidebar ${sidebar ? 'Active' : 'Desactive'} `} >
            <div className={`tab ${page === 'Routine' ? 'active' : 'Desactive'}`} onClick={() => { setPage('Routine') }}>
                <div className='TabIconConteiner'>
                    <RxCardStack color='#fff' size={24} />
                </div>
                <div className={`TextTab ${lato.className}`}>Rutina</div>
            </div>
            <div className={`tab ${page === 'Calendar' ? 'active' : 'Desactive'}`} onClick={() => { setPage('Calendar') }}>
                <div className='TabIconConteiner'>
                    <RxCalendar color='#fff' size={24} />
                </div>
                <div className={`TextTab ${lato.className}`}>Calendario</div>

            </div>
            <div className={`tab ${page === 'Text' ? 'active' : 'Desactive'}`} onClick={() => { setPage('Text') }}>
                <div className='TabIconConteiner'>
                    <RxText color='#fff' size={24} />
                </div>
                <div className={`TextTab ${lato.className}`}>Tus textos</div>

            </div>
        </aside>
    )
}
