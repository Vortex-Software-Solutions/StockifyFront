import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import React, { ComponentType, ReactNode, useState } from "react";
import Divider from "../components/Divider";

import { HiOutlineHome } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineTruck } from "react-icons/hi2";
import { RiMenuSearchLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { TbExchange, TbShoppingCartDollar } from "react-icons/tb";
import { FaHandHoldingDollar } from "react-icons/fa6";


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
    children?: ReactNode;
};

type SubmenuProps = {
    menu: MenuItem;
    index: number;
};

const Sidebar: React.FC<SidebarProps> = () => {

    const [open] = useState(true)
    
    const menus  = [
        { name: 'Dashboard', link: '/', icon: HiOutlineHome, hasChild: false },
        { name: 'Productos', link: '/inventory', icon: BsBoxSeam, hasChild: false },
        {
            name: 'Proveedores', icon: HiOutlineTruck, hasChild: true,
            childrens: [
                { name: 'Listado', link: '/providers', icon: RiMenuSearchLine },
                { name: 'Inversión', link: '/investment', icon: GoGraph },
                { name: "Devoluciones", link: '/returns', icon: TbExchange }
            ]
        },
        {
            name: 'Ventas', icon: TbShoppingCartDollar, hasChild: true,
            childrens: [
                { name: 'Listado', link: '/sales', icon: RiMenuSearchLine },
                { name: 'Ganancias', link: '/investment', icon: FaHandHoldingDollar },
                { name: "Devoluciones", link: '/refunds', icon: TbExchange }
            ]
        }
    ];

    return (
        <section className='flex h-screen z-30 fixed gap-6'>
            {/* bg-[#0e0e0e] */}
            <div className={`${open ? ' w-60' : 'w-16'} min-h-screen bg-[#6181F7] transition duration-500 text-gray-100 px-4 `}>
                <div className='flex flex-col justify-between h-full'>
                    <div className=''>
                        <div className='flex justify-center my-5'>
                            {/* <img src={logo2} className='' /> */}
                            <h2 className="text-[1.40rem] text-nowrap font-semibold font-Moul tracking-tighter align-middle">Stockify.com</h2>
                        </div>
                        <Divider />
                        <div className='mt-4 flex flex-col gap-4 relative py-1'>
                            <ul>
                                {menus.map((menu, i) => (
                                    menu.hasChild
                                        ? <Submenu menu={menu} index={i} key={`sm-${i}`} />
                                        : <li key={i}>
                                            <Link
                                                key={`link-${i}`}
                                                to={menu.link!}
                                                className='flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#EAEAEA]/15 rounded-md'
                                            >
                                                <div>{React.createElement(menu.icon, { size: '20' })}</div>
                                                <h2
                                                    style={{
                                                        transitionDelay: `${i + 3}00ms`
                                                    }}
                                                    className={''}
                                                >{menu.name}</h2>
                                            </Link>
                                        </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Sidebar

const Submenu: React.FC<SubmenuProps> = ({ menu, index }) => {

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
        <div className='' key={index}>
            <button
                onClick={() => { setSubMenuOpen(!subMenuOpen); }}
                className='flex items-center text-sm gap-3.5 font-medium p-2 w-full rounded-md hover:bg-[#EAEAEA]/15'>
                <div>{React.createElement(menu.icon, { size: '20' })}</div>
                <h2 className={``}>{menu.name}</h2>
                <FaChevronRight className={`${subMenuOpen && 'rotate-90 transition-all'} duration-500 h-4 w-4 absolute right-1`} />
            </button>
            <div className={`flex-col ml-10 ${!subMenuOpen && 'hidden'} transition-all duration-500`}>
                {menu.childrens?.map((child, j) => (
                    <Link
                        key={j}
                        to={child.link}
                        className='flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-[#EAEAEA]/15 rounded-md '>
                        <div>{React.createElement(child.icon, { size: '20' })}</div>
                        <h2>{child.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    )
}