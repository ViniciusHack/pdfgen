import { jsPDF } from 'jspdf'


interface IRequest {
    proposal: string,
    company: string,
    cnpj: string,
    adress: string,
    responsible: string,
    phone: string,
    email: string,
    head: string,
    titles: string | string[],
    descriptions: string | string[],
}

interface IItems {
    title: string,
    description: string
}

class GeneratePDFService {
        execute({proposal, company, adress, responsible, head, cnpj, phone, email, titles, descriptions}: IRequest) {


        const infos = {
                proposal,
                company,
                cnpj,
                adress,
                responsible,
                phone,
                email,
                head,
        }

        const items:Array<IItems> = []

        if(Array.isArray(titles) && Array.isArray(descriptions)) {
            titles.forEach((title) => {
                const descriptionIndex = titles.indexOf(title)
                    const item = {
                        title,
                        description: descriptions[descriptionIndex]
                    }
                    items.push(item)
        })}       
                
        
        const item = {
            titles,
            descriptions
        }


        const doc = new jsPDF();
        
        let X= 10;
        let Y= 10;

        doc.setFontSize(12);
        
        function setBoldAndOrange(bool: boolean) {
            if(bool) {
                doc.setFont('helvetica', 'bold')
                return doc.setTextColor(255, 70, 70)
            }
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0,0,0)
        }

        // HEADER

        setBoldAndOrange(true)
        doc.text("PROPOSTA N", X+61, Y)
        setBoldAndOrange(false)
        doc.text('°' + infos.proposal, X+89, Y)
        Y+= 15

        setBoldAndOrange(true)
        doc.text("Empresa:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.company, X+20, Y)
        Y += 7

        setBoldAndOrange(true)
        doc.text("CNPJ:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.cnpj, X+14, Y)
        Y += 7

        setBoldAndOrange(true)
        doc.text("Endereço:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.adress, X+22, Y)
        Y += 7

        setBoldAndOrange(true)
        doc.text("Resnponsável:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.responsible, X+31, Y)
        Y += 7

        setBoldAndOrange(true)
        doc.text("Telefone:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.phone, X+22, Y)
        Y += 7
        
        setBoldAndOrange(true)
        doc.text("Email:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.email, X+14, Y)
        Y+=7

        setBoldAndOrange(true)
        doc.text("Head de Negócios:", X,Y)
        setBoldAndOrange(false)
        doc.text(infos.head, X+39, Y)
        Y+= 15


        // ITENS
        items.forEach( item => {
            const splitDesc = doc.splitTextToSize(item.description, 180)
            const widthArr = item.description.length / 0.55
            const numberOfLines = Math.ceil( widthArr / 180 )
            doc.setFont('helvetica', 'bold')
            doc.text(item.title, X, Y)
            doc.setFont('helvetica', 'normal')
            doc.text(splitDesc, X+ 5, (Y + 5))
            Y = Y + 15 + (5 * numberOfLines)
        })

        doc.save("a4.pdf");

        return {proposal, company, cnpj, adress, responsible, phone, email, head, titles, descriptions}
    }
}

export { GeneratePDFService }