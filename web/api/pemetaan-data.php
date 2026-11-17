
<?php

header('Content-Type: application/json; charset=utf-8');

try {
    // Sesuaikan dengan path SQLite yang digunakan API Monitoring.
    $dbPath = dirname(__DIR__, 2) . '/database.sqlite';

    if (!is_file($dbPath)) {
        throw new Exception('File database tidak ditemukan');
    }

    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

    $run = $db->query("
        SELECT *
        FROM pemetaan_run
        ORDER BY id DESC
        LIMIT 1
    ")->fetch(PDO::FETCH_ASSOC);

    if (!$run) {
        echo json_encode([
            'success' => true,
            'hasData' => false,
            'message' => 'Belum ada hasil pemetaan'
        ]);
        exit;
    }

    $runId = (int) $run['id'];

    // Ambil master pembagian wilayah
    $masterWilayah = $db->query("
    SELECT wilayah, kecamatan
    FROM ms_wilayah
    ORDER BY wilayah, kecamatan
")->fetchAll(PDO::FETCH_ASSOC);

    // Buat lookup kecamatan -> wilayah
    $lookupWilayah = [];

    foreach ($masterWilayah as $item) {
        $kecamatan = strtoupper(trim($item['kecamatan']));

        // Normalisasi nama kecamatan
        if ($kecamatan === 'SEPULUH') {
            $kecamatan = 'SEPULU';
        }

        $lookupWilayah[$kecamatan] = (int)$item['wilayah'];
    }

    $stmt = $db->prepare("
        SELECT
            kecamatan,
            pegawai_id,
            pegawai_nama,
            COUNT(*) AS jumlah_sk,
            COALESCE(SUM(pkb), 0) AS total_pkb
        FROM pemetaan_detail
        WHERE run_id = ?
        GROUP BY
            kecamatan,
            pegawai_id,
            pegawai_nama
        ORDER BY
            kecamatan,
            pegawai_nama
    ");

    $stmt->execute([$runId]);
    $kelompok = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($kelompok as &$item) {
        $kecamatan = strtoupper(trim($item['kecamatan']));

        if ($kecamatan === 'SEPULUH') {
            $kecamatan = 'SEPULU';
        }

        $item['wilayah'] = $lookupWilayah[$kecamatan] ?? null;
    }
    unset($item);

    $stmt = $db->prepare("
        SELECT
            kecamatan,
            COUNT(*) AS jumlah_sk,
            COALESCE(SUM(pkb), 0) AS total_pkb,
            COUNT(DISTINCT pegawai_id) AS jumlah_pegawai
        FROM pemetaan_detail
        WHERE run_id = ?
        GROUP BY kecamatan
        ORDER BY jumlah_sk DESC, kecamatan
    ");

    $stmt->execute([$runId]);
    $perKecamatan = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($perKecamatan as &$item) {
        $kecamatan = strtoupper(trim($item['kecamatan']));

        if ($kecamatan === 'SEPULUH') {
            $kecamatan = 'SEPULU';
        }

        $item['wilayah'] = $lookupWilayah[$kecamatan] ?? null;
    }
    unset($item);

    $stmt = $db->prepare("
        SELECT
            pegawai_nama,
            jenis_surat,
            no_entry,
            kecamatan,
            alasan
        FROM pemetaan_pengecualian
        WHERE run_id = ?
        ORDER BY id
    ");

    $stmt->execute([$runId]);
    $pengecualian = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $ringkasanWilayah = [];

    for ($i = 1; $i <= 4; $i++) {
        $ringkasanWilayah[$i] = [
            'wilayah' => $i,
            'jumlah_sk' => 0,
            'jumlah_kecamatan' => 0,
            'total_pkb' => 0
        ];
    }

    foreach ($perKecamatan as $item) {
        $wilayah = $item['wilayah'];

        if ($wilayah !== null && isset($ringkasanWilayah[$wilayah])) {
            $ringkasanWilayah[$wilayah]['jumlah_sk'] +=
                (int)$item['jumlah_sk'];

            $ringkasanWilayah[$wilayah]['jumlah_kecamatan']++;
            $ringkasanWilayah[$wilayah]['total_pkb'] +=
                (int) $item['total_pkb'];
        }
    }

    // ==========================================
    // ANALISIS PRIORITAS PENAGIHAN
    // ==========================================

    // Peringkat berdasarkan jumlah SK
    $prioritasSK = $perKecamatan;

    usort($prioritasSK, function ($a, $b) {
        return (int)$b['jumlah_sk'] <=> (int)$a['jumlah_sk'];
    });

    $prioritasSK = array_slice($prioritasSK, 0, 5);

    // Peringkat berdasarkan nominal PKB
    $prioritasPKB = $perKecamatan;

    usort($prioritasPKB, function ($a, $b) {
        return (int)$b['total_pkb'] <=> (int)$a['total_pkb'];
    });

    $prioritasPKB = array_slice($prioritasPKB, 0, 5);

    echo json_encode([
        'success' => true,
        'hasData' => true,
        'run' => $run,
        'statistik' => [
            'totalDiambil' => (int) $run['total_diambil'],
            'dalamPeriode' => (int) $run['dalam_periode'],
            'sudahDL' => (int) $run['sudah_dl'],
            'belumDL' => (int) $run['belum_dl'],
            'berhasilDipetakan' => (int) $run['berhasil_dipetakan'],
            'tidakTeridentifikasi' => (int) $run['tidak_teridentifikasi'],
            'spos' => (int) $run['total_spos'],
            'npp' => (int) $run['total_npp'],
            'ntp' => (int) $run['total_ntp']
        ],
        'kelompok' => $kelompok,
        'perKecamatan' => $perKecamatan,
        'masterWilayah' => $masterWilayah,
        'ringkasanWilayah' => array_values($ringkasanWilayah),
        'prioritasSK' => $prioritasSK,
        'prioritasPKB' => $prioritasPKB,
        'pengecualian' => $pengecualian
    ], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
