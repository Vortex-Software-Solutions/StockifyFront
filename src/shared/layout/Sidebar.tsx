import {FaChevronRight} from "react-icons/fa";
import {Link} from 'react-router-dom';
import React, {ComponentType, useEffect, useState} from "react";
import Divider from "../components/Divider";

import {HiOutlineHome} from "react-icons/hi";
import {BsBoxSeam} from "react-icons/bs";
import {HiOutlineBuildingOffice2, HiOutlineTruck} from "react-icons/hi2";
import {RiMenuSearchLine} from "react-icons/ri";
import {GoGraph} from "react-icons/go";
import {TbExchange, TbShoppingCartDollar} from "react-icons/tb";
import {FaHandHoldingDollar} from "react-icons/fa6";
import {IoSettingsOutline} from "react-icons/io5";


type MenuItem = {
    name: string;
    link?: string;
    icon: ComponentType<{ size: string }>;
    hasChild: boolean;
    childrens?: SubMenuItem[];
};

type SubMenuItem = {
    name: string;
    link: string;
    icon: ComponentType<{ size: string }>;
};

type SidebarProps = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

type SubmenuProps = {
    menu: MenuItem;
    index: number;
    open: boolean
};

const Sidebar: React.FC<SidebarProps> = ({open, setOpen}) => {

    const menus = [
        {name: 'Dashboard', link: '/', icon: HiOutlineHome, hasChild: false},
        {
            name: "Administración", icon: IoSettingsOutline, hasChild: true, childrens: [
                {name: "Empresas", link: '/companies', icon: HiOutlineBuildingOffice2}
            ]
        },
        {name: 'Productos', link: '/products', icon: BsBoxSeam, hasChild: false},
        {
            name: 'Proveedores', icon: HiOutlineTruck, hasChild: true,
            childrens: [
                {name: 'Listado', link: '/providers', icon: RiMenuSearchLine},
                {name: 'Inversión', link: '/providers/inbounds', icon: GoGraph},
                {name: "Devoluciones", link: '/providers/returns', icon: TbExchange}
            ]
        },
        {
            name: 'Ventas', icon: TbShoppingCartDollar, hasChild: true,
            childrens: [
                {name: 'Listado', link: '/sales', icon: RiMenuSearchLine},
                {name: 'Ganancias', link: '/sales/earnings', icon: FaHandHoldingDollar},
                {name: "Devoluciones", link: '/sales/returns', icon: TbExchange}
            ]
        }
    ];

    // Detectar si la pantalla es pequeña o dispositivo móvil
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // Aquí defines el ancho límite
                setOpen(false); // Cierra la sidebar por defecto
            } else {
                setOpen(true); // Abre la sidebar en pantallas grandes
            }
        };

        // Ejecutar la función al cargar la página
        handleResize();

        // Escuchar cambios en el tamaño de la pantalla
        window.addEventListener('resize', handleResize);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className='fixed md:static flex h-svh z-30 gap-6'>
            <div
                className={`${open ? 'w-60 px-4' : 'w-0'} min-h-screen bg-[#6181F7] transition-all duration-500 text-gray-100 overflow-hidden`}>
                <div className='flex flex-col h-full'>
                    <div className='flex justify-center my-5'>
                        <div className="flex flex-col w-full items-center">
                            <h2 className="text-[1.40rem] text-nowrap font-semibold font-Moul tracking-tighter align-middle mb-5">Stockify.com</h2>
                            <Divider/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 relative py-1'>
                        <ul>
                            {menus.map((menu, i) => (
                                menu.hasChild
                                    ? <Submenu menu={menu} index={i} key={`sm-${i}`} open={open}/>
                                    : <li key={i}>
                                        <Link
                                            key={`link-${i}`}
                                            to={menu.link!}
                                            className='flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#EAEAEA]/15 rounded-md'
                                        >
                                            <div>{React.createElement(menu.icon, {size: '20'})}</div>
                                            <h2 className={`whitespace-nowrap transition-all duration-300`}>{menu.name}</h2>
                                        </Link>
                                    </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Sidebar

const Submenu: React.FC<SubmenuProps> = ({menu, index, open}) => {

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
        <div className='' key={index}>
            <button
                onClick={() => {
                    setSubMenuOpen(!subMenuOpen);
                }}
                className={`flex items-center text-sm ${open ? "gap-3.5" : "gap-3.5"}  font-medium p-2 w-full rounded-md hover:bg-[#EAEAEA]/15`}>
                <div className="flex items-center gap-2">
                    {React.createElement(menu.icon, {size: '20'})}
                    <h2 className={`whitespace-nowrap`}>{menu.name}</h2>
                </div>
                <FaChevronRight
                    className={`${subMenuOpen && 'rotate-90 transition-all'} duration-500`}/>
            </button>
            <div className={`flex-col ml-10 ${!subMenuOpen && 'hidden'} transition-all duration-500`}>
                {menu.childrens?.map((child, j) => (
                    <Link
                        key={j}
                        to={child.link}
                        className='flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#EAEAEA]/15 rounded-md '>
                        <div>{React.createElement(child.icon, {size: '20'})}</div>
                        <h2 className={`whitespace-nowrap transition-all duration-300}`}>{child.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}