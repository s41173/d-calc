document.addEventListener('deviceready', function () {
    
  document.addEventListener("backbutton", function(e){
    
      var bodyId = document.body.id;
//      alert(bodyId);
      
   if(bodyId == 'index'){
       e.preventDefault();
       navigator.app.exitApp();
   }
   else {
       navigator.app.backHistory()
   }
      
//     alert("Hello Aq kembali");
  }, false);
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);

// batasan jquery


$(document).ready(function (e) {  

$('#cglasstype').change(function() {
    
    var val = $("#cglasstype").val();
    $.ajax({
        type: 'POST',
        url: "http://calculator.dswip.com/api/get_glass/"+val,
        data: $(this).serialize(),
        success: function(data)
        {
           document.getElementById("glassbox").innerHTML = data;
        }
    })
    return false;
});

$('#submit').click(function() {
    
    var width = $("#twidth").val();
    var height = $("#theight").val();
    var heightkm = $("#theightkm").val();
    var heightkm1 = $("#theightkm1").val();
    var color = $("#ccolor").val();
    var glasstype = $("#cglasstype").val();
    var glassid = $("#cglass").val();
    var kusen = $("#csills").val();
    var pid = localStorage.getItem("pid");

    var nilai = '{ "pid":"'+pid+'", "width":"'+width+'", "height": "'+height+'", "heightkmtop": "'+heightkm+'",'+
                  '"heightkmbot": "'+heightkm1+'", "color": "'+color+'", "type": "'+glasstype+'", "kusen": "'+kusen+'", "glass": "'+glassid+'"}';

    var con = "";

    if (width != "" && height != "" &&  heightkm != "" && heightkm1 != "" ){
    $.ajax({
        type: 'POST',
        url: 'http://calculator.dswip.com/api/calculator/',
        data : nilai,
        contentType: "application/json",
        dataType: 'json',
        success: function(data)
        {
            $("#material_table tbody").empty();
            for (i=0; i<data.content.length; i++){
                    var datax = data.content;
               
 con = "<tr> <td class=\"text-center\">"+datax[i].no+"</td> <td>"+datax[i].name+"</td> <td class=\"text-center\">"+datax[i].size+" m <sup>2</sup> </td> <td class=\"text-right\">"+datax[i].amount+"</td> </tr>"; 
 $("#material_table").append(con);
                }

            $("#htotal").html(data.total);

        },
        error: function (request, status, error) {
            alert('Request Failed...!');
        }
    })
    return false;
   }else{ alert("Dimension Required..!!"); } // end validation
});

});  // end document ready	
   
   function category(param){
       
    localStorage.removeItem("category");
    localStorage.removeItem("catname");
    localStorage.removeItem("model");
    localStorage.removeItem("modelname");
    localStorage.removeItem("pid");
       
    $(document).ready(function (e) {   
    
        var nilai = '{ "id":"'+param+'"}';
        
        $.ajax({
            type: 'POST',
            url: 'http://calculator.dswip.com/api/category/',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              for (i=0; i<data.content.length; i++){
//                  alert(data.content[i].name.toUpperCase());
                  var datax = data.content;
                  var con = "<div class=\"col-xs-4\"> <div class=\"thumbnail shadow\">"+
"<a onclick=\"series("+datax[i].id+",'"+datax[i].name+"');\" href=\"#\"> <img class=\"img-responsive\" id=\"pict\" src=\""+datax[i].image+"\" alt=\"\"> </a>"+
                            "<div class=\"caption\"> <h5 class=\"judul\"> "+datax[i].name.toUpperCase()+" </h5>"+
                            "</div> </div> </div>";
                  if (param == 7){ $("#doorbox").append(con); }else{ $("#windowbox").append(con); }
              }

            },
            error: function (request, status, error) {
                alert('Request Failed...!');
            }
        }) 
        return false;
        
    });  // end document ready	
       
   }

 function get_series(){
       
    $(document).ready(function (e) {   
       
        var param = localStorage.getItem("category");
        var nilai = '{ "category":"'+param+'"}';
        $("#cattitle").html(localStorage.getItem("catname").toUpperCase());       
        
        $.ajax({
            type: 'POST',
            url: 'http://calculator.dswip.com/api/series/',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              for (i=0; i<data.content.length; i++){
var datax = data.content;  
var con = "<a onclick=\"product("+datax[i].id+",'"+datax[i].name+"');\" href=\"#\" class=\"list-group-item\"> "+datax[i].name.toUpperCase()+" <span>&raquo;</span></a>";
                  
        $("#list").append(con);        
                  
              }

            },
            error: function (request, status, error) {
                alert('Request Failed...!');
            }
        }) 
        return false;
        
    });  // end document ready	
       
}

 function get_product(){
       
    $(document).ready(function (e) {   
       
        var category = localStorage.getItem("category");
        var model = localStorage.getItem("model");
        var nilai = '{ "category":"'+category+'", "model": "'+model+'"}';

        $("#pro_title").html(localStorage.getItem("catname").toUpperCase()+" - "+localStorage.getItem("modelname").toUpperCase());     
        
        $.ajax({
            type: 'POST',
            url: 'http://calculator.dswip.com/api/product/',
            data : nilai,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) 
            {
              for (i=0; i<data.content.length; i++){
var datax = data.content;  

//var con = "<a onclick=\"product("+datax[i].id+");\" href=\"#\" class=\"list-group-item\"> "+datax[i].name.toUpperCase()+" <span>&raquo;</span></a>";
                  
var con = "<a onclick=\"calculator("+datax[i].id+");\" href=\"#\" class=\"list-group-item row\">"+
             "<div class=\"col-xs-8 detail\">"+
                  "<h4 class=\"list-group-item-heading\"> "+datax[i].name.toUpperCase()+" </h4>"+
                  "<p class=\"list-group-item-text\"> "+datax[i].sku+" </p>"+
             "</div>"+
             "<div class=\"col-xs-4\">"+
                   "<img src=\""+datax[i].image+"\" class=\"img-responsive\">"+
             "</div>"+
         "</a>";
                  
       $("#pro-list").append(con);        
                  
              }

            },
            error: function (request, status, error) {
                alert('Request Failed...!');
            }
        }) 
        return false;
        
    });  // end document ready	
       
   }

   function get_product_details(){
    
 $(document).ready(function (e) {   
    
     var pid = localStorage.getItem("pid");
     var nilai = '{ "pid":"'+pid+'" }';
     
     $.ajax({
         type: 'POST',
         url: 'http://calculator.dswip.com/api/product_detail/',
         data : nilai,
         contentType: "application/json",
         dataType: 'json',
         success: function(data) 
         {
           for (i=0; i<data.content.length; i++){
var datax = data.content;  

$("#protitle").html(datax[i].sku.toUpperCase()+" : "+datax[i].name.toUpperCase()); 
$("#proimg").attr("src",datax[i].image);        
// $("#material_table").hide();
combo_color(pid);

           }

         },
         error: function (request, status, error) {
             alert('Request Failed...!');
         }
     }) 
     return false;
     
 });  // end document ready	
    
}

function combo_color(pid){
    
    $(document).ready(function (e) {
        
        $.ajax({
            type: 'POST',
            url: "http://calculator.dswip.com/api/get_color/"+pid,
            data: $(this).serialize(),
            success: function(data)
            {
                document.getElementById("colorbox").innerHTML = data;
            }
        })
        return false;
        
    });  // end document ready	

}


