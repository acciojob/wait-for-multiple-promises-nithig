function createPromise(name) {
    const delay = Math.random() * 2000 + 1000; // between 1–3 seconds
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ name, time: (delay / 1000).toFixed(3) });
        }, delay);
    });
}

const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3")
];

Promise.all(promises).then(results => {
    const tbody = document.getElementById("output");
    const loadingRow = document.getElementById("loading");
    if (loadingRow) loadingRow.remove();

    results.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = <td>${p.name}</td><td>${p.time}</td>;
        tbody.appendChild(row);
    });

    const maxTime = Math.max(...results.map(p => parseFloat(p.time))).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = <td><strong>Total</strong></td><td>${maxTime}</td>;
    tbody.appendChild(totalRow);
});