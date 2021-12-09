import { Request, Response } from "express"
import { GeneratePDFService } from "../services/GeneratePDFService";


const generatePDFService = new GeneratePDFService

class GeneratePDFController {
    handle(request: Request, response: Response) {
        console.log(request.body);
        console.log(`O título é ${request.body.title}, a descrição é ${request.body.description}`)
        const result = generatePDFService.execute(request.body)
        return response.json(result)
    }
}


export { GeneratePDFController }