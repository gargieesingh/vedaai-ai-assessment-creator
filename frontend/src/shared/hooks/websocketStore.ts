import { create } from "zustand";

interface WebsocketStore {
  isConnected: boolean;
  setConnected: (connected: boolean) => void;
}

export const useWebsocketStore = create<WebsocketStore>((set) => ({
  isConnected: false,
  setConnected: (connected) => set({ isConnected: connected }),
}));
