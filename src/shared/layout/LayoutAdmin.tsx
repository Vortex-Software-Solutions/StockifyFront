import {useState} from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import {Outlet} from 'react-router-dom';
import Header from './Header';
import {FaBars} from 'react-icons/fa';


const LayoutAdmin = () => {
    const [openNavMenu, setOpenNavMenu] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <main className="flex">
            {/* Seccion Sidebar */}
            <section>
                <Sidebar open={openSidebar} setOpen={setOpenSidebar}/>

                {/* Cortina oscura para móviles */}
                {openSidebar && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                        onClick={() => setOpenSidebar(false)}
                    ></div>
                )}
            </section>

            {/*  Seccion contenido */}
            <section className={`flex flex-col h-svh w-full`}>
                <Header open={openNavMenu} setOpen={setOpenNavMenu}>
                    <button
                        className="w-10 justify-self-start h-10 hover:cursor-pointer"
                        onClick={() => setOpenSidebar(!openSidebar)}
                    >
                        <FaBars className="fa-xl text-gray-800"/>
                    </button>
                </Header>
                <div className="flex-grow bg-[#F1F5F9] p-5">
                    <Outlet/>
                </div>
                <Footer/>
            </section>
        </main>
    );
};

export default LayoutAdmin