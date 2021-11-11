const express = require('express');
const router = express.Router()
const resourcesService = require('../../services/resources')

router.get('/', async(req, res) => {
    const result = await resourcesService.getAllResourcesType();
    res.send(result)
})

router.get('/type', async(req, res) => {
    const result = await resourcesService.getResources(req.query.id)
    res.send(result)
})

router.post('/', async(req, res) => {
    const result = await resourcesService.createClassification(req.body.type, req.body.uid)
    res.send(result)
})

router.post('/type', async(req, res) => {
    const result = await resourcesService.createResourcesType(req.body.name, req.body.uid, req.body.uid)
    res.send(result)
})

router.post('/mes', async(req, res) => {
    const body = req.body;
    const result = await resourcesService.createResources(body.name, body.url, body.image, body.introduce, body.tags, body.id, body.uid)
    res.send(result)
})

router.get('/mes', async(req, res) => {
    const result = await resourcesService.createResources(req.query.uid)
    res.send(result)
})

module.exports = router