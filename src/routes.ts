import { Router } from 'express'
import { GeneratePDFController } from './controllers/GeneratePDFController'
import { ConsultController } from './controllers/ConsultControlller'
import { CardDetailsController } from './controllers/CardDetailsController'

const routes = Router()

const generatePDFController = new GeneratePDFController()
const consultController = new ConsultController()
const cardDetailsController = new CardDetailsController()

routes.get('/', (request, response) => response.render('GerenciadorComponentes'))

routes.post('/', ( request, response ) => generatePDFController.handle(request, response))
routes.get('/consult', ( request, response ) => consultController.handle(request, response))
routes.get('/card', ( request, response ) => cardDetailsController.handle(request, response))

export { routes }