﻿namespace Snebur.Imagens
{
    export class ImagemMemoria
    {

        private static _urlImagemVazia: string;
        private static _urlImagemCarregando: string;
        private static _urlImagemPendente: string;
        private static _urlImagemSemImagem: string;

        private static readonly ImagemVaziaBase64: string = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        private static readonly ImagemCarregandoBase64: string = "data:image/gif;base64,R0lGODlhHgAeAPf2AP7+/v39/fDw8O/v7/z8/PHx8e7u7vv7++Xl5fr6+vn5+ebm5gAAAPX19fT09Pb29vPz8/f39/j4+Ofn5/Ly8tTU1O3t7dXV1cnJyezs7Ojo6Orq6uTk5OPj476+vuvr69nZ2cjIyNbW1unp6crKytjY2MvLy9zc3LOzs7KyssfHx+Hh4b+/v9/f3+Li4tPT097e3sDAwNfX193d3dra2sHBwYmJidvb2+Dg4L29vby8vM/Pz7e3t9LS0sTExNDQ0LS0tIiIiLW1tcbGxszMzLi4uLq6uoyMjHBwcMPDw8XFxVhYWLGxsXFxccLCws7Ozra2trCwsG9vb42Njbm5uc3NzXNzc4qKilpaWtHR0bu7u3JycpKSkjs7O3Z2dq+vr66urj09PVlZWaioqKSkpISEhIKCgpqaml5eXnR0dJGRkSIiIltbW2lpaaWlpYaGhouLi1NTUz4+PqmpqXh4eI6OjpWVlZCQkJSUlJ6enpiYmJycnKqqqmpqakNDQ4eHh6Kiop+fn6ysrCUlJW5ubklJSa2trVRUVIODg4WFhUBAQCAgIKGhoV9fX0FBQYGBgaamppaWlmxsbFxcXGBgYFdXV5OTk5mZmTY2NiQkJB8fH21tbXl5eVBQUDw8PHt7ez8/P11dXX9/fzU1NSgoKJubm2dnZzQ0NDMzM52dnVFRUWtra5eXlyoqKk5OTiMjI1VVVQoKCmRkZE1NTaurq0ZGRjk5OTc3N35+fo+Pj0VFRX19fSEhISkpKURERBsbGywsLCcnJ6enpxgYGB4eHmJiYlJSUhoaGk9PT3V1dWFhYR0dHUdHRwUFBQcHBzg4OICAgCsrK6CgoFZWVi4uLmNjY3x8fGhoaGZmZkJCQkhISBYWFmVlZTo6OkxMTBISEnp6eqOjoxUVFS0tLQsLCxwcHBcXFzIyMhkZGRERERMTEzExMQ8PDw4ODiYmJgICAnd3d0pKSgQEBDAwMA0NDf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgD2ACwAAAAAHgAeAAAI/wDrCRxIsKDBgwgRNoCQsGHCO1YcNgwgZMBAAJjMPRgY4AEAiQOnxbFYD0EsBkQEBihgIABIgTbETWJYgwEDQPVWDijwUuCQYJoe1Rtj8009BwIENOhZT4GqYK+o8GnHDhGAnQIIOIxxhcoIgXuGUbNDYcGEDA0MCGBYLwGFDAIMtuiESZUZDBZ2lTCoYECCBxkWIOgQ4SAMLF1AdZnTsECHBZCXIpzgpYu2vQklIEAwobBDMmokZjDwMaGDFSVOsG2YwAEFBwoKQmAxRUq1SZNgSJQgosIFGTA2xK6nIQiaSkvELKEhMcKFCxWi01hdb4ISQXkCLZCYYIILBBk8JsTMUEMiAp4OA9T4hOREQwgYSOA4kDCAMEJW+uhpCGKIiRAXJHCQBIC0IQU0goygAg4GDQBCAzg8gYEKFdBXUAicXFJDXB0EcYQQFFhgAAQgxKDFdgpMIIMJLhj0wEYDfXFFEEMskAITN0zgQQwmuCTQAQI2NAAXNrgRQAcopABCPT14wIIFTFWRCB4f1LNAku41oIQOS/YExhQtCCQAFChMIFABSWBQGkgxIDDQAR7wAONRJWjFFEE/DHGnQwVAueefBgUEACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEhwoAEDBRMqXFjHxsKHAgHUeDCQQC0/CQY6+BIA4kBJdCQIvDEOWAmBB1zJqedRYKlzIe1pGZQJij0FnRjQaSnwSbYud+y54bWIkb0tDBjE4GnvARZffmaQyTQo3JOkpDIuBKKGxwKBbjAxgwLhBowHWsoxCCJQgQMBDgh2KBZH1hQaFB7RSCgA2ogDAgYIMCCSIAhJbBLzgAjBQIECAyIotGCmEqUTEBMYCKxVYYAidloKgNBRoQB7J2Yg9HigQYQICQAIdOCBi7VkVja94MlhAYIFGgYQsKdmixQkSNr8aCmh9wLfCyT3rMEDSIeWBwwMKAChcEIDPoZDt8wgfWE9JQ2vP0xQ4sIClgkjgLEx5Q0tiBxeyLgAI2ECYWXYYAkLEvSwQUIQtEAAAiJc8MIJ4glkgh6GmACBPQukIMQFhUngAgkqHGjPCC2UoAFBCsgWUQxCoDABBzro4MIHIZBQAXz2ABChQlAA4UQ9HHjggQv2vEACCRQwRUMUVJymAQsefOXAEyqo15IKPKxmTwwsDCAQBCZcgCNEO5w2kBI+dAbBCSp6VNpAFfTAVEsUXNhSQAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcKAACgUTKlzIhcvChwIPJEkwUMGSaREGPrB3AOJAL4gcDNTlC4RAC4dmeRx4plMZBfaGOAJVw96DJdtWDjTBZokbezrkhBFi79GiVyl02ouwBU0oGEEVFXGyppUcAQ9j6GHBQWAOWGi+FDjRAsKYLsP2CBTB5ZAagiM+9fHCyh6AOzISZvhTwEmhZgzUzSjY4RGSLU2iQBTEoPGyCgozsJLSZAdECKcYFMLxsJ6TPCt53KmnEMCADjBaDFhZr14CCQoCCISQRJqaI3De0Fh5wIIAAQMOHhghbIqN42VKrExgocDvAQZg2jMAosqQJBtWBnDgoMED6QkbXLAgfbkBRAIVgKAYcR4BBwuyEypQkgJKiiEAHn7gMAGBho4FJRFFCkWAcMAFHyR0wAa9IeCgBgXRoAMGJ5i3QQ4e5HWQAhuAUEEBAgnwwQIGEASgQAGQEEMOHHygggoaFPCCCDTkN1B8ClnAAgtP2LMBBhhAeIIIFyhlDwg6+GBeBkBmJ0EJFSCgFAZOYGVPASRgMJADFwymXQkICaQAEVWA90AHSpE3kAh5GQmRSDoFBAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcOAGDQUTKlyYh9XChwLrhaAwkMAWSRIGFkhRD+JAO38aCORACQ0MgRGwtfE4kEebSAfsPWGDRYW9AHRORWIpcIYVQl/sxRAjpoi9PZ4UmXgIgGA9NVaagHACa0mOHaD8YGs6MABBDGRiuPC6gxASewJudGgA5dAoowlUBLF3hKADPWXgBHqh4FKFhBQCZTDkzd0vTB0KCthzZUoQPl4XchnWapAcGgodgLERxObDAYqWhVoAUQSkCB7HAHr4IAOCDzwJ1ChCZENHew1ExOABBAWY2LwYMIi1TtQCCiao9PZ9g2WAV8IZfJvUQuABCy5O4LDAMkEpO4Z6SLa4XXBAj5gQG0R+KMODjhUeLQwQQGAhEQ9OcmCAOGAABQEGJEQACTp4kMQNEoAggIAGKADBfAUMUNAMSfTAgQL2GBACBjAcIMEBBxSAQAcQ2EOAAwAWQFB9A9VTgQkhjCBABSJkAAECEyDUFVcKFYABBiUIVMFf9mywAAIi8eSCCj8kkOGQGZg4AQLc8XSBCQ8I1MAFFVBkTwII6OhRPSs4UFEJMqBnjwIZkMfTQDic9CZLXnoUEAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcKCBEQUTKlw4JtXChwIB7HAwMEGZXQ8GPjBCAOJAPqwyCPzAKc2KkV5weRyoAtEeCPZmpGnywt6DXZ3IrBQ4oU4QJvZ6NEESwl6gSqFqLgxAMACjIzZo/OjTRkUJNo2aSHh4woeIDQeC/rGRQgORLAbAyDokxN6BC2S20CKoIMcXIDluBACzIyxBDW4cCJGla1ScDQUheEghJEUIvwrn3PITZtIMhRGIoEjRwiMWW2ZEPvxgAvLCIloWJihgb8ICATuFGPLQY8DAF0pisPBgBMZKCrc0DWplq4+IBll81Njde2WDbsQGRbNVLIvABBQ2cOgA2yMAFJCoVLrorhAEU4hKgEBUcAJDiA8e5TBoJLpghCwYTIQQUe8hDwYAjuMbQQn8MAQJP7hwAAIUJUQBBWfMA+AiCA00QQ8tGNBRBi/IsIA9EWxFgQEGNCCQCWYwg0dT/UVEgwgvCACBCy4I8MAABQxwnj317JiQAyJcAAMAECCAAGsFCCBABDu19kIJWzVgJEUHGCAABU3OIEODCiywAJP2KEAiACsBsIACAwXgWgIDEQCBj03as4EGcXokwVYrBQQAIfkEBQoA9gAsAQABABwAHAAACP8A7QkcSHCghQ0FEypcyGPOwocDQTQYeOCMJYINWByAODAEDwMDc02ZIDDDmyMcB9KIYmTiiiNXZNhrMOUak5QCBwhBEcLeiSs2qtgbQ8gKCJwCYwhJsYBGGURP7DVJ8ycBwY0DOWA4arVDCiAkPvzokeFLsj4s7CkYKurmwAQhtLBQMuPAkxUECAJYMeeBjjRoVCERUPABCQ81PJjI+zAOGjFpOChMIMNDDhcQR7RZEonwwwwVAnA0smOhAgoWBBZIKaEIFB8XPD+QUYUEBgxKJHM0EK+LIj/IvNx4cGOHCdtKSHIsMCuMn0KVzKwQSKDBgA0jHKQMoKLGDxcPFkK0QFCPYwpAHHG8EDHxoYNCx6q1WAjigogKHSAyOUZqTZfSBZXwwgUgaBDABhIoNIYGkMwSDTqjYDaQBicsQIFoBXCAQAYEKJBAPTncwkAQ9hywAx6hqKEXQQFMMAECBTyQgQUEGMEAA4skiFMECCyAUAQFCKDdFjd6gNQAHCxglQQCCDDRA3IwsAVSGiAQwUADCLCWPRnYgkp5HNUjgFXUZcmYPREEQiZSAxUwAJscHbAlRwEBACH5BAUKAPYALAIAAQAbABwAAAj/AO0JHEhQIAQDBRMqVPhDycKH9urNIBggB48IAyP4gDiwipMCAgtAQaHBYKpLADjaO6Fjo70FKFBMlMCojBCVAlmwIGJvRUwR9qDYsCFjYT2CAEzE8DACARgwNEYcqaNHAcGjAhf0aDEg5YQcHp4YODFRy5s/GCJ24GGpCMEsKjBkmWBvx40EBA/8gGSvh6U0fUR9IJjgAgYTIbIceAhokxUpUwQkJHADQ4iSD1ekkZLKwUMDNLA+pJJFIQEHBjQYkKDSgQcjQ2Y8ELiixIUKFXqA5KiBzRIsaFbdaVH7doUXDVQOaPQbjSRLOASiHmGBNccESWDDwJiwgQWVOYw8sCTwAQEH6wslUHoGTnJBAhoWTEAwAmIUTNnCyBo88MACBAhMUEACBlhVEARwLJBEE7qMEkcHAw0wgQXJ2dPAABZAoABrCnjgiDl4RHSDNEgEMpBo9gAwQAECBDDHMprk8sQawHiym0AoFrTiAPWMwQADiAi0xhpR4ERBAQjZw8KPe9hTgDfHNIHTAKsJhEMzDCQh0ATMgBKAShRQFAw5Nw5wxGw4EZSGK2lyhAAIOAUEACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEhwYAIIBRMqXAjDxMKHAzs4GAiASIwHAw+AUABxoAgSAwRGSOJhgsAHTowQ6CiQgwoiEwew8CCQgJIvKlgKhECCRA8AG1iwAGHvRQoUNx4GAEDwI4YOI7RoEWEACJQiEQiuHLihxAoDB+wJCBGiAoUOHQxcYMKkxMAYjLQwFXjgxIsLJTQQgIEg7EACC0JIKOHmSCI1CwoegFFBRoUTcxWieHPExpkNCgOsqHBBAEQYcIK4CfkQggaWSSo8fEBBwIAELCE4qUGkRQOBCT4sQIBgAQeMHREgkYLECq5AHQ5kmMAbQYesHTU0kdIkjRkyHAQGiAChwAC/EBWYxRiyYwVHhREKsGQRo6NrC+cXUpACC5fJhAcGFKAwgPRCKktMggUSMxREgAGuDeAAAJCoV1ADl12ACCVxUELUQA8YoN5KGDDQChn2FFAABENgcUoeAs0giBmAEARAZPWowgADb/iAySiJZAGKL3FYQFAAD4HQDAO+2KMDL5pYYw8gnoTBh0724MGAJh3YY0Iva9xhTwCfoMIJlJ0Q84JAI9yyiBACUWCFMfE9BMAZKwxUjxi9VIlbFBNBSRArbOjZkQUt6BQQACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEiQYIOCCBMqXJAFgMKHAjkQrCcihIOBBFpAJIijggCBCqqE0CBQAhEnBzYK/FBBhEAKJDBoBLBDRxWVAh9cEAGCgAASJG7YO+HBwwmIAQbWa3GhggYDQ1TQsMeihpODCiEg+FAggb0GO3FEsPBBwAwdOUDYA8CyBhGCBEYgmGsgwQgKDgcGGPHkwQQnQKIIyVCQwAYEE+ZC/MFECBAjFhRmQNDh4sMMUJjEoACxgQGVMiQqlNAAAoWUKkmY6LECYwEDAwQIMCBB5YQgQWzAwWPIHgEKA4LPVqByhI0gV6boSTFhoIIHDQLUUxmhwg8ZC2onLEJLpQ4WSLcwshA3AqIGcJLgIEgYAQuD9/AgapGypYmoowQhKHoPLI+FPDAglIEeBsxwiRerNFECQUXIkUYOxO3AyylcPPDBBoSZYowbEelghyAESUdQG4MQY0YFhdRyxQqUNMJNeQPlldAJ1GQyiwQXOOLJFfagIIYYYOBkDxm/nOJSC4WEcYY99ViiCiJC9gEMBgI1sEQXRggUQR3XRIDTHmoNxIkj6wkEgA4QCFkQCpvIqGZCDoi2UUAAIfkEBQoA9gAsAQABABwAHAAACP8A7QkcSJBggYIIEyq0UKKewocCBzwgiONFg4EAXESAOPBDh4v2AoCokEGgSBUbOdorgADBRQkiLiCwVw9EiCwAVNpTgGACggMPLlzAYW9FCAwtHtbLOXDDggUfIlyogMABCSIkIBBkKvCBBQEODth7wIHDiAQPHkjgECLEQAM0TPzYKqCAAAMUCGRo4HBgPQhZHBiowsKDBwsFAwyoK+ADxBM6YsSo4TihXQsTHwqI4QGDAIj1HKi84UJhgBtALtUpyfEBjBswRqSEYG3NOwYMnJXmCCFFChQoePhY4AAaKXm4dauEgMI3iiJDMLYokurMZ5UrTuConPAFI5VJTEC1TPAnWC8RHHMFYTRBIbdF0dCZgqgiyJEjd2YUBFBt25ouXFAwBggIaWDHBBPwccQfV+wmEBW1WCHIAPaAIIc2dTTAwQoaYGCFJIAINIEPwjDBlVgEJaKIJ1ds0MgSpRjgxYwL7KdQBq44IkYDGiiDRSn25EAIEkDoZA8Vz7hSgj0DmCLGHAKNsQocRsKhywUmeTGNDwLVAwkSFHJUTwonEBTJEgTV44QBRhaEwSd9tfmQfioFBAAh+QQFCgD2ACwBAAEAHAAcAAAI/wDtCRxIcGCABgUTKlzooEOAhRAFOohA8AOHghoiEqRggeCEBQYGrqigQKPABwIGPLCXYMGCDQI7vLjx0GQCAxRCSkAwYYS9DRUurIAYoB5BAQUKUHjggsMECTJkVChQEMDAEF0IUVmpwIDXAxEkKBhQokILe/UacBBRgmA9NAwYZPqD4AHFggc6RBBQwkQIFT7dtonLAIvRhRxUkFgcOKEZZ+QqRHxQJcSOkBBl5DHpAkfNgglcYEDx5YNJBS43FJAgkMKUQudIvSoXwqQDDzk81PBRRfWjbqQyrfmlxDZuDyxqYFggEMILI+H2XNSooIOLBRYaWE2ogc92iDRwRLUEQAtZmNoQKRhhUqNjwnpcuvh5pixBZiZAgPBg7vYIqjBxqDGBD08kNAETH2zggxBMoDABQTuw8QgPHVlgChZHFDBDeDvYkEgKAhkgQhIqfJbAZ/aQIcYSkYxgxSZ4ZMDFFHXgBZEDhLCxygAW0NHEJfZ0aAMVJgn0wxLK/GBPAbtIQYZAUJQhzXcRzXHIEAPBsYoRAhEQxRQQFMkDEQTN0UZbXYYwQJEJVZCIfWxG1AAMRQYEACH5BAUKAPYALAEAAQAcABwAAAj/AO0JHEiQoISCCBMqfJDhgMKHAmv8IFhgQISB9QoogDiwVCwfAwUIcCAQgAUXFznae8IgHQZ7BAQUKCDQAoIJBFTakzCIATUH9WQKsAcBwYIPDwkAINiGAYNN9QwMMKBgwQQEJBVWgSWqCEkaseiZCUAgwYEGHG4GsBdhA44TCQg2+pbJTyQFZ0wk1ABBAQ4RFXogJTgA26Jev/pAhCDigowLGhISSLRGUw6IAU68uDAAYg46DzhuWHAQYUYQIZxwUHngwwcLEHLaS0CF06FajlB9UamARAgMJn7cEBDBjjFFYcKgEqRSAobnGEjs2CBQQo8oqdQQ0dmixQq+axFSxIhCgSOOFrIT1gthKg7IhxKU6DCRtSAAQ6HQVEqWMuEKLTXEkMQICLmBTCXFcDGACu8R1IAKBYxAggc5eGABQQjQUQYfqxWAixR2ZNBBCxp0wEMU2wUwwgUk/LDUQA4NlIIUSJxRwB1v8KEAFVCgcOFA6SFEwBVNfJLBA3hcYYg9N6SAggg62bOAF0iQwJYeQUBhDwAkRFFDeBwpcQ0LA+XxhgoCHaBCCvVBVIVeAzFRxgkEvTBUlARdkEubeCIUAZQqBQQAOw==";
        private static readonly ImagemPendenteBase64: string = "data:image/gif;base64,R0lGODlhMAAwAPYAAPVAM/VBNPVCNPVDNvVEN/VGOfZJPPZLPvZMQPZOQfZOQvZPQ/ZQRPZUSPZVSvZWSvZXS/ZYTfZZTfZaT/ddUfdeU/diWPdkWfdpXvdrYfdsYvdtYvdtY/hwZvh0avh2bPh3bvh5cPh6cfh7cvh8c/h9dPh+dfh/dviBePmFfPmGfvmIf/mLg/mNhfmRivmSi/mTi/mTjPmVjfqWj/qYkfqblPqfmfqhmvqinPqjnPqmoPuoovuqpPuwq/uyrfuzrfu0rvu4s/y9ufzAvPzEwPzFwfzGwvzHw/zIxPzMyfzOyv3Qzf3Sz/3U0f3X1f3Z1v3Z1/3b2P3b2f3g3v3h3/7l4/7n5v7q6P7q6f7v7f7v7v7w7/7x8P7y8f7z8v719f/39//4+P/5+f/7+v/8/P/9/f/+/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGcALAAAAAAwADAAAAf+gGeCg4SFhoeIiYqLjI2OjF4vEhIvXo+XilgSAJwAEliYoYRlGZ2dGmWioj6mpj6qmF4MrZ0MlrCOMrSmMriNVAS7nQRUvosgwqYgxolIya1IzIZjFc+mFWPShDzJA7Q82oJaCKYDCD5YWEDkpgha4S2tA06EUMGmLdpR3qYnhifyojAr04FWDkM5aHVI5WvILhqGaOwS4mvMJlohDIXYJSEbrIS7IBiqtuugKiwHkt0SNIYfrQOgRKV4xoRQlGcqRDWx9mqQEGtNMJXBYC0GIRvWMDB0FMSlMA+EUFgDEOQRmFnWHhC6YG0AAzCOJE4dAPZMmZRTazSyUmAqp2K2Z7S4BVDACiOAc5MIujmXxKIkczmBePFiY2C9iMhYCMy41YWlhXo0fsCCxYPGPQ55WcCYhccxKhgjWDnoBWNso0jOfVGIitOpEAvVYFxACiFkjG8YusF4wDJBRhoD0GBIw+upRsyqZqyDkA7hACqUCQ4dQIcdOwpWNxKjuvdWMUJ/H6/i+fjvOrxcPg/9gSUrIY53Oz8ghN1BW5gY2T9kv//+/BkB4H8BClhggUxsEc6CDDa4YCAAOw==";
        private static readonly ImagemSemImaagemBase64: string = "data:image/png;base64,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"

        public static get UrlImagemVazia(): string
        {
            if (!ImagemMemoria._urlImagemVazia)
            {
                ImagemMemoria._urlImagemVazia = ImagemMemoria.RetoranarUrlBlobFromBase64(ImagemMemoria.ImagemVaziaBase64);
            }
            return ImagemMemoria._urlImagemVazia;
        }

        public static get UrlImagemPendente(): string
        {
            if (!ImagemMemoria._urlImagemPendente)
            {
                ImagemMemoria._urlImagemPendente = ImagemMemoria.RetoranarUrlBlobFromBase64(ImagemMemoria.ImagemPendenteBase64);
            }
            return ImagemMemoria._urlImagemPendente;
        }

        public static get UrlImagemCarregando(): string
        {
            if (!ImagemMemoria._urlImagemCarregando)
            {
                ImagemMemoria._urlImagemCarregando = ImagemMemoria.RetoranarUrlBlobFromBase64(ImagemMemoria.ImagemCarregandoBase64);
            }
            return ImagemMemoria._urlImagemCarregando;
        }

        public static get UrlImagemSemImagem(): string
        {
            if (!ImagemMemoria._urlImagemSemImagem)
            {
                ImagemMemoria._urlImagemSemImagem = ImagemMemoria.RetoranarUrlBlobFromBase64(ImagemMemoria.ImagemSemImaagemBase64);
            }
            return ImagemMemoria._urlImagemSemImagem;
        }


        private static RetoranarUrlBlobFromBase64(urlIamgemBase64: string): string
        {
            const tipo = urlIamgemBase64.split(";").First().replace("data:", String.Empty);
            const inicio = urlIamgemBase64.indexOf("base64,") + "base64,".length;
            const base64 = urlIamgemBase64.substring(inicio);
            const bytes = u.Base64Util.Base64ParaBytes(base64);
            const blob = new Blob([bytes], { type: tipo });
            return window.URL.createObjectURL(blob);
        }

        public static RetornarNovoElementoImagemCarregadaAsync(urlImagem: string): Promise<HTMLImageElement>
        {
            return new Promise<HTMLImageElement>(resolver =>
            {
                const elementoImagem = new Image();
                elementoImagem.crossOrigin = "anonymous";
                elementoImagem.onerror = () => resolver(null);
                elementoImagem.onabort = () => resolver(null);
                elementoImagem.onload = () => resolver(elementoImagem);
                elementoImagem.src = urlImagem;
            });
        }

    }
}