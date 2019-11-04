import React from 'react';
import {Field, FormikProps} from 'formik';
import SelectFormField from '../SelectFormField';
import TextFormField from '../TextFormField';

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

const Step1: React.FC<{formikProps: FormikProps<FormTypes>}> = () => (
	<>
		<Field
			component={SelectFormField}
			name="meal"
			label="Please Select a Meal"
			options={mealOptions}
		/>
		<Field
			component={TextFormField}
			name="people"
			label="Please Enter Number of People"
			type="number"
		/>
	</>
);

export default Step1;
