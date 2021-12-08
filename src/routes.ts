import { Router } from 'express'
import { GeneratePDFController } from './controllers/GeneratePDFController'

const routes = Router()

const generatePDFController = new GeneratePDFController()

routes.get('/', (request, response) => response.render('GerenciadorComponentes'))

routes.post('/gen', ( request, response ) => generatePDFController.handle(request, response))

export { routes }