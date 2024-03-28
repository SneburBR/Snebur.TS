namespace Snebur.Dominio
{
	export class EntidadeViewModel<TEntidade extends IEntidade = Entidade> extends BaseViewModel
    {
        private _entidade: TEntidade;

        public get Entidade(): TEntidade
        {
            return this._entidade;
        }

        public set Entidade(value: TEntidade)
        {
            this.NotificarPropriedadeAlterada("Entidade", this._entidade, this._entidade = value);
        }

        public constructor()
        {
            super();

        }

	}
}
