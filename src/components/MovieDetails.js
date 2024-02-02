import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'

export default function MovieDetails({ selectedId, onCloseMovie, KEY }) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

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
                    console.log(data)
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
                            <StarRating maxRating={10} size={24} />
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
