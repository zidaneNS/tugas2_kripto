const alphabet = "ABCDEFGHIJKLMNOPQSRTUVWXYZ";
const alphabet_arr = alphabet.split("");

const k = [
    [23, 13, 10],
    [3, 7, 11],
    [17, 2, 3]
];

const k_inv = [];
let k_inv_row = [];

k.forEach((row, i) => {
    row.forEach((cell, j) => {
        console.log(`k_inv[${i+1}][${j+1}] = ${(cell * 19) % 26}`);
        k_inv_row.push((cell * 19) % 26);
    })
    k_inv.push(k_inv_row);
    k_inv_row = [];
})

console.log('\nk_inv = ');
console.log(k_inv);

const cipher = "AFPIZTYOEQSPMYQ";
const cipher_arr = [];

for (let i = 0; i < cipher.split("").length / 3; i++) {
    const temp = [];
    for (let j = 0; j < 3; j++) {
        temp.push(cipher[i * 3 + j]);
    }
    cipher_arr.push(temp);
}

console.log(cipher_arr);

const plain_arr = [];

cipher_arr.forEach((row) => {
    for (let i = 0; i < 3; i++) {
        const temp = [];
        for (let j = 0; j < 3; j++) {
            temp.push((alphabet_arr.findIndex(el => el === row[j]) * k_inv[j][i]));
        }
        plain_arr.push(alphabet[temp.reduce((prev, curr) => (prev + curr)) % 26]);
    }
});

console.log(plain_arr.join(""));