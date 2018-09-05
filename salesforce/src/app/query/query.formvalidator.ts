import { FormControl, Validators } from '@angular/forms';

const validCharacters = /[^\w,.:&()+%'`@-]/;

export class QueryValidator extends Validators {
	// create a static method for your validation
	static validateCharacters(control: FormControl) {
		// first check if the control has a value
		if (control.value && control.value.length > 0) {
			// match the control value against the regular expression
			const matches = control.value.match(validCharacters);
			// if there are matches return an object, else return null.
			return matches && matches.length ? { invalid_characters: matches } : null;
		}
		else {
			return null;
		}
	}
}