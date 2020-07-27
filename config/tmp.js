let rec = [];
for (let i = 0; i < 100000; ++i) {
    if (!rec.length || Date.now() != rec[rec.length - 1]) {
        rec.push(Date.now());
    }
}
console.log(rec);
