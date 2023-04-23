import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import About from './routes/about'
import { PokemonDetails } from './components/PokemonDetails';
import { RouterProvider, createHashRouter} from 'react-router-dom';


const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/pokemon/:pokemonName",
                element: <PokemonDetails />
            }
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

