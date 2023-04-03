"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[364],{641:function(e,n,a){a.d(n,{Z:function(){return l}});var r=a(885),t=a(791),s=a(671),i=a(184);var l=function(e){var n=(0,t.useState)(""),a=(0,r.Z)(n,2),l=a[0],u=a[1],o=(0,t.useState)(null),p=(0,r.Z)(o,2),c=p[0],d=p[1],m=(0,t.useState)(!1),f=(0,r.Z)(m,2),v=f[0],g=f[1];(0,t.useEffect)((function(){if(l){var e=new FileReader;e.onload=function(){d(e.result)},e.readAsDataURL(l)}}));var x=(0,t.useRef)();return(0,i.jsxs)("div",{className:"from-control",style:{marginTop:"1rem",marginBottom:"1rem"},children:[(0,i.jsx)("input",{ref:x,type:"file",id:e.id,style:{display:"none"},accept:".jpg , .png, .jpeg",onChange:function(n){var a;n.target.files&&1===n.target.files.length?(a=n.target.files[0],u(a),g(!0)):g(!1),e.onInput(e.id,a,!v)}}),(0,i.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[(0,i.jsxs)("div",{className:"image-upload__preview",children:[c&&(0,i.jsx)("img",{src:c,alt:"Preview"}),!c&&(0,i.jsx)("p",{children:"Please pick an image!"})]}),(0,i.jsx)(s.Z,{type:"button",onClick:function(){x.current.click()},children:"PICK IMAGE"})]}),!v&&(0,i.jsx)("p",{children:e.errorText})]})}},1:function(e,n,a){a.r(n),a.d(n,{default:function(){return h}});var r=a(413),t=a(165),s=a(861),i=a(885),l=a(791),u=a(551),o=a(35),p=a(500),c=a(319),d=a(671),m=a(784),f=a(941),v=a(382),g=a(641),x=a(184);var h=function(e){var n=(0,o.x)(),a=n.sendRequest,h=n.loading,Z=n.cancelError,j=n.errorState,w=(0,l.useContext)(m.Z),y=(0,l.useState)("login"),C=(0,i.Z)(y,2),I=C[0],k=C[1],P=(0,u.c)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),b=(0,i.Z)(P,3),S=b[0],T=b[1],V=b[2],R=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(n){var r,s,i,l,u,o;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(i in n.preventDefault(),r=new FormData,s={},S.inputs)S.inputs[i]&&"signup"===I?r.append(i,S.inputs[i].value):S.inputs[i]&&(s[i]=S.inputs[i].value);return l="login"===I?{"Content-type":"application/json"}:{},u="signup"===I?r:JSON.stringify(s),e.prev=6,e.next=9,a("http://localhost:5000/api/users/"+I,"POST",u,l);case 9:o=e.sent,"signup"===I?E():w.login(o.userId,o.token),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(6);case 15:case"end":return e.stop()}}),e,null,[[6,13]])})));return function(n){return e.apply(this,arguments)}}(),E=function(e){e&&e.preventDefault(),"signup"===I?V((0,r.Z)((0,r.Z)({},S.inputs),{},{username:void 0,image:void 0}),S.inputs.email.isValid&&S.inputs.password.isValid):V((0,r.Z)((0,r.Z)({},S.inputs),{},{username:{value:"",isValid:!1},image:{value:"",isValid:!1}}),!1),k("signup"===I?"login":"signup")};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(f.Z,{error:j,onClear:Z}),h&&(0,x.jsx)(v.Z,{asOverlay:!0}),(0,x.jsxs)("form",{className:"auth-form",children:[(0,x.jsx)("h2",{children:"signup"===I?"Regiser":"Log in"}),"signup"===I&&(0,x.jsx)(c.Z,{id:"username",type:"text",label:"Username",placeholder:"Insert username ...",element:"input",errorText:"Please enter a username of at least 2 characters!",validators:[(0,p.CP)(3)],onInput:T}),(0,x.jsx)(c.Z,{id:"email",type:"email",label:"Email",placeholder:"Insert Email ...",element:"input",errorText:"Please enter a valid email",validators:[(0,p.Ox)()],onInput:T}),(0,x.jsx)(c.Z,{id:"password",type:"password",label:"Password",placeholder:"Insert Password ...",element:"input",errorText:"Please enter a valid password!(at lease 4 characters)",validators:[(0,p.CP)(4)],onInput:T}),"signup"===I&&(0,x.jsx)(g.Z,{id:"image",center:!0,onInput:T,errorText:"please provide an image"}),(0,x.jsx)(d.Z,{onClick:R,type:"submit",disabled:!S.isValid,children:"SUBMIT"}),(0,x.jsx)(d.Z,{onClick:E,inverse:!0,children:"SWITCH FORM"})]})]})}}}]);
//# sourceMappingURL=364.018a5e2a.chunk.js.map