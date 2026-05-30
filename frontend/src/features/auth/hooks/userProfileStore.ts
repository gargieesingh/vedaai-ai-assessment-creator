import { create } from "zustand";
import { persist } from "zustand/middleware";

export const AVATAR_SEEDS = [
  "Felix", "Aneka", "Chance", "Dusty", "Max", "Zoe", "Luna", "Kai",
] as const;

export type AvatarSeed = (typeof AVATAR_SEEDS)[number];

export const AVATAR_BG_COLORS: Record<AvatarSeed, string> = {
  Felix:  "b6e3f4",
  Aneka:  "ffd5dc",
  Chance: "c0aede",
  Dusty:  "d1d4f9",
  Max:    "b5ead7",
  Zoe:    "ffdac1",
  Luna:   "e2f0cb",
  Kai:    "f9c5d1",
};

export function avatarUrl(seed: AvatarSeed) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${AVATAR_BG_COLORS[seed]}`;
}

interface UserProfileState {
  schoolName: string;
  avatarSeed: AvatarSeed;
  isOnboarded: boolean;
  setSchoolName: (name: string) => void;
  setAvatarSeed: (seed: AvatarSeed) => void;
  completeOnboarding: (schoolName: string, avatarSeed: AvatarSeed) => void;
  resetProfile: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      schoolName: "",
      avatarSeed: "Felix",
      isOnboarded: false,
      setSchoolName: (name) => set({ schoolName: name }),
      setAvatarSeed: (seed) => set({ avatarSeed: seed }),
      completeOnboarding: (schoolName, avatarSeed) =>
        set({ schoolName, avatarSeed, isOnboarded: true }),
      resetProfile: () =>
        set({ schoolName: "", avatarSeed: "Felix", isOnboarded: false }),
    }),
    { name: "veda-user-profile" }
  )
);
