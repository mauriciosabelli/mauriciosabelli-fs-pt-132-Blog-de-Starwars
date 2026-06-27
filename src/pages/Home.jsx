import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

const CATEGORIES = ["people", "vehicles", "planets"];
const LABELS = { people: "CHARACTERS", vehicles: "VEHICLES", planets: "PLANETS" };

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [active, setActive] = useState("people");

    useEffect(() => {
        const load = (type, action) => {
            fetch(`https://www.swapi.tech/api/${type}/?page=1&limit=20`)
                .then(r => r.json())
                .then(data => dispatch({ type: action, payload: data.results || [] }))
                .catch(err => console.log(err));
        };
        if (!store.people.length) load("people", "load_people");
        if (!store.vehicles.length) load("vehicles", "load_vehicles");
        if (!store.planets.length) load("planets", "load_planets");
    }, []);

    const items = store[active] || [];

    return (
        <div className="bg-black min-vh-100 d-flex">
            {/* Sidebar */}
            <div className="bg-black border-end border-secondary py-4" style={{ width: "160px", minWidth: "160px" }}>
                                <p className="text-secondary small px-3 py-1 mb-0" style={{ cursor: "pointer" }}>ALL</p>
                {CATEGORIES.map(cat => (
                    <p
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`small px-3 py-1 mb-0 fw-${active === cat ? "bold" : "normal"} ${active === cat ? "text-white border-start border-danger border-3" : "text-secondary"}`}
                        style={{ cursor: "pointer" }}
                    >
                        {LABELS[cat]}
                    </p>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-grow-1 p-4">
                <h2 className="text-white small fw-bold mb-4">
                    BROWSE DATABANK // {LABELS[active]}
                </h2>
                {items.length === 0 ? (
                    <p className="text-secondary">Loading...</p>
                ) : (
                    <div className="d-flex flex-wrap">
                        {items.map(item => (
                            <Card key={item.uid} uid={item.uid} name={item.name} type={active} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};