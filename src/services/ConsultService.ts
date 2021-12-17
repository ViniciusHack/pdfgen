// @ts-nocheck
import axios from "axios"

class ConsultService {
  async execute() {
    const options = {
      method: 'POST',
      url: 'https://api.pipefy.com/graphql',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.PIPEFY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {query: '{ phase(id:309603490){ cards { edges { node { id title } } } } }'}
    };
    const { data } = await axios.request(options)
  
    return data
  
  }
}

export {ConsultService}