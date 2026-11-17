<div class="card dashboard-page">

    <!-- HEADER DASHBOARD -->
    <div class="dashboard-header">
        <div>
            <h2>Dashboard SIAPP Automation</h2>
            <p>
                Ringkasan operasional penagihan
                kendaraan bermotor Samsat Bangkalan
            </p>
        </div>
    </div>

    <!-- STATISTIK UTAMA -->
    <div class="dashboard-stats">

        <div class="dashboard-stat-card">
            <div class="dashboard-stat-label">
                Entry Otomatis R2
            </div>
            <div class="dashboard-stat-value" id="dashEntryR2">
                -
            </div>
            <div class="dashboard-stat-caption">
                SK berhasil di-entry otomatis
            </div>
        </div>

        <div class="dashboard-stat-card">
            <div class="dashboard-stat-label">
                Monitoring SIAPP
            </div>
            <div class="dashboard-stat-value" id="dashMonitoring">
                -
            </div>
            <div class="dashboard-stat-caption">
                Total SK hasil monitoring terakhir
            </div>
        </div>

        <div class="dashboard-stat-card">
            <div class="dashboard-stat-label">
                SK R4 Belum DL
            </div>
            <div class="dashboard-stat-value" id="dashBelumDL">
                -
            </div>
            <div class="dashboard-stat-caption">
                Hasil pemetaan terakhir
            </div>
        </div>

        <div class="dashboard-stat-card">
            <div class="dashboard-stat-label">
                Potensi PKB R4
            </div>
            <div class="dashboard-stat-value" id="dashPotensiPKB">
                -
            </div>
            <div class="dashboard-stat-caption">
                Potensi dari SK R4 belum DL
            </div>
        </div>

    </div>

    <!-- RINGKASAN MODUL -->
    <section class="dashboard-section">

        <div class="dashboard-section-header">
            <h3>Ringkasan Modul Utama</h3>
            <p>
                Informasi berdasarkan hasil proses
                terakhir masing-masing modul
            </p>
        </div>

        <div class="dashboard-modules">

            <!-- AUTOMATION -->
            <div class="dashboard-module-card">
                <div class="dashboard-module-title">
                    Automation Entry
                    <span class="dashboard-module-tag">R2</span>
                </div>

                <div class="dashboard-module-info">
                    <span>Berhasil Entry</span>
                    <strong id="dashAutoBerhasil">-</strong>
                </div>

                <div class="dashboard-module-info">
                    <span>Gagal Entry</span>
                    <strong id="dashAutoGagal">-</strong>
                </div>

                <div class="dashboard-module-update"
                    id="dashAutoUpdate">
                    Belum ada informasi pembaruan
                </div>

                <a href="?page=automation"
                    class="dashboard-module-link">
                    Lihat Detail
                </a>
            </div>

            <!-- MONITORING -->

            <div class="dashboard-module-card">

                <div class="dashboard-module-title">
                    Monitoring SIAPP
                    <span class="dashboard-module-tag">R2 & R4</span>
                </div>

                <div class="dashboard-module-info">
                    <span>Total SK</span>
                    <strong id="dashMonitorR2">-</strong>
                </div>

                <div class="dashboard-module-info">
                    <span>Perlu Reminder</span>
                    <strong id="dashMonitorR4">-</strong>
                </div>

                <div class="dashboard-module-update" id="dashMonitorUpdate">
                    Belum ada informasi pembaruan
                </div>

                <a href="?page=monitoring" class="dashboard-module-link">
                    Lihat Detail
                </a>

            </div>

            <!-- PEMETAAN -->
            <div class="dashboard-module-card">
                <div class="dashboard-module-title">
                    Pemetaan Dinas Luar
                    <span class="dashboard-module-tag">R4</span>
                </div>

                <div class="dashboard-module-info">
                    <span>SK Teridentifikasi</span>
                    <strong id="dashPemetaanSK">-</strong>
                </div>

                <div class="dashboard-module-info">
                    <span>Kecamatan Teridentifikasi</span>
                    <strong id="dashPemetaanKecamatan">-</strong>
                </div>

                <div class="dashboard-module-update"
                    id="dashPemetaanUpdate">
                    Belum ada informasi pembaruan
                </div>

                <a href="?page=pemetaan"
                    class="dashboard-module-link">
                    Lihat Detail
                </a>
            </div>

        </div>

    </section>

    <!-- PRIORITAS PENAGIHAN -->
    <section class="dashboard-section">

        <div class="dashboard-section-header">
            <h3>Prioritas Penagihan R4</h3>
            <p>
                Lima kecamatan dengan jumlah SK
                belum dinas luar terbanyak
            </p>
        </div>

        <div class="dashboard-table-wrapper">
            <table class="dashboard-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Kecamatan</th>
                        <th>Wilayah</th>
                        <th>Jumlah SK</th>
                        <th>Potensi PKB</th>
                    </tr>
                </thead>

                <tbody id="dashTabelPrioritas">
                    <tr>
                        <td colspan="5"
                            style="text-align:center">
                            Menunggu data dashboard...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="dashboard-note">
            Prioritas berdasarkan jumlah SK R4 belum DL.
            Nominal PKB merupakan potensi penagihan,
            bukan realisasi penerimaan.
        </div>

    </section>

</div>

<script src="/assets/js/dashboard.js?v=1" defer></script>