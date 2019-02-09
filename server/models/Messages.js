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

const getUserMessages = (user_id) => {
    return (
        db  
        .table(dbKey)
        .where({send_to: user_id})
        .then(messages => {
            return messages;
        })
    )
};

const getConversation = (user_id, talking_to_id) => {
    return (
        db
        .table(dbKey)
        .where({send_to:user_id, sent_from:talking_to_id})
        .then(messages => {
            return messages;
        })
    )
}

module.exports = {
    addMessage,
    getUserMessages,
    getConversation,
}