(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-comformation-payment-payment"],{"1e59":function(t,n,i){n=t.exports=i("2350")(!1),n.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-popup[data-v-61cf97ba]{position:fixed;top:50px;bottom:0;left:0;right:0;z-index:999;overflow:hidden}.uni-popup__mask[data-v-61cf97ba]{position:absolute;top:0;bottom:0;left:0;right:0;z-index:998;background:rgba(0,0,0,.4);opacity:0}.uni-popup__mask.ani[data-v-61cf97ba]{-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.uni-popup__mask.uni-bottom[data-v-61cf97ba],.uni-popup__mask.uni-center[data-v-61cf97ba],.uni-popup__mask.uni-top[data-v-61cf97ba]{opacity:1}.uni-popup__wrapper[data-v-61cf97ba]{position:absolute;z-index:999;-webkit-box-sizing:border-box;box-sizing:border-box}.uni-popup__wrapper.ani[data-v-61cf97ba]{-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.uni-popup__wrapper.top[data-v-61cf97ba]{top:0;left:0;width:100%;-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}.uni-popup__wrapper.bottom[data-v-61cf97ba]{bottom:0;left:0;width:100%;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%)}.uni-popup__wrapper.center[data-v-61cf97ba]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-transform:scale(1.2);-ms-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-61cf97ba]{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box[data-v-61cf97ba]{padding:%?30?%;background:#fff}.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box[data-v-61cf97ba]{position:relative;max-width:80%;max-height:80%;overflow-y:scroll}.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box[data-v-61cf97ba],.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box[data-v-61cf97ba]{width:100%;max-height:500px;overflow-y:scroll}.uni-popup__wrapper.uni-bottom[data-v-61cf97ba],.uni-popup__wrapper.uni-top[data-v-61cf97ba]{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.uni-popup__wrapper.uni-center[data-v-61cf97ba]{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);opacity:1}',""])},"292f":function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=e(i("f713"));function e(t){return t&&t.__esModule?t:{default:t}}var o={components:{uniPopup:a.default},data:function(){return{sumPrice:0,list:[{id:1,kind:"类别一",quantity:"1"},{id:2,kind:"类别二",quantity:"2"},{id:3,kind:"类别三",quantity:"3"}]}},onLoad:function(t){console.log(t.sumPrice),this.sumPrice=t.sumPrice},methods:{openPopup:function(){this.$refs.popup.open()},closePopup:function(){this.$refs.popup.close()}}};n.default=o},"2a3c":function(t,n,i){var a=i("fc87");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var e=i("4f06").default;e("5c4ada14",a,!0,{sourceMap:!1,shadowMode:!1})},"662e":function(t,n,i){"use strict";i.r(n);var a=i("d6cb"),e=i("af9e");for(var o in e)"default"!==o&&function(t){i.d(n,t,function(){return e[t]})}(o);i("c3d3");var r=i("2877"),s=Object(r["a"])(e["default"],a["a"],a["b"],!1,null,"71f5dc2e",null);n["default"]=s.exports},a355:function(t,n,i){var a=i("1e59");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var e=i("4f06").default;e("2a7812e4",a,!0,{sourceMap:!1,shadowMode:!1})},ab10:function(t,n,i){"use strict";var a=i("a355"),e=i.n(a);e.a},af9e:function(t,n,i){"use strict";i.r(n);var a=i("292f"),e=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(n,t,function(){return a[t]})}(o);n["default"]=e.a},b519:function(t,n,i){"use strict";i.r(n);var a=i("fbd6"),e=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(n,t,function(){return a[t]})}(o);n["default"]=e.a},c3d3:function(t,n,i){"use strict";var a=i("2a3c"),e=i.n(a);e.a},d6cb:function(t,n,i){"use strict";var a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("v-uni-view",[i("v-uni-view",{staticClass:"box1 flex-y"},[i("v-uni-view",{staticClass:"sum flex-x"},[t._v("商品金额:"),i("v-uni-view",{staticClass:"money"},[t._v("￥"+t._s(t.sumPrice))])],1),i("v-uni-view",{staticClass:"btn",on:{click:function(n){n=t.$handleEvent(n),t.openPopup(n)}}},[t._v("简易收款")])],1),i("uni-popup",{ref:"popup",attrs:{type:"center"}},[i("v-uni-image",{attrs:{src:"../../../static/dis/ewm.jpg",mode:""}})],1),i("v-uni-view",{staticClass:"box2 flex-y"},[t._l(t.list,function(n,a){return i("v-uni-view",{key:a,staticClass:"kind flex-x"},[i("v-uni-view",[t._v(t._s(n.kind))]),i("v-uni-view",{staticClass:"imaIcon",on:{click:function(n){n.stopPropagation(),n=t.$handleEvent(n),t.sub(t.box.id)}}},[i("v-uni-image",{staticClass:"imageIcon",attrs:{src:"../../../static/image/subtract.png"}})],1),i("v-uni-view",[t._v(t._s(n.quantity))]),i("v-uni-view",{staticClass:"imgIcon",on:{click:function(n){n.stopPropagation(),n=t.$handleEvent(n),t.add(t.box.id)}}},[i("v-uni-image",{staticClass:"imageIcon",attrs:{src:"../../../static/image/plus.png"}})],1)],1)}),i("v-uni-view",{staticClass:"btn"},[t._v("分项收款")])],2)],1)},e=[];i.d(n,"a",function(){return a}),i.d(n,"b",function(){return e})},e54f:function(t,n,i){"use strict";var a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return t.show?i("v-uni-view",{staticClass:"uni-popup"},[i("v-uni-view",{staticClass:"uni-popup__mask",class:[t.ani,t.animation?"ani":"",t.custom?"":"uni-custom"],on:{click:function(n){n=t.$handleEvent(n),t.close(!0)}}}),i("v-uni-view",{staticClass:"uni-popup__wrapper",class:[t.type,t.ani,t.animation?"ani":"",t.custom?"":"uni-custom"],on:{click:function(n){n=t.$handleEvent(n),t.close(!0)}}},[i("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(n){n.stopPropagation(),n=t.$handleEvent(n),t.clear(n)}}},[t._t("default")],2)],1)],1):t._e()},e=[];i.d(n,"a",function(){return a}),i.d(n,"b",function(){return e})},f713:function(t,n,i){"use strict";i.r(n);var a=i("e54f"),e=i("b519");for(var o in e)"default"!==o&&function(t){i.d(n,t,function(){return e[t]})}(o);i("ab10");var r=i("2877"),s=Object(r["a"])(e["default"],a["a"],a["b"],!1,null,"61cf97ba",null);n["default"]=s.exports},fbd6:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},custom:{type:Boolean,default:!1},maskClick:{type:Boolean,default:!0}},data:function(){return{ani:"",show:!1}},created:function(){},methods:{clear:function(){},open:function(){var t=this;this.show=!0,this.$nextTick(function(){setTimeout(function(){t.ani="uni-"+t.type},30)})},close:function(t){var n=this;!this.maskClick&&t||(this.ani="",this.$nextTick(function(){setTimeout(function(){n.show=!1},300)}))}}};n.default=a},fc87:function(t,n,i){n=t.exports=i("2350")(!1),n.push([t.i,".flex-x[data-v-71f5dc2e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.flex-y[data-v-71f5dc2e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.box1[data-v-71f5dc2e]{\n\t/* width: 100%;\n\theight: 30%; */width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;-webkit-box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.sum[data-v-71f5dc2e]{height:%?150?%;margin:0 auto;padding-top:%?75?%}.money[data-v-71f5dc2e]{color:red}.btn[data-v-71f5dc2e]{margin-top:%?20?%;margin-left:%?400?%;width:%?200?%;padding:0 %?30?%;height:%?60?%;background-color:#f06c7a;color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?30?%;border-radius:%?40?%}.box2[data-v-71f5dc2e]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;-webkit-box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.kind[data-v-71f5dc2e]{margin-top:%?10?%;height:%?70?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.imageIcon[data-v-71f5dc2e]{width:%?35?%;height:%?35?%}",""])}}]);