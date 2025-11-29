async function readFile() {
    const path = document.getElementById("filepath").value;
    const res = await fetch("/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path })
    });
    const data = await res.json();
    if (data.success) document.getElementById("content").value = data.data;
    else alert("Error: " + data.error);
}

async function saveFile() {
    const path = document.getElementById("filepath").value;
    const content = document.getElementById("content").value;
    const res = await fetch("/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, content })
    });
    const data = await res.json();
    if (data.success) alert("Saved 🤗💛");
    else alert("Error: " + data.error);
}
