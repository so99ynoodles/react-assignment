import React, {Dispatch, SetStateAction} from 'react';
import {FormikProps} from 'formik';
import {
	Button,
	Box,
	List,
	ListItem,
	ListItemText,
	ButtonGroup,
	Typography,
	Paper,
} from '@material-ui/core';
import {dishes} from '../../data/dishes.json';

const getDish = (
	id: string,
): {id: number; name: string; availableMeals: string[]; restaurant: string} =>
	dishes.find(d => +d.id === +id) || {
		id: 0,
		name: '',
		restaurant: '',
		availableMeals: [],
	};

const Step4: React.FC<{
	formikProps: FormikProps<FormTypes>;
	setStep: Dispatch<SetStateAction<number>>;
}> = ({formikProps: {values, isValid, isSubmitting, submitForm}, setStep}) => (
	<>
		<List>
			<ListItem>
				<ListItemText
					primary="Meal"
					secondary={(values.meal || '').toUpperCase()}
				/>
			</ListItem>
			<ListItem>
				<ListItemText primary="No. of People" secondary={values.people} />
			</ListItem>
			<ListItem>
				<ListItemText primary="Restaurant" secondary={values.restaurant} />
			</ListItem>
			<List>
				<ListItem>
					<ListItemText primary="Dishes" />
				</ListItem>
				<Paper elevation={4}>
					{(values.dishes || []).map(dish => (
						<List key={dish.dish}>
							<ListItem>
								<ListItemText
									primary={getDish(dish.dish || '').name}
									secondary={dish.servings}
								/>
							</ListItem>
						</List>
					))}
				</Paper>
			</List>
		</List>
		<Box mt="2rem">
			<ButtonGroup>
				<Button onClick={() => setStep(2)} color="default" variant="contained">
					Previous
				</Button>
				<Button
					disabled={!isValid || isSubmitting}
					onClick={() => {
						submitForm();
						setStep(4);
					}}
					color="primary"
					type="submit"
					variant="contained"
				>
					Confirm
				</Button>
			</ButtonGroup>
		</Box>
	</>
);

export default Step4;
