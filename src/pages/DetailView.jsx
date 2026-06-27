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
        <div className="bg-black min-vh-100 d-flex align-items-center justify-content-center">
            <p className="text-white">Loading...</p>
        </div>
    );

    const entries = Object.entries(detail).filter(([k]) => !["url", "created", "edited"].includes(k));

    return (
        <div className="bg-black min-vh-100 text-white">
            {/* Hero */}
            <div className="d-flex overflow-hidden" style={{maxHeight: "340px"}}>
                {type === "people" ? (
                    <img
                        src={`https://picsum.photos/seed/people${id}/420/340`}
                        alt={detail.name}
                        className="object-fit-cover"
                        width="420"
                    />
                ) : (
                    <div className="bg-dark d-flex align-items-center justify-content-center" style={{width: "420px", minWidth: "420px"}}>
                        <span className="text-secondary display-1">✦</span>
                    </div>
                )}
                <div className="p-5 flex-grow-1">
                    <h1 className="fs-2 mb-3 fw-bold">
                        {detail.name?.toUpperCase()}
                    </h1>
                    <p className="text-secondary lh-lg">
                        Explore the details of this {type === "people" ? "character" : type.slice(0, -1)} from the Star Wars universe.
                    </p>
                    <div className="d-flex gap-2 mt-3">
                        <button
                            onClick={() => dispatch({ type: "toggle_favorite", payload: { uid: id, name: detail.name, type } })}
                            className={`btn px-3 py-1 ${isFav ? "btn-danger" : "btn-outline-danger"}`}>
                            {isFav ? "★ SAVED" : "☆ ADD TO FAVORITES"}
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline-secondary px-3 py-1">
                            ← BACK
                        </button>
                    </div>
                </div>
            </div>

            {/* Attributes */}
            <div className="p-4 border-top border-secondary d-flex flex-wrap gap-4">
                {entries.map(([key, value]) => (
                    <div key={key}>
                        <p className="text-danger small fw-bold mb-1">
                            {key.replace(/_/g, " ").toUpperCase()}
                        </p>
                        <p className="text-white small">{String(value) || "n/a"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};