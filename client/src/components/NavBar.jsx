import React, { useState } from 'react'
import { Search } from "lucide-react";
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const NavBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleSearch = () => {
        if (!query.trim()) return;
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    return (
        <nav className="w-full bg-white shadow-sm  px-2 sm:px-6 py-3 flex items-center justify-between">
            <div className="text-md sm:text-xl font-bold text-gray-800 cursor-pointer   " onClick={() => navigate('/home')}>
                Movie App
            </div>
            <div className=" w-2/4 flex items-center sm:w-1/3 bg-gray-200 rounded-full p-2 sm:px-4 sm:py-2">
                <Search className="hidden text-gray-400 sm:w-4 sm:h-4 sm:mr-2 sm:flex" />
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none w-full text-sm text-gray-700"
                />

                <button onClick={handleSearch}>
                    <Search className="w-4 h-4 text-gray-600" />
                </button>

            </div>
            <div className="flex items-center gap-3">
                <Button
                    onClick={async () => {
                        await logout();
                        navigate("/");
                    }}
                >
                    Logout
                </Button>
            </div>
        </nav>
    );

}

export default NavBar