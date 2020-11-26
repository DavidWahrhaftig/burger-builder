(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[0],{1:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"n",(function(){return a})),n.d(t,"p",(function(){return o})),n.d(t,"f",(function(){return c})),n.d(t,"l",(function(){return i})),n.d(t,"j",(function(){return u})),n.d(t,"k",(function(){return l})),n.d(t,"m",(function(){return s})),n.d(t,"i",(function(){return d})),n.d(t,"g",(function(){return f})),n.d(t,"h",(function(){return g})),n.d(t,"d",(function(){return m})),n.d(t,"e",(function(){return h})),n.d(t,"b",(function(){return b})),n.d(t,"c",(function(){return p})),n.d(t,"o",(function(){return v}));var r="ADD_INGREDIENT",a="REMOVE_INGREDIENT",o="SET_INGREDIENTS",c="FETCH_INGREDIENTS_FAILED",i="PURCHASE_BURGER_SUCCESS",u="PURCHASE_BURGER_FAIL",l="PURCHASE_BURGER_START",s="PURCHASE_INIT",d="FETCH_ORDERS_SUCCESS",f="FETCH_ORDERS_FAIL",g="FETCH_ORDERS_START",m="AUTH_START",h="AUTH_SUCCESS",b="AUTH_FAIL",p="AUTH_LOGOUT",v="SET_AUTH_REDIRECT_PATH"},19:function(e,t,n){"use strict";var r=n(27),a=n.n(r).a.create({baseURL:"https://react-burger-builder-7d7ed.firebaseio.com/"});t.a=a},22:function(e,t,n){e.exports={SideDrawer:"SideDrawer_SideDrawer__1TEVM",Open:"SideDrawer_Open__1oLPI",Close:"SideDrawer_Close__35bUz",Logo:"SideDrawer_Logo__3nSgF"}},23:function(e,t,n){"use strict";t.a=function(e){return e.children}},24:function(e,t,n){"use strict";n.d(t,"c",(function(){return c})),n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return u}));var r=n(17),a=n(1),o=n(19),c=function(){return{type:a.m}},i=function(e,t){return function(n){n({type:a.k}),o.a.post("/orders.json?auth="+t,e).then((function(t){n(function(e,t){return{type:a.l,orderId:e,orderData:t}}(t.data.name,e))})).catch((function(e){n(function(e){return{type:a.j,error:e}}(e))}))}},u=function(e,t){return function(n){n({type:a.h});var c="?auth=".concat(e,'&orderBy="userId"&equalTo="').concat(t,'"');o.a.get("/orders.json"+c).then((function(e){var t,o=[];for(var c in e.data)o.push(Object(r.a)(Object(r.a)({},e.data[c]),{},{id:c}));n((t=o,{type:a.i,orders:t}))})).catch((function(e){var t;n((t=e,{type:a.g,orders:t}))}))}}},28:function(e,t,n){e.exports={Toolbar:"Toolbar_Toolbar__2pGN9",Logo:"Toolbar_Logo__1IsFj",DesktopOnly:"Toolbar_DesktopOnly__BPQRJ"}},3:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return o}));var r=n(17),a=function(e,t){return Object(r.a)(Object(r.a)({},e),t)},o=function(e,t){var n=!0;return t.required&&(n=""!==e.trim()),t.minLength&&(n=n&&e.length>=t.minLength),t.maxLength&&(n=n&&e.length<=t.maxLength),n}},30:function(e,t,n){e.exports={NavItem:"NavItem_NavItem__31Two",active:"NavItem_active__3LLpC"}},34:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"h",(function(){return c})),n.d(t,"e",(function(){return i})),n.d(t,"d",(function(){return u.a})),n.d(t,"g",(function(){return u.c})),n.d(t,"b",(function(){return h})),n.d(t,"f",(function(){return f})),n.d(t,"i",(function(){return g})),n.d(t,"c",(function(){return m}));var r=n(1),a=n(19),o=function(e){return{type:r.a,ingredient:e}},c=function(e){return{type:r.n,ingredient:e}},i=function(){return function(e){a.a.get("https://react-burger-builder-7d7ed.firebaseio.com/ingredients.json").then((function(t){var n;e((n=t.data,{type:r.p,ingredients:n}))})).catch((function(t){e({type:r.f})}))}},u=n(24),l=n(27),s=n.n(l),d=function(e,t){return{type:r.e,idToken:e,userId:t}},f=function(){return localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("userId"),{type:r.c}},g=function(e){return{type:r.o,path:e}},m=function(){return function(e){var t=localStorage.getItem("token");if(t){var n=new Date(localStorage.getItem("expirationDate"));if(n>new Date){var r=localStorage.getItem("userId");e(d(t,r)),e(b((n.getTime()-(new Date).getTime())/1e3))}else e(f())}else e(f())}},h=function(e,t,n){return function(a){a({type:r.d});var o={email:e,password:t,returnSecureToken:!0},c="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAy5ZuguWLReJMqhkZrwrFCtCfjVDGbvYs";n||(c="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAy5ZuguWLReJMqhkZrwrFCtCfjVDGbvYs"),s.a.post(c,o).then((function(e){var t=new Date((new Date).getTime()+1e3*e.data.expiresIn);localStorage.setItem("token",e.data.idToken),localStorage.setItem("expirationDate",t),localStorage.setItem("userId",e.data.localId),a(d(e.data.idToken,e.data.localId)),a(b(e.data.expiresIn))})).catch((function(e){a(function(e){return{type:r.b,error:e}}(e.response.data.error))}))}},b=function(e){return function(t){setTimeout((function(){t(f())}),1e3*e)}}},35:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(52),c=n.n(o);t.a=function(e){return e.show?a.a.createElement("div",{className:c.a.Backdrop,onClick:e.clicked}):null}},47:function(e,t,n){e.exports={Content:"Layout_Content__3vYF7"}},48:function(e,t,n){e.exports=n.p+"static/media/burger-logo.b8503d26.png"},49:function(e,t,n){e.exports={Logo:"Logo_Logo__tbK7v"}},50:function(e,t,n){e.exports={NavItems:"NavItems_NavItems__2WuSP"}},51:function(e,t,n){e.exports={DrawerToggle:"DrawerToggle_DrawerToggle__1xb6M"}},52:function(e,t,n){e.exports={Backdrop:"Backdrop_Backdrop__1IJyj"}},55:function(e,t,n){e.exports=n(83)},60:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(25),c=n.n(o),i=(n(60),n(11)),u=n(12),l=n(14),s=n(13),d=n(23),f=n(47),g=n.n(f),m=n(28),h=n.n(m),b=n(48),p=n.n(b),v=n(49),E=n.n(v),_=function(e){return a.a.createElement("div",{className:E.a.Logo},a.a.createElement("img",{src:p.a,alt:"BurgerBuilder"}))},S=n(30),O=n.n(S),j=n(18),I=function(e){return a.a.createElement("li",{className:O.a.NavItem},a.a.createElement(j.b,{to:e.link,exact:!0,activeClassName:O.a.active},e.children))},w=n(50),k=n.n(w),D=function(e){return a.a.createElement("ul",{className:k.a.NavItems},a.a.createElement(I,{link:"/"},"Burger Builder"),e.isAuthenticated?a.a.createElement(I,{link:"/orders"},"Orders"):null,e.isAuthenticated?a.a.createElement(I,{link:"/logout"},"Logout"):a.a.createElement(I,{link:"/auth"},"Authenticate"))},T=n(51),y=n.n(T),A=function(e){return a.a.createElement("div",{className:y.a.DrawerToggle,onClick:e.clicked},a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null))},C=function(e){return a.a.createElement("header",{className:h.a.Toolbar},a.a.createElement(A,{clicked:e.toggleSideDrawer}),a.a.createElement("div",{className:h.a.Logo},a.a.createElement(_,null)),a.a.createElement("nav",{className:h.a.DesktopOnly},a.a.createElement(D,{isAuthenticated:e.isAuthenticated})))},R=n(22),N=n.n(R),L=n(35),x=function(e){return a.a.createElement(d.a,null,a.a.createElement(L.a,{show:e.show,clicked:e.close}),a.a.createElement("div",{className:[N.a.SideDrawer,e.show?N.a.Open:N.a.Close].join(" "),onClick:e.close},a.a.createElement("div",{className:N.a.Logo},a.a.createElement(_,null)),a.a.createElement("nav",null,a.a.createElement(D,{isAuthenticated:e.isAuthenticated}))))},U=n(15),P=function(e){Object(l.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={showSideDrawer:!1},e.closeSideDrawer=function(){e.setState({showSideDrawer:!1})},e.toggleSideDrawer=function(){e.setState((function(e){return{showSideDrawer:!e.SideDrawer}}))},e}return Object(u.a)(n,[{key:"render",value:function(){return a.a.createElement(d.a,null,a.a.createElement(C,{toggleSideDrawer:this.toggleSideDrawer,isAuthenticated:this.props.isAuthenticated}),a.a.createElement(x,{show:this.state.showSideDrawer,close:this.closeSideDrawer,isAuthenticated:this.props.isAuthenticated}),a.a.createElement("main",{className:g.a.Content},this.props.children))}}]),n}(r.Component),B=Object(U.b)((function(e){return{isAuthenticated:null!==e.auth.token}}))(P),H=n(4),F=n(34),G=function(e){return function(t){Object(l.a)(r,t);var n=Object(s.a)(r);function r(){var e;Object(i.a)(this,r);for(var t=arguments.length,a=new Array(t),o=0;o<t;o++)a[o]=arguments[o];return(e=n.call.apply(n,[this].concat(a))).state={component:null},e}return Object(u.a)(r,[{key:"componentDidMount",value:function(){var t=this;e().then((function(e){t.setState({component:e.default})}))}},{key:"render",value:function(){var e=this.state.component;return e?a.a.createElement(e,this.props):null}}]),r}(r.Component)},M=G((function(){return n.e(4).then(n.bind(null,104))})),J=G((function(){return n.e(3).then(n.bind(null,105))})),W=G((function(){return n.e(6).then(n.bind(null,106))})),q=G((function(){return n.e(5).then(n.bind(null,102))})),V=G((function(){return n.e(7).then(n.bind(null,103))})),Z=function(e){Object(l.a)(n,e);var t=Object(s.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.props.onTryAuthSignup()}},{key:"render",value:function(){var e=a.a.createElement(H.d,null,a.a.createElement(H.b,{path:"/auth",component:q}),a.a.createElement(H.b,{path:"/",exact:!0,component:M}),a.a.createElement(H.a,{to:"/"}));return this.props.isAuthenticated&&(e=a.a.createElement(H.d,null,a.a.createElement(H.b,{path:"/checkout",component:J}),a.a.createElement(H.b,{path:"/orders",component:W}),a.a.createElement(H.b,{path:"/logout",component:V}),a.a.createElement(H.b,{path:"/auth",component:q}),a.a.createElement(H.b,{path:"/",exact:!0,component:M}),a.a.createElement(H.a,{to:"/"}))),a.a.createElement("div",null,a.a.createElement(B,null,e))}}]),n}(r.Component),z=Object(H.g)(Object(U.b)((function(e){return{isAuthenticated:null!==e.auth.token}}),(function(e){return{onTryAuthSignup:function(){return e(F.c())}}}))(Z));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Y=n(10),K=n(20),Q=n(1),$=n(3),X={salad:.5,cheese:.4,meat:1.3,bacon:.7},ee={ingredients:null,totalPrice:4,error:!1,building:!1},te=function(e,t){var n=Object(K.a)({},t.ingredient,e.ingredients[t.ingredient]+1),r={ingredients:Object($.b)(e.ingredients,n),totalPrice:e.totalPrice+X[t.ingredient],building:!0};return Object($.b)(e,r)},ne=function(e,t){var n=Object(K.a)({},t.ingredient,e.ingredients[t.ingredient]-1),r={ingredients:Object($.b)(e.ingredients,n),totalPrice:e.totalPrice-X[t.ingredient],building:!0};return Object($.b)(e,r)},re=function(e,t){return Object($.b)(e,{ingredients:t.ingredients,totalPrice:4,error:!1,building:!1})},ae=function(e,t){return Object($.b)(e,{error:!0})},oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q.a:return te(e,t);case Q.n:return ne(e,t);case Q.p:return re(e,t);case Q.f:return ae(e);default:return e}},ce=n(36),ie={orders:[],loading:!1,purchased:!1},ue=function(e,t){return Object($.b)(e,{loading:!0})},le=function(e,t){return Object($.b)(e,{loading:!1})},se=function(e,t){var n=Object($.b)(t.orderData,{id:t.orderId});return Object($.b)(e,{loading:!1,orders:[].concat(Object(ce.a)(e.orders),[n]),purchased:!0})},de=function(e,t){return Object($.b)(e,{purchased:!1})},fe=function(e,t){return Object($.b)(e,{loading:!1})},ge=function(e,t){return Object($.b)(e,{loading:!0})},me=function(e,t){return Object($.b)(e,{loading:!1,orders:t.orders})},he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q.k:return ue(e);case Q.j:return le(e);case Q.l:return se(e,t);case Q.m:return de(e);case Q.h:return ge(e);case Q.g:return fe(e);case Q.i:return me(e,t);default:return e}},be={token:null,userId:null,error:null,loading:!1,authRedirectPath:"/"},pe=function(e,t){return Object($.b)(e,{loading:!0,error:null})},ve=function(e,t){var n=t.error;return n.message=n.message.replace("_"," "),Object($.b)(e,{loading:!1,error:n})},Ee=function(e,t){return Object($.b)(e,{loading:!1,error:null,token:t.idToken,userId:t.userId})},_e=function(e,t){return Object($.b)(e,{token:null,userId:null})},Se=function(e,t){return Object($.b)(e,{authRedirectPath:t.path})},Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Q.d:return pe(e);case Q.b:return ve(e,t);case Q.e:return Ee(e,t);case Q.c:return _e(e);case Q.o:return Se(e,t);default:return e}},je=n(54),Ie=Y.d,we=Object(Y.c)({burgerBuilder:oe,order:he,auth:Oe}),ke=Object(Y.e)(we,Ie(Object(Y.a)(je.a)));c.a.render(a.a.createElement(U.a,{store:ke},a.a.createElement(j.a,{basename:"/burger-builder"},a.a.createElement(z,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[55,1,2]]]);
//# sourceMappingURL=main.094c0cc1.chunk.js.map