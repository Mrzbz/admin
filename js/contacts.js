
// var uid = sessionStorage.getItem("uid");
// if(!uid){
//   location.href = "index.html";
// }


//存取页面大小
var pageSize = localStorage['pageSize'];
if(!pageSize){
  pageSize = 10;
}
$('#page-size').val(pageSize).change(function(){
  localStorage['pageSize'] = $(this).val();
  loadProductByPage(1, $(this).val(),"");
});

//分页条单击事件处理
$('#pagination').on('click', 'li a', function(e){
  e.preventDefault();
  loadProductByPage($(this).attr('href'), localStorage['pageSize'],"");
})

//分页加载数据
function loadProductByPage(pno, pageSize,kw){
  $('#table-laptop tbody').html('<div class="loading"><img src="img/loading.gif" alt=""></div>');
  $.ajax({
    url: 'data/20_contacts.php',
    data: {pno:pno, pageSize: pageSize,kw:kw},
    success: function(pager){
      //表格内容
      var html = '';
      $.each(pager.data, function(i, l){
        html += "<tr "
        if(l.expire==1){
           html += ` class="expire">`;
        }
        html += `
            >
            <td><input type="checkbox"></td>
            <td>${l.lid}</td>
            <td><img class="pic" src="${l.pic}"></td>
            <td><p class="fname" title="${l.fname}">${l.fname}</p></td>
            <td><p class="title" title="${l.title}">${l.title}</p></td>
            <td><p class="spec" title="${l.spec}">${l.spec}</p></td>
            <td><p class="pprice">￥${l.price}</p></td>
            <td>`;
        if(l.expire==0){    
        html += `    
              <a href="#"  data-action="detail" data-id="${l.lid}">详情</a>
              <a href="#"  data-action="update" data-id="${l.lid}">修改</a>
              <a href="#"  data-action="delete" data-id="${l.lid}">删除</a>
           `;
        }
       html += `    
              </td>
          </tr>
        `;
      })
      $('#table-laptop tbody').html(html);

      //分页条
      var html = '';
      html += `<li class="${pager.pno<=1?'disabled':''}"><a href="${pager.pno>1?pager.pno-1:'#'}">上一页</a></li>`;
      if(pager.pno-2>0){
        html += `<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
      }
      if(pager.pno-1>0){
        html += `<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
      }
      html += `<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
      if(pager.pno+1<=pager.pageCount){
        html += `<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
      }
      if(pager.pno+2<=pager.pageCount){
        html += `<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
      }
      html += `<li class="${pager.pno>=pager.pageCount?'disabled':''}"><a href="${pager.pno<pager.pageCount?pager.pno+1:'#'}">下一页</a></li>`;
      $('#pagination').html(html);
    }
  })
}
loadProductByPage(1, 10,"")

//$('#product-kw').bind('keyup',function(event){
$("#product-kw").keyup(function(e){
  if(e.keyCode==13){
    loadProductByPage(1, 10,this.value)
  }
});


//删除方案一：DELETE FROM xz_laptop WHERE lid = 2;
//删除方案二：UPDATE  xz_laptop  SET  isdel = 1   WHERE lid = 2;
//删除方案三：UPDATE  xz_laptop  SET  expire = 1  WHERE lid = 2;
//删除方案四：SELECT * FROM xz_laptop WHERE lid = 2;
//          INSERT INTO delete_xz_laptop... del_user del_time del_uid
$("#table-laptop").on("click","[data-action='delete']",function(e){
   e.preventDefault();
   var lid = $(this).data("id");
   var td = $(this).parent();
   var tr = $(this).parents("tr");
   var fname = tr.find("[class='fname']");
   var rs = window.confirm("您确认要删除："+fname.html()+"对应记录吗?");
   if(!rs){
    return;
   }
   $.ajax({
     type:"post",
     url:"data/05_product_del.php",
     data:{lid:lid},
     success:function(data){
        if(data.code>0){
          alert("删除成功");
          tr.addClass("expire");
          td.html("");
        }else{
          alert("删除失败");
        }
     },
     error:function(){
       alert("网络故障请检查");
     }
   });
});



//更新产品
$("#table-laptop").on("click","[data-action='update']",function(e){
  e.preventDefault();
  var div = $(".update-jumbotron");
  $("[data-action='update-ok']").attr("data-lid",$(this).data("id"));
  var td = $(this).parent();
  var tr = $(this).parents("tr");
  var fname = tr.find("[class='fname']");
  var price = tr.find("[class='pprice']");
  div.find(".pname").html(fname.html());
  div.find(".input-price").val(price.html().slice(1));
  div.show(500);
});

$("[data-action='update-ok']").click(function(e){
  e.preventDefault();
  var lid = $(this).attr("data-lid");
  var val = $(".input-price").val();
  $.ajax({
    type:"POST",
    url:"data/10_product_update.php",
    data:{lid:lid,val:val},
    success:function(data){
       alert(data.msg);
       $(".update-jumbotron").hide();
    },
    error:function(){
      alert("network error");
      $(".update-jumbotron").hide();
    }
  });
});

$("[data-action='update-cancel']").click(function(e){
  e.preventDefault();
  $(".update-jumbotron").hide(500);
});

$("#table-laptop").on("click","[data-action='detail']",function(e){
  e.preventDefault();
  var lid = $(this).data("id");
  $.ajax({
    type:"GET",
    data:{lid:lid},
    url:"data/06_product_detail.php",
    success:function(data){
      //console.log(data);
      var div = $(".detail-jumbotron");
      div.find(".pname").html(data.name);
      div.find(".pprice").html(data.price);
      div.find(".pcategory").html(data.category);
      div.find(".pos").html(data.os);
      div.show(500);
      console.log(div);
    },
    error:function(){
      alert("network error");
    }
  });
});

$("[data-action='detail-cancel']").click(function(){
  $(".detail-jumbotron").hide(500);
});