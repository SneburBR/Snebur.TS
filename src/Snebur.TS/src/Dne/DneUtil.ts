namespace Snebur.Utilidade
{
     export class DneUtil
    {
        public static RetornarSigla(estado: EnumUF): EnumUFSigla
        {
            if (estado == null)
            {
                return null;
            }

            switch (estado)
            {
                case EnumUF.Acre:
                    return EnumUFSigla.Acre;
                case EnumUF.Alagoas:
                    return EnumUFSigla.Alagoas;
                case EnumUF.Amapa:
                    return EnumUFSigla.Amapa;
                case EnumUF.Amazonas:
                    return EnumUFSigla.Amazonas;
                case EnumUF.Bahia:
                    return EnumUFSigla.Bahia;
                case EnumUF.Ceara:
                    return EnumUFSigla.Ceara;
                case EnumUF.DistritoFederal:
                    return EnumUFSigla.DistritoFederal;
                case EnumUF.EspiritoSanto:
                    return EnumUFSigla.EspiritoSanto;
                case EnumUF.Goias:
                    return EnumUFSigla.Goias;
                case EnumUF.Maranhao:
                    return EnumUFSigla.Maranhao;
                case EnumUF.MatoGrosso:
                    return EnumUFSigla.MatoGrosso;
                case EnumUF.MatoGrossoDoSul:
                    return EnumUFSigla.MatoGrossoDoSul;
                case EnumUF.MinasGerais:
                    return EnumUFSigla.MinasGerais;
                case EnumUF.Para:
                    return EnumUFSigla.Para;
                case EnumUF.Paraiba:
                    return EnumUFSigla.Paraiba;
                case EnumUF.Parana:
                    return EnumUFSigla.Parana;
                case EnumUF.Pernambuco:
                    return EnumUFSigla.Pernambuco;
                case EnumUF.Piaui:
                    return EnumUFSigla.Piaui;
                case EnumUF.RioDeJaneiro:
                    return EnumUFSigla.RioDeJaneiro;
                case EnumUF.RioGrandeDoNorte:
                    return EnumUFSigla.RioGrandeDoNorte;
                case EnumUF.RioGrandeDoSul:
                    return EnumUFSigla.RioGrandeDoSul;
                case EnumUF.Rondonia:
                    return EnumUFSigla.Rondonia;
                case EnumUF.Roraima:
                    return EnumUFSigla.Roraima;
                case EnumUF.SantaCatarina:
                    return EnumUFSigla.SantaCatarina;
                case EnumUF.SaoPaulo:
                    return EnumUFSigla.SaoPaulo;
                case EnumUF.Sergipe:
                    return EnumUFSigla.Sergipe;
                case EnumUF.Tocantins:
                    return EnumUFSigla.Tocantins;
                default:
                    throw new Error(`Estado não suportado: ${estado}`);
            }
        }

        public static RetornarUFEnumDaSingla(sigla: EnumUFSigla | string): EnumUF
        {
            if (String.IsNullOrWhiteSpace(sigla))
            {
                return null;
            }
  
            switch (sigla)
            {
                case EnumUFSigla.Acre:
                    return EnumUF.Acre;
                case EnumUFSigla.Alagoas:
                    return EnumUF.Alagoas;
                case EnumUFSigla.Amapa:
                    return EnumUF.Amapa;
                case EnumUFSigla.Amazonas:
                    return EnumUF.Amazonas;
                case EnumUFSigla.Bahia:
                    return EnumUF.Bahia;
                case EnumUFSigla.Ceara:
                    return EnumUF.Ceara;
                case EnumUFSigla.DistritoFederal:
                    return EnumUF.DistritoFederal;
                case EnumUFSigla.EspiritoSanto:
                    return EnumUF.EspiritoSanto;
                case EnumUFSigla.Goias:
                    return EnumUF.Goias;
                case EnumUFSigla.Maranhao:
                    return EnumUF.Maranhao;
                case EnumUFSigla.MatoGrosso:
                    return EnumUF.MatoGrosso;
                case EnumUFSigla.MatoGrossoDoSul:
                    return EnumUF.MatoGrossoDoSul;
                case EnumUFSigla.MinasGerais:
                    return EnumUF.MinasGerais;
                case EnumUFSigla.Para:
                    return EnumUF.Para;
                case EnumUFSigla.Paraiba:
                    return EnumUF.Paraiba;
                case EnumUFSigla.Parana:
                    return EnumUF.Parana;
                case EnumUFSigla.Pernambuco:
                    return EnumUF.Pernambuco;
                case EnumUFSigla.Piaui:
                    return EnumUF.Piaui;
                case EnumUFSigla.RioDeJaneiro:
                    return EnumUF.RioDeJaneiro;
                case EnumUFSigla.RioGrandeDoNorte:
                    return EnumUF.RioGrandeDoNorte;
                case EnumUFSigla.RioGrandeDoSul:
                    return EnumUF.RioGrandeDoSul;
                case EnumUFSigla.Rondonia:
                    return EnumUF.Rondonia;
                case EnumUFSigla.Roraima:
                    return EnumUF.Roraima;
                case EnumUFSigla.SantaCatarina:
                    return EnumUF.SantaCatarina;
                case EnumUFSigla.SaoPaulo:
                    return EnumUF.SaoPaulo;
                case EnumUFSigla.Sergipe:
                    return EnumUF.Sergipe;
                case EnumUFSigla.Tocantins:
                    return EnumUF.Tocantins;
                default:
                    throw new Error(`Sigla não suportada: ${sigla}`);
            }
        }
    }
}
 