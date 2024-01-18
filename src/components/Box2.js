import { useState } from 'react'

export default function Box2({ content }) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className='box'>
            <button
                className='btn-toggle'
                onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? '–' : '+'}
            </button>
            {isOpen && content}
        </div>
    )
}
