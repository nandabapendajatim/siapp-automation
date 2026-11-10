const client =
    require('./services/whatsapp/client')

client.on(

    'ready',

    async () => {

        console.log('')

        console.log('======================')

        console.log('LIST GROUP')

        console.log('======================')

        const chats =
            await client.getChats()

        chats

            .filter(

                c => c.isGroup

            )

            .forEach(

                c => {

                    console.log(

                        c.name,

                        '=>',

                        c.id._serialized

                    )

                }

            )

    }

)

client.initialize()