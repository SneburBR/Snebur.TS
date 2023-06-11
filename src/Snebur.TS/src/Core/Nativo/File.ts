
File.prototype.toString = function (this:File)
{
    return Snebur.Utilidade.TextoUtil.RetornarSomentesLetrasNumeros(this.name + this.size);
};
