namespace Snebur.Dominio
{
    export class RedeSociais extends Snebur.Dominio.BaseTipoComplexo implements Snebur.Dominio.ICaminhoTipo 
    {
        public Facebook: string;
        public Instagram: string;
        public Twitter: string;
        public WhatsApp: string;
        public LinkedIn: string;
        public Youtube: string;
        public Github: string;

        public constructor(init?: Partial<RedeSociais>)
        {
            super();

            if (init != null)
            {
                Object.assign(this, init);
            }

            this.DeclararPropriedade(x => x.Facebook, String);
            this.DeclararPropriedade(x => x.Instagram, String);
            this.DeclararPropriedade(x => x.Twitter, String);
            this.DeclararPropriedade(x => x.WhatsApp, String);
            this.DeclararPropriedade(x => x.LinkedIn, String);
            this.DeclararPropriedade(x => x.Youtube, String);
            this.DeclararPropriedade(x => x.Github, String);

            this.AdicionarValidacaoTextoTamanho(x => x.Facebook, 255);
            this.AdicionarValidacaoTextoTamanho(x => x.Instagram, 255);
            this.AdicionarValidacaoTextoTamanho(x => x.Twitter, 255);
            this.AdicionarValidacaoTextoTamanho(x => x.WhatsApp, 255);
            this.AdicionarValidacaoTextoTamanho(x => x.LinkedIn, 255);
            this.AdicionarValidacaoTextoTamanho(x => x.Youtube, 255);
            this.AdicionarValidacaoTextoTamanho(x => x.Github, 255);
        }

        public Clone(): RedeSociais
        {
            return new RedeSociais({
                Facebook:this.Facebook,
                Instagram: this.Instagram,
                Twitter: this.Twitter,
                WhatsApp: this.WhatsApp,
                LinkedIn: this.LinkedIn,
                Youtube: this.Youtube,
                Github: this.Github,
            });
        }

        public Equals(redeSociadis: RedeSociais): boolean
        {
            if (redeSociadis instanceof RedeSociais)
            {
                /*eslint-disable*/
                return this.Facebook == redeSociadis.Facebook &&
                    this.Instagram == redeSociadis.Instagram &&
                    this.Twitter == redeSociadis.Twitter &&
                    this.WhatsApp == redeSociadis.WhatsApp &&
                    this.LinkedIn == redeSociadis.LinkedIn &&
                    this.Youtube == redeSociadis.Youtube &&
                    this.Github == redeSociadis.Github;
                /*eslint-enable*/
            }
            return false;
        }


    }
}
