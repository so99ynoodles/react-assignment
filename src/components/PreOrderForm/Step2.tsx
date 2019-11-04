import React from 'react';
import {Field, FormikProps} from 'formik';
import SelectFormField from '../SelectFormField';
import {getAvailableRestaurantsOptions} from './helpers';

const Step2: React.FC<{formikProps: FormikProps<FormTypes>}> = ({
	formikProps: {values},
}) => (
	<>
		<Field
			component={SelectFormField}
			name="restaurant"
			label="Please Select a Restaurant"
			options={getAvailableRestaurantsOptions(values.meal)}
		/>
	</>
);

export default Step2;
