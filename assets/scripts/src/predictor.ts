enum Race {
	White,
	Black,
	Hispanic,
	Asian
}

class Person {

	public race: Race;
	public birth: number;
	public female: boolean;
	public degree: boolean;

	constructor() {
		this.race = Race.White;
		this.birth = 1980;
		this.degree = true;
		this.female = true;
	}

	// returns the chance that the person is Democratic
	predict(): number {

		let total : number = 0;

		switch (this.race) {
			case Race.White:
				total += .43;
				break;
			case Race.Black:
				total += .84;
				break;
			case Race.Hispanic:
				total += .63;
				break;
			case Race.Asian:
				total += .65
		}

		if (this.degree) total += .58; else total += .46;
		if (this.female) total += .56; else total += .44;

		if (this.birth > 1981) total += .59;
		else if (this.birth > 1965) total += .48;
		else if (this.birth > 1946) total += .48;
		else  total += .43;

		return (total / 4);
	}
}

function main(): string {

	let param = new URL(window.location.href).searchParams;
	let person: Person = new Person();

	if (param.get("sex") == "male") person.female = false;
	else if (param.get("sex") == "female") person.female = true;
	else return;

	if (param.get("degree") == "true") person.degree = true;
	else person.degree = false;

	person.birth = Number(param.get("year"));

	if (param.get("race") == "White") person.race = Race.White;
	else if (param.get("race") == "Black") person.race = Race.Black;
	else if (param.get("race") == "Asian") person.race = Race.Asian;
	else if (param.get("race") == "Hispanic") person.race = Race.Hispanic;
	else return;

	let demchance: number = person.predict();
	let message: string = "";

	if (demchance >= .5) {
		let percent: number = Math.round(demchance * 100);
		message = `There is a ${percent}% chance you are a Democrat`;
	} else {
		let percent = Math.round((1 - demchance) * 100);
		message = `There is a ${percent}% chance you are a Republican`;
	}

	document.getElementById("message").innerHTML = message;
}

main();