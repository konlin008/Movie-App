import NavBar from '@/components/NavBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default MainLayout