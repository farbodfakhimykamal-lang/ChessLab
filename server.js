const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // allow JSON requests
app.use(express.static("."));

// Read file
app.post("/read", (req, res) => {
    try {
        const data = fs.readFileSync(req.body.path, "utf8");
        res.send({ success: true, data });
    } catch (e) {
        res.send({ success: false, error: e.message });
    }
});

// Write file
app.post("/write", (req, res) => {
    try {
        fs.writeFileSync(req.body.path, req.body.content);
        res.send({ success: true });
    } catch (e) {
        res.send({ success: false, error: e.message });
    }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
