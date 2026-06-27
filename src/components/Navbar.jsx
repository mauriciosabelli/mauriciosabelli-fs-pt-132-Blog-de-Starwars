import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-black border-bottom border-secondary d-flex justify-content-between align-items-center px-4 py-2">
            <Link to="/" className="text-decoration-none">
                <span className="text-white fw-bold fs-5">
                    STAR WARS
                </span>
            </Link>
            <div className="dropdown">
                <button
                    onClick={() => setOpen(!open)}
                    className="btn btn-outline-light btn-sm"
                >
                    Favorites <span className="badge bg-danger ms-1">{store.favorites.length}</span>
                </button>
                {open && (
                    <div className="dropdown-menu dropdown-menu-end show bg-dark border border-secondary" style={{ minWidth: "220px", zIndex: 999 }}>
                        {store.favorites.length === 0 ? (
                            <p className="text-muted px-3 py-2 mb-0">No favorites yet.</p>
                        ) : (
                            store.favorites.map((fav, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom border-secondary">
                                    <Link to={`/${fav.type}/${fav.uid}`}
                                        className="text-decoration-none text-white"
                                        onClick={() => setOpen(false)}>
                                        {fav.name}
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger ms-2"
                                        onClick={() => dispatch({ type: "toggle_favorite", payload: fav })}>
                                        🗑
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};