// Write a for loop that will log the numbers 1 through 20.
// for (let i = 1; i <= 20; i++) {
//   console.log(i);
// }

// Write a for loop that will log only the even numbers in 0 through 200.
// for (let i = 0; i <= 200; i++) {
//   if (i % 2 === 0) {
//     console.log(i);
//   }
// }


//FizzBuzz 
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz", i)
    } else if (i % 5 === 0) {
        console.log("Buzz", i)
    } else if (i % 3 === 0) {
        console.log("Fizz", i)
    } 
}