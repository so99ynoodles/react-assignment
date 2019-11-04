import React, {Dispatch, SetStateAction} from 'react';
import {Field, FormikProps} from 'formik';
import SelectFormField from '../SelectFormField';
import TextFormField from '../TextFormField';
import {Button} from '@material-ui/core';
import {initialValues} from '.';

const mealOptions = [
	{
		value: 'breakfast',
		label: 'Breakfast',
	},
	{
		value: 'lunch',
		label: 'Lunch',
	},
	{
		value: 'dinner',
		label: 'Dinner',
	},
];

const Step1: React.FC<{
	formikProps: FormikProps<FormTypes>;
	setStep: Dispatch<SetStateAction<number>>;
}> = ({formikProps: {errors, setFieldValue}, setStep}) => (
	<>
		<Field
			component={SelectFormField}
			name="meal"
			label="Please Select a Meal"
			options={mealOptions}
			onChange={() => {
				setFieldValue('restaurant', initialValues.restaurant);
				setFieldValue('dishes', initialValues.dishes);
			}}
		/>
		<Field
			component={TextFormField}
			name="people"
			label="Please Enter Number of People"
			type="number"
		/>
		<Button
			disabled={!!errors.meal || !!errors.people}
			onClick={() => setStep(1)}
			color="primary"
			variant="contained"
		>
			Next
		</Button>
	</>
);

export default Step1;
