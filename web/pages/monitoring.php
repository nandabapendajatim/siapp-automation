<div class="card shadow-sm">

    <h2 class="mb-4">
        Monitoring SIAPP
    </h2>

    <!-- STATUS -->

    <div

        id="monitoringStatus"

        class="alert alert-info mb-3">

        <b>🔵 Siap dijalankan</b>

    </div>

    <!-- PROGRESS BAR -->

    <div class="mb-4">

        <div

            class="d-flex justify-content-between mb-2">

            <strong>

                Progress Monitoring

            </strong>

            <span id="progressPercent">

                0%

            </span>

        </div>

        <div

            class="progress"

            style="height:28px; border-radius:8px;">

            <div

                id="progressBar"

                class="progress-bar bg-success progress-bar-striped progress-bar-animated"

                role="progressbar"

                style="

                    width:0%;

                    transition:width .5s ease;

                    font-weight:bold;

                ">

                0%

            </div>

        </div>

    </div>

    <!-- INFO -->

    <div
        style="
        display:flex;
        gap:15px;
        margin:20px 0;
    ">

        <div
            style="
        flex:1;
        background:#fff;
        border-radius:10px;
        padding:18px;
        box-shadow:0 3px 12px rgba(0,0,0,.08);
    ">

            <div class="title">
                👤 Pegawai
            </div>

            <div
                id="currentPegawai"
                class="value">

                -

            </div>

        </div>

        <div
            style="
        flex:1;
        background:#fff;
        border-radius:10px;
        padding:18px;
        box-shadow:0 3px 12px rgba(0,0,0,.08);
    ">

            <div class="title">
                📄 Menu
            </div>

            <div
                id="currentMenu"
                class="value">

                -

            </div>

        </div>

        <div
            style="
        flex:1;
        background:#fff;
        border-radius:10px;
        padding:18px;
        box-shadow:0 3px 12px rgba(0,0,0,.08);
    ">

            <div class="title">
                📊 Progress
            </div>

            <div
                id="currentProgress"
                class="value">

                0 / 0

            </div>

        </div>

    </div>

    <!-- BUTTON -->

    <div class="mb-4">

        <button

            id="btnMonitoring"

            class="btn btn-primary me-2"

            onclick="runMonitoring()">

            ▶ Jalankan Monitoring

        </button>

        <button

            class="btn btn-success me-2"

            onclick="downloadMonitoringExcel()">

            📥 Download Excel

        </button>

        <button
            class="btn btn-warning me-2"
            onclick="generatePreviewWA()">

            💬 Generate Preview

        </button>

        <button

            class="btn btn-secondary"

            disabled>

            🚀 Kirim WA

        </button>

    </div>
    <br />

    <!-- TERMINAL -->

    <div

        style="

            background:#111827;

            color:#00ff66;

            border-radius:10px;

            padding:15px;

            box-shadow:inset 0 0 12px rgba(0,0,0,.6);

        ">

        <div

            style="

                color:#ffffff;

                margin-bottom:10px;

                font-weight:bold;

                border-bottom:1px solid #333;

                padding-bottom:8px;

            ">

            💻 Live Monitoring Log

        </div>

        <div

            id="monitoringLog"

            style="

                height:450px;

                overflow-y:auto;

                font-family:Consolas;

                font-size:13px;

                white-space:pre-wrap;

            ">

            Belum ada proses.

        </div>

    </div>

    <hr>

    <h5>
        📱 Preview WhatsApp
    </h5>

    <div
        id="waPreview"
        style="
        background:#f8f9fa;
        border:1px solid #ddd;
        border-radius:8px;
        padding:15px;
        min-height:250px;
        white-space:pre-wrap;
        font-family:Consolas;
    ">

        Belum dibuat.

    </div>

</div>


<script src="assets/js/monitoring.js"></script>