import express from 'express';
import empresa from './empresa';
import persona from './persona';


const router = express.Router();

router.use('/empresas', empresa);
router.use('/personas', empresa);

export default router;