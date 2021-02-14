import express from "express";
import knex from "knex";

const router = express.Router();

const database = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "fatura",
  },
});

router.post("/categories", (req, res) => {
  const { id, name, parentId } = req.body;
  database("category")
    .insert({ id, name, parent_id: parentId })
    .then(() => {
      res.status(201).send(req.body);
    });
});

router.post("/products", (req, res) => {
  const { id, name, categoryId } = req.body;
  database("product")
    .insert({ id, name, category_id: categoryId })
    .then(() => {
      res.status(201).json(req.body);
    });
});

router.get("/categories/:id/products", (req, res) => {
  const { id } = req.params;
  const { limit, skip } = req.query;
  database
    .raw(
      `SELECT 
        product.id as product_id,
        product.name as product_name,
        price,
        provider.id as provider_id,
        provider.name as provider_name,
        category.id as category_id
        from product
      JOIN (
	      SELECT * from product_provider
	      WHERE price in (
          SELECT MIN(price) from product_provider
          GROUP BY product_id
        )
      ) AS lowest_price ON product.id = lowest_price.product_id
      JOIN provider ON provider.id = lowest_price.provider_id
      JOIN category ON category.id = product.category_id
      WHERE category_id = ? 
      LIMIT ?,?`,
      [id, skip, limit]
    )
    .then((result) => {
      res.status(200).json(result);
    });
});

router.patch("/products/:id/toggle", (req, res) => {
  const { id } = req.params;
  database
    .raw(
      `UPDATE product
        SET featured = !featured
        WHERE id = ?`,
      [id]
    )
    .then((result) => {
      res.status(200).json(result);
    });
});

export default router;
