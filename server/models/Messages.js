const db = require('../db');

const dbKey = "messages";

const addMessage = (message) => {
    return (
        db
            .table(dbKey)
            .insert({
                send_to: message.sendTo,
                sent_from: message.sentFrom,
                content: message.content
            })
            .then(docs => getDocumentById(docs[0]))
    )
};

module.exports = {
    addMessage
}