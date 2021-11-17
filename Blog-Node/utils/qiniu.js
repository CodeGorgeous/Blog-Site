const qiniu = require('qiniu')
const accessKey = 'j-f639jgGaMMxh0pRFV5FvL321bwxaKVJB2RUm5m'
const secretKey = 'rz80FgGNABrjii290EGjlENjm8JU7lDJ9wS4YTWq'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'codegorgeous-images'
}
const putPolicy = new qiniu.rs.PutPolicy(options);
// 拿到token
const token = putPolicy.uploadToken(mac)

// 七牛云文件直传
const config = new qiniu.conf.Config();
// 设置存储空间所在的地区
config.zone = qiniu.zone.Zone_z2;
const putExtra = new qiniu.form_up.PutExtra();
const formUploader = new qiniu.form_up.FormUploader(config);

function fileUpload(fileName, filePath, callback) {
    formUploader.putFile(token, fileName, filePath, putExtra, function(error, body, info) {
        callback(error, body, info)
    })
}

const bucketManager = new qiniu.rs.BucketManager(mac, config);

function deleteFile(fileName, callback) {
    bucketManager.delete('codegorgeous-images', fileName, (error, body, info) => {
        callback(error, body, info)
    })
}

module.exports = {
    token,
    url: 'http://qiniu.codegorgeous.top/',
    fileUpload,
    deleteFile
}