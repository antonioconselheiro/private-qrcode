"use strict";(self.webpackChunkprivate_qrcode=self.webpackChunkprivate_qrcode||[]).push([[852],{1852:(u,r,e)=>{e.r(r),e.d(r,{ShareWeb:()=>i});var t=e(1528),n=e(6400);class i extends n.w8{canShare(){return(0,t.c)(function*(){return typeof navigator>"u"||!navigator.share?{value:!1}:{value:!0}})()}share(a){var s=this;return(0,t.c)(function*(){if(typeof navigator>"u"||!navigator.share)throw s.unavailable("Share API not available in this browser");return yield navigator.share({title:a.title,text:a.text,url:a.url}),{}})()}}}}]);