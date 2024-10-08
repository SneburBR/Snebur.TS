﻿namespace Snebur.Dominio
{
    export abstract class BaseDominio extends Snebur.ObjetoControladorPropriedade /*implements IIdentificadorUnico, IIdentificadorReferencia*/
    {
        //#region Propriedades

        //@internal
        protected __InicializarPropriedades?: Partial<this>

        //#endregion

        //#region Construtor

        public constructor(inicializador?: Partial<BaseDominio>)
        {
            super();

            this.__IdentificadorUnico = u.GuidUtil.RetornarNovoGuid();
            this.__InicializarPropriedades = inicializador as Partial<this>;
        }

        //#endregion


        protected NotificarValorPropriedadeAlteradaTipoCompleto(nomePropriedade: string, antigoValor: BaseTipoComplexo, novoValor: BaseTipoComplexo)
        {
            novoValor.__IsIndependente = true;
            this.NotificarValorPropriedadeAlterada(nomePropriedade, antigoValor, novoValor);
        }

        protected Inicializar(): void
        {
            if (this.__InicializarPropriedades !== undefined)
            {
                this.__MapearPropriedades(this.__InicializarPropriedades, true);
                delete this.__InicializarPropriedades;
            }
        }

        public __MapearPropriedades(init: Partial<this>, isDesativarObservadorPropriedades: boolean = false)
        {
            if (isDesativarObservadorPropriedades)
            {
                this.DesativarObservadorPropriedadeAlterada();
            }

            try
            {
                //object assign pode sobre escrever os métodos e outras propriedades protegidas
                const fonte = init as any;
                for (const nomePropriedade in fonte)
                {
                    if (!nomePropriedade.StartsWith("_") &&
                        !___PropriedadesMetodosProtegidosEntidades[nomePropriedade])
                    {
                        const valorPropriedade = fonte[nomePropriedade];
                        if (valorPropriedade !== undefined &&
                            (this as any)[nomePropriedade] !== valorPropriedade)
                        {
                            try
                            {
                                (this as any)[nomePropriedade] = valorPropriedade;
                            }
                            catch (erro)
                            {
                                console.error(`Erro ao inicializar a propriedade ${nomePropriedade} do objeto ${this.___NomeConstrutor}`);
                            }
                        }
                    }
                    else
                    {
                        if ($Configuracao.IsDebug)
                        {
                            throw new Erro(`A Propriedade '${nomePropriedade}' não pode ser inicializada no construtor do objeto ${this.___NomeConstrutor}, Ela pode ser Protegida Ex. Id ou tipo privado Iniciando _ ex. _descricao `);
                        }
                    }
                }
            }
            finally
            {
                if (isDesativarObservadorPropriedades)
                {
                    this.AtivarObservadorPropriedadeAlterada();
                }
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
