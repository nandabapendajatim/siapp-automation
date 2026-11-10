const db =
    require('../../database/db')

function clearMonitoring() {

    db.prepare(`
        DELETE FROM monitoring_detail
    `).run()

    db.prepare(`
        DELETE FROM monitoring_run
    `).run()

}

function saveMonitoringRun(data) {

    const stmt = db.prepare(`

        INSERT INTO monitoring_run (

            batch_id,

            started_at,

            finished_at,

            duration_seconds,

            total_pegawai,

            total_sk,

            total_reminder,

            total_spos,

            total_npp,

            total_ntp

        )

        VALUES (

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?

        )

    `)

    const result = stmt.run(

        data.batch_id,

        data.started_at,

        data.finished_at,

        data.duration_seconds,

        data.total_pegawai,

        data.total_sk,

        data.total_reminder,

        data.total_spos,

        data.total_npp,

        data.total_ntp

    )

    return result.lastInsertRowid

}

function saveMonitoringDetail(
    runId,
    rows
) {

    const insert = db.prepare(`

        INSERT INTO monitoring_detail (

            run_id,

            pegawai_id,

            pegawai_nama,

            pegawai_nip,

            jenis_surat,

            no_entry,

            nopol,

            nama_wp,

            alamat,

            kecamatan,

            desa,

            no_kohir,

            tahun_kohir,

            masa_laku,

            pkb,

            tgl_rekam,

            tgl_status,

            tgl_bayar,

            status,

            umur_hari,

            perlu_reminder,

            warna_row,

            kategori_reminder,

            sisa_hari,

            prioritas

        )

        VALUES (

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?,

            ?

        )

    `)

    const trx = db.transaction(items => {

        for (const item of items) {

            insert.run(

                runId,

                item.pegawai_id,

                item.pegawai_nama,

                item.pegawai_nip,

                item.jenis_surat,

                item.no_entry,

                item.nopol,

                item.nama_wp,

                item.alamat,

                item.kecamatan,

                item.desa,

                item.no_kohir,

                item.tahun_kohir,

                item.masa_laku,

                item.pkb,

                item.tgl_rekam,

                item.tgl_status,

                item.tgl_bayar,

                item.status,

                item.umur_hari,

                item.perlu_reminder ? 1 : 0,

                item.warna_row,

                item.kategori_reminder,

                item.sisa_hari,

                item.prioritas

            )

        }

    })

    trx(rows)

}

module.exports = {

    clearMonitoring,

    saveMonitoringRun,

    saveMonitoringDetail

}