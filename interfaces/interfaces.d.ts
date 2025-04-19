interface Recipe {
    _id: string,
    title: string,
    description: string,
    labels: Array<string>
    ingredients: Array<string>
    directions: Array<string>
    author: string
    difficulty: string
    servings: number
    cookTime: number
    averageRating: number
    totalRating: number
    ratingCount: number
    views: number
    image: string
    ratings: Array<string>
    createdAt: string
    updatedAt: string 
}

interface RecipeCard {
    _id: string
    title: string,
    author: string,
    image: string,
    avgRating: number
}