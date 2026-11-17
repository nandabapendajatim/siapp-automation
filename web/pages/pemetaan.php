<style>
    /* =====================================
   PEMETAAN DINAS LUAR - SIAPP
===================================== */

    .pemetaan-page {
        padding: 25px;
        color: #263445;
    }

    .pemetaan-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
        flex-wrap: wrap;
        gap: 15px;
    }

    .pemetaan-header h1 {
        font-size: 25px;
        margin: 0 0 7px;
    }

    .pemetaan-header p {
        color: #7b8794;
        margin: 0;
        font-size: 14px;
    }

    .pemetaan-label {
        background: #e8f5ee;
        color: #16834d;
        padding: 8px 14px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
    }

    .pemetaan-info {
        background: #eef5ff;
        border-left: 4px solid #3478d4;
        padding: 13px 16px;
        border-radius: 7px;
        font-size: 13px;
        color: #45617f;
        margin-bottom: 22px;
    }

    /* CARD */
    .pemetaan-section {
        background: white;
        border: 1px solid #e9edf2;
        border-radius: 11px;
        padding: 20px;
        margin-bottom: 22px;
    }

    .pemetaan-section h3 {
        margin: 0 0 18px;
        font-size: 16px;
    }

    /* PROSES HARIAN */
    .proses-pemetaan {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .proses-description {
        flex: 1;
        min-width: 240px;
    }

    .proses-description h3 {
        margin-bottom: 8px;
    }

    .proses-description p {
        font-size: 13px;
        color: #7b8794;
        line-height: 1.6;
        margin: 0;
    }

    .proses-meta {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin-top: 14px;
    }

    .proses-meta-item {
        font-size: 12px;
        color: #687586;
    }

    .proses-meta-item strong {
        display: block;
        color: #263445;
        font-size: 13px;
        margin-top: 4px;
    }

    .btn-proses {
        background: #2367c9;
        color: white;
        border: none;
        padding: 13px 20px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
    }

    .btn-proses:hover {
        background: #1856ad;
    }

    /* STATUS PROSES */
    .proses-status {
        margin-top: 20px;
        padding-top: 17px;
        border-top: 1px solid #edf0f3;
    }

    .proses-status-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        gap: 10px;
        flex-wrap: wrap;
    }

    .proses-status-header strong {
        font-size: 13px;
    }

    .status-success {
        background: #e8f5ee;
        color: #16834d;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
    }

    .proses-steps {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
    }

    .proses-step {
        background: #f7f9fb;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #edf0f3;
    }

    .proses-step .step-number {
        width: 23px;
        height: 23px;
        background: #e4f4eb;
        color: #16834d;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        margin-bottom: 9px;
    }

    .proses-step strong {
        display: block;
        font-size: 12px;
        margin-bottom: 5px;
    }

    .proses-step span {
        font-size: 10px;
        color: #84909d;
    }

    /* SUMMARY */
    .pemetaan-summary {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 22px;
    }

    .pemetaan-card {
        background: white;
        border: 1px solid #e9edf2;
        border-radius: 11px;
        padding: 19px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .025);
    }

    .pemetaan-card .card-title {
        font-size: 13px;
        color: #7b8794;
        margin-bottom: 12px;
    }

    .pemetaan-card .card-number {
        font-size: 27px;
        font-weight: 700;
        color: #263445;
    }

    .pemetaan-card .card-note {
        font-size: 11px;
        color: #8b96a3;
        margin-top: 7px;
    }

    .card-green .card-number {
        color: #16834d;
    }

    .card-orange .card-number {
        color: #c27a17;
    }

    /* BREAKDOWN JENIS SK */
    .jenis-sk {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }

    .jenis-sk-item {
        background: #f8fafc;
        border: 1px solid #edf0f3;
        border-radius: 8px;
        padding: 15px;
    }

    .jenis-sk-item span {
        color: #84909d;
        font-size: 12px;
    }

    .jenis-sk-item strong {
        display: block;
        font-size: 22px;
        margin-top: 7px;
    }

    /* FILTER */
    .pemetaan-filter {
        display: grid;
        grid-template-columns: repeat(3, 1fr) auto;
        gap: 15px;
        align-items: end;
    }

    .pemetaan-filter label {
        display: block;
        font-size: 12px;
        color: #687586;
        margin-bottom: 7px;
    }

    .pemetaan-filter select,
    .pemetaan-filter input {
        width: 100%;
        padding: 11px;
        border: 1px solid #dce2e9;
        border-radius: 7px;
        background: white;
        color: #344256;
        box-sizing: border-box;
    }

    .btn-filter {
        background: #2367c9;
        color: white;
        border: none;
        padding: 12px 19px;
        border-radius: 7px;
        cursor: pointer;
        font-weight: 600;
    }

    /* WILAYAH */
    .pemetaan-wilayah {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 15px;
    }

    .wilayah-card {
        border: 1px solid #e7ecf2;
        border-radius: 9px;
        padding: 17px;
        background: #fbfcfe;
    }

    .wilayah-card h4 {
        margin: 0 0 7px;
        font-size: 14px;
    }

    .wilayah-card .wilayah-total {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 12px;
    }

    .wilayah-card .wilayah-caption {
        color: #84909d;
        font-size: 11px;
    }

    .wilayah-progress {
        height: 7px;
        background: #e9edf2;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 12px;
    }

    .wilayah-progress span {
        display: block;
        height: 100%;
        background: #318568;
        border-radius: 10px;
    }

    /* TABLE */
    .pemetaan-table-wrapper {
        overflow-x: auto;
    }

    .pemetaan-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
        min-width: 650px;
    }

    .pemetaan-table th {
        background: #f5f7fa;
        color: #667386;
        font-weight: 600;
        text-align: left;
        padding: 13px;
    }

    .pemetaan-table td {
        padding: 14px 13px;
        border-bottom: 1px solid #edf0f3;
    }

    .pemetaan-table tr:hover {
        background: #fafcff;
    }

    .badge-status {
        background: #fff4df;
        color: #a66a0b;
        padding: 5px 9px;
        border-radius: 20px;
        font-size: 11px;
    }

    .btn-detail {
        color: #2367c9;
        text-decoration: none;
        font-weight: 600;
    }

    /* DATA TIDAK TERIDENTIFIKASI */
    .peringatan-box {
        background: #fffaf0;
        border: 1px solid #f4dfb7;
        border-radius: 9px;
        padding: 16px;
        margin-bottom: 17px;
    }

    .peringatan-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 7px;
    }

    .peringatan-icon {
        background: #fff0d2;
        color: #bd7915;
        width: 34px;
        height: 34px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
    }

    .peringatan-header strong {
        font-size: 14px;
    }

    .peringatan-box p {
        color: #8b6a32;
        font-size: 12px;
        line-height: 1.6;
        margin: 0;
    }

    .badge-warning {
        background: #fff0d2;
        color: #a66a0b;
        padding: 5px 9px;
        border-radius: 20px;
        font-size: 11px;
    }

    /* FOOTER */
    .pemetaan-footer {
        color: #8994a1;
        font-size: 11px;
        margin-top: 15px;
    }

    @media(max-width: 1000px) {

        .pemetaan-summary,
        .pemetaan-wilayah {
            grid-template-columns: repeat(2, 1fr);
        }

        .proses-steps {
            grid-template-columns: repeat(2, 1fr);
        }

        .pemetaan-filter {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media(max-width: 600px) {

        .pemetaan-summary,
        .pemetaan-wilayah,
        .jenis-sk,
        .pemetaan-filter,
        .proses-steps {
            grid-template-columns: 1fr;
        }

        .pemetaan-page {
            padding: 15px;
        }
    }


    /* Tombol Lihat Pegawai */
    .btn-detail {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 14px;
        background: #2563eb;
        color: #ffffff;
        border: 1px solid #2563eb;
        border-radius: 7px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.2s;
    }

    .btn-detail:hover {
        background: #1d4ed8;
    }

    /* Modal Detail Pegawai */
    .modal-pegawai-prioritas {
        width: min(720px, 94vw);
        max-height: 85vh;
        padding: 0;
        border: none;
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
        overflow: auto;
    }

    .modal-pegawai-prioritas::backdrop {
        background: rgba(15, 23, 42, 0.55);
    }

    .modal-pegawai-content {
        padding: 24px;
    }

    .modal-pegawai-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
    }

    .modal-pegawai-header h3 {
        margin: 0;
        font-size: 18px;
    }

    .modal-pegawai-close {
        background: #f1f5f9;
        border: none;
        border-radius: 6px;
        width: 32px;
        height: 32px;
        font-size: 22px;
        cursor: pointer;
    }

    .modal-pegawai-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }

    .btn-tutup-pegawai {
        padding: 9px 20px;
        background: #f1f5f9;
        color: #334155;
        border: 1px solid #cbd5e1;
        border-radius: 7px;
        font-weight: 600;
        cursor: pointer;
    }

    .btn-tutup-pegawai:hover {
        background: #e2e8f0;
    }
