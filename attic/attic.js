const T=THREE,W=142,L=397,KH=49.5,CH=88.5,RUN=Math.sqrt(55*55-(CH-KH)**2),HB=155,BW=74.5,BL=136,
$=i=>document.getElementById(i),el=$('c'),mat=c=>new T.MeshLambertMaterial({color:c}),
ren=new T.WebGLRenderer({antialias:true,alpha:true}),sc=new T.Scene(),cam=new T.PerspectiveCamera(50,1,1,3000),
ctr=new T.Vector3(W/2,40,L/2);
ren.setPixelRatio(Math.min(devicePixelRatio,2));el.appendChild(ren.domElement);
sc.add(new T.HemisphereLight(0xffffff,0x8a8274,.9));
const dl=new T.DirectionalLight(0xffffff,.4);dl.position.set(40,300,120);sc.add(dl);
function gl0(){return new T.MeshBasicMaterial({color:0xffcf8a})}
// shell: faces point outward and render from inside, so near walls vanish when orbiting
function quad(p,c,t){let v=p.map(a=>new T.Vector3(...a));
 const n=new T.Vector3().subVectors(v[1],v[0]).cross(new T.Vector3().subVectors(v[2],v[0])),
 q=v[0].clone().add(v[2]).multiplyScalar(.5);
 if(n.dot(ctr.clone().sub(q))>0)v.reverse();
 const g=new T.BufferGeometry().setFromPoints([v[0],v[1],v[2],v[0],v[2],v[3]]);g.computeVertexNormals();
 const nn=n.clone().normalize();
 g.setAttribute('uv',new T.Float32BufferAttribute([v[0],v[1],v[2],v[0],v[2],v[3]].map(a=>Math.abs(nn.y)>.99?[a.x,a.z]:Math.abs(nn.x)>.99?[a.z,a.y]:Math.abs(nn.z)>.99?[a.x,a.y]:[a.z,a.y*1.41]).flat(),2));
 const m=new T.Mesh(g,new T.MeshLambertMaterial({color:c,map:t,side:T.BackSide}));sc.add(m);return m}
const tex=(n,fn,r)=>{const c=document.createElement('canvas');c.width=c.height=n;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,n,n);fn(x,n);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1/r,1/r);t.anisotropy=8;return t},
 wood=tex(256,(x,n)=>{for(let i=0;i<8;i++){const g=205+Math.random()*50|0;x.fillStyle='rgb('+g+','+(g-12)+','+(g-28)+')';x.fillRect(i*32,0,32,n);x.fillStyle='rgba(0,0,0,.4)';x.fillRect(i*32,0,2,n);x.fillRect(i*32,Math.random()*n,32,2)}for(let j=0;j<500;j++){x.fillStyle='rgba(70,30,10,.1)';x.fillRect(Math.random()*n,Math.random()*n,1,6+Math.random()*24)}},26),
 carpet=tex(128,(x,n)=>{for(let i=0;i<3000;i++){const g=185+Math.random()*70|0;x.fillStyle='rgb('+g+','+g+','+g+')';x.fillRect(Math.random()*n,Math.random()*n,2,2)}},14),
 lap=tex(64,(x,n)=>{x.fillStyle='rgba(60,40,20,.25)';x.fillRect(0,0,n,2);x.fillRect(0,32,n,2);x.fillStyle='rgba(255,255,255,.7)';x.fillRect(0,2,n,1);x.fillRect(0,34,n,1)},16),
 tile=tex(64,(x,n)=>{x.fillStyle='rgba(0,0,0,.2)';x.fillRect(0,0,n,2);x.fillRect(0,0,2,n)},12),
 pan=tex(64,(x,n)=>{x.fillStyle='rgba(40,15,0,.5)';x.fillRect(0,0,2,n);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(2,0,1,n);for(let j=0;j<24;j++){x.fillStyle='rgba(90,40,10,.09)';x.fillRect(Math.random()*n,0,1,n)}},4);
const WC=0xc8a27a,walls=[];
quad([[0,0,0],[W,0,0],[W,0,HB],[0,0,HB]],0x7a4230,wood);
// carpet with a hole where the stairs come up, running back under the cabinet block to above the stair door
{const z0=HB+40,z1=HB+150.5,x0=BW+4.75,x1=BW+39.25,C=(a,b,c,d)=>quad([[a,0,c],[b,0,c],[b,0,d],[a,0,d]],0xd8c0b4,carpet);
 C(0,W,HB,z0);C(0,x0,z0,z1);C(x1,W,z0,z1);C(0,W,z1,L)}
quad([[RUN,CH,0],[W-RUN,CH,0],[W-RUN,CH,L],[RUN,CH,L]],0xeceae4,tile);
[[[0,0,0],[0,0,L],[0,KH,L],[0,KH,0]],[[W,0,0],[W,0,L],[W,KH,L],[W,KH,0]],
 [[0,KH,0],[0,KH,L],[RUN,CH,L],[RUN,CH,0]],[[W,KH,0],[W,KH,L],[W-RUN,CH,L],[W-RUN,CH,0]],
 ...[0,L].flatMap(z=>[[[0,0,z],[W,0,z],[W,KH,z],[0,KH,z]],[[0,KH,z],[W,KH,z],[W-RUN,CH,z],[RUN,CH,z]]])
].forEach(p=>walls.push(quad(p,WC,lap)));
// cabinet block (97 in), stair half wall, closet wall and stairwell opening
const CZ=HB+97,SZ=CZ+53.5,SX=BW+39.25,SH=KH+(CH-KH)*(W-SX)/RUN,
 ext=(pts,z0,len,c)=>{const m=new T.Mesh(new T.ExtrudeGeometry(new T.Shape(pts.map(a=>new T.Vector2(...a))),{depth:len,bevelEnabled:false}),mat(c));m.position.z=z0;sc.add(m)};
const SR=9,ST=9.5,NT=11,LOW=-SR*(NT+1),SW=36,SXC=(BW+4.75+SX)/2,SX0=SXC-SW/2,SX1=SXC+SW/2,Z1=SZ-NT*ST,DZ=Z1-6,
 DW=29,DH=80,RW=33,BOXY=LOW+SR+122,LCH=LOW+96,TH=Math.atan(SR/ST),
 nose=z=>LOW+SR+(z-Z1)*SR/ST,
 PH=(LOW+DH-nose(DZ))*Math.cos(TH),PB=(BOXY-nose(CZ))*Math.cos(TH),PERP=Math.min(PH,PB);
// cabinet block over the hall; where it hangs over the lower stairs its underside is BOXY above the attic floor
ext([[BW,0],[W,0],[W,KH],[W-RUN,CH],[BW,CH]],HB,DZ-HB,0x784a29);
ext([[BW,0],[SX0-.7,0],[SX0-.7,BOXY],[SX1+.7,BOXY],[SX1+.7,0],[W,0],[W,KH],[W-RUN,CH],[BW,CH]],DZ,CZ-DZ,0x784a29);
ext([[SX,0],[W,0],[W,KH],[SX,SH]],CZ,53.5,0xe4e6e8);
box(4.75,33.5,53.5,BW+2.4,16.75,CZ+26.75,0x784a29);
// stairs down to the second floor: 12 risers of 9 in, 11 treads of 9.5 in, 36 in wall to wall,
// handrail on the left going up (33 in to the far wall), 29 x 80 in door 6 in before the first step

