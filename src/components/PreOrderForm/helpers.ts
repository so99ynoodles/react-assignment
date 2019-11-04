import {dishes} from '../../data/dishes.json';

export const getAvailableRestaurant = (
	selectedMeal: 'breakfast' | 'lunch' | 'dinner' | undefined,
): Array<{
	id: number;
	name: string;
	restaurant: string;
	availableMeals: string[];
}> =>
	selectedMeal === undefined
		? []
		: dishes.filter(dish => dish.availableMeals.includes(selectedMeal));

export const getAvailableRestaurantsOptions = (
	selectedMeal: 'breakfast' | 'lunch' | 'dinner' | undefined,
): Array<{label: string; value: string}> =>
	Array.from(
		new Set(getAvailableRestaurant(selectedMeal).map(dish => dish.restaurant)),
	).map(restaurant => ({
		label: restaurant,
		value: restaurant,
	}));

export const getAvailableDishesOptions = (
	selectedMeal: 'breakfast' | 'lunch' | 'dinner' | undefined,
	selectedRestaurant: string | undefined,
): Array<{label: string; value: string}> =>
	selectedRestaurant === undefined
		? []
		: getAvailableRestaurant(selectedMeal)
				.filter(dish => dish.restaurant === selectedRestaurant)
				.map(dish => ({
					value: `${dish.id}`,
					label: dish.name,
				}));
