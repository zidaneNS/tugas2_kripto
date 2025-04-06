const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabet_arr = alphabet.split("");

const minor = (matrix, row, col) => matrix.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col));

const det2x2 = (m) => m[0][0] * m[1][1] - m[1][0] * m[0][1];

const mod = 26;

const k = [
    [7, 3, 9],
    [2, 5, 1],
    [11, 23, 4]
];

const det_k = ((Math.pow(-1, 0) * k[0][0] * (k[1][1] * k[2][2] - k[1][2] * k[2][1]) + Math.pow(-1, 1) * k[0][1] * (k[1][0] * k[2][2] - k[1][2] * k[2][0]) + Math.pow(-1, 2) * k[0][2] * (k[1][0] * k[2][1] - k[1][1] * k[2][0]) % mod) + mod) % mod;

let det_k_inv = 0;

while ((det_k_inv * det_k) % mod !== 1) {
    det_k_inv++;
}

const cofactors = [];

for (let i = 0; i < 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
        const sign = Math.pow(-1, i + j);
        const minorMatrix = minor(k, i, j);
        const cofactor = ((sign * det2x2(minorMatrix) % mod) + mod) % mod;
        temp.push(cofactor);
    }
    cofactors.push(temp);
}

const adj_k = [
    [cofactors[0][0], cofactors[1][0], cofactors[2][0]],
    [cofactors[0][1], cofactors[1][1], cofactors[2][1]],
    [cofactors[0][2], cofactors[1][2], cofactors[2][2]]
]

const k_inv = [];

adj_k.forEach((row, i) => {
    const temp = [];
    row.forEach((cell, j) => {
        temp.push((((cell * det_k_inv) % mod) + mod) % mod);
    })
    k_inv.push(temp);
})

console.log('\nk_inv = ');
console.log(k_inv);

const cipher = "HKAWNJSVFOILTDI"; //ubah cipherteks disini
const cipher_arr = [];

for (let i = 0; i < cipher.split("").length / 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
        temp.push(cipher[i * 3 + j]);
    }
    cipher_arr.push(temp);
}

console.log('cipher : ');
console.log(cipher_arr);

const plain_arr = [];

cipher_arr.forEach((row, ind) => {
    for (let i = 0; i < 3; i++) {
        const temp = [];
        for (let j = 0; j < 3; j++) {
            temp.push((alphabet_arr.findIndex(el => el === row[j]) * k_inv[j][i]));
        }
        console.log('---');
        console.log(`P_${ind + 1} : ${temp.reduce((prev, curr) => (((prev + curr)) % mod) + mod) % mod}`);
        plain_arr.push(alphabet[temp.reduce((prev, curr) => (((prev + curr)) % mod) + mod) % mod]);
    }
});

console.log('plainteks : ', plain_arr.join(""));