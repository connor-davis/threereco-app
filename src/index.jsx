import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router } from 'solid-app-router';

let Routed = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

render(Routed, document.getElementById('root'));
