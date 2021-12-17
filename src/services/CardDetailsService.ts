//@ts-nocheck
import axios from "axios"
import { Request } from "express";

class CardDetailsService {
    async execute(request: Request) {
        const { id } = request.query
        const options = {
            method: 'POST',
            url: 'https://api.pipefy.com/graphql',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${process.env.PIPEFY_TOKEN}`,
              'Content-Type': 'application/json'
            },
            data: {
              query: ` { card(id:${id}) { id fields { name value } } } `
            }
          };

        const res = await axios.request(options)
        return res.data
    }
}

export { CardDetailsService }