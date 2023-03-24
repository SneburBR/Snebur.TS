﻿namespace Snebur
{
    export declare type EventoHandler<TEventArgs extends EventArgs = EventArgs> = (provedor: any, e: TEventArgs) => void;

    export class Evento<TEventArgs extends EventArgs = EventArgs> implements IDisposable
    {
        private _isAtivado: boolean = true;
        private _isDispensado: boolean = false;

        protected readonly _manipuladores = new List<Snebur.Core.ManipuladorEvento<TEventArgs>>();
        private _eventoManipuladoresAlterado_DEBUG: Evento<ItemAlteradoEventArgs>;
        protected _manipuladores_DEBUG: ListaObservacao<Snebur.Core.ManipuladorEvento<TEventArgs>>;

        protected get Manipuladores(): List<Snebur.Core.ManipuladorEvento<TEventArgs>>
        {
            if (Snebur.$Configuracao?.IsDebug &&
                !Array.isArray(this.Provedor))
            {
                if (this._manipuladores_DEBUG == null)
                {
                    this._manipuladores_DEBUG = new ListaObservacao<Snebur.Core.ManipuladorEvento<TEventArgs>>();
                    this._manipuladores_DEBUG.EventoItemAlterado.AddHandler(this.Manipuladores_ItemAlterado, this);
                }
                return this._manipuladores_DEBUG;
            }
            return this._manipuladores;
        }

        public get EventoManipuladoresAlterado_DEBUG(): Evento<ItemAlteradoEventArgs>
        {
            if (this._eventoManipuladoresAlterado_DEBUG == null && Snebur.$Configuracao.IsDebug)
            {
                this._eventoManipuladoresAlterado_DEBUG = new Evento<ItemAlteradoEventArgs>(this);
            }
            return this._eventoManipuladoresAlterado_DEBUG;
        }
       
        public get IsDispensado(): boolean
        {
            return this._isDispensado;
        }

        protected readonly Provedor: any;

        public constructor(provedor: any)
        {
            this.Provedor = provedor;
        }
         
        public AddHandler(manipulador: (provedor: any, e: TEventArgs) => void, objetoBind: any): void
        {
            if (this.IsDispensado)
            {
                throw new Erro("O evento foi dispensado, não é possível adicionar manipuladores");
            }

            if (!(u.ValidacaoUtil.IsFunction(manipulador)))
            {
                throw new ErroNaoImplementado("O manipulador não foi definido");
            }

            if (!u.ValidacaoUtil.IsDefinido(objetoBind))
            {
                objetoBind = this.Provedor;
            }

            const manipuladorEvento = new Snebur.Core.ManipuladorEvento<TEventArgs>(manipulador, objetoBind);
            if (!this.Manipuladores.Contains(manipuladorEvento))
            {
                this.Manipuladores.Add(manipuladorEvento);
            }
        }

        public RemoveHandler(manipulador: (provedor: any, e: TEventArgs) => void, objetoBind: any = this.Provedor): boolean
        {
            if (!this.IsDispensado)
            {
                const temp: Snebur.Core.ManipuladorEvento = {
                    Manipulador: manipulador,
                    ObjetoBind: objetoBind
                };

                const manipuladoresEvento = this.Manipuladores.Where(x => x.Equals(temp));
                if (manipuladoresEvento.Count > 0)
                {
                    for (const manipuladorEvento of manipuladoresEvento)
                    {
                        this.Manipuladores.Remove(manipuladorEvento);

                    }
                    return true;
                }
            }
            return false;
        }

        public NotificarAsync(provedor: any, eventArgs: TEventArgs): void
        {
            if (!this.IsDispensado && this._isAtivado)
            {
                const manipuadores = this.Manipuladores.ToList(true);
                for (const manipuladorEvento of manipuadores)
                {
                    let manipulador = manipuladorEvento.Manipulador;
                    if (manipuladorEvento.ObjetoBind != null)
                    {
                        manipulador = manipulador.bind(manipuladorEvento.ObjetoBind, provedor, eventArgs);
                    }
                    else
                    {
                        throw new Erro("Para notificar assim, de ser passado parâmetro objeto bind no método manipulador AddHandler");
                    }
                    setTimeout(manipulador, 0);
                }
            }
        }

        public Notificar(provedor: any, eventArgs: TEventArgs): void
        {
            if (!this.IsDispensado && this._isAtivado)
            {
                for (const manipuladorEvento of this.Manipuladores)
                {
                    let manipulador = manipuladorEvento.Manipulador;
                    if (manipuladorEvento.ObjetoBind != null)
                    {
                        manipulador = manipulador.bind(manipuladorEvento.ObjetoBind);
                    }
                    manipulador.call(null, provedor, eventArgs);
                }
            }
        }

        public Clear(): void
        {
            if (!this.IsDispensado)
            {
                this.Manipuladores.Clear();
            }
        }

        public Ativar(): void
        {
            this._isAtivado = true;
        }

        public Desativar(): void
        {
            this._isAtivado = false;
        }

        private Manipuladores_ItemAlterado(provedor: any, e: ItemAlteradoEventArgs)
        {
            this.EventoManipuladoresAlterado_DEBUG.Notificar(provedor, e);
        }

        //#region IDispensar 

        public Dispose(): void
        {
            if (u.ValidacaoUtil.IsDefinido(this.Manipuladores))
            {
                this.Manipuladores.Clear();
                delete (this as any).Manipuladores;
            }
            this._isDispensado = true;
        }
        //#endregil
    }
}
