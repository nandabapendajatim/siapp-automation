
const db = require('../../database/db')

function initPemetaanTables() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS pemetaan_run (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            started_at TEXT NOT NULL,
            finished_at TEXT NOT NULL,
            periode_awal TEXT,
            periode_akhir TEXT,
            total_diambil INTEGER DEFAULT 0,
            dalam_periode INTEGER DEFAULT 0,
            sudah_dl INTEGER DEFAULT 0,
            belum_dl INTEGER DEFAULT 0,
            berhasil_dipetakan INTEGER DEFAULT 0,
            tidak_teridentifikasi INTEGER DEFAULT 0,
            total_spos INTEGER DEFAULT 0,
            total_npp INTEGER DEFAULT 0,
            total_ntp INTEGER DEFAULT 0
        );

        CREATE TABLE IF NOT EXISTS pemetaan_detail (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id INTEGER NOT NULL,
            pegawai_id INTEGER,
            pegawai_nama TEXT,
            jenis_surat TEXT,
            no_entry TEXT,
            nopol TEXT,
            nama_wp TEXT,
            alamat TEXT,
            kecamatan TEXT,
            desa TEXT,
            pkb INTEGER,
            tgl_rekam TEXT,
            FOREIGN KEY (run_id) REFERENCES pemetaan_run(id)
        );

        CREATE TABLE IF NOT EXISTS pemetaan_pengecualian (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            run_id INTEGER NOT NULL,
            pegawai_id INTEGER,
            pegawai_nama TEXT,
            jenis_surat TEXT,
            no_entry TEXT,
            nopol TEXT,
            nama_wp TEXT,
            alamat TEXT,
            kecamatan TEXT,
            alasan TEXT,
            FOREIGN KEY (run_id) REFERENCES pemetaan_run(id)
        );

        CREATE INDEX IF NOT EXISTS idx_pemetaan_detail_run
        ON pemetaan_detail(run_id);

        CREATE INDEX IF NOT EXISTS idx_pemetaan_detail_kecamatan
        ON pemetaan_detail(kecamatan);
    `)
}

function savePemetaan(hasil, startedAt) {
    initPemetaanTables()

    const transaksi = db.transaction(() => {
        const s = hasil.statistik

        const run = db.prepare(`
            INSERT INTO pemetaan_run (
                started_at,
                finished_at,
                periode_awal,
                periode_akhir,
                total_diambil,
                dalam_periode,
                sudah_dl,
                belum_dl,
                berhasil_dipetakan,
                tidak_teridentifikasi,
                total_spos,
                total_npp,
                total_ntp
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            startedAt.toISOString(),
            new Date().toISOString(),
            hasil.periode.awal,
            hasil.periode.akhir,
            s.totalDiambil,
            s.dalamPeriode,
            s.sudahDL,
            s.belumDL,
            s.berhasilDipetakan,
            s.tidakTeridentifikasi,
            s.spos,
            s.npp,
            s.ntp
        )

        const runId = Number(run.lastInsertRowid)

        const insertDetail = db.prepare(`
            INSERT INTO pemetaan_detail (
                run_id,
                pegawai_id,
                pegawai_nama,
                jenis_surat,
                no_entry,
                nopol,
                nama_wp,
                alamat,
                kecamatan,
                desa,
                pkb,
                tgl_rekam
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)

        for (const row of hasil.detail) {
            insertDetail.run(
                runId,
                row.pegawai_id,
                row.pegawai_nama,
                row.jenis_surat,
                row.no_entry,
                row.nopol,
                row.nama_wp,
                row.alamat,
                row.kecamatan,
                row.desa,
                row.pkb,
                row.tgl_rekam
            )
        }

        const insertPengecualian = db.prepare(`
            INSERT INTO pemetaan_pengecualian (
                run_id,
                pegawai_id,
                pegawai_nama,
                jenis_surat,
                no_entry,
                nopol,
                nama_wp,
                alamat,
                kecamatan,
                alasan
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)

        for (const row of hasil.pengecualian) {
            insertPengecualian.run(
                runId,
                row.pegawai_id,
                row.pegawai_nama,
                row.jenis_surat,
                row.no_entry,
                row.nopol,
                row.nama_wp,
                row.alamat,
                row.kecamatan || '',
                row.alasan
            )
        }

        // Simpan hanya satu hasil pemetaan aktif.
        // Hasil sebelumnya baru dibersihkan setelah
        // hasil baru berhasil dimasukkan.
        db.prepare(`
            DELETE FROM pemetaan_detail
            WHERE run_id <> ?
        `).run(runId)

        db.prepare(`
            DELETE FROM pemetaan_pengecualian
            WHERE run_id <> ?
        `).run(runId)

        db.prepare(`
            DELETE FROM pemetaan_run
            WHERE id <> ?
        `).run(runId)

        return runId
    })

    return transaksi()
}

module.exports = {
    initPemetaanTables,
    savePemetaan
}
