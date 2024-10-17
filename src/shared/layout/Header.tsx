import React from 'react'
import yo from "@assets/img/user.png"
import {FaChevronDown, FaSignOutAlt} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {logout, selectUserData} from 'src/core/slices/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import {serverApi} from 'src/core/serverApi'

interface HeaderProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({open, setOpen, children}) => {
    const userData = useSelector(selectUserData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        dispatch(serverApi.util.resetApiState())
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div
            className={'flex bg-white items-center h-16 shadow-md p-8 border-b border-gray-200 justify-between'}>

            {children}

            <div className='flex items-center cursor-pointer'
                 onClick={() => setOpen(!open)}
            >
                <img src={yo} className='rounded-full border border-gray-200 h-10 w-10'/>
                <div className='flex-col ml-2'>
                    <h2 className='borde text-sm text-gray-500 font-semibold'>{`${userData?.name || ""} ${userData?.firstLastName ?? ""}`}</h2>
                    {userData?.isOwner &&
                        <h2 className='borde text-xs text-white font-normal bg-[#6181F7] rounded-full text-center px-2 py-[1px]'>Propietario</h2>}

                </div>
                <FaChevronDown className={`ml-2.5`}/>
                {open && (
                    <div
                        className={`duration-700 z-50 border shadow-sm border-gray-200 absolute bg-white w-40 p-3 rounded-md text-gray-500 mt-36`}>
                        <button
                            type='button'
                            onClick={handleLogout}
                            className='flex justify-left items-center gap-4 h-full w-full'
                        >
                            <FaSignOutAlt className=''/>
                            Salir
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Header