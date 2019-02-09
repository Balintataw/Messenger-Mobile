const db = require('../db');

const dbKey = "users";

const createUser = (user) => {
    return (
        db
            .table(dbKey)
            .insert({
                user_id: user_id,
                username: user.username,
                email: user.email
            })
            .then(docs => getDocumentById(docs[0]))
    )
};

module.exports = {
    createUser,
};