import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Pencil, Star, Trash2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useDeleteMovie, useUpdateMovie } from "@/queries/movie.queries";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAuth } from "@/context/AuthContext";

export function MovieCard({ movie }) {
    const { isAdmin } = useAuth();

    const {
        mutate: deleteMovie,
        isSuccess: isDeleted,
        isLoading: deletePending,
        error: deleteError,
    } = useDeleteMovie();
    const {
        mutate: updateMovie,
        isPending: updatePending,
        isSuccess: isUpdated,
        error: updateError
    } = useUpdateMovie();

    useEffect(() => {
        if (isDeleted) toast.success("Movie Deleted Successfully");
    }, [isDeleted]);
    useEffect(() => {
        if (deleteError)
            toast.error(deleteError.response.data.message || "Movie Not Deleted");
    }, [deleteError]);
    useEffect(() => {
        if (updateError)
            toast.error(updateError.response.data.message || "Movie Not Deleted");
    }, [updateError]);
    useEffect(() => {
        if (isUpdated) toast.success("Movie Updated Successfully");
    }, [isUpdated]);

    const [formData, setFormData] = useState({
        title: movie.title || "",
        year: movie.year || "",
        duration: movie.duration || "",
        rating: movie.rating || "",
        description: movie.description || "",
    });

    const handelDelete = async () => {
        deleteMovie(movie._id);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handelUpdate = () => {
        updateMovie({ id: movie._id, data: formData });
    };
    if (deletePending || updatePending) return <MovieCardSkeleton />;

    return (
        <Card className="rounded-sm p-0 mb-3">
            <div className="flex flex-row sm:gap-2 pr-2">
                <CardContent className="p-0 max-w-[40%] sm:w-fit ">
                    <img
                        src={movie.poster}
                        alt={`${movie.title} poster`}
                        className=" h-full w-40  object-cover"
                    />
                </CardContent>
                <CardHeader className=" w-[50%] sm:w-[90%]  px-3 py-2">
                    <div className="flex flex-col gap-4 sm:gap-2">
                        <CardTitle className="text-base sm:text-lg font-semibold">
                            {movie.title}
                        </CardTitle>

                        <CardDescription className="text-sm">
                            {movie.year} • {movie.duration} min
                        </CardDescription>

                        <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{movie.rating}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3 sm:line-clamp-none">
                            {movie.description}
                        </p>
                    </div>
                </CardHeader>
                {isAdmin && (
                    <CardFooter
                        className={
                            "flex flex-col gap-4 justify-center w-[12%] p-0 items-center sm:items-end"
                        }
                    >
                        <AlertDialog>
                            <AlertDialogTrigger
                                className={"border border-gray-200 p-1.5 rounded-sm"}
                            >
                                {" "}
                                <Trash2 />{" "}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete{" "}
                                        {movie.title}.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handelDelete}>
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger
                                className={"border border-gray-200 p-1.5 rounded-sm"}
                            >
                                {" "}
                                <Pencil />{" "}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription></AlertDialogDescription>
                                </AlertDialogHeader>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Movie title"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="year">Release Year</Label>
                                        <Input
                                            id="year"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            placeholder="2024"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="duration">Duration (mins)</Label>
                                        <Input
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            placeholder="120"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Input
                                            id="rating"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            placeholder="8.5"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Short description"
                                            className={"h-10"}
                                        />
                                    </div>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handelUpdate}>
                                        Update
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                )}
            </div>
        </Card>
    );
}

export function MovieCardSkeleton() {
    return (
        <Card className="rounded-sm p-0 mb-3">
            <div className="flex flex-row sm:gap-2">
                <CardContent className="p-0 w-[40%] sm:w-fit">
                    <Skeleton className="w-full h-48 sm:w-28 sm:h-36 rounded-none bg-gray-300" />
                </CardContent>
                <CardHeader className="w-full px-3 py-2">
                    <div className="flex flex-col gap-4 sm:gap-2">
                        <Skeleton className="h-5 w-[80%] bg-gray-300" />
                        <Skeleton className="h-4 w-[40%] bg-gray-300" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-sm bg-gray-300" />
                            <Skeleton className="h-4 w-8 bg-gray-300" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-gray-300" />
                            <Skeleton className="h-4 w-[90%] bg-gray-300" />
                            <Skeleton className="h-4 w-[70%] sm:hidden bg-gray-300" />
                        </div>
                    </div>
                </CardHeader>
            </div>
        </Card>
    );
}
