
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
    box-shadow: 0 2px 7px rgba(0,0,0,.025);
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
        Surat Penagihan dari SIAPP dalam 10 hari terakhir.
        Hasil pengolahan digunakan sebagai bahan koordinasi
        pelaksanaan dinas luar.
    </div>


    <!-- PROSES PEMETAAN -->
    <div class="pemetaan-section">

        <div class="proses-pemetaan">

            <div class="proses-description">
                <h3>Proses Pemetaan Harian</h3>

                <p>
                    Jalankan satu proses untuk mengambil data
                    SPOS, NPP, dan NTP dari SIAPP, kemudian
                    sistem akan melakukan penyaringan,
                    identifikasi kecamatan, dan pengelompokan
                    wilayah secara otomatis.
                </p>

                <div class="proses-meta">

                    <div class="proses-meta-item">
                        Periode pengambilan
                        <strong>10 Hari Terakhir</strong>
                    </div>

                    <div class="proses-meta-item">
                        Jenis surat
                        <strong>SPOS, NPP, NTP</strong>
                    </div>

                    <div class="proses-meta-item">
                        Filter utama
                        <strong>Belum Dinas Luar</strong>
                    </div>

                </div>
            </div>

            <button class="btn-proses" type="button">
                ▶ &nbsp; Mulai Proses Pemetaan
            </button>

        </div>


        <!-- STATUS TAHAPAN -->
        <div class="proses-status">

            <div class="proses-status-header">
                <strong>Tahapan Proses Terakhir</strong>
                <span class="status-success">
                    ✓ Berhasil dengan catatan
                </span>
            </div>

            <div class="proses-steps">

                <div class="proses-step">
                    <div class="step-number">✓</div>
                    <strong>Pengambilan Data</strong>
                    <span>100 SK berhasil diambil</span>
                </div>

                <div class="proses-step">
                    <div class="step-number">✓</div>
                    <strong>Penyaringan SK</strong>
                    <span>86 SK belum DL</span>
                </div>

                <div class="proses-step">
                    <div class="step-number">✓</div>
                    <strong>Identifikasi Wilayah</strong>
                    <span>85 SK teridentifikasi</span>
                </div>

                <div class="proses-step">
                    <div class="step-number">✓</div>
                    <strong>Pengelompokan</strong>
                    <span>4 wilayah koordinasi</span>
                </div>

                <div class="proses-step">
                    <div class="step-number">✓</div>
                    <strong>Penyimpanan Hasil</strong>
                    <span>Hasil pemetaan tersimpan</span>
                </div>

            </div>

            <div class="pemetaan-footer">
                Terakhir diproses: 2 November 2026, 08:00 WIB
            </div>

        </div>

    </div>


    <!-- SUMMARY -->
    <div class="pemetaan-summary">

        <div class="pemetaan-card">
            <div class="card-title">Total SK Berhasil Diambil</div>
            <div class="card-number">100</div>
            <div class="card-note">Dari SIAPP dalam 10 hari terakhir</div>
        </div>

        <div class="pemetaan-card card-green">
            <div class="card-title">SK Berhasil Dipetakan</div>
            <div class="card-number">100</div>
            <div class="card-note">Dari 86 SK yang belum DL</div>
        </div>

        <div class="pemetaan-card card-orange">
            <div class="card-title">SK Tidak Teridentifikasi</div>
            <div class="card-number">0</div>
            <div class="card-note">Alamat tidak dapat ditentukan</div>
        </div>

        <div class="pemetaan-card">
            <div class="card-title">Kelompok Wilayah</div>
            <div class="card-number">4</div>
            <div class="card-note">18 kecamatan</div>
        </div>

    </div>


    <!-- RINGKASAN JENIS SURAT -->
    <div class="pemetaan-section">

        <h3>Ringkasan Jenis Surat yang Diambil</h3>

        <div class="jenis-sk">

            <div class="jenis-sk-item">
                <span>SPOS</span>
                <strong>50 SK</strong>
            </div>

            <div class="jenis-sk-item">
                <span>NPP</span>
                <strong>30 SK</strong>
            </div>

            <div class="jenis-sk-item">
                <span>NTP</span>
                <strong>20 SK</strong>
            </div>

        </div>

    </div>


    <!-- FILTER -->
    <div class="pemetaan-section">

        <h3>Filter Hasil Pemetaan</h3>

        <div class="pemetaan-filter">

            <div>
                <label>Wilayah</label>
                <select>
                    <option>Semua Wilayah</option>
                    <option>Wilayah 1</option>
                    <option>Wilayah 2</option>
                    <option>Wilayah 3</option>
                    <option>Wilayah 4</option>
                </select>
            </div>

            <div>
                <label>Kecamatan</label>
                <select>
                    <option>Semua Kecamatan</option>
                    <option>Kecamatan A</option>
                    <option>Kecamatan B</option>
                    <option>Kecamatan C</option>
                </select>
            </div>

            <div>
                <label>Pegawai</label>
                <select>
                    <option>Semua Pegawai</option>
                    <option>Pegawai 1</option>
                    <option>Pegawai 2</option>
                </select>
            </div>

            <button class="btn-filter" type="button">
                Tampilkan
            </button>

        </div>

    </div>


    <!-- RINGKASAN WILAYAH -->
    <div class="pemetaan-section">

        <h3>Ringkasan Persebaran Surat Penagihan</h3>

        <div class="pemetaan-wilayah">

            <div class="wilayah-card">
                <h4>Wilayah 1</h4>
                <div class="wilayah-total">35 SK</div>
                <div class="wilayah-caption">
                    5 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:100%"></span>
                </div>
            </div>

            <div class="wilayah-card">
                <h4>Wilayah 2</h4>
                <div class="wilayah-total">25 SK</div>
                <div class="wilayah-caption">
                    4 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:71%"></span>
                </div>
            </div>

            <div class="wilayah-card">
                <h4>Wilayah 3</h4>
                <div class="wilayah-total">15 SK</div>
                <div class="wilayah-caption">
                    5 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:43%"></span>
                </div>
            </div>

            <div class="wilayah-card">
                <h4>Wilayah 4</h4>
                <div class="wilayah-total">10 SK</div>
                <div class="wilayah-caption">
                    4 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:29%"></span>
                </div>
            </div>

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

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>Wilayah 1</td>
                        <td>Kecamatan A</td>
                        <td>Pegawai 1</td>
                        <td>12</td>
                        <td><span class="badge-status">Belum DL</span></td>
                        <td><a href="#" class="btn-detail">Lihat</a></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Wilayah 1</td>
                        <td>Kecamatan A</td>
                        <td>Pegawai 2</td>
                        <td>8</td>
                        <td><span class="badge-status">Belum DL</span></td>
                        <td><a href="#" class="btn-detail">Lihat</a></td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>Wilayah 2</td>
                        <td>Kecamatan B</td>
                        <td>Pegawai 3</td>
                        <td>15</td>
                        <td><span class="badge-status">Belum DL</span></td>
                        <td><a href="#" class="btn-detail">Lihat</a></td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>Wilayah 3</td>
                        <td>Kecamatan C</td>
                        <td>Pegawai 4</td>
                        <td>9</td>
                        <td><span class="badge-status">Belum DL</span></td>
                        <td><a href="#" class="btn-detail">Lihat</a></td>
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
                <strong>
                    1 SK belum dapat dimasukkan ke pemetaan
                </strong>
                <span class="badge-warning">
                    Perlu perhatian
                </span>
            </div>

            <p>
                Pengambilan data SIAPP berhasil. Namun, terdapat
                data alamat wajib pajak yang belum dapat
                diidentifikasi kecamatannya. Data ini tidak
                menghambat hasil pemetaan SK lainnya.
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

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>CONTOH/SK/001</td>
                        <td>SPOS</td>
                        <td>Wajib Pajak Contoh</td>
                        <td>Alamat tidak lengkap</td>
                        <td>
                            <span class="badge-warning">
                                Kecamatan tidak ditemukan
                            </span>
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

        <div class="pemetaan-footer">
            Data yang tidak teridentifikasi tetap dicatat untuk
            keperluan pemeriksaan dan tindak lanjut secara manual.
        </div>

    </div>


    <div class="pemetaan-footer">
        SIAPP Automation - Modul Pemetaan Dinas Luar
    </div>

</div>
</div>
