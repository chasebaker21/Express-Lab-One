import express from "express";
import cartArray from "./cart.js";

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// displays the cart items from cart.js
app.get("/cart-items", (req, res) => {
  res.status(200);
  res.json(cartArray);
});

// prints out the corresponding id cart item or 404 error if no id
app.get("/cart-items/:id", (req, res) => {
  const item = cartArray.find(i => i.id === parseInt(req.params.id));
  if (!item) res.status(404).json("Not Found");
  res.json(item);
});

// adds item to array
app.post("/cart-items", (req, res) => {
  if (!req.body.product || req.body.id.length < 4) {
    res
      .status(300)
      .json("Product name is reqired and should be more than Item 4");
    return;
  }
  cartArray.push(item);
  res.json(item);
});

// updates item by adding new data in postman body
app.put("/cart-items/:id", (req, res) => {
  const item = cartArray.find(i => i.id === parseInt(req.params.id));
  const newItem = req.body;
  if (!item) return res.status(404).json("The item was not found");
  const index = cartArray.indexOf(item);
  cartArray.splice(index, 1, newItem);
  res.status(200);
  res.json(newItem);
});

// deletes item from array
app.delete("/cart-items/:id", (req, res) => {
  const item = cartArray.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json("The item was not found");
  const index = cartArray.indexOf(item);
  cartArray.splice(index, 1);
  res.status(204);
  res.json(item);
});
