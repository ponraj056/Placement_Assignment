function decodeFromBase(valueStr, base) {
    const baseBig = BigInt(base);
    const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
    let result = BigInt(0);
    for (let ch of valueStr.toLowerCase()) {
        result = result * baseBig + BigInt(digits.indexOf(ch));
    }
    return result;
}

function gcd(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) { [a, b] = [b, a % b]; }
    return a;
}

function simplify(n, d) {
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n < 0n ? -n : n, d);
    return [n / g, d / g];
}

function addFrac(n1, d1, n2, d2) {
    let num = n1 * d2 + n2 * d1;
    let den = d1 * d2;
    return simplify(num, den);
}

function mulFrac(n1, d1, n2, d2) {
    return simplify(n1 * n2, d1 * d2);
}

function lagrangeAtZero(pts) {
    const len = pts.length;
    let resultNum = BigInt(0);
    let resultDen = BigInt(1);

    for (let i = 0; i < len; i++) {
        let termNum = pts[i].y;
        let termDen = BigInt(1);

        for (let j = 0; j < len; j++) {
            if (i !== j) {
                const top = BigInt(0) - pts[j].x;
                const bot = pts[i].x - pts[j].x;
                [termNum, termDen] = mulFrac(termNum, termDen, top, bot);
            }
        }

        [resultNum, resultDen] = addFrac(resultNum, resultDen, termNum, termDen);
    }

    return resultNum / resultDen;
}

const testcase2 = {
    "keys": { "n": 10, "k": 7 },
    "1":  { "base": "6",  "value": "13444211440455345511" },
    "2":  { "base": "15", "value": "aed7015a346d635" },
    "3":  { "base": "15", "value": "6aeeb69631c227c" },
    "4":  { "base": "16", "value": "e1b5e05623d881f" },
    "5":  { "base": "8",  "value": "316034514573652620673" },
    "6":  { "base": "3",  "value": "2122212201122002221120200210011020220200" },
    "7":  { "base": "3",  "value": "20120221122211000100210021102001201112121" },
    "8":  { "base": "6",  "value": "20220554335330240002224253" },
    "9":  { "base": "12", "value": "45153788322a1255483" },
    "10": { "base": "7",  "value": "1101613130313526312514143" }
};

const k = testcase2.keys.k;
const n = testcase2.keys.n;

let points = [];
for (let i = 1; i <= n; i++) {
    const entry = testcase2[String(i)];
    if (entry) {
        const x = BigInt(i);
        const y = decodeFromBase(entry.value, parseInt(entry.base));
        points.push({ x, y });
    }
}

points = points.slice(0, k);

console.log("==================================================");
console.log("TEST CASE 2");
console.log("==================================================");
console.log("Decoded Points:");
points.forEach(p => console.log(`  x=${p.x}, y=${p.y}`));

const secret = lagrangeAtZero(points);
console.log("\n✅ SECRET (f(0)) =", secret.toString());