namespace Snebur.Dominio
{
    export abstract class BaseDominio extends Snebur.ObjetoControladorPropriedade /*implements IIdentificadorUnico, IIdentificadorReferencia*/
    {

        //#region Propriedades 

   

        private __InicializarPropriedades?: Partial<Entidade>

        //#endregion

        //#region Construtor

        public constructor(inicializador?: Partial<Entidade>)
        {
            super();

            this.__IdentificadorUnico = u.GuidUtil.RetornarNovoGuid();
            this.__InicializarPropriedades = inicializador;
        }

        //#endregion

        public NotificarValorPropriedadeAlteradaTipoCompleto(nomePropriedade: string, antigoValor: BaseTipoComplexo, novoValor: BaseTipoComplexo)
        {
            novoValor.__IsIndependente = true;
            this.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);
        }

        protected Inicializar(): void
        {
            if (this.__InicializarPropriedades !== undefined)
            {
                this.DesativarNotificacaoPropriedadeAlterada();
                //object assign pode sobre escrever os métodos e outras propriedades protegidas
                const fonte = this.__InicializarPropriedades as any;
                for (const nomePropriedade in fonte)
                {
                    if (!nomePropriedade.StartsWith("_") && !___PropriedadesMetodosProtegidosEntidades[nomePropriedade])
                    {
                        const valorPropriedade = fonte[nomePropriedade];
                        if (valorPropriedade !== undefined)
                        {
                            (this as any)[nomePropriedade] = valorPropriedade;
                        }
                    }
                    else
                    {
                        if ($Configuracao.IsDebug)
                        {
                            throw new Erro(`A Propriedade '${nomePropriedade}' não pode ser inicializada no construtor do objeto ${this.___NomeConstrutor}, Ela pode ser Protegida Ex. Id ou ou tipo privado Iniciando _ ex. _descricao `);
                        }
                    }
                }
                delete this.__InicializarPropriedades;
                this.AtivarNotificacaoPropriedadeAlterada();
            }
        }


        //#region IBaseDominioReferencia 

        private __IsReferenciado?: boolean
        private _isSerializando: boolean;

        private __IdentificadorUnico?: string;
        protected __IdentificadorReferencia?: string;
        protected __IsBaseDominioReferencia?: boolean;

        private get IsSerializando(): boolean
        {
            return this._isSerializando;
        }
        private set IsSerializando(value: boolean)
        {
            this._isSerializando = value;
            if (!value)
            {
                delete this.__IsReferenciado;
            }
        }

        public RetornarIdentificadorReferencia(): string | undefined
        {
            if (this.__IsBaseDominioReferencia)
            {
                return this.__IdentificadorReferencia;
            }
            return this.__IdentificadorUnico;
        }

        //#endregion

    }
}
