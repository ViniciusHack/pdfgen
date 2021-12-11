import { Request, Response } from "express"
import { GeneratePDFService } from "../services/GeneratePDFService";


const generatePDFService = new GeneratePDFService

class GeneratePDFController {
    handle(request: Request, response: Response) {
        const result = generatePDFService.execute(request.body)
        return response.json(result)
    }
}


export { GeneratePDFController }