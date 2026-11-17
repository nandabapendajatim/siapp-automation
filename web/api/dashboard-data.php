
<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

try {

    // ==========================================
    // KONEKSI DATABASE
    // ==========================================

    $dbPath = dirname(__DIR__, 2) . '/database.sqlite';

    if (!is_file($dbPath)) {
        throw new Exception('Database SQLite tidak ditemukan.');
    }

    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

    // ==========================================
    // PERIODE BULAN BERJALAN (WIB)
    // ==========================================

    $zonaWaktu = new DateTimeZone('Asia/Jakarta');

    $sekarang = new DateTimeImmutable(
        'now',
        $zonaWaktu
    );

    $awalBulan = $sekarang
        ->modify('first day of this month')
        ->setTime(0, 0, 0);

    $awalBulanBerikutnya = $sekarang
        ->modify('first day of next month')
        ->setTime(0, 0, 0);

    $periodeMulai = $awalBulan->format('Y-m-d H:i:s');

    $periodeBatas = $awalBulanBerikutnya->format('Y-m-d H:i:s');

    $periodeSelesai = $sekarang->format('Y-m-d H:i:s');

    // ==========================================
    // AUTOMATION ENTRY R2
    // STATISTIK BULAN BERJALAN
    // ==========================================

    $stmtAutomation = $db->prepare("
        SELECT
            COUNT(*) AS total,

            SUM(
                CASE
                    WHEN status_proses = 'success'
                    THEN 1 ELSE 0
                END
            ) AS berhasil,

            SUM(
                CASE
                    WHEN status_proses = 'duplicate'
                    THEN 1 ELSE 0
                END
            ) AS duplicate,

            SUM(
                CASE
                    WHEN status_proses = 'not_found'
                    THEN 1 ELSE 0
                END
            ) AS not_found,

            SUM(
                CASE
                    WHEN status_proses = 'failed'
                    THEN 1 ELSE 0
                END
            ) AS gagal,

            SUM(
                CASE
                    WHEN status_proses = 'pending'
                    THEN 1 ELSE 0
                END
            ) AS pending,

            MAX(processed_at) AS terakhir_update

        FROM sk_data

        WHERE processed_at >= ?
          AND processed_at <= ?
    ");

    $stmtAutomation->execute([
        $periodeMulai,
        $periodeSelesai
    ]);

    $hasilAutomation = $stmtAutomation->fetch(
        PDO::FETCH_ASSOC
    );

    $automation = [
        'total' => (int) ($hasilAutomation['total'] ?? 0),

        'berhasil' => (int) ($hasilAutomation['berhasil'] ?? 0),

        'duplicate' => (int) ($hasilAutomation['duplicate'] ?? 0),

        'not_found' => (int) ($hasilAutomation['not_found'] ?? 0),

        'gagal' => (int) ($hasilAutomation['gagal'] ?? 0),

        'pending' => (int) ($hasilAutomation['pending'] ?? 0),

        'terakhir_update' => $hasilAutomation['terakhir_update'] ?? null,

        'periode_mulai' => $periodeMulai,

        'periode_selesai' => $periodeSelesai
    ];

    // ==========================================
    // MONITORING SIAPP
    // HASIL MONITORING TERAKHIR
    // ==========================================

    $monitoring = [
        'total_sk' => 0,
        'total_pegawai' => 0,
        'total_reminder' => 0,
        'total_spos' => 0,
        'total_npp' => 0,
        'total_ntp' => 0,
        'terakhir_update' => null,
        'batch_id' => null
    ];

    $stmtMonitoring = $db->query("
        SELECT
            batch_id,
            total_sk,
            total_pegawai,
            total_reminder,
            total_spos,
            total_npp,
            total_ntp,
            finished_at

        FROM monitoring_run

        ORDER BY id DESC
        LIMIT 1
    ");

    $hasilMonitoring = $stmtMonitoring->fetch(
        PDO::FETCH_ASSOC
    );

    if ($hasilMonitoring) {

        $monitoring = [
            'total_sk' => (int) ($hasilMonitoring['total_sk'] ?? 0),

            'total_pegawai' => (int) ($hasilMonitoring['total_pegawai'] ?? 0),

            'total_reminder' => (int) ($hasilMonitoring['total_reminder'] ?? 0),

            'total_spos' => (int) ($hasilMonitoring['total_spos'] ?? 0),

            'total_npp' => (int) ($hasilMonitoring['total_npp'] ?? 0),

            'total_ntp' => (int) ($hasilMonitoring['total_ntp'] ?? 0),

            'terakhir_update' => $hasilMonitoring['finished_at'],

            'batch_id' => $hasilMonitoring['batch_id']
        ];
    }

    // ==========================================
    // RESPONSE DASHBOARD
    // ==========================================

    echo json_encode([
        'success' => true,
        'automation' => $automation,
        'monitoring' => $monitoring
    ], JSON_UNESCAPED_UNICODE);

} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
