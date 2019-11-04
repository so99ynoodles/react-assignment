import React, {Dispatch, SetStateAction} from 'react';
import {Field, FormikProps} from 'formik';
import SelectFormField from '../SelectFormField';
import {getAvailableRestaurantsOptions} from './helpers';
import {Button, ButtonGroup} from '@material-ui/core';
import {initialValues} from '.';

const Step2: React.FC<{
	formikProps: FormikProps<FormTypes>;
	setStep: Dispatch<SetStateAction<number>>;
}> = ({formikProps: {values, errors, setFieldValue}, setStep}) => (
	<>
		<Field
			component={SelectFormField}
			name="restaurant"
			label="Please Select a Restaurant"
			options={getAvailableRestaurantsOptions(values.meal)}
			onChange={() => {
				setFieldValue('dishes', initialValues.dishes);
			}}
		/>
		<ButtonGroup>
			<Button onClick={() => setStep(0)} color="default" variant="contained">
				Previous
			</Button>
			<Button
				disabled={!!errors.restaurant}
				onClick={() => setStep(2)}
				color="primary"
				variant="contained"
			>
				Next
			</Button>
		</ButtonGroup>
	</>
);

export default Step2;
