import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StarRating from './components/StarRating'

// import App from './App'
// import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        {/* <App /> */}
        <StarRating maxRating={10} />
        <StarRating />
    </StrictMode>
)
