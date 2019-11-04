/// <reference types="react-scripts" />

interface Dish {
  dish: number, //ID
  servings: number
}

interface FormTypes {
  meal: 'breakfast' | 'lunch' | 'dinner',
  people: number,
  restaurant: string,
  dishes: Dish[],
}