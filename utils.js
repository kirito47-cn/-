class Utils{
    parseQuery(url){
        let queryParams = url.split('?')[1];//?name = zhangsan & pwd = 123
        let singleQueryParamArray = queryParams.split('&'); //['name=zhangsan','pwd = 123'];
        let paramsObj = {};
        singleQueryParamArray.forEach(param=>{
            paramsObj[param.split('=')[0]] = param.split('=')[1]
        })
        return paramsObj
    }
}
function getMost(strArr){
    let obj = {};
    strArr.forEach(str=>{
          if(!obj[str]){
            obj[str] = 1;
          }else{
            obj[str] ++;
          }
      })
    let max = 0,theMost = '';
      
    for(let i in obj){
      if(obj[i] > max){
        max = obj[i];
        theMost = i;
      }
    }
   return theMost;
  
  }
  getMost(['abc','gdd','abc'])