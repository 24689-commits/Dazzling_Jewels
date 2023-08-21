const db =require("../config")

class Products{
    fetchProducts(req,res){
        const query =`
        SELECT prodID, prodName, amount, category, gender,image
        FROM products;
        `
        db.query(query,(err,results)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
    fetchProductsByCategory(req, res) {
        const category = req.params.category;

        if (!category) {
            return res.status(400).json({
                status: 400,
                error: "Category parameter is required."
            });
        }

        const query = `
        SELECT prodID, prodName, amount, category, gender, image
        FROM products
        WHERE category = ?;
        `;

        db.query(query, [category], (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        });
    }
       fetchProductsByGender(req, res) {
        const gender = req.params.gender;

        if (!gender) {
            return res.status(400).json({
                status: 400,
                error: "Gender parameter is required."
            });
        }

        const query = `
        SELECT prodID, prodName, amount, category, gender, image
        FROM products
        WHERE gender = ?;
        `;

        db.query(query, [gender], (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        });
    }
    fetchProduct(req,res){
        const query =`
        SELECT prodID, prodName, amount, category,gender, image
        FROM products
        WHERE prodID = ${req.params.id};
        `
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        }); 
    }
    addProduct(req, res) {
        const query = `
        INSERT INTO products
        SET ?;
        `;

        db.query(query, [req.body], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The product was added."
            });
        });
    }

    updateProduct(req, res) {
        const query = `
        UPDATE products
        SET ?
        WHERE prodID = ?;
        `;

        db.query(query, [req.body, req.params.id], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The product record was updated."
            });
        });
    }

    deleteProduct(req, res) {
        const query = `
        DELETE FROM products
        WHERE prodID = ${req.params.id};
        `;

        db.query(query, (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "A product record was deleted."
            });
        });
    }
}

module.exports = Products;