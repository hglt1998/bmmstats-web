(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{31:function(e,a,t){},37:function(e,a,t){e.exports=t.p+"static/media/banner.eb1255b4.png"},39:function(e,a,t){e.exports=t(45)},45:function(e,a,t){"use strict";t.r(a);var n=t(4),c=t.n(n),l=t(36),s=t.n(l),r=t(20),o=t(11),i=(t(31),t(37)),m=t.n(i);function d(){return c.a.createElement("div",{className:"cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"},c.a.createElement("header",{className:"mb-auto"},c.a.createElement("div",null,c.a.createElement(r.b,{className:"float-md-start mb-0",to:"/"},c.a.createElement("img",{height:"30",src:m.a,alt:"banner",className:"navbarImage"})),c.a.createElement("nav",{className:"nav nav-masthead justify-content-center float-md-end"},c.a.createElement(r.c,{className:"nav-link",to:"/"},"Inicio"),c.a.createElement(r.c,{className:"nav-link",to:"/actuaciones"},"Actuaciones"),c.a.createElement(r.c,{className:"nav-link",to:"/about"},"About")))))}function u(){return c.a.createElement("div",{className:"container"},c.a.createElement("h1",null,"Nace BMM STATS"),c.a.createElement("p",null,"BMM STATS es un proyecto de la"," ",c.a.createElement("a",{className:"text-white",href:"https://municipaldemairena.com",target:"_blank"},"Banda Municipal de M\xfasica de Mairena del Alcor")," y ha sido desarrollado por completo por su equipo de comunicaci\xf3n."),c.a.createElement("p",null,"Son muchas las personas que, cuando escuchan alguna de las composiciones que nuestra banda interpreta y no conocen su nombre, se acercan a nuestros m\xfasicos a preguntar qu\xe9 composici\xf3n acababa de sonar."),c.a.createElement("p",null,"A trav\xe9s de esta aplicaci\xf3n web, se podr\xe1 consultar qu\xe9 se encuentra interpretando nuestra banda con actualizaciones en tiempo real."),c.a.createElement("p",null,"Para gestionar toda la informaci\xf3n que se ofrece en esta web, nuestro equipo ha desarrolado una aplicaci\xf3n m\xf3vil de administraci\xf3n con la que se actualizan los datos con tan s\xf3lo introducir 1 dato identificador."),c.a.createElement("p",null,"En fechas futuras, se podr\xe1 hacer b\xfasquedas por actuaciones, composiciones o compositores."),c.a.createElement("p",null,"#suenaMairena"))}function p(){return c.a.createElement("div",{className:"px-3 align-items-stretch p-5"},c.a.createElement("h1",null,"BMM STATS"),c.a.createElement("p",{className:"lead p-3"},"Descrubre qu\xe9 est\xe1 tocando nuestra banda en este momento. Composiciones, ubicaci\xf3n y todos los detalles de cada actuaci\xf3n"),c.a.createElement("p",{className:"font-weight-light p-3"},"Actualizaciones en tiempo real de las interpretaciones de nuestra banda en tu dispositivo."),c.a.createElement("p",{className:"lead p-3"},c.a.createElement(r.b,{to:"/actuaciones",id:"mainButton",className:"btn btn-lg btn-secondary fw-bold border-white bg-white"},"Actuaciones")))}function E(){return c.a.createElement("div",null,"P\xe1gina no encontrada")}var b=t(2),f=t.n(b),h=t(5),g=t(12),N=t(27),v=t(29),y=(t(46),{apiKey:"AIzaSyDs8CaWFY-Cun64ThymTiHcpD5achpDyV8",authDomain:"banda-database.firebaseapp.com",databaseURL:"https://banda-database-default-rtdb.firebaseio.com",projectId:"banda-database",storageBucket:"banda-database.appspot.com",messagingSenderId:"544289795038",appId:"1:544289795038:web:255e10d3dbf4442c6ecb4f",measurementId:"G-V036DKFVH5"});v.a.initializeApp(y);var w=v.a.initializeApp(y),x=Object(N.a)(w),j=v.a.firestore(),O={firebase:v.a,db:j,database:x};function k(){var e=Object(o.g)().id,a=Object(n.useState)([]),t=Object(g.a)(a,2),l=t[0],s=t[1],r=Object(n.useState)([]),i=Object(g.a)(r,2),m=i[0],d=i[1],u=Object(n.useState)([]),p=Object(g.a)(u,2),E=p[0],b=p[1];return Object(n.useEffect)(function(){(function(){var e=Object(h.a)(f.a.mark(function e(a){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:O.db.collection("actuaciones").doc(a).get().then(function(e){var a=e.data();d(a),b(a.fecha)});case 2:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}})()(e),function(e){var a=Object(N.a)(),t=Object(N.c)(a,"repertorios/"+e);Object(N.b)(t,function(e){var a=e.val();a&&s(Object.values(a))})}(e)},[]),c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"infoHeader text-white"},m.isLive?c.a.createElement("span",{className:"badge bg-danger blink text-uppercase"},"En directo"):c.a.createElement("span",{className:"sticky-top text-uppercase"},"Finalizado"),c.a.createElement("h1",{className:"text-uppercase border rounded mt-3 p-2"},m.concepto),c.a.createElement("div",{className:"fs-6"},c.a.createElement("h6",{className:""},m.tipo),c.a.createElement("p",{className:"font-monospace d-flex text-wrap fs-6"},c.a.createElement("span",{className:"material-icons"},"person"),m.organizador1),m.organizador2?c.a.createElement("p",{className:"font-monospace d-flex"},c.a.createElement("span",{className:"material-icons"},"person"),m.organizador2):c.a.createElement(c.a.Fragment,null),c.a.createElement("p",{className:"font-monospace d-flex"},c.a.createElement("span",{className:"material-icons"},"location_on"),m.ubicacion),c.a.createElement("p",{className:"font-monospace d-flex"},m.ciudad),c.a.createElement("p",{className:"font-monospace d-flex"},new Date(1e3*E.seconds).toLocaleString()))),0===l.length?c.a.createElement("p",null,"No hay datos"):c.a.createElement("div",{className:"border rounded container scrolleable"},l.map(function(e){var a=e.time;return c.a.createElement("div",{className:"row align-items-center border",key:e.idRepertorio},c.a.createElement("div",{className:"col align-middle"},e.tituloMarcha),c.a.createElement("div",{className:"col"},c.a.createElement("small",{className:""},e.compositor)),"Concierto"!=m.tipo&&"Preg\xf3n"!=m.tipo?c.a.createElement("div",{className:"col"},c.a.createElement("small",{className:""},e.ubicacion)):c.a.createElement(c.a.Fragment,null),"Concierto"!=m.tipo&&"Preg\xf3n"!=m.tipo?c.a.createElement("div",{className:"col"},c.a.createElement("small",{className:""},a.substring(a.indexOf(",")+2,a.length))):c.a.createElement(c.a.Fragment,null))}),c.a.createElement("small",{className:"font-monospace text-dark bg-light px-2"},"Marchas interpretadas: ",l.length)))}function S(){var e=Object(n.useState)([]),a=Object(g.a)(e,2),t=a[0],l=a[1],s=Object(n.useState)(),o=Object(g.a)(s,2),i=o[0],m=o[1];return Object(n.useEffect)(function(){O.db.collection("actuaciones").orderBy("fecha","desc").get().then(function(e){var a=[];e.forEach(function(e){var t=e.data();a.push({id:t.idActuacion,concepto:t.concepto,organizador:t.organizador1,fecha:t.fecha,ciudad:t.ciudad,tipo:t.tipo,isLive:t.isLive})}),l(a),m(document.getElementById("table").rows.length-1),console.log(a)})},[]),c.a.createElement("div",{className:"container scrolleableTBody"},c.a.createElement("h1",null,"Actuaciones"),c.a.createElement("p",{className:"infoText"},"Actualmente hay ",c.a.createElement("b",{className:"bold"},i)," eventos en nuestra base de datos"),c.a.createElement("div",{className:"table-responsive-sm mt-5"},c.a.createElement("table",{className:"table table-hover",id:"table"},c.a.createElement("thead",{className:"thead-light"},c.a.createElement("tr",{className:"text-white"},c.a.createElement("th",{scope:"col"},c.a.createElement("small",null,"Concepto")),c.a.createElement("th",{scope:"col"},c.a.createElement("small",null,"Organizador")),c.a.createElement("th",{scope:"col"},c.a.createElement("small",null,"Ciudad")),c.a.createElement("th",{scope:"col"},c.a.createElement("small",null,"Fecha")),c.a.createElement("th",{scope:"col"},c.a.createElement("small",null,"Info")))),c.a.createElement("tbody",{className:"scrolleableTBody"},t.map(function(e){var a=new Date(1e3*e.fecha.seconds).toLocaleString().toString();return c.a.createElement("tr",{className:"trTable",key:e.id},c.a.createElement("td",{className:"align-self-center align-middle"},c.a.createElement("small",null,e.concepto),!0===e.isLive?c.a.createElement("span",{className:"material-icons blink toRed"},"sensors"):c.a.createElement(c.a.Fragment,null)),c.a.createElement("td",{className:"limit align-self-center"},c.a.createElement("p",{className:"align-self-center"},e.organizador)),c.a.createElement("td",{className:""},c.a.createElement("small",{className:"align-self-center"},e.ciudad)),c.a.createElement("td",null,c.a.createElement("small",null,a)),c.a.createElement("td",null,c.a.createElement(r.b,{className:"btn btn-outline-light button",to:"/actuaciones/".concat(e.id)},"Ir")))})))))}function A(){return c.a.createElement(r.a,null,c.a.createElement(d,null),c.a.createElement(o.c,null,c.a.createElement(o.a,{path:"/",element:c.a.createElement(p,null),key:1}),c.a.createElement(o.a,{path:"/about",element:c.a.createElement(u,null),key:2}),c.a.createElement(o.a,{path:"/actuaciones",element:c.a.createElement(S,null),key:3}),c.a.createElement(o.a,{path:"/actuaciones/:id",element:c.a.createElement(k,null),key:4}),c.a.createElement(o.a,{path:"*",element:c.a.createElement(E,null),key:6})))}s.a.render(c.a.createElement(A,null),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.4407952f.chunk.js.map