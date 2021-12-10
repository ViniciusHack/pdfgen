import { jsPDF } from 'jspdf'


interface IRequest {
    titles: string | string[],
    descriptions: string | string[]
}

interface IItems {
    title: string,
    description: string
}

class GeneratePDFService {
        execute({titles, descriptions}: IRequest) {
        if(Array.isArray(titles) && Array.isArray(descriptions)) {
            const items:Array<IItems> = []
            titles.forEach((title) => {
                const descriptionIndex = titles.indexOf(title)
                    const item = {
                        title,
                        description: descriptions[descriptionIndex]
                    }
                    items.push(item)
            })        
            const doc = new jsPDF();

            doc.setFontSize(12);
            // doc.setLineWidth(50)

            let X= 10;
            let Y= 10;

            let docContent = ''
            items.forEach(item => {
                const index = items.indexOf(item)
                const splitDesc: string[] = doc.splitTextToSize(item.description, 180)
                console.log(splitDesc)
                docContent += `${items[index].title}\n ${splitDesc.map( line => `${line}\n`)}\n\n`
            })
            doc.text(docContent, 10, 10)
            // items.forEach( item => {
            //     const splitDesc = doc.splitTextToSize(item.description, 180)
            //     const numberOfLines = Math.ceil( item.description.length / 80 )
            //     console.log(numberOfLines);
            //     doc.setFont('helvetica', 'bold')
            //     doc.text(item.title, X, Y)
            //     doc.setFont('helvetica', 'normal')
            //     doc.text(splitDesc, X+ 5, (Y + 5))
            //     Y = Y + 5 + (5 * numberOfLines)
            // })
            doc.save("a4.pdf");
            // return items
            
        }
        
        const item = {
            titles,
            descriptions
        }
        return item
    }
}

export { GeneratePDFService }