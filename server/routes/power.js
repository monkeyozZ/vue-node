'use strict'

import express from 'express'
import Power from '../Application/Admin/PowerController'
const router = express.Router()

router.get('/index', Power.index)
router.post('/insert', Power.insert)

export default router