import { MovieCard, MovieCardSkeleton } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { useAllMovies, useSort } from '@/queries/movie.queries';
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
    const { isAdmin } = useAuth();
    const handleSortChange = (value) => {
        const [by, order] = value.split("_");
        setSortBy(by);
        setOrder(order);
    };
    const [sortBy, setSortBy] = useState("");
    const [order, setOrder] = useState("asc");
    const nav = useNavigate()
    const { data, isPending, error } = useAllMovies()
    const { data: sortedMoviesData, isLoading } = useSort(sortBy, order);
    const sortedMovies = sortedMoviesData?.movies

    const movies = sortBy ? sortedMovies : data?.movies;
    const [currentPage, setCurrentPage] = useState(1);
    const Movie_per_page = 10
    const totalPages = Math.ceil(movies?.length / Movie_per_page);
    const indexOfLastMovie = currentPage * Movie_per_page;
    const indexOfFirstMovie = indexOfLastMovie - Movie_per_page
    const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

    if (error) return <div className='min-h-screen max-w-screen px-4 sm:px-6 md:px-10 lg:px-[20%] py-4 md:py-[5%] '>
        <h1>{error.response.data.message}</h1>
    </div>

    return (
        <div className='min-h-screen max-w-screen px-4 sm:px-6 md:px-10 lg:px-[20%] py-4 md:py-[5%] '>
            <div className="flex flex-col gap-10">
                <div className="flex items-center gap-2 sm:justify-center">
                    <p className="text-xs sm:text-sm font-medium">Sort by:</p>

                    <Select onValueChange={handleSortChange}>
                        <SelectTrigger className="h-7 w-23 text-xs sm:h-8 sm:w-30 sm:text-sm">
                            <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="rating_asc">Low to High</SelectItem>
                            <SelectItem value="rating_desc">High → Low</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={handleSortChange}>
                        <SelectTrigger className="h-7 w-24 text-xs sm:h-8 sm:w-28 sm:text-sm">
                            <SelectValue placeholder="Release" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="year_asc">Oldest</SelectItem>
                            <SelectItem value="year_desc">Newest</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={handleSortChange}>
                        <SelectTrigger className="h-7 w-24 text-xs sm:h-8 sm:w-35 sm:text-sm">
                            <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="duration_asc">Short → Long</SelectItem>
                            <SelectItem value="duration_desc">Long → Short</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <div className='flex justify-between items-center pb-10'>
                        <h1 className='text-xl sm:text-2xl font-semibold'>All Movies</h1>
                        {(isAdmin) && <Button className={'px-1.5 sm:px-2 sm:py-1 text-xs sm:text-sm'} onClick={() => nav('/admin/add-new-movie')}>Add New Movie</Button>}
                    </div>
                    <div className='flex flex-col'>
                        {(isPending || isLoading) ? Array.from({ length: Movie_per_page }).map((_, i) =>
                            (<MovieCardSkeleton key={i} />))
                            :
                            currentMovies.map(movie => (
                                <MovieCard key={movie._id} movie={movie} />
                            ))
                        }

                    </div>
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            Prev
                        </Button>

                        <span className="text-sm font-medium">
                            Page {currentPage} of {totalPages}
                        </span>

                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            Next
                        </Button>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default HomePage