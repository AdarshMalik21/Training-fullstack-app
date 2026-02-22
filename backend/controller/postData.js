 import fs from 'fs';

 export default function post(req, res)  {
  const todo = req.body;

  fs.readFile("./data.txt", "utf8", (err, data) => {
    let todos = [];

    if (!err && data) {
      try {
        const parsed = JSON.parse(data);
        todos = Array.isArray(parsed) ? parsed : [];
      } catch (parseErr) {
        todos = [];
      }
    }

    todos.push(todo);

    fs.writeFile("./data.txt", JSON.stringify(todos), (writeErr) => {
      if (writeErr) {
        res.status(500).json({ error: "Failed to save todo" });
        return;
      }
      res.status(201).json({ message: "Todo saved", data: todo });
    });
  });
}