box(SW,SR-.2,1,SXC,-SR/2-.1,SZ+.5,0x8b6f5e);
for(let k=1;k<=NT;k++){box(SW,SR*k,ST,SXC,LOW+SR*k/2,Z1+ST*(k-.5),0x8b6f5e);box(SW-.2,.7,1.3,SXC,LOW+SR*k-.3,Z1+ST*(k-1)+.6,0x6f5446)}
const shaft=[];
[SX0-.5,SX1+.5].forEach(x=>{shaft.push(box(1,BOXY-LOW-.1,CZ-DZ-.2,x,(LOW+BOXY-.1)/2,(DZ+CZ)/2,0xe9e6df),box(1,-LOW-.2,SZ-CZ,x,(LOW-.2)/2,(CZ+SZ)/2,0xe9e6df));
 box(1.2,5,SZ-DZ,x+(x<SXC?1.1:-1.1),LOW+2.6,(DZ+SZ)/2,0x8a5a30)});

{const g=new T.Mesh(new T.SphereGeometry(3.2,12,8),gl0());g.position.set(SXC,BOXY-3,DZ+30);sc.add(g)}
// downstairs: wall with the doorway, a bit of floor and the open door
shaft.push(box(SXC-DW/2-(SXC-60),LCH-LOW,4,(60+SXC-DW/2)/2,(LOW+LCH)/2,DZ-2,0xe9e6df),box(133-(SXC+DW/2),LCH-LOW,4,(133+SXC+DW/2)/2,(LOW+LCH)/2,DZ-2,0xe9e6df),
 box(DW,LCH-LOW-DH,4,SXC,LOW+DH+(LCH-LOW-DH)/2,DZ-2,0xe9e6df));
[[SXC-DW/2-1.5,3,DH+3,LOW+(DH+3)/2],[SXC+DW/2+1.5,3,DH+3,LOW+(DH+3)/2],[SXC,DW+6,3,LOW+DH+1.5]].forEach(a=>box(a[1],a[2],5,a[0],a[3],DZ-2,0xf4f2ec));
box(90,1,90,SXC,LOW-.6,DZ-45,0x5d5a57);
box(1.4,DH-1,DW,SXC+DW/2,LOW+DH/2,DZ-4-DW/2,0xf4f2ec);
{const a=new T.Vector3(SX1-2.6,nose(Z1)+34,Z1),b=new T.Vector3(SX1-2.6,nose(SZ-ST)+34,SZ-ST),d=b.clone().sub(a),
 r=new T.Mesh(new T.CylinderGeometry(1,1,d.length(),10),mat(0x9a6430));r.position.copy(a).add(b).multiplyScalar(.5);
 r.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());sc.add(r)}
// from outside the attic the stair walls and downstairs wall hide, so the steps show as a cutaway under the model
panel(97,88.5,BW-.05,44.25,HB+48.5,-Math.PI/2);panel(53.5,33.5,BW-.05,16.75,CZ+26.75,-Math.PI/2);
{const t=pan.clone(),m=new T.Mesh(new T.ShapeGeometry(new T.Shape([[BW,33.5],[SX,33.5],[SX,SH],[W-RUN,CH],[BW,CH]].map(a=>new T.Vector2(...a)))),new T.MeshLambertMaterial({color:0x84502c,map:t}));t.needsUpdate=true;t.repeat.set(.25,.25);m.position.z=CZ+.05;sc.add(m)}
fr(215.25,58,17,29.6,1,0x9a5a26);fr(235,58,17,29.6,-1,0x9a5a26);fr(215.25,34.1,17,11.4,0,0x9a5a26);fr(235,34.1,17,11.4,0,0x9a5a26);
door(BW-.5,185.375,30.75,76,-Math.PI/2,0x8f5a37,1);
box(.2,4.5,2.8,BW-.15,46.5,165.3,0xe3d6bb);box(.6,3.5,150.5,BW-.3,1.75,230.25,0x5a3820);door(.4,180,28.5,47,Math.PI/2,0x8a5a30);door(.4,340,28.5,47,Math.PI/2,0x8a5a30);door(W-.4,335,28.5,47,-Math.PI/2,0x8a5a30);door(W-.4,129,28.5,47,-Math.PI/2,0xeeede8,1);
{const m=new T.Mesh(new T.PlaneGeometry(HB,KH),mat(0x82603f));m.position.set(W-.05,KH/2,HB/2);m.rotation.y=-Math.PI/2;sc.add(m)}
{const t=pan.clone(),m=new T.Mesh(new T.ShapeGeometry(new T.Shape([[BW,0],[W,0],[W,KH],[W-RUN,CH],[BW,CH]].map(a=>new T.Vector2(...a)))),new T.MeshLambertMaterial({color:0xa56b42,map:t,side:T.DoubleSide}));t.needsUpdate=true;t.repeat.set(.25,.25);m.position.z=HB-.05;sc.add(m)}
box(2.8,4.5,.2,85,62,HB-.15,0x222222);box(1.6,2.2,.2,111,51,HB-.15,0xeeeeee);
box(1.8,1.2,L,RUN,CH-.6,L/2,0xe6e4de);box(1.8,1.2,L,W-RUN,CH-.6,L/2,0xe6e4de);
[.4,L-.4].forEach(z=>{box(W-2*RUN,1.6,.8,W/2,CH-.8,z,0xe6e4de);
 const a=Math.atan2(CH-KH,RUN),ln=Math.hypot(RUN,CH-KH);
 [[RUN/2,a],[W-RUN/2,-a]].forEach(s=>{const m=box(ln,1.6,.8,s[0],(KH+CH)/2-.8,z,0xe6e4de);m.rotation.z=s[1]})});
function box(w,h,d,x,y,z,c,g){const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);(g||sc).add(m);return m}
function win(x,z,w,y0,h,s,fc,bl){const g=new T.Group(),t=3;
 box(w,h,1,0,h/2,0,0x3d4a55,g);
 [[w,t,0,h-t/2],[w,t,0,t/2],[t,h,t/2-w/2,h/2],[t,h,w/2-t/2,h/2],[w-2*t,2,0,h/2]].forEach(a=>box(a[0],a[1],2.4,a[2],a[3],0,fc,g));
 box(w+6,1.6,5,0,-.8,s*1.8,fc,g);
 if(bl)for(let i=0;i<12;i++)box(w-2*t-.5,1.2,.4,0,h-t-1-i*2.2,s*1.3,0xe8e4d8,g);
 g.position.set(x,y0,z+s*1.2);sc.add(g)}
win(77,0,43,33,45,1,0xe9e4d6,0);win(71,L,32,38,40,-1,0x7a5236,1);
function door(x,z,w,h,ry,c,fl){const g=new T.Group(),d=new T.Color(c).multiplyScalar(.8).getHex();
 box(w+4,h+2,1,0,h/2+1,0,0x5a3418,g);box(w,h,1.4,0,h/2,.35,c,g);
 if(!fl)[.72,.27].forEach(f=>box(w*.62,h*.36,.4,0,h*f,1.2,d,g));
 [h-13,10].forEach(y=>box(.5,3,.5,-w/2+.6,y,1.3,0x8a6a3a,g));
 const k=new T.Mesh(new T.SphereGeometry(1,12,8),mat(0xb08a3a));k.position.set(w/2-3,h*.47,1.9);g.add(k);
 g.position.set(x,0,z);g.rotation.y=ry;sc.add(g)}
