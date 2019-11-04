import React, {useState} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import {generateSchema} from '../../validator';
import {Button} from '@material-ui/core';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const initialValues: FormTypes = {
	meal: 'breakfast',
	people: 1,
	restaurant: '',
	dishes: [
		{
			dish: '',
			servings: 1,
		},
	],
};

const handleSubmit = (values: FormTypes): void => console.log(values);
const steps = [
	(formikProps: FormikProps<FormTypes>) => <Step1 formikProps={formikProps} />,
	(formikProps: FormikProps<FormTypes>) => <Step2 formikProps={formikProps} />,
	(formikProps: FormikProps<FormTypes>) => <Step3 formikProps={formikProps} />,
];

const PreOrderForm: React.FC<{}> = () => {
	const [step, setStep] = useState(0);
	const goNext = () => setStep(prev => prev + 1);
	const goPrevious = () => setStep(prev => prev - 1);
	const validationSchema = generateSchema();
	return (
		<Formik
			onSubmit={handleSubmit}
			validationSchema={validationSchema}
			initialValues={initialValues}
		>
			{props => {
				console.log('errors', props.errors);
				return (
					<Form>
						{steps[step](props)}
						{step >= 1 && (
							<Button
								onClick={goPrevious}
								color="default"
								variant="contained"
								disabled={props.isSubmitting}
							>
								Previous
							</Button>
						)}
						{step < 3 && (
							<Button
								onClick={goNext}
								color="primary"
								variant="contained"
								disabled={!props.isValid || props.isSubmitting}
							>
								Next
							</Button>
						)}
					</Form>
				);
			}}
		</Formik>
	);
};

export default PreOrderForm;
