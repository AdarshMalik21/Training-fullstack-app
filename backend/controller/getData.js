//  import fs from "fs";
 
//  export default function getData(req, res)  {
//   fs.readFile("./data.txt", "utf-8", (err, data) => {
//     let todos = [];
//     if (!err && data) {
//       try {
//         const parsed = JSON.parse(data);
//         todos = Array.isArray(parsed) ? parsed : [];
//       } catch (parseErr) {
//         todos = [];
//       }
//     }
//     res.json(todos);
//   });
// }
import { Todo } from "../Models/todo.models.js";

export default async function getData(req, res) {
  try {
    const todos = await Todo.find().lean();
    console.log("Data Get successfully")
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}
