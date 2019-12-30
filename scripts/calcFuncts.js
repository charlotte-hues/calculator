function add (a, b) {
	return a + b;
};

function subtract (a, b) {
	 return a - b;
};	

function sum (array) {
	return array.reduce((last, current) => last + current, 0);
};

function multiply (array) { 
	return array.reduce((last, current) =>  last * current)
};

function power(a, power) {
	return Math.pow(a, power);
};

function factorial(a) {
	let product = 1;
	for (let i=a; i>0; i--) {
		product *= i;
	}
	return product;
};