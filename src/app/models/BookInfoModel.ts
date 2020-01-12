export class BookInfoModel
{
    id:string;
    title:string;
    author:string;
    year:number;
    description:string;
    genres:string;
    rating:number;
    
    constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}