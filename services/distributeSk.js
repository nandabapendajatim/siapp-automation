const db = require('../database/db')

async function distributeSk(batchId) {

  
  console.log('')
  console.log('=========================')
  console.log('DISTRIBUTE SK')
  console.log('=========================')
  console.log('BATCH ID:', batchId)

  // =========================
  // RESET PEMBAGIAN
  // =========================

  db.prepare(`
    UPDATE sk_data
    SET pegawai_id = NULL
    WHERE status_proses = 'pending'
    AND batch_id = ?
  `).run(batchId)

  console.log('Reset pembagian selesai')

  // =========================
  // RANDOM URUTAN PEGAWAI
  // =========================

  db.prepare(`
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
    WHERE aktif = 1
  `).run()

  console.log('Random urutan pegawai selesai')

  // =========================
  // AMBIL PEGAWAI
  // =========================

  const pegawaiList = db.prepare(`
    SELECT *
    FROM pegawai
    WHERE aktif = 1
    ORDER BY urutan ASC
  `).all()

  console.log('')
  console.log('URUTAN PEGAWAI HARI INI')

  pegawaiList.forEach(p => {

    console.log(
      p.urutan,
      '-',
      p.nama
    )

  })

  // =========================
  // VALIDASI PEGAWAI
  // =========================

  if (pegawaiList.length === 0) {

    console.log('Tidak ada pegawai aktif')

    return

  }

  console.log(
    'Total pegawai:',
    pegawaiList.length
  )

  // =========================
  // LIST JENIS SURAT
  // =========================

  const jenisSuratList = [
    'SPOS',
    'NPP',
    'NTP',
    'ETULNTP'
  ]

  for (const jenisSurat of jenisSuratList) {

    console.log('')
    console.log('=========================')
    console.log('JENIS SURAT:', jenisSurat)
    console.log('=========================')

    // =========================
    // AMBIL SK
    // =========================

    const skList = db.prepare(`
      SELECT *
      FROM sk_data
      WHERE pegawai_id IS NULL
      AND status_proses = 'pending'
      AND batch_id = ?
      AND jenis_surat = ?

      ORDER BY

        jenis_surat ASC,

        CASE

          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL MLAJAH' THEN 1
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL KEMAYORAN' THEN 2
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL PANGERANAN' THEN 3
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL DEMANGAN' THEN 4
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL KRATON' THEN 5
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL PEJAGAN' THEN 6
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'KEL BANCARAN' THEN 7
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'DS UJUNG PIRING' THEN 8
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'DS SEMBILANGAN' THEN 9
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'DS KRAMAT' THEN 10
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'DS MARTAJASAH' THEN 11
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'DS SABIYAN' THEN 12
          WHEN sk_data.kecamatan = 'BANGKALAN' AND sk_data.desa = 'DS GEBANG' THEN 13

          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'KEL TONJUNG' THEN 14
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS JAMBUH' THEN 15
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS LANGKAP' THEN 16
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS BURNEH' THEN 17
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS BANANGKAH' THEN 18
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS AROK' THEN 19
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS KAPOR' THEN 20
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS SOBIH' THEN 21
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS PANGOLANGAN' THEN 22
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS ALAS KEMBANG' THEN 23
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS BINOH' THEN 24
          WHEN sk_data.kecamatan = 'BURNEH' AND sk_data.desa = 'DS PERRENG' THEN 25

          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS SANGGRA''AGUNG' THEN 26
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS PARSEH' THEN 27
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS BILAPORAH' THEN 28
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS JADDIH' THEN 29
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS BULUH' THEN 30
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS KELEYAN' THEN 31
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS SOCAH' THEN 32
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS JUNGANYAR' THEN 33
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS DAKIRING' THEN 34
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS PATAONAN' THEN 35
          WHEN sk_data.kecamatan = 'SOCAH' AND sk_data.desa = 'DS PERNAJUH' THEN 36

          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS TAJUNGAN' THEN 37
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS GILI BARAT' THEN 38
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS BANYUAJUH' THEN 39
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS KAMAL' THEN 40
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS TANJUNG JATI' THEN 41
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS KEBUN' THEN 42
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS GILI TIMUR' THEN 43
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS GILI ANYAR' THEN 44
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS TELANG' THEN 45
          WHEN sk_data.kecamatan = 'KAMAL' AND sk_data.desa = 'DS PENDABAH' THEN 46

          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS PANDANLANJANG' THEN 47
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS BATONAONG' THEN 48
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS GLAGGA' THEN 49
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS BERBELUK' THEN 50
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS TAMBEGAN' THEN 51
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS CENDAGAH' THEN 52
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS MANGKON' THEN 53
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS KARANGPAO' THEN 54
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS MAKAM AGUNG' THEN 55
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS DLEMMER' THEN 56
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS KARANG DUWAK' THEN 57
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS OMBUL' THEN 58
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS BALUNG' THEN 59
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS LAJING' THEN 60
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS TENGKET' THEN 61
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS AROSBAYA' THEN 62
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS PLAKARAN' THEN 63
          WHEN sk_data.kecamatan = 'AROSBAYA' AND sk_data.desa = 'DS BUDURAN' THEN 64

          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS LERPAK' THEN 65
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS DABUNG' THEN 66
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS KATOL BARAT' THEN 67
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS BANYUNENG LAOK' THEN 68
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS BANYUNENG DAJA' THEN 69
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS KOMBANGAN' THEN 70
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS GEGER' THEN 71
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS BATOBELLA' THEN 72
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS TOGUBANG' THEN 73
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS TEGARPRIYAH' THEN 74
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS CAMPOR' THEN 75
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS KAMPAK' THEN 76
          WHEN sk_data.kecamatan = 'GEGER' AND sk_data.desa = 'DS KOMPOL' THEN 77

          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS TOLBUK' THEN 78
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS RA''AS' THEN 79
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS MOARAH' THEN 80
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS KLAMPIS' THEN 81
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS KARANGASEM' THEN 82
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS BANTEYAN' THEN 83
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS BRAGANG' THEN 84
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS LERGUNUNG' THEN 85
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS PENYAKSAGAN' THEN 86
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS LARANGAN GLTNG' THEN 87
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS MANONGGAL' THEN 88
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS LARANGANSORJAN' THEN 89
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS TENGGUN DAJAH' THEN 90
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS BULUNG' THEN 91
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS TROGAN' THEN 92
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS KO''OL' THEN 93
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS TOBADDUNG' THEN 94
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS MRANDUNG' THEN 95
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS BULUKAGUNG' THEN 96
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS BATOR' THEN 97
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS KLAMPIS BARAT' THEN 98
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS KLAMPIS TIMUR' THEN 99
          WHEN sk_data.kecamatan = 'KLAMPIS' AND sk_data.desa = 'DS POLONGAN' THEN 100

          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS KLAPAYAN' THEN 101
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS BANGSEREH' THEN 102
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS KELBUNG' THEN 103
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS SAPLASAH' THEN 104
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS GUNELAP' THEN 105
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS TANAHGURAH TMR' THEN 106
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS TANAHGURAH BRT' THEN 107
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS BANYEOR' THEN 108
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS KALABETAN' THEN 109
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS GANGSEYAN' THEN 110
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS MANERON' THEN 111
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS SEPULU' THEN 112
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS PRANCAK' THEN 113
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS LABUHAN' THEN 114
          WHEN sk_data.kecamatan = 'SEPULU' AND sk_data.desa = 'DS LEMBUNG PASESE' THEN 115

          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS PLANGGIRAN' THEN 116
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS TAGUNGGUH' THEN 117
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS BANDANG DAJAH' THEN 118
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS BUNGKENG' THEN 119
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS LARANGAN TIMUR' THEN 120
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS TAMBAK POCOK' THEN 121
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS BUMI ANYAR' THEN 122
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS PASESEH' THEN 123
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS TLAGA BIRU' THEN 124
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS TANJUNG BUMI' THEN 125
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS MACAJAH' THEN 126
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS TLANGOH' THEN 127
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS AENGTABAR' THEN 128
          WHEN sk_data.kecamatan = 'TANJUNG BUMI' AND sk_data.desa = 'DS BANYUSANGKAH' THEN 129

          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS DURJAN' THEN 130
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS TLOKOH' THEN 131
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS KOKOP' THEN 132
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS MANO''AN' THEN 133
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS MANDUNG' THEN 134
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS BANDANG LAOK' THEN 135
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS DUPOK' THEN 136
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS TRAMOK' THEN 137
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS AMPARA''AN' THEN 138
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS LEMBUNG GUNONG' THEN 139
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS KATOL TIMUR' THEN 140
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS BANDA SOLEH' THEN 141
          WHEN sk_data.kecamatan = 'KOKOP' AND sk_data.desa = 'DS BATUKOROGAN' THEN 142

          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS TEBUL' THEN 143
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS KWANYAR BARAT' THEN 144
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS PESANGGRAHAN' THEN 145
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS KARANGANYAR' THEN 146
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS BATAH BARAT' THEN 147
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS BATAH TIMUR' THEN 148
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS DUWAK BUTER' THEN 149
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS PANDANAN' THEN 150
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS KARANGENTANG' THEN 151
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS JANTEH' THEN 152
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS DLEMER' THEN 153
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS KETETANG' THEN 154
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS MOROMBUH' THEN 155
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS SOMOR KONENG' THEN 156
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS PAORAN' THEN 157
          WHEN sk_data.kecamatan = 'KWANYAR' AND sk_data.desa = 'DS GUNONG SERENG' THEN 158

          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS PANCENTAN' THEN 159
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS BAIPAJUNG' THEN 160
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS TANAHMERAHLAOK' THEN 161
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS KRANGGAN BARAT' THEN 162
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS PANGELEYAN' THEN 163
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS PADURUNGAN' THEN 164
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS TANAHMERAHDAJA' THEN 165
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS PETRAH' THEN 166
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS JANGKAR' THEN 167
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS PETTONG' THEN 168
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS LANDAK' THEN 169
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS BATANGAN' THEN 170
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS RONGDURIN' THEN 171
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS TLOMAR' THEN 172
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS KENDABAN' THEN 173
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS DUMAJAH' THEN 174
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS PATEMON' THEN 175
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS MRECAH' THEN 176
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS DLAMBAH LAOK' THEN 177
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS DLAMBAH DAJAH' THEN 178
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS BUDDAN' THEN 179
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS POTER' THEN 180
          WHEN sk_data.kecamatan = 'TANAH MERAH' AND sk_data.desa = 'DS BESANAH' THEN 181

          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS MASARAN' THEN 182
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS BANCANG' THEN 183
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS JA''AH' THEN 184
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS KETELENG' THEN 185
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS ALANG-ALANG' THEN 186
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS KEMONENG' THEN 187
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS SOKET LAOK' THEN 188
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS BAJEMAN' THEN 189
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS TAMBIN' THEN 190
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS SOKET DAJAH' THEN 191
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS DUKOTAMBIN' THEN 192
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS KARANG LEMAN' THEN 193
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS TRAGAH' THEN 194
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS POCONG' THEN 195
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS PACANGAN' THEN 196
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS PAMORAH' THEN 197
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS BANYUBESIH' THEN 198
          WHEN sk_data.kecamatan = 'TRAGAH' AND sk_data.desa = 'DS JADDUNG' THEN 199

          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS KESEK' THEN 200
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS PANGPONG' THEN 201
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS SUKOLILO BARAT' THEN 202
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS SUKOLILO TIMUR' THEN 203
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS BUNAJIH' THEN 204
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS BRINGEN' THEN 205
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS BA''ENGAS' THEN 206
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS MORKEPEK' THEN 207
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS LABANG' THEN 208
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS JUKONG' THEN 209
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS SENDANG LAOK' THEN 210
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS SENDANG DAJAH' THEN 211
          WHEN sk_data.kecamatan = 'LABANG' AND sk_data.desa = 'DS PETAPAN' THEN 212

          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS PANJALINAN' THEN 213
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS PANGERAN GDNGN' THEN 214
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KO''OLAN' THEN 215
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KANPAO' THEN 216
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS GIGIR' THEN 217
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS LOMBANG DAJAH' THEN 218
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS LOMBANG LAOK' THEN 219
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS ROSEP' THEN 220
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS BLEGA' THEN 221
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS NYORMANES' THEN 222
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KARPOTE' THEN 223
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KAJJAN' THEN 224
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS ALAS RAJAH' THEN 225
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS BLEGAOLOH' THEN 226
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KARANG NANGKAH' THEN 227
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KARANG PANASAN' THEN 228
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS KARANG GAYAM' THEN 229
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS LOMAER' THEN 230
          WHEN sk_data.kecamatan = 'BLEGA' AND sk_data.desa = 'DS BATES' THEN 231

          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS PANGPAJUNG' THEN 232
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS PATEREMAN' THEN 233
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS KOLLA' THEN 234
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS PAENG' THEN 235
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS NEROH' THEN 236
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS SRABI TIMUR' THEN 237
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS SRABI BARAT' THEN 238
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS PATENGTENG' THEN 239
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS LANGPANGGANG' THEN 240
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS SUWA''AN' THEN 241
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS MODUNG' THEN 242
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS BRAKAS DAJAH' THEN 243
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS KARANGANYAR' THEN 244
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS MANGGA''AN' THEN 245
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS GLISGIS' THEN 246
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS PAKONG' THEN 247
          WHEN sk_data.kecamatan = 'MODUNG' AND sk_data.desa = 'DS ALASKOKON' THEN 248

          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS CAMPOR' THEN 249
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS SAMBIYAN' THEN 250
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS CANGKAREMAN' THEN 251
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS SEN ASSEN' THEN 252
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS KONANG' THEN 253
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS GENTENG' THEN 254
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS BANDUNG' THEN 255
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS PAKES' THEN 256
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS DURIAN TIMOR' THEN 257
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS DURIN BARAT' THEN 258
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS GALIS DAJAH' THEN 259
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS KANEGARA' THEN 260
          WHEN sk_data.kecamatan = 'KONANG' AND sk_data.desa = 'DS BATOKABAN' THEN 261

          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS KAJUANAK' THEN 262
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS PATERONGAN' THEN 263
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS DALEMAN' THEN 264
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS TELLOK' THEN 265
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS BLATERAN' THEN 266
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS KELBUNG' THEN 267
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS TLAGAH' THEN 268
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS LANTEK TEMOR' THEN 269
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS BANYUBUNIH' THEN 270
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS LONGKEK' THEN 271
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS GALIS' THEN 272
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS PEKADAN' THEN 273
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS PAKA''AN LAOK' THEN 274
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS PAKA''AN DAJAH' THEN 275
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS KRANGGAN TIMUR' THEN 276
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS SEPARAH' THEN 277
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS LANTEK BARAT' THEN 278
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS BANJAR' THEN 279
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS BANGPENDAH' THEN 280
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS SADAH' THEN 281
          WHEN sk_data.kecamatan = 'GALIS' AND sk_data.desa = 'DS SORPA' THEN 282
          ELSE 9999

        END ASC,

        nopol ASC
    `).all(batchId, jenisSurat)

    // =========================
    // VALIDASI SK
    // =========================

    if (skList.length === 0) {

      console.log('Tidak ada SK pending')

      continue

    }

    console.log(
      'Total SK:',
      skList.length
    )

    // =========================
    // HITUNG PEMBAGIAN
    // =========================

    const baseSize = Math.floor(
      skList.length / pegawaiList.length
    )

    const remainder =
      skList.length % pegawaiList.length

    console.log('')
    console.log(
      'Pembagian dasar:',
      baseSize
    )

    console.log(
      'Sisa pembagian:',
      remainder
    )

    // =========================
    // DISTRIBUTE
    // =========================

    let currentIndex = 0

    for (
      let pegawaiIndex = 0;
      pegawaiIndex < pegawaiList.length;
      pegawaiIndex++
    ) {

      const pegawai =
        pegawaiList[pegawaiIndex]

      // =========================
      // EXTRA UNTUK SISA
      // =========================

      const extra =
        pegawaiIndex < remainder
          ? 1
          : 0

      const currentBlockSize =
        baseSize + extra

      // =========================
      // AMBIL BLOK SK
      // =========================

      const skBlock = skList.slice(
        currentIndex,
        currentIndex + currentBlockSize
      )

      console.log('')
      console.log('-------------------------')
      console.log(
        'PEGAWAI:',
        pegawai.nama
      )
      console.log(
        'URUTAN :',
        pegawai.urutan
      )
      console.log(
        'TOTAL SK :',
        skBlock.length
      )
      console.log('-------------------------')

      // =========================
      // UPDATE DATABASE
      // =========================

      for (const sk of skBlock) {

        db.prepare(`
          UPDATE sk_data
          SET pegawai_id = ?
          WHERE id = ?
        `).run(
          pegawai.id,
          sk.id
        )

        console.log(
          `${sk.no_entri} => ${pegawai.nama}`
        )

      }

      // =========================
      // PINDAH INDEX
      // =========================

      currentIndex += currentBlockSize

    }
  }

  // =========================
  // SUMMARY
  // =========================

  console.log('')
  console.log('=========================')
  console.log('SUMMARY PEMBAGIAN')
  console.log('=========================')

  for (const pegawai of pegawaiList) {

    const total = db.prepare(`
      SELECT COUNT(*) as total
      FROM sk_data
      WHERE pegawai_id = ?
      AND status_proses = 'pending'
    `).get(pegawai.id)

    console.log(
      pegawai.nama,
      '=',
      total.total,
      'SK'
    )

  }

  console.log('')
  console.log('=========================')
  console.log('DISTRIBUTE SELESAI')
  console.log('=========================')

}

module.exports = distributeSk