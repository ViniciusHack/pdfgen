import { Request, Response } from "express"
import { CardDetailsService } from "../services/CardDetailsService"

class CardDetailsController {
    async handle(request: Request, response: Response) {
        const service = new CardDetailsService()
        const result = await service.execute(request)
        return response.json(result)
    }
}

export { CardDetailsController }