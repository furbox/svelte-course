import { readable } from "svelte/store";

let watchId;
const location = readable(null, (set) => {
    if (navigator.geolocation && navigator.geolocation.watchPosition) {
        watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            set({ latitude, longitude });
        }, (error) => {
            set({ error });
        })
    }
    return () => {
        if (navigator.geolocation && navigator.geolocation.clearWatch) {
            navigator.geolocation.clearWatch(watchId);
        }
        set(null);
    }
})

export default location;