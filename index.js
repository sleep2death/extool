const path = require('path')
const {exec} = require('child_process')
const {dialog} = require('electron').remote

$('#config button').click(() => {
  dialog.showOpenDialog(
    {properties: ['openDirectory']},
    folder => {
      folder = folder[0]
      $('#config input').val(folder)
      $('#config button').text('checking').attr('disabled', 'disabled')

      checkSVNStatus(folder, isOK => {
        console.log(isOK)
      })
    }
  )
})

function checkSVNStatus(folder, callback) {
  exec(`cd ${folder} && svn info`, (error, stdout, stderr) => {
    if(error !== null) console.log(error)
    console.log(stdout, stderr)
    callback(true)
  })
}

