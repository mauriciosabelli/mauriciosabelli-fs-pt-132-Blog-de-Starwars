import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ uid, name, type }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFav = store.favorites.some(f => f.uid === uid && f.type === type);

    const handleFav = (e) => {
        e.preventDefault();
        dispatch({ type: "toggle_favorite", payload: { uid, name, type } });
    };

    return (
        <div style={{ width: "180px", margin: "8px" }}>
            <Link to={`/${type}/${uid}`} className="text-decoration-none">
                <div style={{ position: "relative" }}>
                    {type === "people" ? (
                        <img
                            src={`https://picsum.photos/seed/people${uid}/180/220`}
                            alt={name}
                            style={{ width: "180px", height: "220px", objectFit: "cover", display: "block" }}
                        />
                    ) : (
                        <div style={{
                            width: "180px", height: "220px", background: "#1a1a1a",
                            display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                            <span style={{ color: "#444", fontSize: "40px" }}>✦</span>
                        </div>
                    )}
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                        padding: "20px 8px 8px"
                    }}>
                        <p style={{ color: "#fff", margin: 0, fontSize: "12px", fontWeight: "bold", letterSpacing: "1px" }}>
                            {name.toUpperCase()}
                        </p>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleFav}
                style={{
                    width: "100%", background: isFav ? "#c00" : "#111",
                    border: "none", color: "#fff", fontSize: "11px",
                    padding: "4px", letterSpacing: "1px", cursor: "pointer"
                }}>
                {isFav ? "★ SAVED" : "☆ ADD TO FAVORITES"}
            </button>
        </div>
    );
};