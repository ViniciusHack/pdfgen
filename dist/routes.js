"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const GeneratePDFController_1 = require("./controllers/GeneratePDFController");
const ConsultControlller_1 = require("./controllers/ConsultControlller");
const CardDetailsController_1 = require("./controllers/CardDetailsController");
const routes = (0, express_1.Router)();
exports.routes = routes;
const generatePDFController = new GeneratePDFController_1.GeneratePDFController();
const consultController = new ConsultControlller_1.ConsultController();
const cardDetailsController = new CardDetailsController_1.CardDetailsController();
routes.get('/', (request, response) => response.render('GerenciadorComponentes'));
routes.post('/', (request, response) => generatePDFController.handle(request, response));
routes.get('/consult', (request, response) => consultController.handle(request, response));
routes.get('/card', (request, response) => cardDetailsController.handle(request, response));