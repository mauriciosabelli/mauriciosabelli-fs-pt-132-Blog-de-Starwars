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
        <div className="m-2" style={{ width: "180px" }}>
            <Link to={`/${type}/${uid}`} className="text-decoration-none">
                <div className="position-relative">
                    {type === "people" ? (
                        <img
                            src={`https://picsum.photos/seed/people${uid}/180/220`}
                            alt={name}
                            className="d-block object-fit-cover"
                            width="180"
                            height="220"
                        />
                    ) : (
                        <div className="bg-dark d-flex align-items-center justify-content-center" style={{ width: "180px", height: "220px" }}>
                            <span className="text-secondary fs-1">✦</span>
                        </div>
                    )}
                    <div className="position-absolute bottom-0 start-0 end-0 px-2 pt-4 pb-1"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
                        <p className="text-white mb-0 small fw-bold">
                            {name.toUpperCase()}
                        </p>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleFav}
                className={`btn btn-sm w-100 ${isFav ? "btn-danger" : "btn-dark"} text-white border-0`}>
                {isFav ? "★ SAVED" : "☆ ADD TO FAVORITES"}
            </button>
        </div>
    );
};