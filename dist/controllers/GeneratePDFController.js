"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePDFController = void 0;
const GeneratePDFService_1 = require("../services/GeneratePDFService");
const generatePDFService = new GeneratePDFService_1.GeneratePDFService;
class GeneratePDFController {
    handle(request, response) {
        generatePDFService.execute(request.body);
        return response.download(__dirname + '../../../a4.pdf');
    }
}
exports.GeneratePDFController = GeneratePDFController;
