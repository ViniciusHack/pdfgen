import { ConsultService } from "../services/ConsultService"
import { Request, Response } from 'express'


class ConsultController {
    async handle(request: Request, response: Response) {
        const service = new ConsultService()
        const result = await service.execute()
        return response.json(result)
    }
}

export { ConsultController }