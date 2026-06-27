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
        <div style={{ background: "#0d0d0d", minHeight: "100vh", display: "flex" }}>
            {/* Sidebar */}
            <div style={{ width: "160px", minWidth: "160px", background: "#000", padding: "24px 0", borderRight: "1px solid #222" }}>
                <p style={{ color: "#666", fontSize: "11px", letterSpacing: "2px", padding: "0 16px 8px" }}>BROWSE</p>
                <p style={{ color: "#999", fontSize: "11px", padding: "4px 16px", cursor: "pointer" }}>ALL</p>
                {CATEGORIES.map(cat => (
                    <p key={cat}
                        onClick={() => setActive(cat)}
                        style={{
                            color: active === cat ? "#fff" : "#999",
                            fontSize: "12px", padding: "6px 16px",
                            borderLeft: active === cat ? "3px solid #c00" : "3px solid transparent",
                            cursor: "pointer", margin: 0, letterSpacing: "1px", fontWeight: active === cat ? "bold" : "normal"
                        }}>
                        {LABELS[cat]}
                    </p>
                ))}
            </div>

            {/* Grid */}
            <div style={{ flex: 1, padding: "24px" }}>
                <h2 style={{ color: "#fff", letterSpacing: "3px", fontSize: "14px", marginBottom: "20px" }}>
                    BROWSE DATABANK // {LABELS[active]}
                </h2>
                {items.length === 0 ? (
                    <p style={{ color: "#666" }}>Loading...</p>
                ) : (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {items.map(item => (
                            <Card key={item.uid} uid={item.uid} name={item.name} type={active} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};