import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const [open, setOpen] = useState(false);

    return (
        <nav style={{ background: "#000", borderBottom: "1px solid #222", padding: "12px 24px" }}
            className="d-flex justify-content-between align-items-center">
            <Link to="/" className="text-decoration-none">
                <span style={{ color: "#fff", fontWeight: "bold", fontSize: "20px", letterSpacing: "2px" }}>
                    STAR WARS
                </span>
            </Link>
            <div className="position-relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="btn btn-outline-light btn-sm"
                >
                    Favorites <span className="badge bg-danger ms-1">{store.favorites.length}</span>
                </button>
                {open && (
                    <div style={{
                        position: "absolute", right: 0, top: "110%", background: "#111",
                        border: "1px solid #333", borderRadius: "4px", minWidth: "220px", zIndex: 999
                    }}>
                        {store.favorites.length === 0 ? (
                            <p className="text-muted p-3 mb-0">No favorites yet.</p>
                        ) : (
                            store.favorites.map((fav, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center px-3 py-2"
                                    style={{ borderBottom: "1px solid #222" }}>
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