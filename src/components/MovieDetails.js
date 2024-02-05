import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

export default function MovieDetails({
    selectedId,
    onCloseMovie,
    KEY,
    onAddWatchedMovie,
    tempUserRating,
}) {
    //console.log(`tempUserRating = ${tempUserRating}`)

    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [userRating, setUserRating] = useState('')

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie

    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            runtime: Number(runtime.split(' ').at(0)),
            imdbRating: Number(imdbRating),
            userRating,
        }
        onAddWatchedMovie(newMovie)
        onCloseMovie()
    }

    useEffect(
        function () {
            async function getMovieDetais() {
                try {
                    setIsLoading(true)
                    setError('')

                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                    )
                    const data = await res.json()
                    setMovie(data)
                } catch (err) {
                    console.log(err.message)
                    setError(err.message)
                } finally {
                    setIsLoading(false)
                }
            }
            if (!selectedId) return
            getMovieDetais()
        },
        [selectedId]
    )

    return (
        <div className='details'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className='btn-back' onClick={onCloseMovie}>
                            ⇦
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span> {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className='rating'>
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                                defaultRating={tempUserRating}
                            />
                            {userRating && (
                                <button className='btn-add' onClick={handleAdd}>
                                    + Add movie to list
                                </button>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
            {error && <ErrorMessage message={error} />}
        </div>
    )
}
