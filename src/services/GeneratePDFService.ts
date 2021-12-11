import { jsPDF } from 'jspdf'


interface IRequest {
    proposal: string,
    company: string,
    cnpj: string,
    address: string,
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
        execute({proposal, company, address, responsible, head, cnpj, phone, email, titles, descriptions}: IRequest) {


        const infos = {
                proposal,
                company,
                cnpj,
                address,
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
        
        function setBold(set: boolean, orange?: boolean) {
            if(set) {
                if(orange) {
                    doc.setFont('helvetica', 'bold')
                    return doc.setTextColor(255, 70, 70)
                }
                return doc.setFont('helvetica', 'bold')
            }
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0,0,0)
        }

        const pageHeight = doc.internal.pageSize.height // 297
        // HEADER

        setBold(true, true)
        doc.text("PROPOSTA N", X+71, Y)
        setBold(false)
        doc.text('°' + infos.proposal, X+99, Y)
        Y+= 15

        setBold(true, true)
        doc.text("Empresa:", X,Y)
        setBold(false)
        doc.text(infos.company, X+20, Y)
        Y += 7

        setBold(true, true)
        doc.text("CNPJ:", X,Y)
        setBold(false)
        doc.text(infos.cnpj, X+14, Y)
        Y += 7

        setBold(true, true)
        doc.text("Endereço:", X,Y)
        setBold(false)
        doc.text(infos.address, X+22, Y)
        Y += 7

        setBold(true, true)
        doc.text("Resnponsável:", X,Y)
        setBold(false)
        doc.text(infos.responsible, X+31, Y)
        Y += 7

        setBold(true, true)
        doc.text("Telefone:", X,Y)
        setBold(false)
        doc.text(infos.phone, X+22, Y)
        Y += 7
        
        setBold(true, true)
        doc.text("Email:", X,Y)
        setBold(false)
        doc.text(infos.email, X+14, Y)
        Y+=7

        setBold(true, true)
        doc.text("Head de Negócios:", X,Y)
        setBold(false)
        doc.text(infos.head, X+39, Y)
        Y+= 15


        // ITENS
        items.forEach( item => {
            const splitDesc: string[] = doc.splitTextToSize(item.description, 180)
            // const widthArr = item.description.length / 0.55
            // const numberOfLines = Math.ceil( widthArr / 180 )
            if(Y + 5 >= pageHeight - 10) {
                doc.addPage()
                Y = 10
            }

            setBold(true)
            doc.text(item.title, X, Y)
            Y+=5
            splitDesc.forEach( line => {
                if(Y >= pageHeight - 10) {
                    doc.addPage()
                    Y = 10
                }
                setBold(false)
                doc.text(line, X+5, Y)
                Y+= 5
            })
            // if( Y + numberOfLines * 5 >= pageHeight - 10) {
            //     doc.addPage()
            //     Y = 10
            //     doc.setFont('helvetica', 'bold')
            //     doc.text(item.title, X, Y)
            //     doc.setFont('helvetica', 'normal')
            //     doc.text(splitDesc, X+ 5, (Y + 5))
            //     Y = Y + 15 + (5 * numberOfLines)
            // }
            // doc.setFont('helvetica', 'bold')
            // doc.text(item.title, X, Y)
            // doc.setFont('helvetica', 'normal')
            // doc.text(splitDesc, X+ 5, (Y + 5))
            // Y += 15 + (5 * numberOfLines)
            Y+= 10
        })

        doc.save("a4.pdf");

        return {proposal, company, cnpj, address, responsible, phone, email, head, titles, descriptions}
    }
}

export { GeneratePDFService }