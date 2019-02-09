const db = require('../db');

const dbKey = "users";

const createUser = (user) => {
    return (
        db
            .table(dbKey)
            .insert({
                user_id: user.user_id,
                username: user.username,
                email: user.email
            })
            .then(docs => {
                console.log("DOCS", docs[0])
                // getDocumentById(docs[0])
            })
    )
};

module.exports = {
    createUser,
};