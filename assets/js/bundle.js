!function(e){var t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(s,a,function(t){return e[t]}.bind(null,a));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"searchBtn",(function(){return m}));const s=()=>{const e=document.querySelector(".alert");e&&e.parentElement.removeChild(e)},a=(e,t,n=7)=>{s();const a=`<div class="alert alert--${e}">${t}</div>`;document.querySelector("body").insertAdjacentHTML("afterbegin",a),window.setTimeout(s,1e3*n)};let o=document.getElementById("searched-user");const r=document.getElementById("form-forgot"),d=document.getElementById("form-login"),u=document.getElementById("logout"),c=document.getElementById("form-reset"),m=document.getElementById("search-user"),l=document.getElementById("form-signup"),i=document.getElementById("form-user-data"),g=document.getElementById("form-current-user-password");r&&r.addEventListener("submit",async e=>{e.preventDefault(),document.getElementById("forgot").textContent="Processing...";const t=document.getElementById("email").value;await(async e=>{try{"success"===(await axios({method:"POST",url:"/api/v1/user/forgot-password",data:{email:e}})).data.status&&a("success","Check Your Mail")}catch(e){a("error",e.response.data.message)}})(t),document.getElementById("forgot").textContent="Send Login Link",document.getElementById("email").value=""}),d&&d.addEventListener("submit",async e=>{e.preventDefault(),document.getElementById("log-in").textContent="Processing...";const t=document.getElementById("email").value,n=document.getElementById("password").value;await(async(e,t)=>{try{"success"===(await axios({method:"POST",url:"/api/v1/user/create-session",data:{email:e,password:t}})).data.status&&(a("success","Logged in successfully!"),window.setTimeout(()=>{location.assign("/")},1e3))}catch(e){a("error",e.response.data.message)}})(t,n),document.getElementById("log-in").textContent="Log In",document.getElementById("email").value="",document.getElementById("password").value=""}),u&&u.addEventListener("click",async()=>{try{"success"===(await axios({method:"GET",url:"/api/v1/user/logout"})).data.status&&location.assign("/")}catch(e){a("error","Please Try Again")}}),c&&c.addEventListener("submit",async e=>{e.preventDefault(),document.getElementById("reset").textContent="Processing...";const t=document.getElementById("password").value,n=document.getElementById("confirmPassword").value,s=window.location.href;await(async(e,t,n)=>{try{"success"===(await axios({method:"PATCH",url:n,data:{password:e,confirmPassword:t}})).data.status&&(window.setTimeout(()=>{location.assign("/")},1e3),a("success","Password changed successfully"))}catch(e){a("error",e.response.data.message)}})(t,n,s),document.getElementById("reset").textContent="Reset Password",document.getElementById("password").value="",document.getElementById("confirmPassword").value=""}),m&&m.addEventListener("keyup",async()=>{try{const t=m.value;if(""==t)o.innerHTML="";else{const n=await axios({method:"GET",url:"/api/v1/search/"+t});o.innerHTML="";for(let t of n.data.data.user){var e=`<div class="searched-user-container">\n            <div class="user-photo">\n                <img src="/img/users/${t.photo}" alt="user-photo" />\n            </div>\n            <div class="user-name-email">\n                <div class="user-name"><a href="/${t._id}">${t.name}</a></div>\n                <div class="user-email">${t.email}</div>\n             </div>\n          </div>`;o.innerHTML+=e}}}catch(e){a("error","Please Try Again")}}),l&&l.addEventListener("submit",async e=>{e.preventDefault(),document.getElementById("sign-up").textContent="Processing...";const t=document.getElementById("name").value,n=document.getElementById("email").value,s=document.getElementById("password").value,o=document.getElementById("confirmPassword").value;await(async(e,t,n,s)=>{try{"success"===(await axios({method:"POST",url:"/api/v1/user/create",data:{name:e,email:t,password:n,confirmPassword:s}})).data.status&&window.setTimeout(()=>{location.assign("/email-verification")},1e3)}catch(e){a("error",e.response.data.message)}})(t,n,s,o),document.getElementById("sign-up").textContent="Sign up",document.getElementById("name").value="",document.getElementById("email").value="",document.getElementById("password").value="",document.getElementById("confirmPassword").value=""}),i&&i.addEventListener("submit",async e=>{e.preventDefault(),document.getElementById("btn-save-user").textContent="Updating...";const t=new FormData;t.append("name",document.getElementById("name").value),t.append("email",document.getElementById("email").value),t.append("photo",document.getElementById("photo").files[0]),await(async e=>{try{const t=await axios({method:"PATCH",url:"/api/v1/user/profile/me",data:e});"success"===t.data.status&&(document.getElementById("my-img").src="/img/users/"+t.data.data.user.photo,document.getElementById("user-img").src="/img/users/"+t.data.data.user.photo,a("success","Data Updated successfully"))}catch(e){a("error",e)}})(t),document.getElementById("btn-save-user").textContent="SAVE SETTINGS"}),g&&g.addEventListener("submit",async e=>{e.preventDefault(),document.getElementById("btn-save-user-password").textContent="Updating...";const t=document.getElementById("currentPassword").value,n=document.getElementById("password").value,s=document.getElementById("confirmPassword").value;await(async(e,t,n)=>{try{"success"===(await axios({method:"PATCH",url:"/api/v1/user/update-password",data:{currentPassword:e,password:t,confirmPassword:n}})).data.status&&a("success","Password updated successfully.")}catch(e){a("error",e.response.data.message)}})(t,n,s),document.getElementById("currentPassword").value="",document.getElementById("password").value="",document.getElementById("confirmPassword").value="",document.getElementById("btn-save-user-password").textContent="SAVE PASSWORD"});const y=document.querySelector("body").dataset.alert;y&&a("success",y,20)}]);