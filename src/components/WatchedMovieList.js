import WatchedMovie from './WatchedMovie'

export default function WatchedMovieList({ watched, onDeleteMovie }) {
    return (
        <ul className='list'>
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteMovie={onDeleteMovie}
                />
            ))}
        </ul>
    )
}
