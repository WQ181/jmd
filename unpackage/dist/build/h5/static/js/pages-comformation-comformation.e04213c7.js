(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-comformation-comformation"],{1228:function(e,i,t){"use strict";t.r(i);var a=t("b88d"),n=t.n(a);for(var s in a)"default"!==s&&function(e){t.d(i,e,function(){return a[e]})}(s);i["default"]=n.a},"2bd8":function(e,i,t){"use strict";var a=t("7ece"),n=t.n(a);n.a},"7ece":function(e,i,t){var a=t("f125");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=t("4f06").default;n("0ff0e30c",a,!0,{sourceMap:!1,shadowMode:!1})},b88d:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=n(t("67a4"));function n(e){return e&&e.__esModule?e:{default:e}}var s={data:function(){return{buylist:[],goodsPrice:0,sumPrice:0,freight:0,note:"",int:1200,deduction:0,Coupon:0,type:"",platform_balance:0,retailer_balance:0,recinfo:{id:1,name:"大黑哥",tel:"18816881688",address:{region:"广东省-深圳市-福田区",detailed:"深南大道1111号无名摩登大厦6楼A2"},isDefault:!0}}},onLoad:function(e){var i=this;console.log(e),this.type=e.type,uni.getStorage({key:"cart-buy",success:function(e){console.log(e.data),i.buylist=e.data}});for(var t=this.buylist,a=t.length,n=0;n<a;n++)t[n].is_special?(this.goodsPrice+=t[n].number*t[n].special_price,this.freight+=t[n].freight):(this.goodsPrice+=t[n].number*t[n].price,this.freight+=t[n].freight)},onShow:function(e){var i=this,t=uni.getStorageSync("all_balance");""==t?(this.platform_balance=0,this.retailer_balance=0):(this.retailer_balance=t.retailer_balance,this.platform_balance=t.platform_balance),console.log(this.platform_balance),console.log(this.retailer_balance),this.deduction=this.int/100,1==this.type?this.sumPrice=this.goodsPrice+this.freight-100*this.platform_balance-100*this.retailer_balance-this.Coupon:this.sumPrice=this.goodsPrice,uni.getStorage({key:"selectAddress",success:function(e){i.recinfo=e.data,uni.removeStorage({key:"selectAddress"})}}),uni.getStorage({key:"selectCoupon",success:function(e){alert(JSON.stringify(e.data)),i.Coupon=e.data,uni.removeStorage({key:"selectCoupon"})}})},onBackPress:function(){this.clearOrder()},filters:{toFixed:function(e){return parseFloat(e).toFixed(2)}},methods:{conform:function(){var e=this;console.log(e.buylist);var i,t=uni.getStorageSync("openid");5==e.type&&(i={type:e.type,openid:t,commodity_msg:e.buylist,address:e.recinfo.address.region+e.recinfo.address.detailed,mobile:e.recinfo.tel,consignee:e.recinfo.name}),1==e.type&&(i={type:e.type,openid:t,commodity_msg:e.buylist,platform_balance:e.platform_balance,retailer_balance:e.retailer_balance,address:e.recinfo.address.region+e.recinfo.address.detailed,mobile:e.recinfo.tel,consignee:e.recinfo.name}),console.log(i),a.default.test(window.location.href,i)},clearOrder:function(){var e=this;uni.removeStorage({key:"cart-buy",success:function(i){e.buylist=[],console.log("remove buylist success")}}),uni.removeStorage({key:"all_balance",success:function(e){console.log("ok")}})},selectAddress:function(){uni.navigateTo({url:"../address/address?type=select"})},selectCoupon:function(){uni.navigateTo({url:"../coupon/mycoupon"})},selectPlatformBalance:function(){uni.navigateTo({url:"../balance/balanceEnquiry/balanceEnquiry"})}}};i.default=s},e07c:function(e,i,t){"use strict";t.r(i);var a=t("f0eb"),n=t("1228");for(var s in n)"default"!==s&&function(e){t.d(i,e,function(){return n[e]})}(s);t("2bd8");var o=t("2877"),c=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,"5c93c35e",null);i["default"]=c.exports},f0eb:function(e,i,t){"use strict";var a=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("v-uni-view",[t("v-uni-view",{staticClass:"addr",on:{click:function(i){i=e.$handleEvent(i),e.selectAddress(i)}}},[t("v-uni-view",{staticClass:"icon cuIcon-location"}),t("v-uni-view",{staticClass:"right"},[t("v-uni-view",{staticClass:"tel-name"},[t("v-uni-view",{staticClass:"name"},[e._v(e._s(e.recinfo.name))]),t("v-uni-view",{staticClass:"tel"},[e._v(e._s(e.recinfo.tel))])],1),t("v-uni-view",{staticClass:"addres"},[e._v(e._s(e.recinfo.address.region)+"\n\t\t\t\t"+e._s(e.recinfo.address.detailed))])],1)],1),t("v-uni-view",{staticClass:"buy-list"},e._l(e.buylist,function(i,a){return t("v-uni-view",{key:a,staticClass:"row"},[t("v-uni-view",{staticClass:"goods-info"},[t("v-uni-view",{staticClass:"img"},[t("v-uni-image",{attrs:{src:i.image}})],1),t("v-uni-view",{staticClass:"info"},[t("v-uni-view",{staticClass:"title"},[e._v(e._s(i.name))]),t("v-uni-view",{staticClass:"spec"},[e._v("数量:"+e._s(i.number))]),1==e.type?t("v-uni-view",{staticClass:"price-number"},[t("v-uni-view",{staticClass:"price"},[e._v("￥"+e._s(i.price/100))]),t("v-uni-view",{staticClass:"price"},[e._v("特价:￥"+e._s(i.special_price/100))])],1):e._e(),5==e.type?t("v-uni-view",{staticClass:"price-number"},[t("v-uni-view",{staticClass:"price"},[e._v("积分:"+e._s(i.price))])],1):e._e()],1)],1)],1)}),1),t("v-uni-view",{staticClass:"order"},[t("v-uni-view",{staticClass:"row"},[t("v-uni-view",{staticClass:"left"},[e._v("备注 :")]),t("v-uni-view",{staticClass:"right"},[t("v-uni-input",{attrs:{placeholder:"选填,备注内容"},model:{value:e.note,callback:function(i){e.note=i},expression:"note"}})],1)],1)],1),1==e.type?t("v-uni-view",{staticClass:"detail"},[t("v-uni-view",{staticClass:"row"},[t("v-uni-view",{staticClass:"nominal"},[e._v("商品金额")]),t("v-uni-view",{staticClass:"content"},[e._v("￥"+e._s(e._f("toFixed")(e.goodsPrice/100)))])],1),t("v-uni-view",{staticClass:"row",on:{click:function(i){i=e.$handleEvent(i),e.selectPlatformBalance(i)}}},[t("v-uni-view",{staticClass:"nominal"},[e._v("平台余额")]),t("v-uni-view",{staticClass:"content"},[e._v("￥-"+e._s(e._f("toFixed")(e.platform_balance)))])],1),t("v-uni-view",{staticClass:"row",on:{click:function(i){i=e.$handleEvent(i),e.selectRetailerBalance(i)}}},[t("v-uni-view",{staticClass:"nominal"},[e._v("商家vip余额")]),t("v-uni-view",{staticClass:"content"},[e._v("￥-"+e._s(e._f("toFixed")(e.retailer_balance)))])],1),t("v-uni-view",{staticClass:"row"},[t("v-uni-view",{staticClass:"nominal"},[e._v("运费")]),t("v-uni-view",{staticClass:"content"},[e._v("￥+"+e._s(e._f("toFixed")(e.freight/100)))])],1),t("v-uni-view",{staticClass:"row",on:{click:function(i){i=e.$handleEvent(i),e.selectCoupon(i)}}},[t("v-uni-view",{staticClass:"nominal"},[e._v("优惠券")]),t("v-uni-view",{staticClass:"content"},[e._v("￥-"+e._s(e._f("toFixed")(e.Coupon)))])],1),2==e.type?t("v-uni-view",{staticClass:"row"},[t("v-uni-view",{staticClass:"nominal"},[e._v("积分抵扣")]),t("v-uni-view",{staticClass:"content"},[e._v("￥-"+e._s(e._f("toFixed")(e.deduction)))])],1):e._e()],1):e._e(),t("v-uni-view",{staticClass:"blck"}),t("v-uni-view",{staticClass:"footer"},[1==e.type?t("v-uni-view",{staticClass:"settlement"},[t("v-uni-view",{staticClass:"sum"},[e._v("合计:"),t("v-uni-view",{staticClass:"money"},[e._v("￥"+e._s(e._f("toFixed")(e.sumPrice/100)))])],1),t("v-uni-view",{staticClass:"btn",on:{click:function(i){i=e.$handleEvent(i),e.conform(i)}}},[e._v("提交订单")])],1):e._e(),5==e.type?t("v-uni-view",{staticClass:"settlement"},[t("v-uni-view",{staticClass:"sum"},[e._v("合计:"),t("v-uni-view",{staticClass:"money"},[e._v("积分:"+e._s(e._f("toFixed")(e.sumPrice)))])],1),t("v-uni-view",{staticClass:"btn",on:{click:function(i){i=e.$handleEvent(i),e.conform(i)}}},[e._v("提交订单")])],1):e._e()],1)],1)},n=[];t.d(i,"a",function(){return a}),t.d(i,"b",function(){return n})},f125:function(e,i,t){i=e.exports=t("2350")(!1),i.push([e.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 地址管理 */.addr[data-v-5c93c35e]{width:86%;padding:%?20?% 3%;margin:%?30?% auto %?20?% auto;-webkit-box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.cuIcon-location[data-v-5c93c35e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-top:%?15?%;font-size:%?50?%}.tel-name[data-v-5c93c35e]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-size:%?32?%}.tel[data-v-5c93c35e]{margin-left:%?40?%}.addres[data-v-5c93c35e]{width:100%;font-size:%?26?%;color:#999}\n/* 订单 */.buy-list[data-v-5c93c35e]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;-webkit-box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.row[data-v-5c93c35e]{margin:%?30?% 0}.goods-info[data-v-5c93c35e]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.img[data-v-5c93c35e]{width:22vw;height:22vw;border-radius:%?10?%;overflow:hidden;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;margin-right:%?10?%}.img uni-image[data-v-5c93c35e]{width:22vw;height:22vw}.info[data-v-5c93c35e]{width:100%;height:22vw;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative}.title[data-v-5c93c35e]{width:100%;font-size:%?28?%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;\r\n\t/* // text-align: justify; */overflow:hidden}.spec[data-v-5c93c35e]{font-size:%?22?%;background-color:#f3f3f3;color:#a7a7a7;height:%?40?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:0 %?10?%;border-radius:%?20?%;margin-bottom:20vw}.price-number[data-v-5c93c35e]{position:absolute;width:100%;bottom:%?0?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end;font-size:%?28?%;height:%?40?%}.price[data-v-5c93c35e]{color:#f06c7a}.number[data-v-5c93c35e]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}\n/* 备注 */.order[data-v-5c93c35e]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;-webkit-box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.order .row[data-v-5c93c35e]{margin:%?20?% 0;height:%?40?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.left[data-v-5c93c35e]{font-size:%?28?%}.right[data-v-5c93c35e]{margin-left:%?40?%;font-size:%?26?%;color:#999}.right uni-input[data-v-5c93c35e]{font-size:%?26?%;color:#999}.right .blck[data-v-5c93c35e]{width:100%;height:%?100?%}\n/* 底部 */.footer[data-v-5c93c35e]{width:92%;padding:0 4%;background-color:#fbfbfb;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?28?%;position:fixed;bottom:%?0?%;z-index:5}.footer .settlement[data-v-5c93c35e]{width:80%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.settlement .sum[data-v-5c93c35e]{width:50%;font-size:%?28?%;margin-right:%?10?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}.sum .money[data-v-5c93c35e]{font-weight:600}.btn[data-v-5c93c35e]{padding:0 %?30?%;height:%?60?%;background-color:#f06c7a;color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?30?%;border-radius:%?40?%}.detail[data-v-5c93c35e]{width:86%;padding:%?10?% 3%;margin:%?30?% auto %?20?% auto;-webkit-box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?20?% rgba(0,0,0,.1);border-radius:%?20?%}.detail .row[data-v-5c93c35e]{height:%?60?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.row .nominal[data-v-5c93c35e]{font-size:%?28?%}.row .content[data-v-5c93c35e]{font-size:%?26?%;color:#f06c7a}',""])}}]);