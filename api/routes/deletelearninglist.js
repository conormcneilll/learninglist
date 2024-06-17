const express = require("express");
const router = express.Router();
const connection = require("../connection.js");

router.post('/', (req, res) => {
    let { learnlist_id } = req.body;

    let deletelearnlistQ = `DELETE FROM learnlist WHERE learnlist_id = ?;`;

    console.log(req.body);

    connection.query(deletelearnlistQ, [learnlist_id], (err, data) => {
        if (err) {
            console.log("Delete learnlist failed: ", err.sqlMessage);
            res.status(500).json({ badstuff: err });
            return;
        }

        console.log(data);

        let responseobject = {};

        if (data.affectedRows == 1) {
            responseobject.goodstuff = data;
            responseobject.goodstuff.apimessage = `Learn List deleted.`;
            res.json(responseobject);
        } else {
            responseobject.badstuff = {
                data,
                apimessage: "Could not delete learnlist."
            };
            res.json(responseobject);
        }
    });
});

module.exports = router;