function fr(z,y,w,h,s,c){const g=new T.Group();box(w,h,1.2,0,0,0,c,g);if(s)[1,-1].forEach(k=>box(.5,2.6,.5,-s*(w/2-.3),k*(h/2-3.5),.9,0x8a6a3a,g));
 box(s?.6:4,s?4:.6,.8,s*(w/2-3),0,1.3,0xb8743a,g);g.position.set(BW-.5,y,z);g.rotation.y=-Math.PI/2;sc.add(g)}
function panel(w,h,x,y,z,ry){const t=pan.clone();t.needsUpdate=true;t.repeat.set(w/4,1);
 const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshLambertMaterial({color:0x84502c,map:t}));m.position.set(x,y,z);m.rotation.y=ry;sc.add(m)}
// baseboards, knee wall trim, threshold
const wh=0xe9e5da,br=0x6b4220;
box(.6,3.5,HB,.3,1.75,HB/2,wh);box(.6,3.5,L-HB,.3,1.75,(L+HB)/2,br);
box(.6,3.5,HB,W-.3,1.75,HB/2,0xd8b073);box(.6,3.5,L-SZ,W-.3,1.75,(L+SZ)/2,br);
box(W,3.5,.6,W/2,1.75,.3,wh);box(W,3.5,.6,W/2,1.75,L-.3,br);
box(1.2,1.2,L,.6,KH,L/2,0xf1eee6);box(1.2,1.2,L,W-.6,KH,L/2,0xf1eee6);
box(BW,.5,2.4,BW/2,.25,HB,br);
// white trim along the top of both gable end walls, above the windows
{const an=Math.atan2(CH-KH,RUN),sl=Math.hypot(RUN,CH-KH),tc=0xf1eee6;
[.8,L-.8].forEach(z=>{
 box(W-2*RUN,1.4,1.6,W/2,CH-.7,z,tc);
 if(z<10)return;
 const a=box(sl,1.4,1.6,RUN/2,(KH+CH)/2-.4,z,tc);a.rotation.z=an;
 const b=box(sl,1.4,1.6,W-RUN/2,(KH+CH)/2-.4,z,tc);b.rotation.z=-an})}
const gl=new T.MeshBasicMaterial({color:0xffcf8a}),bz=mat(0x4a3a2c),cyl=(r,h,x,y,z,m)=>{const o=new T.Mesh(new T.CylinderGeometry(r,r,h,24),m);o.position.set(x,y,z);sc.add(o)};
// flush dome light by the AC window
cyl(8,1.6,71,CH-.8,60,mat(0x4a4338));
const dome=new T.Mesh(new T.SphereGeometry(7,24,10,0,Math.PI*2,Math.PI/2,Math.PI/2),gl);dome.position.set(71,CH-1,60);dome.scale.y=.55;sc.add(dome);
// low-profile ceiling fan with a 3-bulb light kit
cyl(3,2,71,CH-1,330,bz);cyl(6,4,71,CH-4,330,bz);cyl(5,2,71,CH-7,330,bz);
for(let i=0;i<5;i++){const p=new T.Group(),b=new T.Mesh(new T.BoxGeometry(22,.6,5),mat(0x5a3a28));b.position.x=17;p.add(b);p.position.set(71,CH-5,330);p.rotation.y=i*1.2566;sc.add(p)}
for(let i=0;i<3;i++){const s=new T.Mesh(new T.SphereGeometry(3.2,12,8),gl);s.position.set(71+4*Math.cos(i*2.094),CH-9.5,330+4*Math.sin(i*2.094));sc.add(s)}
// furniture
const items=[];let cur=null;
const hist=[],decor=[];
function save(){hist.push(items.map(i=>[i,i.position.x,i.position.z,i.rotation.y,i.material.color.getHex(),i.visible]));hist[hist.length-1].dv=decor.map(d=>d.visible);if(hist.length>100)hist.shift()}
function undo(){const s=hist.pop();if(!s)return;items.slice().forEach(i=>{if(!s.some(r=>r[0]==i))sc.remove(i)});items.length=0;
 s.forEach(r=>{const i=r[0];if(!i.parent)sc.add(i);i.position.x=r[1];i.position.z=r[2];i.rotation.y=r[3];i.material.color.setHex(r[4]);i.visible=r[5];items.push(i)});if(s.dv)decor.forEach((d,k)=>d.visible=s.dv[k]);
 if(cur&&(!items.includes(cur)||!cur.visible))cur=null;upd();renderList()}
const CAT=[['Queen bed',60,80,24,0xe6e2d8],['Full bed',54,75,24,0x4b4c50],['Twin bed',39,75,24,0xe6e2d8],['Dresser',60,18,32,0x6e5340],['Nightstand',25,16,23,0x8e4322],['Desk',48,24,30,0xa88b66],['Bookshelf',30,12,72,0x6e5340],['Wardrobe',36,22,72,0x7d6a58],['Sofa',80,36,32,0x5f7a86],['Armchair',32,32,18,0x8a5d4a],['TV stand',48,16,22,0x4a4540],['Rug 5x8',60,96,.6,0x7a3f3a],['Printer station',48,24,30,0x8a6a4f],['Rug 5x7',60,84,.6,0x9a4a2c],['Rug 6x9',72,108,.6,0x9a4a2c],['Floor mat',60,44,.3,0x4a4f55],['Plant',12,12,14,0xa4522f],['Side table',27,23,20,0xb98748],['Floor lamp',11,11,1.2,0x16161a],['Wire shelf',36,14,48,0x8a8f96],['Big mirror',20,7,36,0xc9a24a],['Hall runner',30,120,.5,0x8b4a2e],['Rug 6x6',73,73,.6,0x8f9b78],['Woven basket',16,16,15,0xc8a56a]];
// extra height that sits above the base box (headboard, printer, leaves, chair back, lamp pole)
const EX=n=>/ bed$/.test(n)?14:({'Printer station':31,Plant:26,Armchair:16,'Floor lamp':52.8})[n]||0;
const GRP={Furniture:['Queen bed','Full bed','Twin bed','Dresser','Nightstand','Side table','Desk','Bookshelf','Wardrobe','Sofa','Armchair','TV stand'],Rugs:['Rug 5x8','Rug 5x7','Rug 6x9','Rug 6x6','Hall runner','Floor mat'],Decor:['Plant','Floor lamp','Big mirror','Woven basket'],Hobby:['Printer station','Wire shelf']};
function make(c){const [n,w,d,h,col]=c,m=new T.Mesh(new T.BoxGeometry(w,h,d),mat(col));
 m.add(new T.LineSegments(new T.EdgesGeometry(m.geometry),new T.LineBasicMaterial({color:0x222222})));
 m.userData={n,w,d,bh:h,ex:EX(n),col,h:Math.round((h+EX(n))*10)/10};m.position.set(71,h/2,80);if(/ bed$/.test(n))dress(m,h);if(n=='Printer station')station(m,h);if(n=='Nightstand')nstand(m);if(n=='Side table')stable(m);if(n=='Dresser')drawers(m);if(n=='Plant')plant(m,h);if(n=='Armchair')chair(m,h);if(n=='Floor lamp')flamp(m,h);if(n=='Wire shelf')shelf(m,h);if(n=='Big mirror')mirror(m);if(n=='Hall runner')runner(m);if(n=='Woven basket')basket(m);return m}
