(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-address"],{"0034":function(e,t,i){"use strict";var n=i("4455"),a=i.n(n);a.a},"0bcb":function(e,t,i){"use strict";i.r(t);var n=i("2efb"),a=i("bbdd");for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);i("0034");var r=i("2877"),d=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,"730246de",null);t["default"]=d.exports},"2efb":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"list"},e._l(e.addressList,function(t,n){return i("v-uni-view",{key:n,staticClass:"row",on:{click:function(i){i=e.$handleEvent(i),e.select(t)}}},[i("v-uni-view",{staticClass:"center"},[i("v-uni-view",{staticClass:"name-tel"},[i("v-uni-view",{staticClass:"name"},[e._v(e._s(t.name))]),i("v-uni-view",{staticClass:"tel"},[e._v(e._s(t.tel))]),t.isDefault?i("v-uni-view",{staticClass:"default"},[e._v("默认")]):e._e()],1),i("v-uni-view",{staticClass:"address"},[e._v(e._s(t.address.region)+" "+e._s(t.address.detailed))])],1),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{staticClass:"cuIcon-edit",on:{click:function(i){i.stopPropagation(),i=e.$handleEvent(i),e.edit(t)}}})],1)],1)}),1)],1),i("v-uni-view",{staticClass:"add"},[i("v-uni-view",{staticClass:"btn",on:{click:function(t){t=e.$handleEvent(t),e.add(t)}}},[i("v-uni-view",{staticClass:"cuIcon-add"}),e._v("新增地址")],1)],1)],1)},a=[];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"386f":function(e,t,i){"use strict";var n;function a(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=(n={data:function(){return{isSelect:!1,addressList:[{id:1,name:"沐筱淋",tel:"18816881688",address:{region:"广东省-深圳市-福田区",detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!0},{id:2,name:"大黑哥",tel:"15812341234",address:{region:"广东省-深圳市-福田区",detailed:"深北小道2222号有名公寓502"},isDefault:!1},{id:3,name:"老大哥",tel:"18155467897",address:{region:"广东省-深圳市-福田区",detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!1},{id:4,name:"王小妹",tel:"13425654895",address:{region:"广东省-深圳市-福田区",detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!1}]}},onLoad:function(){for(var e=[],t=0;t<this.addressList.length;t++)1==this.addressList[t].isDefault&&(e.push(this.addressList[t]),console.log(e));try{uni.setStorageSync("profile",e)}catch(i){console.log(i)}},onShow:function(){var e=this;uni.getStorage({key:"delAddress",success:function(t){var i=e.addressList.length;if(t.data.hasOwnProperty("id"))for(var n=0;n<i;n++)if(e.addressList[n].id==t.data.id){e.addressList.splice(n,1);break}uni.removeStorage({key:"delAddress"})}}),uni.getStorage({key:"saveAddress",success:function(t){console.log(t.data);var i=e.addressList.length;if(t.data.hasOwnProperty("id")){for(var n=0;n<i;n++)if(e.addressList[n].id==t.data.id){e.addressList.splice(n,1,t.data);break}}else{var a=e.addressList[i-1];a++,t.data.id=a,e.addressList.push(t.data)}uni.removeStorage({key:"saveAddress"})}})}},a(n,"onLoad",function(e){"select"==e.type&&(this.isSelect=!0)}),a(n,"methods",{edit:function(e){uni.setStorage({key:"address",data:e,success:function(){uni.navigateTo({url:"address-edit?type=edit"})}})},add:function(){uni.navigateTo({url:"address-edit?type=add"})},select:function(e){this.isSelect&&uni.setStorage({key:"selectAddress",data:e,success:function(){uni.navigateBack()}})}}),n);t.default=s},4455:function(e,t,i){var n=i("89f2");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("0db9482f",n,!0,{sourceMap:!1,shadowMode:!1})},"89f2":function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-view[data-v-730246de]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.add[data-v-730246de]{position:fixed;bottom:0;width:100%;height:%?120?%;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.btn[data-v-730246de]{-webkit-box-shadow:%?0?% %?5?% %?10?% rgba(0,0,0,.4);box-shadow:%?0?% %?5?% %?10?% rgba(0,0,0,.4);width:70%;height:%?80?%;border-radius:%?80?%;background-color:#f06c7a;color:#fff;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?30?%}.icon[data-v-730246de]{height:%?80?%;color:#fff;font-size:%?30?%;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.list[data-v-730246de]{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.row[data-v-730246de]{width:96%;padding:%?20?% 2%}.left[data-v-730246de]{width:%?90?%;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.head[data-v-730246de]{width:%?70?%;height:%?70?%;background:-webkit-gradient(linear,left top,right top,from(#ccc),to(#aaa));background:-o-linear-gradient(left,#ccc,#aaa);background:linear-gradient(90deg,#ccc,#aaa);color:#fff;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-radius:%?60?%;font-size:%?35?%}.center[data-v-730246de]{width:100%;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.name-tel[data-v-730246de]{width:100%;-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline}.name[data-v-730246de]{font-size:%?34?%}.tel[data-v-730246de]{margin-left:%?30?%;font-size:%?24?%;color:#777}.default[data-v-730246de]{font-size:%?22?%;background-color:#f06c7a;color:#fff;padding:0 %?18?%;border-radius:%?24?%;margin-left:%?20?%}.address[data-v-730246de]{width:100%;font-size:%?24?%;-webkit-box-align:baseline;-webkit-align-items:baseline;-ms-flex-align:baseline;align-items:baseline;color:#777}.right[data-v-730246de]{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-left:%?20?%}.cuIcon-edit[data-v-730246de]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:%?60?%;height:%?60?%;border-left:solid %?1?% #aaa;font-size:%?40?%;color:#777}.cuIcon-delete[data-v-730246de]{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:%?40?%;height:%?40?%;font-size:%?40?%;color:#777}',""])},bbdd:function(e,t,i){"use strict";i.r(t);var n=i("386f"),a=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);t["default"]=a.a}}]);