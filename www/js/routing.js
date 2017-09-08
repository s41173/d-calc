   function series(cid,catname){

      localStorage.setItem("category", cid);
      localStorage.setItem("catname", catname);
      window.location.href = "series.html"; 
   }

   function product(mid,modelname){
     
      localStorage.setItem("model", mid);
      localStorage.setItem("modelname", modelname);
      window.location.href = "product.html"; 
   }

   function calculator(pid){
    localStorage.setItem("pid", pid);
    window.location.href = "calculator.html"; 
 }