import React from 'react';
import {cleanup, render} from '@testing-library/react';
import StepProgress from '.';

afterEach(cleanup);
describe('StepProgress', () => {
	it('You can see 2, 3, 4 steps', () => {
		const {getByText} = render(
			<StepProgress activeStep={1} steps={['', '', '', '']} />,
		);
		const StepTwo = getByText('2');
		const StepThree = getByText('3');
		const StepFour = getByText('4');

		expect(StepTwo).toBeTruthy();
		expect(StepThree).toBeTruthy();
		expect(StepFour).toBeTruthy();
	});
});
