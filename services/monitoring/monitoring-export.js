const XLSX = require('xlsx')
const path = require('path')

async function exportMonitoring({
    summary,
    reminderPegawai,
    reminderList
}) {

    const wb =
        XLSX.utils.book_new()

    //----------------------------------
    // SUMMARY
    //----------------------------------

    const summaryData = [

        ['Item', 'Nilai'],

        ['Total SK', summary.total],

        ['Reminder', summary.reminder],

        ['SPOS', summary.spos],

        ['NPP', summary.npp],

        ['NTP', summary.ntp]

    ]

    const wsSummary =
        XLSX.utils.aoa_to_sheet(
            summaryData
        )

    XLSX.utils.book_append_sheet(

        wb,

        wsSummary,

        'Summary'

    )

    //----------------------------------
    // REMINDER PEGAWAI
    //----------------------------------

    const wsPegawai =

        XLSX.utils.json_to_sheet(

            reminderPegawai

        )

    XLSX.utils.book_append_sheet(

        wb,

        wsPegawai,

        'Reminder Pegawai'

    )

    //----------------------------------
    // DETAIL
    //----------------------------------

    const wsDetail =

        XLSX.utils.json_to_sheet(

            reminderList

        )

    XLSX.utils.book_append_sheet(

        wb,

        wsDetail,

        'Detail Reminder'

    )

    //----------------------------------

    const now =
        new Date()

    const filename =

        `Monitoring_${

            now
                .toISOString()
                .replace(/:/g, '-')
                .replace('T', '_')
                .substring(0, 19)

        }.xlsx`

    const fullpath =

        path.join(

            process.cwd(),

            'download',

            filename

        )

    XLSX.writeFile(

        wb,

        fullpath

    )

    console.log()

    console.log(
        'Excel berhasil dibuat'
    )

    console.log(fullpath)

}

module.exports =
    exportMonitoring