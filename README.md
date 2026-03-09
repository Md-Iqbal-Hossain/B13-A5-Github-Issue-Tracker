1. What is the difference between var, let, and const?

Ans. var, let, and const are used to create variables in JavaScript. var is the older way, and the same variable can be declared again. let is used for variables whose value may change later. const is used when the value should stay the same and not be reassigned.

2. What is the spread operator (...)? 

Ans. The spread operator (...) is used to expand elements of an array or object into another array or object. It helps copy or combine data easily. It makes working with arrays and objects shorter and more convenient.

Example:  
const arr1 = [1,2];
const arr2 = [...arr1,3];

3️.  What is the difference between map(), filter(), and forEach()? 

Ans. All three are used with arrays in JavaScript. Firstly, map() goes through each item and makes a new array after changing the values. Secondly, filter() makes a new array but only keeps the items that match a condition. But forEach() just runs through the array and does something with each item. It does not create or return a new array.

4️. What is an arrow function? 

Ans. Basically, an arrow function is a short way to write a function in JavaScript using =>. It helps write functions with less code. It is mostly used for small and simple tasks. Many developers use it to make the code easier to write. Moreover, it also makes the code look cleaner. 

Example:  
const add = (a,b) => a + b;

5️. What are template literals?

Ans. Template literals are used to write strings in JavaScript using backticks ` `. They make it easy to add variables inside a sentence. We can put a variable in the string using ${}. This helps make the code shorter and easier to read. 

Example: 
const name = "Iqbal";
console.log(`Hello ${name}`);