function add(c){save();const m=make(c);sc.add(m);items.push(m);selm(m);renderList();return m}
// rebuild the selected piece at a new real size, keeping its spot, turn and color
function resize(w,d,H){if(!cur||!(w>=1&&d>=1&&H>=.5))return;const u=cur.userData;if(w==u.w&&d==u.d&&H==u.h)return;
 save();const bh=Math.max(.3,H-u.ex),n=make([u.n,w,d,bh,u.col]);n.material.color.copy(cur.material.color);
 n.position.set(cur.position.x,bh/2,cur.position.z);n.rotation.y=cur.rotation.y;n.visible=cur.visible;
 const i=items.indexOf(cur);sc.remove(cur);sc.add(n);items[i]=n;selm(n);renderList()}
function dress(m,h){const {w,d}=m.userData,cherry=mat(0x9a4a22),hb=new T.Mesh(new T.BoxGeometry(w+3,38,3),cherry);hb.position.set(0,19-h/2,-d/2+.9);m.add(hb);
 [-1,1].forEach(s=>{const p=new T.Mesh(new T.CylinderGeometry(1.6,1.9,44,10),cherry);p.position.set(s*(w/2+1),22-h/2,-d/2+1.5);m.add(p);const k=new T.Mesh(new T.SphereGeometry(2,8,6),cherry);k.position.set(s*(w/2+1),44-h/2+1,-d/2+1.5);m.add(k)});
 const sk=new T.Mesh(new T.BoxGeometry(w+.6,8,d+.6),mat(0xe4e0d6));sk.position.y=-h/2+4;m.add(sk);
 const Q=(bw,bh,bd,x,y,z,c,r)=>{const q=new T.Mesh(new T.BoxGeometry(bw,bh,bd),mat(c));q.position.set(x,h/2+y,z);q.rotation.y=r||0;m.add(q)};
 Q(w*.8,5,14,0,2.5,-d/2+8,0xe8e4dc);Q(17,4,17,-w*.12,6,-d/2+17,0x74858f,.5);Q(17,4,17,w*.2,6,-d/2+17,0xb4c2ca,-.4)}
function lampy(m,h){const b=new T.Mesh(new T.BoxGeometry(2,5,2),mat(0x3a2e26)),s=new T.Mesh(new T.BoxGeometry(9,8,9),new T.MeshLambertMaterial({color:0xf3d9a0,emissive:0x7a5418})),l=new T.PointLight(0xffb45a,.45,90);
 b.position.y=h/2+2.5;s.position.y=h/2+9;l.position.y=h/2+11;m.add(b,s,l)}
function drawers(m){const {w,d,h}=m.userData,k=mat(0x2b1d14),g=mat(0xb08a3a),z=d/2+.15;
 [-.17,.17].forEach(f=>{const l=new T.Mesh(new T.BoxGeometry(w-3,.4,.3),k);l.position.set(0,h*f,z);m.add(l)});
 [-.33,0,.33].forEach(f=>[-1,1].forEach(s=>{const n=new T.Mesh(new T.BoxGeometry(1.6,1.6,1),g);n.position.set(s*w*.2,h*f,z+.4);m.add(n)}))}
function plant(m,h){const g=mat(0x4f7a3a);[[0,10,0,7],[3,17,-2,5.5],[-3,16,3,5]].forEach(a=>{const s=new T.Mesh(new T.SphereGeometry(a[3],10,8),g);s.position.set(a[0],h/2+a[1],a[2]);m.add(s)})}
function chair(m,h){const {w,d}=m.userData,P=(bw,bh,bd,x,y,z,col)=>{const b=new T.Mesh(new T.BoxGeometry(bw,bh,bd),mat(col));b.position.set(x,h/2+y,z);m.add(b)};
 P(w,16,7,0,8,-d/2+3.5,0x7a4f3e);P(5,8,d-7,-(w/2-2.5),4,3.5,0x7a4f3e);P(5,8,d-7,w/2-2.5,4,3.5,0x7a4f3e);
 P(w-10,4,d-12,0,2,3,0xb4704f);P(20,12,.8,3,9,-d/2+7.4,0xe9dcc0);P(13,9,4,-6,7,-d/2+9.5,0xc99a3c)}
// Govee-style slim pole lamp: black round base, thin pole, warm glow strip
function flamp(m,h){m.material.transparent=true;m.material.opacity=0;m.userData.quiet=true;const bk=mat(0x16161a),
 b=new T.Mesh(new T.CylinderGeometry(5.5,5.5,1.2,24),bk),p=new T.Mesh(new T.CylinderGeometry(.6,.6,55,12),bk),
 g=new T.Mesh(new T.BoxGeometry(.4,50,.3),new T.MeshBasicMaterial({color:0xffd9a0})),l=new T.PointLight(0xffb45a,.6,120);
 p.position.y=28.1;g.position.set(0,28.6,.62);l.position.set(0,40,5);m.add(b,p,g,l)}
function leafTex(){const c=document.createElement('canvas');c.width=256;c.height=320;const x=c.getContext('2d');x.fillStyle='#f4f2ea';x.fillRect(0,0,256,320);x.lineCap='round';
 const P=t=>[(1-t)*(1-t)*110+2*(1-t)*t*120+t*t*150,(1-t)*(1-t)*300+2*(1-t)*t*160+t*t*30];
 x.strokeStyle='#2c5f3a';x.lineWidth=5;x.beginPath();x.moveTo(110,300);x.quadraticCurveTo(120,160,150,30);x.stroke();
 for(let i=0;i<15;i++){const t=.08+i*.06,p=P(t),L=62*(1-Math.abs(t-.4)*.9);x.lineWidth=8*(1-t*.5);x.strokeStyle=i%2?'#2f6b3a':'#41804a';
  [-1,1].forEach(s=>{x.beginPath();x.moveTo(p[0],p[1]);x.lineTo(p[0]+s*L*.9,p[1]-L*.35);x.stroke()})}
 return new T.CanvasTexture(c)}
function basket(m){const {h}=m.userData;m.material.transparent=true;m.material.opacity=0;m.userData.quiet=true;
 const b=new T.Mesh(new T.CylinderGeometry(8,7,h,24,1,true),new T.MeshLambertMaterial({color:0xc8a56a,side:T.DoubleSide})),
 bt=new T.Mesh(new T.CircleGeometry(7,24),mat(0x9a7a45)),rim=new T.Mesh(new T.TorusGeometry(8,.7,8,24),mat(0xd8b87a)),
 th=new T.Mesh(new T.BoxGeometry(1.4,13,9),mat(0xf3e9d2)),lump=new T.Mesh(new T.SphereGeometry(6,12,8),mat(0xf3e9d2));
 bt.rotation.x=-Math.PI/2;bt.position.y=-h/2+.2;rim.rotation.x=Math.PI/2;rim.position.y=h/2;
 th.position.set(-7.9,h/2-5,0);lump.scale.y=.5;lump.position.set(0,h/2-1,0);m.add(b,bt,rim,th,lump)}
function nstand(m){const {w,d,h}=m.userData,k=mat(0x3a1a0c),g=mat(0xb08a3a),z=d/2+.15,L=(bw,bh,x,y)=>{const b=new T.Mesh(new T.BoxGeometry(bw,bh,.3),k);b.position.set(x,y,z);m.add(b)};
 L(w-4,.4,0,h*.1);L(w-4,.4,0,-h*.38);L(.4,h*.3,0,h*.27);
 [[-.22,.27],[.22,.27],[-.2,-.13],[.2,-.13]].forEach(a=>{const n=new T.Mesh(new T.BoxGeometry(3,1.4,1),g);n.position.set(w*a[0],h*a[1],z+.4);m.add(n)})}
