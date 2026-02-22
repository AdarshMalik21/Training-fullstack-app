 import fs from "fs";
 
 export default function getData(req, res)  {
  fs.readFile("./data.txt", "utf-8", (err, data) => {
    let todos = [];
    if (!err && data) {
      try {
        const parsed = JSON.parse(data);
        todos = Array.isArray(parsed) ? parsed : [];
      } catch (parseErr) {
        todos = [];
      }
    }
    res.json(todos);
  });
}