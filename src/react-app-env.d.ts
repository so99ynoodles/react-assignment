/// <reference types="react-scripts" />

interface Dish {
	dish?: string; //ID
	servings: number;
}

interface FormTypes {
	meal?: string;
	people?: number;
	restaurant?: string;
	dishes?: Dish[];
}
