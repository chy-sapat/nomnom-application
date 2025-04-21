export const recipes : Array<Partial<Recipe>> = [
  {
    _id: "1",
    title: "Spaghetti Carbonara",
    author: { fullname: "ChefMario" },
    averageRating: 4.8,
    image: "default",
  },
  {
    _id: "2",
    title: "Chicken Tikka Masala",
    author: { fullname: "SpiceMaster" },
    averageRating: 4.6,
    image: "default",
  },
  {
    _id: "3",
    title: "Vegetable Stir Fry",
    author: { fullname: "VeggieLover" },
    averageRating: 4.3,
    image: "default",
  },
  {
    _id: "4",
    title: "Beef Stroganoff",
    author: { fullname: "MeatMaestro" },
    averageRating: 4.7,
    image: "default",
  },
  {
    _id: "5",
    title: "Fish Tacos",
    author: { fullname: "SeafoodKing" },
    averageRating: 4.5,
    image: "default",
  },
  {
    _id: "6",
    title: "Vegan Brownies",
    author: { fullname: "PlantBasedBaker" },
    averageRating: 4.9,
    image: "default",
  },
  {
    _id: "7",
    title: "Chicken Alfredo",
    author: { fullname: "PastaPro" },
    averageRating: 4.4,
    image: "default",
  },
  {
    _id: "8",
    title: "Shrimp Scampi",
    author: { fullname: "OceanDelight" },
    averageRating: 4.6,
    image: "default",
  },
  {
    _id: "9",
    title: "Quinoa Salad",
    author: { fullname: "HealthyEater" },
    averageRating: 4.2,
    image: "default",
  },
  {
    _id: "10",
    title: "Pulled Pork Sandwich",
    author: { fullname: "BBQBoss" },
    averageRating: 4.7,
    image: "default",
  },
  {
    _id: "11",
    title: "Classic Cheeseburger",
    author: { fullname: "BurgerBuilder" },
    averageRating: 4.5,
    image: "default",
  },
  {
    _id: "12",
    title: "Pad Thai",
    author: { fullname: "ThaiTaste" },
    averageRating: 4.8,
    image: "default",
  },
  {
    _id: "13",
    title: "Margherita Pizza",
    author: { fullname: "PizzaPal" },
    averageRating: 4.7,
    image: "default",
  },
  {
    _id: "14",
    title: "Butternut Squash Soup",
    author: { fullname: "SoupSpecialist" },
    averageRating: 4.3,
    image: "default",
  },
  {
    _id: "15",
    title: "Eggplant Parmesan",
    author: { fullname: "ItalianFoodie" },
    averageRating: 4.4,
    image: "default",
  },
  {
    _id: "16",
    title: "Chocolate Chip Cookies",
    author: { fullname: "CookieMonster" },
    averageRating: 4.9,
    image: "default",
  },
  {
    _id: "18",
    title: "Greek Salad",
    author: { fullname: "MediterraneanMagic" },
    averageRating: 4.5,
    image: "default",
  },
  {
    _id: "19",
    title: "Lamb Curry",
    author: { fullname: "CurryConnoisseur" },
    averageRating: 4.6,
    image: "default",
  },
  {
    _id: "20",
    title: "Apple Pie",
    author: { fullname: "DessertDiva" },
    averageRating: 4.8,
    image: "default",
  },
  {
    _id: "21",
    title: "Mushroom Risotto",
    author: { fullname: "GourmetChef" },
    averageRating: 4.7,
    image: "default",
  },
]
;

export const recipe = {
  "title": "Creamy Garlic Butter Chicken",
  "description": "A quick and creamy garlic butter chicken recipe perfect for weeknight dinners.",
  "ingredients": [
    { "ingredient": "Chicken Breasts", "quantity": 2 },
    { "ingredient": "Garlic Cloves", "quantity": 4 },
    { "ingredient": "Butter", "quantity": 3 },
    { "ingredient": "Heavy Cream", "quantity": 1 },
    { "ingredient": "Parmesan Cheese", "quantity": 0.5 },
    { "ingredient": "Fresh Parsley", "quantity": 0.25 }
  ],
  "directions": [
    { "step": "Season chicken breasts with salt and pepper." },
    { "step": "In a skillet, melt butter and sear chicken until golden brown on both sides." },
    { "step": "Add minced garlic and sauté for 1 minute." },
    { "step": "Pour in heavy cream and stir in Parmesan cheese." },
    { "step": "Simmer until sauce thickens and chicken is cooked through." },
    { "step": "Garnish with chopped parsley and serve." }
  ],
  "nutritionalValue": {
    "proteinPerServing": 30,
    "caloriePerServing": 450
  },
  "labels": ["Dinner", "Chicken", "Low Carb"],
  "author": "65fa22d51767c1101b4bcf98",  // Replace with actual ObjectId of a user
  "ratings": [
    {
      "userId": "65fb12e8872fc63161ab8f21",  // Replace with actual ObjectId of another user
      "rating": 5,
      "comments": "Super creamy and flavorful! My family loved it.",
      "replies": [
        {
          "userId": "65fa22d51767c1101b4bcf98",
          "reply": "So glad to hear that! Thanks for trying it out!"
        }
      ]
    }
  ]
}

