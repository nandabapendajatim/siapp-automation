const db =
    require('../../database/db')

function getSummary() {

    return {

        total: db.prepare(`
            SELECT COUNT(*) total
            FROM monitoring_detail
        `).get().total,

        reminder: db.prepare(`
            SELECT COUNT(*) total
            FROM monitoring_detail
            WHERE perlu_reminder = 1
        `).get().total,

        spos: db.prepare(`
            SELECT COUNT(*) total
            FROM monitoring_detail
            WHERE jenis_surat='SPOS'
        `).get().total,

        npp: db.prepare(`
            SELECT COUNT(*) total
            FROM monitoring_detail
            WHERE jenis_surat='NPP'
        `).get().total,

        ntp: db.prepare(`
            SELECT COUNT(*) total
            FROM monitoring_detail
            WHERE jenis_surat='NTP'
        `).get().total

    }

}

function getReminderList() {

    return db.prepare(`

        SELECT *

        FROM monitoring_detail

        WHERE perlu_reminder = 1

        ORDER BY

            prioritas DESC,

            umur_hari DESC,

            pegawai_nama

    `).all()

}

function getPegawaiSummary() {

    return db.prepare(`

        SELECT

            pegawai_id,

            pegawai_nama,

            COUNT(*) total,

            SUM(

                CASE

                    WHEN perlu_reminder = 1

                    THEN 1

                    ELSE 0

                END

            ) reminder

        FROM monitoring_detail

        GROUP BY pegawai_id

        ORDER BY reminder DESC

    `).all()

}

function getReminderPegawai() {

    const rows = db.prepare(`

        SELECT

            pegawai_nama,

            jenis_surat,

            kategori_reminder,

            COUNT(*) total

        FROM monitoring_detail

        WHERE perlu_reminder = 1

        GROUP BY

            pegawai_nama,

            jenis_surat,

            kategori_reminder

        ORDER BY

            pegawai_nama,

            jenis_surat,

            kategori_reminder

    `).all()

    const hasil = {}

    for (const row of rows) {

        if (!hasil[row.pegawai_nama]) {

            hasil[row.pegawai_nama] = {

                pegawai: row.pegawai_nama,

                spos7: 0,
                spos8: 0,
                spos9: 0,
                spos10: 0,

                npp7: 0,
                npp8: 0,
                npp9: 0,
                npp10: 0,

                ntp7: 0,
                ntp8: 0,
                ntp9: 0,
                ntp10: 0,

                total: 0

            }

        }

        const p = hasil[row.pegawai_nama]

        const jenis =
            row.jenis_surat.toLowerCase()

        const hari =
            row.kategori_reminder >= 10
                ? 10
                : row.kategori_reminder

        p[`${jenis}${hari}`] =
            row.total

        p.total += row.total

    }

    return Object.values(hasil)
        .sort((a, b) => b.total - a.total)

}

module.exports = {

    getSummary,

    getReminderList,

    getPegawaiSummary,

    getReminderPegawai

}