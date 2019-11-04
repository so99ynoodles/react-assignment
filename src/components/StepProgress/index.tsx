import React from 'react';
import {Stepper, Step, StepLabel} from '@material-ui/core';

const StepProgress: React.FC<{activeStep: number; steps: string[]}> = ({
	activeStep,
	steps,
}) => (
	<Stepper activeStep={activeStep} alternativeLabel>
		{steps.map((label: string) => (
			<Step key={label}>
				<StepLabel>{label}</StepLabel>
			</Step>
		))}
	</Stepper>
);

export default StepProgress;
