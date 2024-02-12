let db;
let openRequest = indexedDB.open("myDataBase");

openRequest.addEventListener("success", (e) => {
    console.log("DB Success...");
    db = openRequest.result;
});

openRequest.addEventListener("error", (e) => {
    console.log("DB Error...", e);
})

openRequest.addEventListener("upgradeneeded", (e) => {
    console.log("DB upgraded...");
    db = openRequest.result;

    db.createObjectStore("video", { keyPath: "id" });
    db.createObjectStore("image", { keyPath: "id" })
})