function stable(m){const {w,d,h}=m.userData;m.material.transparent=true;m.material.opacity=.1;const oak=mat(0x9a6a30),P=(bw,bh,bd,x,y,zz,c)=>{const b=new T.Mesh(new T.BoxGeometry(bw,bh,bd),c);b.position.set(x,y,zz);m.add(b)};
 P(w,2,d,0,h/2-1,0,oak);P(w*.42,.3,d-6,-w*.2,h/2+.1,0,mat(0x2a2a2c));P(w*.4,.3,d-6,w*.22,h/2+.1,0,mat(0xa8742e));
 [-1,1].forEach(a=>[-1,1].forEach(c=>P(3.4,h-2,3.4,a*(w/2-2),-1,c*(d/2-2),mat(0x8a5a28))));
 P(w-4,1.2,d-4,0,-h/2+5,0,mat(0xa8743a))}
function shelf(m,h){m.material.transparent=true;m.material.opacity=.18;const cols=[0x6d7b8a,0xe3e3dc,0xe8742a];
 for(let k=0;k<4;k++){const y=-h/2+k*12,b=new T.Mesh(new T.BoxGeometry(36,.6,14),mat(0x8a8f96));b.position.y=y+.3;m.add(b);
  [-11,0,11].forEach((x,j)=>{const t=new T.Mesh(new T.BoxGeometry(10,8,11),mat(cols[(j+k)%3]));t.position.set(x,y+4.6,0);m.add(t)})}}
// pill-shaped mirror with thin gold frame
function mirror(m){const {w,h}=m.userData;m.material.transparent=true;m.material.opacity=0;m.userData.quiet=true;
 const pill=(P,r,hh)=>{const a=hh/2-r;P.moveTo(-r,-a);P.lineTo(-r,a);P.absarc(0,a,r,Math.PI,0,true);P.lineTo(r,-a);P.absarc(0,-a,r,0,Math.PI,true);return P};
 const fr=pill(new T.Shape(),w/2,h);fr.holes.push(pill(new T.Path(),w/2-.9,h-1.8));
 const f=new T.Mesh(new T.ExtrudeGeometry(fr,{depth:1.2,bevelEnabled:false}),mat(0xc9a24a));f.position.set(0,h/2,.2);
 const g=new T.Mesh(new T.ShapeGeometry(pill(new T.Shape(),w/2-.9,h-1.8)),new T.MeshLambertMaterial({color:0xa9c2c8,emissive:0x203438}));g.position.set(0,h/2,1.1);const lg=new T.Group();lg.position.set(0,-h/2,2.7);lg.rotation.x=-.17;lg.add(f,g);m.add(lg)}
function runner(m){const {w,d}=m.userData;[-1,1].forEach(s=>{const b=new T.Mesh(new T.BoxGeometry(2,.15,d-6),mat(0xe9dcc0));b.position.set(s*(w/2-4),.3,0);m.add(b)})}
// 48 x 24 table with Form Studio 1 (14.2 x 13 x 19.8), VOC extractor (5.2 x 5.2 x 8.1), Wash+Cure (13 x 11.8 x 17.3)
function station(m,h){const P=(w,hh,d,x,z,c)=>{const b=new T.Mesh(new T.BoxGeometry(w,hh,d),mat(c));b.position.set(x,h/2+hh/2,z);m.add(b);return b};
 P(14.2,12,13,-15,0,0xdcdcd8);const lid=P(14.2,7.8,13,-15,0,0xe8742a);lid.position.y+=12;
 P(5.2,8.1,5.2,-3.5,5,0x2a2a2a);P(13,17.3,11.8,12,0,0xe6e6e2)}
function chk(m){const {w,d,h}=m.userData,r=m.rotation.y,c=Math.abs(Math.cos(r)),s=Math.abs(Math.sin(r)),
 hx=(w*c+d*s)/2,hz=(w*s+d*c)/2,x=m.position.x,z=m.position.z;
 if(x-hx<-.5||x+hx>W+.5||z-hz<-.5||z+hz>L+.5)return 'Outside the room';
 const e=Math.min(x-hx,W-(x+hx)),ch=e>=RUN?CH:KH+(CH-KH)*Math.max(e,0)/RUN;
 if(h>ch+.1)return 'Hits the sloped ceiling by '+(Math.round((h-ch)*10)/10)+' in (ceiling is '+Math.round(ch)+' in here)';
 for(const o of [[BW,W,HB,CZ,'Overlaps the cabinet block'],[SX,W,CZ,SZ,'Overlaps the stair wall'],[BW,SX,CZ,SZ,'Over the stairwell']])if(x+hx>o[0]&&x-hx<o[1]&&z+hz>o[2]&&z-hz<o[3])return o[4];
 return ''}
function selm(m){cur=m;items.forEach(i=>{const e=i.children[0];e.material.color.setHex(i==m?0xffd400:0x222222);e.visible=i==m||!i.userData.quiet});upd()}
function upd(){$('sel').hidden=!cur;if(!cur)return;const u=cur.userData,x=chk(cur);
 cur.material.emissive.setHex(x?0xaa0000:0);$('col').value='#'+cur.material.color.getHexString();
 $('nm').textContent=u.n;[['iw',u.w],['idd',u.d],['ih',u.h]].forEach(a=>{const i=$(a[0]);if(document.activeElement!==i)i.value=a[1]});$('msg').textContent=x}
function del(){if(!cur)return;save();sc.remove(cur);items.splice(items.indexOf(cur),1);cur=null;upd();renderList()}
$('rot').onclick=()=>{if(cur){save();cur.rotation.y+=Math.PI/2;upd()}};
$('del').onclick=del;
$('undo').onclick=undo;
function renderList(){const P=$('lst');if(P.hidden)return;P.innerHTML='';
 [['Show all',1],['Hide all',0]].forEach(a=>{const b=document.createElement('button');b.textContent=a[0];b.onclick=()=>{save();[...items,...decor].forEach(o=>o.visible=!!a[1]);if(!a[1])cur=null;upd();renderList()};P.appendChild(b)});
 [...items,...decor].forEach(o=>{const l=document.createElement('label'),c=document.createElement('input');c.type='checkbox';c.checked=o.visible;
  c.onchange=()=>{save();o.visible=c.checked;if(!c.checked&&o==cur){cur=null;upd()}};l.style.cssText='display:flex;gap:4px;align-items:center;white-space:nowrap';l.append(c,o.userData.n);P.appendChild(l)})}
