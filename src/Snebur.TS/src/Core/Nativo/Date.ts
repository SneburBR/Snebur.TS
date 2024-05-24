namespace Snebur
{
    Date.prototype.__RetornarTipo = function (): r.TipoPrimario
    {
        return u.ReflexaoUtil.RetornarTipoPrimario(r.EnumTipoPrimario.DateTime);
    };

    Date.prototype.GetType = function (): r.TipoPrimario
    {
        return this.__RetornarTipo();
    };

    Object.defineProperty(Date.prototype, "Millisecond", {

        get: function ()
        {
            return this.getMilliseconds();
        }
    });

    Object.defineProperty(Date.prototype, "Second", {

        get: function ()
        {
            return this.getSeconds();
        }
    });

    Object.defineProperty(Date.prototype, "Minute", {

        get: function ()
        {
            return this.getMinutes();
        }
    });

    Object.defineProperty(Date.prototype, "Hour", {

        get: function ()
        {
            return this.getHours();
        }
    });

    Object.defineProperty(Date.prototype, "Day", {

        get: function ()
        {
            return this.getDate();
        }
    });

    Object.defineProperty(Date.prototype, "Month", {

        get: function ()
        {
            return this.getMonth() + 1;
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "Year", {

        get: function ()
        {
            return this.getFullYear();
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "DayOfWeek", {

        get: function ()
        {
            return this.getDay();
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "DayOfYear", {

        get: function ()
        {
            return u.DataHoraUtil.RetornarDiaAno(this);
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "TotalMinutesOfDay", {

        get: function (this: Date)
        {
            return this.getHours() * 60 + this.getMinutes();
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "TotalMinutesOfYear", {

        get: function (this: Date)
        {
            return this.DayOfYear * 24 * 60 + (this.getHours() * 60) + this.getMinutes();
        },
        enumerable: true,
    });
     
    Object.defineProperty(Date.prototype, "TimeOfDay", {

        get: function ()
        {
            return TimeSpan.FromMilliseconds(this.getTime());
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "Ticks", {

        get: function ()
        {
            return u.DataHoraUtil.RetornarTicks(this);
        },
        enumerable: true,
    });


    Object.defineProperty(Date.prototype, "DataZeroHora", {

        get: function (this: Date)
        {
            //if ($Configuracao.TipoData === EnumTipoData.Utc)
            //{
            //    return new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0));
            //}
            return new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0, 0);
        },
        enumerable: true,
    });

    Object.defineProperty(Date.prototype, "GetHashCode", {

        value: function (this: Date)
        {
            return this.getTime();
        },
        enumerable: true,
    });



    Object.defineProperty(Date.prototype, "Utc", {

        get: function (this: Date)
        {
            return new Date(Date.UTC(this.getFullYear(),
                this.getUTCMonth(),
                this.getUTCDate(),
                this.getUTCHours(),
                this.getUTCMinutes(),
                this.getUTCSeconds(),
                this.getUTCMilliseconds()));
        },
        enumerable: true,
    });

    //Object.defineProperty(Date.prototype, "DayOfYear", {

    //    get: function ()
    //    {
    //        return "nao implementado";
    //    },
    //    enumerable: true,
    //});

    //Object.defineProperty(Date.prototype, "Ticks", {

    //    get: function ()
    //    {
    //        return "nao implementado";
    //    },
    //    enumerable: true,
    //});

    //Object.defineProperty(Date.prototype, "TimeOfDay", {

    //    get: function ()
    //    {
    //        return "nao implementado";
    //    },
    //    enumerable: true,
    //});

    //#region Métodos 

    Date.prototype.Add = function (timespan: TimeSpan): Date
    {
        const ms = this.getTime() + timespan.TotalMilliseconds;
        return new Date(ms);
    };

    Date.prototype.AddMilliseconds = function (milliseconds: number): Date
    {
        const ms = this.getTime() + milliseconds;
        return new Date(ms);
    };

    Date.prototype.AddSeconds = function (segundos: number): Date
    {
        const ms = this.getTime() + TimeSpan.FromSeconds(segundos).TotalMilliseconds;
        return new Date(ms);
    };

    Date.prototype.AddMinutes = function (minutos: number): Date
    {
        const ms = this.getTime() + TimeSpan.FromMinutes(minutos).TotalMilliseconds;
        return new Date(ms);
    };

    Date.prototype.AddHours = function (horas: number): Date
    {
        const ms = this.getTime() + TimeSpan.FromHours(horas).TotalMilliseconds;
        return new Date(ms);
    };



    Date.prototype.AddDays = function (dias: number): Date
    {
        const ms = this.getTime() + TimeSpan.FromDays(dias).TotalMilliseconds;
        return new Date(ms);
    };

    Date.prototype.AddMonths = function (this: Date, totalMeses: number): Date
    {
        let anos = Math.floor(totalMeses / 12);
        const meses = totalMeses > 12 ? totalMeses % 12 : totalMeses;
        let novoMes = (this.getMonth() + 1) + meses;
        if (novoMes > 12)
        {
            anos += 1;
            novoMes = novoMes - 12;
        }
        if (novoMes < 0)
        {
            anos -= 1;
            novoMes = 12 + novoMes;
        }

        const diaAtual = this.getDate();
        if (diaAtual > 28)
        {
            throw new Erro("A preciso normalizar o ultimo dia do mes");
        }

        /*eslint-disable*/
        const resultado = new Date(this.getFullYear() + anos,
            this.getMonth() + meses,
            this.getDate(),
            this.getHours(),
            this.getMinutes(),
            this.getSeconds(),
            this.getMilliseconds());

        throw new Erro("Esse implementação não foi testada completamente");
        /*eslint-enable*/
    };


    Date.prototype.AddYears = function (this: Date, anos: number): Date
    {
        return new Date(this.getFullYear() + anos,
            this.getMonth(),
            this.getDate(),
            this.getHours(),
            this.getMinutes(),
            this.getSeconds(),
            this.getMilliseconds());
    };

    Object.defineProperty(Date.prototype, "Equals", {

        value: function (this: Date, outraData: Date,
            opcoesData = u.OpcoesCompararData.Data,
            ocoesHora = u.OpcoesCompararHora.Ignorar): boolean
        {

            if (outraData instanceof Date)
            {
                return DataHoraUtil.SaoIgual(this,
                    outraData,
                    opcoesData,
                    ocoesHora);
            }
            return false;
        },
        writable: false,
        configurable: false,
        enumerable: false
    });

    Object.defineProperty(Date.prototype, "RetornarHashValidacaoUnico", {
        value: function (this: Date)
        {
            const dias = Math.floor(new TimeSpan(this.getTime()).TotalDays);
            return new TimeSpan(dias, this.Hour, this.Minute, this.Second, this.Millisecond).TotalMilliseconds;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });

    //Date.prototype.ToString = function (args?: any): string
    //{
    //    return this.toString(args);
    //}
    //#endregion
}

