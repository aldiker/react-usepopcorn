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

const tempMovieData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt0133093',
        Title: 'The Matrix',
        Year: '1999',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt6751668',
        Title: 'Parasite',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
]

const tempWatchedData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: 'tt0088763',
        Title: 'Back to the Future',
        Year: '1985',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
]

const KEY = '70af8624'

export default function App() {
    const [movies, setMovies] = useState([])
    const [watched, setWatched] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    function handleSelectMovie(id) {
        console.log(id)
        setSelectedId((selectedId) => (id === selectedId ? null : id))
    }

    function handleCloseMovie() {
        setSelectedId(null)
    }

    function handleAddWatchedMovie(movie) {
        setWatched((watched) => [...watched, movie])
    }

    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setIsLoading(true)
                    setError('')

                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                    )
                    const data = await res.json()

                    if (data.Response === 'False')
                        throw new Error('Movie not found')

                    setMovies(data.Search)
                } catch (err) {
                    console.log(err.message)
                    setError(err.message)
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

                    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            KEY={KEY}
                            onAddWatchedMovie={handleAddWatchedMovie}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList watched={watched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    )
}

// const title = prop.movie.Title
// const [userRating, setUserRating] = useState('')

// useEffect(
//     function () {
//         if (!title) return
//         document.title = `${title} ${userRating && `(Rated ${userRating} ⭐)`}`
//         return () => (document.title = 'usePopcorn')
//     },
//     [title, userRating]
// )
