let test = "3.0"

if (!(!isNaN(Number(test)) && (Number(test) % 1 !== 0 || test.endsWith(".0")))) console.log("not a float")
else console.log("is a float")