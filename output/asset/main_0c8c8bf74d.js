define("common/utils",["require","exports","module"],function(e,t){t.deepCopy=function(e){var t,n=e.constructor;return function r(e,n,i){var s=e&&e.constructor,o,u,a,f,l=n===undefined;if(s===Object){o=l?t={}:n[i]={};for(u in e)r(e[u],o,u)}else if(s===Array){a=0,f=e.length,o=l?t=[]:n[i]=[];while(a<f)r(e[a],o,a++)}else if(s===Function)try{n[i]=(new Function("return "+e.toString()))()}catch(c){n[i]=e}else typeof e=="object"?n[i]=new s(e):n[i]=e}(e),t},t.getQuery=function(e){var t=location.search;if(!arguments.length){var n={};return t?(t.replace(/(?:\?|&)([^=]+)=([^&$]*)/g,function(e,t,r){n[t]=decodeURIComponent(r)}),n):n}var r=(new RegExp("[?&]"+e+"=([^&$]*)")).exec(t);return r&&decodeURIComponent(r[1])},t.format=function(e,t,n){return typeof e=="undefined"?"":(t=t||",",n=n||3,(""+e).replace(new RegExp("(\\d{1,"+n+"})(?=(\\d{"+n+"})+(?:$|\\.))","g"),"$1"+t))},t.parseToDate=function(e){return t.toDate(t.parseToTimestamp(e))},t.parseToTimestamp=function(e){return Date.parse(e.replace(/\-/g,"/"))},t.addDay=function(e,n){var r=t.toDate(t.toTimestamp(e));return r.setDate(r.getDate()+n),r},t.toYMD=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate();return n<10&&(n="0"+n),r<10&&(r="0"+r),t+"-"+n+"-"+r},t.toYMDHMS=function(e){var t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),o=e.getSeconds();return n<10&&(n="0"+n),r<10&&(r="0"+r),i<10&&(i="0"+i),s<10&&(s="0"+s),o<10&&(o="0"+o),t+"-"+n+"-"+r+" "+i+":"+s+":"+o},t.toTimestamp=function(e){return e.getTime()},t.toDate=function(e){return new Date(e)},t.compareTo=function(e,n){return t.toTimestamp(e)-t.toTimestamp(n)},t.offsetOfWeek=function(e){return(e.getDay()||7)-1},t.firstOfWeek=function(e){return t.addDay(e,-t.offsetOfWeek(e))},t.getFormData=function(e,t){var n={};return t=t||"[name]",e.find(t).each(function(){n[this.name]=this.value}),n};var n=t.formatJSON=function(e,t,r){if(null==e)return""+e;r=r||"";var i=e.constructor;if(i===String)return t?'<span class="json-string-value">"'+e+'"</span>':'"'+e+'"';if(i===Number)return t?'<span class="json-number-value">'+e+"</span>":e;if(i===Array){var s=t?'<span class="json-array-tag">[</span>\n':"[\n";for(var o=0,u=e.length;o<u-1;o++)s+=r+"	"+n(e[o],t,r+"	")+",\n";return s+=r+"	"+n(e[u-1],t,r+"	")+"\n",s+r+(t?'<span class="json-array-tag">]</span>':"]")}if(i===Object){var a=t?'<span class="json-object-tag">{</span>\n':"{\n",f=!0;for(var l in e)f=!1,a+=r+"	"+(t?'<span class="json-object-key">"'+l+'"'+"</span>":'"'+l+'"')+": "+n(e[l],t,r+"	")+",\n";return f||(a=a.slice(0,-2)),a+"\n"+r+(t?'<span class="json-object-tag">}</span>':"}")}}}),define("base-nav",["require","exports","module","common/utils"],function(e,t){var n={},r=e("common/utils").getQuery();t.init=function(){var e=this.element,t=location.pathname,i=location.search;e.find("a").each(function(){var e=$(this).attr("data-href"),i=n[e],s=$(this);i?$.each(i,function(e,n){n===t&&s.parent().addClass("active")}):e.indexOf(t)===0&&s.parent().addClass("active");var o=$(this).data("args");if(!o)s.attr("href",e).removeAttr("data-href");else{o=o.split(",");var u=[];for(var a=0,f=o.length;a<f;a++)u.push(o[a]+"="+r[o[a]]);s.attr("href",e+"?"+u.join("&")).removeAttr("data-href")}})}}),define("service/ajax",["require","exports","module"],function(e,t){t.post=function(e,t,n){return n=n||{},t=t||{},$.ajax({url:e,data:t,method:"POST",type:"POST",dataType:"json",timeout:2e4,beforeSend:n.beforeSend||function(){var e=(new Date).getTime();n._time=e,n.holder&&n.holder.append('<div class="loading loading-'+e+'">').addClass("relative")},contentType:"application/x-www-form-urlencoded;charset=UTF-8",async:n.sync?!1:!0}).pipe(function(e){n.holder&&n.holder.removeClass("relative").find(".loading-"+n._time).remove();if(e.err_no===0)return e;if(e.err_no!==302){var i=$.Deferred();return i.reject(e),i.promise()}var t={online:"http://mis.diditaxi.com.cn/auth/sso/login?app_id=94",offline:"http://mis-test.diditaxi.com.cn/auth/sso/login?app_id=99"},r=encodeURIComponent(location.href);location.href=t.online+"&version=1.0&jumpto="+r})},t.jsonp=function(e,t,n){return $.ajax({url:e,data:t,dataType:"jsonp",timeout:n,scriptCharset:"UTF-8"}).pipe(function(e){if(e.err_no===0)return e;if(e.err_no!==302){var r=$.Deferred();return commonErrors[e.err_no]?r.reject(e):r.reject(e),r.promise()}var t={online:"http://mis.diditaxi.com.cn/auth/sso/login?app_id=94",offline:"http://mis-test.diditaxi.com.cn/auth/sso/login?app_id=99"},n=encodeURIComponent(location.href);location.href=t.online+"&version=1.0&jumpto="+n})}}),define("service/common",["require","exports","module","service/ajax"],function(e,t){var n=e("service/ajax");t.getUserInfo=function(){return n.post("/omega-compute/compute-api/check_login")}}),define("dep/moduleHandler",["require","exports","module"],function(e,t){"use strict";var n=function(e){if(!e)return;r(e);var t=e.subModules;if(!t)return;for(var n=0;n<t.length;n++){var i=t[n];i&&$.isFunction(i.dispose)&&(t.splice(n,1),n--,i.dispose())}},r=function(e){var t=e.parentModule;if(!t)return;var n=t.subModules;for(var r=0;r<n.length;r++){var i=n[r];i===e&&(n.splice(r,1),r--)}};t.init=function(e,n){e=e||$("body");var r=e.size();if(r>1)$.each(e,function(){t.init($(this),n)});else if(r===1){var i=e.data("modulePath");i?t.load(i,e,n):t.init(e.children(),n)}},t.load=function(r,i,s){var o=i.data(),u=o.interceptorPath,a=function(e,r){if(e){$.isFunction(e)&&(e=new e),e.element=i,e.data=o;if($.isFunction(e.init)){var u=e.init(r);u&&u.done?u.done(function(n){t.init(i.children(),e)}):t.init(i.children(),e)}else t.init(i.children(),e);if(s){var a=s.subModules;a||(a=s.subModules=[]),a.push(e),e.parentModule=s}var f=e.dispose;$.isFunction(f)?e.dispose=function(){n(this),f.apply(this,arguments)}:e.dispose=function(){n(this)}}};e([r],function(t){u?e([u],function(e){if(e){e.element=i,e.data=o;if($.isFunction(e.init)){var n=e.init();n&&n.done?n.done(function(e){a(t,e)}):a(t,n)}else a(t)}}):a(t)})}}),define("main",["require","exports","module","./base-nav","./service/common","dep/moduleHandler"],function(e,t){e("./base-nav");var n=e("./service/common");t.init=function(){var e=this.element;return n.getUserInfo().done(function(t){e.find(".user-name").text(t.data.name)})},e("dep/moduleHandler").init()});