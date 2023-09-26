export interface Skill {
    skill: string;
    seniority: string;
    yearsOfExperience: number;
}

export interface Employee {
    id: string; // example: AB1234
    firstName: string;
    lastName: string;
    dob: string; // date of birth
    contactNumber: string;
    email: string;
    streetAddress: string;
    city: string;
    country: string;
    postalcode: string;
    skills: Skill[];
}

