(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-retailerCommodity-retailerCommodity"],{"06f8":function(t,e,i){"use strict";i.r(e);var a=i("8bca"),o=i("94db");for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);i("fcf7");var r=i("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"7fe477d9",null);e["default"]=s.exports},"0a27":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("06f8")),o=n(i("f713"));function n(t){return t&&t.__esModule?t:{default:t}}var r={components:{uniBadge:a.default,uniPopup:o.default},data:function(){return{totalNumber:0,totalPrice:0,windows_height:0,swiperList:[],select_index:0,right_height:[],right_scroll:0,left_height:0,left_scroll:0,last:0,orderList:[],categoryList:[{id:1,title:"本店特色",list:[{commodity_id:1,name:"砂锅蒜香鱼头",img:"ts1.jpg",price:6600,number:0,select:!1},{commodity_id:2,name:"面香宝塔肉",img:"ts2.jpg",price:5100,number:0,select:!1},{commodity_id:3,name:"蜜汁烤肉",img:"ts3.jpg",price:5400,number:0,select:!1},{commodity_id:4,name:"爱喇叭土鸡",img:"ts4.jpg",price:5600,number:0,select:!1}]},{id:2,title:"山珍野味",list:[{commodity_id:5,name:"野生泥鳅",img:"yw1.jpg",price:7600,number:0,select:!1},{commodity_id:6,name:"野生鳝鱼",img:"yw2.jpg",price:8600,number:0,select:!1},{commodity_id:7,name:"野生杂鱼火锅",img:"yw3.jpg",price:50600,number:0,select:!1}]},{id:3,title:"自熏腊味",list:[{commodity_id:8,name:"干牛肉",img:"lw1.jpg",price:55600,number:0,select:!1}]}]}},onLoad:function(){var t=this;this.$nextTick(function(){t.getHeightList()}),this.windows_height=uni.getSystemInfoSync().windowHeight},onUnload:function(){this.clearOrder()},methods:{openPopup:function(){this.$refs.popup.open()},closePopup:function(){this.$refs.popup.close()},onCancel:function(t){console.log(t)},clearOrder:function(){var t=this;uni.removeStorage({key:"cart-buy",success:function(e){t.buylist=[],console.log("remove buylist success")}})},getHeightList:function(){var t=this,e=uni.createSelectorQuery();e.select(".left-content").boundingClientRect(function(e){t.left_height=e.height}),e.selectAll(".category-item").boundingClientRect(function(e){t.right_height=e.map(function(t){return t.top}),console.log(t.right_height)}).exec()},choose:function(t){var e=this;this.select_index!==t&&(this.select_index=t,this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(function(){e.right_scroll=e.right_height[t]-110},300))},myscroll:function(t){var e=t.detail.scrollHeight-this.windows_height;if(e!=t.detail.scrollTop){var i=t.detail.scrollTop+110,a=+new Date;if(a-this.last>100){this.last=a;var o=this.right_height.findIndex(function(t,e,a){return t<=i&&i<a[e+1]});if(this.select_index=o,this.left_height-this.windows_height){var n=this.left_height-this.windows_height;this.left_scroll=Math.round(o*n/(this.categoryList.length-1))}}}},clearCart:function(){this.orderList=[],this.totalNumber=0,this.totalPrice=0;for(var t=0;t<this.categoryList.length;t++)for(var e=0;e<this.categoryList[t].list.length;e++)this.categoryList[t].list[e].number=0;this.closePopup(),uni.removeStorageSync("commodity-buy")},add:function(t){for(var e=0;e<this.categoryList.length;e++)for(var i=0;i<this.categoryList[e].list.length;i++){if(this.categoryList[e].list[i].commodity_id==t)if(0==this.orderList.length)this.categoryList[e].list[i].number=this.categoryList[e].list[i].number+1,this.categoryList[e].list[i].select=!0,this.updatecntitems(1),this.updatetotalamt(this.categoryList[e].list[i].price),this.orderList.push(this.categoryList[e].list[i]),console.log(this.orderList),uni.setStorageSync("commodity-buy",this.orderList);else if(0==this.categoryList[e].list[i].select)this.categoryList[e].list[i].number=this.categoryList[e].list[i].number+1,this.categoryList[e].list[i].select=!0,this.updatecntitems(1),this.updatetotalamt(this.categoryList[e].list[i].price),this.orderList.push(this.categoryList[e].list[i]),console.log(this.orderList),uni.setStorageSync("commodity-buy",this.orderList);else if(1==this.categoryList[e].list[i].select)return this.categoryList[e].list[i].number=this.categoryList[e].list[i].number+1,this.updatecntitems(1),void this.updatetotalamt(this.categoryList[e].list[i].price);this.categoryList[e].list[i].number>5&&uni.showToast({title:"点少点，要减肥",icon:"none"})}},sub:function(t){for(var e=0;e<this.categoryList.length;e++)for(var i=0;i<this.categoryList[e].list.length;i++){if(this.categoryList[e].list[i].commodity_id==t&&this.categoryList[e].list[i].number>0){if(this.categoryList[e].list[i].number=this.categoryList[e].list[i].number-1,this.categoryList[e].list[i].select=!0,this.updatecntitems(-1),this.updatetotalamt(-this.categoryList[e].list[i].price),0==this.categoryList[e].list[i].number){this.categoryList[e].list[i].select=!1;for(var a=0;a<this.orderList.length;a++)this.categoryList[e].list[i].name==this.orderList[a].name&&(this.orderList.splice(a,1),console.log(this.orderList),uni.setStorageSync("commodity-buy",this.orderList));return}return}this.categoryList[e].list[i].number<=0&&uni.showToast({icon:"none",title:"不能再减咯"})}},updatetotalamt:function(t){this.totalPrice=this.totalPrice+t,this.totalPrice=this.fmamount(this.totalPrice)},updatecntitems:function(t){this.totalNumber=this.totalNumber+t},fmamount:function(t){return Math.round(100*t)/100},toCart:function(){var t=uni.getStorageSync("commodity-buy");console.log(t)},toConformation:function(){if(0!=this.orderList.length){this.categoryList.length;for(var t=[],e=0;e<this.categoryList.length;e++)for(var i=this.categoryList[e].list.length,a=0;a<i;a++)if(1==this.categoryList[e].list[a].select){if(0!=t.length&&this.categoryList[e].list[a].id==t[e].id)return;t.push(this.categoryList[e].list[a])}console.log(t),uni.setStorageSync("buy",t),uni.navigateTo({url:"../comformation/comformation2/comformation2"});var o=uni.getStorageSync("commodity-buy");console.log(o)}else uni.showToast({title:"购物车不能为空",icon:"none"})}}};e.default=r},"124a":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniBadge",props:{type:{type:String,default:"default"},inverted:{type:Boolean,default:!1},text:{type:[String,Number],default:""},size:{type:String,default:"normal"}},methods:{onClick:function(){this.$emit("click")}}};e.default=a},1442:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"category"},[t.categoryList.length>0?i("v-uni-view",{staticClass:"category-wrapper"},[i("v-uni-scroll-view",{staticClass:"left-wrapper",attrs:{"scroll-y":"true","scroll-with-animation":"true","scroll-top":t.left_scroll}},[i("v-uni-view",{staticClass:"left-content"},t._l(t.categoryList,function(e,a){return i("v-uni-view",{key:e.id,staticClass:"title-content",class:t.select_index===a?"onSelected":"",on:{click:function(e){e=t.$handleEvent(e),t.choose(a)}}},[t._v(t._s(e.title))])}),1)],1),i("v-uni-scroll-view",{staticClass:"right-wrapper",attrs:{"scroll-y":"true","scroll-with-animation":"true","scroll-top":t.right_scroll},on:{scroll:function(e){e=t.$handleEvent(e),t.myscroll(e)}}},[i("v-uni-view",{staticClass:"right-content"},[i("v-uni-view",{staticClass:"banner-wrapper"},[i("v-uni-swiper",{staticClass:"swiper-content",attrs:{autoplay:!0,interval:3e3,circular:!0}},t._l(t.swiperList,function(t){return i("v-uni-swiper-item",{key:t.id,staticClass:"swiper-item"},[i("v-uni-image",{staticClass:"swiper-img",attrs:{src:t.src}})],1)}),1)],1),i("v-uni-view",{staticClass:"product-wrapper"},t._l(t.categoryList,function(e,a){return i("v-uni-view",{key:e.id,staticClass:"category-item",attrs:{id:"list"+a}},[i("v-uni-view",{staticClass:"category-title"},[t._v(t._s(e.title))]),i("v-uni-view",{staticClass:"category-content"},t._l(e.list,function(e,a){return i("v-uni-view",{key:a,staticClass:"box"},[i("v-uni-image",{staticClass:"img",attrs:{src:"../../static/ListPng/"+e.img}}),i("v-uni-view",{staticClass:"details"},[i("v-uni-view",{staticClass:"name"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"volume"},[t._v("销量：")]),i("v-uni-view",{staticClass:"price"},[i("v-uni-view",{staticClass:"price1"},[t._v("￥"+t._s(e.price/100))]),i("v-uni-view",{staticClass:"imaIcon",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.sub(e.commodity_id)}}},[i("v-uni-image",{staticClass:"imaIcon",attrs:{src:"../../static/image/subtract.png"}})],1),i("v-uni-view",{staticClass:"quantity"},[t._v(t._s(e.number))]),i("v-uni-view",{staticClass:"imgIcon",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.add(e.commodity_id)}}},[i("v-uni-image",{staticClass:"imageIcon",attrs:{src:"../../static/image/plus.png"}})],1)],1)],1)],1)}),1)],1)}),1)],1)],1)],1):t._e(),i("v-uni-view",{staticClass:"pps flex-y"},[i("uni-popup",{ref:"popup",attrs:{type:"bottom"}},[i("v-uni-view",{staticClass:"bbCar flex-x"},[i("v-uni-view",{staticClass:"line1"},[t._v("购物车")]),i("v-uni-view",{staticClass:"line1",on:{click:function(e){e=t.$handleEvent(e),t.clearCart(e)}}},[t._v("清空")])],1),t._l(t.orderList,function(e,a){return i("v-uni-view",{key:a,staticClass:"listCar"},[i("v-uni-view",{staticClass:"listCar1"},[t._v(t._s(e.name))]),i("v-uni-view",{staticClass:"listCar2 flex-x"},[i("v-uni-view",{staticClass:"price3"},[t._v("￥"+t._s(e.price/100))]),i("v-uni-view",{staticClass:"imgIcon1",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.sub(e.id)}}},[i("v-uni-image",{staticClass:"imaIcon1",attrs:{src:"../../static/image/subtract.png"}})],1),i("v-uni-view",{staticClass:"quantity"},[t._v(t._s(e.number))]),i("v-uni-view",{staticClass:"imgIcon1",on:{click:function(i){i.stopPropagation(),i=t.$handleEvent(i),t.add(e.id)}}},[i("v-uni-image",{staticClass:"imaIcon1",attrs:{src:"../../static/image/plus.png"}})],1)],1)],1)}),i("v-uni-view",{staticClass:"ppss"})],2)],1),i("v-uni-view",{staticClass:"shopping"},[i("v-uni-view",{staticClass:"imgs"},[i("v-uni-view",{staticClass:"dot"},[i("uni-badge",{attrs:{text:t.totalNumber,type:"error",size:"small"}})],1),i("v-uni-view",{staticClass:"car",on:{click:function(e){e=t.$handleEvent(e),t.openPopup(e)}}},[i("v-uni-image",{staticClass:"bayCar",attrs:{src:"../../static/tabbar/cart2.png"}})],1)],1),i("v-uni-view",{staticClass:"middle"},[i("v-uni-view",[t._v("￥"+t._s(t.totalPrice/100))]),i("v-uni-view",[t._v("优惠信息请至结算页面查看")])],1),i("v-uni-view",{staticClass:"toBuy",on:{click:function(e){e=t.$handleEvent(e),t.toConformation(e)}}},[t._v("去结算")])],1)],1)},o=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return o})},"1e59":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uni-popup[data-v-61cf97ba]{position:fixed;top:50px;bottom:0;left:0;right:0;z-index:999;overflow:hidden}.uni-popup__mask[data-v-61cf97ba]{position:absolute;top:0;bottom:0;left:0;right:0;z-index:998;background:rgba(0,0,0,.4);opacity:0}.uni-popup__mask.ani[data-v-61cf97ba]{-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.uni-popup__mask.uni-bottom[data-v-61cf97ba],.uni-popup__mask.uni-center[data-v-61cf97ba],.uni-popup__mask.uni-top[data-v-61cf97ba]{opacity:1}.uni-popup__wrapper[data-v-61cf97ba]{position:absolute;z-index:999;-webkit-box-sizing:border-box;box-sizing:border-box}.uni-popup__wrapper.ani[data-v-61cf97ba]{-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.uni-popup__wrapper.top[data-v-61cf97ba]{top:0;left:0;width:100%;-webkit-transform:translateY(-100%);-ms-transform:translateY(-100%);transform:translateY(-100%)}.uni-popup__wrapper.bottom[data-v-61cf97ba]{bottom:0;left:0;width:100%;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%)}.uni-popup__wrapper.center[data-v-61cf97ba]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-transform:scale(1.2);-ms-transform:scale(1.2);transform:scale(1.2);opacity:0}.uni-popup__wrapper-box[data-v-61cf97ba]{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.uni-popup__wrapper.uni-custom .uni-popup__wrapper-box[data-v-61cf97ba]{padding:%?30?%;background:#fff}.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box[data-v-61cf97ba]{position:relative;max-width:80%;max-height:80%;overflow-y:scroll}.uni-popup__wrapper.uni-custom.bottom .uni-popup__wrapper-box[data-v-61cf97ba],.uni-popup__wrapper.uni-custom.top .uni-popup__wrapper-box[data-v-61cf97ba]{width:100%;max-height:500px;overflow-y:scroll}.uni-popup__wrapper.uni-bottom[data-v-61cf97ba],.uni-popup__wrapper.uni-top[data-v-61cf97ba]{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.uni-popup__wrapper.uni-center[data-v-61cf97ba]{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);opacity:1}',""])},4088:function(t,e,i){"use strict";i.r(e);var a=i("0a27"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=o.a},"61c0":function(t,e,i){var a=i("7b1b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("0599ca0e",a,!0,{sourceMap:!1,shadowMode:!1})},"71e1":function(t,e,i){"use strict";var a=i("f771"),o=i.n(a);o.a},"7b1b":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-badge[data-v-7fe477d9]{font-family:Helvetica Neue,Helvetica,sans-serif;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:12px;line-height:1;display:inline-block;padding:3px 6px;color:#333;border-radius:100px;background-color:#f1f1f1}.uni-badge.uni-badge-inverted[data-v-7fe477d9]{padding:0 5px 0 0;color:#999;background-color:rgba(0,0,0,0)}.uni-badge-primary[data-v-7fe477d9]{color:#fff;background-color:#007aff}.uni-badge-primary.uni-badge-inverted[data-v-7fe477d9]{color:#007aff;background-color:rgba(0,0,0,0)}.uni-badge-success[data-v-7fe477d9]{color:#fff;background-color:#4cd964}.uni-badge-success.uni-badge-inverted[data-v-7fe477d9]{color:#4cd964;background-color:rgba(0,0,0,0)}.uni-badge-warning[data-v-7fe477d9]{color:#fff;background-color:#f0ad4e}.uni-badge-warning.uni-badge-inverted[data-v-7fe477d9]{color:#f0ad4e;background-color:rgba(0,0,0,0)}.uni-badge-error[data-v-7fe477d9]{color:#fff;background-color:#dd524d}.uni-badge-error.uni-badge-inverted[data-v-7fe477d9]{color:#dd524d;background-color:rgba(0,0,0,0)}.uni-badge--small[data-v-7fe477d9]{-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8);-webkit-transform-origin:center center;-ms-transform-origin:center center;transform-origin:center center}",""])},"8bca":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.text?i("v-uni-text",{staticClass:"uni-badge",class:t.inverted?"uni-badge-"+t.type+" uni-badge--"+t.size+" uni-badge-inverted":"uni-badge-"+t.type+" uni-badge--"+t.size,on:{click:function(e){e=t.$handleEvent(e),t.onClick()}}},[t._v(t._s(t.text))]):t._e()},o=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return o})},9362:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,'.shopping[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:100%;height:%?100?%;border-top:%?1?% solid #f3f3f3;position:fixed;bottom:0;background-color:#474749}.dot[data-v-4365f0c5]{position:fixed;bottom:%?100?%;left:%?120?%;z-index:3}.middle[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:50%;color:#fff}.car[data-v-4365f0c5]{background-color:#fff;width:%?100?%;height:%?100?%;border-radius:50%;margin-bottom:%?90?%}.bayCar[data-v-4365f0c5]{width:%?60?%;height:%?60?%;margin-top:%?20?%;color:#000}.imgs[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;width:25%;height:100%;text-align:center}.toBuy[data-v-4365f0c5]{width:25%;height:100%;background-color:#fe9402;text-align:center;line-height:%?100?%;color:#fff}.quantity[data-v-4365f0c5]{margin-left:%?20?%}.category .category-wrapper[data-v-4365f0c5]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;position:absolute;top:0;bottom:0;margin-bottom:%?80?%}.category .category-wrapper .left-wrapper[data-v-4365f0c5]{width:%?200?%;-webkit-box-flex:0;-webkit-flex:0 0 %?200?%;-ms-flex:0 0 %?200?%;flex:0 0 %?200?%;background-color:#f6f6f6}.category .category-wrapper .left-wrapper .left-content .title-content[data-v-4365f0c5]{width:100%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?25?%;border-bottom:1px solid #dedede;cursor:pointer}.category .category-wrapper .left-wrapper .left-content .title-content[data-v-4365f0c5]:last-child{border-bottom:0}.category .category-wrapper .left-wrapper .left-content .title-content.onSelected[data-v-4365f0c5]{background-color:#fff;position:relative;color:#feb436}.category .category-wrapper .left-wrapper .left-content .title-content.onSelected[data-v-4365f0c5]:before{content:"";position:absolute;left:0;top:0;width:%?10?%;height:100%;background:-o-linear-gradient(326deg,#feb436 0,#fb7c22 100%);background:linear-gradient(124deg,#feb436,#fb7c22)}.category .category-wrapper .right-wrapper[data-v-4365f0c5]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.category .category-wrapper .right-wrapper .right-content[data-v-4365f0c5]{width:100%;padding:%?20?% 0;border-left:%?1?% solid #efefef;-webkit-box-sizing:border-box;box-sizing:border-box}.category .category-wrapper .right-wrapper .right-content .banner-wrapper[data-v-4365f0c5]{padding:0 %?20?%}.category .category-wrapper .right-wrapper .right-content .banner-wrapper .swiper-content[data-v-4365f0c5]{width:100%;height:%?180?%;margin-bottom:%?20?%}.category .category-wrapper .right-wrapper .right-content .banner-wrapper .swiper-content .swiper-item .swiper-img[data-v-4365f0c5]{width:100%;height:%?180?%}.category .category-wrapper .right-wrapper .right-content .product-wrapper .category-item .category-title[data-v-4365f0c5]{height:%?60?%;font-size:%?26?%;line-height:%?60?%;font-weight:500;background-color:#f6f6f6;padding-left:%?20?%;color:#000}.category .category-wrapper .right-wrapper .right-content .product-wrapper .category-item .category-content[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-flow:wrap;-ms-flex-flow:wrap;flex-flow:wrap;padding:%?20?% %?20?% 0}.category .category-wrapper .right-wrapper .right-content .product-wrapper .category-item .category-content .product-item[data-v-4365f0c5]{width:33%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-bottom:%?20?%}.category .category-wrapper .right-wrapper .right-content .product-wrapper .category-item .category-content .product-item .product-img[data-v-4365f0c5]{width:%?120?%;height:%?140?%;margin-bottom:%?10?%}.category .category-wrapper .right-wrapper .right-content .product-wrapper .category-item .category-content .product-item .product-title[data-v-4365f0c5]{font-size:%?23?%}.box[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;width:100%;height:%?200?%;border-bottom:%?1?% solid #efefef}.box .img[data-v-4365f0c5]{width:%?180?%;height:%?180?%}.box .details[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.box .details .name[data-v-4365f0c5]{margin-left:%?20?%}.box .details .volume[data-v-4365f0c5]{margin-top:%?20?%;margin-left:%?20?%}.box .details .price[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;margin-top:%?20?%;margin-left:%?18?%}.box .details .price .price1[data-v-4365f0c5]{color:red}.box .details .price .imgIcon[data-v-4365f0c5]{margin-left:%?25?%}.box .details .price .imgIcon .imageIcon[data-v-4365f0c5]{width:%?45?%;height:%?45?%}.box .details .price .imaIcon[data-v-4365f0c5]{margin-left:%?30?%}.box .details .price .imaIcon .imaIcon[data-v-4365f0c5]{width:%?45?%;height:%?45?%}.price3[data-v-4365f0c5]{color:red}.imgIcon1[data-v-4365f0c5]{margin-left:%?25?%}.imaIcon1[data-v-4365f0c5]{width:%?45?%;height:%?45?%}.pps[data-v-4365f0c5]{position:absolute;z-index:0}.flex-x[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.flex-y[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.bbCar[data-v-4365f0c5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:100%;height:%?90?%;background-color:#ececee}.line1[data-v-4365f0c5]{line-height:%?100?%}.listCar[data-v-4365f0c5]{width:100%;height:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;border-bottom:%?3?% solid #ececee}.listCar1[data-v-4365f0c5]{line-height:%?100?%}.listCar2[data-v-4365f0c5]{padding-top:%?30?%;line-height:%?100?%}.quantity[data-v-4365f0c5]{margin-left:%?20?%}.ppss[data-v-4365f0c5]{height:%?170?%}',""])},"94db":function(t,e,i){"use strict";i.r(e);var a=i("124a"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=o.a},a355:function(t,e,i){var a=i("1e59");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("2a7812e4",a,!0,{sourceMap:!1,shadowMode:!1})},ab10:function(t,e,i){"use strict";var a=i("a355"),o=i.n(a);o.a},b519:function(t,e,i){"use strict";i.r(e);var a=i("fbd6"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=o.a},e54f:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("v-uni-view",{staticClass:"uni-popup"},[i("v-uni-view",{staticClass:"uni-popup__mask",class:[t.ani,t.animation?"ani":"",t.custom?"":"uni-custom"],on:{click:function(e){e=t.$handleEvent(e),t.close(!0)}}}),i("v-uni-view",{staticClass:"uni-popup__wrapper",class:[t.type,t.ani,t.animation?"ani":"",t.custom?"":"uni-custom"],on:{click:function(e){e=t.$handleEvent(e),t.close(!0)}}},[i("v-uni-view",{staticClass:"uni-popup__wrapper-box",on:{click:function(e){e.stopPropagation(),e=t.$handleEvent(e),t.clear(e)}}},[t._t("default")],2)],1)],1):t._e()},o=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return o})},f713:function(t,e,i){"use strict";i.r(e);var a=i("e54f"),o=i("b519");for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);i("ab10");var r=i("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"61cf97ba",null);e["default"]=s.exports},f771:function(t,e,i){var a=i("9362");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("33cf801a",a,!0,{sourceMap:!1,shadowMode:!1})},f886:function(t,e,i){"use strict";i.r(e);var a=i("1442"),o=i("4088");for(var n in o)"default"!==n&&function(t){i.d(e,t,function(){return o[t]})}(n);i("71e1");var r=i("2877"),s=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"4365f0c5",null);e["default"]=s.exports},fbd6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"UniPopup",props:{animation:{type:Boolean,default:!0},type:{type:String,default:"center"},custom:{type:Boolean,default:!1},maskClick:{type:Boolean,default:!0}},data:function(){return{ani:"",show:!1}},created:function(){},methods:{clear:function(){},open:function(){var t=this;this.show=!0,this.$nextTick(function(){setTimeout(function(){t.ani="uni-"+t.type},30)})},close:function(t){var e=this;!this.maskClick&&t||(this.ani="",this.$nextTick(function(){setTimeout(function(){e.show=!1},300)}))}}};e.default=a},fcf7:function(t,e,i){"use strict";var a=i("61c0"),o=i.n(a);o.a}}]);