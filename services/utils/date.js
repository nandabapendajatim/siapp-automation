function nowJakarta() {

  const date = new Date()

  const formatter = new Intl.DateTimeFormat(
    'sv-SE',
    {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  )

  return formatter
    .format(date)
    .replace(' ', ' ')

}

function parseTanggal(str) {

  if (!str || str === '-') {
    return null
  }

  const [dd, mm, yyyy] =
    str.split('/')

  return new Date(
    yyyy,
    mm - 1,
    dd
  )
}

function selisihHari(tanggal) {

  if (!tanggal) {
    return 0
  }

  const now =
    new Date()

  const diff =
    now - tanggal

  return Math.floor(
    diff /
    (1000 * 60 * 60 * 24)
  )
}

module.exports = {
  nowJakarta,
  parseTanggal,
  selisihHari
}