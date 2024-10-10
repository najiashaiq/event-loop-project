document.addEventListener("DOMContentLoaded", () => {
   
    let counter = 0;

    function measureStack() {
        counter++;
        return measureStack(); // Recursive call
    }

    try {
        measureStack();
    } catch (e) {
        console.log("Error:", e.message);
        console.log("Maximum stack size reached:", counter);
    }

  
 

    const flatten = (arr) => {
        return arr.reduce((acc, val) => {
            return acc.concat(Array.isArray(val) ? flatten(val) : val);
        }, []);
    };

    const trampolinedFlatten = (arr) => {
        return () => flatten(arr);
    };

 
    const nestedArray = [1, [2, [3, 4], 5], 6];
    try {
        console.log("Flattened array:", trampolinedFlatten(nestedArray)()); 
    } catch (e) {
        console.error("Error flattening array:", e.message);
    }

   
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
                        output.innerHTML += i + "<br>"; 
                    } catch (e) {
                        console.error("Error updating output:", e.message);
                    }
                }, 0);
                count++;
            }
        }
        setTimeout(() => {
            alert("Calculation finished! Total primes: " + count); 
        }, 0);
    }

    
    try {
        displayPrimes(10000);
    } catch (e) {
        console.error("Error displaying primes:", e.message);
    }
});
