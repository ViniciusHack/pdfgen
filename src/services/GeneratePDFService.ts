import  jsPDF  from 'jspdf'
require('dotenv/config')

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
    investment: number
}

interface IItems {
    title: string,
    description: string
}

class GeneratePDFService {
        execute({proposal, company, address, responsible, head, cnpj, phone, email, investment, titles, descriptions}: IRequest) {
        if(titles === undefined || descriptions === undefined) throw new Error("Por favor, crie ao menos um componente")

        const doc = new jsPDF();

        let X= 10;
        let Y= 32;

        doc.setFontSize(12);
        
        function setBold(set: boolean, orange?: boolean) {
            if(set) {
                if(orange) {
                    doc.setFont('helvetica', 'bold')
                    return doc.setTextColor(250, 68, 35)
                }
                return doc.setFont('helvetica', 'bold')
            }
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(0,0,0)
        }
        

        function formatHeader(str: string, info: string, x: number):void {
            setBold(true, true)
            doc.text(`${str}:`, X,Y)
            setBold(false)
            doc.text(info, X+x, Y)
            Y += 7
        }
        
        function formatItem(title?: string, description?: string, orange?: boolean) {
            setBold(true)
            let descriptionSplit:string[] = []
            if(description) {
                descriptionSplit= doc.splitTextToSize(description, 180) 
            }
            if(Y + 5 >= pageHeight - 10) {
                doc.addPage()
                Y = 10
            }
                        
            doc.text(`${title}`, X, Y)
            Y+=7
            descriptionSplit.forEach( line => {
                if(Y >= pageHeight - 10) {
                    doc.addPage()
                    Y = 10
                }
                setBold(false)
                if(orange) {
                    doc.setTextColor(250, 68, 35)
                }
                doc.setFontSize(12)
                doc.text(line, X, Y)
                Y+= 5
            })
            Y+= 10
            return doc.setTextColor(0,0,0)
        }

        
        const pageHeight = doc.internal.pageSize.height // 297
        doc.addImage(`data:image/png;base64,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`,
         'png', X+35, Y, 120, 28)
        Y+=40

        doc.text("Nome Fantasia: Integrare Assessoria de Marketing \nRazão Social: Integrare Company LTDA \nCNPJ: 33.047.345/0001-85 \nEndereço: Benjamin Constant, nº 3228, sala 04 - Bairro Costa e Silva, Joinville, SC - Brasil", X, Y)
        Y+=40
        doc.setDrawColor(200, 200, 200);
        doc.line(X, Y- 14, 200, Y- 14)
        setBold(true, true)
        doc.text("PROPOSTA N", X+71, Y)
        setBold(false)
        doc.text('°' + proposal, X+99, Y)
        Y+= 14

        formatHeader("Empresa", company, 21)
        formatHeader("CNPJ", cnpj, 14)
        // formatHeader("Endereço", address, 22)
        setBold(true, true)
        if(address.length > 78) {
            doc.text("Endereço:", X, Y)
            const adressSplit = doc.splitTextToSize(address, 160)
            setBold(false)
            doc.text(adressSplit, X+22, Y)
            Y+=14
        } else {
            formatHeader("Endereço", address, 22)
        }
        formatHeader("Responsável", responsible, 30)
        formatHeader("Telefone", phone, 20)
        formatHeader("Email", email, 14)
        formatHeader("Head de Negócios", head, 40)
        Y+=17

        doc.line(X, Y-15, 200, Y-15)

        formatItem("1. OBJETIVO DA PROPOSTA:", `- Assessoria, consultoria, planejamento e execução para canais ON e/ou OFF (conforme planejamento) descritos no item 4;`)
        formatItem("2. DESCRIÇÃO LEGAL DOS SERVIÇOS:", `Desenvolvimento de projeto de marketing e acompanhamento das execuções, onde contratada e\ncontratante terão trabalhos a serem executados até que se encontre os melhores planejamentos para o\nprojeto. A empresa se compromete a manter total sigilo de todas a informações obtidas da contratante\ntais como: estratégia, custos e quaisquer informações que prejudiquem a mesma.`)
        formatItem("3. PRAZO DE EXECUÇÃO:", `Contrato terá duração de 12 meses de duração. Sendo prorrogado automaticamente em caso da não manifestação do cliente.`)
        formatItem("4. PROPOSTA COMERCIAL", undefined)
        const items:Array<IItems> = []

        if(Array.isArray(titles) && Array.isArray(descriptions)) {
            let num = 0
            titles.forEach((title) => {      
                num++         
                const descriptionIndex = titles.indexOf(title)
                    const item = {
                        title: `4.${num}. ${title}`,
                        description: `${descriptions[descriptionIndex]}`
                    }
                    items.push(item)
        })} else if (typeof titles === "string" && typeof descriptions === "string") {
            formatItem(`4.1. ${titles}`, descriptions)
        }   
             


        // ITENS
        items.forEach( item => {
            const splitDesc: string[] = doc.splitTextToSize(item.description, 180)
            if(Y + 5 >= pageHeight - 10) {
                doc.addPage()
                Y = 10
            }

            setBold(true)
            doc.setFontSize(11)
            doc.text(item.title, X, Y)
            Y+=5
            splitDesc.forEach( line => {
                if(Y >= pageHeight - 10) {
                    doc.addPage()
                    Y = 10
                }
                setBold(false)
                doc.setFontSize(12)
                doc.text(line, X, Y)
                Y+= 5
            })
            Y+= 5
        })
    

        setBold(true)
        if(Y + 5 >= pageHeight - 10) {
            doc.addPage()
            Y = 10
        }

        doc.text(`Investimento mensal R$: ${investment}`, X+120, Y)
        Y+= 20
        setBold(false)
        formatItem("5. OBSERVAÇÕES:", `O valor desta proposta refere-se ao fee mensal da integrare. Outros custos como: investimento em tráfego pago, CRM, rádio, TV, outdoor, impressão, contratação de Influencers, contratação de equipe para desenvolvimento de trabalhos, e etc, não estão inclusos.`, true)
        formatItem("6. CONDIÇÕES DE PAGAMENTO:", `- Entrada considerando o valor de uma mensalidade;\n- Restante 11x;`)
        formatItem("7. DEVERES E OBRIGAÇÕES DE AMBAS AS PARTES:")

        const finalItems = [
            {
                title: '7.1',
                description: '- Cliente compromete-se a enviar dados e informações da empresa para construção e andamento doprojeto, como:\n- Lista com os produtos/serviços que mais vendem;\n- Qual CRM utilizam;\n- Principais concorrentes;\n- Sites e perfis das redes sociais que tenham como referência;\n- Forças e fraquezas da empresa;\n- Missão, visão e valores;'
            },
            {
                title: '7.2',
                description: '- Cliente compromete-se também a passar informações que ajudarão a orientar ao projeto, tais como(para os itens abaixo o ideal é que sejam extraídos dos últimos 6 meses, caso não seja possível, podeser utilizado dos últimos 3 meses):\n- Quantidade de clientes que compraram;\n- Quantidade de novos clientes;\n- Últimos faturamentos (R$);\n- Ticket médio;\n- CAC (custo de aquisição de clientes);'
            },
            {
                title: '7.3',
                description: '- Qualquer alteração do combinado será revisada proposta de serviços;'
            },
            {
                title: '7.4',
                description: '- Não está incluso a criação de logotipo, nem estudo e criação de marca (verificarvalores caso tenham interesse);'
            },
            {
                title: '7.5',
                description: '- Contratante se compromete a fazer a reunião para passar as informaçõesnecessárias para desenvolvimento do projeto;'
            },
            {
                title: '7.6',
                description: '- Contratante se compromete a entregar as informações necessárias para construção da estratégia;'
            },
            {
                title: '7.7',
                description: '- Não está incluso material impresso, nem a arte dos mesmos;'
            },
            {
                title: '7.8',
                description: '- Não está incluso valores para impulsionamentos de páginas e de campanhas;'
            }
        ]
        finalItems.forEach( item => {
            const splitDesc: string[] = doc.splitTextToSize(item.description, 180)
            if(Y + 5 >= pageHeight - 10) {
                doc.addPage()
                Y = 10
            }

            setBold(true)
            doc.setFontSize(11)
            doc.text(item.title, X, Y)
            Y+=5
            splitDesc.forEach( line => {
                if(Y >= pageHeight - 10) {
                    doc.addPage()
                    Y = 10
                }
                setBold(false)
                doc.setFontSize(12)
                doc.text(line, X, Y)
                Y+= 5
            })
            Y+= 5
        })
        Y+=10

        doc.line(X, Y- 11, 200, Y-11)

        if(Y + 5 >= pageHeight - 10) {
            doc.addPage()
            Y = 10
        }
        doc.text("Estamos à Vossa disposição para esclarecimentos, dúvidas e negociações.", X, Y)
        if(Y + 5 >= pageHeight - 10) {
            doc.addPage()
            Y = 10
        }
        Y+= 13
        doc.text("Atenciosamente,", X, Y)
        Y+= 13

        doc.setFontSize(14)
        setBold(true)
        doc.text(`${head}`, X, Y)
        Y+= 8
        setBold(false)
        doc.setFont("Helvetica", "italic")
        if(Y + 5 >= pageHeight - 10) {
            doc.addPage()
            Y = 10
        }
        doc.text("Integrare Marketing & Vendas\nFone: (47) 3207-725\n@agenciaintegrare", X, Y)
        if(Y + 5 >= pageHeight - 10) {
            doc.addPage()
            Y = 10
        }
        Y+= 30
        doc.setFontSize(20)
        doc.text('"Nossa meta é vender o seu produto."', X+ 25, Y)
        doc.save("a4.pdf");

            }
    }

export { GeneratePDFService }