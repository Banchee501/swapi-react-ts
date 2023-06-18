import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader: React.FC = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>StarWars</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? { color: '#FFE300' } : { color: 'white' }
                            }
                            to="/"
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? { color: '#FFE300' } : { color: 'white' }
                            }
                            to="/films"
                        >
                            Films
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={({ isActive }) =>
                                isActive ? { color: '#FFE300' } : { color: 'white' }
                            }
                            to="/planets"
                        >
                            Planets
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;
