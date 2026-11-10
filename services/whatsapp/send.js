const client =
    require('./client')

async function sendMessage(

    chatId,

    message

) {

    await client.sendMessage(

        chatId,

        message

    )

}

module.exports = {

    sendMessage

}