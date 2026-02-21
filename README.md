# Placements Assignment - Shamir's Secret Sharing

## Problem Statement
Find the constant term (secret) of a polynomial using Lagrange Interpolation.
The input is given in JSON format where each point has a value encoded in different bases.

---

## Language Used
JavaScript (Node.js)

---

## Files
| File | Description |
|------|-------------|
| Solution.js | Combined solution for both test cases |
| Test_case_1_Solution.js | Solution for Test Case 1 only |
| Test_case_1_Solution.js | Solution for Test Case 2 only |

---

## How It Works

### Step 1 - Decode Points
Each value in the JSON is encoded in a different base.
Convert each value to decimal (base 10) to get the y coordinate.
The key number is the x coordinate.

### Step 2 - Lagrange Interpolation
Use the formula to find f(0) which is the secret (constant term).
