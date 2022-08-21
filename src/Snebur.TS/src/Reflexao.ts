//variáveis necessárias
namespace Snebur
{
    export const $Reflexao: Snebur.Reflexao.ReflexaoConstrutor = new Snebur.Reflexao.ReflexaoConstrutor();
    export import r = Snebur.Reflexao;
    export import u = Snebur.Utilidade;
}

namespace Snebur.Reflexao
{
    $Reflexao.Tipos.Add("function", new TipoSistema("Function", "", null));
    $Reflexao.Tipos.Add(Object.__CaminhoTipo, new TipoSistema("Object", "", null));

    Objeto.__CaminhoTipo = "Snebur.Objeto";
    ObjetoControladorPropriedade.__CaminhoTipo = "Snebur.ObjetoControladorPropriedade";

    $Reflexao.Tipos.Add(Objeto.__CaminhoTipo, new TipoSistema("Objeto", "Snebur", null));
    $Reflexao.Tipos.Add(ObjetoControladorPropriedade.__CaminhoTipo, new TipoSistema("ObjetoControladorPropriedade", "Snebur", null));
}
