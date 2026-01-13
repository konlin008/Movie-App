import { MovieCard, MovieCardSkeleton } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";

import { useSearch } from "@/queries/movie.queries";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const { data, isPending, isError } = useSearch(query);
    const movies = data?.movies || [];
    const [currentPage, setCurrentPage] = useState(1);
    const Movie_per_page = 10
    const totalPages = Math.ceil(movies.length / Movie_per_page);
    const indexOfLastMovie = currentPage * Movie_per_page;
    const indexOfFirstMovie = indexOfLastMovie - Movie_per_page
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    if (isError) return <h1>Something Went Wrong</h1>
    return (
        <div className="min-h-screen max-w-screen px-4 sm:px-6 md:px-10 lg:px-[20%] py-4 md:py-[5%]">

            <div>
                <h1 className=' text-2xl font-semibold'>Searching For "{query}"</h1>
                <p className="pb-5 sm:pb-10 text-sm text-gray-500">total result: {data?.movies?.length}</p>
                <div className='flex flex-col'>
                    {isPending ? Array.from({ length: Movie_per_page }).map((_, i) =>
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

    );
};

export default SearchPage;
