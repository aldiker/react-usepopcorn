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

const KEY = '70af8624'

export default function App() {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const [watchedUserRating, setWatchedUserRating] = useState(0)

    // const storedWatched = JSON.parse(localStorage.getItem('watched'))
    const [watched, setWatched] = useState(() =>
        JSON.parse(localStorage.getItem('watched'))
    )

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

    useEffect(
        function () {
            const controller = new AbortController()

            async function fetchMovies() {
                try {
                    setIsLoading(true)
                    setError('')

                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    )
                    if (!res.ok)
                        throw new Error(
                            'Something went wrong with fetching mavies'
                        )

                    const data = await res.json()
                    if (data.Response === 'False')
                        throw new Error('Movie not found')

                    setMovies(data.Search)
                } catch (err) {
                    // console.error(err.message)
                    if (err.name !== 'AbortError') {
                        setError(err.message)
                    }
                } finally {
                    setIsLoading(false)
                }
            }

            if (query.length < 3) {
                setError('')
                setMovies([])
                return
            }

            fetchMovies()

            return function () {
                controller.abort()
            }
        },
        [query]
    )

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
