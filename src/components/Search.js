import { useEffect, useRef, useState } from 'react'

export default function Search({ query, setQuery }) {
    const inputEl = useRef(null)

    useEffect(() => {
        function callback(event) {
            if (document.activeElement === inputEl.current) return

            if (event.key === 'Enter') {
                inputEl.current.focus()
                setQuery('')
            }
        }
        document.addEventListener('keydown', callback)
    }, [])

    return (
        <input
            className='search'
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    )
}
