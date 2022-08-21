namespace Snebur.UI
{

    export class ElementoAreaUtil
    {
        /**
         * Retorna a quantidade em porcentagem da area do elemento de origem sobre (em cima) do elemento de destino
         * @param elementoOrigem
         */

        public static RetornarPorcentagemAreaSobre(elementoOrigem: HTMLElement, elementoDestino: HTMLElement): number
        {
            const regiaoOrigem = elementoOrigem.getBoundingClientRect();
            const regiaoDestino = elementoDestino.getBoundingClientRect();

            return ElementoAreaUtil.RetornarPorcentagemAreaSobreRegiao(
                regiaoOrigem,
                regiaoDestino);
        }

        public static RetornarPorcentagemAreaSobreRegiao(regiaoOrigem: DOMRect, regiaoDestino: DOMRect): number
        {
            const largura = ElementoAreaUtil.RetornarLargura(regiaoOrigem, regiaoDestino);
            const altura = ElementoAreaUtil.RetornarAltura(regiaoOrigem, regiaoDestino);

            const areaEmcima = (largura * altura);
            const areaElemento = (regiaoOrigem.width * regiaoOrigem.height);
            if (areaElemento > 0)
            {
                return (areaEmcima / areaElemento) * 100;
            }
            return 0;
        }

        static RetornarLargura(regiaoOrigem: DOMRect, regiaoDestino: DOMRect): number
        {
            //completamente em cima
            if ((regiaoOrigem.x > regiaoDestino.x) &&
                (regiaoOrigem.x + regiaoOrigem.width) < (regiaoDestino.x + regiaoDestino.width))
            {
                return regiaoOrigem.width;
            }

            //não esta em cima - fora
            if (((regiaoOrigem.x + regiaoOrigem.width) < regiaoDestino.x) ||
                (regiaoOrigem.x > (regiaoDestino.x + regiaoDestino.width)))
            {
                return 0;
            }

            if (regiaoOrigem.x < regiaoDestino.x && regiaoDestino.right < regiaoOrigem.right)
            {
                return regiaoDestino.width;

            }

            if (regiaoOrigem.x < regiaoDestino.x)
            {
                return (regiaoOrigem.x + regiaoOrigem.width) - regiaoDestino.x;
            }
            return regiaoOrigem.width - ((regiaoOrigem.x + regiaoOrigem.width) - (regiaoDestino.x + regiaoDestino.width));
        }

        private static RetornarAltura(regiaoOrigem: DOMRect, regiaoDestino: DOMRect): number
        {
            //completamente em cima
            if ((regiaoOrigem.y > regiaoDestino.y) &&
                (regiaoOrigem.y + regiaoOrigem.height) < (regiaoDestino.y + regiaoDestino.height))
            {
                return regiaoOrigem.height;
            }

            //não esta em cima - fora
            if (((regiaoOrigem.y + regiaoOrigem.height) < regiaoDestino.y) ||
                (regiaoOrigem.y > (regiaoDestino.y + regiaoDestino.height)))
            {
                return 0;
            }

            if (regiaoOrigem.y < regiaoDestino.y)
            {
                return (regiaoOrigem.y + regiaoOrigem.height) - regiaoDestino.y;
            }
            return regiaoOrigem.height - ((regiaoOrigem.y + regiaoOrigem.height) - (regiaoDestino.y + regiaoDestino.height));
        }

    }

    export class CloneElementoUtil
    {

        public static CopiarEstilosComputados(elementoOrigem: HTMLElement, elementoDestino: HTMLElement): void
        {
            CloneElementoUtil.CopiarEstilosComputadosInterno(elementoOrigem, elementoDestino);

            if (!String.IsNullOrEmpty(elementoOrigem.id) && elementoOrigem.id === elementoDestino.id)
            {
                elementoDestino.id = ElementoUtil.RetornarNovoIDElemento(null);
            }

            const filhosOrigem = Util.CopiarArray(elementoOrigem.childNodes).OfType(HTMLElement);
            const filhosDestino = Util.CopiarArray(elementoDestino.childNodes).OfType(HTMLElement);

            if (filhosOrigem.length === filhosDestino.length)
            {
                for (let i = 0; i < filhosOrigem.length; i++)
                {
                    const filhoOrigem = filhosOrigem[i];
                    const filhoDestino = filhosDestino[i];

                    if (filhoOrigem.tagName === filhoDestino.tagName)
                    {
                        CloneElementoUtil.CopiarEstilosComputados(filhoOrigem, filhoDestino);
                    }
                }
            }
        }

        public static CopiarEstilosComputadosInterno(elementoOrigem: HTMLElement, elementoDestino: HTMLElement)
        {
            const estilosComputados = document.defaultView.getComputedStyle(elementoOrigem, null);
            for (const estilo in estilosComputados)
            {
                if (EstiloUtil.IsEstilo(estilo))
                {
                    try
                    {
                        elementoDestino.style[estilo] = estilosComputados[estilo];
                        if (estilo === "font")
                        {
                            elementoDestino.style.fontSize = estilosComputados.fontSize;
                        }
                    }
                    catch (e)
                    {
                        console.warn(e);
                    }
                }
            }
        }

      
    }
}
