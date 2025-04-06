const p = 53;
const q = 97;

const n = p * q;
const toitent = (p - 1) * (q - 1);

let e = 85;

const plain = "Libur 10 hari";

const factors = (num) => {
    const result = [];
    for (let i = 0; i <= num; i++) {
        if (num % i === 0) result.push(i);
    }
    return result;
}

const gcd = (a, b) => {
    const result = [];

    const factors_a = factors(a);
    const factors_b = factors(b);

    factors_a.forEach(el => {
        if (factors_b.includes(el)) result.push(el);
    });

    return result;
}

const modPow = (base, exponent, modulus) => {
    if (modulus === 1) return 0;
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    return result;
}

while (gcd(e, toitent).length > 1 || e === 1 || e === 0) {
    e = Math.floor(Math.random() * 100);
}

console.log('e value : ', e);

let e_inv = 0;

while ((e_inv * e) % toitent !== 1) {
    e_inv++;
}

const d = e_inv;

console.log('diperoleh totient : ', toitent);
console.log('diperoleh d : ', d);

console.log(`kunci publiknya adalah (${e}, ${n})`);
console.log(`kunci privatnya adalah (${d}, ${n})`);

const ascii = [];

plain.split("").forEach(el => ascii.push(el.charCodeAt()));

const block_len = 4;

console.log('ascii : ', ascii.join(""));

const cipher = [];

console.log(ascii);

ascii.forEach((el, ind) => {
    console.log(`c_${ind} = ${modPow(el, e, n)}`);
    cipher.push(modPow(el, e, n));
});

console.log('sehingga ciphernya adalah : ', cipher.join(""), '\n');

const m = [];

console.log(cipher);

cipher.forEach((el, ind) => {
    console.log(`m_${ind} = ${modPow(el, d, n)}`);
    m.push(modPow(el, d, n));
});

console.log('sehingga plainteksnya adalah : ', m.join(""));

console.log('hasil ascii == hasil dekripsi : ', m.join("") === ascii.join(""));