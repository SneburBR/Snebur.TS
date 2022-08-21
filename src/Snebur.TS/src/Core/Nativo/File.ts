
File.prototype.toString = function ()
{
    const arquivo: File = this;
    return Snebur.Utilidade.TextoUtil.RetornarSomentesLetrasNumeros(arquivo.name + arquivo.size);
};
