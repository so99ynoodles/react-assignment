import React, {useState, Dispatch, SetStateAction} from 'react';
import {Formik, Form, FormikProps} from 'formik';
import styled from '@emotion/styled';
import {generateSchema} from '../../validator';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Success from './Success';
import {Paper} from '@material-ui/core';
import StepProgress from '../StepProgress';

export const initialValues: FormTypes = {
	meal: '',
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
	'Select meal and number of people',
	'Select a restaurant',
	'Select your dishes',
	'Review',
];

const stepPages = [
	(
		formikProps: FormikProps<FormTypes>,
		setStep: Dispatch<SetStateAction<number>>,
	) => <Step1 formikProps={formikProps} setStep={setStep} />,
	(
		formikProps: FormikProps<FormTypes>,
		setStep: Dispatch<SetStateAction<number>>,
	) => <Step2 formikProps={formikProps} setStep={setStep} />,
	(
		formikProps: FormikProps<FormTypes>,
		setStep: Dispatch<SetStateAction<number>>,
	) => <Step3 formikProps={formikProps} setStep={setStep} />,
	(
		formikProps: FormikProps<FormTypes>,
		setStep: Dispatch<SetStateAction<number>>,
	) => <Step4 formikProps={formikProps} setStep={setStep} />,
	() => <Success />,
];

const Container = styled(Paper)`
	padding: 3rem 2rem;
`;

const FormContainer = styled(Paper)`
	padding: 2rem 1rem;
`;

const PreOrderForm: React.FC<{}> = () => {
	const [step, setStep] = useState(0);
	const validationSchema = generateSchema();
	return (
		<Container>
			<StepProgress activeStep={step} steps={steps} />
			<Formik
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
				initialValues={initialValues}
				initialErrors={{
					meal: 'Select meal',
				}}
			>
				{props => (
					<FormContainer elevation={3}>
						<Form>{stepPages[step](props, setStep)}</Form>
					</FormContainer>
				)}
			</Formik>
		</Container>
	);
};

export default PreOrderForm;
