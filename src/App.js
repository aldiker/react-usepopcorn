import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Main from './components/Main'
import NumResult from './components/NumResult'
import MovieList from './components/MovieList'
import Box from './components/Box'

import WatchedSummary from './components/WatchedSummary'
import WatchedMovieList from './components/WatchedMovieList'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import { useMovies } from './hooks/useMovies'

const KEY = '70af8624'

export default function App() {
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const [watchedUserRating, setWatchedUserRating] = useState(0)

    // const storedWatched = JSON.parse(localStorage.getItem('watched'))
    const [watched, setWatched] = useState(() =>
        JSON.parse(localStorage.getItem('watched'))
    )

    const { movies, isLoading, error } = useMovies(query, KEY, handleCloseMovie)

    // Используем useState для установки начального состояния watched
    // const [watched, setWatched] = useState(() => {
    //     const storedWatched = JSON.parse(localStorage.getItem('watched'))
    //     return storedWatched || [] // Если в localStorage нет значения, возвращаем пустой массив
    // })

    function handleSelectMovie(id) {
        const tempUserRating = watched.find(
            (movie) => movie.imdbID === id
        )?.userRating

        setWatchedUserRating(tempUserRating)
        setSelectedId((selectedId) => (id === selectedId ? null : id))
    }

    function handleCloseMovie() {
        setSelectedId(null)
    }

    function handleAddWatchedMovie(movie) {
        const tempWatched = watched.filter(
            (watchedMovie) => watchedMovie.imdbID !== movie.imdbID
        )

        setWatched([...tempWatched, movie])
        // localStorage.setItem('watched', JSON.stringify([...tempWatched, movie]))
    }

    function handleDeleteWatchedMovie(id) {
        const newWatched = watched.filter((movie) => movie.imdbID !== id)
        setWatched(newWatched)
    }

    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify(watched))
    }, [watched])

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <NumResult movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            KEY={KEY}
                            onAddWatchedMovie={handleAddWatchedMovie}
                            watchedUserRating={watchedUserRating}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteMovie={handleDeleteWatchedMovie}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    )
}
