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

PRAGMA index_list('sk_data');