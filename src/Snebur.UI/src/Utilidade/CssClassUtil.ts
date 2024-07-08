namespace Snebur.UI
{
    export class CssClassUtil
    {
        static RetornarCssClassFromEnum<TEnum>(
            prefixoCssClassName: string,
            construtorEnum: TEnum,
            enumValue: TEnum[keyof TEnum]): string
        {
            const descricao = EnumUtil.RetornarDescricao(construtorEnum, enumValue);
            const descricaoFormatada = u.CodigoUtil.Formatar(descricao,
                u.EnumFormatacaoCodigo.PascalCase,
                u.EnumFormatacaoCodigo.KebabCase);
            return `${prefixoCssClassName}--${descricaoFormatada}`;
        }

        public static RemoverClssClassePrefixo(elemento: HTMLElement, prefixo: string): any
        {
            this.RemoverClssClasseComecaCom(elemento, prefixo);
        }

        public static RemoverClssClasseComecaCom(elemento: HTMLElement, prefixo: string): any
        {
            const classesCor = u.Util.CopiarArray<string>(elemento.classList).Where(x => x.StartsWith(prefixo)).ToList();
            for (const classe of classesCor)
            {
                elemento.classList.remove(classe);
            }
        }
         
        public static AdicionarCssClasse(refEelemento: HTMLElement | string, classes: string): void
        {
            if (!String.IsNullOrWhiteSpace(classes))
            {
                const elemento = ElementoUtil.RetornarElemento(refEelemento);
                const partes = classes.split(" ");
                const len = partes.length;

                for (let i = 0; i < len; i++)
                {
                    const classe = partes[i];
                    if (!String.IsNullOrWhiteSpace(classe))
                    {
                        const posicaoPrefixo = classe.indexOf("--");
                        if (posicaoPrefixo > 0)
                        {
                            const prefixo = classe.substr(0, posicaoPrefixo + 2);
                            CssClassUtil.RemoverClssClassePrefixo(elemento, prefixo);
                        }

                        if (!elemento.classList.contains(classe))
                        {
                            elemento.classList.add(classe);
                        }
                    }
                }
            }
        }

        public static RemoverCssClasse(refEelemento: HTMLElement | string, classes: string): void
        {
            const elemento = ElementoUtil.RetornarElemento(refEelemento, true);
            if (elemento instanceof HTMLElement)
            {
                const partes = classes.split(" ");
                const len = partes.length;
                for (let i = 0; i < len; i++)
                {
                    const classe = partes[i];
                    while (elemento.classList.contains(classe))
                    {
                        elemento.classList.remove(classe);
                    }
                }
            }
        }

        /**
         * Atualizar classes no elemento
         * @param elemento elemento de destino
         * @param classes classes para adicionar ou remover, separado por espaços
         * @param isAdicionar true para adicionar false para remover a classe
         * @param isIgnorarErro Opcional ignora erro, caso o elemento não exista, padrão false
         */
        public static AtualizarCssClass(refEelemento: HTMLElement | string, classes: string, isAdicionar: boolean)
        {
            if (classes == null)
            {
                throw new Erro("O argumento  'classes' não foi definido");
            }

            if (isAdicionar)
            {
                CssClassUtil.AdicionarCssClasse(refEelemento, classes);
            }
            else
            {
                CssClassUtil.RemoverCssClasse(refEelemento, classes);
            }

        }
    }
}