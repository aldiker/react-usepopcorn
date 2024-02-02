import { useEffect, useState } from 'react'

export default function MovieDetails({ selectedId, onCloseMovie, KEY }) {
    const [movie, setMovie] = useState({})
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
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                )
                const data = await res.json()
                console.log(data)
                setMovie(data)
            }
            if (!selectedId) return
            getMovieDetais()
        },
        [selectedId]
    )

    return (
        <div className='details' onClick={onCloseMovie}>
            <header>
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
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    )
}
