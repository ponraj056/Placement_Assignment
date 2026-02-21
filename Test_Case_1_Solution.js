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


const testcase1 = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2",  "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4",  "value": "213" }
};

const k = testcase1.keys.k;
const n = testcase1.keys.n;

let points = [];
for (let i = 1; i <= n; i++) {
    const entry = testcase1[String(i)];
    if (entry) {
        const x = BigInt(i);
        const y = decodeFromBase(entry.value, parseInt(entry.base));
        points.push({ x, y });
    }
}

points = points.slice(0, k);

console.log("==================================================");
console.log("TEST CASE 1");
console.log("==================================================");
console.log("Decoded Points:");
points.forEach(p => console.log(`  x=${p.x}, y=${p.y}`));

const secret = lagrangeAtZero(points);
console.log("\n✅ SECRET (f(0)) =", secret.toString());