$('lstb').onclick=()=>{$('lst').hidden=!$('lst').hidden;renderList()};
$('hid').onclick=()=>{if(cur){save();cur.visible=false;cur=null;upd();renderList()}};
$('ctr').onclick=()=>{if(cur){save();cur.position.x=71;upd()}};
$('col').oninput=e=>{if(!cur)return;if(!window._cs){save();window._cs=1}cur.material.color.set(e.target.value)};
$('col').onchange=()=>{window._cs=0};
$('wc').oninput=e=>walls.forEach(m=>m.material.color.set(e.target.value));
onkeydown=e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()=='z'){e.preventDefault();undo();return}if(e.target.tagName=='INPUT')return;if(e.key=='r'||e.key=='R')$('rot').click();if(e.key=='h'||e.key=='H')$('hid').click();if(e.key=='Delete'||e.key=='Backspace')del()};
Object.entries(GRP).forEach(([g,ns])=>{const s=document.createElement('span');s.className='gl';s.textContent=g;$('cat').appendChild(s);
 ns.forEach(n=>{const c=CAT.find(c=>c[0]==n),b=document.createElement('button');b.textContent=n;b.onclick=()=>add(c);$('cat').appendChild(b)})});
{const s=document.createElement('span');s.className='gl';s.textContent='Your own';$('cat').appendChild(s);
 const b=document.createElement('button');b.textContent='+ Custom size';b.onclick=()=>{$('cust').hidden=false;$('cn').select()};$('cat').appendChild(b)}
$('cx').onclick=()=>{$('cust').hidden=true};
$('cadd').onclick=()=>{const w=+$('cw').value,d=+$('cd').value,h=+$('chh').value,n=$('cn').value.trim()||'My find';
 if(!(w>=1&&d>=1&&h>=.5))return;const m=add([n,w,d,h,0x9a8a78]);m.position.y=h/2;$('cust').hidden=true;upd()};
$('cust').onkeydown=e=>{if(e.key=='Enter')$('cadd').click();if(e.key=='Escape')$('cx').click()};
['iw','idd','ih'].forEach(i=>{$(i).onchange=()=>resize(+$('iw').value,+$('idd').value,+$('ih').value);$(i).onkeydown=e=>{if(e.key=='Enter')e.target.blur()}});
{const b=add(CAT[1]);b.rotation.y=Math.PI/2;b.position.set(37.5,12,72);selm(null)}
{const s=add(CAT.find(c=>c[0]=='Printer station'));s.position.set(71,15,384);selm(null)}
{const f=n=>add(CAT.find(c=>c[0]==n));
 const r=f('Rug 6x6');r.position.set(61.5,.3,72);
 const ns=f('Nightstand');ns.rotation.y=Math.PI/2;ns.position.set(8.5,11.5,115);
 const dr=f('Dresser');dr.rotation.y=-Math.PI/2;dr.position.set(133,16,50);
 f('Plant').position.set(10,7,10);
 f('Floor mat').position.set(71,.15,374);
 const ch=f('Armchair');ch.rotation.y=Math.PI/2;ch.position.set(18,9,240);
 const st=f('Side table');st.rotation.y=Math.PI/2;st.position.set(12,10,270);
 f('Floor lamp').position.set(10,.6,293);
 f('Woven basket').position.set(133.5,7.5,146.5);
 f('Wire shelf').position.set(121,24,383);
 const mr=f('Big mirror');mr.rotation.y=-Math.PI/2;mr.position.set(138.5,18,103);
 f('Hall runner').position.set(54.5,.25,225)}
// static cozy decor, toggled from the Items list
const dec=(n,g)=>{g.userData.n=n;sc.add(g);decor.push(g)};
{const g=new T.Group(),pts=[],bm=new T.MeshBasicMaterial({color:0xffd27a});
 for(let i=0;i<=24;i++){const u=i/24,x=5.5,y=KH+(CH-KH)*x/RUN-2.2-3.5*Math.abs(Math.sin(u*3*Math.PI)),z=10+u*138;pts.push(new T.Vector3(x+1.2,y,z));
  if(i%2){const s=new T.Mesh(new T.SphereGeometry(.8,8,6),bm);s.position.set(x+1.2,y-.8,z);g.add(s)}}
 g.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:0x3a2e26})));dec('String lights',g)}
{const g=new T.Group(),cm=mat(0xa4532f),z=L-3.5,rod=new T.Mesh(new T.CylinderGeometry(.5,.5,84,8),mat(0x3a2e26));
 rod.rotation.z=Math.PI/2;rod.position.set(71,74,z);g.add(rod);
 [38,104].forEach(x=>{const p=new T.Mesh(new T.BoxGeometry(16,60,2.5),cm);p.position.set(x,44,z);g.add(p);
  for(let k=-1;k<=1;k++){const f=new T.Mesh(new T.BoxGeometry(.6,60,2.9),mat(0x8c4325));f.position.set(x+k*5,44,z);g.add(f)}});dec('Curtains',g)}
{const g=new T.Group(),fr=new T.Mesh(new T.BoxGeometry(16,20,1),mat(0xc9a46a)),mt=new T.Mesh(new T.BoxGeometry(14.6,18.6,.4),mat(0xf1efe8)),
 lf=new T.Mesh(new T.PlaneGeometry(12.6,16.6),new T.MeshLambertMaterial({map:leafTex()}));
 fr.position.set(38,55,1.1);mt.position.set(38,55,1.5);lf.position.set(38,55,1.75);g.add(fr,mt,lf);dec('Leaf picture',g)}
{const g=new T.Group();[[71,CH-6,60],[71,CH-10,330]].forEach(p=>{const l=new T.PointLight(0xffb86b,.5,240);l.position.set(...p);g.add(l)});dec('Warm bulb glow',g)}
selm(null);hist.length=0;renderList();
// camera and pointer controls
const ray=new T.Raycaster(),pl=new T.Plane(new T.Vector3(0,1,0),0),v3=new T.Vector3(),off=[0,0],ps=new Map();
let th=.7,ph=1,dist=520,tg=new T.Vector3(W/2,30,L/2),drag=null,pd=0;
const V={orbit:[.7,1,520,[71,30,198]],plan:[0,.02,560,[71,0,198]],stairs:[0,1.45,70,[71,50,300]],bed:[Math.PI,1.45,170,[71,50,230]],stair:[1.25,1.2,300,[96,-45,245]]};
// walk mode: a person at eye height who cannot pass walls, the stair block, furniture or a ceiling below their eyes
let walk=false,yaw=0,pitch=-.08,eye=64,last=performance.now();const me={x:40,z:330};
const ceilAt=x=>{const e=Math.min(x,W-x);return e>=RUN?CH:KH+(CH-KH)*Math.max(e,0)/RUN};
const floorAt=(x,z)=>x<=BW||z>=SZ?0:z>=Z1?LOW+SR*(Math.floor((z-Z1)/ST)+1):LOW;
function inStair(x,z,r){return z<SZ+2&&z>DZ-50&&(z>=DZ+2?x>SX0+r&&x<SX1-r:z>=DZ-4?x>SXC-DW/2+r-2&&x<SXC+DW/2-r+2:z>HB&&x>BW+r&&x<SXC+40)}
function ceilHere(x,z){return z<DZ?LCH:z<CZ?BOXY:ceilAt(x)}
function blocked(x,z){const r=7;
 if(inStair(x,z,5))return floorAt(x,z)+eye+2>ceilHere(x,z)||(Math.abs(z-DZ)<3&&floorAt(x,z)+eye+2>LOW+DH);
 if(x<r||x>W-r||z<r||z>L-r)return 1;if(x>BW-r&&z>HB-r&&z<SZ+r&&!(z>=SZ&&x>SX0+5&&x<SX1-5))return 1;if(ceilAt(x)<eye+2)return 1;
 for(const m of items){if(!m.visible||m.userData.h<8)continue;const {w,d}=m.userData,c=Math.abs(Math.cos(m.rotation.y)),s=Math.abs(Math.sin(m.rotation.y)),
  hx=(w*c+d*s)/2+r-2,hz=(w*s+d*c)/2+r-2;if(Math.abs(x-m.position.x)<hx&&Math.abs(z-m.position.z)<hz)return 1}return 0}
