function loadLog() {

    const log =
        document.getElementById(
            'log'
        )

    if (
        !log
    )
        return

    fetch(
        'api/log.php'
    )

        .then(
            r => r.text()
        )

        .then(data => {

            const isNearBottom =

                log.scrollHeight
                -
                log.scrollTop
                -
                log.clientHeight

                <

                50

            log.textContent =
                data

            if (
                isNearBottom
            ) {

                log.scrollTop =
                    log.scrollHeight

            }

        })

}

function loadStatus() {

    const status =
        document.getElementById(
            'status'
        )

    if (!status)
        return

    fetch(
        'api/status.php'
    )

        .then(
            r => r.json()
        )

        .then(data => {

            status.innerHTML =
                data.running
                    ? '🟡 Running'
                    : '🟢 Idle'

            const btn =
                document.getElementById(
                    'btnRun'
                )

            if (btn) {

                btn.disabled =
                    data.running

            }

        })

}

function runAutomation() {

    fetch(
        'api/clear-log.php'
    )

        .then(
            () =>
                fetch(
                    'api/run.php'
                )
        )

}

function clearLog() {

    fetch(
        'api/clear-log.php'
    )

        .then(
            () =>
                loadLog()
        )

}

// ====================
// PEGAWAI
// ====================

function loadPegawai() {

    const table =
        document.querySelector(
            '#pegawaiTable tbody'
        )

    if (!table)
        return

    fetch(
        'api/pegawai.php'
    )

        .then(
            r => r.json()
        )

        .then(rows => {

            table.innerHTML = ''

            rows.forEach(
                (
                    p,
                    i
                ) => {

                    table.innerHTML += `

<tr>

<td>
${i + 1}
</td>

<td>
${p.nama}
</td>

<td>

<span>

${p.aktif
                            ? '🟢 Aktif'
                            : '⚫ Nonaktif'}

</span>

</td>

<td>

<label class="switch">

<input
type="checkbox"

${p.aktif
                            ? 'checked'
                            : ''}

onchange="
togglePegawai(
${p.id},
this.checked
)
"

>

<span
class="slider">

</span>

</label>

</td>

</tr>

`

                }

            )

        })

}

function togglePegawai(
    id,
    checked
) {

    fetch(
        'api/update-pegawai.php',
        {

            method:
                'POST',

            headers: {

                'Content-Type':
                    'application/json'

            },

            body:

                JSON.stringify({

                    id,

                    aktif:
                        checked
                            ? 1
                            : 0

                })

        }

    )

        .then(
            () =>
                loadPegawai()
        )

}

// ====================

setInterval(
    loadLog,
    1000
)

setInterval(
    loadStatus,
    1000
)

function loadBatch() {

    const select =
        document.getElementById(
            'batch'
        )

    if (
        !select
    )
        return

    fetch(
        'api/batch.php'
    )

        .then(
            r => r.json()
        )

        .then(rows => {

            select.innerHTML = ''

            rows.forEach(b => {

                const tanggal = b.tanggal
                    ? (() => {

                        const d =
                            new Date(
                                b.tanggal
                            )

                        const bulan = [

                            'JANUARI',
                            'FEBRUARI',
                            'MARET',
                            'APRIL',
                            'MEI',
                            'JUNI',
                            'JULI',
                            'AGUSTUS',
                            'SEPTEMBER',
                            'OKTOBER',
                            'NOVEMBER',
                            'DESEMBER'

                        ]

                        const jam =
                            String(
                                d.getHours()
                            )
                                .padStart(
                                    2,
                                    '0'
                                )

                        const menit =
                            String(
                                d.getMinutes()
                            )
                                .padStart(
                                    2,
                                    '0'
                                )

                        const detik =
                            String(
                                d.getSeconds()
                            )
                                .padStart(
                                    2,
                                    '0'
                                )

                        return `

${d.getDate()}
${bulan[
                            d.getMonth()
                            ]}
${d.getFullYear()},
${jam}:${menit}:${detik}

`

                            .trim()

                    })()

                    : '-'

                select.innerHTML += `

<option
value="${b.batch_id}">

${b.batch_id}
—
${tanggal}

</option>

`

            })

            new TomSelect(
                '#batch',
                {

                    create: false,

                    sortField: []

                }

            )

        })

}

function downloadExcel() {

    const batch =

        document
            .getElementById(
                'batch'
            )
            .value

    const result =
        document
            .getElementById(
                'result'
            )

    result.innerHTML =
        '⏳ Membuat Excel...'

    fetch(

        'api/export.php?batch='
        +
        batch

    )

        .then(
            r => r.json()
        )

        .then(data => {

            if (
                !data.success
            ) {

                result.innerHTML =
                    '❌ Export gagal'

                return

            }

            result.innerHTML =

                `

<div
style="margin-top:20px;">

<div
style="
color:#16a34a;
font-weight:bold;
margin-bottom:15px;
">

✅ Export berhasil

</div>

<button
onclick="
window.open(
'api/download.php?file=${data.file}'
)
">

📥 Download File

</button>

<button
onclick="
openFolder()
"

style="
margin-left:10px;
">

📂 Buka Folder Arsip

</button>

</div>

`

        })

}

function openFolder() {

    fetch(
        'api/open-folder.php'
    )

}

loadLog()

loadStatus()

loadPegawai()

loadBatch()