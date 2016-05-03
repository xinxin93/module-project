define("service/commonErrors",["require","exports","module"],function(e,t){"use strict";t[100001]="数据库连接错误",t[100002]="数据库查询错误",t[100003]="请求参数错误";var n=function(e){}}),define("service/ajax",["require","exports","module","./commonErrors"],function(e,t){var n=e("./commonErrors");t.post=function(e,t,r){return t=t||{},r=r||{},$.ajax({url:window.rootBase+e,data:JSON.stringify(t),method:"POST",type:"POST",dataType:"json",contentType:"application/json;charset=UTF-8",async:r.sync?!1:!0,timeout:2e4,beforeSend:r.beforeSend||function(){var e=(new Date).getTime();r._time=e,r.holder&&r.holder.append('<div class="data-loading data-loading-'+e+'">').addClass("data-loading-relative")}}).pipe(function(e){r.holder&&r.holder.removeClass("data-loading-relative").find(".data-loading-"+r._time).remove();if(e.status===200)return e;if(e.status!==302){var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()}window.location.href=window.rootBase+"/login"})},t.jsonp=function(e,t,r){return $.ajax({url:e,data:JSON.stringify(t),dataType:"jsonp",timeout:r,scriptCharset:"UTF-8"}).pipe(function(e){if(e.status===200)return e;var t=$.Deferred();return n[e.status]?t.reject(e):t.reject(e),t.promise()})}}),define("service/web-pagelist",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getProducts=function(e){return n.post("/compute-api/web/productlist",e)},t.getPageList=function(e){return n.post("/compute-api/web/pagelist",e)}}),define("common/eventEmitter",["require","exports","module"],function(e,t){var n=$({}),r=Array.prototype.slice;t.fire=function(){n.trigger.apply(n,arguments)},t.on=function(e,t){n.on(e,function(){t.apply(null,r.call(arguments,1))})},t.un=function(){n.off.apply(n,arguments)},t.once=function(){n.one.apply(n,arguments)}}),define("common/utils",["require","exports","module"],function(e,t){t.deepCopy=function(e){var t,n=e.constructor;return function r(e,n,i){var s=e&&e.constructor,o,u,a,f,l=n===undefined;if(s===Object){o=l?t={}:n[i]={};for(u in e)r(e[u],o,u)}else if(s===Array){a=0,f=e.length,o=l?t=[]:n[i]=[];while(a<f)r(e[a],o,a++)}else if(s===Function)try{n[i]=(new Function("return "+e.toString()))()}catch(c){n[i]=e}else typeof e=="object"?n[i]=new s(e):n[i]=e}(e),t},t.refreshQuery=function(e,t){var n=location.search;if(!e)return"";if(typeof e=="string"){var r={};r[e]=t,e=r}if(!n){var o=[];for(var i in e)o.push(i+"="+e[i]);return o.sort(),"?"+o.join("&")}for(var i in e){var s=!1;n=n.replace(new RegExp("([?&]"+i+"=)([^&$]*)"),function(t,n,r){return s=!0,n+e[i]}),s||(n+="&"+i+"="+e[i])}return n},t.getQuery=function(e){var t=location.search;if(!arguments.length){var n={};return t?(t.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,r){n[t]=r}),n):n}var r=(new RegExp("[?&]"+e+"=([^&$]*)")).exec(t);return r&&r[1]},t.format=function(e,t,n){return t=t||",",n=n||3,(""+e).replace(new RegExp("(\\d{1,"+n+"})(?=(\\d{"+n+"})+(?:$|\\.))","g"),"$1"+t)},t.parseToDate=function(e){return t.toDate(t.parseToTimestamp(e))},t.parseToTimestamp=function(e){return Date.parse(e.replace(/\-/g,"/"))},t.addDay=function(e,n){var r=t.toDate(t.toTimestamp(e));return r.setDate(r.getDate()+n),r},t.toYMD=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate();return n<10&&(n="0"+n),r<10&&(r="0"+r),t+"-"+n+"-"+r},t.toYMDHMS=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),o=e.getSeconds();return n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10&&(o="0"+o),t+"-"+n+"-"+r+" "+i+":"+s+":"+o},t.toTimestamp=function(e){return e.getTime()},t.toDate=function(e){return new Date(e)},t.compareTo=function(e,n){return t.toTimestamp(e)-t.toTimestamp(n)},t.offsetOfWeek=function(e){return(e.getDay()||7)-1},t.firstOfWeek=function(e){return t.addDay(e,-t.offsetOfWeek(e))},t.getFormData=function(e,t){var n={};return t=t||"[name]",e.find(t).each(function(){n[this.name]=this.value}),n};var n=t.formatJSON=function(e,t,r,i){if(null==e)return""+e;r=r!=null?r:"    ",i=i||"";var s=e.constructor;if(s===String)return t?'<span class="json-string-value">"'+e+'"</span>':'"'+e+'"';if(s===Number)return t?'<span class="json-number-value">'+e+"</span>":e;if(s===Array){var o=t?'<span class="json-array-tag">[</span>\n':"[\n";for(var u=0,a=e.length;u<a-1;u++)o+=i+r+n(e[u],t,r,i+r)+",\n";return o+=i+r+n(e[a-1],t,r,i+r)+"\n",o+i+(t?'<span class="json-array-tag">]</span>':"]")}if(s===Object){var f=t?'<span class="json-object-tag">{</span>\n':"{\n",l=!0;for(var c in e)l=!1,f+=i+r+(t?'<span class="json-object-key">"'+c+'"'+"</span>":'"'+c+'"')+": "+n(e[c],t,r,i+r)+",\n";return l||(f=f.slice(0,-2)),f+"\n"+i+(t?'<span class="json-object-tag">}</span>':"}")}}}),define("common/store",["require","exports","module","./utils"],function(e,t){"use strict";var n=e("./utils"),r={},i=Array.prototype.slice;t.set=function(e,t){typeof e=="string"&&(r[e]=t)},t.get=function(e){return arguments.length?r[e]:r},t.dump=function(e){var t={};if(arguments.length)if(e.constructor===Array)for(var i=0,s=e.length;i<s;i++){var o=e[i];t[o]=n.deepCopy(r[o])}else t[e]=n.deepCopy(r[e]);else for(var o in r)t[o]=n.deepCopy(r[o]);return t}}),define("web-pagelist/filters",["require","exports","module","service/web-pagelist","common/eventEmitter","common/store"],function(e,t){"use strict";var n=e("service/web-pagelist"),r=e("common/eventEmitter"),i=e("common/store"),s=moment().add(-14,"days").startOf("day"),o=moment().add(-1,"days").startOf("day");t.init=function(){var e={product:"",start_date:s.format("YYYY-MM-DD"),end_date:o.format("YYYY-MM-DD")};i.set("web-pagelist-filters",e);var t=this.element;n.getProducts().done(function(n){var i=Simplite.render("web-pagelist-filters",$.extend(!0,{},e,n.data));t.html(i),t.find("#date-range").daterangepicker({startDate:s,endDate:o,timePicker:!1,timePicker12Hour:!1,linkedCalendars:!0,separator:" 到 ",format:"YYYY-MM-DD",opens:"right",ranges:{"近1天":[moment().subtract(1,"days"),moment().subtract(1,"days")],"近15天":[moment().subtract(15,"days"),moment().subtract(1,"days")],"近30天":[moment().subtract(30,"days"),moment().subtract(1,"days")]},locale:{applyLabel:"确定",cancelLabel:"取消",fromLabel:"开始时间",toLabel:"结束时间",customRangeLabel:"自定义",daysOfWeek:["日","一","二","三","四","五","六"],monthNames:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]}},function(t,n,i){var s=t.format("YYYY-MM-DD"),o=n.format("YYYY-MM-DD");e.start_date=s,e.end_date=o,r.fire("web-pagelist-filters-change",e)})}),t.on("click",".dropdown-menu .select-item",function(){var t=$(this).data("id"),n=$(this).text(),i=$(this).closest(".dropdown").find(".item-selected").text(n).data("name");e[i]=t,r.fire("web-pagelist-filters-change",e)}),r.fire("web-pagelist-filters-change",e)}}),function(e,t){var n=t();typeof define=="function"?define("dep/class",[],function(){return n}):e.Class=n}(this,function(){"use strict";var e=function(){},t=function(e){var t=this;return function(){t.superClass.prototype[e].apply(t,arguments)}},n=function(e){return new this(e)},r={create:function(i,s){var o=null;r!==this&&(o=this),o===null?typeof i=="function"?o=i:(s=i,i=null):s||(s=i,i=null),s=s||{};var u=function(){for(var e in u.defaultOptions||{})this[e]||(this[e]=u.defaultOptions[e]);this.init.apply(this,arguments)};o&&(e.prototype=o.prototype,u.prototype=new e,e.prototype=null),u.prototype.init=function(e){e=e||{};for(var t in e)this[t]=e[t]};for(var a in s)if(s.hasOwnProperty(a)){var f=s[a],l=!1;typeof f!="function"&&(l=f.override,f=f.handler),u.prototype[a]=function(e,t,n,r){return function(){if(!r){var i;t&&(i=t.prototype[n],i?i.apply(this,arguments):(t=t.superClass,t&&t.prototype[n].apply(this,arguments)))}return e.apply(this,arguments)}}(f,o,a,l)}return o&&(u.prototype.superClass=o,u.prototype.constructor=u,u.prototype.callSuper=t),u.create=r.create,u.init=n,u}};return r.create()}),define("dep/eventable",["require","exports","module","./class"],function(e,t){var n=Array.prototype.slice;return e("./class").create({init:function(){this.taskMap={}},on:function(e,t){if(!e||!t)return!1;var n=this.taskMap[e];return n||(n=this.taskMap[e]=[]),n.push(t),function(){for(var e=0;e<n.length;e++)n[e]===t&&n.splice(e--,1)}},un:function(e,t){if(!e)return this.taskMap={},!1;var n=this.taskMap[e];if(!n)return!1;if(!t)return n.length=0,!0;var r=!1;for(var i=0;i<n.length;i++)n[i]===t&&(n.splice(i--,1),r=!0);return r},fire:function(e){var t=this.taskMap,r=n.call(arguments,1);setTimeout(function(){if(!e)return!1;var n=t[e];if(!n)return!1;var i=n.length;if(i===0)return!1;for(var s=0;s<n.length;s++)n[s].apply(null,r)},0)}})}),define("component/ui",["require","dep/eventable"],function(e){var t=e("dep/eventable").create({init:function(e){var t=this;this.element=$(this.element),this.on("init",function(){t.bindEvent&&t.bindEvent()}),this.fire("init",arguments)},dispose:function(){this.element.remove(),this.fire("dispose")}});return t}),Simplite.compiles["pager-template"]=function(e){return function(e){"use strict";var t=this,n='<ul class="pagination"><li class="pre-group';e.currentGroup<=1&&(n+=" disabled"),n+='"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';var r=(e.currentGroup-1)*e.displayPageCount;for(var i=r+1;i<=r+e.displayPageCount;i++){if(i>e.totalPage)break;n+='<li class="'+t.defaultAttr(i==e.currentPage?"active":"page-btn")+'" data-page="'+t.defaultAttr(i)+'"><a href="javascript:;">'+t.defaultAttr(t.filter("format-length",i,e.totalPage))+"</a></li>"}return n+='<li class="next-group',e.currentGroup>=e.totalGroup&&(n+=" disabled"),n+='"><a href="javascript:;" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul> ',n}.call(Simplite,e)},define("component/widgets/pager/pager",["require","../../ui"],function(e){(function(){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML="ul.pagination { border: 1px solid red; }",e.appendChild(t)})(),Simplite.addFilter("format-length",function(e,t){for(var n=(""+e).length,r=(""+t).length;n<r;n++)e="0"+e;return e});var t=e("../../ui").create({init:function(e){this.element=$(this.element)},bindEvent:function(){var e=this;this.element.on("click",this.actions.preGroup,function(){e.toPreGroup($(this))}).on("click",this.actions.nextGroup,function(){e.toNextGroup($(this))}).on("click",this.actions.pageBtn,function(){e.toPage($(this).data("page"))})},render:function(e){$.extend(this,e),this.totalGroup=parseInt((this.totalPage-1)/this.displayPageCount)+1;var t=Simplite.render("pager-template",{currentPage:this.currentPage,pageSize:this.pageSize,totalPage:this.totalPage,displayPageCount:this.displayPageCount,currentGroup:this.currentGroup,totalGroup:this.totalGroup});this.element.html(t)},toPreGroup:function(e){if(e.hasClass("disabled"))return;this.currentGroup--,this.render()},toNextGroup:function(e){if(e.hasClass("disabled"))return;this.currentGroup++,this.render()},toPage:function(e){e=parseInt(e);if(isNaN(e))return;e<0&&(e=0),e>this.totalPage&&(e=this.totalPage),this.currentPage=e,this.currentGroup=parseInt((this.currentPage-1)/this.displayPageCount)+1,this.render(),this.fire("page",{currentPage:this.currentPage,pageSize:this.pageSize,currentGroup:this.currentGroup,totalPage:this.totalPage,displayPageCount:this.displayPageCount})}});return t.defaultOptions={actions:{pageBtn:".page-btn",preGroup:".pre-group",nextGroup:".next-group"},currentPage:1,pageSize:20,totalPage:1,displayPageCount:5,currentGroup:1,totalGroup:1},t}),define("web-pagelist/list",["require","exports","module","service/web-pagelist","common/eventEmitter","common/store","component/widgets/pager/pager"],function(e,t){"use strict";var n=e("service/web-pagelist"),r=e("common/eventEmitter"),i=e("common/store"),s=e("component/widgets/pager/pager"),o={current_page:0,page_size:10},u=function(e,t,r){$.extend(!0,o,r);if(!r.product)return;n.getPageList(o).done(function(n){var r=Simplite.render("web-pagelist-list-tbody",n.data);e.find("tbody").html(r);var i=n.data.total,s=o.page_size,u=parseInt((i-1)/s)+1;t.render({currentPage:o.current_page+1,totalPage:u})})};t.init=function(){var e=this.element,t=Simplite.render("web-pagelist-list");e.html(t);var n=s.init({element:e.find(".widgets-pager")});e.on("click",".trend",function(e){e.stopPropagation();var t=$(this).data("href"),n=$(this).data("url"),r=o.start_date,i=o.end_date;window.open(t+"?start_date="+r+"&end_date="+i+"&url="+encodeURIComponent(n))}),n.on("page",function(t){o.current_page=t.currentPage-1,u(e,n)}),r.on("web-pagelist-filters-change",function(t){u(e,n,t)});var a=i.get("web-pagelist-filters");a&&u(e,n,a)}}),Simplite.compiles["web-pagelist"]=function(e){return function(e){"use strict";var t=this,n='<div><div class="module-block"><div class="block-title">页面分析</div><div class="block-content"><div class="filters" data-module-path="web-pagelist/filters"></div><div class="list" data-module-path="web-pagelist/list"></div></div></div></div> ';return n}.call(Simplite,e)},Simplite.compiles["web-pagelist-filters"]=function(e){return function(e){"use strict";var t=this,n='<form class="form-inline"><div class="form-group"><div class="dropdown"><button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"><span class="item-selected" data-name="product">请选择产品</span><span class="caret"></span></button><ul class="dropdown-menu">';for(var r=0,i=e.list.length;r<i;r++){var s=e.list[r];n+='<li class="select-item" data-id="'+t.defaultAttr(s)+'"><a href="javascript:;">'+t.defaultAttr(s)+"</a></li>"}return n+='</ul></div></div><div class="form-group"><label for="date-range">选择日期范围</label><input type="text" class="form-control" id="date-range" value="'+t.defaultAttr(e.start_date+" 到 "+e.end_date)+'"></div></form> ',n}.call(Simplite,e)},Simplite.compiles["web-pagelist-list"]=function(e){return function(e){"use strict";var t=this,n='<div><table class="table table-hover table-bordered"><thead><tr><th>页面URL</th><th>页面名称</th><th>浏览量PV</th><th>访客数UV</th><th>IP</th></tr></thead><tbody></tbody></table></div><div class="widgets-pager"></div> ';return n}.call(Simplite,e)},Simplite.compiles["web-pagelist-list-tbody"]=function(e){return function(e){"use strict";var t=this,n="",r=r=e.list.length;if(r)for(var i=0;i<r;i++){var s=e.list[i];n+='<tr><td class="page-url"><a href="'+t.defaultAttr(s.page_url)+'" target="_blank">'+t.defaultAttr(s.page_url)+'</a><a class="trend" data-href="'+t.defaultAttr(window.rootBase+"/web/pagetrend")+'" data-url="'+t.defaultAttr(s.page_url)+'" target="_blank"><span class="glyphicon glyphicon-random"></span></a></td><td>'+t.defaultAttr(s.page_name)+"</td><td>"+t.defaultAttr(s.pvs)+"</td><td>"+t.defaultAttr(s.uvs)+"</td><td>"+t.defaultAttr(s.ips)+"</td></tr>"}else n+='<tr><td colspan="5"><center>没有数据</center></td></tr>';return n+=" ",n}.call(Simplite,e)},define("web-pagelist/main",["require","exports","module","service/web-pagelist","./filters","./list"],function(e,t){"use strict";var n=e("service/web-pagelist");e("./filters"),e("./list"),t.init=function(){var e=this.element,t=Simplite.render("web-pagelist");e.html(t)}});