let camY=null;
function step(dx,dz){if(!blocked(me.x+dx,me.z))me.x+=dx;if(!blocked(me.x,me.z+dz))me.z+=dz}
const ftin=v=>{v=Math.round(v);return Math.floor(v/12)+' ft '+(v%12)+' in'};let hrTxt='';
function setView(k){document.querySelectorAll('#views button').forEach(b=>b.classList.toggle('on',(b.dataset.v||'walk')==k));
 walk=k=='walk';$('wbar').hidden=!walk;['mv','zi','zo'].forEach(i=>$(i).hidden=walk);cam.fov=walk?72:50;cam.near=walk?.5:1;cam.updateProjectionMatrix();
 if(walk){if(blocked(me.x,me.z)){me.x=40;me.z=330}}else{const v=V[k];th=v[0];ph=v[1];dist=v[2];tg.set(...v[3])}}
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>setView(b.dataset.v));
$('wk').onclick=()=>setView('walk');
// will a piece make it up the stairs: one side across the 29 in doorway (33 in at the rail),
// another straight up from the slope under the door header and the wood box (PERP), the third along the stairs
function fit(){const w=+$('fw').value,d=+$('fd').value,h=+$('fh').value-(+$('fl').value||0),o=$('fo');
 if(!(w>0&&d>0&&h>0)){o.textContent='Enter the size in inches.';return}
 const D=[['width',w],['depth',d],['height',h]],M=.5,A=DW-M,P=PERP-M;let best=null;
 for(const a of D)for(const b of D)if(a!==b&&a[1]<=A&&b[1]<=P){const sp=Math.min(A-a[1],P-b[1]);if(!best||sp>best.sp)best={a,b,sp}}
 const lim='Limits: '+DW+' in doorway, and about '+Math.floor(PERP)+' in of room straight up from the steps where the wood box hangs over them.';
 if(best){o.className='ok';o.innerHTML='<b>Fits.</b> Turn it so its '+best.a[0]+' ('+best.a[1]+' in) goes across the doorway. Tightest spot has about '+(Math.floor((best.sp+M)*2)/2)+' in to spare.<br><small>'+lim+'</small>'}
 else{const mn=Math.min(w,d,h),mid=[w,d,h].sort((x,y)=>x-y)[1];o.className='no';
  o.innerHTML='<b>Will not fit.</b> '+(mn>A?'Its smallest side is '+mn+' in, '+(Math.ceil((mn-DW)*2)/2)+' in too wide for the doorway. Taking the door off its hinges may gain about 1.5 in, and so can removing legs.':'Its '+mid+' in side is too tall for the slope, by about '+(Math.ceil((mid-PERP)*2)/2)+' in.')+'<br><small>'+lim+'</small>'}}
['fw','fd','fh','fl'].forEach(i=>$(i).oninput=fit);
$('fsel').onclick=()=>{if(!cur)return;const u=cur.userData;$('fw').value=u.w;$('fd').value=u.d;$('fh').value=u.h;fit()};
$('fitb').onclick=()=>{$('fit').hidden=!$('fit').hidden;$('fitb').classList.toggle('on',!$('fit').hidden);if(!$('fit').hidden)fit()};
$('fx').onclick=()=>$('fitb').click();
$('fup').onclick=()=>{me.x=SXC;me.z=DZ-30;yaw=Math.PI;pitch=.15;camY=null;setView('walk')};$('wx').onclick=()=>setView('orbit');
$('eye').onchange=()=>{const v=+$('eye').value;if(v>=30&&v<=80){eye=v;if(blocked(me.x,me.z)){me.x=40;me.z=330}}};
$('eye').onkeydown=e=>{if(e.key=='Enter')e.target.blur()};
$('hlp').onclick=()=>{$('help').hidden=!$('help').hidden;$('hlp').classList.toggle('on',!$('help').hidden)};
document.querySelectorAll('.ov').forEach(o=>['pointerdown','dblclick','wheel'].forEach(t=>o.addEventListener(t,e=>e.stopPropagation())));
function ndc(e){const r=el.getBoundingClientRect();ray.setFromCamera({x:(e.clientX-r.left)/r.width*2-1,y:-((e.clientY-r.top)/r.height)*2+1},cam)}
function flr(e){ndc(e);return ray.ray.intersectPlane(pl,v3)}
function hit(e){ndc(e);const h=ray.intersectObjects(items.filter(i=>i.visible),false)[0];return h&&h.object}
function pdist(){const a=[...ps.values()];return Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])}
function cen(){const a=[...ps.values()];return[(a[0][0]+a[1][0])/2,(a[0][1]+a[1][1])/2]}
let panMode=false,panning=false,pc=null;const ks=new Set();
function clampT(){tg.x=Math.min(W,Math.max(0,tg.x));tg.z=Math.min(L,Math.max(0,tg.z))}
function panView(dx,dy){const s=dist*.0014,r=[Math.cos(th),-Math.sin(th)],f=[-Math.sin(th),-Math.cos(th)];tg.x+=-r[0]*dx*s+f[0]*dy*s;tg.z+=-r[1]*dx*s+f[1]*dy*s;clampT()}
$('mv').onclick=()=>{panMode=!panMode;$('mv').classList.toggle('on',panMode)};
$('zi').onclick=()=>{dist=Math.max(40,dist*.8)};$('zo').onclick=()=>{dist=Math.min(900,dist*1.25)};
document.querySelectorAll('[data-k]').forEach(b=>{b.onpointerdown=()=>ks.add(b.dataset.k);b.onpointerup=b.onpointerleave=b.onpointercancel=()=>ks.delete(b.dataset.k)});
addEventListener('keydown',e=>{if(e.target.tagName=='INPUT'||e.metaKey||e.ctrlKey)return;const k=e.key.length==1?e.key.toLowerCase():e.key;
 const m={w:'ArrowUp',s:'ArrowDown',a:'ArrowLeft',d:'ArrowRight'}[k]||k;if(/^Arrow/.test(m)){ks.add(m);e.preventDefault()}});
addEventListener('keyup',e=>{const k=e.key.length==1?e.key.toLowerCase():e.key;ks.delete({w:'ArrowUp',s:'ArrowDown',a:'ArrowLeft',d:'ArrowRight'}[k]||k)});
el.oncontextmenu=e=>e.preventDefault();
let measure=false,mdn=null,mA=null,mS=[];const mg=new T.Group();sc.add(mg);
const ml=document.createElement('div');ml.style.cssText='position:fixed;left:0;top:0;pointer-events:none;z-index:5';document.body.appendChild(ml);
function mk(p){const s=new T.Mesh(new T.SphereGeometry(.9,10,8),new T.MeshBasicMaterial({color:0xff3b30,depthTest:false}));s.position.copy(p);s.renderOrder=999;mg.add(s);return s}
const mvis=o=>{for(;o;o=o.parent)if(o.visible===false)return false;return true};
function mPick(e){ndc(e);const h=ray.intersectObjects(sc.children,true).find(h=>{const o=h.object;if(o.isLine||o.isPoints||!mvis(o))return false;for(let q=o;q;q=q.parent)if(q===mg)return false;const m=o.material;return !(m&&(m.opacity<.15||m.visible===false))});
 if(!h)return null;let p=h.point.clone(),o=h.object;while(o.parent&&o.parent!==sc)o=o.parent;
 if(items.includes(o)){const b=new T.Box3().setFromObject(o),n=b.min,x=b.max;let best=3.5;[n.x,x.x].forEach(a=>[n.y,x.y].forEach(c=>[n.z,x.z].forEach(d=>{const v=new T.Vector3(a,c,d),k=v.distanceTo(p);if(k<best){best=k;p=v}})))}
 return p}
