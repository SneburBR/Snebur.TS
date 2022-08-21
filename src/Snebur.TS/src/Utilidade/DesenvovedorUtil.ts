namespace Snebur.Utilidade
{
    export class DesenvolvedorUtil
    {
        private static _random: SnRandom;

        private static get Random()
        {
            return DesenvolvedorUtil._random ?? (this._random = new SnRandom());
        }

        public static PesssoaFisicaFalsa(): IPesssoaFisicaFalsa
        {
            const enderecoFalso = DesenvolvedorUtil.EnderecoFalso();
            const genero = (DesenvolvedorUtil.Random.Next(0, 10) % 2) === 0 ? "M" : "F";
            const rg = this.Random.Next(1000000, 999999999);

            return {
                Cpf: DesenvolvedorUtil.GerarCpf(),
                Email: faker.internet.email(),
                Genero: genero,
                Rg: rg.ToString(),
                Nome: faker.name.findName() + " " + faker.name.lastName(),
                Telefone: faker.phone.phoneNumber(),
                DataNascimento: faker.date.past(),
                EnderecoFalso: enderecoFalso
            };
        }
        public static PesssoaJuridicaFalsa(): IPesssoaJuridicaFalsa
        {
            const enderecoFalso = DesenvolvedorUtil.EnderecoFalso();
            const inscricaoEstadual = DesenvolvedorUtil.Random.Next(1000000, 999999999);
            const cnpj = DesenvolvedorUtil.GerarCnpj();
            return {
                Cnpj: cnpj,
                Email: faker.internet.email(),
                InscricaoEstadual: inscricaoEstadual.ToString(),
                Nome: faker.company.companyName(),
                RazaoSocial: faker.company.companyName(),
                Telefone: faker.phone.phoneNumber(),
                EnderecoFalso: enderecoFalso
            };
        }


        public static EnderecoFalso(): IEnderecoFalso
        {
            const cidade = DesenvolvedorUtil.NornalizarNome(faker.address.city());

            const logradouro = faker.address.streetName();
            const estado = faker.address.stateAbbr();
            const cep = faker.address.zipCode();
            const bairro = faker.address.city();
            const numero = DesenvolvedorUtil.Random.Next(100, 10000);

            return {
                Cidade: cidade,
                Logradouro: logradouro,
                Bairro: bairro,
                Numero: numero,
                Cep: cep,
                Estado: estado
            };
        }



        public static GerarRg(): string
        {
            return DesenvolvedorUtil.Random.Next(10000000, 99999999).ToString();
        }
        public static GerarInscricaoEstadual(): string
        {
            return DesenvolvedorUtil.Random.Next(10000000, 99999999).ToString();
        }

        public static RandowEnum<TEnum>(construador: any)  
        {
            return u.EnumUtil.RetornarValoresEnum<TEnum>(construador).Random();
        }

        private static RetornarRandom(n: number): number
        {
            return Math.round(Math.random() * n);
        }

        private static Resto(dividendo: number, divisor: number): number
        {
            return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
        }

        private static GerarCpf(): string
        {
            const n = 9;
            const n1 = DesenvolvedorUtil.RetornarRandom(n);
            const n2 = DesenvolvedorUtil.RetornarRandom(n);
            const n3 = DesenvolvedorUtil.RetornarRandom(n);
            const n4 = DesenvolvedorUtil.RetornarRandom(n);
            const n5 = DesenvolvedorUtil.RetornarRandom(n);
            const n6 = DesenvolvedorUtil.RetornarRandom(n);
            const n7 = DesenvolvedorUtil.RetornarRandom(n);
            const n8 = DesenvolvedorUtil.RetornarRandom(n);
            const n9 = DesenvolvedorUtil.RetornarRandom(n);

            let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
            d1 = 11 - (DesenvolvedorUtil.Resto(d1, 11));
            if (d1 >= 10) d1 = 0;
            let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
            d2 = 11 - (DesenvolvedorUtil.Resto(d2, 11));
            if (d2 >= 10) d2 = 0;

            return "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
        }

        private static GerarCnpj(): string
        {
            const n = 9;
            const n1 = DesenvolvedorUtil.RetornarRandom(n);
            const n2 = DesenvolvedorUtil.RetornarRandom(n);
            const n3 = DesenvolvedorUtil.RetornarRandom(n);
            const n4 = DesenvolvedorUtil.RetornarRandom(n);
            const n5 = DesenvolvedorUtil.RetornarRandom(n);
            const n6 = DesenvolvedorUtil.RetornarRandom(n);
            const n7 = DesenvolvedorUtil.RetornarRandom(n);
            const n8 = DesenvolvedorUtil.RetornarRandom(n);
            const n9 = 0;
            const n10 = 0;
            const n11 = 0;
            const n12 = 1;
            let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
            d1 = 11 - (DesenvolvedorUtil.Resto(d1, 11));
            if (d1 >= 10) d1 = 0;
            let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
            d2 = 11 - (DesenvolvedorUtil.Resto(d2, 11));
            if (d2 >= 10) d2 = 0;

            return "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + n12 + d1 + d2;
        }

        private static nit(): string
        {
            const n = 9;
            const n1 = 1;
            const n2 = DesenvolvedorUtil.RetornarRandom(n);
            const n3 = DesenvolvedorUtil.RetornarRandom(n);
            const n4 = DesenvolvedorUtil.RetornarRandom(n);
            const n5 = DesenvolvedorUtil.RetornarRandom(n);
            const n6 = DesenvolvedorUtil.RetornarRandom(n);
            const n7 = DesenvolvedorUtil.RetornarRandom(n);
            const n8 = DesenvolvedorUtil.RetornarRandom(n);
            const n9 = DesenvolvedorUtil.RetornarRandom(n);
            const n10 = DesenvolvedorUtil.RetornarRandom(n);

            let d1 = n1 * 3 + n2 * 2 + n3 * 9 + n4 * 8 + n5 * 7 + n6 * 6 + n7 * 5 + n8 * 4 + n9 * 3 + n10 * 2;
            d1 = 11 - (DesenvolvedorUtil.Resto(d1, 11));
            if (d1 >= 10) d1 = 0;


            return "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + d1;
        }

        private static cei()
        {
            const n = 9;
            const n1 = 2; // deve ser diferente de 0
            const n2 = DesenvolvedorUtil.RetornarRandom(n);
            const n3 = DesenvolvedorUtil.RetornarRandom(n);
            const n4 = DesenvolvedorUtil.RetornarRandom(n);
            const n5 = DesenvolvedorUtil.RetornarRandom(n);
            const n6 = DesenvolvedorUtil.RetornarRandom(n);
            const n7 = DesenvolvedorUtil.RetornarRandom(n);
            const n8 = DesenvolvedorUtil.RetornarRandom(n);
            const n9 = DesenvolvedorUtil.RetornarRandom(n);
            const n10 = DesenvolvedorUtil.RetornarRandom(n);
            const  n11 = 8; // atividade

            const aux1 = n1 * 7 + n2 * 4 + n3 * 1 + n4 * 8 + n5 * 5 + n6 * 2 + n7 * 1 + n8 * 6 + n9 * 3 + n10 * 7 + n11 * 4;
             
            const Soma = parseInt(aux1);
            let d1 = parseInt((10 - (Soma % 10 + parseInt(Soma / 10)) % 10) % 10);
            d1 = Math.abs(d1);


            return "" + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + d1;
        }

        private static NornalizarNome(nome: string)
        {
            return nome.replace("undefined", String.Empty);
        }
 
    }

    interface IEnderecoFalso
    {
        Cidade: string;
        Logradouro: string;
        Bairro: string;
        Numero: number;
        Cep: string;
        Estado: string;
    }

    interface IPesssoaFisicaFalsa
    {
        Nome: string;
        Cpf: string;
        Rg: string;
        Email: string;
        Telefone: string;
        Genero: string;
        EnderecoFalso: IEnderecoFalso;
        DataNascimento: Date;
    }

    interface IPesssoaJuridicaFalsa
    {
        Nome: string;
        RazaoSocial: string;
        Cnpj: string;
        InscricaoEstadual: string;
        Email: string;
        Telefone: string;
        EnderecoFalso: IEnderecoFalso;
    }

    //window.addEventListener("load", function ()
    //{
    //    setTimeout(function ()
    //    {
    //        if ($Configuracao?.IsDebug && (window as any).faker)
    //        {
    //            faker.locale = "pt_BR";
    //        }
    //    }, 1000);

    //});

}

