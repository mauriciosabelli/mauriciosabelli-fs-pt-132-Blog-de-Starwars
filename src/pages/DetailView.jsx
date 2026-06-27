import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const DetailView = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [detail, setDetail] = useState(null);

    const isFav = store.favorites.some(f => f.uid === id && f.type === type);

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then(r => r.json())
            .then(data => setDetail(data.result?.properties || null))
            .catch(err => console.log(err));
    }, [type, id]);

    if (!detail) return (
        <div style={{ background: "#0d0d0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#fff" }}>Loading...</p>
        </div>
    );

    const entries = Object.entries(detail).filter(([k]) => !["url", "created", "edited"].includes(k));

    return (
        <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#fff" }}>
            {/* Hero */}
            <div style={{ display: "flex", maxHeight: "340px", overflow: "hidden" }}>
                {type === "people" ? (
                    <img
                        src={`https://picsum.photos/seed/people${id}/420/340`}
                        alt={detail.name}
                        style={{ width: "420px", minWidth: "420px", objectFit: "cover", objectPosition: "top" }}
                    />
                ) : (
                    <div style={{ width: "420px", minWidth: "420px", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#444", fontSize: "80px" }}>✦</span>
                    </div>
                )}
                <div style={{ padding: "40px", flex: 1 }}>
                    <h1 style={{ letterSpacing: "3px", fontSize: "28px", marginBottom: "16px" }}>
                        {detail.name?.toUpperCase()}
                    </h1>
                    <p style={{ color: "#aaa", lineHeight: "1.7" }}>
                        Explore the details of this {type === "people" ? "character" : type.slice(0, -1)} from the Star Wars universe.
                    </p>
                    <div className="d-flex gap-2 mt-3">
                        <button
                            onClick={() => dispatch({ type: "toggle_favorite", payload: { uid: id, name: detail.name, type } })}
                            style={{ background: isFav ? "#c00" : "transparent", border: "1px solid #c00", color: "#fff", padding: "6px 16px", cursor: "pointer" }}>
                            {isFav ? "★ SAVED" : "☆ ADD TO FAVORITES"}
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            style={{ background: "transparent", border: "1px solid #555", color: "#aaa", padding: "6px 16px", cursor: "pointer" }}>
                            ← BACK
                        </button>
                    </div>
                </div>
            </div>

            {/* Attributes */}
            <div style={{ padding: "32px", borderTop: "1px solid #222", display: "flex", flexWrap: "wrap", gap: "32px" }}>
                {entries.map(([key, value]) => (
                    <div key={key} style={{ minWidth: "120px" }}>
                        <p style={{ color: "#c00", fontSize: "11px", letterSpacing: "2px", marginBottom: "4px" }}>
                            {key.replace(/_/g, " ").toUpperCase()}
                        </p>
                        <p style={{ color: "#fff", fontSize: "13px" }}>{String(value) || "n/a"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};