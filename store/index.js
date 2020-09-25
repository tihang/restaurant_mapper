import create from "zustand";

const useStore = create((set) => ({
  latitude: 40.758896,
  longitude: -73.98513,
  setLatitude: (lat) => set((state) => ({ latitude: lat })),
  setLongitude: (long) => set((state) => ({ longitude: long })),
}));

export default useStore;
