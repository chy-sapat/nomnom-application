interface Recipe {
  _id?: string;
  title: string;
  description: string;
  labels: Array<string>;
  ingredients: Array<string>;
  directions: Array<string>;
  author: {
    _id?: string;
    fullname?: string;
    username?: string;
  };
  difficulty: string;
  servings: number;
  cookTime: number;
  averageRating?: number;
  totalRating?: number;
  ratingCount?: number;
  views?: number;
  image: string;
  ratings?: Array<Rating>;
  createdAt?: string;
  updatedAt?: string;
}

interface UserPreference {
  _id: string;
  clerkId: string;
  dietaryPreference: Array<string>;
  allergies: Array<string>;
}

interface RecipeStore {
  allRecipes: Recipe[];
  latestRecipe: Recipe[];
  popularRecipes: Recipe[];
  recommendedRecipes: Recipe[];
  userRecipes: Recipe[];
  topBreakfastRecipes: Recipe[];
  setTopBreakfastRecipes: (recipes: Recipe[]) => void;

  setAllRecipes: (recipes: Recipe[]) => void;
  setLatestRecipe: (recipes: Recipe[]) => void;
  setPopularRecipes: (recipes: Recipe[]) => void;
  setRecommendedRecipes: (recipes: Recipe[]) => void;
  setUserRecipes: (recipes: Recipe[]) => void;

  clearAll: () => void;
}

interface User {
  _id: string;
  clerkId: string;
  fullname: string;
  username: string;
  description: string;
  imageUrl: string;
  bannerImageUrl: string;
  savedRecipe: Array<string>;
  followers: Array<string>;
  following: Array<string>;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserStore {
  userData: User | null;
  userPreference: UserPreference | null;
  setUser: (userData: User | null) => void;
  setUserPreference: (preference: UserPreference | null) => void;
  clearUserAll: () => void;
}

interface Rating {
  userId: string;
  rating: number;
  comments?: string;
}