function mPoint(e){const p=mPick(e);if(!p)return;if(!mA){mA={p,m:mk(p)};return}
 const a=mA.p,d=a.distanceTo(p),ln=new T.Line(new T.BufferGeometry().setFromPoints([a,p]),new T.LineBasicMaterial({color:0xff3b30,depthTest:false}));ln.renderOrder=998;mg.add(ln);const m2=mk(p),lb=document.createElement('div');
 lb.style.cssText='position:absolute;transform:translate(-50%,-130%);background:#fff;color:#111;border:1px solid #ff3b30;border-radius:6px;padding:2px 6px;font:12px system-ui;white-space:nowrap;text-align:center';
 const f=Math.floor(d/12),r=d-f*12,dx=Math.abs(p.x-a.x),dz=Math.abs(p.z-a.z),dy=Math.abs(p.y-a.y);
 lb.innerHTML='<b>'+d.toFixed(1)+' in</b> ('+(f?f+' ft ':'')+r.toFixed(1)+' in)<br><small>across '+dx.toFixed(1)+' | along '+dz.toFixed(1)+' | up '+dy.toFixed(1)+'</small>';
 ml.appendChild(lb);mS.push({a:mA.m,b:m2,ln,lb,mid:a.clone().add(p).multiplyScalar(.5)});mA=null;$('mc').hidden=false}
function mClear(){mS.forEach(s=>{mg.remove(s.a,s.b,s.ln);s.lb.remove()});mS=[];if(mA){mg.remove(mA.m);mA=null}$('mc').hidden=true}
function mLabels(){const r=el.getBoundingClientRect();mS.forEach(s=>{const v=s.mid.clone().project(cam),ok=v.z<1&&Math.abs(v.x)<1.1&&Math.abs(v.y)<1.1;s.lb.style.display=ok?'':'none';if(ok){s.lb.style.left=(r.left+(v.x+1)/2*r.width)+'px';s.lb.style.top=(r.top+(1-v.y)/2*r.height)+'px'}})}
$('ms').onclick=()=>{measure=!measure;$('ms').classList.toggle('on',measure);el.style.cursor=measure?'crosshair':'';if(!measure&&mA){mg.remove(mA.m);mA=null}};
$('mc').onclick=mClear;
addEventListener('keydown',e=>{if(e.key=='Escape'&&measure)$('ms').click()});
el.ondblclick=e=>{if(hit(e))return;const p=flr(e);if(!p)return;if(walk){if(!blocked(p.x,p.z)){me.x=p.x;me.z=p.z}}else{tg.x=p.x;tg.z=p.z;clampT()}};
el.onpointerdown=e=>{el.setPointerCapture(e.pointerId);ps.set(e.pointerId,[e.clientX,e.clientY]);
 if(ps.size>1){drag=null;panning=false;pd=pdist();pc=cen();return}
 if(!walk&&(e.button==2||e.button==1||e.shiftKey||panMode)){drag=null;panning=true;return}
 if(measure){mdn=[e.clientX,e.clientY];drag=null;return}
 drag=hit(e);if(drag){save();selm(drag);const p=flr(e);if(p){off[0]=drag.position.x-p.x;off[1]=drag.position.z-p.z}}};
el.onpointermove=e=>{const o=ps.get(e.pointerId);if(!o)return;const dx=e.clientX-o[0],dy=e.clientY-o[1];ps.set(e.pointerId,[e.clientX,e.clientY]);
 if(ps.size>1){const d=pdist();if(pd)dist=Math.min(900,Math.max(40,dist*pd/d));pd=d;const c=cen();if(pc)panView(c[0]-pc[0],c[1]-pc[1]);pc=c}
 else if(panning)panView(dx,dy);
 else if(drag){const p=flr(e);if(p){drag.position.x=Math.round(p.x+off[0]);drag.position.z=Math.round(p.z+off[1]);upd()}}
 else if(walk){yaw+=dx*.004;pitch=Math.min(1.3,Math.max(-1.3,pitch+dy*.004))}
 else{th-=dx*.006;ph=Math.min(1.5,Math.max(.02,ph-dy*.006))}};
el.onpointerup=el.onpointercancel=e=>{if(e.type=='pointerup'&&measure&&mdn&&ps.size==1&&Math.hypot(e.clientX-mdn[0],e.clientY-mdn[1])<6)mPoint(e);mdn=null;ps.delete(e.pointerId);pd=0;pc=null;drag=null;panning=false};
el.onwheel=e=>{e.preventDefault();if(walk){const k=-Math.sign(e.deltaY)*6;step(-Math.sin(yaw)*k,-Math.cos(yaw)*k);return}dist=Math.min(900,Math.max(40,dist*(1+e.deltaY*.001)))};
new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;ren.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}).observe(el);
(function f(){const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;mLabels();
 if(walk){const a=(ks.has('ArrowRight')?1:0)-(ks.has('ArrowLeft')?1:0),b=(ks.has('ArrowUp')?1:0)-(ks.has('ArrowDown')?1:0);
  yaw-=a*1.7*dt;if(b){const v=b*40*dt;step(-Math.sin(yaw)*v,-Math.cos(yaw)*v)}
  const ty=floorAt(me.x,me.z)+eye;camY=camY==null?ty:camY+(ty-camY)*Math.min(1,dt*10);
  cam.position.set(me.x,camY,me.z);cam.lookAt(me.x-Math.sin(yaw)*Math.cos(pitch),camY+Math.sin(pitch),me.z-Math.cos(yaw)*Math.cos(pitch));
  const c=ceilHere(me.x,me.z)-floorAt(me.x,me.z),low=c<eye+5,t='Ceiling here: '+ftin(c)+(low?'. Your head would touch it.':'');
  if(t!==hrTxt){hrTxt=t;$('hr').textContent=t;$('hr').classList.toggle('low',low)}}
 else{if(ks.size){const v=dist*.012,r=[Math.cos(th),-Math.sin(th)],fw=[-Math.sin(th),-Math.cos(th)],a=(ks.has('ArrowRight')?1:0)-(ks.has('ArrowLeft')?1:0),b=(ks.has('ArrowUp')?1:0)-(ks.has('ArrowDown')?1:0);
  tg.x+=(r[0]*a+fw[0]*b)*v*.2;tg.z+=(r[1]*a+fw[1]*b)*v*.2;clampT()}
 cam.position.set(tg.x+dist*Math.sin(ph)*Math.sin(th),tg.y+dist*Math.cos(ph),tg.z+dist*Math.sin(ph)*Math.cos(th));
 cam.lookAt(tg)}
 {const p=cam.position,inside=walk||(p.x>-1&&p.x<W+1&&p.z>-1&&p.z<L+1&&p.y<CH+2);if(shaft[0].visible!==inside)shaft.forEach(o=>o.visible=inside)}
 ren.render(sc,cam);requestAnimationFrame(f)})();
