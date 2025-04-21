import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: null,
      setUser: (userData) => set({ userData: userData }),
      clearUser: () => set({ userData: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useRecipeStore = create<RecipeStore>((set) => ({
  allRecipes: [],
  latestRecipe: [],
  popularRecipes: [],
  recommendedRecipes: [],

  setAllRecipes: (recipes) => set({ allRecipes: recipes }),
  setLatestRecipe: (recipes) => set({ latestRecipe: recipes }),
  setPopularRecipes: (recipes) => set({ popularRecipes: recipes }),
  setRecommendedRecipes: (recipes) => set({ recommendedRecipes: recipes }),

  clearAll: () =>
    set({
      allRecipes: [],
      latestRecipe: [],
      popularRecipes: [],
      recommendedRecipes: [],
    }),
}));