</style>


<div class="card">
    <div class="pemetaan-page">

        <!-- HEADER -->
        <div class="pemetaan-header">
            <div>
                <h1>Pemetaan Dinas Luar</h1>
                <p>
                    Pengambilan dan pemetaan persebaran Surat Penagihan
                    berdasarkan wilayah dan pegawai.
                </p>
            </div>

            <span class="pemetaan-label">
                Modul Pemetaan Wilayah
            </span>
        </div>

        <div class="pemetaan-info">
            Pemetaan dilakukan secara berkala dengan mengambil data
            Surat Penagihan kendaraan R4 dari SIAPP dalam 10 hari terakhir
            pada bulan berjalan. Hasil pengolahan digunakan sebagai
            bahan koordinasi pelaksanaan dinas luar.
        </div>

        <!-- PROSES PEMETAAN -->
        <div class="pemetaan-section">

            <div class="proses-pemetaan">
                <div class="proses-description">
                    <h3>Proses Pemetaan Harian</h3>

                    <p>
                        Jalankan satu proses untuk mengambil data SPOS,
                        NPP, dan NTP dari SIAPP. Sistem melakukan
                        penyaringan kendaraan R4 yang belum dinas luar,
                        identifikasi kecamatan, dan pengelompokan
                        berdasarkan wilayah koordinasi serta pegawai.
                    </p>

                    <div class="proses-meta">
                        <div class="proses-meta-item">
                            Periode pengambilan
                            <strong id="periodePemetaan">
                                10 Hari Terakhir
                            </strong>
                        </div>

                        <div class="proses-meta-item">
                            Jenis surat
                            <strong>SPOS, NPP, NTP</strong>
                        </div>

                        <div class="proses-meta-item">
                            Filter utama
                            <strong>R4 - Belum Dinas Luar</strong>
                        </div>
                    </div>
                </div>

                <button
                    id="btnProsesPemetaan"
                    class="btn-proses"
                    type="button"
                    onclick="runPemetaan()">
                    ▶ &nbsp; Mulai Proses Pemetaan
                </button>
            </div>

            <!-- STATUS PROSES -->
            <div class="proses-status">

                <div class="proses-status-header">
                    <strong>Tahapan Proses Terakhir</strong>

                    <span
                        id="statusPemetaan"
                        class="status-success">
                        Memuat data...
                    </span>
                </div>

                <div class="proses-steps">

                    <div class="proses-step">
                        <div class="step-number">✓</div>
                        <strong>Pengambilan Data</strong>
                        <span id="stepPengambilan">-</span>
                    </div>

                    <div class="proses-step">
                        <div class="step-number">✓</div>
                        <strong>Penyaringan SK</strong>
                        <span id="stepPenyaringan">-</span>
                    </div>

                    <div class="proses-step">
                        <div class="step-number">✓</div>
                        <strong>Identifikasi Wilayah</strong>
                        <span id="stepIdentifikasi">-</span>
                    </div>

                    <div class="proses-step">
                        <div class="step-number">✓</div>
                        <strong>Pengelompokan</strong>
                        <span id="stepPengelompokan">-</span>
                    </div>

                    <div class="proses-step">
                        <div class="step-number">✓</div>
                        <strong>Penyimpanan Hasil</strong>
                        <span id="stepPenyimpanan">-</span>
                    </div>

                </div>

                <div class="pemetaan-footer" id="terakhirDiproses">
                    Terakhir diproses: -
                </div>
            </div>
        </div>

        <!-- SUMMARY -->
        <div class="pemetaan-summary">

            <div class="pemetaan-card">
                <div class="card-title">
                    Total SK Diambil dari SIAPP
                </div>
                <div class="card-number" id="totalDiambil">-</div>
                <div class="card-note">
                    Seluruh kendaraan dan tanggal yang diambil
                </div>
            </div>

            <div class="pemetaan-card card-green">
                <div class="card-title">
                    SK R4 Berhasil Dipetakan
                </div>
                <div class="card-number" id="totalDipetakan">-</div>
                <div class="card-note" id="catatanDipetakan">
                    SK R4 belum dinas luar
                </div>
            </div>

            <div class="pemetaan-card card-orange">
                <div class="card-title">
                    SK Tidak Teridentifikasi
                </div>
                <div class="card-number" id="totalPengecualian">-</div>
                <div class="card-note">
                    Perlu pemeriksaan kecamatan
                </div>
            </div>

            <div class="pemetaan-card">
                <div class="card-title">
                    Kelompok Wilayah
                </div>
                <div class="card-number" id="totalWilayah">4</div>
                <div class="card-note" id="catatanWilayah">
                    18 kecamatan
                </div>
            </div>

        </div>

        <!-- RINGKASAN JENIS SURAT -->
        <div class="pemetaan-section">

            <h3>Ringkasan Jenis Surat R4 Belum DL</h3>

            <div class="jenis-sk">

                <div class="jenis-sk-item">
                    <span>SPOS</span>
                    <strong id="jumlahSPOS">-</strong>
                </div>

                <div class="jenis-sk-item">
                    <span>NPP</span>
                    <strong id="jumlahNPP">-</strong>
                </div>

                <div class="jenis-sk-item">
                    <span>NTP</span>
                    <strong id="jumlahNTP">-</strong>
                </div>

            </div>
        </div>

        <!-- FILTER -->
        <div class="pemetaan-section">

            <h3>Filter Hasil Pemetaan</h3>

            <div class="pemetaan-filter">

                <div>
                    <label for="filterWilayah">Wilayah</label>
                    <select id="filterWilayah">
                        <option value="">Semua Wilayah</option>
                    </select>
                </div>

                <div>
                    <label for="filterKecamatan">Kecamatan</label>
                    <select id="filterKecamatan">
                        <option value="">Semua Kecamatan</option>
                    </select>
                </div>

                <div>
                    <label for="filterPegawai">Pegawai</label>
                    <select id="filterPegawai">
                        <option value="">Semua Pegawai</option>
                    </select>
                </div>

                <button
                    id="btnFilterPemetaan"
                    class="btn-filter"
                    type="button">
                    Tampilkan
                </button>

            </div>
        </div>

        <!-- RINGKASAN WILAYAH -->
        <div class="pemetaan-section">

            <h3>Ringkasan Persebaran Surat Penagihan</h3>

            <div class="pemetaan-wilayah" id="ringkasanWilayah">

                <div class="wilayah-card">
                    <h4>Wilayah 1</h4>
                    <div class="wilayah-total">-</div>
                    <div class="wilayah-caption">4 Kecamatan</div>
                    <div class="wilayah-progress">
                        <span style="width:0%"></span>
                    </div>
                </div>

                <div class="wilayah-card">
                    <h4>Wilayah 2</h4>
                    <div class="wilayah-total">-</div>
                    <div class="wilayah-caption">4 Kecamatan</div>
                    <div class="wilayah-progress">
                        <span style="width:0%"></span>
                    </div>
                </div>

                <div class="wilayah-card">
                    <h4>Wilayah 3</h4>
                    <div class="wilayah-total">-</div>
                    <div class="wilayah-caption">5 Kecamatan</div>
                    <div class="wilayah-progress">
                        <span style="width:0%"></span>
                    </div>
                </div>

                <div class="wilayah-card">
                    <h4>Wilayah 4</h4>
                    <div class="wilayah-total">-</div>
                    <div class="wilayah-caption">5 Kecamatan</div>
                    <div class="wilayah-progress">
                        <span style="width:0%"></span>
                    </div>
                </div>

            </div>
        </div>


        <!-- ANALISIS PRIORITAS PENAGIHAN -->
        <div class="pemetaan-section">

            <h3>Analisis Prioritas Penagihan</h3>

            <div class="jenis-sk">

                <div class="jenis-sk-item">
                    <span>Kecamatan dengan SK Terbanyak</span>
                    <strong id="prioritasKecamatanSK">-</strong>
                    <div class="pemetaan-footer" id="prioritasJumlahSK">
                        - SK belum DL
                    </div>
                </div>

                <div class="jenis-sk-item">
                    <span>Kecamatan dengan PKB Terbesar</span>
                    <strong id="prioritasKecamatanPKB">-</strong>
                    <div class="pemetaan-footer" id="prioritasNominalPKB">
                        Rp0
                    </div>
                </div>

                <div class="jenis-sk-item">
                    <span>Total PKB Belum DL</span>
                    <strong id="prioritasTotalPKB">-</strong>
                    <div class="pemetaan-footer">
                        Berdasarkan hasil pemetaan terakhir
                    </div>
                </div>

            </div>

            <div class="pemetaan-table-wrapper"
                style="margin-top:20px">

                <table class="pemetaan-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Kecamatan</th>
                            <th>Wilayah</th>
                            <th>Jumlah SK</th>
                            <th>Total PKB</th>
                            <th>Pegawai</th>
                            <th>Detail</th>
                        </tr>
                    </thead>

                    <tbody id="tabelPrioritasPemetaan">
                        <tr>
                            <td colspan="7"
                                style="text-align:center">
                                Memuat analisis prioritas...
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>


            <!-- MODAL DETAIL PEGAWAI PRIORITAS -->
            <dialog id="detailPegawaiPrioritas"
                class="modal-pegawai-prioritas">

                <div class="modal-pegawai-content">

                    <div class="modal-pegawai-header">
                        <h3 id="judulDetailPegawaiPrioritas">
                            Detail Pegawai Kecamatan
                        </h3>

                        <button type="button"
                            class="modal-pegawai-close"
                            onclick="tutupPegawaiPrioritas()"
                            aria-label="Tutup">
                            &times;
                        </button>
                    </div>

                    <div class="pemetaan-table-wrapper">
                        <table class="pemetaan-table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Nama Pegawai</th>
                                    <th>Jumlah SK</th>
                                    <th>Total PKB</th>
                                </tr>
                            </thead>
                            <tbody id="tabelPegawaiPrioritas"></tbody>
                        </table>
                    </div>

                    <div class="pemetaan-footer"
                        id="catatanPegawaiPrioritas">
                    </div>

                    <div class="modal-pegawai-footer">
                        <button type="button"
                            class="btn-tutup-pegawai"
                            onclick="tutupPegawaiPrioritas()">
                            Tutup
                        </button>
                    </div>

                </div>

            </dialog>


            <div class="pemetaan-footer">
                Prioritas ditampilkan berdasarkan jumlah SK
                belum dinas luar. Nominal PKB digunakan
                sebagai informasi pendukung perencanaan
                penagihan.
            </div>

        </div>

        <!-- DETAIL PERSEBARAN -->
        <div class="pemetaan-section">

            <h3>Detail Persebaran Surat Penagihan</h3>

            <div class="pemetaan-table-wrapper">

                <table class="pemetaan-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Wilayah</th>
                            <th>Kecamatan</th>
                            <th>Pegawai</th>
                            <th>Jumlah SK</th>
                            <th>Status</th>
                            <th>Detail</th>
                        </tr>
                    </thead>

                    <tbody id="tabelDetailPemetaan">
                        <tr>
                            <td colspan="7" style="text-align:center">
                                Memuat data pemetaan...
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

        <!-- DATA TIDAK TERIDENTIFIKASI -->
        <div class="pemetaan-section">

            <h3>Data SK Tidak Teridentifikasi</h3>

            <div class="peringatan-box">

                <div class="peringatan-header">
                    <div class="peringatan-icon">!</div>

                    <strong id="jumlahTidakTeridentifikasi">
                        Memuat data...
                    </strong>

                    <span class="badge-warning">
                        Perlu perhatian
                    </span>
                </div>

                <p>
                    Data SK yang kecamatannya belum dapat diidentifikasi
                    tetap dicatat untuk pemeriksaan manual. Data tersebut
                    tidak menghambat pemetaan SK lainnya.
                </p>

            </div>

            <div class="pemetaan-table-wrapper">

                <table class="pemetaan-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nomor SK</th>
                            <th>Jenis SK</th>
                            <th>Nama WP</th>
                            <th>Alamat</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>

                    <tbody id="tabelPengecualian">
                        <tr>
                            <td colspan="6" style="text-align:center">
                                Memuat data...
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="pemetaan-footer">
                Data tidak teridentifikasi tetap dicatat untuk
                pemeriksaan dan tindak lanjut secara manual.
            </div>

        </div>

        <div class="pemetaan-footer">
            SIAPP Automation - Modul Pemetaan Dinas Luar
        </div>

    </div>
</div>

<script src="/assets/js/pemetaan.js?v=10"></script>