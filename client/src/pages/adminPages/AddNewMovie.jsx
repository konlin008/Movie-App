import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useAddMovie } from "@/queries/movie.queries";
import { useFormik } from "formik";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const AddNewMovie = () => {
    const { mutate, isSuccess, data, isPending, error } = useAddMovie();

    const formik = useFormik({
        initialValues: {
            title: "",
            imdbId: "",
            year: "",
            duration: "",
            rating: "",
            description: "",
            imageUrl: "",
        },

        onSubmit: (values) => {
            if (!values.title || !values.imdbId) {
                toast("Title or ImdbId Required")
                return
            }
            const payload = {
                title: values.title,
                imdbId: values.imdbId,
                year: Number(values.year),
                duration: Number(values.duration),
                rating: Number(values.rating),
                description: values.description,
                poster: values.imageUrl,
            };
            console.log(payload);
            mutate(payload);
        },
    });
    useEffect(() => {
        if (isSuccess) toast.success(data.message || 'New Movie Added ')
    }, [isSuccess])
    useEffect(() => {
        if (error) toast.error(data.message || 'Faild to Add New Movie')
    }, [error])
    return (
        <div className="min-h-screen sm:max-h-screen flex items-start justify-center px-4 py-10">
            <Card className="w-full max-w-md rounded-sm shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Add New Movie</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label>Movie Title</Label>
                            <Input
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                placeholder="Enter movie title"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Movie ImdbId</Label>
                            <Input
                                name="imdbId"
                                value={formik.values.imdbId}
                                onChange={formik.handleChange}
                                placeholder="tt1234567"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Movie Year</Label>
                            <Input
                                name="year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                placeholder="e.g. 2024"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Movie Duration</Label>
                            <Input
                                name="duration"
                                type="number"
                                value={formik.values.duration}
                                onChange={formik.handleChange}
                                placeholder="(minutes)"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Movie Rating (0-10)</Label>
                            <Input
                                name="rating"
                                type="number"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                placeholder="0 - 10"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Movie Image URL</Label>
                            <Input
                                name="imageUrl"
                                value={formik.values.imageUrl}
                                onChange={formik.handleChange}
                                placeholder="https://image-url"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label>Movie Description</Label>

                            <InputGroup>
                                <InputGroupTextarea
                                    name="description"
                                    placeholder="Enter movie description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    maxLength={120}
                                />

                                <InputGroupAddon align="block-end">
                                    <InputGroupText className="text-muted-foreground text-xs">
                                        {120 - formik.values.description.length} characters left
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>

                        <Button type="submit" className="w-full mt-2" disabled={isPending}>
                            {
                                isPending ? <Loader className="animate-spin" /> : 'Submit Movie'
                            }

                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddNewMovie;
