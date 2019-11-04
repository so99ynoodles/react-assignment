import React, {Dispatch, SetStateAction} from 'react';
import {FieldArray, Field, FormikProps, getIn} from 'formik';
import SelectFormField from '../SelectFormField';
import {getAvailableDishesOptions} from './helpers';
import TextFormField from '../TextFormField';
import {
	Button,
	FormHelperText,
	FormControl,
	ButtonGroup,
	Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
				type="number"
			/>
		</div>
	);
};

const Step3: React.FC<{
	formikProps: FormikProps<FormTypes>;
	setStep: Dispatch<SetStateAction<number>>;
}> = ({formikProps: {values, isValid, errors}, setStep}) => {
	const selectedDishes = (values.dishes || []).map(dish => dish.dish);
	const dishesOptions = getAvailableDishesOptions(
		values.meal,
		values.restaurant,
	);

	return (
		<>
			<FieldArray name="dishes">
				{({push, form, name}) => {
					const errorText =
						getIn(form.touched, name) && getIn(form.errors, name);
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
									color="primary"
								>
									<AddIcon /> Add dishes
								</Button>
							)}

							{errorText && !Array.isArray(errorText) && (
								<FormControl error={!!errorText}>
									<FormHelperText>{errorText}</FormHelperText>
								</FormControl>
							)}
						</div>
					);
				}}
			</FieldArray>
			<Box mt="2rem">
				<ButtonGroup>
					<Button
						onClick={() => setStep(1)}
						color="default"
						variant="contained"
					>
						Previous
					</Button>
					<Button
						disabled={!isValid}
						onClick={() => setStep(3)}
						color="primary"
						variant="contained"
					>
						Next
					</Button>
				</ButtonGroup>
			</Box>
		</>
	);
};

export default Step3;
