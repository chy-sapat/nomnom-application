export const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    author: "ChefMario",
    avgRating: 4.8,
    image: "SpaghettiCarbonara.jpg",
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    author: "SpiceMaster",
    avgRating: 4.6,
    image: "ChickenTikkaMasala.jpg",
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    author: "VeggieLover",
    avgRating: 4.3,
    image: "VegetableStirFry.jpg",
  },
  {
    id: 4,
    title: "Beef Stroganoff",
    author: "MeatMaestro",
    avgRating: 4.7,
    image: "BeefStroganoff.jpg",
  },
  {
    id: 5,
    title: "Fish Tacos",
    author: "SeafoodKing",
    avgRating: 4.5,
    image: "FishTacos.jpg",
  },
  {
    id: 6,
    title: "Vegan Brownies",
    author: "PlantBasedBaker",
    avgRating: 4.9,
    image: "VeganBrownies.jpg",
  },
  {
    id: 7,
    title: "Chicken Alfredo",
    author: "PastaPro",
    avgRating: 4.4,
    image: "ChickenAlfredo.jpg",
  },
  {
    id: 8,
    title: "Shrimp Scampi",
    author: "OceanDelight",
    avgRating: 4.6,
    image: "ShrimpScampi.jpg",
  },
  {
    id: 9,
    title: "Quinoa Salad",
    author: "HealthyEater",
    avgRating: 4.2,
    image: "QuinoaSalad.jpg",
  },
  {
    id: 10,
    title: "Pulled Pork Sandwich",
    author: "BBQBoss",
    avgRating: 4.7,
    image: "PulledPorkSandwich.jpg",
  },
  {
    id: 11,
    title: "Classic Cheeseburger",
    author: "BurgerBuilder",
    avgRating: 4.5,
    image: "ClassicCheeseburger.jpg",
  },
  {
    id: 12,
    title: "Pad Thai",
    author: "ThaiTaste",
    avgRating: 4.8,
    image: "PadThai.jpg",
  },
  {
    id: 13,
    title: "Margherita Pizza",
    author: "PizzaPal",
    avgRating: 4.7,
    image: "MargheritaPizza.jpg",
  },
  {
    id: 14,
    title: "Butternut Squash Soup",
    author: "SoupSpecialist",
    avgRating: 4.3,
    image: "ButternutSquashSoup.jpg",
  },
  {
    id: 15,
    title: "Eggplant Parmesan",
    author: "ItalianFoodie",
    avgRating: 4.4,
    image: "EggplantParmesan.jpg",
  },
  {
    id: 16,
    title: "Chocolate Chip Cookies",
    author: "CookieMonster",
    avgRating: 4.9,
    image: "ChocolateChipCookies.jpg",
  },
  {
    id: 18,
    title: "Greek Salad",
    author: "MediterraneanMagic",
    avgRating: 4.5,
    image: "GreekSalad.jpg",
  },
  {
    id: 19,
    title: "Lamb Curry",
    author: "CurryConnoisseur",
    avgRating: 4.6,
    image: "LambCurry.jpg",
  },
  {
    id: 20,
    title: "Apple Pie",
    author: "DessertDiva",
    avgRating: 4.8,
    image: "ApplePie.jpg",
  },
  {
    id: 21,
    title: "Mushroom Risotto",
    author: "GourmetChef",
    avgRating: 4.7,
    image: "MushroomRisotto.jpg",
  },
];

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

