const qiniu = require('qiniu')

const accessKey = 'j-f639jgGaMMxh0pRFV5FvL321bwxaKVJB2RUm5m'
const secretKey = 'rz80FgGNABrjii290EGjlENjm8JU7lDJ9wS4YTWq'

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const options = {
    scope: 'codegorgeous-images'
}

const putPolicy = new qiniu.rs.PutPolicy(options)
const token = putPolicy.uploadToken(mac)


module.exports = {
    token,
    url: 'http://qiniu.codegorgeous.top/'
}