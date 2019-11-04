import React from 'react';
import {FieldArray, Field, FormikProps, getIn} from 'formik';
import SelectFormField from '../SelectFormField';
import {getAvailableDishesOptions} from './helpers';
import TextFormField from '../TextFormField';
import {Button, FormHelperText} from '@material-ui/core';

const Dish: React.FC<{
	values: FormTypes;
	index: number;
	options: Array<{label: string; value: string}>;
	selectedDishes: (string | undefined)[];
}> = ({values, index, options, selectedDishes}) => {
	const currentDish = values.dishes && values.dishes[index].dish;
	const filteredOptions = options.filter(
		option =>
			option.value === currentDish || !selectedDishes.includes(option.value),
	);
	console.log('values', values);
	return (
		<div key={index}>
			<Field
				component={SelectFormField}
				label="Please Select a Dish"
				name={`dishes.${index}.dish`}
				options={filteredOptions}
			/>
			<Field
				component={TextFormField}
				label="Please enter no. of servings"
				name={`dishes.${index}.servings`}
			/>
		</div>
	);
};

const Step3: React.FC<{formikProps: FormikProps<FormTypes>}> = ({
	formikProps: {values},
}) => {
	const selectedDishes = (values.dishes || []).map(dish => dish.dish);
	const dishesOptions = getAvailableDishesOptions(
		values.meal,
		values.restaurant,
	);
	console.log('selectedDishes', selectedDishes);

	return (
		<FieldArray name="dishes">
			{({remove, push, form, name}) => {
				const errorText = getIn(form.touched, name) && getIn(form.errors, name);
				return (
					<div>
						{values.dishes &&
							values.dishes.length > 0 &&
							values.dishes.map((_, index) => (
								<Dish
									key={index}
									values={values}
									options={dishesOptions}
									index={index}
									selectedDishes={selectedDishes}
								/>
							))}
						{values.dishes && values.dishes.length < dishesOptions.length && (
							<Button
								onClick={e => {
									e.preventDefault();
									push({
										dish: '',
										servings: 1,
									});
								}}
							>
								+
							</Button>
						)}
						{errorText && <FormHelperText>{errorText}</FormHelperText>}
					</div>
				);
			}}
		</FieldArray>
	);
};

export default Step3;
