namespace Snebur.Utilidade
{
    export class FormDataUtil
    {
        public static RetornarFormData(objeto: any): FormData
        {
            if (objeto == null)
            {
                return null;
            }

            const parametros = new DicionarioSimples<string>();
            FormDataUtil.MontarParametros(parametros, null, objeto);

            if (Array.isArray(objeto))
            {
                throw new Erro(`O array não pode ser o raiz do objeto`);
            }

            const formData = new FormData();
            for (const parChaveValor of parametros.ParesChaveValor)
            {
                formData.append(parChaveValor.Chave, parChaveValor.Valor);
            }
            return formData;
        }

        public static RetornarParametrosString(objeto: any): string
        {
            const parametros = FormDataUtil.RetornarParametros(objeto);
            return parametros.join("&");
        }

        public static RetornarParametros(objeto: any): List<string>
        {
            const parametros = new DicionarioSimples<string>();
            FormDataUtil.MontarParametros(parametros, null, objeto);

            if (Array.isArray(objeto))
            {
                throw new Erro(`O array não pode ser o raiz do objeto`);
            }

            const retorno = new List<string>();
            for (const parChaveValor of parametros.ParesChaveValor)
            {
                retorno.Add(`${parChaveValor.Chave}=${encodeURIComponent(parChaveValor.Valor)}`);
            }
            return retorno;
        }

        private static MontarParametros(parametros: DicionarioSimples<string>, prefixo: string | null, objeto: any): void
        {
            if (Array.isArray(objeto))
            {
                for (let i = 0; i < objeto.length; i++)
                {
                    const item = objeto[i];
                    const itemPrefixo = FormDataUtil.NormalizarPrefixo(prefixo, i);
                    FormDataUtil.MontarParametros(parametros, itemPrefixo, item);
                }
            }
            else if (objeto != null && typeof objeto === "object")
            {
                for (const chave of Object.keys(objeto))
                {
                    const item = objeto[chave] ?? "";
                    const itemPrefixo = FormDataUtil.NormalizarPrefixo(prefixo, chave);
                    FormDataUtil.MontarParametros(parametros, itemPrefixo, item);
                }
            }
            else
            {
                if (String.IsNullOrWhiteSpace(prefixo))
                {
                    throw new Erro("O prefixo não foi definido");
                }
                parametros.Add(prefixo, objeto?.toString() ?? "");
            }

        }
        private static NormalizarPrefixo(prefixo: string, chave: string | number): string
        {
            if (String.IsNullOrWhiteSpace(prefixo))
            {
                return chave.toString();
            }
            return `${prefixo}[${chave}]`;
        }



        //    public static Teste()
        //    {
        //        const pedro = {
        //            Nome: "Pedro",
        //            SobreNome: "Pereira",
        //            Idade: 38
        //        };

        //        const joao = {
        //            Nome: "João",
        //            SobreNome: "Silva",
        //            Idade: 38
        //        };

        //        const dados = {
        //            Info: "Info 01",
        //            Pessoas: [pedro, joao]
        //        };

        //        const rubenns = {
        //            Nome: "Rubens",
        //            SobreNome: "Cordeiro ",
        //            Idade: 38,
        //            Enderecos: [
        //                {
        //                    Tipo: "Residencial",
        //                    Run: "America Central",
        //                    Numero: 123,
        //                    Localidade: {
        //                        Cidade: "Guarapuva",
        //                        Estado: "PR"
        //                    }
        //                },
        //                {
        //                    Tipo: "Comercial",
        //                    Run: "Nereu ramos",
        //                    Numero: 123,
        //                    Localidade: {
        //                        Cidade: "Chapecó",
        //                        Estado: "SC"
        //                    }
        //                },
        //            ]
        //        };

        //        const formDatapedro = FormDataUtil.RetornarParametros(pedro);
        //        const formDataJoao = FormDataUtil.RetornarParametros(joao);
        //        let formPessoas = FormDataUtil.RetornarParametros(dados);

        //        dados.Pessoas.Add(rubenns);
        //        const formPessoasRebens = FormDataUtil.RetornarParametros(dados);
        //    }
    }
}

