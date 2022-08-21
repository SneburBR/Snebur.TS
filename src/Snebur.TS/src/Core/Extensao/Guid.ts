//namespace Snebur
//{
//    export class Guid extends String
//    {
//        public constructor(guidString: string = u.GuidUtil.GuidVazio)
//        {
//            super(guidString.trim().toLowerCase());

//            if (ValidacaoUtil.IsGuid(this))
//            {
//                throw new Erro(`O valor '${guidString}' não é um GUID`);
//            }
//        }

//        public Equals(guid: string | Guid)
//        {
//            if (guid instanceof Guid)
//            {
//                return this == guid;
//            }
//            return this.toString() == guid.toLowerCase();
//        }

//        public static NewGuid(): Guid
//        {
//            return new Guid(u.GuidUtil.RetornarNovoGuid());
//        }
//    }

//    (Guid as any).Empty = function ()
//    {
//        return new Guid(u.GuidUtil.GuidVazio);
//    }
//}
