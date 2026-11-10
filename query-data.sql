/* QUERY SELECT DATA SK PEGAWAI */
SELECT
  sk_data.id,
  pegawai.nama AS nama_pegawai,
  sk_data.no_entri,
  sk_data.nopol,
  sk_data.jenis_surat,
  sk_data.kecamatan,
  sk_data.desa
FROM sk_data
LEFT JOIN pegawai
  ON pegawai.id = sk_data.pegawai_id
WHERE sk_data.pegawai_id IS NOT NULL AND date(sk_data.created_at) = '2026-05-19'
ORDER BY sk_data.nopol ASC;


/* QUERY SELECT PEGAWAI */
SELECT * FROM pegawai;
UPDATE pegawai set aktif = 1 where nip = '196806052008011018'

/* QUERY RANDOM URUTAN PEGAWAI */
-- di jalankan setiap hari sebelum melakukan proses automation
WITH randomized AS (
  SELECT
    id,
    ROW_NUMBER() OVER (ORDER BY RANDOM()) AS new_urutan
  FROM pegawai
  WHERE aktif = 1
)
  UPDATE pegawai
  SET urutan = (
    SELECT new_urutan
    FROM randomized
    WHERE randomized.id = pegawai.id
  )
WHERE aktif = 1;

/*SQLITE VERSION*/
SELECT sqlite_version();

/*QUERY CEK JUMLAH SK PER WILAYAH DALAM 1 HARI CETAK*/
SELECT a.kecamatan, a.desa, COUNT(a.no_entri) as total_sk  FROM sk_data a
WHERE a.batch_id in ('20260524_170445', '20260524_172248', '20260525_072048', '20260525_124200', '20260526_045801', '20260526_045801')
GROUP BY a.kecamatan, a.desa
ORDER BY a.kecamatan, total_sk DESC

SELECT a.kecamatan, COUNT(a.no_entri) as total_sk  FROM sk_data a
WHERE a.batch_id in ('20260524_170445', '20260524_172248', '20260525_072048', '20260525_124200', '20260526_045801', '20260526_045801')
GROUP BY a.kecamatan
ORDER BY total_sk DESC

SELECT COUNT(DISTINCT desa) as total_desa  FROM sk_data a
WHERE a.batch_id in ('20260524_170445', '20260524_172248', '20260525_072048', '20260525_124200', '20260526_045801', '20260526_045801')
GROUP BY a.desa
ORDER BY total_sk DESC


/* QUERY LAIN LAIN */
ALTER TABLE sk_data
ADD COLUMN batch_id TEXT;

/* QUERY INDEX TABEL SK_DATA */

CREATE INDEX IF NOT EXISTS idx_sk_batch
ON sk_data(batch_id);

CREATE INDEX IF NOT EXISTS idx_sk_status_batch
ON sk_data(status_proses, batch_id);

CREATE INDEX IF NOT EXISTS idx_sk_pegawai_batch
ON sk_data(pegawai_id, batch_id);

DROP INDEX idx_sk_batch;
DROP INDEX idx_sk_status_batch;
DROP INDEX idx_sk_pegawai_batch;

PRAGMA index_list('sk_data');

/* MIGRASI TABEL SK DATA */
ALTER TABLE sk_data
RENAME TO sk_data_old;

CREATE TABLE sk_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    no_entri TEXT,
    nopol TEXT,
    nama TEXT,
    desa TEXT,
    kecamatan TEXT,
    potensi TEXT,
    tgl_cetak TEXT,
    jenis_surat TEXT,

    pegawai_id INTEGER,
    batch_id TEXT,

    status_proses TEXT DEFAULT 'pending',
    response_siapp TEXT,

    processed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(no_entri, jenis_surat)
);

INSERT INTO sk_data (
    id,
    no_entri,
    nopol,
    nama,
    desa,
    kecamatan,
    potensi,
    tgl_cetak,
    jenis_surat,
    pegawai_id,
    batch_id,
    status_proses,
    response_siapp,
    processed_at,
    created_at
)
SELECT
    id,
    no_entri,
    nopol,
    nama,
    desa,
    kecamatan,
    potensi,
    tgl_cetak,
    jenis_surat,
    pegawai_id,
    batch_id,
    status_proses,
    response_siapp,
    processed_at,
    created_at
FROM sk_data_old;