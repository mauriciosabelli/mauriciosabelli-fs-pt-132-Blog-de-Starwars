export const initialStore = () => ({
    people: [],
    vehicles: [],
    planets: [],
    favorites: []
});

export default function storeReducer(store, action = {}) {
    switch (action.type) {
        case 'load_people':
            return { ...store, people: action.payload };
        case 'load_vehicles':
            return { ...store, vehicles: action.payload };
        case 'load_planets':
            return { ...store, planets: action.payload };
        case 'toggle_favorite':
            const exists = store.favorites.find(
                f => f.uid === action.payload.uid && f.type === action.payload.type
            );
            return {
                ...store,
                favorites: exists
                    ? store.favorites.filter(f => !(f.uid === action.payload.uid && f.type === action.payload.type))
                    : [...store.favorites, action.payload]
            };
        default:
            throw Error('Unknown action: ' + action.type);
    }
}