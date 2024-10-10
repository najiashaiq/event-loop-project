document.addEventListener("DOMContentLoaded", () => {
    /**
     * ALAB 308A.1.1: Practical Use of the Event Loop
     * Version 1.0, 10/13/23
     * 
     * Objective: Implement call stack measurement, trampolines, and deferred execution.
     */

    /**
     * Part 1: Stack Overflow
     * 
     * Create a function to measure the maximum size of the call stack.
     */
    let counter = 0;

    function measureStack() {
        counter++;
        return measureStack(); // Recursive call
    }

    try {
        measureStack();
    } catch (e) {
        console.log("Error:", e.message);
        console.log("Maximum stack size reached:", counter); // Expected ~15,000
    }

    /**
     * Part 2: Trampolines
     * 
     * Write a recursive function to flatten nested arrays using trampolining.
     */
    const flatten = (arr) => {
        return arr.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? flatten(val) : val);
        }, []);
    };

    const trampolinedFlatten = (arr) => {
        return () => flatten(arr);
    };

    /**
     * Example usage for Part 2:
     */
    const nestedArray = [1, [2, [3, 4], 5], 6];
    try {
        console.log("Flattened array:", trampolinedFlatten(nestedArray)()); // Flattens the array
    } catch (e) {
        console.error("Error flattening array:", e.message);
    }

    /**
     * Part 3: Deferred Execution
     * 
     * Create a function to display prime numbers up to a given n, using deferred execution.
     */
    const output = document.getElementById("output");

    function isPrime(num) {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return num > 1;
    }

    function displayPrimes(n) {
        let count = 0;
        for (let i = 1; i <= n; i++) {
            if (isPrime(i)) {
                setTimeout(() => {
                    try {
                        output.innerHTML += i + "<br>"; // Render each prime number
                    } catch (e) {
                        console.error("Error updating output:", e.message);
                    }
                }, 0);
                count++;
            }
        }
        setTimeout(() => {
            alert("Calculation finished! Total primes: " + count); // Alert after rendering
        }, 0);
    }

    
    try {
        displayPrimes(10000);
    } catch (e) {
        console.error("Error displaying primes:", e.message);
    }
});