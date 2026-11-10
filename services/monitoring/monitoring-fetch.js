const { request } = require('@playwright/test')

const cheerio = require('cheerio')

async function fetchMonitoring(
    page,
    menu,
    bulan,
    tahun
) {

    const cookies =
        await page
            .context()
            .cookies()

    const cookieHeader =
        cookies
            .map(c => `${c.name}=${c.value}`)
            .join('; ')

    const api =
        await request.newContext({

            baseURL:
                'https://siapp.dipendajatim.go.id',

            extraHTTPHeaders: {

                Cookie:
                    cookieHeader

            }

        })

    let semuaRow = ''

    let headerTable = ''

    let hal = 1

    while (true) {

        console.log(
            `[${menu.nama}] Ambil halaman ${hal}`
        )

        const payload = {

            bulan,

            tahun,

            page: 1000

        }

        if (hal > 1) {

            payload.hal = hal

        }

        const res =
            await api.post(

                menu.endpoint,

                {

                    form: payload

                }

            )

        const html =
            await res.text()

        const $ =
            cheerio.load(html)

        //---------------------------------------
        // simpan header sekali saja
        //---------------------------------------

        if (!headerTable) {

            headerTable =
                $('#example thead').html()

        }

        //---------------------------------------
        // ambil semua row
        //---------------------------------------

        $('#example tbody tr').each((i, tr) => {

            semuaRow +=
                $.html(tr)

        })

        //---------------------------------------
        // pagination
        //---------------------------------------

        const match =
            html.match(
                /buka\w+\((\d+)\)/g
            )

        if (!match)
            break

        const totalHalaman =
            Math.max(

                ...match.map(m =>

                    Number(
                        m.match(/\((\d+)\)/)[1]
                    )

                )

            )

        if (hal >= totalHalaman)
            break

        hal++

    }

    await api.dispose()

    //---------------------------------------
    // bangun ulang table
    //---------------------------------------

    return `

        <table id="example">

            <thead>

                ${headerTable}

            </thead>

            <tbody>

                ${semuaRow}

            </tbody>

        </table>

    `

}

module.exports = {

    fetchMonitoring

}