import { Request, Response } from "express"
import { GeneratePDFService } from "../services/GeneratePDFService";
import fs from 'fs'


const generatePDFService = new GeneratePDFService

class GeneratePDFController {
    handle(request: Request, response: Response) {
        generatePDFService.execute(request.body)
        return response.download(__dirname + '../../../a4.pdf')
    }
}


export { GeneratePDFController }