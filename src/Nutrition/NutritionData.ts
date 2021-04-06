import { http } from '../http';
export interface FoodData {
  foodId: number;
  name: string;
  description: string;
  nutrients: NutrientData[];
}

export interface NutrientData {
  nutrientId: number;
  name: string;
  description: string;
  benefit: string;
}

export interface RecipeData {
  recipeId: number;
  title: string;
  description: string;
  createdDate: Date;
  ingredients: [FoodData, number][];
  directions: string[];
}

export interface FoodDataFromServer {
  name: string;
  description: string;
  nutrients: string[];
}

// Food
export const getFood = async (
  foodName: string,
): Promise<FoodDataFromServer | null> => {
  const result = await http<FoodDataFromServer>({
    path: `/food/${foodName}`,
  });
  if (result.ok && result.body) {
    return result.body;
  } else {
    return null;
  }
};

export interface PostFoodData {
  name: string;
  description: string;
  createdDate: Date;
}
export const postFood = async (
  food: PostFoodData,
): Promise<FoodData | undefined> => {
  const result = await http<FoodData, PostFoodData>({
    path: '/food',
    method: 'post',
    body: food,
  });
  if (result.ok) {
    return result.body;
  } else {
    return undefined;
  }
};
