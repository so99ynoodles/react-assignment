import * as yup from 'yup';

export const generateSchema = () => {
	const dishSchema = yup.object().shape({
		dish: yup.string(),
		servings: yup.number().required(),
	});

	const formSchema = yup.object().shape({
		meal: yup
			.string()
			.oneOf(['breakfast', 'lunch', 'dinner'])
			.required(),
		people: yup
			.number()
			.min(1)
			.max(10)
			.required(),
		restaurant: yup.string().required(),
		dishes: yup
			.array()
			.of(dishSchema)
			.min(1)
			.test('totalMin', 'At least one dish per person required.', function(
				value,
			) {
				const {dishes, people} = this.parent;
				return (
					dishes.reduce(
						(acc: number, val: {servings: number}) => acc + val.servings,
						0,
					) >= people
				);
			})
			.test('totalMax', 'Maximum 10 dishes are allowed.', function(value) {
				const {dishes} = this.parent;
				return (
					dishes.reduce(
						(acc: number, val: {servings: number}) => acc + val.servings,
						0,
					) <= 10
				);
			}),
	});

	return formSchema;
};
