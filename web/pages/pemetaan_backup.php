
<style>
/* PEMETAAN DINAS LUAR */
.pemetaan-page {
    padding: 25px;
    color: #263445;
}

.pemetaan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
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

/* SUMMARY */
.pemetaan-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 25px;
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

/* FILTER */
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

.btn-pemetaan {
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
.pemetaan-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
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

    .pemetaan-filter {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media(max-width: 600px) {
    .pemetaan-summary,
    .pemetaan-wilayah,
    .pemetaan-filter {
        grid-template-columns: 1fr;
    }

    .pemetaan-section {
        overflow-x: auto;
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
                Pemetaan persebaran Surat Penagihan
                berdasarkan wilayah dan pegawai.
            </p>
        </div>

        <span class="pemetaan-label">
            Modul Pemetaan Wilayah
        </span>
    </div>

    <div class="pemetaan-info">
        Informasi pemetaan digunakan sebagai bahan koordinasi
        pelaksanaan dinas luar agar penagihan pada wilayah
        yang sama atau berdekatan dapat dikoordinasikan.
    </div>

    <!-- SUMMARY -->
    <div class="pemetaan-summary">

        <div class="pemetaan-card">
            <div class="card-title">Total Surat Penagihan</div>
            <div class="card-number">128</div>
            <div class="card-note">SK dalam hasil pemetaan</div>
        </div>

        <div class="pemetaan-card">
            <div class="card-title">Jumlah Kecamatan</div>
            <div class="card-number">18</div>
            <div class="card-note">Wilayah kerja Bangkalan</div>
        </div>

        <div class="pemetaan-card">
            <div class="card-title">Pegawai Terlibat</div>
            <div class="card-number">22</div>
            <div class="card-note">Pegawai pemilik SK</div>
        </div>

        <div class="pemetaan-card">
            <div class="card-title">Kelompok Wilayah</div>
            <div class="card-number">4</div>
            <div class="card-note">Zona koordinasi dinas luar</div>
        </div>

    </div>

    <!-- FILTER -->
    <div class="pemetaan-section">

        <h3>Filter Data Pemetaan</h3>

        <div class="pemetaan-filter">

            <div>
                <label>Periode SK</label>
                <select>
                    <option>Seluruh periode (+1 sampai +10 hari)</option>
                    <option>+1 sampai +3 hari</option>
                    <option>+4 sampai +7 hari</option>
                    <option>+8 sampai +10 hari</option>
                </select>
            </div>

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
                <label>Status Dinas Luar</label>
                <select>
                    <option>Belum Dinas Luar</option>
                    <option>Semua Status</option>
                </select>
            </div>

            <button class="btn-pemetaan" type="button">
                Tampilkan Data
            </button>

        </div>

    </div>

    <!-- RINGKASAN WILAYAH -->
    <div class="pemetaan-section">

        <h3>Ringkasan Persebaran Surat Penagihan</h3>

        <div class="pemetaan-wilayah">

            <div class="wilayah-card">
                <h4>Wilayah 1</h4>
                <div class="wilayah-total">42 SK</div>
                <div class="wilayah-caption">
                    5 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:100%"></span>
                </div>
            </div>

            <div class="wilayah-card">
                <h4>Wilayah 2</h4>
                <div class="wilayah-total">35 SK</div>
                <div class="wilayah-caption">
                    4 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:83%"></span>
                </div>
            </div>

            <div class="wilayah-card">
                <h4>Wilayah 3</h4>
                <div class="wilayah-total">28 SK</div>
                <div class="wilayah-caption">
                    5 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:67%"></span>
                </div>
            </div>

            <div class="wilayah-card">
                <h4>Wilayah 4</h4>
                <div class="wilayah-total">23 SK</div>
                <div class="wilayah-caption">
                    4 Kecamatan
                </div>
                <div class="wilayah-progress">
                    <span style="width:55%"></span>
                </div>
            </div>

        </div>

    </div>

    <!-- DETAIL DATA -->
    <div class="pemetaan-section">

        <h3>Detail Persebaran Surat Penagihan</h3>

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

        <div class="pemetaan-footer">
            * Tampilan ini merupakan contoh desain. Data belum
            terhubung dengan database SIAPP.
        </div>

    </div>

</div>
</div>
