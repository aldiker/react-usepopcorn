import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import StarRating from './components/StarRating'

import App from './App'
import './index.css'

// function Test() {
//     const [movieRating, setMovieRating] = useState(0)

//     return (
//         <div>
//             <StarRating
//                 color='blue'
//                 maxRating={10}
//                 onSetRating={setMovieRating}
//             />
//             <p>This movie was rated {movieRating} stars</p>
//         </div>
//     )
// }

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <App />
        {/* <StarRating maxRating={7} /> */}
        {/* <StarRating size={24} color={'red'} />
        <StarRating
            maxRating={5}
            messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing!']}
        />

        <StarRating defaultRating={'test'} />
        <Test /> */}
    </StrictMode>
)
