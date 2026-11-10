var IS=Object.defineProperty;var LS=(n,i,a)=>i in n?IS(n,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[i]=a;var mn=(n,i,a)=>LS(n,typeof i!="symbol"?i+"":i,a);import{c as Zm,N as Yr,S as zo,V as jn,C as Zt,F as wf,M as za,a as yt,R as Rf,w as Dc,W as Uc,b as Dr,d as vn,L as Fa,H as On,U as xr,D as dr,B as hr,e as Ga,f as oi,p as DS,E as Qm,g as Hn,P as Ba,A as Jm,h as Ks,i as Wn,j as Do,k as El,l as Va,m as Ji,n as Af,o as US,q as ji,r as Uo,s as ev,t as tv,u as Na,O as nv,v as rv,x as iv,y as av,z as ov,G as sv,I as lv,J as uv,K as cv,Q as fv,T as dv,X as pv,Y as hv,Z as mv,_ as vv,$ as gv,a0 as Xr,a1 as _v,a2 as Zs,a3 as Bn,a4 as To,a5 as Sv,a6 as ka,a7 as Ev,a8 as bv,a9 as Mv,aa as Tv,ab as Cf,ac as xv,ad as yv,ae as wv,af as Rv,ag as kt,ah as Pf,ai as Av,aj as Cv,ak as nr,al as If,am as wo,an as pr,ao as bl,ap as ai,aq as Ir,ar as No,as as Lf,at as Df,au as Uf,av as qa,aw as Pv,ax as Iv,ay as Nf,az as Ff,aA as Ml,aB as kn,aC as Lv,aD as Dv,aE as Of,aF as Bf,aG as Uv,aH as kf,aI as Hf,aJ as Qs,aK as Js,aL as el,aM as tl,aN as nn,aO as Nc,aP as Fc,aQ as Oc,aR as Bc,aS as kc,aT as Hc,aU as zc,aV as Gc,aW as Vc,aX as Wc,aY as Xc,aZ as qc,a_ as Yc,a$ as jc,b0 as $c,b1 as Kc,b2 as Zc,b3 as Qc,b4 as Jc,b5 as ef,b6 as tf,b7 as nf,b8 as rf,b9 as af,ba as of,bb as sf,bc as lf,bd as uf,be as il,bf as al,bg as ol,bh as sl,bi as ll,bj as ul,bk as cl,bl as Nv,bm as cf,bn as Fv,bo as Ro,bp as Ov,bq as ff,br as df,bs as fl,bt as Fo,bu as dl,bv as zf,bw as Gf,bx as Bv,by as Go,bz as kv,bA as Hv,bB as zv,bC as Vf,bD as tm,bE as Wf,bF as nm,bG as Xf,bH as ea,bI as ta,bJ as Tl,bK as qf,bL as Gv,bM as Vv,bN as NS,bO as pf,bP as tr,bQ as pl,bR as Ao,bS as Wv,bT as Xv,bU as qv,bV as Yf,bW as Yv,bX as jv,bY as $v,bZ as Kv,b_ as Zv,b$ as yi,c0 as FS,c1 as Qv,c2 as Jv,c3 as eg,c4 as tg,c5 as ng,c6 as OS,c7 as BS,c8 as kS,c9 as HS,ca as zS,cb as GS,cc as VS,cd as WS,ce as XS,cf as qS,cg as YS,ch as jS,ci as $S,cj as KS,ck as ZS,cl as QS,cm as JS,cn as eE,co as tE,cp as rg,cq as nE,cr as rE,cs as iE,ct as aE,cu as oE,cv as sE,cw as lE,cx as uE,cy as cE,cz as fE,cA as dE,cB as pE,cC as hE,cD as mE,cE as vE,cF as ig,cG as gE,cH as _E,cI as SE,cJ as EE,cK as bE,cL as ME,cM as TE,cN as xE,cO as ag,cP as yE,cQ as wE,cR as RE,cS as AE,cT as CE,cU as PE,cV as IE,cW as LE,cX as og,cY as jf,cZ as Ki,c_ as DE,c$ as UE,d0 as NE,d1 as FE,d2 as OE,d3 as BE,d4 as kE,d5 as HE,d6 as zE,d7 as GE,d8 as VE,d9 as WE,da as XE,db as qE,dc as hf,dd as Co,de as YE,df as jE,dg as $E,dh as KE,di as ZE,dj as QE,dk as JE,dl as eb,dm as tb,dn as nb,dp as rb,dq as ib,dr as ab,ds as ob,dt as sg,du as sb,dv as lb,dw as ub,dx as cb,dy as fb,dz as db,dA as pb,dB as hb,dC as mb,dD as vb,dE as gb,dF as _b,dG as Sb,dH as Eb,dI as bb,dJ as Mb,dK as Tb,dL as xb,dM as yb,dN as wb,dO as Rb,dP as Ab,dQ as Cb,dR as Pb,dS as Ib,dT as Lb,dU as Db,dV as Ub,dW as Nb,dX as Fb,dY as Ob,dZ as Bb,d_ as kb,d$ as Hb,e0 as zb,e1 as Gb,e2 as Vb,e3 as Wb,e4 as mf,e5 as Xb,e6 as lg,e7 as qb,e8 as ug,e9 as Yb,ea as jb,eb as $b,ec as Kb,ed as Zb,ee as Qb,ef as Jb,eg as eM,eh as tM,ei as nM,ej as rM,ek as iM,el as vf,em as qi,en as aM,eo as oM,ep as sM,eq as lM,er as uM,es as cM,et as fM,eu as dM,ev as pM,ew as hM,ex as mM,ey as vM,ez as gM,eA as _M,eB as SM,eC as EM,eD as bM,eE as MM,eF as TM,eG as xM,eH as yM,eI as wM,eJ as RM,eK as AM,eL as CM,eM as PM,eN as IM,eO as LM,eP as DM,eQ as UM,eR as NM,eS as $f,eT as FM,eU as OM,eV as BM,eW as kM,eX as HM,eY as xl,eZ as zM,e_ as GM,e$ as VM,f0 as WM,f1 as XM,f2 as qM,f3 as YM,f4 as jM,f5 as $M,f6 as KM,f7 as ZM,f8 as QM,f9 as JM,fa as eT,fb as tT,fc as nT,fd as rT,fe as iT,ff as aT,fg as oT,fh as sT,fi as lT,fj as uT,fk as cT,fl as fT,fm as dT,fn as pT,fo as hT,fp as mT,fq as vT,fr as gT,fs as _T,ft as ST,fu as ET,fv as bT,fw as MT,fx as TT,fy as xT,fz as yT,fA as Oo,fB as wT,fC as RT,fD as AT,fE as CT,fF as PT,fG as IT,fH as LT,fI as DT,fJ as UT,fK as NT,fL as FT,fM as OT,fN as BT,fO as kT,fP as HT,fQ as cg,fR as fg,fS as rn,fT as zT,fU as Se,fV as ze,fW as GT,fX as VT,fY as WT}from"./index-tvaDkAjx.js";function dg(){let n=null,i=!1,a=null,s=null;function u(f,h){a(f,h),s=n.requestAnimationFrame(u)}return{start:function(){i!==!0&&a!==null&&(s=n.requestAnimationFrame(u),i=!0)},stop:function(){n.cancelAnimationFrame(s),i=!1},setAnimationLoop:function(f){a=f},setContext:function(f){n=f}}}function XT(n){const i=new WeakMap;function a(p,m){const E=p.array,y=p.usage,x=E.byteLength,R=n.createBuffer();n.bindBuffer(m,R),n.bufferData(m,E,y),p.onUploadCallback();let w;if(E instanceof Float32Array)w=n.FLOAT;else if(typeof Float16Array<"u"&&E instanceof Float16Array)w=n.HALF_FLOAT;else if(E instanceof Uint16Array)p.isFloat16BufferAttribute?w=n.HALF_FLOAT:w=n.UNSIGNED_SHORT;else if(E instanceof Int16Array)w=n.SHORT;else if(E instanceof Uint32Array)w=n.UNSIGNED_INT;else if(E instanceof Int32Array)w=n.INT;else if(E instanceof Int8Array)w=n.BYTE;else if(E instanceof Uint8Array)w=n.UNSIGNED_BYTE;else if(E instanceof Uint8ClampedArray)w=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+E);return{buffer:R,type:w,bytesPerElement:E.BYTES_PER_ELEMENT,version:p.version,size:x}}function s(p,m,E){const y=m.array,x=m.updateRanges;if(n.bindBuffer(E,p),x.length===0)n.bufferSubData(E,0,y);else{x.sort((w,F)=>w.start-F.start);let R=0;for(let w=1;w<x.length;w++){const F=x[R],O=x[w];O.start<=F.start+F.count+1?F.count=Math.max(F.count,O.start+O.count-F.start):(++R,x[R]=O)}x.length=R+1;for(let w=0,F=x.length;w<F;w++){const O=x[w];n.bufferSubData(E,O.start*y.BYTES_PER_ELEMENT,y,O.start,O.count)}m.clearUpdateRanges()}m.onUploadCallback()}function u(p){return p.isInterleavedBufferAttribute&&(p=p.data),i.get(p)}function f(p){p.isInterleavedBufferAttribute&&(p=p.data);const m=i.get(p);m&&(n.deleteBuffer(m.buffer),i.delete(p))}function h(p,m){if(p.isInterleavedBufferAttribute&&(p=p.data),p.isGLBufferAttribute){const y=i.get(p);(!y||y.version<p.version)&&i.set(p,{buffer:p.buffer,type:p.type,bytesPerElement:p.elementSize,version:p.version});return}const E=i.get(p);if(E===void 0)i.set(p,a(p,m));else if(E.version<p.version){if(E.size!==p.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(E.buffer,p,m),E.version=p.version}}return{get:u,remove:f,update:h}}var qT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,YT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,jT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$T=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ZT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,QT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,JT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ex=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,tx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ix=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ax=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ox=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,sx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,px=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,hx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,mx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,gx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,_x=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ex=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ax=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Cx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Px=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ix=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ux=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ox=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Bx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Wx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$x=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ey=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ty=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ny=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ry=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ay=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,oy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ly=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,py=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,my=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_y=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ey=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,by=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,My=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ty=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ry=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ay=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Py=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Iy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ly=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ny=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Oy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,By=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ky=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$y=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ky=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Jy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ew=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,tw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ow=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sw=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vw=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_w=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ew=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tt={alphahash_fragment:qT,alphahash_pars_fragment:YT,alphamap_fragment:jT,alphamap_pars_fragment:$T,alphatest_fragment:KT,alphatest_pars_fragment:ZT,aomap_fragment:QT,aomap_pars_fragment:JT,batching_pars_vertex:ex,batching_vertex:tx,begin_vertex:nx,beginnormal_vertex:rx,bsdfs:ix,iridescence_fragment:ax,bumpmap_pars_fragment:ox,clipping_planes_fragment:sx,clipping_planes_pars_fragment:lx,clipping_planes_pars_vertex:ux,clipping_planes_vertex:cx,color_fragment:fx,color_pars_fragment:dx,color_pars_vertex:px,color_vertex:hx,common:mx,cube_uv_reflection_fragment:vx,defaultnormal_vertex:gx,displacementmap_pars_vertex:_x,displacementmap_vertex:Sx,emissivemap_fragment:Ex,emissivemap_pars_fragment:bx,colorspace_fragment:Mx,colorspace_pars_fragment:Tx,envmap_fragment:xx,envmap_common_pars_fragment:yx,envmap_pars_fragment:wx,envmap_pars_vertex:Rx,envmap_physical_pars_fragment:Bx,envmap_vertex:Ax,fog_vertex:Cx,fog_pars_vertex:Px,fog_fragment:Ix,fog_pars_fragment:Lx,gradientmap_pars_fragment:Dx,lightmap_pars_fragment:Ux,lights_lambert_fragment:Nx,lights_lambert_pars_fragment:Fx,lights_pars_begin:Ox,lights_toon_fragment:kx,lights_toon_pars_fragment:Hx,lights_phong_fragment:zx,lights_phong_pars_fragment:Gx,lights_physical_fragment:Vx,lights_physical_pars_fragment:Wx,lights_fragment_begin:Xx,lights_fragment_maps:qx,lights_fragment_end:Yx,logdepthbuf_fragment:jx,logdepthbuf_pars_fragment:$x,logdepthbuf_pars_vertex:Kx,logdepthbuf_vertex:Zx,map_fragment:Qx,map_pars_fragment:Jx,map_particle_fragment:ey,map_particle_pars_fragment:ty,metalnessmap_fragment:ny,metalnessmap_pars_fragment:ry,morphinstance_vertex:iy,morphcolor_vertex:ay,morphnormal_vertex:oy,morphtarget_pars_vertex:sy,morphtarget_vertex:ly,normal_fragment_begin:uy,normal_fragment_maps:cy,normal_pars_fragment:fy,normal_pars_vertex:dy,normal_vertex:py,normalmap_pars_fragment:hy,clearcoat_normal_fragment_begin:my,clearcoat_normal_fragment_maps:vy,clearcoat_pars_fragment:gy,iridescence_pars_fragment:_y,opaque_fragment:Sy,packing:Ey,premultiplied_alpha_fragment:by,project_vertex:My,dithering_fragment:Ty,dithering_pars_fragment:xy,roughnessmap_fragment:yy,roughnessmap_pars_fragment:wy,shadowmap_pars_fragment:Ry,shadowmap_pars_vertex:Ay,shadowmap_vertex:Cy,shadowmask_pars_fragment:Py,skinbase_vertex:Iy,skinning_pars_vertex:Ly,skinning_vertex:Dy,skinnormal_vertex:Uy,specularmap_fragment:Ny,specularmap_pars_fragment:Fy,tonemapping_fragment:Oy,tonemapping_pars_fragment:By,transmission_fragment:ky,transmission_pars_fragment:Hy,uv_pars_fragment:zy,uv_pars_vertex:Gy,uv_vertex:Vy,worldpos_vertex:Wy,background_vert:Xy,background_frag:qy,backgroundCube_vert:Yy,backgroundCube_frag:jy,cube_vert:$y,cube_frag:Ky,depth_vert:Zy,depth_frag:Qy,distanceRGBA_vert:Jy,distanceRGBA_frag:ew,equirect_vert:tw,equirect_frag:nw,linedashed_vert:rw,linedashed_frag:iw,meshbasic_vert:aw,meshbasic_frag:ow,meshlambert_vert:sw,meshlambert_frag:lw,meshmatcap_vert:uw,meshmatcap_frag:cw,meshnormal_vert:fw,meshnormal_frag:dw,meshphong_vert:pw,meshphong_frag:hw,meshphysical_vert:mw,meshphysical_frag:vw,meshtoon_vert:gw,meshtoon_frag:_w,points_vert:Sw,points_frag:Ew,shadow_vert:bw,shadow_frag:Mw,sprite_vert:Tw,sprite_frag:xw},ke={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Hn(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new Hn(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},Lr={basic:{uniforms:tr([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:Tt.meshbasic_vert,fragmentShader:Tt.meshbasic_frag},lambert:{uniforms:tr([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Tt.meshlambert_vert,fragmentShader:Tt.meshlambert_frag},phong:{uniforms:tr([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:Tt.meshphong_vert,fragmentShader:Tt.meshphong_frag},standard:{uniforms:tr([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Tt.meshphysical_vert,fragmentShader:Tt.meshphysical_frag},toon:{uniforms:tr([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Tt.meshtoon_vert,fragmentShader:Tt.meshtoon_frag},matcap:{uniforms:tr([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:Tt.meshmatcap_vert,fragmentShader:Tt.meshmatcap_frag},points:{uniforms:tr([ke.points,ke.fog]),vertexShader:Tt.points_vert,fragmentShader:Tt.points_frag},dashed:{uniforms:tr([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Tt.linedashed_vert,fragmentShader:Tt.linedashed_frag},depth:{uniforms:tr([ke.common,ke.displacementmap]),vertexShader:Tt.depth_vert,fragmentShader:Tt.depth_frag},normal:{uniforms:tr([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:Tt.meshnormal_vert,fragmentShader:Tt.meshnormal_frag},sprite:{uniforms:tr([ke.sprite,ke.fog]),vertexShader:Tt.sprite_vert,fragmentShader:Tt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Tt.background_vert,fragmentShader:Tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Tt.backgroundCube_vert,fragmentShader:Tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Tt.cube_vert,fragmentShader:Tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Tt.equirect_vert,fragmentShader:Tt.equirect_frag},distanceRGBA:{uniforms:tr([ke.common,ke.displacementmap,{referencePosition:{value:new yt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Tt.distanceRGBA_vert,fragmentShader:Tt.distanceRGBA_frag},shadow:{uniforms:tr([ke.lights,ke.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Tt.shadow_vert,fragmentShader:Tt.shadow_frag}};Lr.physical={uniforms:tr([Lr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Hn(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Hn},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Hn},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Tt.meshphysical_vert,fragmentShader:Tt.meshphysical_frag};const Vs={r:0,b:0,g:0},Wi=new Wf,yw=new za;function ww(n,i,a,s,u,f,h){const p=new Zt(0);let m=f===!0?0:1,E,y,x=null,R=0,w=null;function F(N){let P=N.isScene===!0?N.background:null;return P&&P.isTexture&&(P=(N.backgroundBlurriness>0?a:i).get(P)),P}function O(N){let P=!1;const q=F(N);q===null?d(p,m):q&&q.isColor&&(d(q,1),P=!0);const D=n.xr.getEnvironmentBlendMode();D==="additive"?s.buffers.color.setClear(0,0,0,1,h):D==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(n.autoClear||P)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(N,P){const q=F(P);q&&(q.isCubeTexture||q.mapping===Go)?(y===void 0&&(y=new pr(new Vf(1,1,1),new nr({name:"BackgroundCubeMaterial",uniforms:tm(Lr.backgroundCube.uniforms),vertexShader:Lr.backgroundCube.vertexShader,fragmentShader:Lr.backgroundCube.fragmentShader,side:hr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),y.geometry.deleteAttribute("normal"),y.geometry.deleteAttribute("uv"),y.onBeforeRender=function(D,V,W){this.matrixWorld.copyPosition(W.matrixWorld)},Object.defineProperty(y.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),u.update(y)),Wi.copy(P.backgroundRotation),Wi.x*=-1,Wi.y*=-1,Wi.z*=-1,q.isCubeTexture&&q.isRenderTargetTexture===!1&&(Wi.y*=-1,Wi.z*=-1),y.material.uniforms.envMap.value=q,y.material.uniforms.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1,y.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,y.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,y.material.uniforms.backgroundRotation.value.setFromMatrix4(yw.makeRotationFromEuler(Wi)),y.material.toneMapped=vn.getTransfer(q.colorSpace)!==nn,(x!==q||R!==q.version||w!==n.toneMapping)&&(y.material.needsUpdate=!0,x=q,R=q.version,w=n.toneMapping),y.layers.enableAll(),N.unshift(y,y.geometry,y.material,0,0,null)):q&&q.isTexture&&(E===void 0&&(E=new pr(new qa(2,2),new nr({name:"BackgroundMaterial",uniforms:tm(Lr.background.uniforms),vertexShader:Lr.background.vertexShader,fragmentShader:Lr.background.fragmentShader,side:Ga,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),E.geometry.deleteAttribute("normal"),Object.defineProperty(E.material,"map",{get:function(){return this.uniforms.t2D.value}}),u.update(E)),E.material.uniforms.t2D.value=q,E.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,E.material.toneMapped=vn.getTransfer(q.colorSpace)!==nn,q.matrixAutoUpdate===!0&&q.updateMatrix(),E.material.uniforms.uvTransform.value.copy(q.matrix),(x!==q||R!==q.version||w!==n.toneMapping)&&(E.material.needsUpdate=!0,x=q,R=q.version,w=n.toneMapping),E.layers.enableAll(),N.unshift(E,E.geometry,E.material,0,0,null))}function d(N,P){N.getRGB(Vs,zv(n)),s.buffers.color.setClear(Vs.r,Vs.g,Vs.b,P,h)}function C(){y!==void 0&&(y.geometry.dispose(),y.material.dispose(),y=void 0),E!==void 0&&(E.geometry.dispose(),E.material.dispose(),E=void 0)}return{getClearColor:function(){return p},setClearColor:function(N,P=1){p.set(N),m=P,d(p,m)},getClearAlpha:function(){return m},setClearAlpha:function(N){m=N,d(p,m)},render:O,addToRenderList:_,dispose:C}}function Rw(n,i){const a=n.getParameter(n.MAX_VERTEX_ATTRIBS),s={},u=R(null);let f=u,h=!1;function p(T,z,j,Q,K){let se=!1;const ne=x(Q,j,z);f!==ne&&(f=ne,E(f.object)),se=w(T,Q,j,K),se&&F(T,Q,j,K),K!==null&&i.update(K,n.ELEMENT_ARRAY_BUFFER),(se||h)&&(h=!1,P(T,z,j,Q),K!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,i.get(K).buffer))}function m(){return n.createVertexArray()}function E(T){return n.bindVertexArray(T)}function y(T){return n.deleteVertexArray(T)}function x(T,z,j){const Q=j.wireframe===!0;let K=s[T.id];K===void 0&&(K={},s[T.id]=K);let se=K[z.id];se===void 0&&(se={},K[z.id]=se);let ne=se[Q];return ne===void 0&&(ne=R(m()),se[Q]=ne),ne}function R(T){const z=[],j=[],Q=[];for(let K=0;K<a;K++)z[K]=0,j[K]=0,Q[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:j,attributeDivisors:Q,object:T,attributes:{},index:null}}function w(T,z,j,Q){const K=f.attributes,se=z.attributes;let ne=0;const be=j.getAttributes();for(const oe in be)if(be[oe].location>=0){const Le=K[oe];let et=se[oe];if(et===void 0&&(oe==="instanceMatrix"&&T.instanceMatrix&&(et=T.instanceMatrix),oe==="instanceColor"&&T.instanceColor&&(et=T.instanceColor)),Le===void 0||Le.attribute!==et||et&&Le.data!==et.data)return!0;ne++}return f.attributesNum!==ne||f.index!==Q}function F(T,z,j,Q){const K={},se=z.attributes;let ne=0;const be=j.getAttributes();for(const oe in be)if(be[oe].location>=0){let Le=se[oe];Le===void 0&&(oe==="instanceMatrix"&&T.instanceMatrix&&(Le=T.instanceMatrix),oe==="instanceColor"&&T.instanceColor&&(Le=T.instanceColor));const et={};et.attribute=Le,Le&&Le.data&&(et.data=Le.data),K[oe]=et,ne++}f.attributes=K,f.attributesNum=ne,f.index=Q}function O(){const T=f.newAttributes;for(let z=0,j=T.length;z<j;z++)T[z]=0}function _(T){d(T,0)}function d(T,z){const j=f.newAttributes,Q=f.enabledAttributes,K=f.attributeDivisors;j[T]=1,Q[T]===0&&(n.enableVertexAttribArray(T),Q[T]=1),K[T]!==z&&(n.vertexAttribDivisor(T,z),K[T]=z)}function C(){const T=f.newAttributes,z=f.enabledAttributes;for(let j=0,Q=z.length;j<Q;j++)z[j]!==T[j]&&(n.disableVertexAttribArray(j),z[j]=0)}function N(T,z,j,Q,K,se,ne){ne===!0?n.vertexAttribIPointer(T,z,j,K,se):n.vertexAttribPointer(T,z,j,Q,K,se)}function P(T,z,j,Q){O();const K=Q.attributes,se=j.getAttributes(),ne=z.defaultAttributeValues;for(const be in se){const oe=se[be];if(oe.location>=0){let Ue=K[be];if(Ue===void 0&&(be==="instanceMatrix"&&T.instanceMatrix&&(Ue=T.instanceMatrix),be==="instanceColor"&&T.instanceColor&&(Ue=T.instanceColor)),Ue!==void 0){const Le=Ue.normalized,et=Ue.itemSize,tt=i.get(Ue);if(tt===void 0)continue;const ot=tt.buffer,rt=tt.type,dt=tt.bytesPerElement,re=rt===n.INT||rt===n.UNSIGNED_INT||Ue.gpuType===Ml;if(Ue.isInterleavedBufferAttribute){const ve=Ue.data,Ne=ve.stride,st=Ue.offset;if(ve.isInstancedInterleavedBuffer){for(let Ye=0;Ye<oe.locationSize;Ye++)d(oe.location+Ye,ve.meshPerAttribute);T.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ye=0;Ye<oe.locationSize;Ye++)_(oe.location+Ye);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let Ye=0;Ye<oe.locationSize;Ye++)N(oe.location+Ye,et/oe.locationSize,rt,Le,Ne*dt,(st+et/oe.locationSize*Ye)*dt,re)}else{if(Ue.isInstancedBufferAttribute){for(let ve=0;ve<oe.locationSize;ve++)d(oe.location+ve,Ue.meshPerAttribute);T.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=Ue.meshPerAttribute*Ue.count)}else for(let ve=0;ve<oe.locationSize;ve++)_(oe.location+ve);n.bindBuffer(n.ARRAY_BUFFER,ot);for(let ve=0;ve<oe.locationSize;ve++)N(oe.location+ve,et/oe.locationSize,rt,Le,et*dt,et/oe.locationSize*ve*dt,re)}}else if(ne!==void 0){const Le=ne[be];if(Le!==void 0)switch(Le.length){case 2:n.vertexAttrib2fv(oe.location,Le);break;case 3:n.vertexAttrib3fv(oe.location,Le);break;case 4:n.vertexAttrib4fv(oe.location,Le);break;default:n.vertexAttrib1fv(oe.location,Le)}}}}C()}function q(){W();for(const T in s){const z=s[T];for(const j in z){const Q=z[j];for(const K in Q)y(Q[K].object),delete Q[K];delete z[j]}delete s[T]}}function D(T){if(s[T.id]===void 0)return;const z=s[T.id];for(const j in z){const Q=z[j];for(const K in Q)y(Q[K].object),delete Q[K];delete z[j]}delete s[T.id]}function V(T){for(const z in s){const j=s[z];if(j[T.id]===void 0)continue;const Q=j[T.id];for(const K in Q)y(Q[K].object),delete Q[K];delete j[T.id]}}function W(){M(),h=!0,f!==u&&(f=u,E(f.object))}function M(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:p,reset:W,resetDefaultState:M,dispose:q,releaseStatesOfGeometry:D,releaseStatesOfProgram:V,initAttributes:O,enableAttribute:_,disableUnusedAttributes:C}}function Aw(n,i,a){let s;function u(E){s=E}function f(E,y){n.drawArrays(s,E,y),a.update(y,s,1)}function h(E,y,x){x!==0&&(n.drawArraysInstanced(s,E,y,x),a.update(y,s,x))}function p(E,y,x){if(x===0)return;i.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,E,0,y,0,x);let w=0;for(let F=0;F<x;F++)w+=y[F];a.update(w,s,1)}function m(E,y,x,R){if(x===0)return;const w=i.get("WEBGL_multi_draw");if(w===null)for(let F=0;F<E.length;F++)h(E[F],y[F],R[F]);else{w.multiDrawArraysInstancedWEBGL(s,E,0,y,0,R,0,x);let F=0;for(let O=0;O<x;O++)F+=y[O]*R[O];a.update(F,s,1)}}this.setMode=u,this.render=f,this.renderInstances=h,this.renderMultiDraw=p,this.renderMultiDrawInstances=m}function Cw(n,i,a,s){let u;function f(){if(u!==void 0)return u;if(i.has("EXT_texture_filter_anisotropic")===!0){const V=i.get("EXT_texture_filter_anisotropic");u=n.getParameter(V.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else u=0;return u}function h(V){return!(V!==Wn&&s.convert(V)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function p(V){const W=V===On&&(i.has("EXT_color_buffer_half_float")||i.has("EXT_color_buffer_float"));return!(V!==xr&&s.convert(V)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&V!==kn&&!W)}function m(V){if(V==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";V="mediump"}return V==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let E=a.precision!==void 0?a.precision:"highp";const y=m(E);y!==E&&(console.warn("THREE.WebGLRenderer:",E,"not supported, using",y,"instead."),E=y);const x=a.logarithmicDepthBuffer===!0,R=a.reversedDepthBuffer===!0&&i.has("EXT_clip_control"),w=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),F=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),O=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),N=n.getParameter(n.MAX_VARYING_VECTORS),P=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),q=F>0,D=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:p,precision:E,logarithmicDepthBuffer:x,reversedDepthBuffer:R,maxTextures:w,maxVertexTextures:F,maxTextureSize:O,maxCubemapSize:_,maxAttributes:d,maxVertexUniforms:C,maxVaryings:N,maxFragmentUniforms:P,vertexTextures:q,maxSamples:D}}function Pw(n){const i=this;let a=null,s=0,u=!1,f=!1;const h=new Rv,p=new kt,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(x,R){const w=x.length!==0||R||s!==0||u;return u=R,s=x.length,w},this.beginShadows=function(){f=!0,y(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(x,R){a=y(x,R,0)},this.setState=function(x,R,w){const F=x.clippingPlanes,O=x.clipIntersection,_=x.clipShadows,d=n.get(x);if(!u||F===null||F.length===0||f&&!_)f?y(null):E();else{const C=f?0:s,N=C*4;let P=d.clippingState||null;m.value=P,P=y(F,R,N,w);for(let q=0;q!==N;++q)P[q]=a[q];d.clippingState=P,this.numIntersection=O?this.numPlanes:0,this.numPlanes+=C}};function E(){m.value!==a&&(m.value=a,m.needsUpdate=s>0),i.numPlanes=s,i.numIntersection=0}function y(x,R,w,F){const O=x!==null?x.length:0;let _=null;if(O!==0){if(_=m.value,F!==!0||_===null){const d=w+O*4,C=R.matrixWorldInverse;p.getNormalMatrix(C),(_===null||_.length<d)&&(_=new Float32Array(d));for(let N=0,P=w;N!==O;++N,P+=4)h.copy(x[N]).applyMatrix4(C,p),h.normal.toArray(_,P),_[P+3]=h.constant}m.value=_,m.needsUpdate=!0}return i.numPlanes=O,i.numIntersection=0,_}}function Iw(n){let i=new WeakMap;function a(h,p){return p===Fo?h.mapping=ea:p===dl&&(h.mapping=ta),h}function s(h){if(h&&h.isTexture){const p=h.mapping;if(p===Fo||p===dl)if(i.has(h)){const m=i.get(h).texture;return a(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const E=new zf(m.height);return E.fromEquirectangularTexture(n,h),i.set(h,E),h.addEventListener("dispose",u),a(E.texture,h.mapping)}else return null}}return h}function u(h){const p=h.target;p.removeEventListener("dispose",u);const m=i.get(p);m!==void 0&&(i.delete(p),m.dispose())}function f(){i=new WeakMap}return{get:s,dispose:f}}const Oa=4,rm=[.125,.215,.35,.446,.526,.582],$i=20,dc=new Tl,im=new Zt;let pc=null,hc=0,mc=0,vc=!1;const Yi=(1+Math.sqrt(5))/2,La=1/Yi,am=[new yt(-Yi,La,0),new yt(Yi,La,0),new yt(-La,0,Yi),new yt(La,0,Yi),new yt(0,Yi,-La),new yt(0,Yi,La),new yt(-1,1,-1),new yt(1,1,-1),new yt(-1,1,1),new yt(1,1,1)],Lw=new yt;class gf{constructor(i){this._renderer=i,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(i,a=0,s=.1,u=100,f={}){const{size:h=256,position:p=Lw}=f;pc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(h);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(i,s,u,m,p),a>0&&this._blur(m,0,0,a),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(i,a=null){return this._fromTexture(i,a)}fromCubemap(i,a=null){return this._fromTexture(i,a)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(i){this._lodMax=Math.floor(Math.log2(i)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let i=0;i<this._lodPlanes.length;i++)this._lodPlanes[i].dispose()}_cleanup(i){this._renderer.setRenderTarget(pc,hc,mc),this._renderer.xr.enabled=vc,i.scissorTest=!1,Ws(i,0,0,i.width,i.height)}_fromTexture(i,a){i.mapping===ea||i.mapping===ta?this._setSize(i.image.length===0?16:i.image[0].width||i.image[0].image.width):this._setSize(i.image.width/4),pc=this._renderer.getRenderTarget(),hc=this._renderer.getActiveCubeFace(),mc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=a||this._allocateTargets();return this._textureToCubeUV(i,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const i=3*Math.max(this._cubeSize,112),a=4*this._cubeSize,s={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:On,format:Wn,colorSpace:oi,depthBuffer:!1},u=om(i,a,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==i||this._pingPongRenderTarget.height!==a){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=om(i,a,s);const{_lodMax:f}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dw(f)),this._blurMaterial=Uw(f,i,a)}return u}_compileMaterial(i){const a=new pr(this._lodPlanes[0],i);this._renderer.compile(a,dc)}_sceneToCubeUV(i,a,s,u,f){const m=new Ba(90,1,a,s),E=[1,-1,1,1,1,1],y=[1,1,1,-1,-1,-1],x=this._renderer,R=x.autoClear,w=x.toneMapping;x.getClearColor(im),x.toneMapping=Yr,x.autoClear=!1,x.state.buffers.depth.getReversed()&&(x.setRenderTarget(u),x.clearDepth(),x.setRenderTarget(null));const O=new qf({name:"PMREM.Background",side:hr,depthWrite:!1,depthTest:!1}),_=new pr(new Vf,O);let d=!1;const C=i.background;C?C.isColor&&(O.color.copy(C),i.background=null,d=!0):(O.color.copy(im),d=!0);for(let N=0;N<6;N++){const P=N%3;P===0?(m.up.set(0,E[N],0),m.position.set(f.x,f.y,f.z),m.lookAt(f.x+y[N],f.y,f.z)):P===1?(m.up.set(0,0,E[N]),m.position.set(f.x,f.y,f.z),m.lookAt(f.x,f.y+y[N],f.z)):(m.up.set(0,E[N],0),m.position.set(f.x,f.y,f.z),m.lookAt(f.x,f.y,f.z+y[N]));const q=this._cubeSize;Ws(u,P*q,N>2?q:0,q,q),x.setRenderTarget(u),d&&x.render(_,m),x.render(i,m)}_.geometry.dispose(),_.material.dispose(),x.toneMapping=w,x.autoClear=R,i.background=C}_textureToCubeUV(i,a){const s=this._renderer,u=i.mapping===ea||i.mapping===ta;u?(this._cubemapMaterial===null&&(this._cubemapMaterial=lm()),this._cubemapMaterial.uniforms.flipEnvMap.value=i.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sm());const f=u?this._cubemapMaterial:this._equirectMaterial,h=new pr(this._lodPlanes[0],f),p=f.uniforms;p.envMap.value=i;const m=this._cubeSize;Ws(a,0,0,3*m,2*m),s.setRenderTarget(a),s.render(h,dc)}_applyPMREM(i){const a=this._renderer,s=a.autoClear;a.autoClear=!1;const u=this._lodPlanes.length;for(let f=1;f<u;f++){const h=Math.sqrt(this._sigmas[f]*this._sigmas[f]-this._sigmas[f-1]*this._sigmas[f-1]),p=am[(u-f-1)%am.length];this._blur(i,f-1,f,h,p)}a.autoClear=s}_blur(i,a,s,u,f){const h=this._pingPongRenderTarget;this._halfBlur(i,h,a,s,u,"latitudinal",f),this._halfBlur(h,i,s,s,u,"longitudinal",f)}_halfBlur(i,a,s,u,f,h,p){const m=this._renderer,E=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const y=3,x=new pr(this._lodPlanes[u],E),R=E.uniforms,w=this._sizeLods[s]-1,F=isFinite(f)?Math.PI/(2*w):2*Math.PI/(2*$i-1),O=f/F,_=isFinite(f)?1+Math.floor(y*O):$i;_>$i&&console.warn(`sigmaRadians, ${f}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${$i}`);const d=[];let C=0;for(let V=0;V<$i;++V){const W=V/O,M=Math.exp(-W*W/2);d.push(M),V===0?C+=M:V<_&&(C+=2*M)}for(let V=0;V<d.length;V++)d[V]=d[V]/C;R.envMap.value=i.texture,R.samples.value=_,R.weights.value=d,R.latitudinal.value=h==="latitudinal",p&&(R.poleAxis.value=p);const{_lodMax:N}=this;R.dTheta.value=F,R.mipInt.value=N-s;const P=this._sizeLods[u],q=3*P*(u>N-Oa?u-N+Oa:0),D=4*(this._cubeSize-P);Ws(a,q,D,3*P,2*P),m.setRenderTarget(a),m.render(x,dc)}}function Dw(n){const i=[],a=[],s=[];let u=n;const f=n-Oa+1+rm.length;for(let h=0;h<f;h++){const p=Math.pow(2,u);a.push(p);let m=1/p;h>n-Oa?m=rm[h-n+Oa-1]:h===0&&(m=0),s.push(m);const E=1/(p-2),y=-E,x=1+E,R=[y,y,x,y,x,x,y,y,x,x,y,x],w=6,F=6,O=3,_=2,d=1,C=new Float32Array(O*F*w),N=new Float32Array(_*F*w),P=new Float32Array(d*F*w);for(let D=0;D<w;D++){const V=D%3*2/3-1,W=D>2?0:-1,M=[V,W,0,V+2/3,W,0,V+2/3,W+1,0,V,W,0,V+2/3,W+1,0,V,W+1,0];C.set(M,O*F*D),N.set(R,_*F*D);const T=[D,D,D,D,D,D];P.set(T,d*F*D)}const q=new If;q.setAttribute("position",new wo(C,O)),q.setAttribute("uv",new wo(N,_)),q.setAttribute("faceIndex",new wo(P,d)),i.push(q),u>Oa&&u--}return{lodPlanes:i,sizeLods:a,sigmas:s}}function om(n,i,a){const s=new Dr(n,i,a);return s.texture.mapping=Go,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Ws(n,i,a,s,u){n.viewport.set(i,a,s,u),n.scissor.set(i,a,s,u)}function Uw(n,i,a){const s=new Float32Array($i),u=new yt(0,1,0);return new nr({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/i,CUBEUV_TEXEL_HEIGHT:1/a,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function sm(){return new nr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function lm(){return new nr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Kf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Kf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Nw(n){let i=new WeakMap,a=null;function s(p){if(p&&p.isTexture){const m=p.mapping,E=m===Fo||m===dl,y=m===ea||m===ta;if(E||y){let x=i.get(p);const R=x!==void 0?x.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==R)return a===null&&(a=new gf(n)),x=E?a.fromEquirectangular(p,x):a.fromCubemap(p,x),x.texture.pmremVersion=p.pmremVersion,i.set(p,x),x.texture;if(x!==void 0)return x.texture;{const w=p.image;return E&&w&&w.height>0||y&&w&&u(w)?(a===null&&(a=new gf(n)),x=E?a.fromEquirectangular(p):a.fromCubemap(p),x.texture.pmremVersion=p.pmremVersion,i.set(p,x),p.addEventListener("dispose",f),x.texture):null}}}return p}function u(p){let m=0;const E=6;for(let y=0;y<E;y++)p[y]!==void 0&&m++;return m===E}function f(p){const m=p.target;m.removeEventListener("dispose",f);const E=i.get(m);E!==void 0&&(i.delete(m),E.dispose())}function h(){i=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:s,dispose:h}}function Fw(n){const i={};function a(s){if(i[s]!==void 0)return i[s];let u;switch(s){case"WEBGL_depth_texture":u=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":u=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":u=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":u=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:u=n.getExtension(s)}return i[s]=u,u}return{has:function(s){return a(s)!==null},init:function(){a("EXT_color_buffer_float"),a("WEBGL_clip_cull_distance"),a("OES_texture_float_linear"),a("EXT_color_buffer_half_float"),a("WEBGL_multisampled_render_to_texture"),a("WEBGL_render_shared_exponent")},get:function(s){const u=a(s);return u===null&&Dc("THREE.WebGLRenderer: "+s+" extension not supported."),u}}}function Ow(n,i,a,s){const u={},f=new WeakMap;function h(x){const R=x.target;R.index!==null&&i.remove(R.index);for(const F in R.attributes)i.remove(R.attributes[F]);R.removeEventListener("dispose",h),delete u[R.id];const w=f.get(R);w&&(i.remove(w),f.delete(R)),s.releaseStatesOfGeometry(R),R.isInstancedBufferGeometry===!0&&delete R._maxInstanceCount,a.memory.geometries--}function p(x,R){return u[R.id]===!0||(R.addEventListener("dispose",h),u[R.id]=!0,a.memory.geometries++),R}function m(x){const R=x.attributes;for(const w in R)i.update(R[w],n.ARRAY_BUFFER)}function E(x){const R=[],w=x.index,F=x.attributes.position;let O=0;if(w!==null){const C=w.array;O=w.version;for(let N=0,P=C.length;N<P;N+=3){const q=C[N+0],D=C[N+1],V=C[N+2];R.push(q,D,D,V,V,q)}}else if(F!==void 0){const C=F.array;O=F.version;for(let N=0,P=C.length/3-1;N<P;N+=3){const q=N+0,D=N+1,V=N+2;R.push(q,D,D,V,V,q)}}else return;const _=new(NS(R)?Gv:Vv)(R,1);_.version=O;const d=f.get(x);d&&i.remove(d),f.set(x,_)}function y(x){const R=f.get(x);if(R){const w=x.index;w!==null&&R.version<w.version&&E(x)}else E(x);return f.get(x)}return{get:p,update:m,getWireframeAttribute:y}}function Bw(n,i,a){let s;function u(R){s=R}let f,h;function p(R){f=R.type,h=R.bytesPerElement}function m(R,w){n.drawElements(s,w,f,R*h),a.update(w,s,1)}function E(R,w,F){F!==0&&(n.drawElementsInstanced(s,w,f,R*h,F),a.update(w,s,F))}function y(R,w,F){if(F===0)return;i.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,w,0,f,R,0,F);let _=0;for(let d=0;d<F;d++)_+=w[d];a.update(_,s,1)}function x(R,w,F,O){if(F===0)return;const _=i.get("WEBGL_multi_draw");if(_===null)for(let d=0;d<R.length;d++)E(R[d]/h,w[d],O[d]);else{_.multiDrawElementsInstancedWEBGL(s,w,0,f,R,0,O,0,F);let d=0;for(let C=0;C<F;C++)d+=w[C]*O[C];a.update(d,s,1)}}this.setMode=u,this.setIndex=p,this.render=m,this.renderInstances=E,this.renderMultiDraw=y,this.renderMultiDrawInstances=x}function kw(n){const i={geometries:0,textures:0},a={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,h,p){switch(a.calls++,h){case n.TRIANGLES:a.triangles+=p*(f/3);break;case n.LINES:a.lines+=p*(f/2);break;case n.LINE_STRIP:a.lines+=p*(f-1);break;case n.LINE_LOOP:a.lines+=p*f;break;case n.POINTS:a.points+=p*f;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function u(){a.calls=0,a.triangles=0,a.points=0,a.lines=0}return{memory:i,render:a,programs:null,autoReset:!0,reset:u,update:s}}function Hw(n,i,a){const s=new WeakMap,u=new jn;function f(h,p,m){const E=h.morphTargetInfluences,y=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,x=y!==void 0?y.length:0;let R=s.get(p);if(R===void 0||R.count!==x){let M=function(){V.dispose(),s.delete(p),p.removeEventListener("dispose",M)};R!==void 0&&R.texture.dispose();const w=p.morphAttributes.position!==void 0,F=p.morphAttributes.normal!==void 0,O=p.morphAttributes.color!==void 0,_=p.morphAttributes.position||[],d=p.morphAttributes.normal||[],C=p.morphAttributes.color||[];let N=0;w===!0&&(N=1),F===!0&&(N=2),O===!0&&(N=3);let P=p.attributes.position.count*N,q=1;P>i.maxTextureSize&&(q=Math.ceil(P/i.maxTextureSize),P=i.maxTextureSize);const D=new Float32Array(P*q*4*x),V=new Gf(D,P,q,x);V.type=kn,V.needsUpdate=!0;const W=N*4;for(let T=0;T<x;T++){const z=_[T],j=d[T],Q=C[T],K=P*q*4*T;for(let se=0;se<z.count;se++){const ne=se*W;w===!0&&(u.fromBufferAttribute(z,se),D[K+ne+0]=u.x,D[K+ne+1]=u.y,D[K+ne+2]=u.z,D[K+ne+3]=0),F===!0&&(u.fromBufferAttribute(j,se),D[K+ne+4]=u.x,D[K+ne+5]=u.y,D[K+ne+6]=u.z,D[K+ne+7]=0),O===!0&&(u.fromBufferAttribute(Q,se),D[K+ne+8]=u.x,D[K+ne+9]=u.y,D[K+ne+10]=u.z,D[K+ne+11]=Q.itemSize===4?u.w:1)}}R={count:x,texture:V,size:new Hn(P,q)},s.set(p,R),p.addEventListener("dispose",M)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(n,"morphTexture",h.morphTexture,a);else{let w=0;for(let O=0;O<E.length;O++)w+=E[O];const F=p.morphTargetsRelative?1:1-w;m.getUniforms().setValue(n,"morphTargetBaseInfluence",F),m.getUniforms().setValue(n,"morphTargetInfluences",E)}m.getUniforms().setValue(n,"morphTargetsTexture",R.texture,a),m.getUniforms().setValue(n,"morphTargetsTextureSize",R.size)}return{update:f}}function zw(n,i,a,s){let u=new WeakMap;function f(m){const E=s.render.frame,y=m.geometry,x=i.get(m,y);if(u.get(x)!==E&&(i.update(x),u.set(x,E)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),u.get(m)!==E&&(a.update(m.instanceMatrix,n.ARRAY_BUFFER),m.instanceColor!==null&&a.update(m.instanceColor,n.ARRAY_BUFFER),u.set(m,E))),m.isSkinnedMesh){const R=m.skeleton;u.get(R)!==E&&(R.update(),u.set(R,E))}return x}function h(){u=new WeakMap}function p(m){const E=m.target;E.removeEventListener("dispose",p),a.remove(E.instanceMatrix),E.instanceColor!==null&&a.remove(E.instanceColor)}return{update:f,dispose:h}}const pg=new yi,um=new Af(1,1),hg=new Gf,mg=new Zv,vg=new Kv,cm=[],fm=[],dm=new Float32Array(16),pm=new Float32Array(9),hm=new Float32Array(4);function Ya(n,i,a){const s=n[0];if(s<=0||s>0)return n;const u=i*a;let f=cm[u];if(f===void 0&&(f=new Float32Array(u),cm[u]=f),i!==0){s.toArray(f,0);for(let h=1,p=0;h!==i;++h)p+=a,n[h].toArray(f,p)}return f}function xn(n,i){if(n.length!==i.length)return!1;for(let a=0,s=n.length;a<s;a++)if(n[a]!==i[a])return!1;return!0}function yn(n,i){for(let a=0,s=i.length;a<s;a++)n[a]=i[a]}function yl(n,i){let a=fm[i];a===void 0&&(a=new Int32Array(i),fm[i]=a);for(let s=0;s!==i;++s)a[s]=n.allocateTextureUnit();return a}function Gw(n,i){const a=this.cache;a[0]!==i&&(n.uniform1f(this.addr,i),a[0]=i)}function Vw(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y)&&(n.uniform2f(this.addr,i.x,i.y),a[0]=i.x,a[1]=i.y);else{if(xn(a,i))return;n.uniform2fv(this.addr,i),yn(a,i)}}function Ww(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y||a[2]!==i.z)&&(n.uniform3f(this.addr,i.x,i.y,i.z),a[0]=i.x,a[1]=i.y,a[2]=i.z);else if(i.r!==void 0)(a[0]!==i.r||a[1]!==i.g||a[2]!==i.b)&&(n.uniform3f(this.addr,i.r,i.g,i.b),a[0]=i.r,a[1]=i.g,a[2]=i.b);else{if(xn(a,i))return;n.uniform3fv(this.addr,i),yn(a,i)}}function Xw(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y||a[2]!==i.z||a[3]!==i.w)&&(n.uniform4f(this.addr,i.x,i.y,i.z,i.w),a[0]=i.x,a[1]=i.y,a[2]=i.z,a[3]=i.w);else{if(xn(a,i))return;n.uniform4fv(this.addr,i),yn(a,i)}}function qw(n,i){const a=this.cache,s=i.elements;if(s===void 0){if(xn(a,i))return;n.uniformMatrix2fv(this.addr,!1,i),yn(a,i)}else{if(xn(a,s))return;hm.set(s),n.uniformMatrix2fv(this.addr,!1,hm),yn(a,s)}}function Yw(n,i){const a=this.cache,s=i.elements;if(s===void 0){if(xn(a,i))return;n.uniformMatrix3fv(this.addr,!1,i),yn(a,i)}else{if(xn(a,s))return;pm.set(s),n.uniformMatrix3fv(this.addr,!1,pm),yn(a,s)}}function jw(n,i){const a=this.cache,s=i.elements;if(s===void 0){if(xn(a,i))return;n.uniformMatrix4fv(this.addr,!1,i),yn(a,i)}else{if(xn(a,s))return;dm.set(s),n.uniformMatrix4fv(this.addr,!1,dm),yn(a,s)}}function $w(n,i){const a=this.cache;a[0]!==i&&(n.uniform1i(this.addr,i),a[0]=i)}function Kw(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y)&&(n.uniform2i(this.addr,i.x,i.y),a[0]=i.x,a[1]=i.y);else{if(xn(a,i))return;n.uniform2iv(this.addr,i),yn(a,i)}}function Zw(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y||a[2]!==i.z)&&(n.uniform3i(this.addr,i.x,i.y,i.z),a[0]=i.x,a[1]=i.y,a[2]=i.z);else{if(xn(a,i))return;n.uniform3iv(this.addr,i),yn(a,i)}}function Qw(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y||a[2]!==i.z||a[3]!==i.w)&&(n.uniform4i(this.addr,i.x,i.y,i.z,i.w),a[0]=i.x,a[1]=i.y,a[2]=i.z,a[3]=i.w);else{if(xn(a,i))return;n.uniform4iv(this.addr,i),yn(a,i)}}function Jw(n,i){const a=this.cache;a[0]!==i&&(n.uniform1ui(this.addr,i),a[0]=i)}function eR(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y)&&(n.uniform2ui(this.addr,i.x,i.y),a[0]=i.x,a[1]=i.y);else{if(xn(a,i))return;n.uniform2uiv(this.addr,i),yn(a,i)}}function tR(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y||a[2]!==i.z)&&(n.uniform3ui(this.addr,i.x,i.y,i.z),a[0]=i.x,a[1]=i.y,a[2]=i.z);else{if(xn(a,i))return;n.uniform3uiv(this.addr,i),yn(a,i)}}function nR(n,i){const a=this.cache;if(i.x!==void 0)(a[0]!==i.x||a[1]!==i.y||a[2]!==i.z||a[3]!==i.w)&&(n.uniform4ui(this.addr,i.x,i.y,i.z,i.w),a[0]=i.x,a[1]=i.y,a[2]=i.z,a[3]=i.w);else{if(xn(a,i))return;n.uniform4uiv(this.addr,i),yn(a,i)}}function rR(n,i,a){const s=this.cache,u=a.allocateTextureUnit();s[0]!==u&&(n.uniform1i(this.addr,u),s[0]=u);let f;this.type===n.SAMPLER_2D_SHADOW?(um.compareFunction=Cf,f=um):f=pg,a.setTexture2D(i||f,u)}function iR(n,i,a){const s=this.cache,u=a.allocateTextureUnit();s[0]!==u&&(n.uniform1i(this.addr,u),s[0]=u),a.setTexture3D(i||mg,u)}function aR(n,i,a){const s=this.cache,u=a.allocateTextureUnit();s[0]!==u&&(n.uniform1i(this.addr,u),s[0]=u),a.setTextureCube(i||vg,u)}function oR(n,i,a){const s=this.cache,u=a.allocateTextureUnit();s[0]!==u&&(n.uniform1i(this.addr,u),s[0]=u),a.setTexture2DArray(i||hg,u)}function sR(n){switch(n){case 5126:return Gw;case 35664:return Vw;case 35665:return Ww;case 35666:return Xw;case 35674:return qw;case 35675:return Yw;case 35676:return jw;case 5124:case 35670:return $w;case 35667:case 35671:return Kw;case 35668:case 35672:return Zw;case 35669:case 35673:return Qw;case 5125:return Jw;case 36294:return eR;case 36295:return tR;case 36296:return nR;case 35678:case 36198:case 36298:case 36306:case 35682:return rR;case 35679:case 36299:case 36307:return iR;case 35680:case 36300:case 36308:case 36293:return aR;case 36289:case 36303:case 36311:case 36292:return oR}}function lR(n,i){n.uniform1fv(this.addr,i)}function uR(n,i){const a=Ya(i,this.size,2);n.uniform2fv(this.addr,a)}function cR(n,i){const a=Ya(i,this.size,3);n.uniform3fv(this.addr,a)}function fR(n,i){const a=Ya(i,this.size,4);n.uniform4fv(this.addr,a)}function dR(n,i){const a=Ya(i,this.size,4);n.uniformMatrix2fv(this.addr,!1,a)}function pR(n,i){const a=Ya(i,this.size,9);n.uniformMatrix3fv(this.addr,!1,a)}function hR(n,i){const a=Ya(i,this.size,16);n.uniformMatrix4fv(this.addr,!1,a)}function mR(n,i){n.uniform1iv(this.addr,i)}function vR(n,i){n.uniform2iv(this.addr,i)}function gR(n,i){n.uniform3iv(this.addr,i)}function _R(n,i){n.uniform4iv(this.addr,i)}function SR(n,i){n.uniform1uiv(this.addr,i)}function ER(n,i){n.uniform2uiv(this.addr,i)}function bR(n,i){n.uniform3uiv(this.addr,i)}function MR(n,i){n.uniform4uiv(this.addr,i)}function TR(n,i,a){const s=this.cache,u=i.length,f=yl(a,u);xn(s,f)||(n.uniform1iv(this.addr,f),yn(s,f));for(let h=0;h!==u;++h)a.setTexture2D(i[h]||pg,f[h])}function xR(n,i,a){const s=this.cache,u=i.length,f=yl(a,u);xn(s,f)||(n.uniform1iv(this.addr,f),yn(s,f));for(let h=0;h!==u;++h)a.setTexture3D(i[h]||mg,f[h])}function yR(n,i,a){const s=this.cache,u=i.length,f=yl(a,u);xn(s,f)||(n.uniform1iv(this.addr,f),yn(s,f));for(let h=0;h!==u;++h)a.setTextureCube(i[h]||vg,f[h])}function wR(n,i,a){const s=this.cache,u=i.length,f=yl(a,u);xn(s,f)||(n.uniform1iv(this.addr,f),yn(s,f));for(let h=0;h!==u;++h)a.setTexture2DArray(i[h]||hg,f[h])}function RR(n){switch(n){case 5126:return lR;case 35664:return uR;case 35665:return cR;case 35666:return fR;case 35674:return dR;case 35675:return pR;case 35676:return hR;case 5124:case 35670:return mR;case 35667:case 35671:return vR;case 35668:case 35672:return gR;case 35669:case 35673:return _R;case 5125:return SR;case 36294:return ER;case 36295:return bR;case 36296:return MR;case 35678:case 36198:case 36298:case 36306:case 35682:return TR;case 35679:case 36299:case 36307:return xR;case 35680:case 36300:case 36308:case 36293:return yR;case 36289:case 36303:case 36311:case 36292:return wR}}class AR{constructor(i,a,s){this.id=i,this.addr=s,this.cache=[],this.type=a.type,this.setValue=sR(a.type)}}class CR{constructor(i,a,s){this.id=i,this.addr=s,this.cache=[],this.type=a.type,this.size=a.size,this.setValue=RR(a.type)}}class PR{constructor(i){this.id=i,this.seq=[],this.map={}}setValue(i,a,s){const u=this.seq;for(let f=0,h=u.length;f!==h;++f){const p=u[f];p.setValue(i,a[p.id],s)}}}const gc=/(\w+)(\])?(\[|\.)?/g;function mm(n,i){n.seq.push(i),n.map[i.id]=i}function IR(n,i,a){const s=n.name,u=s.length;for(gc.lastIndex=0;;){const f=gc.exec(s),h=gc.lastIndex;let p=f[1];const m=f[2]==="]",E=f[3];if(m&&(p=p|0),E===void 0||E==="["&&h+2===u){mm(a,E===void 0?new AR(p,n,i):new CR(p,n,i));break}else{let x=a.map[p];x===void 0&&(x=new PR(p),mm(a,x)),a=x}}}class nl{constructor(i,a){this.seq=[],this.map={};const s=i.getProgramParameter(a,i.ACTIVE_UNIFORMS);for(let u=0;u<s;++u){const f=i.getActiveUniform(a,u),h=i.getUniformLocation(a,f.name);IR(f,h,this)}}setValue(i,a,s,u){const f=this.map[a];f!==void 0&&f.setValue(i,s,u)}setOptional(i,a,s){const u=a[s];u!==void 0&&this.setValue(i,s,u)}static upload(i,a,s,u){for(let f=0,h=a.length;f!==h;++f){const p=a[f],m=s[p.id];m.needsUpdate!==!1&&p.setValue(i,m.value,u)}}static seqWithValue(i,a){const s=[];for(let u=0,f=i.length;u!==f;++u){const h=i[u];h.id in a&&s.push(h)}return s}}function vm(n,i,a){const s=n.createShader(i);return n.shaderSource(s,a),n.compileShader(s),s}const LR=37297;let DR=0;function UR(n,i){const a=n.split(`
`),s=[],u=Math.max(i-6,0),f=Math.min(i+6,a.length);for(let h=u;h<f;h++){const p=h+1;s.push(`${p===i?">":" "} ${p}: ${a[h]}`)}return s.join(`
`)}const gm=new kt;function NR(n){vn._getMatrix(gm,vn.workingColorSpace,n);const i=`mat3( ${gm.elements.map(a=>a.toFixed(4))} )`;switch(vn.getTransfer(n)){case Xf:return[i,"LinearTransferOETF"];case nn:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}}function _m(n,i,a){const s=n.getShaderParameter(i,n.COMPILE_STATUS),f=(n.getShaderInfoLog(i)||"").trim();if(s&&f==="")return"";const h=/ERROR: 0:(\d+)/.exec(f);if(h){const p=parseInt(h[1]);return a.toUpperCase()+`

`+f+`

`+UR(n.getShaderSource(i),p)}else return f}function FR(n,i){const a=NR(i);return[`vec4 ${n}( vec4 value ) {`,`	return ${a[1]}( vec4( value.rgb * ${a[0]}, value.a ) );`,"}"].join(`
`)}function OR(n,i){let a;switch(i){case $v:a="Linear";break;case jv:a="Reinhard";break;case Yv:a="Cineon";break;case Yf:a="ACESFilmic";break;case qv:a="AgX";break;case Xv:a="Neutral";break;case Wv:a="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",i),a="Linear"}return"vec3 "+n+"( vec3 color ) { return "+a+"ToneMapping( color ); }"}const Xs=new yt;function BR(){vn.getLuminanceCoefficients(Xs);const n=Xs.x.toFixed(4),i=Xs.y.toFixed(4),a=Xs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${i}, ${a} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kR(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xo).join(`
`)}function HR(n){const i=[];for(const a in n){const s=n[a];s!==!1&&i.push("#define "+a+" "+s)}return i.join(`
`)}function zR(n,i){const a={},s=n.getProgramParameter(i,n.ACTIVE_ATTRIBUTES);for(let u=0;u<s;u++){const f=n.getActiveAttrib(i,u),h=f.name;let p=1;f.type===n.FLOAT_MAT2&&(p=2),f.type===n.FLOAT_MAT3&&(p=3),f.type===n.FLOAT_MAT4&&(p=4),a[h]={type:f.type,location:n.getAttribLocation(i,h),locationSize:p}}return a}function xo(n){return n!==""}function Sm(n,i){const a=i.numSpotLightShadows+i.numSpotLightMaps-i.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,i.numDirLights).replace(/NUM_SPOT_LIGHTS/g,i.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,i.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,a).replace(/NUM_RECT_AREA_LIGHTS/g,i.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,i.numPointLights).replace(/NUM_HEMI_LIGHTS/g,i.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,i.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,i.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,i.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,i.numPointLightShadows)}function Em(n,i){return n.replace(/NUM_CLIPPING_PLANES/g,i.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,i.numClippingPlanes-i.numClipIntersection)}const GR=/^[ \t]*#include +<([\w\d./]+)>/gm;function _f(n){return n.replace(GR,WR)}const VR=new Map;function WR(n,i){let a=Tt[i];if(a===void 0){const s=VR.get(i);if(s!==void 0)a=Tt[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',i,s);else throw new Error("Can not resolve #include <"+i+">")}return _f(a)}const XR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bm(n){return n.replace(XR,qR)}function qR(n,i,a,s){let u="";for(let f=parseInt(i);f<parseInt(a);f++)u+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return u}function Mm(n){let i=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?i+=`
#define HIGH_PRECISION`:n.precision==="mediump"?i+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(i+=`
#define LOW_PRECISION`),i}function YR(n){let i="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===bl?i="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ao?i="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ir&&(i="SHADOWMAP_TYPE_VSM"),i}function jR(n){let i="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ea:case ta:i="ENVMAP_TYPE_CUBE";break;case Go:i="ENVMAP_TYPE_CUBE_UV";break}return i}function $R(n){let i="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===ta&&(i="ENVMAP_MODE_REFRACTION"),i}function KR(n){let i="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case eg:i="ENVMAP_BLENDING_MULTIPLY";break;case Jv:i="ENVMAP_BLENDING_MIX";break;case Qv:i="ENVMAP_BLENDING_ADD";break}return i}function ZR(n){const i=n.envMapCubeUVHeight;if(i===null)return null;const a=Math.log2(i)-2,s=1/i;return{texelWidth:1/(3*Math.max(Math.pow(2,a),112)),texelHeight:s,maxMip:a}}function QR(n,i,a,s){const u=n.getContext(),f=a.defines;let h=a.vertexShader,p=a.fragmentShader;const m=YR(a),E=jR(a),y=$R(a),x=KR(a),R=ZR(a),w=kR(a),F=HR(f),O=u.createProgram();let _,d,C=a.glslVersion?"#version "+a.glslVersion+`
`:"";a.isRawShaderMaterial?(_=["#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,F].filter(xo).join(`
`),_.length>0&&(_+=`
`),d=["#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,F].filter(xo).join(`
`),d.length>0&&(d+=`
`)):(_=[Mm(a),"#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,F,a.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",a.batching?"#define USE_BATCHING":"",a.batchingColor?"#define USE_BATCHING_COLOR":"",a.instancing?"#define USE_INSTANCING":"",a.instancingColor?"#define USE_INSTANCING_COLOR":"",a.instancingMorph?"#define USE_INSTANCING_MORPH":"",a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp2?"#define FOG_EXP2":"",a.map?"#define USE_MAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+y:"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",a.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",a.displacementMap?"#define USE_DISPLACEMENTMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.anisotropy?"#define USE_ANISOTROPY":"",a.anisotropyMap?"#define USE_ANISOTROPYMAP":"",a.clearcoatMap?"#define USE_CLEARCOATMAP":"",a.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",a.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",a.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",a.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",a.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.alphaHash?"#define USE_ALPHAHASH":"",a.transmission?"#define USE_TRANSMISSION":"",a.transmissionMap?"#define USE_TRANSMISSIONMAP":"",a.thicknessMap?"#define USE_THICKNESSMAP":"",a.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",a.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",a.mapUv?"#define MAP_UV "+a.mapUv:"",a.alphaMapUv?"#define ALPHAMAP_UV "+a.alphaMapUv:"",a.lightMapUv?"#define LIGHTMAP_UV "+a.lightMapUv:"",a.aoMapUv?"#define AOMAP_UV "+a.aoMapUv:"",a.emissiveMapUv?"#define EMISSIVEMAP_UV "+a.emissiveMapUv:"",a.bumpMapUv?"#define BUMPMAP_UV "+a.bumpMapUv:"",a.normalMapUv?"#define NORMALMAP_UV "+a.normalMapUv:"",a.displacementMapUv?"#define DISPLACEMENTMAP_UV "+a.displacementMapUv:"",a.metalnessMapUv?"#define METALNESSMAP_UV "+a.metalnessMapUv:"",a.roughnessMapUv?"#define ROUGHNESSMAP_UV "+a.roughnessMapUv:"",a.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+a.anisotropyMapUv:"",a.clearcoatMapUv?"#define CLEARCOATMAP_UV "+a.clearcoatMapUv:"",a.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+a.clearcoatNormalMapUv:"",a.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+a.clearcoatRoughnessMapUv:"",a.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+a.iridescenceMapUv:"",a.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+a.iridescenceThicknessMapUv:"",a.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+a.sheenColorMapUv:"",a.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+a.sheenRoughnessMapUv:"",a.specularMapUv?"#define SPECULARMAP_UV "+a.specularMapUv:"",a.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+a.specularColorMapUv:"",a.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+a.specularIntensityMapUv:"",a.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+a.transmissionMapUv:"",a.thicknessMapUv?"#define THICKNESSMAP_UV "+a.thicknessMapUv:"",a.vertexTangents&&a.flatShading===!1?"#define USE_TANGENT":"",a.vertexColors?"#define USE_COLOR":"",a.vertexAlphas?"#define USE_COLOR_ALPHA":"",a.vertexUv1s?"#define USE_UV1":"",a.vertexUv2s?"#define USE_UV2":"",a.vertexUv3s?"#define USE_UV3":"",a.pointsUvs?"#define USE_POINTS_UV":"",a.flatShading?"#define FLAT_SHADED":"",a.skinning?"#define USE_SKINNING":"",a.morphTargets?"#define USE_MORPHTARGETS":"",a.morphNormals&&a.flatShading===!1?"#define USE_MORPHNORMALS":"",a.morphColors?"#define USE_MORPHCOLORS":"",a.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+a.morphTextureStride:"",a.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+a.morphTargetsCount:"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"",a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+m:"",a.sizeAttenuation?"#define USE_SIZEATTENUATION":"",a.numLightProbes>0?"#define USE_LIGHT_PROBES":"",a.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",a.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xo).join(`
`),d=[Mm(a),"#define SHADER_TYPE "+a.shaderType,"#define SHADER_NAME "+a.shaderName,F,a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp2?"#define FOG_EXP2":"",a.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",a.map?"#define USE_MAP":"",a.matcap?"#define USE_MATCAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+E:"",a.envMap?"#define "+y:"",a.envMap?"#define "+x:"",R?"#define CUBEUV_TEXEL_WIDTH "+R.texelWidth:"",R?"#define CUBEUV_TEXEL_HEIGHT "+R.texelHeight:"",R?"#define CUBEUV_MAX_MIP "+R.maxMip+".0":"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",a.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.anisotropy?"#define USE_ANISOTROPY":"",a.anisotropyMap?"#define USE_ANISOTROPYMAP":"",a.clearcoat?"#define USE_CLEARCOAT":"",a.clearcoatMap?"#define USE_CLEARCOATMAP":"",a.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",a.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",a.dispersion?"#define USE_DISPERSION":"",a.iridescence?"#define USE_IRIDESCENCE":"",a.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",a.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",a.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.alphaTest?"#define USE_ALPHATEST":"",a.alphaHash?"#define USE_ALPHAHASH":"",a.sheen?"#define USE_SHEEN":"",a.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",a.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",a.transmission?"#define USE_TRANSMISSION":"",a.transmissionMap?"#define USE_TRANSMISSIONMAP":"",a.thicknessMap?"#define USE_THICKNESSMAP":"",a.vertexTangents&&a.flatShading===!1?"#define USE_TANGENT":"",a.vertexColors||a.instancingColor||a.batchingColor?"#define USE_COLOR":"",a.vertexAlphas?"#define USE_COLOR_ALPHA":"",a.vertexUv1s?"#define USE_UV1":"",a.vertexUv2s?"#define USE_UV2":"",a.vertexUv3s?"#define USE_UV3":"",a.pointsUvs?"#define USE_POINTS_UV":"",a.gradientMap?"#define USE_GRADIENTMAP":"",a.flatShading?"#define FLAT_SHADED":"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"",a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+m:"",a.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",a.numLightProbes>0?"#define USE_LIGHT_PROBES":"",a.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",a.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",a.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",a.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",a.toneMapping!==Yr?"#define TONE_MAPPING":"",a.toneMapping!==Yr?Tt.tonemapping_pars_fragment:"",a.toneMapping!==Yr?OR("toneMapping",a.toneMapping):"",a.dithering?"#define DITHERING":"",a.opaque?"#define OPAQUE":"",Tt.colorspace_pars_fragment,FR("linearToOutputTexel",a.outputColorSpace),BR(),a.useDepthPacking?"#define DEPTH_PACKING "+a.depthPacking:"",`
`].filter(xo).join(`
`)),h=_f(h),h=Sm(h,a),h=Em(h,a),p=_f(p),p=Sm(p,a),p=Em(p,a),h=bm(h),p=bm(p),a.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,_=[w,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,d=["#define varying in",a.glslVersion===pf?"":"layout(location = 0) out highp vec4 pc_fragColor;",a.glslVersion===pf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const N=C+_+h,P=C+d+p,q=vm(u,u.VERTEX_SHADER,N),D=vm(u,u.FRAGMENT_SHADER,P);u.attachShader(O,q),u.attachShader(O,D),a.index0AttributeName!==void 0?u.bindAttribLocation(O,0,a.index0AttributeName):a.morphTargets===!0&&u.bindAttribLocation(O,0,"position"),u.linkProgram(O);function V(z){if(n.debug.checkShaderErrors){const j=u.getProgramInfoLog(O)||"",Q=u.getShaderInfoLog(q)||"",K=u.getShaderInfoLog(D)||"",se=j.trim(),ne=Q.trim(),be=K.trim();let oe=!0,Ue=!0;if(u.getProgramParameter(O,u.LINK_STATUS)===!1)if(oe=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(u,O,q,D);else{const Le=_m(u,q,"vertex"),et=_m(u,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+u.getError()+" - VALIDATE_STATUS "+u.getProgramParameter(O,u.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+se+`
`+Le+`
`+et)}else se!==""?console.warn("THREE.WebGLProgram: Program Info Log:",se):(ne===""||be==="")&&(Ue=!1);Ue&&(z.diagnostics={runnable:oe,programLog:se,vertexShader:{log:ne,prefix:_},fragmentShader:{log:be,prefix:d}})}u.deleteShader(q),u.deleteShader(D),W=new nl(u,O),M=zR(u,O)}let W;this.getUniforms=function(){return W===void 0&&V(this),W};let M;this.getAttributes=function(){return M===void 0&&V(this),M};let T=a.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=u.getProgramParameter(O,LR)),T},this.destroy=function(){s.releaseStatesOfProgram(this),u.deleteProgram(O),this.program=void 0},this.type=a.shaderType,this.name=a.shaderName,this.id=DR++,this.cacheKey=i,this.usedTimes=1,this.program=O,this.vertexShader=q,this.fragmentShader=D,this}let JR=0;class eA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(i){const a=i.vertexShader,s=i.fragmentShader,u=this._getShaderStage(a),f=this._getShaderStage(s),h=this._getShaderCacheForMaterial(i);return h.has(u)===!1&&(h.add(u),u.usedTimes++),h.has(f)===!1&&(h.add(f),f.usedTimes++),this}remove(i){const a=this.materialCache.get(i);for(const s of a)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(i),this}getVertexShaderID(i){return this._getShaderStage(i.vertexShader).id}getFragmentShaderID(i){return this._getShaderStage(i.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(i){const a=this.materialCache;let s=a.get(i);return s===void 0&&(s=new Set,a.set(i,s)),s}_getShaderStage(i){const a=this.shaderCache;let s=a.get(i);return s===void 0&&(s=new tA(i),a.set(i,s)),s}}class tA{constructor(i){this.id=JR++,this.code=i,this.usedTimes=0}}function nA(n,i,a,s,u,f,h){const p=new pl,m=new eA,E=new Set,y=[],x=u.logarithmicDepthBuffer,R=u.vertexTextures;let w=u.precision;const F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function O(M){return E.add(M),M===0?"uv":`uv${M}`}function _(M,T,z,j,Q){const K=j.fog,se=Q.geometry,ne=M.isMeshStandardMaterial?j.environment:null,be=(M.isMeshStandardMaterial?a:i).get(M.envMap||ne),oe=be&&be.mapping===Go?be.image.height:null,Ue=F[M.type];M.precision!==null&&(w=u.getMaxPrecision(M.precision),w!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",w,"instead."));const Le=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,et=Le!==void 0?Le.length:0;let tt=0;se.morphAttributes.position!==void 0&&(tt=1),se.morphAttributes.normal!==void 0&&(tt=2),se.morphAttributes.color!==void 0&&(tt=3);let ot,rt,dt,re;if(Ue){const At=Lr[Ue];ot=At.vertexShader,rt=At.fragmentShader}else ot=M.vertexShader,rt=M.fragmentShader,m.update(M),dt=m.getVertexShaderID(M),re=m.getFragmentShaderID(M);const ve=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),st=Q.isInstancedMesh===!0,Ye=Q.isBatchedMesh===!0,Mt=!!M.map,ln=!!M.matcap,k=!!be,Vt=!!M.aoMap,pt=!!M.lightMap,it=!!M.bumpMap,Ge=!!M.normalMap,Wt=!!M.displacementMap,We=!!M.emissiveMap,ut=!!M.metalnessMap,Xt=!!M.roughnessMap,$t=M.anisotropy>0,I=M.clearcoat>0,b=M.dispersion>0,Z=M.iridescence>0,de=M.sheen>0,he=M.transmission>0,fe=$t&&!!M.anisotropyMap,Ze=I&&!!M.clearcoatMap,Pe=I&&!!M.clearcoatNormalMap,je=I&&!!M.clearcoatRoughnessMap,Qe=Z&&!!M.iridescenceMap,Te=Z&&!!M.iridescenceThicknessMap,we=de&&!!M.sheenColorMap,Je=de&&!!M.sheenRoughnessMap,He=!!M.specularMap,Ce=!!M.specularColorMap,nt=!!M.specularIntensityMap,Y=he&&!!M.transmissionMap,J=he&&!!M.thicknessMap,Ie=!!M.gradientMap,Xe=!!M.alphaMap,Me=M.alphaTest>0,_e=!!M.alphaHash,$e=!!M.extensions;let gt=Yr;M.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(gt=n.toneMapping);const Ht={shaderID:Ue,shaderType:M.type,shaderName:M.name,vertexShader:ot,fragmentShader:rt,defines:M.defines,customVertexShaderID:dt,customFragmentShaderID:re,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:w,batching:Ye,batchingColor:Ye&&Q._colorsTexture!==null,instancing:st,instancingColor:st&&Q.instanceColor!==null,instancingMorph:st&&Q.morphTexture!==null,supportsVertexTextures:R,outputColorSpace:ve===null?n.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:oi,alphaToCoverage:!!M.alphaToCoverage,map:Mt,matcap:ln,envMap:k,envMapMode:k&&be.mapping,envMapCubeUVHeight:oe,aoMap:Vt,lightMap:pt,bumpMap:it,normalMap:Ge,displacementMap:R&&Wt,emissiveMap:We,normalMapObjectSpace:Ge&&M.normalMapType===Hv,normalMapTangentSpace:Ge&&M.normalMapType===kv,metalnessMap:ut,roughnessMap:Xt,anisotropy:$t,anisotropyMap:fe,clearcoat:I,clearcoatMap:Ze,clearcoatNormalMap:Pe,clearcoatRoughnessMap:je,dispersion:b,iridescence:Z,iridescenceMap:Qe,iridescenceThicknessMap:Te,sheen:de,sheenColorMap:we,sheenRoughnessMap:Je,specularMap:He,specularColorMap:Ce,specularIntensityMap:nt,transmission:he,transmissionMap:Y,thicknessMap:J,gradientMap:Ie,opaque:M.transparent===!1&&M.blending===Ro&&M.alphaToCoverage===!1,alphaMap:Xe,alphaTest:Me,alphaHash:_e,combine:M.combine,mapUv:Mt&&O(M.map.channel),aoMapUv:Vt&&O(M.aoMap.channel),lightMapUv:pt&&O(M.lightMap.channel),bumpMapUv:it&&O(M.bumpMap.channel),normalMapUv:Ge&&O(M.normalMap.channel),displacementMapUv:Wt&&O(M.displacementMap.channel),emissiveMapUv:We&&O(M.emissiveMap.channel),metalnessMapUv:ut&&O(M.metalnessMap.channel),roughnessMapUv:Xt&&O(M.roughnessMap.channel),anisotropyMapUv:fe&&O(M.anisotropyMap.channel),clearcoatMapUv:Ze&&O(M.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&O(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:je&&O(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Qe&&O(M.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&O(M.iridescenceThicknessMap.channel),sheenColorMapUv:we&&O(M.sheenColorMap.channel),sheenRoughnessMapUv:Je&&O(M.sheenRoughnessMap.channel),specularMapUv:He&&O(M.specularMap.channel),specularColorMapUv:Ce&&O(M.specularColorMap.channel),specularIntensityMapUv:nt&&O(M.specularIntensityMap.channel),transmissionMapUv:Y&&O(M.transmissionMap.channel),thicknessMapUv:J&&O(M.thicknessMap.channel),alphaMapUv:Xe&&O(M.alphaMap.channel),vertexTangents:!!se.attributes.tangent&&(Ge||$t),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!se.attributes.uv&&(Mt||Xe),fog:!!K,useFog:M.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:x,reversedDepthBuffer:Ne,skinning:Q.isSkinnedMesh===!0,morphTargets:se.morphAttributes.position!==void 0,morphNormals:se.morphAttributes.normal!==void 0,morphColors:se.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:tt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:gt,decodeVideoTexture:Mt&&M.map.isVideoTexture===!0&&vn.getTransfer(M.map.colorSpace)===nn,decodeVideoTextureEmissive:We&&M.emissiveMap.isVideoTexture===!0&&vn.getTransfer(M.emissiveMap.colorSpace)===nn,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===dr,flipSided:M.side===hr,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:$e&&M.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&M.extensions.multiDraw===!0||Ye)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ht.vertexUv1s=E.has(1),Ht.vertexUv2s=E.has(2),Ht.vertexUv3s=E.has(3),E.clear(),Ht}function d(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const z in M.defines)T.push(z),T.push(M.defines[z]);return M.isRawShaderMaterial===!1&&(C(T,M),N(T,M),T.push(n.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function C(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function N(M,T){p.disableAll(),T.supportsVertexTextures&&p.enable(0),T.instancing&&p.enable(1),T.instancingColor&&p.enable(2),T.instancingMorph&&p.enable(3),T.matcap&&p.enable(4),T.envMap&&p.enable(5),T.normalMapObjectSpace&&p.enable(6),T.normalMapTangentSpace&&p.enable(7),T.clearcoat&&p.enable(8),T.iridescence&&p.enable(9),T.alphaTest&&p.enable(10),T.vertexColors&&p.enable(11),T.vertexAlphas&&p.enable(12),T.vertexUv1s&&p.enable(13),T.vertexUv2s&&p.enable(14),T.vertexUv3s&&p.enable(15),T.vertexTangents&&p.enable(16),T.anisotropy&&p.enable(17),T.alphaHash&&p.enable(18),T.batching&&p.enable(19),T.dispersion&&p.enable(20),T.batchingColor&&p.enable(21),T.gradientMap&&p.enable(22),M.push(p.mask),p.disableAll(),T.fog&&p.enable(0),T.useFog&&p.enable(1),T.flatShading&&p.enable(2),T.logarithmicDepthBuffer&&p.enable(3),T.reversedDepthBuffer&&p.enable(4),T.skinning&&p.enable(5),T.morphTargets&&p.enable(6),T.morphNormals&&p.enable(7),T.morphColors&&p.enable(8),T.premultipliedAlpha&&p.enable(9),T.shadowMapEnabled&&p.enable(10),T.doubleSided&&p.enable(11),T.flipSided&&p.enable(12),T.useDepthPacking&&p.enable(13),T.dithering&&p.enable(14),T.transmission&&p.enable(15),T.sheen&&p.enable(16),T.opaque&&p.enable(17),T.pointsUvs&&p.enable(18),T.decodeVideoTexture&&p.enable(19),T.decodeVideoTextureEmissive&&p.enable(20),T.alphaToCoverage&&p.enable(21),M.push(p.mask)}function P(M){const T=F[M.type];let z;if(T){const j=Lr[T];z=Bv.clone(j.uniforms)}else z=M.uniforms;return z}function q(M,T){let z;for(let j=0,Q=y.length;j<Q;j++){const K=y[j];if(K.cacheKey===T){z=K,++z.usedTimes;break}}return z===void 0&&(z=new QR(n,T,M,f),y.push(z)),z}function D(M){if(--M.usedTimes===0){const T=y.indexOf(M);y[T]=y[y.length-1],y.pop(),M.destroy()}}function V(M){m.remove(M)}function W(){m.dispose()}return{getParameters:_,getProgramCacheKey:d,getUniforms:P,acquireProgram:q,releaseProgram:D,releaseShaderCache:V,programs:y,dispose:W}}function rA(){let n=new WeakMap;function i(h){return n.has(h)}function a(h){let p=n.get(h);return p===void 0&&(p={},n.set(h,p)),p}function s(h){n.delete(h)}function u(h,p,m){n.get(h)[p]=m}function f(){n=new WeakMap}return{has:i,get:a,remove:s,update:u,dispose:f}}function iA(n,i){return n.groupOrder!==i.groupOrder?n.groupOrder-i.groupOrder:n.renderOrder!==i.renderOrder?n.renderOrder-i.renderOrder:n.material.id!==i.material.id?n.material.id-i.material.id:n.z!==i.z?n.z-i.z:n.id-i.id}function Tm(n,i){return n.groupOrder!==i.groupOrder?n.groupOrder-i.groupOrder:n.renderOrder!==i.renderOrder?n.renderOrder-i.renderOrder:n.z!==i.z?i.z-n.z:n.id-i.id}function xm(){const n=[];let i=0;const a=[],s=[],u=[];function f(){i=0,a.length=0,s.length=0,u.length=0}function h(x,R,w,F,O,_){let d=n[i];return d===void 0?(d={id:x.id,object:x,geometry:R,material:w,groupOrder:F,renderOrder:x.renderOrder,z:O,group:_},n[i]=d):(d.id=x.id,d.object=x,d.geometry=R,d.material=w,d.groupOrder=F,d.renderOrder=x.renderOrder,d.z=O,d.group=_),i++,d}function p(x,R,w,F,O,_){const d=h(x,R,w,F,O,_);w.transmission>0?s.push(d):w.transparent===!0?u.push(d):a.push(d)}function m(x,R,w,F,O,_){const d=h(x,R,w,F,O,_);w.transmission>0?s.unshift(d):w.transparent===!0?u.unshift(d):a.unshift(d)}function E(x,R){a.length>1&&a.sort(x||iA),s.length>1&&s.sort(R||Tm),u.length>1&&u.sort(R||Tm)}function y(){for(let x=i,R=n.length;x<R;x++){const w=n[x];if(w.id===null)break;w.id=null,w.object=null,w.geometry=null,w.material=null,w.group=null}}return{opaque:a,transmissive:s,transparent:u,init:f,push:p,unshift:m,finish:y,sort:E}}function aA(){let n=new WeakMap;function i(s,u){const f=n.get(s);let h;return f===void 0?(h=new xm,n.set(s,[h])):u>=f.length?(h=new xm,f.push(h)):h=f[u],h}function a(){n=new WeakMap}return{get:i,dispose:a}}function oA(){const n={};return{get:function(i){if(n[i.id]!==void 0)return n[i.id];let a;switch(i.type){case"DirectionalLight":a={direction:new yt,color:new Zt};break;case"SpotLight":a={position:new yt,direction:new yt,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":a={position:new yt,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":a={direction:new yt,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":a={color:new Zt,position:new yt,halfWidth:new yt,halfHeight:new yt};break}return n[i.id]=a,a}}}function sA(){const n={};return{get:function(i){if(n[i.id]!==void 0)return n[i.id];let a;switch(i.type){case"DirectionalLight":a={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Hn};break;case"SpotLight":a={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Hn};break;case"PointLight":a={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Hn,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[i.id]=a,a}}}let lA=0;function uA(n,i){return(i.castShadow?2:0)-(n.castShadow?2:0)+(i.map?1:0)-(n.map?1:0)}function cA(n){const i=new oA,a=sA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let E=0;E<9;E++)s.probe.push(new yt);const u=new yt,f=new za,h=new za;function p(E){let y=0,x=0,R=0;for(let M=0;M<9;M++)s.probe[M].set(0,0,0);let w=0,F=0,O=0,_=0,d=0,C=0,N=0,P=0,q=0,D=0,V=0;E.sort(uA);for(let M=0,T=E.length;M<T;M++){const z=E[M],j=z.color,Q=z.intensity,K=z.distance,se=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)y+=j.r*Q,x+=j.g*Q,R+=j.b*Q;else if(z.isLightProbe){for(let ne=0;ne<9;ne++)s.probe[ne].addScaledVector(z.sh.coefficients[ne],Q);V++}else if(z.isDirectionalLight){const ne=i.get(z);if(ne.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const be=z.shadow,oe=a.get(z);oe.shadowIntensity=be.intensity,oe.shadowBias=be.bias,oe.shadowNormalBias=be.normalBias,oe.shadowRadius=be.radius,oe.shadowMapSize=be.mapSize,s.directionalShadow[w]=oe,s.directionalShadowMap[w]=se,s.directionalShadowMatrix[w]=z.shadow.matrix,C++}s.directional[w]=ne,w++}else if(z.isSpotLight){const ne=i.get(z);ne.position.setFromMatrixPosition(z.matrixWorld),ne.color.copy(j).multiplyScalar(Q),ne.distance=K,ne.coneCos=Math.cos(z.angle),ne.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),ne.decay=z.decay,s.spot[O]=ne;const be=z.shadow;if(z.map&&(s.spotLightMap[q]=z.map,q++,be.updateMatrices(z),z.castShadow&&D++),s.spotLightMatrix[O]=be.matrix,z.castShadow){const oe=a.get(z);oe.shadowIntensity=be.intensity,oe.shadowBias=be.bias,oe.shadowNormalBias=be.normalBias,oe.shadowRadius=be.radius,oe.shadowMapSize=be.mapSize,s.spotShadow[O]=oe,s.spotShadowMap[O]=se,P++}O++}else if(z.isRectAreaLight){const ne=i.get(z);ne.color.copy(j).multiplyScalar(Q),ne.halfWidth.set(z.width*.5,0,0),ne.halfHeight.set(0,z.height*.5,0),s.rectArea[_]=ne,_++}else if(z.isPointLight){const ne=i.get(z);if(ne.color.copy(z.color).multiplyScalar(z.intensity),ne.distance=z.distance,ne.decay=z.decay,z.castShadow){const be=z.shadow,oe=a.get(z);oe.shadowIntensity=be.intensity,oe.shadowBias=be.bias,oe.shadowNormalBias=be.normalBias,oe.shadowRadius=be.radius,oe.shadowMapSize=be.mapSize,oe.shadowCameraNear=be.camera.near,oe.shadowCameraFar=be.camera.far,s.pointShadow[F]=oe,s.pointShadowMap[F]=se,s.pointShadowMatrix[F]=z.shadow.matrix,N++}s.point[F]=ne,F++}else if(z.isHemisphereLight){const ne=i.get(z);ne.skyColor.copy(z.color).multiplyScalar(Q),ne.groundColor.copy(z.groundColor).multiplyScalar(Q),s.hemi[d]=ne,d++}}_>0&&(n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=ke.LTC_FLOAT_1,s.rectAreaLTC2=ke.LTC_FLOAT_2):(s.rectAreaLTC1=ke.LTC_HALF_1,s.rectAreaLTC2=ke.LTC_HALF_2)),s.ambient[0]=y,s.ambient[1]=x,s.ambient[2]=R;const W=s.hash;(W.directionalLength!==w||W.pointLength!==F||W.spotLength!==O||W.rectAreaLength!==_||W.hemiLength!==d||W.numDirectionalShadows!==C||W.numPointShadows!==N||W.numSpotShadows!==P||W.numSpotMaps!==q||W.numLightProbes!==V)&&(s.directional.length=w,s.spot.length=O,s.rectArea.length=_,s.point.length=F,s.hemi.length=d,s.directionalShadow.length=C,s.directionalShadowMap.length=C,s.pointShadow.length=N,s.pointShadowMap.length=N,s.spotShadow.length=P,s.spotShadowMap.length=P,s.directionalShadowMatrix.length=C,s.pointShadowMatrix.length=N,s.spotLightMatrix.length=P+q-D,s.spotLightMap.length=q,s.numSpotLightShadowsWithMaps=D,s.numLightProbes=V,W.directionalLength=w,W.pointLength=F,W.spotLength=O,W.rectAreaLength=_,W.hemiLength=d,W.numDirectionalShadows=C,W.numPointShadows=N,W.numSpotShadows=P,W.numSpotMaps=q,W.numLightProbes=V,s.version=lA++)}function m(E,y){let x=0,R=0,w=0,F=0,O=0;const _=y.matrixWorldInverse;for(let d=0,C=E.length;d<C;d++){const N=E[d];if(N.isDirectionalLight){const P=s.directional[x];P.direction.setFromMatrixPosition(N.matrixWorld),u.setFromMatrixPosition(N.target.matrixWorld),P.direction.sub(u),P.direction.transformDirection(_),x++}else if(N.isSpotLight){const P=s.spot[w];P.position.setFromMatrixPosition(N.matrixWorld),P.position.applyMatrix4(_),P.direction.setFromMatrixPosition(N.matrixWorld),u.setFromMatrixPosition(N.target.matrixWorld),P.direction.sub(u),P.direction.transformDirection(_),w++}else if(N.isRectAreaLight){const P=s.rectArea[F];P.position.setFromMatrixPosition(N.matrixWorld),P.position.applyMatrix4(_),h.identity(),f.copy(N.matrixWorld),f.premultiply(_),h.extractRotation(f),P.halfWidth.set(N.width*.5,0,0),P.halfHeight.set(0,N.height*.5,0),P.halfWidth.applyMatrix4(h),P.halfHeight.applyMatrix4(h),F++}else if(N.isPointLight){const P=s.point[R];P.position.setFromMatrixPosition(N.matrixWorld),P.position.applyMatrix4(_),R++}else if(N.isHemisphereLight){const P=s.hemi[O];P.direction.setFromMatrixPosition(N.matrixWorld),P.direction.transformDirection(_),O++}}}return{setup:p,setupView:m,state:s}}function ym(n){const i=new cA(n),a=[],s=[];function u(y){E.camera=y,a.length=0,s.length=0}function f(y){a.push(y)}function h(y){s.push(y)}function p(){i.setup(a)}function m(y){i.setupView(a,y)}const E={lightsArray:a,shadowsArray:s,camera:null,lights:i,transmissionRenderTarget:{}};return{init:u,state:E,setupLights:p,setupLightsView:m,pushLight:f,pushShadow:h}}function fA(n){let i=new WeakMap;function a(u,f=0){const h=i.get(u);let p;return h===void 0?(p=new ym(n),i.set(u,[p])):f>=h.length?(p=new ym(n),h.push(p)):p=h[f],p}function s(){i=new WeakMap}return{get:a,dispose:s}}const dA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function hA(n,i,a){let s=new wf;const u=new Hn,f=new Hn,h=new jn,p=new Pf({depthPacking:Av}),m=new Cv,E={},y=a.maxTextureSize,x={[Ga]:hr,[hr]:Ga,[dr]:dr},R=new nr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Hn},radius:{value:4}},vertexShader:dA,fragmentShader:pA}),w=R.clone();w.defines.HORIZONTAL_PASS=1;const F=new If;F.setAttribute("position",new wo(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const O=new pr(F,R),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bl;let d=this.type;this.render=function(D,V,W){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||D.length===0)return;const M=n.getRenderTarget(),T=n.getActiveCubeFace(),z=n.getActiveMipmapLevel(),j=n.state;j.setBlending(ai),j.buffers.depth.getReversed()===!0?j.buffers.color.setClear(0,0,0,0):j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const Q=d!==Ir&&this.type===Ir,K=d===Ir&&this.type!==Ir;for(let se=0,ne=D.length;se<ne;se++){const be=D[se],oe=be.shadow;if(oe===void 0){console.warn("THREE.WebGLShadowMap:",be,"has no shadow.");continue}if(oe.autoUpdate===!1&&oe.needsUpdate===!1)continue;u.copy(oe.mapSize);const Ue=oe.getFrameExtents();if(u.multiply(Ue),f.copy(oe.mapSize),(u.x>y||u.y>y)&&(u.x>y&&(f.x=Math.floor(y/Ue.x),u.x=f.x*Ue.x,oe.mapSize.x=f.x),u.y>y&&(f.y=Math.floor(y/Ue.y),u.y=f.y*Ue.y,oe.mapSize.y=f.y)),oe.map===null||Q===!0||K===!0){const et=this.type!==Ir?{minFilter:ka,magFilter:ka}:{};oe.map!==null&&oe.map.dispose(),oe.map=new Dr(u.x,u.y,et),oe.map.texture.name=be.name+".shadowMap",oe.camera.updateProjectionMatrix()}n.setRenderTarget(oe.map),n.clear();const Le=oe.getViewportCount();for(let et=0;et<Le;et++){const tt=oe.getViewport(et);h.set(f.x*tt.x,f.y*tt.y,f.x*tt.z,f.y*tt.w),j.viewport(h),oe.updateMatrices(be,et),s=oe.getFrustum(),P(V,W,oe.camera,be,this.type)}oe.isPointLightShadow!==!0&&this.type===Ir&&C(oe,W),oe.needsUpdate=!1}d=this.type,_.needsUpdate=!1,n.setRenderTarget(M,T,z)};function C(D,V){const W=i.update(O);R.defines.VSM_SAMPLES!==D.blurSamples&&(R.defines.VSM_SAMPLES=D.blurSamples,w.defines.VSM_SAMPLES=D.blurSamples,R.needsUpdate=!0,w.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new Dr(u.x,u.y)),R.uniforms.shadow_pass.value=D.map.texture,R.uniforms.resolution.value=D.mapSize,R.uniforms.radius.value=D.radius,n.setRenderTarget(D.mapPass),n.clear(),n.renderBufferDirect(V,null,W,R,O,null),w.uniforms.shadow_pass.value=D.mapPass.texture,w.uniforms.resolution.value=D.mapSize,w.uniforms.radius.value=D.radius,n.setRenderTarget(D.map),n.clear(),n.renderBufferDirect(V,null,W,w,O,null)}function N(D,V,W,M){let T=null;const z=W.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(z!==void 0)T=z;else if(T=W.isPointLight===!0?m:p,n.localClippingEnabled&&V.clipShadows===!0&&Array.isArray(V.clippingPlanes)&&V.clippingPlanes.length!==0||V.displacementMap&&V.displacementScale!==0||V.alphaMap&&V.alphaTest>0||V.map&&V.alphaTest>0||V.alphaToCoverage===!0){const j=T.uuid,Q=V.uuid;let K=E[j];K===void 0&&(K={},E[j]=K);let se=K[Q];se===void 0&&(se=T.clone(),K[Q]=se,V.addEventListener("dispose",q)),T=se}if(T.visible=V.visible,T.wireframe=V.wireframe,M===Ir?T.side=V.shadowSide!==null?V.shadowSide:V.side:T.side=V.shadowSide!==null?V.shadowSide:x[V.side],T.alphaMap=V.alphaMap,T.alphaTest=V.alphaToCoverage===!0?.5:V.alphaTest,T.map=V.map,T.clipShadows=V.clipShadows,T.clippingPlanes=V.clippingPlanes,T.clipIntersection=V.clipIntersection,T.displacementMap=V.displacementMap,T.displacementScale=V.displacementScale,T.displacementBias=V.displacementBias,T.wireframeLinewidth=V.wireframeLinewidth,T.linewidth=V.linewidth,W.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const j=n.properties.get(T);j.light=W}return T}function P(D,V,W,M,T){if(D.visible===!1)return;if(D.layers.test(V.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&T===Ir)&&(!D.frustumCulled||s.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,D.matrixWorld);const Q=i.update(D),K=D.material;if(Array.isArray(K)){const se=Q.groups;for(let ne=0,be=se.length;ne<be;ne++){const oe=se[ne],Ue=K[oe.materialIndex];if(Ue&&Ue.visible){const Le=N(D,Ue,M,T);D.onBeforeShadow(n,D,V,W,Q,Le,oe),n.renderBufferDirect(W,null,Q,Le,D,oe),D.onAfterShadow(n,D,V,W,Q,Le,oe)}}}else if(K.visible){const se=N(D,K,M,T);D.onBeforeShadow(n,D,V,W,Q,se,null),n.renderBufferDirect(W,null,Q,se,D,null),D.onAfterShadow(n,D,V,W,Q,se,null)}}const j=D.children;for(let Q=0,K=j.length;Q<K;Q++)P(j[Q],V,W,M,T)}function q(D){D.target.removeEventListener("dispose",q);for(const W in E){const M=E[W],T=D.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}const mA={[cl]:ul,[ll]:al,[sl]:il,[Uo]:ol,[ul]:cl,[al]:ll,[il]:sl,[ol]:Uo};function vA(n,i){function a(){let Y=!1;const J=new jn;let Ie=null;const Xe=new jn(0,0,0,0);return{setMask:function(Me){Ie!==Me&&!Y&&(n.colorMask(Me,Me,Me,Me),Ie=Me)},setLocked:function(Me){Y=Me},setClear:function(Me,_e,$e,gt,Ht){Ht===!0&&(Me*=gt,_e*=gt,$e*=gt),J.set(Me,_e,$e,gt),Xe.equals(J)===!1&&(n.clearColor(Me,_e,$e,gt),Xe.copy(J))},reset:function(){Y=!1,Ie=null,Xe.set(-1,0,0,0)}}}function s(){let Y=!1,J=!1,Ie=null,Xe=null,Me=null;return{setReversed:function(_e){if(J!==_e){const $e=i.get("EXT_clip_control");_e?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT),J=_e;const gt=Me;Me=null,this.setClear(gt)}},getReversed:function(){return J},setTest:function(_e){_e?ve(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(_e){Ie!==_e&&!Y&&(n.depthMask(_e),Ie=_e)},setFunc:function(_e){if(J&&(_e=mA[_e]),Xe!==_e){switch(_e){case cl:n.depthFunc(n.NEVER);break;case ul:n.depthFunc(n.ALWAYS);break;case ll:n.depthFunc(n.LESS);break;case Uo:n.depthFunc(n.LEQUAL);break;case sl:n.depthFunc(n.EQUAL);break;case ol:n.depthFunc(n.GEQUAL);break;case al:n.depthFunc(n.GREATER);break;case il:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Xe=_e}},setLocked:function(_e){Y=_e},setClear:function(_e){Me!==_e&&(J&&(_e=1-_e),n.clearDepth(_e),Me=_e)},reset:function(){Y=!1,Ie=null,Xe=null,Me=null,J=!1}}}function u(){let Y=!1,J=null,Ie=null,Xe=null,Me=null,_e=null,$e=null,gt=null,Ht=null;return{setTest:function(At){Y||(At?ve(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(At){J!==At&&!Y&&(n.stencilMask(At),J=At)},setFunc:function(At,$n,Pn){(Ie!==At||Xe!==$n||Me!==Pn)&&(n.stencilFunc(At,$n,Pn),Ie=At,Xe=$n,Me=Pn)},setOp:function(At,$n,Pn){(_e!==At||$e!==$n||gt!==Pn)&&(n.stencilOp(At,$n,Pn),_e=At,$e=$n,gt=Pn)},setLocked:function(At){Y=At},setClear:function(At){Ht!==At&&(n.clearStencil(At),Ht=At)},reset:function(){Y=!1,J=null,Ie=null,Xe=null,Me=null,_e=null,$e=null,gt=null,Ht=null}}}const f=new a,h=new s,p=new u,m=new WeakMap,E=new WeakMap;let y={},x={},R=new WeakMap,w=[],F=null,O=!1,_=null,d=null,C=null,N=null,P=null,q=null,D=null,V=new Zt(0,0,0),W=0,M=!1,T=null,z=null,j=null,Q=null,K=null;const se=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ne=!1,be=0;const oe=n.getParameter(n.VERSION);oe.indexOf("WebGL")!==-1?(be=parseFloat(/^WebGL (\d)/.exec(oe)[1]),ne=be>=1):oe.indexOf("OpenGL ES")!==-1&&(be=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),ne=be>=2);let Ue=null,Le={};const et=n.getParameter(n.SCISSOR_BOX),tt=n.getParameter(n.VIEWPORT),ot=new jn().fromArray(et),rt=new jn().fromArray(tt);function dt(Y,J,Ie,Xe){const Me=new Uint8Array(4),_e=n.createTexture();n.bindTexture(Y,_e),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let $e=0;$e<Ie;$e++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(J,0,n.RGBA,1,1,Xe,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(J+$e,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return _e}const re={};re[n.TEXTURE_2D]=dt(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=dt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=dt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=dt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),f.setClear(0,0,0,1),h.setClear(1),p.setClear(0),ve(n.DEPTH_TEST),h.setFunc(Uo),it(!1),Ge(cf),ve(n.CULL_FACE),Vt(ai);function ve(Y){y[Y]!==!0&&(n.enable(Y),y[Y]=!0)}function Ne(Y){y[Y]!==!1&&(n.disable(Y),y[Y]=!1)}function st(Y,J){return x[Y]!==J?(n.bindFramebuffer(Y,J),x[Y]=J,Y===n.DRAW_FRAMEBUFFER&&(x[n.FRAMEBUFFER]=J),Y===n.FRAMEBUFFER&&(x[n.DRAW_FRAMEBUFFER]=J),!0):!1}function Ye(Y,J){let Ie=w,Xe=!1;if(Y){Ie=R.get(J),Ie===void 0&&(Ie=[],R.set(J,Ie));const Me=Y.textures;if(Ie.length!==Me.length||Ie[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,$e=Me.length;_e<$e;_e++)Ie[_e]=n.COLOR_ATTACHMENT0+_e;Ie.length=Me.length,Xe=!0}}else Ie[0]!==n.BACK&&(Ie[0]=n.BACK,Xe=!0);Xe&&n.drawBuffers(Ie)}function Mt(Y){return F!==Y?(n.useProgram(Y),F=Y,!0):!1}const ln={[Na]:n.FUNC_ADD,[tv]:n.FUNC_SUBTRACT,[ev]:n.FUNC_REVERSE_SUBTRACT};ln[tg]=n.MIN,ln[ng]=n.MAX;const k={[vv]:n.ZERO,[mv]:n.ONE,[hv]:n.SRC_COLOR,[pv]:n.SRC_ALPHA,[dv]:n.SRC_ALPHA_SATURATE,[fv]:n.DST_COLOR,[cv]:n.DST_ALPHA,[uv]:n.ONE_MINUS_SRC_COLOR,[lv]:n.ONE_MINUS_SRC_ALPHA,[sv]:n.ONE_MINUS_DST_COLOR,[ov]:n.ONE_MINUS_DST_ALPHA,[av]:n.CONSTANT_COLOR,[iv]:n.ONE_MINUS_CONSTANT_COLOR,[rv]:n.CONSTANT_ALPHA,[nv]:n.ONE_MINUS_CONSTANT_ALPHA};function Vt(Y,J,Ie,Xe,Me,_e,$e,gt,Ht,At){if(Y===ai){O===!0&&(Ne(n.BLEND),O=!1);return}if(O===!1&&(ve(n.BLEND),O=!0),Y!==Ov){if(Y!==_||At!==M){if((d!==Na||P!==Na)&&(n.blendEquation(n.FUNC_ADD),d=Na,P=Na),At)switch(Y){case Ro:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fl:n.blendFunc(n.ONE,n.ONE);break;case df:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ff:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}else switch(Y){case Ro:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case df:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ff:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",Y);break}C=null,N=null,q=null,D=null,V.set(0,0,0),W=0,_=Y,M=At}return}Me=Me||J,_e=_e||Ie,$e=$e||Xe,(J!==d||Me!==P)&&(n.blendEquationSeparate(ln[J],ln[Me]),d=J,P=Me),(Ie!==C||Xe!==N||_e!==q||$e!==D)&&(n.blendFuncSeparate(k[Ie],k[Xe],k[_e],k[$e]),C=Ie,N=Xe,q=_e,D=$e),(gt.equals(V)===!1||Ht!==W)&&(n.blendColor(gt.r,gt.g,gt.b,Ht),V.copy(gt),W=Ht),_=Y,M=!1}function pt(Y,J){Y.side===dr?Ne(n.CULL_FACE):ve(n.CULL_FACE);let Ie=Y.side===hr;J&&(Ie=!Ie),it(Ie),Y.blending===Ro&&Y.transparent===!1?Vt(ai):Vt(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),h.setFunc(Y.depthFunc),h.setTest(Y.depthTest),h.setMask(Y.depthWrite),f.setMask(Y.colorWrite);const Xe=Y.stencilWrite;p.setTest(Xe),Xe&&(p.setMask(Y.stencilWriteMask),p.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),p.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),We(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?ve(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function it(Y){T!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),T=Y)}function Ge(Y){Y!==Nv?(ve(n.CULL_FACE),Y!==z&&(Y===cf?n.cullFace(n.BACK):Y===Fv?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),z=Y}function Wt(Y){Y!==j&&(ne&&n.lineWidth(Y),j=Y)}function We(Y,J,Ie){Y?(ve(n.POLYGON_OFFSET_FILL),(Q!==J||K!==Ie)&&(n.polygonOffset(J,Ie),Q=J,K=Ie)):Ne(n.POLYGON_OFFSET_FILL)}function ut(Y){Y?ve(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function Xt(Y){Y===void 0&&(Y=n.TEXTURE0+se-1),Ue!==Y&&(n.activeTexture(Y),Ue=Y)}function $t(Y,J,Ie){Ie===void 0&&(Ue===null?Ie=n.TEXTURE0+se-1:Ie=Ue);let Xe=Le[Ie];Xe===void 0&&(Xe={type:void 0,texture:void 0},Le[Ie]=Xe),(Xe.type!==Y||Xe.texture!==J)&&(Ue!==Ie&&(n.activeTexture(Ie),Ue=Ie),n.bindTexture(Y,J||re[Y]),Xe.type=Y,Xe.texture=J)}function I(){const Y=Le[Ue];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Z(){try{n.compressedTexImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function de(){try{n.texSubImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function he(){try{n.texSubImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function fe(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Ze(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Pe(){try{n.texStorage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function je(){try{n.texStorage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Qe(){try{n.texImage2D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function Te(){try{n.texImage3D(...arguments)}catch(Y){console.error("THREE.WebGLState:",Y)}}function we(Y){ot.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),ot.copy(Y))}function Je(Y){rt.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),rt.copy(Y))}function He(Y,J){let Ie=E.get(J);Ie===void 0&&(Ie=new WeakMap,E.set(J,Ie));let Xe=Ie.get(Y);Xe===void 0&&(Xe=n.getUniformBlockIndex(J,Y.name),Ie.set(Y,Xe))}function Ce(Y,J){const Xe=E.get(J).get(Y);m.get(J)!==Xe&&(n.uniformBlockBinding(J,Xe,Y.__bindingPointIndex),m.set(J,Xe))}function nt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),h.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),y={},Ue=null,Le={},x={},R=new WeakMap,w=[],F=null,O=!1,_=null,d=null,C=null,N=null,P=null,q=null,D=null,V=new Zt(0,0,0),W=0,M=!1,T=null,z=null,j=null,Q=null,K=null,ot.set(0,0,n.canvas.width,n.canvas.height),rt.set(0,0,n.canvas.width,n.canvas.height),f.reset(),h.reset(),p.reset()}return{buffers:{color:f,depth:h,stencil:p},enable:ve,disable:Ne,bindFramebuffer:st,drawBuffers:Ye,useProgram:Mt,setBlending:Vt,setMaterial:pt,setFlipSided:it,setCullFace:Ge,setLineWidth:Wt,setPolygonOffset:We,setScissorTest:ut,activeTexture:Xt,bindTexture:$t,unbindTexture:I,compressedTexImage2D:b,compressedTexImage3D:Z,texImage2D:Qe,texImage3D:Te,updateUBOMapping:He,uniformBlockBinding:Ce,texStorage2D:Pe,texStorage3D:je,texSubImage2D:de,texSubImage3D:he,compressedTexSubImage2D:fe,compressedTexSubImage3D:Ze,scissor:we,viewport:Je,reset:nt}}function gA(n,i,a,s,u,f,h){const p=i.has("WEBGL_multisampled_render_to_texture")?i.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),E=new Hn,y=new WeakMap;let x;const R=new WeakMap;let w=!1;try{w=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function F(I,b){return w?new OffscreenCanvas(I,b):FS("canvas")}function O(I,b,Z){let de=1;const he=$t(I);if((he.width>Z||he.height>Z)&&(de=Z/Math.max(he.width,he.height)),de<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const fe=Math.floor(de*he.width),Ze=Math.floor(de*he.height);x===void 0&&(x=F(fe,Ze));const Pe=b?F(fe,Ze):x;return Pe.width=fe,Pe.height=Ze,Pe.getContext("2d").drawImage(I,0,0,fe,Ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+fe+"x"+Ze+")."),Pe}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),I;return I}function _(I){return I.generateMipmaps}function d(I){n.generateMipmap(I)}function C(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function N(I,b,Z,de,he=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let fe=b;if(b===n.RED&&(Z===n.FLOAT&&(fe=n.R32F),Z===n.HALF_FLOAT&&(fe=n.R16F),Z===n.UNSIGNED_BYTE&&(fe=n.R8)),b===n.RED_INTEGER&&(Z===n.UNSIGNED_BYTE&&(fe=n.R8UI),Z===n.UNSIGNED_SHORT&&(fe=n.R16UI),Z===n.UNSIGNED_INT&&(fe=n.R32UI),Z===n.BYTE&&(fe=n.R8I),Z===n.SHORT&&(fe=n.R16I),Z===n.INT&&(fe=n.R32I)),b===n.RG&&(Z===n.FLOAT&&(fe=n.RG32F),Z===n.HALF_FLOAT&&(fe=n.RG16F),Z===n.UNSIGNED_BYTE&&(fe=n.RG8)),b===n.RG_INTEGER&&(Z===n.UNSIGNED_BYTE&&(fe=n.RG8UI),Z===n.UNSIGNED_SHORT&&(fe=n.RG16UI),Z===n.UNSIGNED_INT&&(fe=n.RG32UI),Z===n.BYTE&&(fe=n.RG8I),Z===n.SHORT&&(fe=n.RG16I),Z===n.INT&&(fe=n.RG32I)),b===n.RGB_INTEGER&&(Z===n.UNSIGNED_BYTE&&(fe=n.RGB8UI),Z===n.UNSIGNED_SHORT&&(fe=n.RGB16UI),Z===n.UNSIGNED_INT&&(fe=n.RGB32UI),Z===n.BYTE&&(fe=n.RGB8I),Z===n.SHORT&&(fe=n.RGB16I),Z===n.INT&&(fe=n.RGB32I)),b===n.RGBA_INTEGER&&(Z===n.UNSIGNED_BYTE&&(fe=n.RGBA8UI),Z===n.UNSIGNED_SHORT&&(fe=n.RGBA16UI),Z===n.UNSIGNED_INT&&(fe=n.RGBA32UI),Z===n.BYTE&&(fe=n.RGBA8I),Z===n.SHORT&&(fe=n.RGBA16I),Z===n.INT&&(fe=n.RGBA32I)),b===n.RGB&&(Z===n.UNSIGNED_INT_5_9_9_9_REV&&(fe=n.RGB9_E5),Z===n.UNSIGNED_INT_10F_11F_11F_REV&&(fe=n.R11F_G11F_B10F)),b===n.RGBA){const Ze=he?Xf:vn.getTransfer(de);Z===n.FLOAT&&(fe=n.RGBA32F),Z===n.HALF_FLOAT&&(fe=n.RGBA16F),Z===n.UNSIGNED_BYTE&&(fe=Ze===nn?n.SRGB8_ALPHA8:n.RGBA8),Z===n.UNSIGNED_SHORT_4_4_4_4&&(fe=n.RGBA4),Z===n.UNSIGNED_SHORT_5_5_5_1&&(fe=n.RGB5_A1)}return(fe===n.R16F||fe===n.R32F||fe===n.RG16F||fe===n.RG32F||fe===n.RGBA16F||fe===n.RGBA32F)&&i.get("EXT_color_buffer_float"),fe}function P(I,b){let Z;return I?b===null||b===Ji||b===Va?Z=n.DEPTH24_STENCIL8:b===kn?Z=n.DEPTH32F_STENCIL8:b===No&&(Z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ji||b===Va?Z=n.DEPTH_COMPONENT24:b===kn?Z=n.DEPTH_COMPONENT32F:b===No&&(Z=n.DEPTH_COMPONENT16),Z}function q(I,b){return _(I)===!0||I.isFramebufferTexture&&I.minFilter!==ka&&I.minFilter!==Bn?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function D(I){const b=I.target;b.removeEventListener("dispose",D),W(b),b.isVideoTexture&&y.delete(b)}function V(I){const b=I.target;b.removeEventListener("dispose",V),T(b)}function W(I){const b=s.get(I);if(b.__webglInit===void 0)return;const Z=I.source,de=R.get(Z);if(de){const he=de[b.__cacheKey];he.usedTimes--,he.usedTimes===0&&M(I),Object.keys(de).length===0&&R.delete(Z)}s.remove(I)}function M(I){const b=s.get(I);n.deleteTexture(b.__webglTexture);const Z=I.source,de=R.get(Z);delete de[b.__cacheKey],h.memory.textures--}function T(I){const b=s.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),s.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let de=0;de<6;de++){if(Array.isArray(b.__webglFramebuffer[de]))for(let he=0;he<b.__webglFramebuffer[de].length;he++)n.deleteFramebuffer(b.__webglFramebuffer[de][he]);else n.deleteFramebuffer(b.__webglFramebuffer[de]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[de])}else{if(Array.isArray(b.__webglFramebuffer))for(let de=0;de<b.__webglFramebuffer.length;de++)n.deleteFramebuffer(b.__webglFramebuffer[de]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let de=0;de<b.__webglColorRenderbuffer.length;de++)b.__webglColorRenderbuffer[de]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[de]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const Z=I.textures;for(let de=0,he=Z.length;de<he;de++){const fe=s.get(Z[de]);fe.__webglTexture&&(n.deleteTexture(fe.__webglTexture),h.memory.textures--),s.remove(Z[de])}s.remove(I)}let z=0;function j(){z=0}function Q(){const I=z;return I>=u.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+u.maxTextures),z+=1,I}function K(I){const b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function se(I,b){const Z=s.get(I);if(I.isVideoTexture&&ut(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&Z.__version!==I.version){const de=I.image;if(de===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(de.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(Z,I,b);return}}else I.isExternalTexture&&(Z.__webglTexture=I.sourceTexture?I.sourceTexture:null);a.bindTexture(n.TEXTURE_2D,Z.__webglTexture,n.TEXTURE0+b)}function ne(I,b){const Z=s.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Z.__version!==I.version){re(Z,I,b);return}a.bindTexture(n.TEXTURE_2D_ARRAY,Z.__webglTexture,n.TEXTURE0+b)}function be(I,b){const Z=s.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Z.__version!==I.version){re(Z,I,b);return}a.bindTexture(n.TEXTURE_3D,Z.__webglTexture,n.TEXTURE0+b)}function oe(I,b){const Z=s.get(I);if(I.version>0&&Z.__version!==I.version){ve(Z,I,b);return}a.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture,n.TEXTURE0+b)}const Ue={[_v]:n.REPEAT,[Xr]:n.CLAMP_TO_EDGE,[gv]:n.MIRRORED_REPEAT},Le={[ka]:n.NEAREST,[Sv]:n.NEAREST_MIPMAP_NEAREST,[To]:n.NEAREST_MIPMAP_LINEAR,[Bn]:n.LINEAR,[Zs]:n.LINEAR_MIPMAP_NEAREST,[Fa]:n.LINEAR_MIPMAP_LINEAR},et={[wv]:n.NEVER,[yv]:n.ALWAYS,[xv]:n.LESS,[Cf]:n.LEQUAL,[Tv]:n.EQUAL,[Mv]:n.GEQUAL,[bv]:n.GREATER,[Ev]:n.NOTEQUAL};function tt(I,b){if(b.type===kn&&i.has("OES_texture_float_linear")===!1&&(b.magFilter===Bn||b.magFilter===Zs||b.magFilter===To||b.magFilter===Fa||b.minFilter===Bn||b.minFilter===Zs||b.minFilter===To||b.minFilter===Fa)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,Ue[b.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,Ue[b.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,Ue[b.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,Le[b.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,Le[b.minFilter]),b.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,et[b.compareFunction])),i.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ka||b.minFilter!==To&&b.minFilter!==Fa||b.type===kn&&i.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||s.get(b).__currentAnisotropy){const Z=i.get("EXT_texture_filter_anisotropic");n.texParameterf(I,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,u.getMaxAnisotropy())),s.get(b).__currentAnisotropy=b.anisotropy}}}function ot(I,b){let Z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",D));const de=b.source;let he=R.get(de);he===void 0&&(he={},R.set(de,he));const fe=K(b);if(fe!==I.__cacheKey){he[fe]===void 0&&(he[fe]={texture:n.createTexture(),usedTimes:0},h.memory.textures++,Z=!0),he[fe].usedTimes++;const Ze=he[I.__cacheKey];Ze!==void 0&&(he[I.__cacheKey].usedTimes--,Ze.usedTimes===0&&M(b)),I.__cacheKey=fe,I.__webglTexture=he[fe].texture}return Z}function rt(I,b,Z){return Math.floor(Math.floor(I/Z)/b)}function dt(I,b,Z,de){const fe=I.updateRanges;if(fe.length===0)a.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,Z,de,b.data);else{fe.sort((Te,we)=>Te.start-we.start);let Ze=0;for(let Te=1;Te<fe.length;Te++){const we=fe[Ze],Je=fe[Te],He=we.start+we.count,Ce=rt(Je.start,b.width,4),nt=rt(we.start,b.width,4);Je.start<=He+1&&Ce===nt&&rt(Je.start+Je.count-1,b.width,4)===Ce?we.count=Math.max(we.count,Je.start+Je.count-we.start):(++Ze,fe[Ze]=Je)}fe.length=Ze+1;const Pe=n.getParameter(n.UNPACK_ROW_LENGTH),je=n.getParameter(n.UNPACK_SKIP_PIXELS),Qe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let Te=0,we=fe.length;Te<we;Te++){const Je=fe[Te],He=Math.floor(Je.start/4),Ce=Math.ceil(Je.count/4),nt=He%b.width,Y=Math.floor(He/b.width),J=Ce,Ie=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),n.pixelStorei(n.UNPACK_SKIP_ROWS,Y),a.texSubImage2D(n.TEXTURE_2D,0,nt,Y,J,Ie,Z,de,b.data)}I.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,Pe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,je),n.pixelStorei(n.UNPACK_SKIP_ROWS,Qe)}}function re(I,b,Z){let de=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(de=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(de=n.TEXTURE_3D);const he=ot(I,b),fe=b.source;a.bindTexture(de,I.__webglTexture,n.TEXTURE0+Z);const Ze=s.get(fe);if(fe.version!==Ze.__version||he===!0){a.activeTexture(n.TEXTURE0+Z);const Pe=vn.getPrimaries(vn.workingColorSpace),je=b.colorSpace===ji?null:vn.getPrimaries(b.colorSpace),Qe=b.colorSpace===ji||Pe===je?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);let Te=O(b.image,!1,u.maxTextureSize);Te=Xt(b,Te);const we=f.convert(b.format,b.colorSpace),Je=f.convert(b.type);let He=N(b.internalFormat,we,Je,b.colorSpace,b.isVideoTexture);tt(de,b);let Ce;const nt=b.mipmaps,Y=b.isVideoTexture!==!0,J=Ze.__version===void 0||he===!0,Ie=fe.dataReady,Xe=q(b,Te);if(b.isDepthTexture)He=P(b.format===Do,b.type),J&&(Y?a.texStorage2D(n.TEXTURE_2D,1,He,Te.width,Te.height):a.texImage2D(n.TEXTURE_2D,0,He,Te.width,Te.height,0,we,Je,null));else if(b.isDataTexture)if(nt.length>0){Y&&J&&a.texStorage2D(n.TEXTURE_2D,Xe,He,nt[0].width,nt[0].height);for(let Me=0,_e=nt.length;Me<_e;Me++)Ce=nt[Me],Y?Ie&&a.texSubImage2D(n.TEXTURE_2D,Me,0,0,Ce.width,Ce.height,we,Je,Ce.data):a.texImage2D(n.TEXTURE_2D,Me,He,Ce.width,Ce.height,0,we,Je,Ce.data);b.generateMipmaps=!1}else Y?(J&&a.texStorage2D(n.TEXTURE_2D,Xe,He,Te.width,Te.height),Ie&&dt(b,Te,we,Je)):a.texImage2D(n.TEXTURE_2D,0,He,Te.width,Te.height,0,we,Je,Te.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Y&&J&&a.texStorage3D(n.TEXTURE_2D_ARRAY,Xe,He,nt[0].width,nt[0].height,Te.depth);for(let Me=0,_e=nt.length;Me<_e;Me++)if(Ce=nt[Me],b.format!==Wn)if(we!==null)if(Y){if(Ie)if(b.layerUpdates.size>0){const $e=nm(Ce.width,Ce.height,b.format,b.type);for(const gt of b.layerUpdates){const Ht=Ce.data.subarray(gt*$e/Ce.data.BYTES_PER_ELEMENT,(gt+1)*$e/Ce.data.BYTES_PER_ELEMENT);a.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Me,0,0,gt,Ce.width,Ce.height,1,we,Ht)}b.clearLayerUpdates()}else a.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Me,0,0,0,Ce.width,Ce.height,Te.depth,we,Ce.data)}else a.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Me,He,Ce.width,Ce.height,Te.depth,0,Ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Y?Ie&&a.texSubImage3D(n.TEXTURE_2D_ARRAY,Me,0,0,0,Ce.width,Ce.height,Te.depth,we,Je,Ce.data):a.texImage3D(n.TEXTURE_2D_ARRAY,Me,He,Ce.width,Ce.height,Te.depth,0,we,Je,Ce.data)}else{Y&&J&&a.texStorage2D(n.TEXTURE_2D,Xe,He,nt[0].width,nt[0].height);for(let Me=0,_e=nt.length;Me<_e;Me++)Ce=nt[Me],b.format!==Wn?we!==null?Y?Ie&&a.compressedTexSubImage2D(n.TEXTURE_2D,Me,0,0,Ce.width,Ce.height,we,Ce.data):a.compressedTexImage2D(n.TEXTURE_2D,Me,He,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Y?Ie&&a.texSubImage2D(n.TEXTURE_2D,Me,0,0,Ce.width,Ce.height,we,Je,Ce.data):a.texImage2D(n.TEXTURE_2D,Me,He,Ce.width,Ce.height,0,we,Je,Ce.data)}else if(b.isDataArrayTexture)if(Y){if(J&&a.texStorage3D(n.TEXTURE_2D_ARRAY,Xe,He,Te.width,Te.height,Te.depth),Ie)if(b.layerUpdates.size>0){const Me=nm(Te.width,Te.height,b.format,b.type);for(const _e of b.layerUpdates){const $e=Te.data.subarray(_e*Me/Te.data.BYTES_PER_ELEMENT,(_e+1)*Me/Te.data.BYTES_PER_ELEMENT);a.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,Te.width,Te.height,1,we,Je,$e)}b.clearLayerUpdates()}else a.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Te.width,Te.height,Te.depth,we,Je,Te.data)}else a.texImage3D(n.TEXTURE_2D_ARRAY,0,He,Te.width,Te.height,Te.depth,0,we,Je,Te.data);else if(b.isData3DTexture)Y?(J&&a.texStorage3D(n.TEXTURE_3D,Xe,He,Te.width,Te.height,Te.depth),Ie&&a.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Te.width,Te.height,Te.depth,we,Je,Te.data)):a.texImage3D(n.TEXTURE_3D,0,He,Te.width,Te.height,Te.depth,0,we,Je,Te.data);else if(b.isFramebufferTexture){if(J)if(Y)a.texStorage2D(n.TEXTURE_2D,Xe,He,Te.width,Te.height);else{let Me=Te.width,_e=Te.height;for(let $e=0;$e<Xe;$e++)a.texImage2D(n.TEXTURE_2D,$e,He,Me,_e,0,we,Je,null),Me>>=1,_e>>=1}}else if(nt.length>0){if(Y&&J){const Me=$t(nt[0]);a.texStorage2D(n.TEXTURE_2D,Xe,He,Me.width,Me.height)}for(let Me=0,_e=nt.length;Me<_e;Me++)Ce=nt[Me],Y?Ie&&a.texSubImage2D(n.TEXTURE_2D,Me,0,0,we,Je,Ce):a.texImage2D(n.TEXTURE_2D,Me,He,we,Je,Ce);b.generateMipmaps=!1}else if(Y){if(J){const Me=$t(Te);a.texStorage2D(n.TEXTURE_2D,Xe,He,Me.width,Me.height)}Ie&&a.texSubImage2D(n.TEXTURE_2D,0,0,0,we,Je,Te)}else a.texImage2D(n.TEXTURE_2D,0,He,we,Je,Te);_(b)&&d(de),Ze.__version=fe.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function ve(I,b,Z){if(b.image.length!==6)return;const de=ot(I,b),he=b.source;a.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+Z);const fe=s.get(he);if(he.version!==fe.__version||de===!0){a.activeTexture(n.TEXTURE0+Z);const Ze=vn.getPrimaries(vn.workingColorSpace),Pe=b.colorSpace===ji?null:vn.getPrimaries(b.colorSpace),je=b.colorSpace===ji||Ze===Pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,je);const Qe=b.isCompressedTexture||b.image[0].isCompressedTexture,Te=b.image[0]&&b.image[0].isDataTexture,we=[];for(let _e=0;_e<6;_e++)!Qe&&!Te?we[_e]=O(b.image[_e],!0,u.maxCubemapSize):we[_e]=Te?b.image[_e].image:b.image[_e],we[_e]=Xt(b,we[_e]);const Je=we[0],He=f.convert(b.format,b.colorSpace),Ce=f.convert(b.type),nt=N(b.internalFormat,He,Ce,b.colorSpace),Y=b.isVideoTexture!==!0,J=fe.__version===void 0||de===!0,Ie=he.dataReady;let Xe=q(b,Je);tt(n.TEXTURE_CUBE_MAP,b);let Me;if(Qe){Y&&J&&a.texStorage2D(n.TEXTURE_CUBE_MAP,Xe,nt,Je.width,Je.height);for(let _e=0;_e<6;_e++){Me=we[_e].mipmaps;for(let $e=0;$e<Me.length;$e++){const gt=Me[$e];b.format!==Wn?He!==null?Y?Ie&&a.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,0,0,gt.width,gt.height,He,gt.data):a.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,nt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?Ie&&a.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,0,0,gt.width,gt.height,He,Ce,gt.data):a.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e,nt,gt.width,gt.height,0,He,Ce,gt.data)}}}else{if(Me=b.mipmaps,Y&&J){Me.length>0&&Xe++;const _e=$t(we[0]);a.texStorage2D(n.TEXTURE_CUBE_MAP,Xe,nt,_e.width,_e.height)}for(let _e=0;_e<6;_e++)if(Te){Y?Ie&&a.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,we[_e].width,we[_e].height,He,Ce,we[_e].data):a.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,nt,we[_e].width,we[_e].height,0,He,Ce,we[_e].data);for(let $e=0;$e<Me.length;$e++){const Ht=Me[$e].image[_e].image;Y?Ie&&a.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,0,0,Ht.width,Ht.height,He,Ce,Ht.data):a.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,nt,Ht.width,Ht.height,0,He,Ce,Ht.data)}}else{Y?Ie&&a.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,0,0,He,Ce,we[_e]):a.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,nt,He,Ce,we[_e]);for(let $e=0;$e<Me.length;$e++){const gt=Me[$e];Y?Ie&&a.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,0,0,He,Ce,gt.image[_e]):a.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,$e+1,nt,He,Ce,gt.image[_e])}}}_(b)&&d(n.TEXTURE_CUBE_MAP),fe.__version=he.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function Ne(I,b,Z,de,he,fe){const Ze=f.convert(Z.format,Z.colorSpace),Pe=f.convert(Z.type),je=N(Z.internalFormat,Ze,Pe,Z.colorSpace),Qe=s.get(b),Te=s.get(Z);if(Te.__renderTarget=b,!Qe.__hasExternalTextures){const we=Math.max(1,b.width>>fe),Je=Math.max(1,b.height>>fe);he===n.TEXTURE_3D||he===n.TEXTURE_2D_ARRAY?a.texImage3D(he,fe,je,we,Je,b.depth,0,Ze,Pe,null):a.texImage2D(he,fe,je,we,Je,0,Ze,Pe,null)}a.bindFramebuffer(n.FRAMEBUFFER,I),We(b)?p.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,de,he,Te.__webglTexture,0,Wt(b)):(he===n.TEXTURE_2D||he>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&he<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,de,he,Te.__webglTexture,fe),a.bindFramebuffer(n.FRAMEBUFFER,null)}function st(I,b,Z){if(n.bindRenderbuffer(n.RENDERBUFFER,I),b.depthBuffer){const de=b.depthTexture,he=de&&de.isDepthTexture?de.type:null,fe=P(b.stencilBuffer,he),Ze=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pe=Wt(b);We(b)?p.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe,fe,b.width,b.height):Z?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,fe,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,fe,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ze,n.RENDERBUFFER,I)}else{const de=b.textures;for(let he=0;he<de.length;he++){const fe=de[he],Ze=f.convert(fe.format,fe.colorSpace),Pe=f.convert(fe.type),je=N(fe.internalFormat,Ze,Pe,fe.colorSpace),Qe=Wt(b);Z&&We(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Qe,je,b.width,b.height):We(b)?p.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Qe,je,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,je,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ye(I,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(a.bindFramebuffer(n.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const de=s.get(b.depthTexture);de.__renderTarget=b,(!de.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),se(b.depthTexture,0);const he=de.__webglTexture,fe=Wt(b);if(b.depthTexture.format===El)We(b)?p.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,he,0);else if(b.depthTexture.format===Do)We(b)?p.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,he,0);else throw new Error("Unknown depthTexture format")}function Mt(I){const b=s.get(I),Z=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){const de=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),de){const he=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,de.removeEventListener("dispose",he)};de.addEventListener("dispose",he),b.__depthDisposeCallback=he}b.__boundDepthTexture=de}if(I.depthTexture&&!b.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");const de=I.texture.mipmaps;de&&de.length>0?Ye(b.__webglFramebuffer[0],I):Ye(b.__webglFramebuffer,I)}else if(Z){b.__webglDepthbuffer=[];for(let de=0;de<6;de++)if(a.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[de]),b.__webglDepthbuffer[de]===void 0)b.__webglDepthbuffer[de]=n.createRenderbuffer(),st(b.__webglDepthbuffer[de],I,!1);else{const he=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=b.__webglDepthbuffer[de];n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,fe)}}else{const de=I.texture.mipmaps;if(de&&de.length>0?a.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):a.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),st(b.__webglDepthbuffer,I,!1);else{const he=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,fe),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,fe)}}a.bindFramebuffer(n.FRAMEBUFFER,null)}function ln(I,b,Z){const de=s.get(I);b!==void 0&&Ne(de.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Z!==void 0&&Mt(I)}function k(I){const b=I.texture,Z=s.get(I),de=s.get(b);I.addEventListener("dispose",V);const he=I.textures,fe=I.isWebGLCubeRenderTarget===!0,Ze=he.length>1;if(Ze||(de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture()),de.__version=b.version,h.memory.textures++),fe){Z.__webglFramebuffer=[];for(let Pe=0;Pe<6;Pe++)if(b.mipmaps&&b.mipmaps.length>0){Z.__webglFramebuffer[Pe]=[];for(let je=0;je<b.mipmaps.length;je++)Z.__webglFramebuffer[Pe][je]=n.createFramebuffer()}else Z.__webglFramebuffer[Pe]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){Z.__webglFramebuffer=[];for(let Pe=0;Pe<b.mipmaps.length;Pe++)Z.__webglFramebuffer[Pe]=n.createFramebuffer()}else Z.__webglFramebuffer=n.createFramebuffer();if(Ze)for(let Pe=0,je=he.length;Pe<je;Pe++){const Qe=s.get(he[Pe]);Qe.__webglTexture===void 0&&(Qe.__webglTexture=n.createTexture(),h.memory.textures++)}if(I.samples>0&&We(I)===!1){Z.__webglMultisampledFramebuffer=n.createFramebuffer(),Z.__webglColorRenderbuffer=[],a.bindFramebuffer(n.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let Pe=0;Pe<he.length;Pe++){const je=he[Pe];Z.__webglColorRenderbuffer[Pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Z.__webglColorRenderbuffer[Pe]);const Qe=f.convert(je.format,je.colorSpace),Te=f.convert(je.type),we=N(je.internalFormat,Qe,Te,je.colorSpace,I.isXRRenderTarget===!0),Je=Wt(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,Je,we,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,Z.__webglColorRenderbuffer[Pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(Z.__webglDepthRenderbuffer=n.createRenderbuffer(),st(Z.__webglDepthRenderbuffer,I,!0)),a.bindFramebuffer(n.FRAMEBUFFER,null)}}if(fe){a.bindTexture(n.TEXTURE_CUBE_MAP,de.__webglTexture),tt(n.TEXTURE_CUBE_MAP,b);for(let Pe=0;Pe<6;Pe++)if(b.mipmaps&&b.mipmaps.length>0)for(let je=0;je<b.mipmaps.length;je++)Ne(Z.__webglFramebuffer[Pe][je],I,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,je);else Ne(Z.__webglFramebuffer[Pe],I,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0);_(b)&&d(n.TEXTURE_CUBE_MAP),a.unbindTexture()}else if(Ze){for(let Pe=0,je=he.length;Pe<je;Pe++){const Qe=he[Pe],Te=s.get(Qe);let we=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(we=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),a.bindTexture(we,Te.__webglTexture),tt(we,Qe),Ne(Z.__webglFramebuffer,I,Qe,n.COLOR_ATTACHMENT0+Pe,we,0),_(Qe)&&d(we)}a.unbindTexture()}else{let Pe=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Pe=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),a.bindTexture(Pe,de.__webglTexture),tt(Pe,b),b.mipmaps&&b.mipmaps.length>0)for(let je=0;je<b.mipmaps.length;je++)Ne(Z.__webglFramebuffer[je],I,b,n.COLOR_ATTACHMENT0,Pe,je);else Ne(Z.__webglFramebuffer,I,b,n.COLOR_ATTACHMENT0,Pe,0);_(b)&&d(Pe),a.unbindTexture()}I.depthBuffer&&Mt(I)}function Vt(I){const b=I.textures;for(let Z=0,de=b.length;Z<de;Z++){const he=b[Z];if(_(he)){const fe=C(I),Ze=s.get(he).__webglTexture;a.bindTexture(fe,Ze),d(fe),a.unbindTexture()}}}const pt=[],it=[];function Ge(I){if(I.samples>0){if(We(I)===!1){const b=I.textures,Z=I.width,de=I.height;let he=n.COLOR_BUFFER_BIT;const fe=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ze=s.get(I),Pe=b.length>1;if(Pe)for(let Qe=0;Qe<b.length;Qe++)a.bindFramebuffer(n.FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Qe,n.RENDERBUFFER,null),a.bindFramebuffer(n.FRAMEBUFFER,Ze.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Qe,n.TEXTURE_2D,null,0);a.bindFramebuffer(n.READ_FRAMEBUFFER,Ze.__webglMultisampledFramebuffer);const je=I.texture.mipmaps;je&&je.length>0?a.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ze.__webglFramebuffer[0]):a.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ze.__webglFramebuffer);for(let Qe=0;Qe<b.length;Qe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(he|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(he|=n.STENCIL_BUFFER_BIT)),Pe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ze.__webglColorRenderbuffer[Qe]);const Te=s.get(b[Qe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Te,0)}n.blitFramebuffer(0,0,Z,de,0,0,Z,de,he,n.NEAREST),m===!0&&(pt.length=0,it.length=0,pt.push(n.COLOR_ATTACHMENT0+Qe),I.depthBuffer&&I.resolveDepthBuffer===!1&&(pt.push(fe),it.push(fe),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,it)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,pt))}if(a.bindFramebuffer(n.READ_FRAMEBUFFER,null),a.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Pe)for(let Qe=0;Qe<b.length;Qe++){a.bindFramebuffer(n.FRAMEBUFFER,Ze.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Qe,n.RENDERBUFFER,Ze.__webglColorRenderbuffer[Qe]);const Te=s.get(b[Qe]).__webglTexture;a.bindFramebuffer(n.FRAMEBUFFER,Ze.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Qe,n.TEXTURE_2D,Te,0)}a.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ze.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&m){const b=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Wt(I){return Math.min(u.maxSamples,I.samples)}function We(I){const b=s.get(I);return I.samples>0&&i.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ut(I){const b=h.render.frame;y.get(I)!==b&&(y.set(I,b),I.update())}function Xt(I,b){const Z=I.colorSpace,de=I.format,he=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Z!==oi&&Z!==ji&&(vn.getTransfer(Z)===nn?(de!==Wn||he!==xr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),b}function $t(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(E.width=I.naturalWidth||I.width,E.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(E.width=I.displayWidth,E.height=I.displayHeight):(E.width=I.width,E.height=I.height),E}this.allocateTextureUnit=Q,this.resetTextureUnits=j,this.setTexture2D=se,this.setTexture2DArray=ne,this.setTexture3D=be,this.setTextureCube=oe,this.rebindTextures=ln,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=We}function gg(n,i){function a(s,u=ji){let f;const h=vn.getTransfer(u);if(s===xr)return n.UNSIGNED_BYTE;if(s===Lf)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Df)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Pv)return n.UNSIGNED_INT_5_9_9_9_REV;if(s===Iv)return n.UNSIGNED_INT_10F_11F_11F_REV;if(s===Nf)return n.BYTE;if(s===Ff)return n.SHORT;if(s===No)return n.UNSIGNED_SHORT;if(s===Ml)return n.INT;if(s===Ji)return n.UNSIGNED_INT;if(s===kn)return n.FLOAT;if(s===On)return n.HALF_FLOAT;if(s===Lv)return n.ALPHA;if(s===Dv)return n.RGB;if(s===Wn)return n.RGBA;if(s===El)return n.DEPTH_COMPONENT;if(s===Do)return n.DEPTH_STENCIL;if(s===Of)return n.RED;if(s===Bf)return n.RED_INTEGER;if(s===Uv)return n.RG;if(s===kf)return n.RG_INTEGER;if(s===Hf)return n.RGBA_INTEGER;if(s===Qs||s===Js||s===el||s===tl)if(h===nn)if(f=i.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===Qs)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Js)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===el)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===tl)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=i.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===Qs)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Js)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===el)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===tl)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Nc||s===Fc||s===Oc||s===Bc)if(f=i.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===Nc)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Fc)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Oc)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Bc)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===kc||s===Hc||s===zc)if(f=i.get("WEBGL_compressed_texture_etc"),f!==null){if(s===kc||s===Hc)return h===nn?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===zc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Gc||s===Vc||s===Wc||s===Xc||s===qc||s===Yc||s===jc||s===$c||s===Kc||s===Zc||s===Qc||s===Jc||s===ef||s===tf)if(f=i.get("WEBGL_compressed_texture_astc"),f!==null){if(s===Gc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Vc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Wc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Xc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===qc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Yc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===jc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===$c)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Kc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Zc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Qc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Jc)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===ef)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===tf)return h===nn?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===nf||s===rf||s===af)if(f=i.get("EXT_texture_compression_bptc"),f!==null){if(s===nf)return h===nn?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===rf)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===af)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===of||s===sf||s===lf||s===uf)if(f=i.get("EXT_texture_compression_rgtc"),f!==null){if(s===of)return f.COMPRESSED_RED_RGTC1_EXT;if(s===sf)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===lf)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===uf)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Va?n.UNSIGNED_INT_24_8:n[s]!==void 0?n[s]:null}return{convert:a}}const _A=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class EA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(i,a){if(this.texture===null){const s=new Uf(i.texture);(i.depthNear!==a.depthNear||i.depthFar!==a.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=s}}getMesh(i){if(this.texture!==null&&this.mesh===null){const a=i.cameras[0].viewport,s=new nr({vertexShader:_A,fragmentShader:SA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:a.z},depthHeight:{value:a.w}}});this.mesh=new pr(new qa(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bA extends Qm{constructor(i,a){super();const s=this;let u=null,f=1,h=null,p="local-floor",m=1,E=null,y=null,x=null,R=null,w=null,F=null;const O=typeof XRWebGLBinding<"u",_=new EA,d={},C=a.getContextAttributes();let N=null,P=null;const q=[],D=[],V=new Hn;let W=null;const M=new Ba;M.viewport=new jn;const T=new Ba;T.viewport=new jn;const z=[M,T],j=new Jm;let Q=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ve=q[re];return ve===void 0&&(ve=new Ks,q[re]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(re){let ve=q[re];return ve===void 0&&(ve=new Ks,q[re]=ve),ve.getGripSpace()},this.getHand=function(re){let ve=q[re];return ve===void 0&&(ve=new Ks,q[re]=ve),ve.getHandSpace()};function se(re){const ve=D.indexOf(re.inputSource);if(ve===-1)return;const Ne=q[ve];Ne!==void 0&&(Ne.update(re.inputSource,re.frame,E||h),Ne.dispatchEvent({type:re.type,data:re.inputSource}))}function ne(){u.removeEventListener("select",se),u.removeEventListener("selectstart",se),u.removeEventListener("selectend",se),u.removeEventListener("squeeze",se),u.removeEventListener("squeezestart",se),u.removeEventListener("squeezeend",se),u.removeEventListener("end",ne),u.removeEventListener("inputsourceschange",be);for(let re=0;re<q.length;re++){const ve=D[re];ve!==null&&(D[re]=null,q[re].disconnect(ve))}Q=null,K=null,_.reset();for(const re in d)delete d[re];i.setRenderTarget(N),w=null,R=null,x=null,u=null,P=null,dt.stop(),s.isPresenting=!1,i.setPixelRatio(W),i.setSize(V.width,V.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){f=re,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){p=re,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return E||h},this.setReferenceSpace=function(re){E=re},this.getBaseLayer=function(){return R!==null?R:w},this.getBinding=function(){return x===null&&O&&(x=new XRWebGLBinding(u,a)),x},this.getFrame=function(){return F},this.getSession=function(){return u},this.setSession=async function(re){if(u=re,u!==null){if(N=i.getRenderTarget(),u.addEventListener("select",se),u.addEventListener("selectstart",se),u.addEventListener("selectend",se),u.addEventListener("squeeze",se),u.addEventListener("squeezestart",se),u.addEventListener("squeezeend",se),u.addEventListener("end",ne),u.addEventListener("inputsourceschange",be),C.xrCompatible!==!0&&await a.makeXRCompatible(),W=i.getPixelRatio(),i.getSize(V),O&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ne=null,st=null,Ye=null;C.depth&&(Ye=C.stencil?a.DEPTH24_STENCIL8:a.DEPTH_COMPONENT24,Ne=C.stencil?Do:El,st=C.stencil?Va:Ji);const Mt={colorFormat:a.RGBA8,depthFormat:Ye,scaleFactor:f};x=this.getBinding(),R=x.createProjectionLayer(Mt),u.updateRenderState({layers:[R]}),i.setPixelRatio(1),i.setSize(R.textureWidth,R.textureHeight,!1),P=new Dr(R.textureWidth,R.textureHeight,{format:Wn,type:xr,depthTexture:new Af(R.textureWidth,R.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,Ne),stencilBuffer:C.stencil,colorSpace:i.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:R.ignoreDepthValues===!1,resolveStencilBuffer:R.ignoreDepthValues===!1})}else{const Ne={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:f};w=new XRWebGLLayer(u,a,Ne),u.updateRenderState({baseLayer:w}),i.setPixelRatio(1),i.setSize(w.framebufferWidth,w.framebufferHeight,!1),P=new Dr(w.framebufferWidth,w.framebufferHeight,{format:Wn,type:xr,colorSpace:i.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:w.ignoreDepthValues===!1,resolveStencilBuffer:w.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(m),E=null,h=await u.requestReferenceSpace(p),dt.setContext(u),dt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(u!==null)return u.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function be(re){for(let ve=0;ve<re.removed.length;ve++){const Ne=re.removed[ve],st=D.indexOf(Ne);st>=0&&(D[st]=null,q[st].disconnect(Ne))}for(let ve=0;ve<re.added.length;ve++){const Ne=re.added[ve];let st=D.indexOf(Ne);if(st===-1){for(let Mt=0;Mt<q.length;Mt++)if(Mt>=D.length){D.push(Ne),st=Mt;break}else if(D[Mt]===null){D[Mt]=Ne,st=Mt;break}if(st===-1)break}const Ye=q[st];Ye&&Ye.connect(Ne)}}const oe=new yt,Ue=new yt;function Le(re,ve,Ne){oe.setFromMatrixPosition(ve.matrixWorld),Ue.setFromMatrixPosition(Ne.matrixWorld);const st=oe.distanceTo(Ue),Ye=ve.projectionMatrix.elements,Mt=Ne.projectionMatrix.elements,ln=Ye[14]/(Ye[10]-1),k=Ye[14]/(Ye[10]+1),Vt=(Ye[9]+1)/Ye[5],pt=(Ye[9]-1)/Ye[5],it=(Ye[8]-1)/Ye[0],Ge=(Mt[8]+1)/Mt[0],Wt=ln*it,We=ln*Ge,ut=st/(-it+Ge),Xt=ut*-it;if(ve.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Xt),re.translateZ(ut),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),Ye[10]===-1)re.projectionMatrix.copy(ve.projectionMatrix),re.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const $t=ln+ut,I=k+ut,b=Wt-Xt,Z=We+(st-Xt),de=Vt*k/I*$t,he=pt*k/I*$t;re.projectionMatrix.makePerspective(b,Z,de,he,$t,I),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function et(re,ve){ve===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ve.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(u===null)return;let ve=re.near,Ne=re.far;_.texture!==null&&(_.depthNear>0&&(ve=_.depthNear),_.depthFar>0&&(Ne=_.depthFar)),j.near=T.near=M.near=ve,j.far=T.far=M.far=Ne,(Q!==j.near||K!==j.far)&&(u.updateRenderState({depthNear:j.near,depthFar:j.far}),Q=j.near,K=j.far),j.layers.mask=re.layers.mask|6,M.layers.mask=j.layers.mask&3,T.layers.mask=j.layers.mask&5;const st=re.parent,Ye=j.cameras;et(j,st);for(let Mt=0;Mt<Ye.length;Mt++)et(Ye[Mt],st);Ye.length===2?Le(j,M,T):j.projectionMatrix.copy(M.projectionMatrix),tt(re,j,st)};function tt(re,ve,Ne){Ne===null?re.matrix.copy(ve.matrixWorld):(re.matrix.copy(Ne.matrixWorld),re.matrix.invert(),re.matrix.multiply(ve.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(ve.projectionMatrix),re.projectionMatrixInverse.copy(ve.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=US*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(!(R===null&&w===null))return m},this.setFoveation=function(re){m=re,R!==null&&(R.fixedFoveation=re),w!==null&&w.fixedFoveation!==void 0&&(w.fixedFoveation=re)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(re){return d[re]};let ot=null;function rt(re,ve){if(y=ve.getViewerPose(E||h),F=ve,y!==null){const Ne=y.views;w!==null&&(i.setRenderTargetFramebuffer(P,w.framebuffer),i.setRenderTarget(P));let st=!1;Ne.length!==j.cameras.length&&(j.cameras.length=0,st=!0);for(let k=0;k<Ne.length;k++){const Vt=Ne[k];let pt=null;if(w!==null)pt=w.getViewport(Vt);else{const Ge=x.getViewSubImage(R,Vt);pt=Ge.viewport,k===0&&(i.setRenderTargetTextures(P,Ge.colorTexture,Ge.depthStencilTexture),i.setRenderTarget(P))}let it=z[k];it===void 0&&(it=new Ba,it.layers.enable(k),it.viewport=new jn,z[k]=it),it.matrix.fromArray(Vt.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Vt.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(pt.x,pt.y,pt.width,pt.height),k===0&&(j.matrix.copy(it.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),st===!0&&j.cameras.push(it)}const Ye=u.enabledFeatures;if(Ye&&Ye.includes("depth-sensing")&&u.depthUsage=="gpu-optimized"&&O){x=s.getBinding();const k=x.getDepthInformation(Ne[0]);k&&k.isValid&&k.texture&&_.init(k,u.renderState)}if(Ye&&Ye.includes("camera-access")&&O){i.state.unbindTexture(),x=s.getBinding();for(let k=0;k<Ne.length;k++){const Vt=Ne[k].camera;if(Vt){let pt=d[Vt];pt||(pt=new Uf,d[Vt]=pt);const it=x.getCameraImage(Vt);pt.sourceTexture=it}}}}for(let Ne=0;Ne<q.length;Ne++){const st=D[Ne],Ye=q[Ne];st!==null&&Ye!==void 0&&Ye.update(st,ve,E||h)}ot&&ot(re,ve),ve.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ve}),F=null}const dt=new dg;dt.setAnimationLoop(rt),this.setAnimationLoop=function(re){ot=re},this.dispose=function(){}}}const Xi=new Wf,MA=new za;function TA(n,i){function a(_,d){_.matrixAutoUpdate===!0&&_.updateMatrix(),d.value.copy(_.matrix)}function s(_,d){d.color.getRGB(_.fogColor.value,zv(n)),d.isFog?(_.fogNear.value=d.near,_.fogFar.value=d.far):d.isFogExp2&&(_.fogDensity.value=d.density)}function u(_,d,C,N,P){d.isMeshBasicMaterial||d.isMeshLambertMaterial?f(_,d):d.isMeshToonMaterial?(f(_,d),x(_,d)):d.isMeshPhongMaterial?(f(_,d),y(_,d)):d.isMeshStandardMaterial?(f(_,d),R(_,d),d.isMeshPhysicalMaterial&&w(_,d,P)):d.isMeshMatcapMaterial?(f(_,d),F(_,d)):d.isMeshDepthMaterial?f(_,d):d.isMeshDistanceMaterial?(f(_,d),O(_,d)):d.isMeshNormalMaterial?f(_,d):d.isLineBasicMaterial?(h(_,d),d.isLineDashedMaterial&&p(_,d)):d.isPointsMaterial?m(_,d,C,N):d.isSpriteMaterial?E(_,d):d.isShadowMaterial?(_.color.value.copy(d.color),_.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function f(_,d){_.opacity.value=d.opacity,d.color&&_.diffuse.value.copy(d.color),d.emissive&&_.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(_.map.value=d.map,a(d.map,_.mapTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,a(d.alphaMap,_.alphaMapTransform)),d.bumpMap&&(_.bumpMap.value=d.bumpMap,a(d.bumpMap,_.bumpMapTransform),_.bumpScale.value=d.bumpScale,d.side===hr&&(_.bumpScale.value*=-1)),d.normalMap&&(_.normalMap.value=d.normalMap,a(d.normalMap,_.normalMapTransform),_.normalScale.value.copy(d.normalScale),d.side===hr&&_.normalScale.value.negate()),d.displacementMap&&(_.displacementMap.value=d.displacementMap,a(d.displacementMap,_.displacementMapTransform),_.displacementScale.value=d.displacementScale,_.displacementBias.value=d.displacementBias),d.emissiveMap&&(_.emissiveMap.value=d.emissiveMap,a(d.emissiveMap,_.emissiveMapTransform)),d.specularMap&&(_.specularMap.value=d.specularMap,a(d.specularMap,_.specularMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest);const C=i.get(d),N=C.envMap,P=C.envMapRotation;N&&(_.envMap.value=N,Xi.copy(P),Xi.x*=-1,Xi.y*=-1,Xi.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Xi.y*=-1,Xi.z*=-1),_.envMapRotation.value.setFromMatrix4(MA.makeRotationFromEuler(Xi)),_.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=d.reflectivity,_.ior.value=d.ior,_.refractionRatio.value=d.refractionRatio),d.lightMap&&(_.lightMap.value=d.lightMap,_.lightMapIntensity.value=d.lightMapIntensity,a(d.lightMap,_.lightMapTransform)),d.aoMap&&(_.aoMap.value=d.aoMap,_.aoMapIntensity.value=d.aoMapIntensity,a(d.aoMap,_.aoMapTransform))}function h(_,d){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,d.map&&(_.map.value=d.map,a(d.map,_.mapTransform))}function p(_,d){_.dashSize.value=d.dashSize,_.totalSize.value=d.dashSize+d.gapSize,_.scale.value=d.scale}function m(_,d,C,N){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,_.size.value=d.size*C,_.scale.value=N*.5,d.map&&(_.map.value=d.map,a(d.map,_.uvTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,a(d.alphaMap,_.alphaMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest)}function E(_,d){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,_.rotation.value=d.rotation,d.map&&(_.map.value=d.map,a(d.map,_.mapTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,a(d.alphaMap,_.alphaMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest)}function y(_,d){_.specular.value.copy(d.specular),_.shininess.value=Math.max(d.shininess,1e-4)}function x(_,d){d.gradientMap&&(_.gradientMap.value=d.gradientMap)}function R(_,d){_.metalness.value=d.metalness,d.metalnessMap&&(_.metalnessMap.value=d.metalnessMap,a(d.metalnessMap,_.metalnessMapTransform)),_.roughness.value=d.roughness,d.roughnessMap&&(_.roughnessMap.value=d.roughnessMap,a(d.roughnessMap,_.roughnessMapTransform)),d.envMap&&(_.envMapIntensity.value=d.envMapIntensity)}function w(_,d,C){_.ior.value=d.ior,d.sheen>0&&(_.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),_.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(_.sheenColorMap.value=d.sheenColorMap,a(d.sheenColorMap,_.sheenColorMapTransform)),d.sheenRoughnessMap&&(_.sheenRoughnessMap.value=d.sheenRoughnessMap,a(d.sheenRoughnessMap,_.sheenRoughnessMapTransform))),d.clearcoat>0&&(_.clearcoat.value=d.clearcoat,_.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(_.clearcoatMap.value=d.clearcoatMap,a(d.clearcoatMap,_.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,a(d.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(_.clearcoatNormalMap.value=d.clearcoatNormalMap,a(d.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===hr&&_.clearcoatNormalScale.value.negate())),d.dispersion>0&&(_.dispersion.value=d.dispersion),d.iridescence>0&&(_.iridescence.value=d.iridescence,_.iridescenceIOR.value=d.iridescenceIOR,_.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(_.iridescenceMap.value=d.iridescenceMap,a(d.iridescenceMap,_.iridescenceMapTransform)),d.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=d.iridescenceThicknessMap,a(d.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),d.transmission>0&&(_.transmission.value=d.transmission,_.transmissionSamplerMap.value=C.texture,_.transmissionSamplerSize.value.set(C.width,C.height),d.transmissionMap&&(_.transmissionMap.value=d.transmissionMap,a(d.transmissionMap,_.transmissionMapTransform)),_.thickness.value=d.thickness,d.thicknessMap&&(_.thicknessMap.value=d.thicknessMap,a(d.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=d.attenuationDistance,_.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(_.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(_.anisotropyMap.value=d.anisotropyMap,a(d.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=d.specularIntensity,_.specularColor.value.copy(d.specularColor),d.specularColorMap&&(_.specularColorMap.value=d.specularColorMap,a(d.specularColorMap,_.specularColorMapTransform)),d.specularIntensityMap&&(_.specularIntensityMap.value=d.specularIntensityMap,a(d.specularIntensityMap,_.specularIntensityMapTransform))}function F(_,d){d.matcap&&(_.matcap.value=d.matcap)}function O(_,d){const C=i.get(d).light;_.referencePosition.value.setFromMatrixPosition(C.matrixWorld),_.nearDistance.value=C.shadow.camera.near,_.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:u}}function xA(n,i,a,s){let u={},f={},h=[];const p=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function m(C,N){const P=N.program;s.uniformBlockBinding(C,P)}function E(C,N){let P=u[C.id];P===void 0&&(F(C),P=y(C),u[C.id]=P,C.addEventListener("dispose",_));const q=N.program;s.updateUBOMapping(C,q);const D=i.render.frame;f[C.id]!==D&&(R(C),f[C.id]=D)}function y(C){const N=x();C.__bindingPointIndex=N;const P=n.createBuffer(),q=C.__size,D=C.usage;return n.bindBuffer(n.UNIFORM_BUFFER,P),n.bufferData(n.UNIFORM_BUFFER,q,D),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,N,P),P}function x(){for(let C=0;C<p;C++)if(h.indexOf(C)===-1)return h.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function R(C){const N=u[C.id],P=C.uniforms,q=C.__cache;n.bindBuffer(n.UNIFORM_BUFFER,N);for(let D=0,V=P.length;D<V;D++){const W=Array.isArray(P[D])?P[D]:[P[D]];for(let M=0,T=W.length;M<T;M++){const z=W[M];if(w(z,D,M,q)===!0){const j=z.__offset,Q=Array.isArray(z.value)?z.value:[z.value];let K=0;for(let se=0;se<Q.length;se++){const ne=Q[se],be=O(ne);typeof ne=="number"||typeof ne=="boolean"?(z.__data[0]=ne,n.bufferSubData(n.UNIFORM_BUFFER,j+K,z.__data)):ne.isMatrix3?(z.__data[0]=ne.elements[0],z.__data[1]=ne.elements[1],z.__data[2]=ne.elements[2],z.__data[3]=0,z.__data[4]=ne.elements[3],z.__data[5]=ne.elements[4],z.__data[6]=ne.elements[5],z.__data[7]=0,z.__data[8]=ne.elements[6],z.__data[9]=ne.elements[7],z.__data[10]=ne.elements[8],z.__data[11]=0):(ne.toArray(z.__data,K),K+=be.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,j,z.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function w(C,N,P,q){const D=C.value,V=N+"_"+P;if(q[V]===void 0)return typeof D=="number"||typeof D=="boolean"?q[V]=D:q[V]=D.clone(),!0;{const W=q[V];if(typeof D=="number"||typeof D=="boolean"){if(W!==D)return q[V]=D,!0}else if(W.equals(D)===!1)return W.copy(D),!0}return!1}function F(C){const N=C.uniforms;let P=0;const q=16;for(let V=0,W=N.length;V<W;V++){const M=Array.isArray(N[V])?N[V]:[N[V]];for(let T=0,z=M.length;T<z;T++){const j=M[T],Q=Array.isArray(j.value)?j.value:[j.value];for(let K=0,se=Q.length;K<se;K++){const ne=Q[K],be=O(ne),oe=P%q,Ue=oe%be.boundary,Le=oe+Ue;P+=Ue,Le!==0&&q-Le<be.storage&&(P+=q-Le),j.__data=new Float32Array(be.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=P,P+=be.storage}}}const D=P%q;return D>0&&(P+=q-D),C.__size=P,C.__cache={},this}function O(C){const N={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(N.boundary=4,N.storage=4):C.isVector2?(N.boundary=8,N.storage=8):C.isVector3||C.isColor?(N.boundary=16,N.storage=12):C.isVector4?(N.boundary=16,N.storage=16):C.isMatrix3?(N.boundary=48,N.storage=48):C.isMatrix4?(N.boundary=64,N.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),N}function _(C){const N=C.target;N.removeEventListener("dispose",_);const P=h.indexOf(N.__bindingPointIndex);h.splice(P,1),n.deleteBuffer(u[N.id]),delete u[N.id],delete f[N.id]}function d(){for(const C in u)n.deleteBuffer(u[C]);h=[],u={},f={}}return{bind:m,update:E,dispose:d}}class Zf{constructor(i={}){const{canvas:a=Zm(),context:s=null,depth:u=!0,stencil:f=!1,alpha:h=!1,antialias:p=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:E=!1,powerPreference:y="default",failIfMajorPerformanceCaveat:x=!1,reversedDepthBuffer:R=!1}=i;this.isWebGLRenderer=!0;let w;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");w=s.getContextAttributes().alpha}else w=h;const F=new Uint32Array(4),O=new Int32Array(4);let _=null,d=null;const C=[],N=[];this.domElement=a,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let q=!1;this._outputColorSpace=zo;let D=0,V=0,W=null,M=-1,T=null;const z=new jn,j=new jn;let Q=null;const K=new Zt(0);let se=0,ne=a.width,be=a.height,oe=1,Ue=null,Le=null;const et=new jn(0,0,ne,be),tt=new jn(0,0,ne,be);let ot=!1;const rt=new wf;let dt=!1,re=!1;const ve=new za,Ne=new yt,st=new jn,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function ln(){return W===null?oe:1}let k=s;function Vt(v,L){return a.getContext(v,L)}try{const v={alpha:!0,depth:u,stencil:f,antialias:p,premultipliedAlpha:m,preserveDrawingBuffer:E,powerPreference:y,failIfMajorPerformanceCaveat:x};if("setAttribute"in a&&a.setAttribute("data-engine",`three.js r${Rf}`),a.addEventListener("webglcontextlost",Ie,!1),a.addEventListener("webglcontextrestored",Xe,!1),a.addEventListener("webglcontextcreationerror",Me,!1),k===null){const L="webgl2";if(k=Vt(L,v),k===null)throw Vt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let pt,it,Ge,Wt,We,ut,Xt,$t,I,b,Z,de,he,fe,Ze,Pe,je,Qe,Te,we,Je,He,Ce,nt;function Y(){pt=new Fw(k),pt.init(),He=new gg(k,pt),it=new Cw(k,pt,i,He),Ge=new vA(k,pt),it.reversedDepthBuffer&&R&&Ge.buffers.depth.setReversed(!0),Wt=new kw(k),We=new rA,ut=new gA(k,pt,Ge,We,it,He,Wt),Xt=new Iw(P),$t=new Nw(P),I=new XT(k),Ce=new Rw(k,I),b=new Ow(k,I,Wt,Ce),Z=new zw(k,b,I,Wt),Te=new Hw(k,it,ut),Pe=new Pw(We),de=new nA(P,Xt,$t,pt,it,Ce,Pe),he=new TA(P,We),fe=new aA,Ze=new fA(pt),Qe=new ww(P,Xt,$t,Ge,Z,w,m),je=new hA(P,Z,it),nt=new xA(k,Wt,it,Ge),we=new Aw(k,pt,Wt),Je=new Bw(k,pt,Wt),Wt.programs=de.programs,P.capabilities=it,P.extensions=pt,P.properties=We,P.renderLists=fe,P.shadowMap=je,P.state=Ge,P.info=Wt}Y();const J=new bA(P,k);this.xr=J,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const v=pt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=pt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(v){v!==void 0&&(oe=v,this.setSize(ne,be,!1))},this.getSize=function(v){return v.set(ne,be)},this.setSize=function(v,L,H=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ne=v,be=L,a.width=Math.floor(v*oe),a.height=Math.floor(L*oe),H===!0&&(a.style.width=v+"px",a.style.height=L+"px"),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(ne*oe,be*oe).floor()},this.setDrawingBufferSize=function(v,L,H){ne=v,be=L,oe=H,a.width=Math.floor(v*H),a.height=Math.floor(L*H),this.setViewport(0,0,v,L)},this.getCurrentViewport=function(v){return v.copy(z)},this.getViewport=function(v){return v.copy(et)},this.setViewport=function(v,L,H,G){v.isVector4?et.set(v.x,v.y,v.z,v.w):et.set(v,L,H,G),Ge.viewport(z.copy(et).multiplyScalar(oe).round())},this.getScissor=function(v){return v.copy(tt)},this.setScissor=function(v,L,H,G){v.isVector4?tt.set(v.x,v.y,v.z,v.w):tt.set(v,L,H,G),Ge.scissor(j.copy(tt).multiplyScalar(oe).round())},this.getScissorTest=function(){return ot},this.setScissorTest=function(v){Ge.setScissorTest(ot=v)},this.setOpaqueSort=function(v){Ue=v},this.setTransparentSort=function(v){Le=v},this.getClearColor=function(v){return v.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,H=!0){let G=0;if(v){let U=!1;if(W!==null){const pe=W.texture.format;U=pe===Hf||pe===kf||pe===Bf}if(U){const pe=W.texture.type,ue=pe===xr||pe===Ji||pe===No||pe===Va||pe===Lf||pe===Df,me=Qe.getClearColor(),Ee=Qe.getClearAlpha(),Re=me.r,Oe=me.g,De=me.b;ue?(F[0]=Re,F[1]=Oe,F[2]=De,F[3]=Ee,k.clearBufferuiv(k.COLOR,0,F)):(O[0]=Re,O[1]=Oe,O[2]=De,O[3]=Ee,k.clearBufferiv(k.COLOR,0,O))}else G|=k.COLOR_BUFFER_BIT}L&&(G|=k.DEPTH_BUFFER_BIT),H&&(G|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){a.removeEventListener("webglcontextlost",Ie,!1),a.removeEventListener("webglcontextrestored",Xe,!1),a.removeEventListener("webglcontextcreationerror",Me,!1),Qe.dispose(),fe.dispose(),Ze.dispose(),We.dispose(),Xt.dispose(),$t.dispose(),Z.dispose(),Ce.dispose(),nt.dispose(),de.dispose(),J.dispose(),J.removeEventListener("sessionstart",Pn),J.removeEventListener("sessionend",Ri),mr.stop()};function Ie(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Xe(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const v=Wt.autoReset,L=je.enabled,H=je.autoUpdate,G=je.needsUpdate,U=je.type;Y(),Wt.autoReset=v,je.enabled=L,je.autoUpdate=H,je.needsUpdate=G,je.type=U}function Me(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function _e(v){const L=v.target;L.removeEventListener("dispose",_e),$e(L)}function $e(v){gt(v),We.remove(v)}function gt(v){const L=We.get(v).programs;L!==void 0&&(L.forEach(function(H){de.releaseProgram(H)}),v.isShaderMaterial&&de.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,H,G,U,pe){L===null&&(L=Ye);const ue=U.isMesh&&U.matrixWorld.determinant()<0,me=A(v,L,H,G,U);Ge.setMaterial(G,ue);let Ee=H.index,Re=1;if(G.wireframe===!0){if(Ee=b.getWireframeAttribute(H),Ee===void 0)return;Re=2}const Oe=H.drawRange,De=H.attributes.position;let Ke=Oe.start*Re,mt=(Oe.start+Oe.count)*Re;pe!==null&&(Ke=Math.max(Ke,pe.start*Re),mt=Math.min(mt,(pe.start+pe.count)*Re)),Ee!==null?(Ke=Math.max(Ke,0),mt=Math.min(mt,Ee.count)):De!=null&&(Ke=Math.max(Ke,0),mt=Math.min(mt,De.count));const lt=mt-Ke;if(lt<0||lt===1/0)return;Ce.setup(U,G,me,H,Ee);let St,qe=we;if(Ee!==null&&(St=I.get(Ee),qe=Je,qe.setIndex(St)),U.isMesh)G.wireframe===!0?(Ge.setLineWidth(G.wireframeLinewidth*ln()),qe.setMode(k.LINES)):qe.setMode(k.TRIANGLES);else if(U.isLine){let Be=G.linewidth;Be===void 0&&(Be=1),Ge.setLineWidth(Be*ln()),U.isLineSegments?qe.setMode(k.LINES):U.isLineLoop?qe.setMode(k.LINE_LOOP):qe.setMode(k.LINE_STRIP)}else U.isPoints?qe.setMode(k.POINTS):U.isSprite&&qe.setMode(k.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Dc("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),qe.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(pt.get("WEBGL_multi_draw"))qe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Be=U._multiDrawStarts,Ct=U._multiDrawCounts,Et=U._multiDrawCount,ht=Ee?I.get(Ee).bytesPerElement:1,wt=We.get(G).currentProgram.getUniforms();for(let Ut=0;Ut<Et;Ut++)wt.setValue(k,"_gl_DrawID",Ut),qe.render(Be[Ut]/ht,Ct[Ut])}else if(U.isInstancedMesh)qe.renderInstances(Ke,lt,U.count);else if(H.isInstancedBufferGeometry){const Be=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Ct=Math.min(H.instanceCount,Be);qe.renderInstances(Ke,lt,Ct)}else qe.render(Ke,lt)};function Ht(v,L,H){v.transparent===!0&&v.side===dr&&v.forceSinglePass===!1?(v.side=hr,v.needsUpdate=!0,vr(v,L,H),v.side=Ga,v.needsUpdate=!0,vr(v,L,H),v.side=dr):vr(v,L,H)}this.compile=function(v,L,H=null){H===null&&(H=v),d=Ze.get(H),d.init(L),N.push(d),H.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),v!==H&&v.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(d.pushLight(U),U.castShadow&&d.pushShadow(U))}),d.setupLights();const G=new Set;return v.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const pe=U.material;if(pe)if(Array.isArray(pe))for(let ue=0;ue<pe.length;ue++){const me=pe[ue];Ht(me,H,U),G.add(me)}else Ht(pe,H,U),G.add(pe)}),d=N.pop(),G},this.compileAsync=function(v,L,H=null){const G=this.compile(v,L,H);return new Promise(U=>{function pe(){if(G.forEach(function(ue){We.get(ue).currentProgram.isReady()&&G.delete(ue)}),G.size===0){U(v);return}setTimeout(pe,10)}pt.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let At=null;function $n(v){At&&At(v)}function Pn(){mr.stop()}function Ri(){mr.start()}const mr=new dg;mr.setAnimationLoop($n),typeof self<"u"&&mr.setContext(self),this.setAnimationLoop=function(v){At=v,J.setAnimationLoop(v),v===null?mr.stop():mr.start()},J.addEventListener("sessionstart",Pn),J.addEventListener("sessionend",Ri),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(L),L=J.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,L,W),d=Ze.get(v,N.length),d.init(L),N.push(d),ve.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),rt.setFromProjectionMatrix(ve,Uc,L.reversedDepth),re=this.localClippingEnabled,dt=Pe.init(this.clippingPlanes,re),_=fe.get(v,C.length),_.init(),C.push(_),J.enabled===!0&&J.isPresenting===!0){const pe=P.xr.getDepthSensingMesh();pe!==null&&zn(pe,L,-1/0,P.sortObjects)}zn(v,L,0,P.sortObjects),_.finish(),P.sortObjects===!0&&_.sort(Ue,Le),Mt=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Mt&&Qe.addToRenderList(_,v),this.info.render.frame++,dt===!0&&Pe.beginShadows();const H=d.state.shadowsArray;je.render(H,v,L),dt===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=_.opaque,U=_.transmissive;if(d.setupLights(),L.isArrayCamera){const pe=L.cameras;if(U.length>0)for(let ue=0,me=pe.length;ue<me;ue++){const Ee=pe[ue];yr(G,U,v,Ee)}Mt&&Qe.render(v);for(let ue=0,me=pe.length;ue<me;ue++){const Ee=pe[ue];Ai(_,v,Ee,Ee.viewport)}}else U.length>0&&yr(G,U,v,L),Mt&&Qe.render(v),Ai(_,v,L);W!==null&&V===0&&(ut.updateMultisampleRenderTarget(W),ut.updateRenderTargetMipmap(W)),v.isScene===!0&&v.onAfterRender(P,v,L),Ce.resetDefaultState(),M=-1,T=null,N.pop(),N.length>0?(d=N[N.length-1],dt===!0&&Pe.setGlobalState(P.clippingPlanes,d.state.camera)):d=null,C.pop(),C.length>0?_=C[C.length-1]:_=null};function zn(v,L,H,G){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)d.pushLight(v),v.castShadow&&d.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||rt.intersectsSprite(v)){G&&st.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ve);const ue=Z.update(v),me=v.material;me.visible&&_.push(v,ue,me,H,st.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||rt.intersectsObject(v))){const ue=Z.update(v),me=v.material;if(G&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),st.copy(v.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),st.copy(ue.boundingSphere.center)),st.applyMatrix4(v.matrixWorld).applyMatrix4(ve)),Array.isArray(me)){const Ee=ue.groups;for(let Re=0,Oe=Ee.length;Re<Oe;Re++){const De=Ee[Re],Ke=me[De.materialIndex];Ke&&Ke.visible&&_.push(v,ue,Ke,H,st.z,De)}}else me.visible&&_.push(v,ue,me,H,st.z,null)}}const pe=v.children;for(let ue=0,me=pe.length;ue<me;ue++)zn(pe[ue],L,H,G)}function Ai(v,L,H,G){const U=v.opaque,pe=v.transmissive,ue=v.transparent;d.setupLightsView(H),dt===!0&&Pe.setGlobalState(P.clippingPlanes,H),G&&Ge.viewport(z.copy(G)),U.length>0&&Xn(U,L,H),pe.length>0&&Xn(pe,L,H),ue.length>0&&Xn(ue,L,H),Ge.buffers.depth.setTest(!0),Ge.buffers.depth.setMask(!0),Ge.buffers.color.setMask(!0),Ge.setPolygonOffset(!1)}function yr(v,L,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[G.id]===void 0&&(d.state.transmissionRenderTarget[G.id]=new Dr(1,1,{generateMipmaps:!0,type:pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float")?On:xr,minFilter:Fa,samples:4,stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vn.workingColorSpace}));const pe=d.state.transmissionRenderTarget[G.id],ue=G.viewport||z;pe.setSize(ue.z*P.transmissionResolutionScale,ue.w*P.transmissionResolutionScale);const me=P.getRenderTarget(),Ee=P.getActiveCubeFace(),Re=P.getActiveMipmapLevel();P.setRenderTarget(pe),P.getClearColor(K),se=P.getClearAlpha(),se<1&&P.setClearColor(16777215,.5),P.clear(),Mt&&Qe.render(H);const Oe=P.toneMapping;P.toneMapping=Yr;const De=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),d.setupLightsView(G),dt===!0&&Pe.setGlobalState(P.clippingPlanes,G),Xn(v,H,G),ut.updateMultisampleRenderTarget(pe),ut.updateRenderTargetMipmap(pe),pt.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let mt=0,lt=L.length;mt<lt;mt++){const St=L[mt],qe=St.object,Be=St.geometry,Ct=St.material,Et=St.group;if(Ct.side===dr&&qe.layers.test(G.layers)){const ht=Ct.side;Ct.side=hr,Ct.needsUpdate=!0,_t(qe,H,G,Be,Ct,Et),Ct.side=ht,Ct.needsUpdate=!0,Ke=!0}}Ke===!0&&(ut.updateMultisampleRenderTarget(pe),ut.updateRenderTargetMipmap(pe))}P.setRenderTarget(me,Ee,Re),P.setClearColor(K,se),De!==void 0&&(G.viewport=De),P.toneMapping=Oe}function Xn(v,L,H){const G=L.isScene===!0?L.overrideMaterial:null;for(let U=0,pe=v.length;U<pe;U++){const ue=v[U],me=ue.object,Ee=ue.geometry,Re=ue.group;let Oe=ue.material;Oe.allowOverride===!0&&G!==null&&(Oe=G),me.layers.test(H.layers)&&_t(me,L,H,Ee,Oe,Re)}}function _t(v,L,H,G,U,pe){v.onBeforeRender(P,L,H,G,U,pe),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),U.onBeforeRender(P,L,H,G,v,pe),U.transparent===!0&&U.side===dr&&U.forceSinglePass===!1?(U.side=hr,U.needsUpdate=!0,P.renderBufferDirect(H,L,G,U,v,pe),U.side=Ga,U.needsUpdate=!0,P.renderBufferDirect(H,L,G,U,v,pe),U.side=dr):P.renderBufferDirect(H,L,G,U,v,pe),v.onAfterRender(P,L,H,G,U,pe)}function vr(v,L,H){L.isScene!==!0&&(L=Ye);const G=We.get(v),U=d.state.lights,pe=d.state.shadowsArray,ue=U.state.version,me=de.getParameters(v,U.state,pe,L,H),Ee=de.getProgramCacheKey(me);let Re=G.programs;G.environment=v.isMeshStandardMaterial?L.environment:null,G.fog=L.fog,G.envMap=(v.isMeshStandardMaterial?$t:Xt).get(v.envMap||G.environment),G.envMapRotation=G.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Re===void 0&&(v.addEventListener("dispose",_e),Re=new Map,G.programs=Re);let Oe=Re.get(Ee);if(Oe!==void 0){if(G.currentProgram===Oe&&G.lightsStateVersion===ue)return g(v,me),Oe}else me.uniforms=de.getUniforms(v),v.onBeforeCompile(me,P),Oe=de.acquireProgram(me,Ee),Re.set(Ee,Oe),G.uniforms=me.uniforms;const De=G.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(De.clippingPlanes=Pe.uniform),g(v,me),G.needsLights=ee(v),G.lightsStateVersion=ue,G.needsLights&&(De.ambientLightColor.value=U.state.ambient,De.lightProbe.value=U.state.probe,De.directionalLights.value=U.state.directional,De.directionalLightShadows.value=U.state.directionalShadow,De.spotLights.value=U.state.spot,De.spotLightShadows.value=U.state.spotShadow,De.rectAreaLights.value=U.state.rectArea,De.ltc_1.value=U.state.rectAreaLTC1,De.ltc_2.value=U.state.rectAreaLTC2,De.pointLights.value=U.state.point,De.pointLightShadows.value=U.state.pointShadow,De.hemisphereLights.value=U.state.hemi,De.directionalShadowMap.value=U.state.directionalShadowMap,De.directionalShadowMatrix.value=U.state.directionalShadowMatrix,De.spotShadowMap.value=U.state.spotShadowMap,De.spotLightMatrix.value=U.state.spotLightMatrix,De.spotLightMap.value=U.state.spotLightMap,De.pointShadowMap.value=U.state.pointShadowMap,De.pointShadowMatrix.value=U.state.pointShadowMatrix),G.currentProgram=Oe,G.uniformsList=null,Oe}function Ci(v){if(v.uniformsList===null){const L=v.currentProgram.getUniforms();v.uniformsList=nl.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function g(v,L){const H=We.get(v);H.outputColorSpace=L.outputColorSpace,H.batching=L.batching,H.batchingColor=L.batchingColor,H.instancing=L.instancing,H.instancingColor=L.instancingColor,H.instancingMorph=L.instancingMorph,H.skinning=L.skinning,H.morphTargets=L.morphTargets,H.morphNormals=L.morphNormals,H.morphColors=L.morphColors,H.morphTargetsCount=L.morphTargetsCount,H.numClippingPlanes=L.numClippingPlanes,H.numIntersection=L.numClipIntersection,H.vertexAlphas=L.vertexAlphas,H.vertexTangents=L.vertexTangents,H.toneMapping=L.toneMapping}function A(v,L,H,G,U){L.isScene!==!0&&(L=Ye),ut.resetTextureUnits();const pe=L.fog,ue=G.isMeshStandardMaterial?L.environment:null,me=W===null?P.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:oi,Ee=(G.isMeshStandardMaterial?$t:Xt).get(G.envMap||ue),Re=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Oe=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),De=!!H.morphAttributes.position,Ke=!!H.morphAttributes.normal,mt=!!H.morphAttributes.color;let lt=Yr;G.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(lt=P.toneMapping);const St=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,qe=St!==void 0?St.length:0,Be=We.get(G),Ct=d.state.lights;if(dt===!0&&(re===!0||v!==T)){const Ot=v===T&&G.id===M;Pe.setState(G,v,Ot)}let Et=!1;G.version===Be.__version?(Be.needsLights&&Be.lightsStateVersion!==Ct.state.version||Be.outputColorSpace!==me||U.isBatchedMesh&&Be.batching===!1||!U.isBatchedMesh&&Be.batching===!0||U.isBatchedMesh&&Be.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Be.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Be.instancing===!1||!U.isInstancedMesh&&Be.instancing===!0||U.isSkinnedMesh&&Be.skinning===!1||!U.isSkinnedMesh&&Be.skinning===!0||U.isInstancedMesh&&Be.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Be.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Be.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Be.instancingMorph===!1&&U.morphTexture!==null||Be.envMap!==Ee||G.fog===!0&&Be.fog!==pe||Be.numClippingPlanes!==void 0&&(Be.numClippingPlanes!==Pe.numPlanes||Be.numIntersection!==Pe.numIntersection)||Be.vertexAlphas!==Re||Be.vertexTangents!==Oe||Be.morphTargets!==De||Be.morphNormals!==Ke||Be.morphColors!==mt||Be.toneMapping!==lt||Be.morphTargetsCount!==qe)&&(Et=!0):(Et=!0,Be.__version=G.version);let ht=Be.currentProgram;Et===!0&&(ht=vr(G,L,U));let wt=!1,Ut=!1,Ft=!1;const at=ht.getUniforms(),Qt=Be.uniforms;if(Ge.useProgram(ht.program)&&(wt=!0,Ut=!0,Ft=!0),G.id!==M&&(M=G.id,Ut=!0),wt||T!==v){Ge.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),at.setValue(k,"projectionMatrix",v.projectionMatrix),at.setValue(k,"viewMatrix",v.matrixWorldInverse);const Jt=at.map.cameraPosition;Jt!==void 0&&Jt.setValue(k,Ne.setFromMatrixPosition(v.matrixWorld)),it.logarithmicDepthBuffer&&at.setValue(k,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&at.setValue(k,"isOrthographic",v.isOrthographicCamera===!0),T!==v&&(T=v,Ut=!0,Ft=!0)}if(U.isSkinnedMesh){at.setOptional(k,U,"bindMatrix"),at.setOptional(k,U,"bindMatrixInverse");const Ot=U.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),at.setValue(k,"boneTexture",Ot.boneTexture,ut))}U.isBatchedMesh&&(at.setOptional(k,U,"batchingTexture"),at.setValue(k,"batchingTexture",U._matricesTexture,ut),at.setOptional(k,U,"batchingIdTexture"),at.setValue(k,"batchingIdTexture",U._indirectTexture,ut),at.setOptional(k,U,"batchingColorTexture"),U._colorsTexture!==null&&at.setValue(k,"batchingColorTexture",U._colorsTexture,ut));const on=H.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&Te.update(U,H,ht),(Ut||Be.receiveShadow!==U.receiveShadow)&&(Be.receiveShadow=U.receiveShadow,at.setValue(k,"receiveShadow",U.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Qt.envMap.value=Ee,Qt.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&L.environment!==null&&(Qt.envMapIntensity.value=L.environmentIntensity),Ut&&(at.setValue(k,"toneMappingExposure",P.toneMappingExposure),Be.needsLights&&X(Qt,Ft),pe&&G.fog===!0&&he.refreshFogUniforms(Qt,pe),he.refreshMaterialUniforms(Qt,G,oe,be,d.state.transmissionRenderTarget[v.id]),nl.upload(k,Ci(Be),Qt,ut)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(nl.upload(k,Ci(Be),Qt,ut),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&at.setValue(k,"center",U.center),at.setValue(k,"modelViewMatrix",U.modelViewMatrix),at.setValue(k,"normalMatrix",U.normalMatrix),at.setValue(k,"modelMatrix",U.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ot=G.uniformsGroups;for(let Jt=0,Mn=Ot.length;Jt<Mn;Jt++){const Yt=Ot[Jt];nt.update(Yt,ht),nt.bind(Yt,ht)}}return ht}function X(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function ee(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(v,L,H){const G=We.get(v);G.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),We.get(v.texture).__webglTexture=L,We.get(v.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:H,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){const H=We.get(v);H.__webglFramebuffer=L,H.__useDefaultFramebuffer=L===void 0};const ce=k.createFramebuffer();this.setRenderTarget=function(v,L=0,H=0){W=v,D=L,V=H;let G=!0,U=null,pe=!1,ue=!1;if(v){const Ee=We.get(v);if(Ee.__useDefaultFramebuffer!==void 0)Ge.bindFramebuffer(k.FRAMEBUFFER,null),G=!1;else if(Ee.__webglFramebuffer===void 0)ut.setupRenderTarget(v);else if(Ee.__hasExternalTextures)ut.rebindTextures(v,We.get(v.texture).__webglTexture,We.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const De=v.depthTexture;if(Ee.__boundDepthTexture!==De){if(De!==null&&We.has(De)&&(v.width!==De.image.width||v.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ut.setupDepthRenderbuffer(v)}}const Re=v.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ue=!0);const Oe=We.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Oe[L])?U=Oe[L][H]:U=Oe[L],pe=!0):v.samples>0&&ut.useMultisampledRTT(v)===!1?U=We.get(v).__webglMultisampledFramebuffer:Array.isArray(Oe)?U=Oe[H]:U=Oe,z.copy(v.viewport),j.copy(v.scissor),Q=v.scissorTest}else z.copy(et).multiplyScalar(oe).floor(),j.copy(tt).multiplyScalar(oe).floor(),Q=ot;if(H!==0&&(U=ce),Ge.bindFramebuffer(k.FRAMEBUFFER,U)&&G&&Ge.drawBuffers(v,U),Ge.viewport(z),Ge.scissor(j),Ge.setScissorTest(Q),pe){const Ee=We.get(v.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+L,Ee.__webglTexture,H)}else if(ue){const Ee=L;for(let Re=0;Re<v.textures.length;Re++){const Oe=We.get(v.textures[Re]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Re,Oe.__webglTexture,H,Ee)}}else if(v!==null&&H!==0){const Ee=We.get(v.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ee.__webglTexture,H)}M=-1},this.readRenderTargetPixels=function(v,L,H,G,U,pe,ue,me=0){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=We.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ue!==void 0&&(Ee=Ee[ue]),Ee){Ge.bindFramebuffer(k.FRAMEBUFFER,Ee);try{const Re=v.textures[me],Oe=Re.format,De=Re.type;if(!it.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-G&&H>=0&&H<=v.height-U&&(v.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+me),k.readPixels(L,H,G,U,He.convert(Oe),He.convert(De),pe))}finally{const Re=W!==null?We.get(W).__webglFramebuffer:null;Ge.bindFramebuffer(k.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(v,L,H,G,U,pe,ue,me=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=We.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&ue!==void 0&&(Ee=Ee[ue]),Ee)if(L>=0&&L<=v.width-G&&H>=0&&H<=v.height-U){Ge.bindFramebuffer(k.FRAMEBUFFER,Ee);const Re=v.textures[me],Oe=Re.format,De=Re.type;if(!it.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ke=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Ke),k.bufferData(k.PIXEL_PACK_BUFFER,pe.byteLength,k.STREAM_READ),v.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+me),k.readPixels(L,H,G,U,He.convert(Oe),He.convert(De),0);const mt=W!==null?We.get(W).__webglFramebuffer:null;Ge.bindFramebuffer(k.FRAMEBUFFER,mt);const lt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await DS(k,lt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Ke),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,pe),k.deleteBuffer(Ke),k.deleteSync(lt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,H=0){const G=Math.pow(2,-H),U=Math.floor(v.image.width*G),pe=Math.floor(v.image.height*G),ue=L!==null?L.x:0,me=L!==null?L.y:0;ut.setTexture2D(v,0),k.copyTexSubImage2D(k.TEXTURE_2D,H,0,0,ue,me,U,pe),Ge.unbindTexture()};const le=k.createFramebuffer(),ye=k.createFramebuffer();this.copyTextureToTexture=function(v,L,H=null,G=null,U=0,pe=null){pe===null&&(U!==0?(Dc("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=U,U=0):pe=0);let ue,me,Ee,Re,Oe,De,Ke,mt,lt;const St=v.isCompressedTexture?v.mipmaps[pe]:v.image;if(H!==null)ue=H.max.x-H.min.x,me=H.max.y-H.min.y,Ee=H.isBox3?H.max.z-H.min.z:1,Re=H.min.x,Oe=H.min.y,De=H.isBox3?H.min.z:0;else{const on=Math.pow(2,-U);ue=Math.floor(St.width*on),me=Math.floor(St.height*on),v.isDataArrayTexture?Ee=St.depth:v.isData3DTexture?Ee=Math.floor(St.depth*on):Ee=1,Re=0,Oe=0,De=0}G!==null?(Ke=G.x,mt=G.y,lt=G.z):(Ke=0,mt=0,lt=0);const qe=He.convert(L.format),Be=He.convert(L.type);let Ct;L.isData3DTexture?(ut.setTexture3D(L,0),Ct=k.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(ut.setTexture2DArray(L,0),Ct=k.TEXTURE_2D_ARRAY):(ut.setTexture2D(L,0),Ct=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,L.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,L.unpackAlignment);const Et=k.getParameter(k.UNPACK_ROW_LENGTH),ht=k.getParameter(k.UNPACK_IMAGE_HEIGHT),wt=k.getParameter(k.UNPACK_SKIP_PIXELS),Ut=k.getParameter(k.UNPACK_SKIP_ROWS),Ft=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,St.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,St.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Re),k.pixelStorei(k.UNPACK_SKIP_ROWS,Oe),k.pixelStorei(k.UNPACK_SKIP_IMAGES,De);const at=v.isDataArrayTexture||v.isData3DTexture,Qt=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){const on=We.get(v),Ot=We.get(L),Jt=We.get(on.__renderTarget),Mn=We.get(Ot.__renderTarget);Ge.bindFramebuffer(k.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,Mn.__webglFramebuffer);for(let Yt=0;Yt<Ee;Yt++)at&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,We.get(v).__webglTexture,U,De+Yt),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,We.get(L).__webglTexture,pe,lt+Yt)),k.blitFramebuffer(Re,Oe,ue,me,Ke,mt,ue,me,k.DEPTH_BUFFER_BIT,k.NEAREST);Ge.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(U!==0||v.isRenderTargetTexture||We.has(v)){const on=We.get(v),Ot=We.get(L);Ge.bindFramebuffer(k.READ_FRAMEBUFFER,le),Ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,ye);for(let Jt=0;Jt<Ee;Jt++)at?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,on.__webglTexture,U,De+Jt):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,on.__webglTexture,U),Qt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ot.__webglTexture,pe,lt+Jt):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ot.__webglTexture,pe),U!==0?k.blitFramebuffer(Re,Oe,ue,me,Ke,mt,ue,me,k.COLOR_BUFFER_BIT,k.NEAREST):Qt?k.copyTexSubImage3D(Ct,pe,Ke,mt,lt+Jt,Re,Oe,ue,me):k.copyTexSubImage2D(Ct,pe,Ke,mt,Re,Oe,ue,me);Ge.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ge.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Qt?v.isDataTexture||v.isData3DTexture?k.texSubImage3D(Ct,pe,Ke,mt,lt,ue,me,Ee,qe,Be,St.data):L.isCompressedArrayTexture?k.compressedTexSubImage3D(Ct,pe,Ke,mt,lt,ue,me,Ee,qe,St.data):k.texSubImage3D(Ct,pe,Ke,mt,lt,ue,me,Ee,qe,Be,St):v.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,pe,Ke,mt,ue,me,qe,Be,St.data):v.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,pe,Ke,mt,St.width,St.height,qe,St.data):k.texSubImage2D(k.TEXTURE_2D,pe,Ke,mt,ue,me,qe,Be,St);k.pixelStorei(k.UNPACK_ROW_LENGTH,Et),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ht),k.pixelStorei(k.UNPACK_SKIP_PIXELS,wt),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ut),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Ft),pe===0&&L.generateMipmaps&&k.generateMipmap(Ct),Ge.unbindTexture()},this.initRenderTarget=function(v){We.get(v).__webglFramebuffer===void 0&&ut.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?ut.setTextureCube(v,0):v.isData3DTexture?ut.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?ut.setTexture2DArray(v,0):ut.setTexture2D(v,0),Ge.unbindTexture()},this.resetState=function(){D=0,V=0,W=null,Ge.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Uc}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i;const a=this.getContext();a.drawingBufferColorSpace=vn._getDrawingBufferColorSpace(i),a.unpackColorSpace=vn._getUnpackColorSpace()}}const yA=Object.freeze(Object.defineProperty({__proto__:null,ACESFilmicToneMapping:Yf,AddEquation:Na,AddOperation:Qv,AdditiveAnimationBlendMode:OS,AdditiveBlending:fl,AgXToneMapping:qv,AlphaFormat:Lv,AlwaysCompare:yv,AlwaysDepth:ul,AlwaysStencilFunc:BS,AmbientLight:kS,AnimationAction:HS,AnimationClip:zS,AnimationLoader:GS,AnimationMixer:VS,AnimationObjectGroup:WS,AnimationUtils:XS,ArcCurve:qS,ArrayCamera:Jm,ArrowHelper:YS,AttachedBindMode:jS,Audio:$S,AudioAnalyser:KS,AudioContext:ZS,AudioListener:QS,AudioLoader:JS,AxesHelper:eE,BackSide:hr,BasicDepthPacking:tE,BasicShadowMap:rg,BatchedMesh:nE,Bone:rE,BooleanKeyframeTrack:iE,Box2:aE,Box3:oE,Box3Helper:sE,BoxGeometry:Vf,BoxHelper:lE,BufferAttribute:wo,BufferGeometry:If,BufferGeometryLoader:uE,ByteType:Nf,Cache:cE,Camera:fE,CameraHelper:dE,CanvasTexture:pE,CapsuleGeometry:hE,CatmullRomCurve3:mE,CineonToneMapping:Yv,CircleGeometry:vE,ClampToEdgeWrapping:Xr,Clock:ig,Color:Zt,ColorKeyframeTrack:gE,ColorManagement:vn,CompressedArrayTexture:_E,CompressedCubeTexture:SE,CompressedTexture:EE,CompressedTextureLoader:bE,ConeGeometry:ME,ConstantAlphaFactor:rv,ConstantColorFactor:av,Controls:TE,CubeCamera:xE,CubeReflectionMapping:ea,CubeRefractionMapping:ta,CubeTexture:Kv,CubeTextureLoader:ag,CubeUVReflectionMapping:Go,CubicBezierCurve:yE,CubicBezierCurve3:wE,CubicInterpolant:RE,CullFaceBack:cf,CullFaceFront:Fv,CullFaceFrontBack:AE,CullFaceNone:Nv,Curve:CE,CurvePath:PE,CustomBlending:Ov,CustomToneMapping:Wv,CylinderGeometry:IE,Cylindrical:LE,Data3DTexture:Zv,DataArrayTexture:Gf,DataTexture:og,DataTextureLoader:jf,DataUtils:Ki,DecrementStencilOp:DE,DecrementWrapStencilOp:UE,DefaultLoadingManager:NE,DepthFormat:El,DepthStencilFormat:Do,DepthTexture:Af,DetachedBindMode:FE,DirectionalLight:OE,DirectionalLightHelper:BE,DiscreteInterpolant:kE,DodecahedronGeometry:HE,DoubleSide:dr,DstAlphaFactor:cv,DstColorFactor:fv,DynamicCopyUsage:zE,DynamicDrawUsage:GE,DynamicReadUsage:VE,EdgesGeometry:WE,EllipseCurve:XE,EqualCompare:Tv,EqualDepth:sl,EqualStencilFunc:qE,EquirectangularReflectionMapping:Fo,EquirectangularRefractionMapping:dl,Euler:Wf,EventDispatcher:Qm,ExternalTexture:Uf,ExtrudeGeometry:hf,FileLoader:Co,Float16BufferAttribute:YE,Float32BufferAttribute:jE,FloatType:kn,Fog:$E,FogExp2:KE,FramebufferTexture:ZE,FrontSide:Ga,Frustum:wf,FrustumArray:QE,GLBufferAttribute:JE,GLSL1:eb,GLSL3:pf,GreaterCompare:bv,GreaterDepth:al,GreaterEqualCompare:Mv,GreaterEqualDepth:ol,GreaterEqualStencilFunc:tb,GreaterStencilFunc:nb,GridHelper:rb,Group:ib,HalfFloatType:On,HemisphereLight:ab,HemisphereLightHelper:ob,IcosahedronGeometry:sg,ImageBitmapLoader:sb,ImageLoader:lb,ImageUtils:ub,IncrementStencilOp:cb,IncrementWrapStencilOp:fb,InstancedBufferAttribute:db,InstancedBufferGeometry:pb,InstancedInterleavedBuffer:hb,InstancedMesh:mb,Int16BufferAttribute:vb,Int32BufferAttribute:gb,Int8BufferAttribute:_b,IntType:Ml,InterleavedBuffer:Sb,InterleavedBufferAttribute:Eb,Interpolant:bb,InterpolateDiscrete:Mb,InterpolateLinear:Tb,InterpolateSmooth:xb,InterpolationSamplingMode:yb,InterpolationSamplingType:wb,InvertStencilOp:Rb,KeepStencilOp:Ab,KeyframeTrack:Cb,LOD:Pb,LatheGeometry:Ib,Layers:pl,LessCompare:xv,LessDepth:ll,LessEqualCompare:Cf,LessEqualDepth:Uo,LessEqualStencilFunc:Lb,LessStencilFunc:Db,Light:Ub,LightProbe:Nb,Line:Fb,Line3:Ob,LineBasicMaterial:Bb,LineCurve:kb,LineCurve3:Hb,LineDashedMaterial:zb,LineLoop:Gb,LineSegments:Vb,LinearFilter:Bn,LinearInterpolant:Wb,LinearMipMapLinearFilter:mf,LinearMipMapNearestFilter:Xb,LinearMipmapLinearFilter:Fa,LinearMipmapNearestFilter:Zs,LinearSRGBColorSpace:oi,LinearToneMapping:$v,LinearTransfer:Xf,Loader:lg,LoaderUtils:qb,LoadingManager:ug,LoopOnce:Yb,LoopPingPong:jb,LoopRepeat:$b,MOUSE:Kb,Material:Zb,MaterialLoader:Qb,MathUtils:Jb,Matrix2:eM,Matrix3:kt,Matrix4:za,MaxEquation:ng,Mesh:pr,MeshBasicMaterial:qf,MeshDepthMaterial:Pf,MeshDistanceMaterial:Cv,MeshLambertMaterial:tM,MeshMatcapMaterial:nM,MeshNormalMaterial:rM,MeshPhongMaterial:iM,MeshPhysicalMaterial:vf,MeshStandardMaterial:qi,MeshToonMaterial:aM,MinEquation:tg,MirroredRepeatWrapping:gv,MixOperation:Jv,MultiplyBlending:ff,MultiplyOperation:eg,NearestFilter:ka,NearestMipMapLinearFilter:oM,NearestMipMapNearestFilter:sM,NearestMipmapLinearFilter:To,NearestMipmapNearestFilter:Sv,NeutralToneMapping:Xv,NeverCompare:wv,NeverDepth:cl,NeverStencilFunc:lM,NoBlending:ai,NoColorSpace:ji,NoToneMapping:Yr,NormalAnimationBlendMode:uM,NormalBlending:Ro,NotEqualCompare:Ev,NotEqualDepth:il,NotEqualStencilFunc:cM,NumberKeyframeTrack:fM,Object3D:dM,ObjectLoader:pM,ObjectSpaceNormalMap:Hv,OctahedronGeometry:hM,OneFactor:mv,OneMinusConstantAlphaFactor:nv,OneMinusConstantColorFactor:iv,OneMinusDstAlphaFactor:ov,OneMinusDstColorFactor:sv,OneMinusSrcAlphaFactor:lv,OneMinusSrcColorFactor:uv,OrthographicCamera:Tl,PCFShadowMap:bl,PCFSoftShadowMap:Ao,PMREMGenerator:gf,Path:mM,PerspectiveCamera:Ba,Plane:Rv,PlaneGeometry:qa,PlaneHelper:vM,PointLight:gM,PointLightHelper:_M,Points:SM,PointsMaterial:EM,PolarGridHelper:bM,PolyhedronGeometry:MM,PositionalAudio:TM,PropertyBinding:xM,PropertyMixer:yM,QuadraticBezierCurve:wM,QuadraticBezierCurve3:RM,Quaternion:AM,QuaternionKeyframeTrack:CM,QuaternionLinearInterpolant:PM,RED_GREEN_RGTC2_Format:lf,RED_RGTC1_Format:of,REVISION:Rf,RGBADepthPacking:Av,RGBAFormat:Wn,RGBAIntegerFormat:Hf,RGBA_ASTC_10x10_Format:Jc,RGBA_ASTC_10x5_Format:Kc,RGBA_ASTC_10x6_Format:Zc,RGBA_ASTC_10x8_Format:Qc,RGBA_ASTC_12x10_Format:ef,RGBA_ASTC_12x12_Format:tf,RGBA_ASTC_4x4_Format:Gc,RGBA_ASTC_5x4_Format:Vc,RGBA_ASTC_5x5_Format:Wc,RGBA_ASTC_6x5_Format:Xc,RGBA_ASTC_6x6_Format:qc,RGBA_ASTC_8x5_Format:Yc,RGBA_ASTC_8x6_Format:jc,RGBA_ASTC_8x8_Format:$c,RGBA_BPTC_Format:nf,RGBA_ETC2_EAC_Format:zc,RGBA_PVRTC_2BPPV1_Format:Bc,RGBA_PVRTC_4BPPV1_Format:Oc,RGBA_S3TC_DXT1_Format:Js,RGBA_S3TC_DXT3_Format:el,RGBA_S3TC_DXT5_Format:tl,RGBDepthPacking:IM,RGBFormat:Dv,RGBIntegerFormat:LM,RGB_BPTC_SIGNED_Format:rf,RGB_BPTC_UNSIGNED_Format:af,RGB_ETC1_Format:kc,RGB_ETC2_Format:Hc,RGB_PVRTC_2BPPV1_Format:Fc,RGB_PVRTC_4BPPV1_Format:Nc,RGB_S3TC_DXT1_Format:Qs,RGDepthPacking:DM,RGFormat:Uv,RGIntegerFormat:kf,RawShaderMaterial:UM,Ray:NM,Raycaster:$f,RectAreaLight:FM,RedFormat:Of,RedIntegerFormat:Bf,ReinhardToneMapping:jv,RenderTarget:OM,RenderTarget3D:BM,RepeatWrapping:_v,ReplaceStencilOp:kM,ReverseSubtractEquation:ev,RingGeometry:HM,SIGNED_RED_GREEN_RGTC2_Format:uf,SIGNED_RED_RGTC1_Format:sf,SRGBColorSpace:zo,SRGBTransfer:nn,Scene:xl,ShaderChunk:Tt,ShaderLib:Lr,ShaderMaterial:nr,ShadowMaterial:zM,Shape:GM,ShapeGeometry:VM,ShapePath:WM,ShapeUtils:XM,ShortType:Ff,Skeleton:qM,SkeletonHelper:YM,SkinnedMesh:jM,Source:$M,Sphere:KM,SphereGeometry:ZM,Spherical:QM,SphericalHarmonics3:JM,SplineCurve:eT,SpotLight:tT,SpotLightHelper:nT,Sprite:rT,SpriteMaterial:iT,SrcAlphaFactor:pv,SrcAlphaSaturateFactor:dv,SrcColorFactor:hv,StaticCopyUsage:aT,StaticDrawUsage:oT,StaticReadUsage:sT,StereoCamera:lT,StreamCopyUsage:uT,StreamDrawUsage:cT,StreamReadUsage:fT,StringKeyframeTrack:dT,SubtractEquation:tv,SubtractiveBlending:df,TOUCH:pT,TangentSpaceNormalMap:kv,TetrahedronGeometry:hT,Texture:yi,TextureLoader:mT,TextureUtils:vT,Timer:gT,TimestampQuery:_T,TorusGeometry:ST,TorusKnotGeometry:ET,Triangle:bT,TriangleFanDrawMode:MT,TriangleStripDrawMode:TT,TrianglesDrawMode:xT,TubeGeometry:yT,UVMapping:Oo,Uint16BufferAttribute:Vv,Uint32BufferAttribute:Gv,Uint8BufferAttribute:wT,Uint8ClampedBufferAttribute:RT,Uniform:AT,UniformsGroup:CT,UniformsLib:ke,UniformsUtils:Bv,UnsignedByteType:xr,UnsignedInt101111Type:Iv,UnsignedInt248Type:Va,UnsignedInt5999Type:Pv,UnsignedIntType:Ji,UnsignedShort4444Type:Lf,UnsignedShort5551Type:Df,UnsignedShortType:No,VSMShadowMap:Ir,Vector2:Hn,Vector3:yt,Vector4:jn,VectorKeyframeTrack:PT,VideoFrameTexture:IT,VideoTexture:LT,WebGL3DRenderTarget:DT,WebGLArrayRenderTarget:UT,WebGLCoordinateSystem:Uc,WebGLCubeRenderTarget:zf,WebGLRenderTarget:Dr,WebGLRenderer:Zf,WebGLUtils:gg,WebGPUCoordinateSystem:NT,WebXRController:Ks,WireframeGeometry:FT,WrapAroundEnding:OT,ZeroCurvatureEnding:BT,ZeroFactor:vv,ZeroSlopeEnding:kT,ZeroStencilOp:HT,createCanvasElement:Zm},Symbol.toStringTag,{value:"Module"}));function Wa(){return Wa=Object.assign?Object.assign.bind():function(n){for(var i=1;i<arguments.length;i++){var a=arguments[i];for(var s in a)({}).hasOwnProperty.call(a,s)&&(n[s]=a[s])}return n},Wa.apply(null,arguments)}var _c={exports:{}},Sc={},Ec={exports:{}},bc={};var wm;function wA(){if(wm)return bc;wm=1;var n=cg();function i(x,R){return x===R&&(x!==0||1/x===1/R)||x!==x&&R!==R}var a=typeof Object.is=="function"?Object.is:i,s=n.useState,u=n.useEffect,f=n.useLayoutEffect,h=n.useDebugValue;function p(x,R){var w=R(),F=s({inst:{value:w,getSnapshot:R}}),O=F[0].inst,_=F[1];return f(function(){O.value=w,O.getSnapshot=R,m(O)&&_({inst:O})},[x,w,R]),u(function(){return m(O)&&_({inst:O}),x(function(){m(O)&&_({inst:O})})},[x]),h(w),w}function m(x){var R=x.getSnapshot;x=x.value;try{var w=R();return!a(x,w)}catch{return!0}}function E(x,R){return R()}var y=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:p;return bc.useSyncExternalStore=n.useSyncExternalStore!==void 0?n.useSyncExternalStore:y,bc}var Rm;function RA(){return Rm||(Rm=1,Ec.exports=wA()),Ec.exports}var Am;function AA(){if(Am)return Sc;Am=1;var n=cg(),i=RA();function a(E,y){return E===y&&(E!==0||1/E===1/y)||E!==E&&y!==y}var s=typeof Object.is=="function"?Object.is:a,u=i.useSyncExternalStore,f=n.useRef,h=n.useEffect,p=n.useMemo,m=n.useDebugValue;return Sc.useSyncExternalStoreWithSelector=function(E,y,x,R,w){var F=f(null);if(F.current===null){var O={hasValue:!1,value:null};F.current=O}else O=F.current;F=p(function(){function d(D){if(!C){if(C=!0,N=D,D=R(D),w!==void 0&&O.hasValue){var V=O.value;if(w(V,D))return P=V}return P=D}if(V=P,s(N,D))return V;var W=R(D);return w!==void 0&&w(V,W)?(N=D,V):(N=D,P=W)}var C=!1,N,P,q=x===void 0?null:x;return[function(){return d(y())},q===null?void 0:function(){return d(q())}]},[y,x,R,w]);var _=u(E,F[0],F[1]);return h(function(){O.hasValue=!0,O.value=_},[_]),m(_),_},Sc}var Cm;function CA(){return Cm||(Cm=1,_c.exports=AA()),_c.exports}var PA=CA();const IA=fg(PA),Pm=n=>{let i;const a=new Set,s=(E,y)=>{const x=typeof E=="function"?E(i):E;if(!Object.is(x,i)){const R=i;i=y??(typeof x!="object"||x===null)?x:Object.assign({},i,x),a.forEach(w=>w(i,R))}},u=()=>i,p={setState:s,getState:u,getInitialState:()=>m,subscribe:E=>(a.add(E),()=>a.delete(E))},m=i=n(s,u,p);return p},LA=(n=>n?Pm(n):Pm),{useSyncExternalStoreWithSelector:DA}=IA,UA=n=>n;function NA(n,i=UA,a){const s=DA(n.subscribe,n.getState,n.getInitialState,i,a);return rn.useDebugValue(s),s}const Im=(n,i)=>{const a=LA(n),s=(u,f=i)=>NA(a,u,f);return Object.assign(s,a),s},_g=((n,i)=>n?Im(n,i):Im),FA=n=>typeof n=="object"&&typeof n.then=="function",Zi=[];function Sg(n,i,a=(s,u)=>s===u){if(n===i)return!0;if(!n||!i)return!1;const s=n.length;if(i.length!==s)return!1;for(let u=0;u<s;u++)if(!a(n[u],i[u]))return!1;return!0}function Eg(n,i=null,a=!1,s={}){i===null&&(i=[n]);for(const f of Zi)if(Sg(i,f.keys,f.equal)){if(a)return;if(Object.prototype.hasOwnProperty.call(f,"error"))throw f.error;if(Object.prototype.hasOwnProperty.call(f,"response"))return s.lifespan&&s.lifespan>0&&(f.timeout&&clearTimeout(f.timeout),f.timeout=setTimeout(f.remove,s.lifespan)),f.response;if(!a)throw f.promise}const u={keys:i,equal:s.equal,remove:()=>{const f=Zi.indexOf(u);f!==-1&&Zi.splice(f,1)},promise:(FA(n)?n:n(...i)).then(f=>{u.response=f,s.lifespan&&s.lifespan>0&&(u.timeout=setTimeout(u.remove,s.lifespan))}).catch(f=>u.error=f)};if(Zi.push(u),!a)throw u.promise}const OA=(n,i,a)=>Eg(n,i,!1,a),BA=(n,i,a)=>{Eg(n,i,!0,a)},kA=n=>{if(n===void 0||n.length===0)Zi.splice(0,Zi.length);else{const i=Zi.find(a=>Sg(n,a.keys,a.equal));i&&i.remove()}};(()=>{var n,i;return typeof window<"u"&&(((n=window.document)==null?void 0:n.createElement)||((i=window.navigator)==null?void 0:i.product)==="ReactNative")})()?rn.useLayoutEffect:rn.useEffect;function wl(n,i,a){if(!n)return;if(a(n)===!0)return n;let s=i?n.return:n.child;for(;s;){const u=wl(s,i,a);if(u)return u;s=i?null:s.sibling}}function bg(n){try{return Object.defineProperties(n,{_currentRenderer:{get(){return null},set(){}},_currentRenderer2:{get(){return null},set(){}}})}catch{return n}}const Qf=bg(rn.createContext(null));class Mg extends rn.Component{render(){return rn.createElement(Qf.Provider,{value:this._reactInternals},this.props.children)}}function Jf(){const n=rn.useContext(Qf);if(n===null)throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");const i=rn.useId();return rn.useMemo(()=>{for(const a of[n,n?.alternate]){if(!a)continue;const s=wl(a,!1,u=>{let f=u.memoizedState;for(;f;){if(f.memoizedState===i)return!0;f=f.next}});if(s)return s}},[n,i])}const HA=Symbol.for("react.context"),zA=n=>n!==null&&typeof n=="object"&&"$$typeof"in n&&n.$$typeof===HA;function GA(){const n=Jf(),[i]=rn.useState(()=>new Map);i.clear();let a=n;for(;a;){const s=a.type;zA(s)&&s!==Qf&&!i.has(s)&&i.set(s,rn.use(bg(s))),a=a.return}return i}function VA(){const n=GA();return rn.useMemo(()=>Array.from(n.keys()).reduce((i,a)=>s=>rn.createElement(i,null,rn.createElement(a.Provider,{...s,value:n.get(a)})),i=>rn.createElement(Mg,{...i})),[n])}function WA(n){if(typeof requestAnimationFrame=="function"){const a=requestAnimationFrame(n);return()=>cancelAnimationFrame(a)}const i=setTimeout(n,16);return()=>clearTimeout(i)}function XA(){if(!rn.Activity)throw new Error("its-fine: useActivityBridge requires React 19.2 or later!");const n=Jf(),[i]=rn.useState(()=>{const a=[];let s=!1;wl(n,!0,m=>{var E,y;if(m.elementType===rn.Activity){const x=((E=m.child)==null?void 0:E.tag)===22?m.child.stateNode:null;if(typeof x?._visibility!="number")throw new Error("its-fine: unsupported React Activity internals!");a.push(x)}else m.tag===22&&((y=m.return)==null?void 0:y.elementType)!==rn.Activity&&(s=!0)});let u="hidden";const f=new Set;let h;const p={mounted:!1,connected:!1,subscribe(m){return f.add(m),()=>{f.delete(m)}},sync(m){p.mounted&&!p.connected&&s&&a.length>0?h||(h=WA(()=>{h=void 0,p.sync(!0)})):(h?.(),h=void 0);let E=u;if(p.mounted?p.connected?E="visible":m&&(E=a.every(y=>(y._visibility&1)!==0)?"visible":"hidden"):E="hidden",u!==E){u=E;for(const y of f)y()}},Bridge({children:m}){return rn.createElement(rn.Activity,{mode:rn.useSyncExternalStore(p.subscribe,()=>u,()=>"hidden")},m)}};return p});return rn.useInsertionEffect(()=>(i.mounted=!0,queueMicrotask(()=>i.sync(!1)),()=>{i.mounted=!1,queueMicrotask(()=>i.sync(!1))}),[i]),rn.useLayoutEffect(()=>(i.connected=!0,i.sync(!1),()=>{i.connected=!1,i.sync(!0)}),[i]),i.Bridge}var ri=zT();const qA=fg(ri),na=((n,i)=>typeof window<"u"&&(((n=window.document)==null?void 0:n.createElement)||((i=window.navigator)==null?void 0:i.product)==="ReactNative"))()?Se.useLayoutEffect:Se.useEffect;function ed(n){const i=Se.useRef(n);return na(()=>{i.current=n},[n]),i}function YA({promise:n,onSettled:i}){return Se.use(n),na(i,[i]),null}function jA(){const[n,i]=Se.useState(null),a=Se.useCallback(()=>i(null),[]),s=Se.useCallback(f=>i(h=>h??Promise.resolve(f).then(()=>{},()=>{})),[]);return[n?ze.jsx(Se.Suspense,{fallback:null,children:ze.jsx(YA,{promise:n,onSettled:a})}):null,s]}const $A=Se.Activity?XA:()=>Se.Fragment;function KA(){const n=Jf(),i=VA(),a=$A();return Se.useMemo(()=>({children:s})=>{const f=!!wl(n,!0,h=>h.type===Se.StrictMode)?Se.StrictMode:Se.Fragment;return ze.jsx(f,{children:ze.jsx(a,{children:ze.jsx(i,{children:s})})})},[n,i,a])}function ZA({set:n}){return na(()=>(n(new Promise(()=>null)),()=>n(!1)),[n]),null}const QA=(n=>(n=class extends Se.Component{constructor(...a){super(...a),this.state={error:!1}}componentDidCatch(a){this.props.set(a)}render(){return this.state.error?null:this.props.children}},n.getDerivedStateFromError=()=>({error:!0}),n))();function td(n){let i=n.root;for(;i.getState().previousRoot;)i=i.getState().previousRoot;return i}const Tg=n=>n&&n.isOrthographicCamera,JA=n=>n&&n.hasOwnProperty("current"),eC=n=>n!=null&&(typeof n=="string"||typeof n=="number"||n.isColor),Lm=()=>{};function nd(n){var i;const a=typeof window<"u"?(i=window.devicePixelRatio)!=null?i:2:1;return Array.isArray(n)?Math.min(Math.max(n[0],a),n[1]):n}function tC(n){if(typeof window>"u"||typeof window.matchMedia!="function"||!window.devicePixelRatio)return()=>{};let i;const a=()=>{try{var f,h;i=window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),typeof((f=i)==null?void 0:f.addEventListener)=="function"?i.addEventListener("change",u):(h=i)==null||h.addListener==null||h.addListener(u)}catch{i=void 0}},s=()=>{var f,h;typeof((f=i)==null?void 0:f.removeEventListener)=="function"?i.removeEventListener("change",u):(h=i)==null||h.removeListener==null||h.removeListener(u),i=void 0},u=()=>{s(),a(),n()};return a(),s}function Da(n){var i;return(i=n.__r3f)==null?void 0:i.root.getState()}const gn={obj:n=>n===Object(n)&&!gn.arr(n)&&typeof n!="function",fun:n=>typeof n=="function",str:n=>typeof n=="string",num:n=>typeof n=="number",boo:n=>typeof n=="boolean",und:n=>n===void 0,nul:n=>n===null,arr:n=>Array.isArray(n),equ(n,i,{arrays:a="shallow",objects:s="reference",strict:u=!0}={}){if(typeof n!=typeof i||!!n!=!!i)return!1;if(gn.str(n)||gn.num(n)||gn.boo(n))return n===i;const f=gn.obj(n);if(f&&s==="reference")return n===i;const h=gn.arr(n);if(h&&a==="reference")return n===i;if((h||f)&&n===i)return!0;let p;for(p in n)if(!(p in i))return!1;if(f&&a==="shallow"&&s==="shallow"){for(p in u?i:n)if(!gn.equ(n[p],i[p],{strict:u,objects:"reference"}))return!1}else for(p in u?i:n)if(n[p]!==i[p])return!1;if(gn.und(p)){if(h&&n.length===0&&i.length===0||f&&Object.keys(n).length===0&&Object.keys(i).length===0)return!0;if(n!==i)return!1}return!0}};function nC(n){const i={nodes:{},materials:{},meshes:{}};return n&&n.traverse(a=>{a.name&&(i.nodes[a.name]=a),a.material&&!i.materials[a.material.name]&&(i.materials[a.material.name]=a.material),a.isMesh&&!i.meshes[a.name]&&(i.meshes[a.name]=a)}),i}function rC(n){n.type!=="Scene"&&(n.dispose==null||n.dispose());for(const i in n){const a=n[i];a?.type!=="Scene"&&(a==null||a.dispose==null||a.dispose())}}const xg=["children","key","ref"];function Sf(n){const i={};for(const a in n)xg.includes(a)||(i[a]=n[a]);return i}function hl(n,i,a,s){const u=n;let f=u?.__r3f;return f||(f={root:i,type:a,parent:null,children:[],props:Sf(s),object:u,eventCount:0,handlers:{},previousVisible:void 0,isHidden:!1},u&&(u.__r3f=f)),f}function Bo(n,i){if(!i.includes("-"))return{root:n,key:i,target:n[i]};if(i in n)return{root:n,key:i,target:n[i]};let a=n;const s=i.split("-");for(const u of s){if(typeof a!="object"||a===null){if(a!==void 0){const f=s.slice(s.indexOf(u)).join("-");return{root:a,key:f,target:void 0}}return{root:n,key:i,target:void 0}}i=u,n=a,a=a[i]}return{root:n,key:i,target:a}}const Dm=/-\d+$/;function ml(n,i){if(gn.str(i.props.attach)){if(Dm.test(i.props.attach)){const u=i.props.attach.replace(Dm,""),{root:f,key:h}=Bo(n.object,u);Array.isArray(f[h])||(f[h]=[])}const{root:a,key:s}=Bo(n.object,i.props.attach);i.previousAttach=a[s],a[s]=i.object}else gn.fun(i.props.attach)&&(i.previousAttach=i.props.attach(n.object,i.object))}function vl(n,i){if(gn.str(i.props.attach)){const{root:a,key:s}=Bo(n.object,i.props.attach),u=i.previousAttach;u===void 0?delete a[s]:a[s]=u}else i.previousAttach==null||i.previousAttach(n.object,i.object);delete i.previousAttach}const Ef=[...xg,"args","dispose","attach","object","onUpdate","dispose"],Um=new Map;function iC(n){let i=Um.get(n.constructor);try{i||(i=new n.constructor,Um.set(n.constructor,i))}catch{}return i}function aC(n,i){const a={};for(const s in i)if(!Ef.includes(s)&&!gn.equ(i[s],n.props[s])){a[s]=i[s];for(const u in i)u.startsWith(`${s}-`)&&(a[u]=i[u])}for(const s in n.props){if(Ef.includes(s)||i.hasOwnProperty(s))continue;const{root:u,key:f}=Bo(n.object,s);if(u.constructor&&u.constructor.length===0){const h=iC(u);gn.und(h)||(a[s]=h[f])}else a[s]=0}return a}const oC=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],sC=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;function qr(n,i){var a;const s=n.__r3f,u=s&&td(s).getState(),f=s?.eventCount;for(const p in i){let m=i[p];if(Ef.includes(p))continue;if(s&&sC.test(p)){typeof m=="function"?s.handlers[p]=m:delete s.handlers[p],s.eventCount=Object.keys(s.handlers).length;continue}if(m===void 0)continue;if(p==="visible"&&s!=null&&s.isHidden&&s.previousVisible!==void 0){s.previousVisible=m;continue}let{root:E,key:y,target:x}=Bo(n,p);if(x===void 0&&(typeof E!="object"||E===null))throw Error(`R3F: Cannot set "${p}". Ensure it is an object before setting "${y}".`);if(x instanceof pl&&m instanceof pl)x.mask=m.mask;else if(x instanceof Zt&&eC(m))x.set(m);else if(x!==null&&typeof x=="object"&&typeof x.set=="function"&&typeof x.copy=="function"&&m!=null&&m.constructor&&x.constructor===m.constructor)x.copy(m);else if(x!==null&&typeof x=="object"&&typeof x.set=="function"&&Array.isArray(m))typeof x.fromArray=="function"?x.fromArray(m):x.set(...m);else if(x!==null&&typeof x=="object"&&typeof x.set=="function"&&typeof m=="number")typeof x.setScalar=="function"?x.setScalar(m):x.set(m);else if(E instanceof nr&&y==="uniforms"&&gn.obj(m)){gn.obj(E.uniforms)||(E.uniforms={});const R=E.uniforms,w=m;for(const F in w){const O=w[F],_=R[F];_?Object.assign(_,O):R[F]={...O}}}else{var h;E[y]=m,u&&!u.linear&&oC.includes(y)&&(h=E[y])!=null&&h.isTexture&&E[y].format===Wn&&E[y].type===xr&&(E[y].colorSpace=zo)}}if(s!=null&&s.parent&&u!=null&&u.internal&&(a=s.object)!=null&&a.isObject3D&&f!==s.eventCount){const p=s.object,m=u.internal.interaction.indexOf(p);m>-1&&u.internal.interaction.splice(m,1),s.eventCount&&p.raycast!==null&&u.internal.interaction.push(p)}return s&&s.props.attach===void 0&&(s.object.isBufferGeometry?s.props.attach="geometry":s.object.isMaterial&&(s.props.attach="material")),s&&Vo(s),n}function Vo(n){var i;if(!n.parent)return;n.props.onUpdate==null||n.props.onUpdate(n.object);const a=(i=n.root)==null||i.getState==null?void 0:i.getState();a&&a.internal.frames===0&&a.invalidate()}function yg(n,i){n.manual||(Tg(n)?(n.left=i.width/-2,n.right=i.width/2,n.top=i.height/2,n.bottom=i.height/-2):n.aspect=i.width/i.height,n.updateProjectionMatrix())}const Yn=n=>n?.isObject3D;function yo(n){return(n.eventObject||n.object).uuid+"/"+n.index+n.instanceId}function wg(n,i,a,s){const u=a.get(i);u&&(a.delete(i),a.size===0&&(n.delete(s),u.target.releasePointerCapture(s)))}function lC(n,i,a){const{internal:s}=n.getState();for(let u=0;u<s.interaction.length;u++)s.interaction[u]===i&&(s.interaction[u]=a);for(let u=0;u<s.initialHits.length;u++)s.initialHits[u]===i&&(s.initialHits[u]=a);s.hovered.forEach((u,f)=>{if(u.eventObject===i||u.object===i){s.hovered.delete(f);const h={...u,eventObject:u.eventObject===i?a:u.eventObject,object:u.object===i?a:u.object};s.hovered.set(yo(h),h)}}),s.capturedMap.forEach(u=>{for(const[f,h]of Array.from(u)){const{intersection:p}=h;f!==i&&p.object!==i&&p.eventObject!==i||(f===i&&u.delete(f),u.set(f===i?a:f,{...h,intersection:{...p,object:p.object===i?a:p.object,eventObject:p.eventObject===i?a:p.eventObject}}))}})}function uC(n,i){const{internal:a}=n.getState();a.interaction=a.interaction.filter(s=>s!==i),a.initialHits=a.initialHits.filter(s=>s!==i),a.hovered.forEach((s,u)=>{(s.eventObject===i||s.object===i)&&a.hovered.delete(u)}),a.capturedMap.forEach((s,u)=>{wg(a.capturedMap,i,s,u)})}function cC(n){function i(m){const{internal:E}=n.getState(),y=m.offsetX-E.initialClick[0],x=m.offsetY-E.initialClick[1];return Math.round(Math.sqrt(y*y+x*x))}function a(m){return m.filter(E=>["Move","Over","Enter","Out","Leave"].some(y=>{var x;return(x=E.__r3f)==null?void 0:x.handlers["onPointer"+y]}))}function s(m,E){const y=n.getState(),x=new Set,R=[],w=E?E(y.internal.interaction):y.internal.interaction;for(let d=0;d<w.length;d++){const C=Da(w[d]);C&&(C.raycaster.camera=void 0)}y.previousRoot||y.events.compute==null||y.events.compute(m,y);function F(d){const C=Da(d);if(!C||!C.events.enabled||C.raycaster.camera===null)return[];if(C.raycaster.camera===void 0){var N;C.events.compute==null||C.events.compute(m,C,(N=C.previousRoot)==null?void 0:N.getState()),C.raycaster.camera===void 0&&(C.raycaster.camera=null)}return C.raycaster.camera?C.raycaster.intersectObject(d,!0):[]}let O=w.flatMap(F).sort((d,C)=>{const N=Da(d.object),P=Da(C.object);return!N||!P?d.distance-C.distance:P.events.priority-N.events.priority||d.distance-C.distance}).filter(d=>{const C=yo(d);return x.has(C)?!1:(x.add(C),!0)});y.events.filter&&(O=y.events.filter(O,y));for(const d of O){let C=d.object;for(;C;){var _;(_=C.__r3f)!=null&&_.eventCount&&R.push({...d,eventObject:C}),C=C.parent}}if("pointerId"in m&&y.internal.capturedMap.has(m.pointerId))for(let d of y.internal.capturedMap.get(m.pointerId).values())x.has(yo(d.intersection))||R.push(d.intersection);return R}function u(m,E,y,x){if(m.length){const R={stopped:!1};for(const w of m){let F=Da(w.object);if(F||w.object.traverseAncestors(O=>{const _=Da(O);if(_)return F=_,!1}),F){const{raycaster:O,pointer:_,camera:d,internal:C}=F,N=new yt(_.x,_.y,0).unproject(d),P=M=>{var T,z;return(T=(z=C.capturedMap.get(M))==null?void 0:z.has(w.eventObject))!=null?T:!1},q=M=>{const T={intersection:w,target:E.target};C.capturedMap.has(M)?C.capturedMap.get(M).set(w.eventObject,T):C.capturedMap.set(M,new Map([[w.eventObject,T]])),E.target.setPointerCapture(M)},D=M=>{const T=C.capturedMap.get(M);T&&wg(C.capturedMap,w.eventObject,T,M)};let V={};for(let M in E){let T=E[M];typeof T!="function"&&(V[M]=T)}let W={...w,...V,pointer:_,intersections:m,stopped:R.stopped,delta:y,unprojectedPoint:N,ray:O.ray,camera:d,stopPropagation(){const M="pointerId"in E&&C.capturedMap.get(E.pointerId);if((!M||M.has(w.eventObject))&&(W.stopped=R.stopped=!0,C.hovered.size&&Array.from(C.hovered.values()).find(T=>T.eventObject===w.eventObject))){const T=m.slice(0,m.indexOf(w));f([...T,w])}},target:{hasPointerCapture:P,setPointerCapture:q,releasePointerCapture:D},currentTarget:{hasPointerCapture:P,setPointerCapture:q,releasePointerCapture:D},nativeEvent:E};if(x(W),R.stopped===!0)break}}}return m}function f(m){const{internal:E}=n.getState();for(const y of E.hovered.values())if(!m.length||!m.find(x=>x.object===y.object&&x.index===y.index&&x.instanceId===y.instanceId)){const R=y.eventObject.__r3f;if(E.hovered.delete(yo(y)),R!=null&&R.eventCount){const w=R.handlers,F={...y,intersections:m};w.onPointerOut==null||w.onPointerOut(F),w.onPointerLeave==null||w.onPointerLeave(F)}}}function h(m,E){for(let y=0;y<E.length;y++){const x=E[y].__r3f;x==null||x.handlers.onPointerMissed==null||x.handlers.onPointerMissed(m)}}function p(m){switch(m){case"onPointerLeave":case"onPointerCancel":return()=>f([]);case"onLostPointerCapture":return E=>{const{internal:y}=n.getState();"pointerId"in E&&y.capturedMap.has(E.pointerId)&&requestAnimationFrame(()=>{y.capturedMap.has(E.pointerId)&&(y.capturedMap.delete(E.pointerId),f([]))})}}return function(y){const{onPointerMissed:x,internal:R}=n.getState();R.lastEvent.current=y;const w=m==="onPointerMove",F=m==="onClick"||m==="onContextMenu"||m==="onDoubleClick",_=s(y,w?a:void 0),d=F?i(y):0;m==="onPointerDown"&&(R.initialClick=[y.offsetX,y.offsetY],R.initialHits=_.map(N=>N.eventObject)),F&&!_.length&&d<=2&&(h(y,R.interaction),x&&x(y)),w&&f(_);function C(N){const P=N.eventObject,q=P.__r3f;if(!(q!=null&&q.eventCount))return;const D=q.handlers;if(w){if(D.onPointerOver||D.onPointerEnter||D.onPointerOut||D.onPointerLeave){const V=yo(N),W=R.hovered.get(V);W?W.stopped&&N.stopPropagation():(R.hovered.set(V,N),D.onPointerOver==null||D.onPointerOver(N),D.onPointerEnter==null||D.onPointerEnter(N))}D.onPointerMove==null||D.onPointerMove(N)}else{const V=D[m];V?(!F||R.initialHits.includes(P))&&(h(y,R.interaction.filter(W=>!R.initialHits.includes(W))),V(N)):F&&R.initialHits.includes(P)&&h(y,R.interaction.filter(W=>!R.initialHits.includes(W)))}}u(_,y,d,C)}}return{handlePointer:p}}const rd=n=>typeof n?.then=="function",fC=n=>Object.assign(Promise.resolve(n),{status:"fulfilled",value:n}),dC=n=>{const i=Promise.reject(n);return i.catch(()=>{}),Object.assign(i,{status:"rejected",reason:n})},pC=()=>{let n,i;const a=new Promise((s,u)=>{n=f=>{Object.assign(a,{status:"fulfilled",value:f}),s(f)},i=f=>{Object.assign(a,{status:"rejected",reason:f}),u(f)}});return a.status="pending",a.catch(()=>{}),{promise:a,resolve:n,reject:i}},id=n=>!!(n!=null&&n.render);function hC(n,i){const a={canvas:n,powerPreference:"high-performance",antialias:!0,alpha:!0};return typeof i=="function"?i(a):id(i)?i:new Zf({...a,...i})}function mC(n){if((n.hasInitialized==null?void 0:n.hasInitialized())===!1)return;const i=Po(()=>{var a;return n.dispose?n.dispose():(a=n.renderLists)==null||a.dispose==null?void 0:a.dispose()});if(rd(i))return Promise.resolve(i).catch(a=>console.warn("[R3F] Error disposing renderer",a)).then(()=>Po(()=>n.forceContextLoss==null?void 0:n.forceContextLoss()));Po(()=>n.forceContextLoss==null?void 0:n.forceContextLoss())}function vC(n,i){if(n){if(i)return mC(n);Po(()=>{var a;return(a=n.renderLists)==null||a.dispose==null?void 0:a.dispose()}),Po(()=>n.forceContextLoss==null?void 0:n.forceContextLoss())}}function Po(n){try{return n()}catch(i){console.warn("[R3F] Error while unmounting root; teardown may be incomplete:",i)}}const ad=Se.createContext(null),gC=(n,i)=>{const a=_g((p,m)=>{const E=new yt,y=new yt,x=new yt;function R(d=m().camera,C=y,N=m().size){const{width:P,height:q,top:D,left:V}=N,W=P/q;C.isVector3?x.copy(C):x.set(...C);const M=d.getWorldPosition(E).distanceTo(x);if(Tg(d))return{width:P/d.zoom,height:q/d.zoom,top:D,left:V,factor:1,distance:M,aspect:W};{const T=d.fov*Math.PI/180,z=2*Math.tan(T/2)*M,j=z*(P/q);return{width:j,height:z,top:D,left:V,factor:P/j,distance:M,aspect:W}}}let w;const F=d=>p(C=>({performance:{...C.performance,current:d}})),O=new Hn;return{set:p,get:m,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(d=1)=>n(m(),d),advance:(d,C)=>i(d,C,m()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new ig,pointer:O,mouse:O,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{const d=m();w&&clearTimeout(w),d.performance.current!==d.performance.min&&F(d.performance.min),w=setTimeout(()=>F(m().performance.max),d.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:R},setEvents:d=>p(C=>({...C,events:{...C.events,...d}})),setSize:(d,C,N=0,P=0)=>{const q=m().camera,D={width:d,height:C,top:N,left:P};p(V=>({size:D,viewport:{...V.viewport,...R(q,y,D)}}))},setDpr:d=>p(C=>{const N=nd(d);return{viewport:{...C.viewport,dpr:N,initialDpr:C.viewport.initialDpr||N}}}),setFrameloop:(d="always")=>{const C=m().clock;C.stop(),C.elapsedTime=0,d!=="never"&&(C.start(),C.elapsedTime=0),p(()=>({frameloop:d}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:Se.createRef(),active:!1,frames:0,priority:0,subscribe:(d,C,N)=>{const P=m().internal;return P.priority=P.priority+(C>0?1:0),P.subscribers.push({ref:d,priority:C,store:N}),P.subscribers=P.subscribers.sort((q,D)=>q.priority-D.priority),()=>{const q=m().internal;q!=null&&q.subscribers&&(q.priority=q.priority-(C>0?1:0),q.subscribers=q.subscribers.filter(D=>D.ref!==d))}}}}}),s=a.getState();let u=s.size,f=s.viewport.dpr,h=s.camera;return a.subscribe(()=>{const{camera:p,size:m,viewport:E,gl:y,set:x}=a.getState();if(m.width!==u.width||m.height!==u.height||E.dpr!==f){u=m,f=E.dpr,yg(p,m),E.dpr>0&&y.setPixelRatio(E.dpr);const R=typeof HTMLCanvasElement<"u"&&y.domElement instanceof HTMLCanvasElement;y.setSize(m.width,m.height,R)}p!==h&&(h=p,x(R=>({viewport:{...R.viewport,...R.viewport.getCurrentViewport(p)}})))}),a.subscribe(p=>n(p)),a};function od(){const n=Se.useContext(ad);if(!n)throw new Error("R3F: Hooks can only be used within the Canvas component!");return n}function wi(n=a=>a,i){return od()(n,i)}function Wo(n,i=0){const a=od(),s=a.getState().internal.subscribe,u=ed(n);return na(()=>s(u,i,a),[i,s,a]),null}const Nm=new WeakMap,_C=n=>{var i;return typeof n=="function"&&(n==null||(i=n.prototype)==null?void 0:i.constructor)===n};function Rg(n,i){return function(a,...s){let u;return _C(a)?(u=Nm.get(a),u||(u=new a,Nm.set(a,u))):u=a,n&&n(u),Promise.all(s.map(f=>new Promise((h,p)=>u.load(f,m=>{Yn(m?.scene)&&Object.assign(m,nC(m.scene)),h(m)},i,m=>p(new Error(`Could not load ${f}: ${m?.message}`))))))}}function Xa(n,i,a,s){const u=Array.isArray(i)?i:[i],f=OA(Rg(a,s),[n,...u],{equal:gn.equ});return Array.isArray(i)?f:f[0]}Xa.preload=function(n,i,a){const s=Array.isArray(i)?i:[i];return BA(Rg(a),[n,...s])};Xa.clear=function(n,i){const a=Array.isArray(i)?i:[i];return kA([n,...a])};const SC=1,Fm=8,rl=32,Om=2,EC=268435456,bC={objects:"shallow"};function MC(n,i){if(!i&&typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement&&n.parentElement){const{width:a,height:s,top:u,left:f}=n.parentElement.getBoundingClientRect();return{width:a,height:s,top:u,left:f}}else if(!i&&typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas)return{width:n.width,height:n.height,top:0,left:0};return{width:0,height:0,top:0,left:0,...i}}function TC({store:n,configuration:i},a,s){const{gl:u,scene:f,camera:h,shadows:p=!1,linear:m=!1,flat:E=!1,legacy:y=!1,frameloop:x="always",dpr:R=[1,2],performance:w,onPointerMissed:F}=s,O=MC(a,s.size),_={...s,shadows:p,linear:m,flat:E,legacy:y,frameloop:x,size:O},d=n.getState(),C=d.gl,N=i.previous,P=T=>!N||!gn.equ(_[T],N[T],bC);i.previous=void 0;let q=d.raycaster;if(q||d.set({raycaster:q=new $f}),P("raycaster")){var D;const{params:T,...z}=(D=s.raycaster)!=null?D:{};qr(q,{...z,params:{...q.params,...T}})}if(!d.camera||d.camera===i.camera&&P("camera")){i.camera=h;const T=h?.isCamera,z=T?h:s.orthographic?new Tl(0,0,0,0,.1,1e3):new Ba(75,0,.1,1e3);T||(z.position.z=5,h&&(qr(z,h),z.manual||("aspect"in h||"left"in h||"right"in h||"bottom"in h||"top"in h)&&(z.manual=!0,z.updateProjectionMatrix())),!d.camera&&!(h!=null&&h.rotation)&&z.lookAt(0,0,0)),d.set({camera:z}),q.camera=z}if(!d.scene){let T;f!=null&&f.isScene?(T=f,hl(T,n,"",{})):(T=new xl,hl(T,n,"",{}),f&&qr(T,f)),d.set({scene:T})}if(s.events&&!d.events.handlers&&d.set({events:s.events(n)}),P("size")&&d.setSize(O.width,O.height,O.top,O.left),d.viewport.dpr!==nd(R)&&d.setDpr(R),P("frameloop")&&d.setFrameloop(x),P("onPointerMissed")&&d.set({onPointerMissed:F}),w&&P("performance")&&d.set(T=>({performance:{...T.performance,...w}})),!d.xr){var V;const T=(Q,K)=>{const se=n.getState();se.frameloop!=="never"&&Ug(Q,!0,se,K)},z=()=>{const Q=n.getState();Q.gl.xr.enabled=Q.gl.xr.isPresenting,Q.gl.xr.setAnimationLoop(Q.gl.xr.isPresenting?T:null),Q.gl.xr.isPresenting||ud(Q)},j={connect(){const Q=n.getState().gl;Q.xr.addEventListener("sessionstart",z),Q.xr.addEventListener("sessionend",z)},disconnect(){const Q=n.getState().gl;Q.xr.removeEventListener("sessionstart",z),Q.xr.removeEventListener("sessionend",z)}};typeof((V=C.xr)==null?void 0:V.addEventListener)=="function"&&j.connect(),d.set({xr:j})}if(C.shadowMap&&P("shadows")){const T=C.shadowMap.enabled,z=C.shadowMap.type;if(C.shadowMap.enabled=!!p,gn.boo(p))C.shadowMap.type=Ao;else if(gn.str(p)){var W;const j={basic:rg,percentage:bl,soft:Ao,variance:Ir};C.shadowMap.type=(W=j[p])!=null?W:Ao}else gn.obj(p)&&Object.assign(C.shadowMap,p);(T!==C.shadowMap.enabled||z!==C.shadowMap.type)&&(C.shadowMap.needsUpdate=!0)}const M=u&&!gn.fun(u)&&!id(u)?u:void 0;P("legacy")&&(vn.enabled=!y,d.set({legacy:y})),P("linear")&&(M?.outputColorSpace===void 0&&(C.outputColorSpace=m?oi:zo),d.set({linear:m})),P("flat")&&(M?.toneMapping===void 0&&(C.toneMapping=E?Yr:Yf),d.set({flat:E})),M&&P("gl")&&qr(C,M),i.previous=_}function xC(n){const i=()=>{var u;return(u=n.store.getState().gl)==null?void 0:u.xr},a=()=>{var u,f,h,p;const m=n.store.getState();if((u=i())!=null&&u.isPresenting||(f=i())!=null&&f.getSession!=null&&f.getSession()){i().addEventListener("sessionend",a);return}(h=i())==null||h.removeEventListener==null||h.removeEventListener("sessionend",a);const E=n.configuration.previous;if(!E)return;const y=(p=E.dpr)!=null?p:[1,2];m.viewport.dpr!==nd(y)&&m.setDpr(y)},s=tC(a);return()=>{var u;s(),(u=i())==null||u.removeEventListener==null||u.removeEventListener("sessionend",a)}}var yC={version:"9.8.2"};function wC(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Bm={exports:{}},km={exports:{}},Hm;function RC(){return Hm||(Hm=1,(function(n){n.exports=function(i){function a(e,t,r,o){return new E_(e,t,r,o)}function s(){}function u(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(e){for(var t=e,r=t;r&&!r.alternate;)t=r,(t.flags&4098)!==0&&(e=t.return),r=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function h(e){if(f(e)!==e)throw Error(u(188))}function p(e){var t=e.alternate;if(!t){if(t=f(e),t===null)throw Error(u(188));return t!==e?null:e}for(var r=e,o=t;;){var l=r.return;if(l===null)break;var c=l.alternate;if(c===null){if(o=l.return,o!==null){r=o;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===r)return h(l),e;if(c===o)return h(l),t;c=c.sibling}throw Error(u(188))}if(r.return!==o.return)r=l,o=c;else{for(var S=!1,B=l.child;B;){if(B===r){S=!0,r=l,o=c;break}if(B===o){S=!0,o=l,r=c;break}B=B.sibling}if(!S){for(B=c.child;B;){if(B===r){S=!0,r=c,o=l;break}if(B===o){S=!0,o=c,r=l;break}B=B.sibling}if(!S)throw Error(u(189))}}if(r.alternate!==o)throw Error(u(190))}if(r.tag!==3)throw Error(u(188));return r.stateNode.current===r?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}function E(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(e.tag!==4&&(t=E(e),t!==null))return t;e=e.sibling}return null}function y(e){return e===null||typeof e!="object"?null:(e=gh&&e[gh]||e["@@iterator"],typeof e=="function"?e:null)}function x(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===R_?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case da:return"Fragment";case Pu:return"Profiler";case mh:return"StrictMode";case Lu:return"Suspense";case Du:return"SuspenseList";case Nu:return"Activity";case Fu:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case fa:return"Portal";case Zr:return e.displayName||"Context";case vh:return(e._context.displayName||"Context")+".Consumer";case Iu:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Uu:return t=e.displayName||null,t!==null?t:x(e.type)||"Memo";case fi:t=e._payload,e=e._init;try{return x(e(t))}catch{}}return null}function R(e){return{current:e}}function w(e){0>ma||(e.current=Wu[ma],Wu[ma]=null,ma--)}function F(e,t){ma++,Wu[ma]=e.current,e.current=t}function O(e){return e>>>=0,e===0?32:31-(pS(e)/hS|0)|0}function _(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function d(e,t,r){var o=e.pendingLanes;if(o===0)return 0;var l=0,c=e.suspendedLanes,S=e.pingedLanes;e=e.warmLanes;var B=o&134217727;return B!==0?(o=B&~c,o!==0?l=_(o):(S&=B,S!==0?l=_(S):r||(r=B&~e,r!==0&&(l=_(r))))):(B=o&~c,B!==0?l=_(B):S!==0?l=_(S):r||(r=o&~e,r!==0&&(l=_(r)))),l===0?0:t!==0&&t!==l&&(t&c)===0&&(c=l&-l,r=t&-t,c>=r||c===32&&(r&4194048)!==0)?t:l}function C(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function N(e,t){(t&8)!==0&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var o=31-or(r),l=1<<o;t|=e[o],r&=~l}return t}function P(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function q(){var e=bs;return bs<<=1,(bs&62914560)===0&&(bs=4194304),e}function D(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function V(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function W(e,t,r,o,l,c){var S=e.pendingLanes;e.pendingLanes=r,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=r,e.entangledLanes&=r,e.errorRecoveryDisabledLanes&=r,e.shellSuspendCounter=0;var B=e.entanglements,ie=e.expirationTimes,ge=e.hiddenUpdates;for(r=S&~r;0<r;){var xe=31-or(r),Fe=1<<xe;B[xe]=0,ie[xe]=-1;var Ve=ge[xe];if(Ve!==null)for(ge[xe]=null,xe=0;xe<Ve.length;xe++){var Rt=Ve[xe];Rt!==null&&(Rt.lane&=-536870913)}r&=~Fe}o!==0&&M(e,o,0),c!==0&&l===0&&e.tag!==0&&(e.suspendedLanes|=c&~(S&~t))}function M(e,t,r){e.pendingLanes|=t,e.suspendedLanes&=~t;var o=31-or(t);e.entangledLanes|=t,e.entanglements[o]=e.entanglements[o]|1073741824|r&261930}function T(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var o=31-or(r),l=1<<o;l&t|e[o]&t&&(e[o]|=t),r&=~l}}function z(e,t){var r=t&-t;return r=(r&42)!==0?1:j(r),(r&(e.suspendedLanes|t))!==0?0:r}function j(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Q(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function K(e){if(typeof SS=="function"&&ES(e),sr&&typeof sr.setStrictMode=="function")try{sr.setStrictMode(so,e)}catch{}}function se(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Cr.identifierPrefix;var r=bS++;return e="_"+e+"t_"+r.toString(32)+"_",t.autoName=e}function ne(e){var t;if(e==null||typeof e=="string")return e;var r=null,o=Ia;if(o!==null)for(var l=0;l<o.length;l++){var c=e[o[l]];if(c!=null){if(c==="none")return"none";r=r==null?c:r+(" "+c)}}return(t=r)!=null?t:e.default}function be(e,t){return e=ne(e),t=ne(t),t==null?e==="auto"?null:e:t==="auto"?null:t}function oe(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}function Ue(e){if(Yu===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Yu=t&&t[1]||"",qh=-1<r.stack.indexOf(`
    at`)?" (<anonymous>)":-1<r.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Yu+e+qh}function Le(e,t){if(!e||ju)return"";ju=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(t){var Fe=function(){throw Error()};if(Object.defineProperty(Fe.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Fe,[])}catch(Bt){var Ve=Bt}Reflect.construct(e,[],Fe)}else{try{Fe.call()}catch(Bt){Ve=Bt}Fe=!1;try{var Rt=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),Fe=!0,new e}finally{Fe&&(Rt!==void 0?Object.defineProperty(e.prototype,"props",Rt):delete e.prototype.props)}}}else{try{throw Error()}catch(Bt){Ve=Bt}(Fe=e())&&typeof Fe.catch=="function"&&Fe.catch(function(){})}}catch(Bt){if(Bt&&Ve&&typeof Bt.stack=="string")return[Bt.stack,Ve.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var l=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");l&&l.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var c=o.DetermineComponentFrameRoot(),S=c[0],B=c[1];if(S&&B){var ie=S.split(`
`),ge=B.split(`
`);for(l=o=0;o<ie.length&&!ie[o].includes("DetermineComponentFrameRoot");)o++;for(;l<ge.length&&!ge[l].includes("DetermineComponentFrameRoot");)l++;if(o===ie.length||l===ge.length)for(o=ie.length-1,l=ge.length-1;1<=o&&0<=l&&ie[o]!==ge[l];)l--;for(;1<=o&&0<=l;o--,l--)if(ie[o]!==ge[l]){if(o!==1||l!==1)do if(o--,l--,0>l||ie[o]!==ge[l]){var xe=`
`+ie[o].replace(" at new "," at ");return e.displayName&&xe.includes("<anonymous>")&&(xe=xe.replace("<anonymous>",e.displayName)),xe}while(1<=o&&0<=l);break}}}finally{ju=!1,Error.prepareStackTrace=r}return(r=e?e.displayName||e.name:"")?Ue(r):""}function et(e,t){switch(e.tag){case 26:case 27:case 5:return Ue(e.type);case 16:return Ue("Lazy");case 13:return e.child!==t&&t!==null?Ue("Suspense Fallback"):Ue("Suspense");case 19:return Ue("SuspenseList");case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return Ue("Activity");case 30:return Ue("ViewTransition");default:return""}}function tt(e){try{var t="",r=null;do t+=et(e,r),r=e,e=e.return;while(e);return t}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}function ot(e,t){if(typeof e=="object"&&e!==null){var r=Yh.get(e);return r!==void 0?r:(t={value:e,source:t,stack:tt(t)},Yh.set(e,t),t)}return{value:e,source:t,stack:tt(t)}}function rt(e,t){ga[_a++]=lo,ga[_a++]=Ts,Ts=e,lo=t}function dt(e,t,r){Sr[Er++]=kr,Sr[Er++]=Hr,Sr[Er++]=di,di=e;var o=kr;e=Hr;var l=32-or(o)-1;o&=~(1<<l),r+=1;var c=32-or(t)+l;if(30<c){var S=l-l%5;c=(o&(1<<S)-1).toString(32),o>>=S,l-=S,kr=1<<32-or(t)+l|r<<l|o,Hr=c+e}else kr=1<<c|r<<l|o,Hr=e}function re(e){e.return!==null&&(rt(e,1),dt(e,1,0))}function ve(e){for(;e===Ts;)Ts=ga[--_a],ga[_a]=null,lo=ga[--_a],ga[_a]=null;for(;e===di;)di=Sr[--Er],Sr[Er]=null,Hr=Sr[--Er],Sr[Er]=null,kr=Sr[--Er],Sr[Er]=null}function Ne(e,t){Sr[Er++]=kr,Sr[Er++]=Hr,Sr[Er++]=di,kr=t.id,Hr=t.overflow,di=e}function st(e,t){F(pi,t),F(uo,e),F(Un,null),e=P_(t),w(Un),F(Un,e)}function Ye(){w(Un),w(uo),w(pi)}function Mt(e){var t=e.memoizedState;t!==null&&(t=t.memoizedState,Or?Jr._currentValue=t:Jr._currentValue2=t,F(xs,e)),t=Un.current;var r=I_(t,e.type);t!==r&&(F(uo,e),F(Un,r))}function ln(e){uo.current===e&&(w(Un),w(uo)),xs.current===e&&(w(xs),Or?Jr._currentValue=pa:Jr._currentValue2=pa)}function k(e){var t=Error(u(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw We(ot(t,e)),$u}function Vt(e,t){if(!Dn)throw Error(u(175));W0(e.stateNode,e.type,e.memoizedProps,t,e)||k(e,!0)}function pt(e){for(Rn=e.return;Rn;)switch(Rn.tag){case 5:case 31:case 13:br=!1;return;case 27:case 3:br=!0;return;default:Rn=Rn.return}}function it(e){if(!Dn||e!==Rn)return!1;if(!xt)return pt(e),xt=!0,!1;var t=e.tag;if(cn?t!==3&&t!==27&&(t!==5||Uh(e.type)&&!vs(e.type,e.memoizedProps))&&sn&&k(e):t!==3&&(t!==5||Uh(e.type)&&!vs(e.type,e.memoizedProps))&&sn&&k(e),pt(e),t===13){if(!Dn)throw Error(u(316));if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));sn=$0(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(317));sn=j0(e)}else sn=cn&&t===27?U0(e.type,sn):Rn?Dh(e.stateNode):null;return!0}function Ge(){Dn&&(sn=Rn=null,xt=!1)}function Wt(){var e=hi;return e!==null&&(er===null?er=e:er.push.apply(er,e),hi=null),e}function We(e){hi===null?hi=[e]:hi.push(e)}function ut(e,t,r){Or?(F(ys,t._currentValue),t._currentValue=r):(F(ys,t._currentValue2),t._currentValue2=r)}function Xt(e){var t=ys.current;Or?e._currentValue=t:e._currentValue2=t,w(ys)}function $t(e,t,r){for(;e!==null;){var o=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,o!==null&&(o.childLanes|=t)):o!==null&&(o.childLanes&t)!==t&&(o.childLanes|=t),e===r)break;e=e.return}}function I(e,t,r,o){var l=e.child;for(l!==null&&(l.return=e);l!==null;){var c=l.dependencies;if(c!==null){var S=l.child;c=c.firstContext;e:for(;c!==null;){var B=c;c=l;for(var ie=0;ie<t.length;ie++)if(B.context===t[ie]){c.lanes|=r,B=c.alternate,B!==null&&(B.lanes|=r),$t(c.return,r,e),o||(S=null);break e}c=B.next}}else if(l.tag===18){if(S=l.return,S===null)throw Error(u(341));S.lanes|=r,c=S.alternate,c!==null&&(c.lanes|=r),$t(S,r,e),S=null}else l.tag===13&&l.memoizedState!==null&&l.memoizedState.dehydrated===null?(l.lanes|=r,S=l.alternate,S!==null&&(S.lanes|=r),$t(l.return,r,e),S=l.child,S=S!==null?S.sibling:null):S=l.child;if(S!==null)S.return=l;else for(S=l;S!==null;){if(S===e){S=null;break}if(l=S.sibling,l!==null){l.return=S.return,S=l;break}S=S.return}l=S}}function b(e,t,r,o){e=null;for(var l=t,c=!1;l!==null;){if(!c){if((l.flags&524288)!==0)c=!0;else if((l.flags&262144)!==0)break}if(l.tag===10){var S=l.alternate;if(S===null)throw Error(u(387));if(S=S.memoizedProps,S!==null){var B=l.type;lr(l.pendingProps.value,S.value)||(e!==null?e.push(B):e=[B])}}else if(l===xs.current){if(S=l.alternate,S===null)throw Error(u(387));S.memoizedState.memoizedState!==l.memoizedState.memoizedState&&(e!==null?e.push(Jr):e=[Jr])}l=l.return}return e!==null&&I(t,e,r,o),t.flags|=262144,e!==null}function Z(e){for(e=e.firstContext;e!==null;){var t=e.context;if(!lr(Or?t._currentValue:t._currentValue2,e.memoizedValue))return!0;e=e.next}return!1}function de(e){Di=e,ei=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function he(e){return Ze(Di,e)}function fe(e,t){return Di===null&&de(e),Ze(e,t)}function Ze(e,t){var r=Or?t._currentValue:t._currentValue2;if(t={context:t,memoizedValue:r,next:null},ei===null){if(e===null)throw Error(u(308));ei=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ei=ei.next=t;return r}function Pe(){return{controller:new TS,data:new Map,refCount:0}}function je(e){e.refCount--,e.refCount===0&&xS(yS,function(){e.controller.abort()})}function Qe(e,t){if((e.pendingLanes&4194048)!==0){var r=e.transitionTypes;for(r===null&&(r=e.transitionTypes=[]),e=0;e<t.length;e++){var o=t[e];r.indexOf(o)===-1&&r.push(o)}}}function Te(e){var t=e.transitionTypes;return e.transitionTypes=null,t}function we(){}function Je(e){e!==Ea&&e.next===null&&(Ea===null?Sa=Ea=e:Ea=Ea.next=e),ws=!0,Ku||(Ku=!0,Xe())}function He(e,t){if(!Zu&&ws){Zu=!0;do for(var r=!1,o=Sa;o!==null;){if(e!==0){var l=o.pendingLanes;if(l===0)var c=0;else{var S=o.suspendedLanes,B=o.pingedLanes;c=(1<<31-or(42|e)+1)-1,c&=l&~(S&~B),c=c&201326741?c&201326741|1:c?c|2:0}c!==0&&(r=!0,Ie(o,c))}else c=Dt,c=d(o,o===en?c:0,o.cancelPendingCommit!==null||o.timeoutHandle!==Li),(c&3)===0||C(o,c)||(r=!0,Ie(o,c));o=o.next}while(r);Zu=!1}}function Ce(){nt()}function nt(){ws=Ku=!1;var e=0;Ui!==0&&H_()&&(e=Ui);for(var t=Zn(),r=null,o=Sa;o!==null;){var l=o.next,c=Y(o,t);c===0?(o.next=null,r===null?Sa=l:r.next=l,l===null&&(Ea=r)):(r=o,(e!==0||(c&3)!==0)&&(ws=!0)),o=l}dn!==0&&dn!==5||He(e),Ui!==0&&(Ui=0)}function Y(e,t){for(var r=e.suspendedLanes,o=e.pingedLanes,l=e.expirationTimes,c=e.pendingLanes&-62914561;0<c;){var S=31-or(c),B=1<<S,ie=l[S];ie===-1?((B&r)===0||(B&o)!==0)&&(l[S]=P(B,t)):ie<=t&&(e.expiredLanes|=B),c&=~B}if(t=en,r=Dt,r=d(e,e===t?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==Li),o=e.callbackNode,r===0||e===t&&(jt===2||jt===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&Xu(o),e.callbackNode=null,e.callbackPriority=0;if((r&3)===0||C(e,r)){if(t=r&-r,t===e.callbackPriority)return t;switch(o!==null&&Xu(o),Q(r)){case 2:case 8:r=gS;break;case 32:r=qu;break;case 268435456:r=_S;break;default:r=qu}return o=J.bind(null,e),r=Ms(r,o),e.callbackPriority=t,e.callbackNode=r,t}return o!==null&&o!==null&&Xu(o),e.callbackPriority=2,e.callbackNode=null,2}function J(e,t){if(dn!==0&&dn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var r=e.callbackNode;if(ro()&&e.callbackNode!==r)return null;var o=Dt;return o=d(e,e===en?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==Li),o===0?null:(jp(e,o,t),Y(e,Zn()),e.callbackNode!=null&&e.callbackNode===r?J.bind(null,e):null)}function Ie(e,t){if(ro())return null;jp(e,t,!0)}function Xe(){j_?$_(function(){(It&6)!==0?Ms(Wh,Ce):nt()}):Ms(Wh,Ce)}function Me(){if(Ui===0){var e=Ni;e===0&&(e=Ss,Ss<<=1,(Ss&261888)===0&&(Ss=256)),Ui=e}return Ui}function _e(e,t){if(fo===null){var r=fo=[];Qu=0,Ni=Me(),ba={status:"pending",value:void 0,then:function(o){r.push(o)}}}return Qu++,t.then($e,$e),t}function $e(){if(--Qu===0&&(co=null,fo!==null)){ba!==null&&(ba.status="fulfilled");var e=fo;fo=null,Ni=0,ba=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function gt(e,t){var r=[],o={status:"pending",value:null,reason:null,then:function(l){r.push(l)}};return e.then(function(){o.status="fulfilled",o.value=t;for(var l=0;l<r.length;l++)(0,r[l])(t)},function(l){for(o.status="rejected",o.reason=l,l=0;l<r.length;l++)(0,r[l])(void 0)}),o}function Ht(){var e=Fi.current;return e!==null?e:en.pooledCache}function At(e,t){t===null?F(Fi,Fi.current):F(Fi,t.pool)}function $n(){var e=Ht();return e===null?null:{parent:Or?fn._currentValue:fn._currentValue2,pool:e}}function Pn(e,t){if(lr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),o=Object.keys(t);if(r.length!==o.length)return!1;for(o=0;o<r.length;o++){var l=r[o];if(!MS.call(t,l)||!lr(e[l],t[l]))return!1}return!0}function Ri(e){return e=e.status,e==="fulfilled"||e==="rejected"}function mr(e,t,r){switch(r=e[r],r===void 0?e.push(t):r!==t&&(t.then(we,we),t=r),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yr(e),e===void 0&&!("reason"in t)?Error(u(600)):e;default:if(typeof t.status=="string")t.then(we,we);else{if(e=en,e!==null&&100<e.shellSuspendCounter)throw Error(u(482));e=t,e.status="pending",e.then(function(o){if(t.status==="pending"){var l=t;l.status="fulfilled",l.value=o}},function(o){if(t.status==="pending"){var l=t;l.status="rejected",l.reason=o}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yr(e),e}throw Oi=t,Ma}}function zn(e){try{var t=e._init;return t(e._payload)}catch(r){throw r!==null&&typeof r=="object"&&typeof r.then=="function"?(Oi=r,Ma):r}}function Ai(){if(Oi===null)throw Error(u(459));var e=Oi;return Oi=null,e}function yr(e){if(e===Ma||e===Rs)throw Error(u(483))}function Xn(e){var t=po;return po+=1,Ta===null&&(Ta=[]),mr(Ta,e,t)}function _t(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function vr(e,t){throw t.$$typeof===T_?Error(u(525)):(e=Object.prototype.toString.call(t),Error(u(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Ci(e){function t(te,$){if(e){var ae=te.deletions;ae===null?(te.deletions=[$],te.flags|=16):ae.push($)}}function r(te,$){if(!e)return null;for(;$!==null;)t(te,$),$=$.sibling;return null}function o(te){for(var $=new Map;te!==null;)te.key===null?$.set(te.index,te):$.set(te.key,te),te=te.sibling;return $}function l(te,$){return te=Kr(te,$),te.index=0,te.sibling=null,te}function c(te,$,ae){return te.index=ae,e?(ae=te.alternate,ae!==null?(ae=ae.index,ae<$?(te.flags|=2,$):ae):(te.flags|=134217730,$)):(te.flags|=1048576,$)}function S(te){return e&&te.alternate===null&&(te.flags|=134217730),te}function B(te,$,ae,Ae){return $===null||$.tag!==6?($=wu(ae,te.mode,Ae),$.return=te,$):($=l($,ae),$.return=te,$)}function ie(te,$,ae,Ae){var ft=ae.type;return ft===da?(te=xe(te,$,ae.props.children,Ae,ae.key),_t(te,ae),te):$!==null&&($.elementType===ft||typeof ft=="object"&&ft!==null&&ft.$$typeof===fi&&zn(ft)===$.type)?($=l($,ae.props),_t($,ae),$.return=te,$):($=ps(ae.type,ae.key,ae.props,null,te.mode,Ae),_t($,ae),$.return=te,$)}function ge(te,$,ae,Ae){return $===null||$.tag!==4||$.stateNode.containerInfo!==ae.containerInfo||$.stateNode.implementation!==ae.implementation?($=Ru(ae,te.mode,Ae),$.return=te,$):($=l($,ae.children||[]),$.return=te,$)}function xe(te,$,ae,Ae,ft){return $===null||$.tag!==7?($=Ii(ae,te.mode,Ae,ft),$.return=te,$):($=l($,ae),$.return=te,$)}function Fe(te,$,ae){if(typeof $=="string"&&$!==""||typeof $=="number"||typeof $=="bigint")return $=wu(""+$,te.mode,ae),$.return=te,$;if(typeof $=="object"&&$!==null){switch($.$$typeof){case hs:return ae=ps($.type,$.key,$.props,null,te.mode,ae),_t(ae,$),ae.return=te,ae;case fa:return $=Ru($,te.mode,ae),$.return=te,$;case fi:return $=zn($),Fe(te,$,ae)}if(ms($)||y($))return $=Ii($,te.mode,ae,null),$.return=te,$;if(typeof $.then=="function")return Fe(te,Xn($),ae);if($.$$typeof===Zr)return Fe(te,fe(te,$),ae);vr(te,$)}return null}function Ve(te,$,ae,Ae){var ft=$!==null?$.key:null;if(typeof ae=="string"&&ae!==""||typeof ae=="number"||typeof ae=="bigint")return ft!==null?null:B(te,$,""+ae,Ae);if(typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case hs:return ae.key===ft?ie(te,$,ae,Ae):null;case fa:return ae.key===ft?ge(te,$,ae,Ae):null;case fi:return ae=zn(ae),Ve(te,$,ae,Ae)}if(ms(ae)||y(ae))return ft!==null?null:xe(te,$,ae,Ae,null);if(typeof ae.then=="function")return Ve(te,$,Xn(ae),Ae);if(ae.$$typeof===Zr)return Ve(te,$,fe(te,ae),Ae);vr(te,ae)}return null}function Rt(te,$,ae,Ae,ft){if(typeof Ae=="string"&&Ae!==""||typeof Ae=="number"||typeof Ae=="bigint")return te=te.get(ae)||null,B($,te,""+Ae,ft);if(typeof Ae=="object"&&Ae!==null){switch(Ae.$$typeof){case hs:return te=te.get(Ae.key===null?ae:Ae.key)||null,ie($,te,Ae,ft);case fa:return te=te.get(Ae.key===null?ae:Ae.key)||null,ge($,te,Ae,ft);case fi:return Ae=zn(Ae),Rt(te,$,ae,Ae,ft)}if(ms(Ae)||y(Ae))return te=te.get(ae)||null,xe($,te,Ae,ft,null);if(typeof Ae.then=="function")return Rt(te,$,ae,Xn(Ae),ft);if(Ae.$$typeof===Zr)return Rt(te,$,ae,fe($,Ae),ft);vr($,Ae)}return null}function Bt(te,$,ae,Ae){for(var ft=null,pn=null,vt=$,Gt=$=0,bn=null;vt!==null&&Gt<ae.length;Gt++){vt.index>Gt?(bn=vt,vt=null):bn=vt.sibling;var Nt=Ve(te,vt,ae[Gt],Ae);if(Nt===null){vt===null&&(vt=bn);break}e&&vt&&Nt.alternate===null&&t(te,vt),$=c(Nt,$,Gt),pn===null?ft=Nt:pn.sibling=Nt,pn=Nt,vt=bn}if(Gt===ae.length)return r(te,vt),xt&&rt(te,Gt),ft;if(vt===null){for(;Gt<ae.length;Gt++)vt=Fe(te,ae[Gt],Ae),vt!==null&&($=c(vt,$,Gt),pn===null?ft=vt:pn.sibling=vt,pn=vt);return xt&&rt(te,Gt),ft}for(vt=o(vt);Gt<ae.length;Gt++)bn=Rt(vt,te,Gt,ae[Gt],Ae),bn!==null&&(e&&(Nt=bn.alternate,Nt!==null&&vt.delete(Nt.key===null?Gt:Nt.key)),$=c(bn,$,Gt),pn===null?ft=bn:pn.sibling=bn,pn=bn);return e&&vt.forEach(function(bi){return t(te,bi)}),xt&&rt(te,Gt),ft}function Ei(te,$,ae,Ae){if(ae==null)throw Error(u(151));for(var ft=null,pn=null,vt=$,Gt=$=0,bn=null,Nt=ae.next();vt!==null&&!Nt.done;Gt++,Nt=ae.next()){vt.index>Gt?(bn=vt,vt=null):bn=vt.sibling;var bi=Ve(te,vt,Nt.value,Ae);if(bi===null){vt===null&&(vt=bn);break}e&&vt&&bi.alternate===null&&t(te,vt),$=c(bi,$,Gt),pn===null?ft=bi:pn.sibling=bi,pn=bi,vt=bn}if(Nt.done)return r(te,vt),xt&&rt(te,Gt),ft;if(vt===null){for(;!Nt.done;Gt++,Nt=ae.next())Nt=Fe(te,Nt.value,Ae),Nt!==null&&($=c(Nt,$,Gt),pn===null?ft=Nt:pn.sibling=Nt,pn=Nt);return xt&&rt(te,Gt),ft}for(vt=o(vt);!Nt.done;Gt++,Nt=ae.next())Nt=Rt(vt,te,Gt,Nt.value,Ae),Nt!==null&&(e&&(bn=Nt.alternate,bn!==null&&vt.delete(bn.key===null?Gt:bn.key)),$=c(Nt,$,Gt),pn===null?ft=Nt:pn.sibling=Nt,pn=Nt);return e&&vt.forEach(function(PS){return t(te,PS)}),xt&&rt(te,Gt),ft}function Vi(te,$,ae,Ae){if(typeof ae=="object"&&ae!==null&&ae.type===da&&ae.key===null&&ae.props.ref===void 0&&(ae=ae.props.children),typeof ae=="object"&&ae!==null){switch(ae.$$typeof){case hs:e:{for(var ft=ae.key;$!==null;){if($.key===ft){if(ft=ae.type,ft===da){if($.tag===7){r(te,$.sibling),Ae=l($,ae.props.children),_t(Ae,ae),Ae.return=te,te=Ae;break e}}else if($.elementType===ft||typeof ft=="object"&&ft!==null&&ft.$$typeof===fi&&zn(ft)===$.type){r(te,$.sibling),Ae=l($,ae.props),_t(Ae,ae),Ae.return=te,te=Ae;break e}r(te,$);break}else t(te,$);$=$.sibling}ae.type===da?(Ae=Ii(ae.props.children,te.mode,Ae,ae.key),_t(Ae,ae),Ae.return=te,te=Ae):(Ae=ps(ae.type,ae.key,ae.props,null,te.mode,Ae),_t(Ae,ae),Ae.return=te,te=Ae)}return S(te);case fa:e:{for(ft=ae.key;$!==null;){if($.key===ft)if($.tag===4&&$.stateNode.containerInfo===ae.containerInfo&&$.stateNode.implementation===ae.implementation){r(te,$.sibling),Ae=l($,ae.children||[]),Ae.return=te,te=Ae;break e}else{r(te,$);break}else t(te,$);$=$.sibling}Ae=Ru(ae,te.mode,Ae),Ae.return=te,te=Ae}return S(te);case fi:return ae=zn(ae),Vi(te,$,ae,Ae)}if(ms(ae))return Bt(te,$,ae,Ae);if(y(ae)){if(ft=y(ae),typeof ft!="function")throw Error(u(150));return ae=ft.call(ae),Ei(te,$,ae,Ae)}if(typeof ae.then=="function")return Vi(te,$,Xn(ae),Ae);if(ae.$$typeof===Zr)return Vi(te,$,fe(te,ae),Ae);vr(te,ae)}return typeof ae=="string"&&ae!==""||typeof ae=="number"||typeof ae=="bigint"?(ae=""+ae,$!==null&&$.tag===6?(r(te,$.sibling),Ae=l($,ae),Ae.return=te,te=Ae):(r(te,$),Ae=wu(ae,te.mode,Ae),Ae.return=te,te=Ae),S(te)):r(te,$)}return function(te,$,ae,Ae){try{po=0;var ft=Vi(te,$,ae,Ae);return Ta=null,ft}catch(vt){if(vt===Ma||vt===Rs)throw vt;var pn=a(29,vt,null,te.mode);return pn.lanes=Ae,pn.return=te,pn}}}function g(){for(var e=xa,t=ec=xa=0;t<e;){var r=Mr[t];Mr[t++]=null;var o=Mr[t];Mr[t++]=null;var l=Mr[t];Mr[t++]=null;var c=Mr[t];if(Mr[t++]=null,o!==null&&l!==null){var S=o.pending;S===null?l.next=l:(l.next=S.next,S.next=l),o.pending=l}c!==0&&ce(r,l,c)}}function A(e,t,r,o){Mr[xa++]=e,Mr[xa++]=t,Mr[xa++]=r,Mr[xa++]=o,ec|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function X(e,t,r,o){return A(e,t,r,o),le(e)}function ee(e,t){return A(e,null,null,t),le(e)}function ce(e,t,r){e.lanes|=r;var o=e.alternate;o!==null&&(o.lanes|=r);for(var l=!1,c=e.return;c!==null;)c.childLanes|=r,o=c.alternate,o!==null&&(o.childLanes|=r),c.tag===22&&(e=c.stateNode,e===null||e._visibility&1||(l=!0)),e=c,c=c.return;return e.tag===3?(c=e.stateNode,l&&t!==null&&(l=31-or(r),e=c.hiddenUpdates,o=e[l],o===null?e[l]=[t]:o.push(t),t.lane=r|536870912),c):null}function le(e){if(50<So)throw So=0,Gs=null,Error(u(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}function ye(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function v(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function L(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function H(e,t,r){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(It&2)!==0){var l=o.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),o.pending=t,t=le(e),ce(e,null,r),t}return A(e,o,t,r),le(e)}function G(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194048)!==0)){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,T(e,r)}}function U(e,t){var r=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,r===o)){var l=null,c=null;if(r=r.firstBaseUpdate,r!==null){do{var S={lane:r.lane,tag:r.tag,payload:r.payload,callback:null,next:null};c===null?l=c=S:c=c.next=S,r=r.next}while(r!==null);c===null?l=c=t:c=c.next=t}else l=c=t;r={baseState:o.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:o.shared,callbacks:o.callbacks},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function pe(){if(tc){var e=ba;if(e!==null)throw e}}function ue(e,t,r,o){tc=!1;var l=e.updateQueue;mi=!1;var c=l.firstBaseUpdate,S=l.lastBaseUpdate,B=l.shared.pending;if(B!==null){l.shared.pending=null;var ie=B,ge=ie.next;ie.next=null,S===null?c=ge:S.next=ge,S=ie;var xe=e.alternate;xe!==null&&(xe=xe.updateQueue,B=xe.lastBaseUpdate,B!==S&&(B===null?xe.firstBaseUpdate=ge:B.next=ge,xe.lastBaseUpdate=ie))}if(c!==null){var Fe=l.baseState;S=0,xe=ge=ie=null,B=c;do{var Ve=B.lane&-536870913,Rt=Ve!==B.lane;if(Rt?(Dt&Ve)===Ve:(o&Ve)===Ve){Ve!==0&&Ve===Ni&&(tc=!0),xe!==null&&(xe=xe.next={lane:0,tag:B.tag,payload:B.payload,callback:null,next:null});e:{var Bt=e,Ei=B;Ve=t;var Vi=r;switch(Ei.tag){case 1:if(Bt=Ei.payload,typeof Bt=="function"){Fe=Bt.call(Vi,Fe,Ve);break e}Fe=Bt;break e;case 3:Bt.flags=Bt.flags&-65537|128;case 0:if(Bt=Ei.payload,Ve=typeof Bt=="function"?Bt.call(Vi,Fe,Ve):Bt,Ve==null)break e;Fe=Cu({},Fe,Ve);break e;case 2:mi=!0}}Ve=B.callback,Ve!==null&&(e.flags|=64,Rt&&(e.flags|=8192),Rt=l.callbacks,Rt===null?l.callbacks=[Ve]:Rt.push(Ve))}else Rt={lane:Ve,tag:B.tag,payload:B.payload,callback:B.callback,next:null},xe===null?(ge=xe=Rt,ie=Fe):xe=xe.next=Rt,S|=Ve;if(B=B.next,B===null){if(B=l.shared.pending,B===null)break;Rt=B,B=Rt.next,Rt.next=null,l.lastBaseUpdate=Rt,l.shared.pending=null}}while(!0);xe===null&&(ie=Fe),l.baseState=ie,l.firstBaseUpdate=ge,l.lastBaseUpdate=xe,c===null&&(l.shared.lanes=0),_i|=S,e.lanes=S,e.memoizedState=Fe}}function me(e,t){if(typeof e!="function")throw Error(u(191,e));e.call(t)}function Ee(e,t){var r=e.callbacks;if(r!==null)for(e.callbacks=null,e=0;e<r.length;e++)me(r[e],t)}function Re(e,t){e=ni,F(Cs,e),F(vi,t),ni=e|t.baseLanes}function Oe(){F(Cs,ni),F(vi,vi.current)}function De(){ni=Cs.current,w(vi),w(Cs)}function Ke(e){var t=e.alternate;F(Fn,Fn.current&1),F(Nn,e),qn===null&&(t===null||vi.current!==null||t.memoizedState!==null)&&(qn=e)}function mt(e){F(Fn,Fn.current),F(Nn,e),qn===null&&(qn=e)}function lt(e){e.tag===22?(F(Fn,Fn.current),F(Nn,e),qn===null&&(qn=e)):St()}function St(){F(Fn,Fn.current),F(Nn,Nn.current)}function qe(e){w(Nn),qn===e&&(qn=null),w(Fn)}function Be(e,t){F(Nn,Nn.current),F(Fn,t)}function Ct(e){w(Fn),w(Nn),qn===e&&(qn=null)}function Et(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||Hu(r)||zu(r)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function ht(){throw Error(u(321))}function wt(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!lr(e[r],t[r]))return!1;return!0}function Ut(e,t,r,o,l,c){return ti=c,bt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ct.H=e===null||e.memoizedState===null?Kh:Zh,ki=!1,c=r(o,l),ki=!1,ya&&(c=at(t,r,o,l)),Ft(e),c}function Ft(e){ct.H=Ls;var t=Kt!==null&&Kt.next!==null;if(ti=0,_n=Kt=bt=null,Ps=!1,ho=0,wa=null,t)throw Error(u(300));e===null||Sn||(e=e.dependencies,e!==null&&Z(e)&&(Sn=!0))}function at(e,t,r,o){bt=e;var l=0;do{if(ya&&(wa=null),ho=0,ya=!1,25<=l)throw Error(u(301));if(l+=1,_n=Kt=null,e.updateQueue!=null){var c=e.updateQueue;c.lastEffect=null,c.events=null,c.stores=null,c.memoCache!=null&&(c.memoCache.index=0)}ct.H=RS,c=t(r,o)}while(ya);return c}function Qt(){var e=ct.H,t=e.useState()[0];return t=typeof t.then=="function"?ja(t):t,e=e.useState()[0],(Kt!==null?Kt.memoizedState:null)!==e&&(bt.flags|=1024),t}function on(){var e=Is!==0;return Is=0,e}function Ot(e,t,r){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~r}function Jt(e){if(Ps){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ps=!1}ti=0,_n=Kt=bt=null,ya=!1,ho=Is=0,wa=null}function Mn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?bt.memoizedState=_n=e:_n=_n.next=e,_n}function Yt(){if(Kt===null){var e=bt.alternate;e=e!==null?e.memoizedState:null}else e=Kt.next;var t=_n===null?bt.memoizedState:_n.next;if(t!==null)_n=t,Kt=e;else{if(e===null)throw bt.alternate===null?Error(u(467)):Error(u(310));Kt=e,e={memoizedState:Kt.memoizedState,baseState:Kt.baseState,baseQueue:Kt.baseQueue,queue:Kt.queue,next:null},_n===null?bt.memoizedState=_n=e:_n=_n.next=e}return _n}function qo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ja(e){var t=ho;return ho+=1,wa===null&&(wa=[]),e=mr(wa,e,t),t=bt,(_n===null?t.memoizedState:_n.next)===null&&(t=t.alternate,ct.H=t===null||t.memoizedState===null?Kh:Zh),e}function Yo(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ja(e);if(e.$$typeof===w_)return;if(e.$$typeof===Zr)return he(e)}throw Error(u(438,String(e)))}function Cl(e){var t=null,r=bt.updateQueue;if(r!==null&&(t=r.memoCache),t==null){var o=bt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(t={data:o.data.map(function(l){return l.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),r===null&&(r=qo(),bt.updateQueue=r),r.memoCache=t,r=t.data[t.index],r===void 0)for(r=t.data[t.index]=Array(e),o=0;o<e;o++)r[o]=y_;return t.index++,r}function jr(e,t){return typeof t=="function"?t(e):t}function jo(e){var t=Yt();return Pl(t,Kt,e)}function Pl(e,t,r){var o=e.queue;if(o===null)throw Error(u(311));o.lastRenderedReducer=r;var l=e.baseQueue,c=o.pending;if(c!==null){if(l!==null){var S=l.next;l.next=c.next,c.next=S}t.baseQueue=l=c,o.pending=null}if(c=e.baseState,l===null)e.memoizedState=c;else{t=l.next;var B=S=null,ie=null,ge=t,xe=!1;do{var Fe=ge.lane&-536870913;if(Fe!==ge.lane?(Dt&Fe)===Fe:(ti&Fe)===Fe){var Ve=ge.revertLane;if(Ve===0)ie!==null&&(ie=ie.next={lane:0,revertLane:0,gesture:null,action:ge.action,hasEagerState:ge.hasEagerState,eagerState:ge.eagerState,next:null}),Fe===Ni&&(xe=!0);else if((ti&Ve)===Ve){ge=ge.next,Ve===Ni&&(xe=!0);continue}else Fe={lane:0,revertLane:ge.revertLane,gesture:null,action:ge.action,hasEagerState:ge.hasEagerState,eagerState:ge.eagerState,next:null},ie===null?(B=ie=Fe,S=c):ie=ie.next=Fe,bt.lanes|=Ve,_i|=Ve;Fe=ge.action,ki&&r(c,Fe),c=ge.hasEagerState?ge.eagerState:r(c,Fe)}else Ve={lane:Fe,revertLane:ge.revertLane,gesture:ge.gesture,action:ge.action,hasEagerState:ge.hasEagerState,eagerState:ge.eagerState,next:null},ie===null?(B=ie=Ve,S=c):ie=ie.next=Ve,bt.lanes|=Fe,_i|=Fe;ge=ge.next}while(ge!==null&&ge!==t);if(ie===null?S=c:ie.next=B,!lr(c,e.memoizedState)&&(Sn=!0,xe&&(r=ba,r!==null)))throw r;e.memoizedState=c,e.baseState=S,e.baseQueue=ie,o.lastRenderedState=c}return l===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Il(e){var t=Yt(),r=t.queue;if(r===null)throw Error(u(311));r.lastRenderedReducer=e;var o=r.dispatch,l=r.pending,c=t.memoizedState;if(l!==null){r.pending=null;var S=l=l.next;do c=e(c,S.action),S=S.next;while(S!==l);lr(c,t.memoizedState)||(Sn=!0),t.memoizedState=c,t.baseQueue===null&&(t.baseState=c),r.lastRenderedState=c}return[c,o]}function gd(e,t,r){var o=bt,l=Yt(),c=xt;if(c){if(r===void 0)throw Error(u(407));r=r()}else r=t();var S=!lr((Kt||l).memoizedState,r);if(S&&(l.memoizedState=r,Sn=!0),l=l.queue,Ul(Ed.bind(null,o,l,e),[e]),e=l.getSnapshot!==t||S||_n!==null&&(_n.memoizedState.tag&1)!==0,ra(e?9:8,{destroy:void 0},Sd.bind(null,o,l,r,t),null),e){if(o.flags|=2048,en===null)throw Error(u(349));c||(ti&127)!==0||_d(o,t,r)}return r}function _d(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=bt.updateQueue,t===null?(t=qo(),bt.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Sd(e,t,r,o){t.value=r,t.getSnapshot=o,bd(t)&&Md(e)}function Ed(e,t,r){return r(function(){bd(t)&&Md(e)})}function bd(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!lr(e,r)}catch{return!0}}function Md(e){var t=ee(e,2);t!==null&&Kn(t,e,2)}function Ll(e){var t=Mn();if(typeof e=="function"){var r=e;if(e=r(),ki){K(!0);try{r()}finally{K(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jr,lastRenderedState:e},t}function Td(e,t,r,o){return e.baseState=r,Pl(e,Kt,typeof o=="function"?o:jr)}function Kg(e,t,r,o,l){if(Zo(e))throw Error(u(485));if(e=t.action,e!==null){var c={payload:l,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(S){c.listeners.push(S)}};ct.T!==null?r(!0):c.isTransition=!1,o(c),r=t.pending,r===null?(c.next=t.pending=c,xd(t,c)):(c.next=r.next,t.pending=r.next=c)}}function xd(e,t){var r=t.action,o=t.payload,l=e.state;if(t.isTransition){var c=ct.T,S={};S.types=c!==null?c.types:null,ct.T=S;try{var B=r(l,o),ie=ct.S;ie!==null&&ie(S,B),yd(e,t,B)}catch(ge){Dl(e,t,ge)}finally{c!==null&&S.types!==null&&(c.types=S.types),ct.T=c}}else try{c=r(l,o),yd(e,t,c)}catch(ge){Dl(e,t,ge)}}function yd(e,t,r){r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(function(o){wd(e,t,o)},function(o){return Dl(e,t,o)}):wd(e,t,r)}function wd(e,t,r){t.status="fulfilled",t.value=r,Rd(t),e.state=r,t=e.pending,t!==null&&(r=t.next,r===t?e.pending=null:(r=r.next,t.next=r,xd(e,r)))}function Dl(e,t,r){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do t.status="rejected",t.reason=r,Rd(t),t=t.next;while(t!==o)}e.action=null}function Rd(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ad(e,t){return t}function Cd(e,t){if(xt){var r=en.formState;if(r!==null){e:{var o=bt;if(xt){if(sn){var l=L0(sn,br);if(l){sn=Dh(l),o=D0(l);break e}}k(o)}o=!1}o&&(t=r[0])}}r=Mn(),r.memoizedState=r.baseState=t,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ad,lastRenderedState:t},r.queue=o,r=Yd.bind(null,bt,o),o.dispatch=r,o=Ll(!1);var c=Bl.bind(null,bt,!1,o.queue);return o=Mn(),l={state:t,dispatch:null,action:e,pending:null},o.queue=l,r=Kg.bind(null,bt,l,c,r),l.dispatch=r,o.memoizedState=e,[t,r,!1]}function Pd(e){var t=Yt();return Id(t,Kt,e)}function Id(e,t,r){if(t=Pl(e,t,Ad)[0],e=jo(jr)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var o=ja(t)}catch(S){throw S===Ma?Rs:S}else o=t;t=Yt();var l=t.queue,c=l.dispatch;return r!==t.memoizedState&&(bt.flags|=2048,ra(9,{destroy:void 0},Zg.bind(null,l,r),null)),[o,c,e]}function Zg(e,t){e.action=t}function Ld(e){var t=Yt(),r=Kt;if(r!==null)return Id(t,r,e);Yt(),t=t.memoizedState,r=Yt();var o=r.queue.dispatch;return r.memoizedState=e,[t,o,!1]}function ra(e,t,r,o){return e={tag:e,create:r,deps:o,inst:t,next:null},t=bt.updateQueue,t===null&&(t=qo(),bt.updateQueue=t),r=t.lastEffect,r===null?t.lastEffect=e.next=e:(o=r.next,r.next=e,e.next=o,t.lastEffect=e),e}function Dd(){return Yt().memoizedState}function $o(e,t,r,o){var l=Mn();bt.flags|=e,l.memoizedState=ra(1|t,{destroy:void 0},r,o===void 0?null:o)}function Ko(e,t,r,o){var l=Yt();o=o===void 0?null:o;var c=l.memoizedState.inst;Kt!==null&&o!==null&&wt(o,Kt.memoizedState.deps)?l.memoizedState=ra(t,c,r,o):(bt.flags|=e,l.memoizedState=ra(1|t,c,r,o))}function Ud(e,t){$o(8390656,8,e,t)}function Ul(e,t){Ko(2048,8,e,t)}function Qg(e){bt.flags|=4;var t=bt.updateQueue;if(t===null)t=qo(),bt.updateQueue=t,t.events=[e];else{var r=t.events;r===null?t.events=[e]:r.push(e)}}function Nd(e){var t=Yt().memoizedState;return Qg({ref:t,nextImpl:e}),function(){if((It&2)!==0)throw Error(u(440));return t.impl.apply(void 0,arguments)}}function Fd(e,t){return Ko(4,2,e,t)}function Od(e,t){return Ko(4,4,e,t)}function Bd(e,t){if(typeof t=="function"){e=e();var r=t(e);return function(){typeof r=="function"?r():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function kd(e,t,r){r=r!=null?r.concat([e]):null,Ko(4,4,Bd.bind(null,t,e),r)}function Nl(){}function Hd(e,t){var r=Yt();t=t===void 0?null:t;var o=r.memoizedState;return t!==null&&wt(t,o[1])?o[0]:(r.memoizedState=[e,t],e)}function zd(e,t){var r=Yt();t=t===void 0?null:t;var o=r.memoizedState;if(t!==null&&wt(t,o[1]))return o[0];if(o=e(),ki){K(!0);try{e()}finally{K(!1)}}return r.memoizedState=[o,t],o}function Fl(e,t,r){return r===void 0||(ti&1073741824)!==0&&(Dt&261930)===0?e.memoizedState=t:(e.memoizedState=r,e=Yp(),bt.lanes|=e,_i|=e,r)}function Gd(e,t,r,o){return lr(r,t)?r:vi.current!==null?(e=Fl(e,r,o),lr(e,t)||(Sn=!0),e):(ti&106)===0||(ti&1073741824)!==0&&(Dt&261930)===0?(Sn=!0,e.memoizedState=r):(e=Yp(),bt.lanes|=e,_i|=e,t)}function Vd(e,t,r,o,l){var c=Qr();wn(c!==0&&8>c?c:8);var S=ct.T,B={};B.types=S!==null?S.types:null,ct.T=B,Bl(e,!1,t,r);try{var ie=l(),ge=ct.S;if(ge!==null&&ge(B,ie),ie!==null&&typeof ie=="object"&&typeof ie.then=="function"){var xe=gt(ie,o);$a(e,t,xe,ir(e))}else $a(e,t,o,ir(e))}catch(Fe){$a(e,t,{then:function(){},status:"rejected",reason:Fe},ir())}finally{wn(c),S!==null&&B.types!==null&&(S.types=B.types),ct.T=S}}function Wd(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:pa,baseState:pa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jr,lastRenderedState:pa},next:null};var r={};return t.next={memoizedState:r,baseState:r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jr,lastRenderedState:r},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ol(){return he(Jr)}function Xd(){return Yt().memoizedState}function qd(){return Yt().memoizedState}function Jg(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var r=ir();e=L(r);var o=H(t,e,r);o!==null&&(Kn(o,t,r),G(o,t,r)),t={cache:Pe()},e.payload=t;return}t=t.return}}function e_(e,t,r){var o=ir();r={lane:o,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Zo(e)?jd(t,r):(r=X(e,t,r,o),r!==null&&(Kn(r,e,o),$d(r,t,o)))}function Yd(e,t,r){var o=ir();$a(e,t,r,o)}function $a(e,t,r,o){var l={lane:o,revertLane:0,gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null};if(Zo(e))jd(t,l);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=t.lastRenderedReducer,c!==null))try{var S=t.lastRenderedState,B=c(S,r);if(l.hasEagerState=!0,l.eagerState=B,lr(B,S))return A(e,t,l,0),en===null&&g(),!1}catch{}if(r=X(e,t,l,o),r!==null)return Kn(r,e,o),$d(r,t,o),!0}return!1}function Bl(e,t,r,o){if(o={lane:2,revertLane:Me(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Zo(e)){if(t)throw Error(u(479))}else t=X(e,r,o,2),t!==null&&Kn(t,e,2)}function Zo(e){var t=e.alternate;return e===bt||t!==null&&t===bt}function jd(e,t){ya=Ps=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function $d(e,t,r){if((r&4194048)!==0){var o=t.lanes;o&=e.pendingLanes,r|=o,t.lanes=r,T(e,r)}}function kl(e,t,r,o){t=e.memoizedState,r=r(o,t),r=r==null?t:Cu({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}function Kd(e,t,r,o,l,c,S){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,c,S):t.prototype&&t.prototype.isPureReactComponent?!Pn(r,o)||!Pn(l,c):!0}function Zd(e,t,r,o){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,o),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,o),t.state!==e&&nc.enqueueReplaceState(t,t.state,null)}function Pi(e,t){var r=t;if("ref"in t){r={};for(var o in t)o!=="ref"&&(r[o]=t[o])}if(e=e.defaultProps){r===t&&(r=Cu({},r));for(var l in e)r[l]===void 0&&(r[l]=e[l])}return r}function Qo(e,t){try{var r=e.onUncaughtError;r(t.value,{componentStack:t.stack})}catch(o){setTimeout(function(){throw o})}}function Qd(e,t,r){try{var o=e.onCaughtError;o(r.value,{componentStack:r.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(l){setTimeout(function(){throw l})}}function Hl(e,t,r){return r=L(r),r.tag=3,r.payload={element:null},r.callback=function(){Qo(e,t)},r}function Jd(e){return e=L(e),e.tag=3,e}function ep(e,t,r,o){var l=r.type.getDerivedStateFromError;if(typeof l=="function"){var c=o.value;e.payload=function(){return l(c)},e.callback=function(){Qd(t,r,o)}}var S=r.stateNode;S!==null&&typeof S.componentDidCatch=="function"&&(e.callback=function(){Qd(t,r,o),typeof l!="function"&&(Si===null?Si=new Set([this]):Si.add(this));var B=o.stack;this.componentDidCatch(o.value,{componentStack:B!==null?B:""})})}function t_(e,t,r,o,l){if(r.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(t=r.alternate,t!==null&&b(t,r,l,!0),r=Nn.current,r!==null){switch(r.tag){case 31:case 13:case 19:return qn===null?fs():r.alternate===null&&hn===0&&(hn=3),r.flags&=-257,r.flags|=65536,r.lanes=l,o===As?r.flags|=16384:(t=r.updateQueue,t===null?r.updateQueue=new Set([o]):t.add(o),xu(e,o,l)),!1;case 22:return r.flags|=65536,o===As?r.flags|=16384:(t=r.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([o])},r.updateQueue=t):(r=t.retryQueue,r===null?t.retryQueue=new Set([o]):r.add(o)),xu(e,o,l)),!1}throw Error(u(435,r.tag))}return xu(e,o,l),fs(),!1}if(xt)return t=Nn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=l,o!==$u&&(e=Error(u(422),{cause:o}),We(ot(e,r)))):(o!==$u&&(t=Error(u(423),{cause:o}),We(ot(t,r))),e=e.current.alternate,e.flags|=65536,l&=-l,e.lanes|=l,o=ot(o,r),l=Hl(e.stateNode,o,l),U(e,l),hn!==4&&(hn=2)),!1;var c=Error(u(520),{cause:o});if(c=ot(c,r),go===null?go=[c]:go.push(c),hn!==4&&(hn=2),t===null)return!0;o=ot(o,r),r=t;do{switch(r.tag){case 3:return r.flags|=65536,e=l&-l,r.lanes|=e,e=Hl(r.stateNode,o,e),U(r,e),!1;case 1:if(t=r.type,c=r.stateNode,(r.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||c!==null&&typeof c.componentDidCatch=="function"&&(Si===null||!Si.has(c))))return r.flags|=65536,l&=-l,r.lanes|=l,l=Jd(l),ep(l,e,r,o),U(r,l),!1;break;case 22:if(r.memoizedState!==null)return r.flags|=65536,!1}r=r.return}while(r!==null);return!1}function Tn(e,t,r,o){t.child=e===null?$h(t,null,r,o):Bi(t,e.child,r,o)}function tp(e,t,r,o,l){r=r.render;var c=t.ref;if("ref"in o){var S={};for(var B in o)B!=="ref"&&(S[B]=o[B])}else S=o;return de(t),o=Ut(e,t,r,S,c,l),B=on(),e!==null&&!Sn?(Ot(e,t,l),$r(e,t,l)):(xt&&B&&re(t),t.flags|=1,Tn(e,t,o,l),t.child)}function np(e,t,r,o,l){if(e===null){var c=r.type;return typeof c=="function"&&!yu(c)&&c.defaultProps===void 0&&r.compare===null?(t.tag=15,t.type=c,rp(e,t,c,o,l)):(e=ps(r.type,null,o,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(c=e.child,!Yl(e,l)){var S=c.memoizedProps;if(r=r.compare,r=r!==null?r:Pn,r(S,o)&&e.ref===t.ref)return $r(e,t,l)}return t.flags|=1,e=Kr(c,o),e.ref=t.ref,e.return=t,t.child=e}function rp(e,t,r,o,l){if(e!==null){var c=e.memoizedProps;if(Pn(c,o)&&e.ref===t.ref)if(Sn=!1,t.pendingProps=o=c,Yl(e,l))(e.flags&131072)!==0&&(Sn=!0);else return t.lanes=e.lanes,$r(e,t,l)}return zl(e,t,r,o,l)}function ip(e,t,r,o){var l=o.children,c=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((t.flags&128)!==0){if(c=c!==null?c.baseLanes|r:r,e!==null){for(o=t.child=e.child,l=0;o!==null;)l=l|o.lanes|o.childLanes,o=o.sibling;o=l&~c}else o=0,t.child=null;return ap(e,t,c,r,o)}if((r&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&At(t,c!==null?c.cachePool:null),c!==null?Re(t,c):Oe(),lt(t);else return o=t.lanes=536870912,ap(e,t,c!==null?c.baseLanes|r:r,r,o)}else c!==null?(At(t,c.cachePool),Re(t,c),St(),t.memoizedState=null):(e!==null&&At(t,null),Oe(),St());return Tn(e,t,l,r),t.child}function Ka(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ap(e,t,r,o,l){var c=Ht();return c=c===null?null:{parent:Or?fn._currentValue:fn._currentValue2,pool:c},t.memoizedState={baseLanes:r,cachePool:c},e!==null&&At(t,null),Oe(),lt(t),e!==null&&b(e,t,o,!0),t.childLanes=l,null}function Jo(e,t){return t=es({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function op(e,t,r){return Bi(t,e.child,null,r),e=Jo(t,t.pendingProps),e.flags|=2,qe(t),t.memoizedState=null,e}function n_(e,t,r){var o=t.pendingProps,l=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(xt){if(o.mode==="hidden")return e=Jo(t,o),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Ka(null,e);if(mt(t),(e=sn)?(e=G0(e,br),e!==null&&(t.memoizedState={dehydrated:e,treeContext:di!==null?{id:kr,overflow:Hr}:null,retryLane:536870912,hydrationErrors:null},r=uh(e),r.return=t,t.child=r,Rn=t,sn=null)):e=null,e===null)throw k(t);return t.lanes=536870912,null}return Jo(t,o)}var c=e.memoizedState;if(c!==null){var S=c.dehydrated;if(mt(t),l)if(t.flags&256)t.flags&=-257,t=op(e,t,r);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(u(558));else if(Sn||b(e,t,r,!1),l=(r&e.childLanes)!==0,Sn||l){if(vi.current===null){if(o=en,o!==null&&(S=z(o,r),S!==0&&S!==c.retryLane))throw c.retryLane=S,ee(e,S),Kn(o,e,S),rc;fs()}t=op(e,t,r)}else e=c.treeContext,Dn&&(sn=O0(S),Rn=t,xt=!0,hi=null,br=!1,e!==null&&Ne(t,e)),t=Jo(t,o),t.flags|=134221824;return t}return e=Kr(e.child,{mode:o.mode,children:o.children}),e.ref=t.ref,t.child=e,e.return=t,e}function ia(e,t){var r=t.ref;if(r===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof r!="function"&&typeof r!="object")throw Error(u(284));(e===null||e.ref!==r)&&(t.flags|=4194816)}}function zl(e,t,r,o,l){return de(t),r=Ut(e,t,r,o,void 0,l),o=on(),e!==null&&!Sn?(Ot(e,t,l),$r(e,t,l)):(xt&&o&&re(t),t.flags|=1,Tn(e,t,r,l),t.child)}function sp(e,t,r,o,l,c){return de(t),t.updateQueue=null,r=at(t,o,r,l),Ft(e),o=on(),e!==null&&!Sn?(Ot(e,t,c),$r(e,t,c)):(xt&&o&&re(t),t.flags|=1,Tn(e,t,r,c),t.child)}function lp(e,t,r,o,l){if(de(t),t.stateNode===null){var c=va,S=r.contextType;typeof S=="object"&&S!==null&&(c=he(S)),c=new r(o,c),t.memoizedState=c.state!==null&&c.state!==void 0?c.state:null,c.updater=nc,t.stateNode=c,c._reactInternals=t,c=t.stateNode,c.props=o,c.state=t.memoizedState,c.refs={},ye(t),S=r.contextType,c.context=typeof S=="object"&&S!==null?he(S):va,c.state=t.memoizedState,S=r.getDerivedStateFromProps,typeof S=="function"&&(kl(t,r,S,o),c.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof c.getSnapshotBeforeUpdate=="function"||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(S=c.state,typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount(),S!==c.state&&nc.enqueueReplaceState(c,c.state,null),ue(t,o,c,l),pe(),c.state=t.memoizedState),typeof c.componentDidMount=="function"&&(t.flags|=4194308),o=!0}else if(e===null){c=t.stateNode;var B=t.memoizedProps,ie=Pi(r,B);c.props=ie;var ge=c.context,xe=r.contextType;S=va,typeof xe=="object"&&xe!==null&&(S=he(xe));var Fe=r.getDerivedStateFromProps;xe=typeof Fe=="function"||typeof c.getSnapshotBeforeUpdate=="function",B=t.pendingProps!==B,xe||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(B||ge!==S)&&Zd(t,c,o,S),mi=!1;var Ve=t.memoizedState;c.state=Ve,ue(t,o,c,l),pe(),ge=t.memoizedState,B||Ve!==ge||mi?(typeof Fe=="function"&&(kl(t,r,Fe,o),ge=t.memoizedState),(ie=mi||Kd(t,r,ie,o,Ve,ge,S))?(xe||typeof c.UNSAFE_componentWillMount!="function"&&typeof c.componentWillMount!="function"||(typeof c.componentWillMount=="function"&&c.componentWillMount(),typeof c.UNSAFE_componentWillMount=="function"&&c.UNSAFE_componentWillMount()),typeof c.componentDidMount=="function"&&(t.flags|=4194308)):(typeof c.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=o,t.memoizedState=ge),c.props=o,c.state=ge,c.context=S,o=ie):(typeof c.componentDidMount=="function"&&(t.flags|=4194308),o=!1)}else{c=t.stateNode,v(e,t),S=t.memoizedProps,xe=Pi(r,S),c.props=xe,Fe=t.pendingProps,Ve=c.context,ge=r.contextType,ie=va,typeof ge=="object"&&ge!==null&&(ie=he(ge)),B=r.getDerivedStateFromProps,(ge=typeof B=="function"||typeof c.getSnapshotBeforeUpdate=="function")||typeof c.UNSAFE_componentWillReceiveProps!="function"&&typeof c.componentWillReceiveProps!="function"||(S!==Fe||Ve!==ie)&&Zd(t,c,o,ie),mi=!1,Ve=t.memoizedState,c.state=Ve,ue(t,o,c,l),pe();var Rt=t.memoizedState;S!==Fe||Ve!==Rt||mi||e!==null&&e.dependencies!==null&&Z(e.dependencies)?(typeof B=="function"&&(kl(t,r,B,o),Rt=t.memoizedState),(xe=mi||Kd(t,r,xe,o,Ve,Rt,ie)||e!==null&&e.dependencies!==null&&Z(e.dependencies))?(ge||typeof c.UNSAFE_componentWillUpdate!="function"&&typeof c.componentWillUpdate!="function"||(typeof c.componentWillUpdate=="function"&&c.componentWillUpdate(o,Rt,ie),typeof c.UNSAFE_componentWillUpdate=="function"&&c.UNSAFE_componentWillUpdate(o,Rt,ie)),typeof c.componentDidUpdate=="function"&&(t.flags|=4),typeof c.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof c.componentDidUpdate!="function"||S===e.memoizedProps&&Ve===e.memoizedState||(t.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&Ve===e.memoizedState||(t.flags|=1024),t.memoizedProps=o,t.memoizedState=Rt),c.props=o,c.state=Rt,c.context=ie,o=xe):(typeof c.componentDidUpdate!="function"||S===e.memoizedProps&&Ve===e.memoizedState||(t.flags|=4),typeof c.getSnapshotBeforeUpdate!="function"||S===e.memoizedProps&&Ve===e.memoizedState||(t.flags|=1024),o=!1)}return c=o,ia(e,t),o=(t.flags&128)!==0,c||o?(c=t.stateNode,r=o&&typeof r.getDerivedStateFromError!="function"?null:c.render(),t.flags|=1,e!==null&&o?(t.child=Bi(t,e.child,null,l),t.child=Bi(t,null,r,l)):Tn(e,t,r,l),t.memoizedState=c.state,e=t.child):e=$r(e,t,l),e}function up(e,t,r,o){return Ge(),t.flags|=256,Tn(e,t,r,o),t.child}function Gl(e){return{baseLanes:e,cachePool:$n()}}function Vl(e,t,r){return e=e!==null?e.childLanes&~r:0,t&&(e|=fr),e}function cp(e,t,r){var o=t.pendingProps,l=!1,c=(t.flags&128)!==0,S;if((S=c)||(S=e!==null&&e.memoizedState===null?!1:(Fn.current&2)!==0),S&&(l=!0,t.flags&=-129),S=(t.flags&32)!==0,t.flags&=-33,e===null){if(xt){if(l?Ke(t):St(),(e=sn)?(e=V0(e,br),e!==null&&(t.memoizedState={dehydrated:e,treeContext:di!==null?{id:kr,overflow:Hr}:null,retryLane:536870912,hydrationErrors:null},r=uh(e),r.return=t,t.child=r,Rn=t,sn=null)):e=null,e===null)throw k(t);return zu(e)?t.lanes=32:t.lanes=536870912,null}return c=o.children,o=o.fallback,l?(St(),l=t.mode,c=es({mode:"hidden",children:c},l),o=Ii(o,l,r,null),c.return=t,o.return=t,c.sibling=o,t.child=c,o=t.child,o.memoizedState=Gl(r),o.childLanes=Vl(e,S,r),t.memoizedState=ic,Ka(null,o)):(Ke(t),Wl(t,c))}var B=e.memoizedState;if(B!==null){var ie=B.dehydrated;if(ie!==null)return r_(e,t,c,S,o,ie,B,r)}return l?(St(),l=o.fallback,c=t.mode,B=e.child,ie=B.sibling,o=Kr(B,{mode:"hidden",children:o.children}),o.subtreeFlags=B.subtreeFlags&1206910976,ie!==null?l=Kr(ie,l):(l=Ii(l,c,r,null),l.flags|=2),l.return=t,o.return=t,o.sibling=l,t.child=o,Ka(null,o),o=t.child,l=e.child.memoizedState,l===null?l=Gl(r):(c=l.cachePool,c!==null?(B=Or?fn._currentValue:fn._currentValue2,c=c.parent!==B?{parent:B,pool:B}:c):c=$n(),l={baseLanes:l.baseLanes|r,cachePool:c}),o.memoizedState=l,o.childLanes=Vl(e,S,r),t.memoizedState=ic,Ka(e.child,o)):(Ke(t),r=e.child,e=r.sibling,r=Kr(r,{mode:"visible",children:o.children}),r.return=t,r.sibling=null,e!==null&&(S=t.deletions,S===null?(t.deletions=[e],t.flags|=16):S.push(e)),t.child=r,t.memoizedState=null,r)}function Wl(e,t){return t=es({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function es(e,t){return e=a(22,e,null,t),e.lanes=0,e}function ts(e,t,r){return Bi(t,e.child,null,r),e=Wl(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function r_(e,t,r,o,l,c,S,B){if(r)return t.flags&256?(Ke(t),t.flags&=-257,ts(e,t,B)):t.memoizedState!==null?(St(),t.child=e.child,t.flags|=128,null):(St(),c=l.fallback,S=t.mode,l=es({mode:"visible",children:l.children},S),c=Ii(c,S,B,null),c.flags|=2,l.return=t,c.return=t,l.sibling=c,t.child=l,Bi(t,e.child,null,B),l=t.child,l.memoizedState=Gl(B),l.childLanes=Vl(e,o,B),t.memoizedState=ic,Ka(null,l));if(Ke(t),zu(c))return o=P0(c).digest,o!==""&&(l=Error(u(419)),l.stack="",l.digest=o,We({value:l,source:null,stack:null})),ts(e,t,B);if(Sn||b(e,t,B,!1),o=(B&e.childLanes)!==0,Sn||o){if(vi.current!==null)return ts(e,t,B);if(o=en,o!==null&&(l=z(o,B),l!==0&&l!==S.retryLane))throw S.retryLane=l,ee(e,l),Kn(o,e,l),rc;return Hu(c)||fs(),ts(e,t,B)}return Hu(c)?(t.flags|=192,t.child=e.child,null):(e=S.treeContext,Dn&&(sn=B0(c),Rn=t,xt=!0,hi=null,br=!1,e!==null&&Ne(t,e)),t=Wl(t,l.children),t.flags|=134221824,t)}function fp(e,t,r){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t),$t(e.return,t,r)}function dp(e){for(var t=null;e!==null;){var r=e.alternate;r!==null&&Et(r)===null&&(t=e),e=e.sibling}return t}function ns(e,t,r,o,l,c){var S=e.memoizedState;S===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:o,tail:r,tailMode:l,treeForkCount:c}:(S.isBackwards=t,S.rendering=null,S.renderingStartTime=0,S.last=o,S.tail=r,S.tailMode=l,S.treeForkCount=c)}function Xl(e){var t=e.child;for(e.child=null;t!==null;){var r=t.sibling;t.sibling=e.child,e.child=t,t=r}}function ql(e,t,r){var o=t.pendingProps,l=o.revealOrder,c=o.tail;o=o.children;var S=Fn.current;if(t.flags&128)return Be(t,S),null;var B=(S&2)!==0;if(B?(S=S&1|2,t.flags|=128):S&=1,Be(t,S),l==="backwards"&&e!==null?(Xl(e),Tn(e,t,o,r),Xl(e)):Tn(e,t,o,r),o=xt?lo:0,!B&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&fp(e,r,t);else if(e.tag===19)fp(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(l){case"backwards":r=dp(t.child),r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null,Xl(t)),ns(t,!0,l,null,c,o);break;case"unstable_legacy-backwards":for(r=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Et(e)===null){t.child=l;break}e=l.sibling,l.sibling=r,r=l,l=e}ns(t,!0,r,null,c,o);break;case"together":ns(t,!1,null,null,void 0,o);break;case"independent":t.memoizedState=null;break;default:r=dp(t.child),r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null),ns(t,!1,l,r,c,o)}return t.child}function pp(e,t,r){var o=t.pendingProps;return ut(t,t.type,o.value),Tn(e,t,o.children,r),t.child}function $r(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),_i|=t.lanes,(r&t.childLanes)===0)if(e!==null){if(b(e,t,r,!1),(r&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(u(153));if(t.child!==null){for(e=t.child,r=Kr(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Kr(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Yl(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Z(e)))}function i_(e,t,r){switch(t.tag){case 3:st(t,t.stateNode.containerInfo),ut(t,fn,e.memoizedState.cache),Ge();break;case 27:case 5:Mt(t);break;case 4:st(t,t.stateNode.containerInfo);break;case 10:ut(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,mt(t),null;break;case 13:var o=t.memoizedState;if(o!==null){if(o.dehydrated!==null)return Ke(t),t.flags|=128,null;o=b(e,t,r,!1);var l=t.child.childLanes;return o||(r&l)!==0?cp(e,t,r):(Ke(t),e=$r(e,t,r),e!==null?e.sibling:null)}Ke(t);break;case 19:if(t.flags&128)return ql(e,t,r);if(l=(e.flags&128)!==0,o=(r&t.childLanes)!==0,o||(b(e,t,r,!1),o=(r&t.childLanes)!==0),l){if(o)return ql(e,t,r);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Be(t,Fn.current),o)break;return null;case 22:return t.lanes=0,ip(e,t,r,t.pendingProps);case 24:ut(t,fn,e.memoizedState.cache)}return $r(e,t,r)}function hp(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps)Sn=!0;else{if(!Yl(e,r)&&(t.flags&128)===0)return Sn=!1,i_(e,t,r);Sn=(e.flags&131072)!==0}else Sn=!1,xt&&(t.flags&1048576)!==0&&dt(t,lo,t.index);switch(t.lanes=0,t.tag){case 16:e:{var o=t.pendingProps;if(e=zn(t.elementType),t.type=e,typeof e=="function")yu(e)?(o=Pi(e,o),t.tag=1,t=lp(null,t,e,o,r)):(t.tag=0,t=zl(null,t,e,o,r));else{if(e!=null){var l=e.$$typeof;if(l===Iu){t.tag=11,t=tp(null,t,e,o,r);break e}else if(l===Uu){t.tag=14,t=np(null,t,e,o,r);break e}else if(l===Zr){t.tag=10,t.type=e,t=pp(null,t,r);break e}}throw t=x(e)||e,Error(u(306,t,""))}}return t;case 0:return zl(e,t,t.type,t.pendingProps,r);case 1:return o=t.type,l=Pi(o,t.pendingProps),lp(e,t,o,l,r);case 3:e:{if(st(t,t.stateNode.containerInfo),e===null)throw Error(u(387));var c=t.pendingProps;l=t.memoizedState,o=l.element,v(e,t),ue(t,c,null,r);var S=t.memoizedState;if(c=S.cache,ut(t,fn,c),c!==l.cache&&I(t,[fn],r,!0),pe(),c=S.element,Dn&&l.isDehydrated)if(l={element:c,isDehydrated:!1,cache:S.cache},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){t=up(e,t,c,r);break e}else if(c!==o){o=ot(Error(u(424)),t),We(o),t=up(e,t,c,r);break e}else for(Dn&&(sn=F0(t.stateNode.containerInfo),Rn=t,xt=!0,hi=null,br=!0),r=$h(t,null,c,r),t.child=r;r;)r.flags=r.flags&-3|134221824,r=r.sibling;else{if(Ge(),c===o){t=$r(e,t,r);break e}Tn(e,t,c,r)}t=t.child}return t;case 26:if(_r)return ia(e,t),e===null?(r=Fh(t.type,null,t.pendingProps,null))?t.memoizedState=r:xt||(t.stateNode=kh(t.type,t.pendingProps,pi.current,t)):t.memoizedState=Fh(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:if(cn)return Mt(t),e===null&&cn&&xt&&(o=t.stateNode=zh(t.type,t.pendingProps,pi.current,Un.current,!1),Rn=t,br=!0,sn=k0(t.type,o,sn)),Tn(e,t,t.pendingProps.children,r),ia(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&xt&&(oS(t.type,t.pendingProps,Un.current),(l=o=sn)&&(o=H0(o,t.type,t.pendingProps,br),o!==null?(t.stateNode=o,Rn=t,sn=N0(o),br=!1,l=!0):l=!1),l||k(t)),Mt(t),l=t.type,c=t.pendingProps,S=e!==null?e.memoizedProps:null,o=c.children,vs(l,c)?o=null:S!==null&&vs(l,S)&&(t.flags|=32),t.memoizedState!==null&&(l=Ut(e,t,Qt,null,null,r),Or?Jr._currentValue=l:Jr._currentValue2=l),ia(e,t),Tn(e,t,o,r),t.child;case 6:return e===null&&xt&&(sS(t.pendingProps,Un.current),(e=r=sn)&&(r=z0(r,t.pendingProps,br),r!==null?(t.stateNode=r,Rn=t,sn=null,e=!0):e=!1),e||k(t)),null;case 13:return cp(e,t,r);case 4:return st(t,t.stateNode.containerInfo),o=t.pendingProps,e===null?t.child=Bi(t,null,o,r):Tn(e,t,o,r),t.child;case 11:return tp(e,t,t.type,t.pendingProps,r);case 7:return o=t.pendingProps,ia(e,t),Tn(e,t,o,r),t.child;case 8:return Tn(e,t,t.pendingProps.children,r),t.child;case 12:return Tn(e,t,t.pendingProps.children,r),t.child;case 10:return pp(e,t,r);case 9:return l=t.type._context,o=t.pendingProps.children,de(t),l=he(l),o=o(l),t.flags|=1,Tn(e,t,o,r),t.child;case 14:return np(e,t,t.type,t.pendingProps,r);case 15:return rp(e,t,t.type,t.pendingProps,r);case 19:return ql(e,t,r);case 31:return n_(e,t,r);case 22:return ip(e,t,r,t.pendingProps);case 24:return de(t),o=he(fn),e===null?(l=Ht(),l===null&&(l=en,c=Pe(),l.pooledCache=c,c.refCount++,c!==null&&(l.pooledCacheLanes|=r),l=c),t.memoizedState={parent:o,cache:l},ye(t),ut(t,fn,l)):((e.lanes&r)!==0&&(v(e,t),ue(t,null,null,r),pe()),l=e.memoizedState,c=t.memoizedState,l.parent!==o?(l={parent:o,cache:o},t.memoizedState=l,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=l),ut(t,fn,o)):(o=c.cache,ut(t,fn,o),o!==l.cache&&I(t,[fn],r,!0))),Tn(e,t,t.pendingProps.children,r),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),o=t.pendingProps,o.name!=null&&o.name!=="auto"?t.flags|=e===null?18882560:18874368:xt&&re(t),e!==null&&e.memoizedProps.name!==o.name?t.flags|=4194816:ia(e,t),Tn(e,t,o.children,r),t.child;case 29:throw t.pendingProps}throw Error(u(156,t.tag))}function wr(e){e.flags|=4}function rs(e){Br&&(e.flags|=8)}function mp(e,t){if(e!==null&&e.child===t.child)return!1;if((t.flags&16)!==0)return!0;for(e=t.child;e!==null;){if((e.flags&8218)!==0||(e.subtreeFlags&8218)!==0)return!0;e=e.sibling}return!1}function jl(e,t,r,o){if(un)for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)Ou(e,r.stateNode);else if(!(r.tag===4||cn&&r.tag===27)&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}else if(Br)for(var l=t.child;l!==null;){if(l.tag===5){var c=l.stateNode;r&&o&&(c=Ih(c,l.type,l.memoizedProps)),Ou(e,c)}else if(l.tag===6)c=l.stateNode,r&&o&&(c=Lh(c,l.memoizedProps)),Ou(e,c);else if(l.tag!==4){if(l.tag===22&&l.memoizedState!==null)c=l.child,c!==null&&(c.return=l),jl(e,l,!0,!0);else if(l.child!==null){l.child.return=l,l=l.child;continue}}if(l===t)break;for(;l.sibling===null;){if(l.return===null||l.return===t)return;l=l.return}l.sibling.return=l.return,l=l.sibling}}function vp(e,t,r,o){var l=!1;if(Br)for(var c=t.child;c!==null;){if(c.tag===5){var S=c.stateNode;r&&o&&(S=Ih(S,c.type,c.memoizedProps)),Ch(e,S)}else if(c.tag===6)S=c.stateNode,r&&o&&(S=Lh(S,c.memoizedProps)),Ch(e,S);else if(c.tag!==4){if(c.tag===22&&c.memoizedState!==null)l=c.child,l!==null&&(l.return=c),vp(e,c,!0,!0),l=!0;else if(c.child!==null){c.child.return=c,c=c.child;continue}}if(c===t)break;for(;c.sibling===null;){if(c.return===null||c.return===t)return l;c=c.return}c.sibling.return=c.return,c=c.sibling}return l}function gp(e,t){if(Br&&mp(e,t)){e=t.stateNode;var r=e.containerInfo,o=Ah();vp(o,t,!1,!1),e.pendingChildren=o,wr(t),C0(r,o)}}function $l(e,t,r,o){if(un)e.memoizedProps!==o&&wr(t);else if(Br){var l=e.stateNode,c=e.memoizedProps;if((e=mp(e,t))||c!==o){var S=Un.current;c=A0(l,r,c,o,!e,null),c===l?t.stateNode=l:(rs(t),Eh(c,r,o,S)&&wr(t),t.stateNode=c,e&&jl(c,t,!1,!1))}else t.stateNode=l}}function Kl(e,t,r,o,l){if((e.mode&32)!==0&&(r===null?G_(t,o):V_(t,r,o))){if(e.flags|=16777216,(l&335544128)===l||Bu(t,o))if(Mh(e.stateNode,t,o))e.flags|=8192;else if(Qp())e.flags|=8192;else throw Oi=As,Ju}else e.flags&=-16777217}function _p(e,t){if(cS(t)){if(e.flags|=16777216,!Hh(t))if(Qp())e.flags|=8192;else throw Oi=As,Ju}else e.flags&=-16777217}function is(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?q():536870912,e.lanes|=t,Aa|=t)}function Za(e,t){if(!xt)switch(e.tailMode){case"visible":break;case"collapsed":for(var r=e.tail,o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null;break;default:for(t=e.tail,r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null}}function tn(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,o=0;if(t)for(var l=e.child;l!==null;)r|=l.lanes|l.childLanes,o|=l.subtreeFlags&1206910976,o|=l.flags&1206910976,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)r|=l.lanes|l.childLanes,o|=l.subtreeFlags,o|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=o,e.childLanes=r,t}function a_(e,t,r){var o=t.pendingProps;switch(ve(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(t),null;case 1:return tn(t),null;case 3:return r=t.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),t.memoizedState.cache!==o&&(t.flags|=2048),Xt(fn),Ye(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(it(t)?wr(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,Wt())),gp(e,t),tn(t),null;case 26:if(_r){var l=t.type,c=t.memoizedState;return e===null?(wr(t),c!==null?(tn(t),_p(t,c)):(tn(t),Kl(t,l,null,o,r))):c?c!==e.memoizedState?(wr(t),tn(t),_p(t,c)):(tn(t),t.flags&=-16777217):(c=e.memoizedProps,un?c!==o&&wr(t):$l(e,t,l,o),tn(t),Kl(t,l,c,o,r)),null}case 27:if(cn){if(ln(t),r=pi.current,l=t.type,e!==null&&t.stateNode!=null)un?e.memoizedProps!==o&&wr(t):$l(e,t,l,o);else{if(!o){if(t.stateNode===null)throw Error(u(166));return tn(t),t.subtreeFlags&=-33554433,null}e=Un.current,it(t)?Vt(t,e):(e=zh(l,o,r,e,!0),t.stateNode=e,wr(t))}return tn(t),t.subtreeFlags&=-33554433,null}case 5:if(ln(t),l=t.type,e!==null&&t.stateNode!=null)$l(e,t,l,o);else{if(!o){if(t.stateNode===null)throw Error(u(166));return tn(t),t.subtreeFlags&=-33554433,null}if(c=Un.current,it(t))Vt(t,c),eS(t.stateNode,l,o,c)&&(t.flags|=64);else{var S=U_(l,o,pi.current,c,t);rs(t),jl(S,t,!1,!1),t.stateNode=S,Eh(S,l,o,c)&&wr(t)}}return tn(t),t.subtreeFlags&=-33554433,Kl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,r),null;case 6:if(e&&t.stateNode!=null)r=e.memoizedProps,un?r!==o&&wr(t):Br&&(r!==o?(e=pi.current,r=Un.current,rs(t),t.stateNode=bh(o,e,r,t)):t.stateNode=e.stateNode);else{if(typeof o!="string"&&t.stateNode===null)throw Error(u(166));if(e=pi.current,r=Un.current,it(t)){if(!Dn)throw Error(u(176));if(e=t.stateNode,r=t.memoizedProps,o=null,l=Rn,l!==null)switch(l.tag){case 27:case 5:o=l.memoizedProps}X0(e,r,t,o)||k(t,!0)}else rs(t),t.stateNode=bh(o,e,r,t)}return tn(t),null;case 31:if(r=t.memoizedState,e===null||e.memoizedState!==null){if(o=it(t),r!==null){if(e===null){if(!o)throw Error(u(318));if(!Dn)throw Error(u(556));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(u(557));q0(e,t)}else Ge(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tn(t),e=!1}else r=Wt(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),e=!0;if(!e)return t.flags&256?(qe(t),t):(qe(t),null);if((t.flags&128)!==0)throw Error(u(558))}return tn(t),null;case 13:if(o=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(l=it(t),o!==null&&o.dehydrated!==null){if(e===null){if(!l)throw Error(u(318));if(!Dn)throw Error(u(344));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(u(317));Y0(l,t)}else Ge(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;tn(t),l=!1}else l=Wt(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=l),l=!0;if(!l)return t.flags&256?(qe(t),t):(qe(t),null)}return qe(t),(t.flags&128)!==0?(t.lanes=r,t):(r=o!==null,e=e!==null&&e.memoizedState!==null,r&&(o=t.child,l=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(l=o.alternate.memoizedState.cachePool.pool),c=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(c=o.memoizedState.cachePool.pool),c!==l&&(o.flags|=2048)),r!==e&&r&&(t.child.flags|=8192),is(t,t.updateQueue),tn(t),null);case 4:return Ye(),gp(e,t),e===null&&B_(t.stateNode.containerInfo),t.flags|=67108864,tn(t),null;case 10:return Xt(t.type),tn(t),null;case 19:if(Ct(t),o=t.memoizedState,o===null)return tn(t),null;if(l=(t.flags&128)!==0,c=o.rendering,c===null)if(l)Za(o,!1);else{if(hn!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(c=Et(e),c!==null){for(t.flags|=128,Za(o,!1),e=c.updateQueue,t.updateQueue=e,is(t,e),t.subtreeFlags=0,e=r,r=t.child;r!==null;)lh(r,e),r=r.sibling;return Be(t,Fn.current&1|2),xt&&rt(t,o.treeForkCount),t.child}e=e.sibling}o.tail!==null&&Zn()>_o&&(t.flags|=128,l=!0,Za(o,!1),t.lanes=4194304)}else{if(!l)if(e=Et(c),e!==null){if(t.flags|=128,l=!0,e=e.updateQueue,t.updateQueue=e,is(t,e),Za(o,!0),o.tail===null&&o.tailMode!=="collapsed"&&o.tailMode!=="visible"&&!c.alternate&&!xt)return tn(t),null}else 2*Zn()-o.renderingStartTime>_o&&r!==536870912&&(t.flags|=128,l=!0,Za(o,!1),t.lanes=4194304);o.isBackwards?(c.sibling=t.child,t.child=c):(e=o.last,e!==null?e.sibling=c:t.child=c,o.last=c)}if(o.tail!==null){e=o.tail;e:{for(r=e;r!==null;){if(r.alternate!==null){r=!1;break e}r=r.sibling}r=!0}return o.rendering=e,o.tail=e.sibling,o.renderingStartTime=Zn(),e.sibling=null,c=Fn.current,c=l?c&1|2:c&1,o.tailMode==="visible"||o.tailMode==="collapsed"||!r||xt?Be(t,c):(r=c,F(Nn,t),F(Fn,r),qn===null&&(qn=t)),xt&&rt(t,o.treeForkCount),e}return tn(t),null;case 22:case 23:return qe(t),De(),o=t.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(t.flags|=8192):o&&(t.flags|=8192),o?(r&536870912)!==0&&(t.flags&128)===0&&(tn(t),t.subtreeFlags&6&&(t.flags|=8192)):tn(t),r=t.updateQueue,r!==null&&is(t,r.retryQueue),r=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),o=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(o=t.memoizedState.cachePool.pool),o!==r&&(t.flags|=2048),e!==null&&w(Fi),null;case 24:return r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Xt(fn),tn(t),null;case 25:return null;case 30:return t.flags|=33554432,tn(t),null}throw Error(u(156,t.tag))}function o_(e,t){switch(ve(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Xt(fn),Ye(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ln(t),null;case 31:if(t.memoizedState!==null){if(qe(t),t.alternate===null)throw Error(u(340));Ge()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(qe(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(u(340));Ge()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ct(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ye(),null;case 10:return Xt(t.type),null;case 22:case 23:return qe(t),De(),e!==null&&w(Fi),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Xt(fn),null;case 25:return null;default:return null}}function Sp(e,t){switch(ve(t),t.tag){case 3:Xt(fn),Ye();break;case 26:case 27:case 5:ln(t);break;case 4:Ye();break;case 31:t.memoizedState!==null&&qe(t);break;case 13:qe(t);break;case 19:Ct(t);break;case 10:Xt(t.type);break;case 22:case 23:qe(t),De(),e!==null&&w(Fi);break;case 24:Xt(fn)}}function Qa(e,t){try{var r=t.updateQueue,o=r!==null?r.lastEffect:null;if(o!==null){var l=o.next;r=l;do{if((r.tag&e)===e){o=void 0;var c=r.create,S=r.inst;o=c(),S.destroy=o}r=r.next}while(r!==l)}}catch(B){zt(t,t.return,B)}}function si(e,t,r){try{var o=t.updateQueue,l=o!==null?o.lastEffect:null;if(l!==null){var c=l.next;o=c;do{if((o.tag&e)===e){var S=o.inst,B=S.destroy;if(B!==void 0){S.destroy=void 0,l=t;var ie=r,ge=B;try{ge()}catch(xe){zt(l,ie,xe)}}}o=o.next}while(o!==c)}}catch(xe){zt(t,t.return,xe)}}function Ep(e){var t=e.updateQueue;if(t!==null){var r=e.stateNode;try{Ee(t,r)}catch(o){zt(e,e.return,o)}}}function bp(e,t,r){r.props=Pi(e.type,e.memoizedProps),r.state=e.memoizedState;try{r.componentWillUnmount()}catch(o){zt(e,t,o)}}function Ur(e,t){try{var r=e.ref;if(r!==null){switch(e.tag){case 26:case 27:case 5:var o=io(e.stateNode);break;case 30:var l=e.stateNode,c=se(e.memoizedProps,l);(l.ref===null||l.ref.name!==c)&&(l.ref=wh(c)),o=l.ref;break;case 7:e.stateNode===null&&(e.stateNode=y0(e)),o=e.stateNode;break;default:o=e.stateNode}typeof r=="function"?e.refCleanup=r(o):r.current=o}}catch(S){zt(e,t,S)}}function In(e,t){var r=e.ref,o=e.refCleanup;if(r!==null)if(typeof o=="function")try{o()}catch(l){zt(e,t,l)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof r=="function")try{r(null)}catch(l){zt(e,t,l)}else r.current=null}function Mp(){var e=Vn;return Vn=!1,e}function Ja(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var r=0;r<t.length;r++)Rh(e.stateNode,t[r])}function Tp(e){for(var t=e.return;t!==null&&(Ql(t)&&Rh(e.stateNode,t.stateNode),!Zl(t));)t=t.return}function eo(e){for(var t=e.return;t!==null&&(Ql(t)&&R0(e.stateNode,t.stateNode),!Zl(t));)t=t.return}function Zl(e){return e.tag===5||e.tag===3||(cn?e.tag===27:!1)}function Ql(e){return e&&e.tag===7&&e.stateNode!==null}function Jl(e){var t=e.type,r=e.memoizedProps,o=e.stateNode;try{a0(o,t,r,e)}catch(l){zt(e,e.return,l)}}function eu(e,t,r){try{o0(e.stateNode,e.type,r,t,e)}catch(o){zt(e,e.return,o)}}function xp(e){return e.tag===5||e.tag===3||(_r?e.tag===26:!1)||(cn?e.tag===27&&ha(e.type):!1)||e.tag===4}function tu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||xp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(cn&&e.tag===27&&ha(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function nu(e,t,r,o){var l=e.tag;if(l===5||l===6)l=e.stateNode,t?l0(r,l,t):r0(r,l),Ja(e,o),Vn=!0;else if(l!==4&&(cn&&l===27&&(Ja(e,o),o=null,ha(e.type)&&(r=e.stateNode,t=null)),e=e.child,e!==null))for(nu(e,t,r,o),e=e.sibling;e!==null;)nu(e,t,r,o),e=e.sibling}function as(e,t,r,o){var l=e.tag;if(l===5||l===6)l=e.stateNode,t?s0(r,l,t):n0(r,l),Ja(e,o),Vn=!0;else if(l!==4&&(cn&&l===27&&(Ja(e,o),o=null,ha(e.type)&&(r=e.stateNode)),e=e.child,e!==null))for(as(e,t,r,o),e=e.sibling;e!==null;)as(e,t,r,o),e=e.sibling}function ru(e,t){if(e.tag===5||cn&&e.tag===27)Ja(e,t);else if(e.tag!==4&&(e=e.child,e!==null))for(ru(e,t),e=e.sibling;e!==null;)ru(e,t),e=e.sibling}function yp(e,t,r){e=e.containerInfo;try{Ph(e,r)}catch(o){zt(t,t.return,o)}}function wp(e){var t=e.stateNode,r=e.memoizedProps;try{dS(e.type,r,t,e)}catch(o){zt(e,e.return,o)}}function Rp(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Ds=!0)}function Ap(){var e=zr;return zr=null,e}function aa(e,t,r,o,l){return Qn=0,Cp(e.child,t,r,o,l)}function Cp(e,t,r,o,l){if(!un)return!1;for(var c=!1;e!==null;){if(e.tag===5){var S=e.stateNode;if(o!==null){var B=ku(S);o.push(B),gs(B)&&(c=!0)}else c||gs(ku(S))&&(c=!0);Ds=!0,yh(S,Qn===0?t:t+"_"+Qn,r),Qn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&l||Cp(e.child,t,r,o,l)&&(c=!0));e=e.sibling}return c}function Nr(e,t){if(un)for(;e!==null;)e.tag===5?m0(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Nr(e.child,t)),e=e.sibling}function os(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(os(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(u(544));var r=t.name;t=be(t.default,t.share),t!=="none"&&(aa(e,r,t,null,!1)||Nr(e.child,!1))}e=e.sibling}}function iu(e,t){if(e.tag===30){var r=e.stateNode,o=e.memoizedProps,l=se(o,r),c=be(o.default,r.paired?o.share:o.enter);c!=="none"?aa(e,l,c,null,!1)?(os(e),r.paired||t||la(e,o.onEnter)):Nr(e.child,!1):os(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)iu(e,t),e=e.sibling;else os(e)}function au(e){if(ur!==null&&ur.size!==0){var t=ur;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var r=e.memoizedProps,o=r.name;if(o!=null&&o!=="auto"){var l=t.get(o);if(l!==void 0){var c=be(r.default,r.share);if(c!=="none"&&(aa(e,o,c,null,!1)?(c=e.stateNode,l.paired=c,c.paired=l,la(e,r.onShare)):Nr(e.child,!1)),t.delete(o),t.size===0)break}}}au(e)}e=e.sibling}}}function ou(e){if(e.tag===30){var t=e.memoizedProps,r=se(t,e.stateNode),o=ur!==null?ur.get(r):void 0,l=be(t.default,o!==void 0?t.share:t.exit);l!=="none"&&(aa(e,r,l,null,!1)?o!==void 0?(l=e.stateNode,o.paired=l,l.paired=o,ur.delete(r),la(e,t.onShare)):la(e,t.onExit):Nr(e.child,!1)),ur!==null&&au(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)ou(e),e=e.sibling;else ur!==null&&au(e)}function Pp(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,r=se(t,e.stateNode);t=be(t.default,t.update),e.flags&=-5,t!=="none"&&aa(e,r,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&Pp(e);e=e.sibling}}function su(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,Nr(e.child,!1))}su(e)}e=e.sibling}}function ss(e){if(e.tag===30)e.stateNode.paired=null,Nr(e.child,!1),su(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)ss(e),e=e.sibling;else su(e)}function Ip(e){for(e=e.child;e!==null;)e.tag===30?Nr(e.child,!1):(e.subtreeFlags&33554432)!==0&&Ip(e),e=e.sibling}function lu(e,t,r,o,l,c,S){if(!un)return!1;for(var B=!1;t!==null;){if(t.tag===5){var ie=t.stateNode;if(c!==null&&Qn<c.length){var ge=c[Qn],xe=ku(ie);(gs(ge)||gs(xe))&&(B=!0),(e.flags&4)===0&&S0(ge,xe)&&(e.flags|=4),E0(ge,xe)&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&yh(ie,Qn===0?r:r+"_"+Qn,l),B&&(e.flags&4)!==0||(zr===null&&(zr=[]),zr.push(ie,Qn===0?o:o+"_"+Qn,t.memoizedProps)),Qn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&S?e.flags|=t.flags&32:lu(e,t.child,r,o,l,c,S)&&(B=!0));t=t.sibling}return B}function Lp(e,t){for(e=e.child;e!==null;){if(e.tag===30){var r=e.memoizedProps,o=e.stateNode,l=se(r,o),c=be(r.default,r.update),S;S=e.memoizedState,e.memoizedState=null,o=e;var B=e.child;Qn=0,l=lu(o,B,l,l,c,S,!1),(e.flags&4)!==0&&l&&la(e,r.onUpdate)}else(e.subtreeFlags&33554432)!==0&&Lp(e);e=e.sibling}}function s_(e,t,r){for(L_(e.containerInfo),e=(r&335544064)===r,Cn=t,t=e?9270:1024;Cn!==null;){if(r=Cn,e){var o=r.deletions;if(o!==null)for(var l=0;l<o.length;l++)e&&ou(o[l])}if(r.alternate===null&&(r.flags&2)!==0)e&&Rp(r),ls(e);else{if(r.tag===22){if(o=r.alternate,r.memoizedState!==null){o!==null&&o.memoizedState===null&&e&&ou(o),ls(e);continue}else if(o!==null&&o.memoizedState!==null){e&&Rp(r),ls(e);continue}}o=r.child,(r.subtreeFlags&t)!==0&&o!==null?(o.return=r,Cn=o):(e&&Pp(r),ls(e))}}ur=null}function ls(e){for(;Cn!==null;){var t=Cn,r=e,o=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((l&1024)!==0&&o!==null){r=void 0,l=o.memoizedProps,o=o.memoizedState;var c=t.stateNode;try{var S=Pi(t.type,l);r=c.getSnapshotBeforeUpdate(S,o),c.__reactInternalSnapshotBeforeUpdate=r}catch(B){zt(t,t.return,B)}}break;case 3:(l&1024)!==0&&un&&x0(t.stateNode.containerInfo);break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:r&&o!==null&&(r=se(o.memoizedProps,o.stateNode),l=t.memoizedProps,l=be(l.default,l.update),l!=="none"&&aa(o,r,l,o.memoizedState=[],!0));break;default:if((l&1024)!==0)throw Error(u(163))}if(o=t.sibling,o!==null){o.return=t.return,Cn=o;break}Cn=t.return}}function Dp(e,t,r){var o=r.flags;switch(r.tag){case 0:case 11:case 15:Fr(e,r),o&4&&Qa(5,r);break;case 1:if(Fr(e,r),o&4)if(e=r.stateNode,t===null)try{e.componentDidMount()}catch(S){zt(r,r.return,S)}else{var l=Pi(r.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(l,t,e.__reactInternalSnapshotBeforeUpdate)}catch(S){zt(r,r.return,S)}}o&64&&Ep(r),o&512&&Ur(r,r.return);break;case 3:if(Fr(e,r),o&64&&(o=r.updateQueue,o!==null)){if(e=null,r.child!==null)switch(r.child.tag){case 27:case 5:e=io(r.child.stateNode);break;case 1:e=r.child.stateNode}try{Ee(o,e)}catch(S){zt(r,r.return,S)}}break;case 27:cn&&t===null&&o&4&&wp(r);case 26:case 5:if(Fr(e,r),t===null){if(o&4)Jl(r);else if(o&64){e=r.type,t=r.memoizedProps,l=r.stateNode;try{K0(l,e,t,r)}catch(S){zt(r,r.return,S)}}}o&512&&Ur(r,r.return);break;case 12:Fr(e,r);break;case 31:Fr(e,r),o&4&&Fp(e,r);break;case 13:Fr(e,r),o&4&&Op(e,r),o&64&&(o=r.memoizedState,o!==null&&(o=o.dehydrated,o!==null&&(r=g_.bind(null,r),I0(o,r))));break;case 22:if(o=r.memoizedState!==null||An,!o){var c=t!==null&&t.memoizedState!==null||qt;t=An,l=qt,An=o,(qt=c)&&!l?(o=cn?2:0,(r.subtreeFlags&8772)!==0&&(o|=1),Rr(e,r,o)):Fr(e,r),An=t,qt=l}break;case 30:Fr(e,r),o&512&&Ur(r,r.return);break;case 7:o&512&&Ur(r,r.return);default:Fr(e,r)}}function uu(e,t){if(un)for(e=e.child;e!==null;)Up(e,t),e=e.sibling}function Up(e,t){if(un)switch(e.tag){case 5:case 26:try{var r=e.stateNode;t?f0(r):p0(e.stateNode,e.memoizedProps)}catch(c){zt(e,e.return,c)}cu(e,t);break;case 6:try{var o=e.stateNode;t?d0(o):h0(o,e.memoizedProps),Vn=!0}catch(c){zt(e,e.return,c)}break;case 18:try{var l=e.stateNode;t?iS(l):aS(e.stateNode)}catch(c){zt(e,e.return,c)}break;case 22:case 23:e.memoizedState===null&&uu(e,t);break;default:uu(e,t)}}function cu(e,t){if(un&&e.subtreeFlags&67108864)for(e=e.child;e!==null;){var r=e,o=t;if(un)switch(r.tag){case 4:Up(r,o);break;case 22:r.memoizedState===null&&cu(r,o);break;default:cu(r,o)}e=e.sibling}}function Np(e){var t=e.alternate;t!==null&&(e.alternate=null,Np(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&z_(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function rr(e,t,r){for(r=r.child;r!==null;)fu(e,t,r),r=r.sibling}function fu(e,t,r){if(sr&&typeof sr.onCommitFiberUnmount=="function")try{sr.onCommitFiberUnmount(so,r)}catch{}switch(r.tag){case 26:if(_r){qt||In(r,t),rr(e,t,r),r.memoizedState?Bh(r.memoizedState):r.stateNode&&(qt||Vu(r.stateNode));break}case 27:if(cn){qt||In(r,t),eo(r);var o=En,l=Jn;ha(r.type)&&(En=r.stateNode,Jn=!1),rr(e,t,r),Gh(r.stateNode,r.type,r.memoizedProps),En=o,Jn=l;break}case 5:qt||In(r,t),eo(r);case 6:if(r.tag===6&&eo(r),un){if(o=En,l=Jn,En=null,rr(e,t,r),En=o,Jn=l,En!==null)if(Jn)try{c0(En,r.stateNode),Vn=!0}catch(c){zt(r,t,c)}else try{u0(En,r.stateNode),Vn=!0}catch(c){zt(r,t,c)}}else rr(e,t,r);break;case 18:un&&En!==null&&(Jn?rS(En,r.stateNode):nS(En,r.stateNode));break;case 4:un?(o=En,l=Jn,En=r.stateNode.containerInfo,Jn=!0,rr(e,t,r),En=o,Jn=l):(Br&&yp(r.stateNode,r,Ah()),rr(e,t,r));break;case 0:case 11:case 14:case 15:si(2,r,t),qt||si(4,r,t),rr(e,t,r);break;case 1:qt||(In(r,t),o=r.stateNode,typeof o.componentWillUnmount=="function"&&bp(r,t,o)),rr(e,t,r);break;case 21:rr(e,t,r);break;case 22:qt=(o=qt)||r.memoizedState!==null,rr(e,t,r),qt=o;break;case 30:In(r,t),rr(e,t,r);break;case 7:qt||In(r,t),rr(e,t,r);break;default:rr(e,t,r)}}function Fp(e,t){if(Dn&&t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Q0(e)}catch(r){zt(t,t.return,r)}}}function Op(e,t){if(Dn&&t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{J0(e)}catch(r){zt(t,t.return,r)}}function l_(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Qh),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Qh),t;default:throw Error(u(435,e.tag))}}function us(e,t){var r=l_(e);t.forEach(function(o){if(!r.has(o)){r.add(o);var l=__.bind(null,e,o);o.then(l,l)}})}function Ln(e,t,r){var o=t.deletions;if(o!==null)for(var l=0;l<o.length;l++){var c=o[l],S=e,B=t;if(un){var ie=B;e:for(;ie!==null;){switch(ie.tag){case 27:if(cn){if(ha(ie.type)){En=ie.stateNode,Jn=!1;break e}break}case 5:En=ie.stateNode,Jn=!1;break e;case 3:case 4:En=ie.stateNode.containerInfo,Jn=!0;break e}ie=ie.return}if(En===null)throw Error(u(160));fu(S,B,c),En=null,Jn=!1}else fu(S,B,c);S=c.alternate,S!==null&&(S.return=null),c.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Bp(t,e,r),t=t.sibling}function Bp(e,t,r){var o=e.alternate,l=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(l&4&&(o=e.updateQueue,o=o!==null?o.events:null,o!==null))for(var c=0;c<o.length;c++){var S=o[c];S.ref.impl=S.nextImpl}Ln(t,e,r),Gn(e),l&4&&(si(3,e,e.return),Qa(3,e),si(5,e,e.return));break;case 1:Ln(t,e,r),Gn(e),l&512&&(qt||o===null||In(o,o.return)),l&64&&An&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(l=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=l===null?t:l.concat(t))));break;case 26:if(_r){c=Ar,Ln(t,e,r),Gn(e),l&512&&(qt||o===null||In(o,o.return)),l&4&&(r=o!==null?o.memoizedState:null,l=e.memoizedState,o===null?l===null?e.stateNode===null?e.stateNode=An?kh(e.type,e.memoizedProps,t.containerInfo,e):lS(c,e.type,e.memoizedProps,e):An||Gu(c,e.type,e.stateNode):e.stateNode=Oh(c,l,e.memoizedProps):r!==l?(r===null?(t=o.stateNode,t===null||qt||Vu(t)):Bh(r),l===null?An||Gu(c,e.type,e.stateNode):Oh(c,l,e.memoizedProps)):l===null&&e.stateNode!==null&&eu(e,e.memoizedProps,o.memoizedProps));break}case 27:if(cn){Ln(t,e,r),Gn(e),l&512&&(qt||o===null||In(o,o.return)),o!==null&&l&4&&eu(e,e.memoizedProps,o.memoizedProps);break}case 5:if(c=Gr,Gr=!1,Ln(t,e,r),Gr=c,Gn(e),l&512&&(qt||o===null||In(o,o.return)),un){if(e.flags&32){t=e.stateNode;try{xh(t),Vn=!0}catch(xe){zt(e,e.return,xe)}}l&4&&e.stateNode!=null&&(t=e.memoizedProps,eu(e,t,o!==null?o.memoizedProps:t)),l&1024&&(ac=!0)}else Br&&e.alternate!==null&&(e.alternate.stateNode=e.stateNode);break;case 6:if(Ln(t,e,r),Gn(e),l&4&&un){if(e.stateNode===null)throw Error(u(162));t=e.memoizedProps,l=o!==null?o.memoizedProps:t,r=e.stateNode;try{i0(r,l,t),Vn=!0}catch(xe){zt(e,e.return,xe)}}break;case 3:if(Vn=!1,_r?(uS(),c=Ar,Ar=_s(t.containerInfo),Ln(t,e,r),Ar=c):Ln(t,e,r),Gn(e),l&4){if(un&&Dn&&o!==null&&o.memoizedState.isDehydrated)try{Z0(t.containerInfo)}catch(xe){zt(e,e.return,xe)}if(Br){l=t.containerInfo,t=t.pendingChildren;try{Ph(l,t),Vn=!0}catch(xe){zt(e,e.return,xe)}}}ac&&(ac=!1,kp(e)),Vn=!1;break;case 4:o=Gr,Gr=An,c=Mp(),_r?(S=Ar,Ar=_s(e.stateNode.containerInfo),Ln(t,e,r),Gn(e),Ar=S):(Ln(t,e,r),Gn(e)),Vn&&mo&&(Us=!0),Vn=c,Gr=o,l&4&&Br&&yp(e.stateNode,e,e.stateNode.pendingChildren);break;case 12:Ln(t,e,r),Gn(e);break;case 31:Ln(t,e,r),Gn(e),l&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,us(e,t)));break;case 13:Ln(t,e,r),Gn(e),e.child.flags&8192&&e.memoizedState!==null!=(o!==null&&o.memoizedState!==null)&&(Hs=Zn()),l&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,us(e,t)));break;case 22:c=e.memoizedState!==null,S=o!==null&&o.memoizedState!==null;var B=An,ie=qt,ge=Gr;An=B||c,Gr=ge||c,qt=ie||S,Ln(t,e,r),qt=ie,Gr=ge,An=B,Gn(e),l&8192&&(t=e.stateNode,t._visibility=c?t._visibility&-2:t._visibility|1,!c||o===null||S||An||qt||(t=cn?2:0,r=S||qt,o=An,S=qt,An=c||An,qt=r,li(e,t),An=o,qt=S),un&&(c||!Gr)&&uu(e,c)),l&4&&(t=e.updateQueue,t!==null&&(l=t.retryQueue,l!==null&&(t.retryQueue=null,us(e,l))));break;case 19:Ln(t,e,r),Gn(e),l&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,us(e,t)));break;case 30:l&512&&(qt||o===null||In(o,o.return)),l=Mp(),c=mo,S=(r&335544064)===r,B=e.memoizedProps,mo=S&&be(B.default,B.update)!=="none",Ln(t,e,r),Gn(e),S&&o!==null&&Vn&&(e.flags|=4),mo=c,Vn=l;break;case 21:break;case 7:l&512&&(qt||o===null||In(o,o.return)),o&&o.stateNode!==null&&w0(e,o.stateNode);default:Ln(t,e,r),Gn(e)}}function Gn(e){var t=e.flags;if(t&2){try{for(var r,o=e.return;o!==null;){if(xp(o)){r=o;break}o=o.return}o=null;for(var l=e.return;l!==null;){if(Ql(l)){var c=l.stateNode;o===null?o=[c]:o.push(c)}if(Zl(l))break;l=l.return}var S=o;if(un){if(r==null)throw Error(u(160));switch(r.tag){case 27:if(cn){var B=r.stateNode,ie=tu(e);as(e,ie,B,S);break}case 5:var ge=r.stateNode;r.flags&32&&(xh(ge),r.flags&=-33);var xe=tu(e);as(e,xe,ge,S);break;case 3:case 4:var Fe=r.stateNode.containerInfo,Ve=tu(e);nu(e,Ve,Fe,S);break;default:throw Error(u(161))}}else ru(e,S)}catch(Rt){zt(e,e.return,Rt)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function kp(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;kp(t),t.tag===5&&t.flags&1024&&Y_(t.stateNode),e=e.sibling}}function oa(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Hp(t,e),t=t.sibling;else Lp(t)}function Hp(e,t){var r=e.alternate;if(r===null)iu(e,!1);else switch(e.tag){case 3:if(oc=Vr=!1,Ap(),oa(t,e),!Vr&&!Us){if(e=zr,e!==null)for(var o=0;o<e.length;o+=3)v0(e[o],e[o+1],e[o+2]);g0(t.containerInfo),oc=!0}zr=null;break;case 5:oa(t,e);break;case 4:o=Vr,Vr=!1,oa(t,e),Vr&&(Us=!0),Vr=o;break;case 22:e.memoizedState===null&&(r.memoizedState!==null?iu(e,!1):oa(t,e));break;case 30:o=Vr;var l=Ap();Vr=!1,oa(t,e),Vr&&(e.flags|=4);var c=e.memoizedProps,S=e.stateNode;t=se(c,S),S=se(r.memoizedProps,S);var B=be(c.default,c.update);B==="none"?r=!1:(c=r.memoizedState,r.memoizedState=null,r=e.child,Qn=0,r=lu(e,r,t,S,B,c,!0),Qn!==(c===null?0:c.length)&&(e.flags|=32)),(e.flags&4)!==0&&r?(la(e,e.memoizedProps.onUpdate),zr=l):l!==null&&(l.push.apply(l,zr),zr=l),Vr=(e.flags&32)!==0?!0:o;break;default:oa(t,e)}}function Fr(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Dp(e,t.alternate,t),t=t.sibling}function li(e,t){for(e=e.child;e!==null;){var r=e,o=t;switch(r.tag){case 0:case 11:case 14:case 15:si(4,r,r.return),li(r,o);break;case 1:In(r,r.return);var l=r.stateNode;typeof l.componentWillUnmount=="function"&&bp(r,r.return,l),li(r,o);break;case 27:cn&&(o&2)!==0&&Gh(r.stateNode,r.type,r.memoizedProps);case 5:In(r,r.return),r.tag!==5&&r.tag!==27||eo(r),li(r,o);break;case 6:eo(r);break;case 26:In(r,r.return),_r&&(l=r.stateNode,r.memoizedState!==null||l===null||qt||Vu(l)),li(r,o);break;case 22:r.memoizedState===null&&li(r,o);break;case 30:In(r,r.return),li(r,o);break;case 7:In(r,r.return);default:li(r,o)}e=e.sibling}}function Rr(e,t,r){for(r=(t.subtreeFlags&8772)!==0?r:r&-2,t=t.child;t!==null;){var o=t.alternate,l=e,c=t,S=c.flags,B=(r&1)!==0;switch(c.tag){case 0:case 11:case 15:Rr(l,c,r),Qa(4,c);break;case 1:if(Rr(l,c,r),o=c,l=o.stateNode,typeof l.componentDidMount=="function")try{l.componentDidMount()}catch(xe){zt(o,o.return,xe)}if(o=c,l=o.updateQueue,l!==null){var ie=o.stateNode;try{var ge=l.shared.hiddenCallbacks;if(ge!==null)for(l.shared.hiddenCallbacks=null,l=0;l<ge.length;l++)me(ge[l],ie)}catch(xe){zt(o,o.return,xe)}}B&&S&64&&Ep(c),Ur(c,c.return);break;case 27:cn&&(r&2)!==0&&wp(c);case 5:c.tag!==5&&c.tag!==27||Tp(c),Rr(l,c,r),B&&o===null&&S&4&&Jl(c),Ur(c,c.return);break;case 6:Tp(c);break;case 26:_r&&(ie=c.stateNode,c.memoizedState!==null||ie===null||An||Gu(_s(ie.ownerDocument),c.type,ie)),Rr(l,c,r),B&&o===null&&S&4&&Jl(c),Ur(c,c.return);break;case 12:Rr(l,c,r);break;case 31:Rr(l,c,r),B&&S&4&&Fp(l,c);break;case 13:Rr(l,c,r),B&&S&4&&Op(l,c);break;case 22:c.memoizedState===null&&Rr(l,c,r),Ur(c,c.return);break;case 30:Rr(l,c,r),Ur(c,c.return);break;case 7:Ur(c,c.return);default:Rr(l,c,r)}t=t.sibling}}function du(e,t){var r=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(r=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==r&&(e!=null&&e.refCount++,r!=null&&je(r))}function pu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&je(e))}function gr(e,t,r,o){var l=(r&335544064)===r;if(t.subtreeFlags&(l?10262:10256))for(t=t.child;t!==null;)zp(e,t,r,o),t=t.sibling;else l&&Ip(t)}function zp(e,t,r,o){var l=(r&335544064)===r;l&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ss(t);var c=t.flags;switch(t.tag){case 0:case 11:case 15:gr(e,t,r,o),c&2048&&Qa(9,t);break;case 1:gr(e,t,r,o);break;case 3:gr(e,t,r,o),l&&un&&oc&&_0(e.containerInfo),c&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&je(e)));break;case 12:if(c&2048){gr(e,t,r,o),e=t.stateNode;try{var S=t.memoizedProps,B=S.id,ie=S.onPostCommit;typeof ie=="function"&&ie(B,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(ge){zt(t,t.return,ge)}}else gr(e,t,r,o);break;case 31:gr(e,t,r,o);break;case 13:gr(e,t,r,o);break;case 23:break;case 22:S=t.stateNode,B=t.alternate,t.memoizedState!==null?(l&&B!==null&&B.memoizedState===null&&ss(B),S._visibility&2?gr(e,t,r,o):to(e,t)):(l&&B!==null&&B.memoizedState!==null&&ss(t),S._visibility&2?gr(e,t,r,o):(S._visibility|=2,sa(e,t,r,o,(t.subtreeFlags&10256)!==0||!1))),c&2048&&du(B,t);break;case 24:gr(e,t,r,o),c&2048&&pu(t.alternate,t);break;case 30:l&&(l=t.alternate,l!==null&&(Nr(l.child,!0),Nr(t.child,!0))),gr(e,t,r,o);break;default:gr(e,t,r,o)}}function sa(e,t,r,o,l){for(l=l&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var c=e,S=t,B=r,ie=o,ge=S.flags;switch(S.tag){case 0:case 11:case 15:sa(c,S,B,ie,l),Qa(8,S);break;case 23:break;case 22:var xe=S.stateNode;S.memoizedState!==null?xe._visibility&2?sa(c,S,B,ie,l):to(c,S):(xe._visibility|=2,sa(c,S,B,ie,l)),l&&ge&2048&&du(S.alternate,S);break;case 24:sa(c,S,B,ie,l),l&&ge&2048&&pu(S.alternate,S);break;default:sa(c,S,B,ie,l)}t=t.sibling}}function to(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var r=e,o=t,l=o.flags;switch(o.tag){case 22:to(r,o),l&2048&&du(o.alternate,o);break;case 24:to(r,o),l&2048&&pu(o.alternate,o);break;default:to(r,o)}t=t.sibling}}function ui(e,t,r){if(e.subtreeFlags&Hi)for(e=e.child;e!==null;)Gp(e,t,r),e=e.sibling}function Gp(e,t,r){switch(e.tag){case 26:if(ui(e,t,r),e.flags&Hi)if(e.memoizedState!==null)fS(r,Ar,e.memoizedState,e.memoizedProps);else{var o=e.stateNode,l=e.type;e=e.memoizedProps,((t&335544128)===t||Bu(l,e))&&Th(r,o,l,e)}break;case 5:ui(e,t,r),e.flags&Hi&&(o=e.stateNode,l=e.type,e=e.memoizedProps,((t&335544128)===t||Bu(l,e))&&Th(r,o,l,e));break;case 3:case 4:_r?(o=Ar,Ar=_s(e.stateNode.containerInfo),ui(e,t,r),Ar=o):ui(e,t,r);break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Hi,Hi=16777216,ui(e,t,r),Hi=o):ui(e,t,r));break;case 30:(e.flags&Hi)!==0&&(o=e.memoizedProps.name,o!=null&&o!=="auto"&&(l=e.stateNode,l.paired=null,ur===null&&(ur=new Map),ur.set(o,l))),ui(e,t,r);break;default:ui(e,t,r)}}function Vp(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function no(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];Cn=o,Xp(o,e)}Vp(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Wp(e),e=e.sibling}function Wp(e){switch(e.tag){case 0:case 11:case 15:no(e),e.flags&2048&&si(9,e,e.return);break;case 3:no(e);break;case 12:no(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,cs(e)):no(e);break;default:no(e)}}function cs(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var r=0;r<t.length;r++){var o=t[r];Cn=o,Xp(o,e)}Vp(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:si(8,t,t.return),cs(t);break;case 22:r=t.stateNode,r._visibility&2&&(r._visibility&=-3,cs(t));break;default:cs(t)}e=e.sibling}}function Xp(e,t){for(;Cn!==null;){var r=Cn;switch(r.tag){case 0:case 11:case 15:si(8,r,t);break;case 23:case 22:if(r.memoizedState!==null&&r.memoizedState.cachePool!==null){var o=r.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:je(r.memoizedState.cache)}if(o=r.child,o!==null)o.return=r,Cn=o;else e:for(r=e;Cn!==null;){o=Cn;var l=o.sibling,c=o.return;if(Np(o),o===r){Cn=null;break e}if(l!==null){l.return=c,Cn=l;break e}Cn=c}}}function hu(e){var t=O_(e);if(t!=null){if(typeof t.memoizedProps["data-testname"]!="string")throw Error(u(364));return t}if(e=K_(e),e===null)throw Error(u(362));return e.stateNode.current}function mu(e,t){var r=e.tag;switch(t.$$typeof){case Ns:if(e.type===t.value)return!0;break;case Fs:e:{for(t=t.value,e=[e,0],r=0;r<e.length;){var o=e[r++],l=o.tag,c=e[r++],S=t[c];if(l!==5&&l!==26&&l!==27||!oo(o)){for(;S!=null&&mu(o,S);)c++,S=t[c];if(c===t.length){t=!0;break e}else for(o=o.child;o!==null;)e.push(o,c),o=o.sibling}}t=!1}return t;case Os:if((r===5||r===26||r===27)&&J_(e.stateNode,t.value))return!0;break;case ks:if((r===5||r===6||r===26||r===27)&&(e=Q_(e),e!==null&&0<=e.indexOf(t.value)))return!0;break;case Bs:if((r===5||r===26||r===27)&&(e=e.memoizedProps["data-testname"],typeof e=="string"&&e.toLowerCase()===t.value.toLowerCase()))return!0;break;default:throw Error(u(365))}return!1}function vu(e){switch(e.$$typeof){case Ns:return"<"+(x(e.value)||"Unknown")+">";case Fs:return":has("+(vu(e)||"")+")";case Os:return'[role="'+e.value+'"]';case ks:return'"'+e.value+'"';case Bs:return'[data-testname="'+e.value+'"]';default:throw Error(u(365))}}function qp(e,t){var r=[];e=[e,0];for(var o=0;o<e.length;){var l=e[o++],c=l.tag,S=e[o++],B=t[S];if(c!==5&&c!==26&&c!==27||!oo(l)){for(;B!=null&&mu(l,B);)S++,B=t[S];if(S===t.length)r.push(l);else for(l=l.child;l!==null;)e.push(l,S),l=l.sibling}}return r}function gu(e,t){if(!ao)throw Error(u(363));e=hu(e),e=qp(e,t),t=[],e=Array.from(e);for(var r=0;r<e.length;){var o=e[r++],l=o.tag;if(l===5||l===26||l===27)oo(o)||t.push(o.stateNode);else for(o=o.child;o!==null;)e.push(o),o=o.sibling}return t}function ir(){return(It&2)!==0&&Dt!==0?Dt&-Dt:ct.T!==null?Me():k_()}function Yp(){if(fr===0)if((Dt&536870912)===0||xt){var e=Es;Es<<=1,(Es&3932160)===0&&(Es=262144),fr=e}else fr=536870912;return e=Nn.current,e!==null&&(e.flags|=32),fr}function la(e,t){if(t!=null){var r=e.stateNode,o=r.ref;o===null&&(o=r.ref=wh(se(e.memoizedProps,r))),Pa===null&&(Pa=[]),Pa.push(t.bind(null,o))}}function Kn(e,t,r){(e===en&&(jt===2||jt===9)||e.cancelPendingCommit!==null)&&(ua(e,0),ci(e,Dt,fr,!1)),V(e,r),((It&2)===0||e!==en)&&(e===en&&((It&2)===0&&(zi|=r),hn===4&&ci(e,Dt,fr,!1)),Je(e))}function jp(e,t,r){if((It&6)!==0)throw Error(u(327));var o=!r&&(t&127)===0&&(t&e.expiredLanes)===0||C(e,t),l=o?f_(e,t):Su(e,t,!0),c=o;do{if(l===0){Ra&&!o&&ci(e,t,0,!1);break}else{if(r=e.current.alternate,c&&!u_(r)){l=Su(e,t,!1),c=!1;continue}if(l===2){if(c=t,e.errorRecoveryDisabledLanes&c)var S=0;else S=e.pendingLanes&-536870913,S=S!==0?S:S&536870912?536870912:0;if(S!==0){t=S;e:{var B=e;l=go;var ie=Dn&&B.current.memoizedState.isDehydrated;if(ie&&(ua(B,S).flags|=256),S=Su(B,S,!1),S!==2&&S!==6){if(sc&&!ie){B.errorRecoveryDisabledLanes|=c,zi|=c,l=4;break e}c=er,er=l,c!==null&&(er===null?er=c:er.push.apply(er,c))}l=S}if(c=!1,l!==2)continue}}if(l===1){ua(e,0),ci(e,t,0,!0);break}e:{switch(o=e,c=l,c){case 0:case 1:throw Error(u(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:ci(o,t,fr,!gi);break e;case 2:er=null;break;case 3:case 5:break;default:throw Error(u(329))}if((t&62914560)===t&&(l=Hs+300-Zn(),10<l)){if(ci(o,t,fr,!gi),d(o,0,!0)!==0)break e;Wr=t,o.timeoutHandle=N_($p.bind(null,o,r,er,zs,uc,t,fr,zi,Aa,gi,c,"Throttled",-0,0),l);break e}$p(o,r,er,zs,uc,t,fr,zi,Aa,gi,c,null,-0,0)}}break}while(!0);Je(e)}function $p(e,t,r,o,l,c,S,B,ie,ge,xe,Fe,Ve,Rt){e.timeoutHandle=Li;var Bt=t.subtreeFlags,Ei=(c&335544064)===c;if(Fe=null,(Ei||Bt&8192||(Bt&16785408)===16785408)&&(Fe=W_(),ur=null,Gp(t,c,Fe),Ei&&X_(Fe,e.containerInfo),Bt=(c&62914560)===c?Hs-Zn():(c&4194048)===c?Jh-Zn():0,Bt=q_(Fe,Bt),Bt!==null)){Wr=c,e.cancelPendingCommit=Bt(ih.bind(null,e,t,c,r,o,l,S,B,ie,ge,xe,Fe,null,Ve,Rt)),ci(e,c,S,!ge);return}ih(e,t,c,r,o,l,S,B,ie,ge,xe,Fe)}function u_(e){for(var t=e;;){var r=t.tag;if((r===0||r===11||r===15)&&t.flags&16384&&(r=t.updateQueue,r!==null&&(r=r.stores,r!==null)))for(var o=0;o<r.length;o++){var l=r[o],c=l.getSnapshot;l=l.value;try{if(!lr(c(),l))return!1}catch{return!1}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ci(e,t,r,o){t=N(e,t),t&=~lc,t&=~zi,e.suspendedLanes|=t,e.pingedLanes&=~t,o&&(e.warmLanes|=t),o=e.expirationTimes;for(var l=t;0<l;){var c=31-or(l),S=1<<c;o[c]=-1,l&=~S}r!==0&&M(e,r,t)}function Kp(){return(It&6)===0?(He(0),!1):!0}function _u(){if(Lt!==null){if(jt===0)var e=Lt.return;else e=Lt,ei=Di=null,Jt(e),Ta=null,po=0,e=Lt;for(;e!==null;)Sp(e.alternate,e),e=e.return;Lt=null}}function ua(e,t){var r=e.timeoutHandle;return r!==Li&&(e.timeoutHandle=Li,F_(r)),r=e.cancelPendingCommit,r!==null&&(e.cancelPendingCommit=null,r()),Wr=0,_u(),en=e,Lt=r=Kr(e.current,null),Dt=t,jt=0,cr=null,gi=!1,Ra=C(e,t),sc=!1,Aa=fr=lc=zi=_i=hn=0,er=go=null,uc=!1,ni=N(e,t),g(),r}function Zp(e,t){bt=null,ct.H=Ls,t===Ma||t===Rs?(t=Ai(),jt=3):t===Ju?(t=Ai(),jt=4):jt=t===rc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,cr=t,Lt===null&&(hn=1,Qo(e,ot(t,e.current)))}function Qp(){var e=Nn.current;return e===null?!0:(Dt&4194048)===Dt?qn===null:(Dt&62914560)===Dt||(Dt&536870912)!==0?e===qn:!1}function Jp(){var e=ct.H;return ct.H=Ls,e===null?Ls:e}function eh(){var e=ct.A;return ct.A=AS,e}function fs(){hn=4,gi||(Dt&4194048)!==Dt&&Nn.current!==null||(Ra=!0),(_i&134217727)===0&&(zi&134217727)===0||en===null||ci(en,Dt,fr,!1)}function Su(e,t,r){var o=It;It|=2;var l=Jp(),c=eh();(en!==e||Dt!==t)&&(zs=null,ua(e,t)),t=!1;var S=hn;e:do try{if(jt!==0&&Lt!==null){var B=Lt,ie=cr;switch(jt){case 8:_u(),S=6;break e;case 3:case 2:case 9:case 6:Nn.current===null&&(t=!0);var ge=jt;if(jt=0,cr=null,ca(e,B,ie,ge),r&&Ra){S=0;break e}break;default:ge=jt,jt=0,cr=null,ca(e,B,ie,ge)}}c_(),S=hn;break}catch(xe){Zp(e,xe)}while(!0);return t&&e.shellSuspendCounter++,ei=Di=null,It=o,ct.H=l,ct.A=c,Lt===null&&(en=null,Dt=0,g()),S}function c_(){for(;Lt!==null;)th(Lt)}function f_(e,t){var r=It;It|=2;var o=Jp(),l=eh();en!==e||Dt!==t?(zs=null,_o=Zn()+500,ua(e,t)):Ra=C(e,t);e:do try{if(jt!==0&&Lt!==null){t=Lt;var c=cr;t:switch(jt){case 1:jt=0,cr=null,ca(e,t,c,1);break;case 2:case 9:if(Ri(c)){jt=0,cr=null,nh(t);break}t=function(){jt!==2&&jt!==9||en!==e||(jt=7),Je(e)},c.then(t,t);break e;case 3:jt=7;break e;case 4:jt=5;break e;case 7:Ri(c)?(jt=0,cr=null,nh(t)):(jt=0,cr=null,ca(e,t,c,7));break;case 5:var S=null;switch(Lt.tag){case 26:S=Lt.memoizedState;case 5:case 27:var B=Lt,ie=B.type,ge=B.pendingProps;if(S?Hh(S):Mh(B.stateNode,ie,ge)){jt=0,cr=null;var xe=B.sibling;if(xe!==null)Lt=xe;else{var Fe=B.return;Fe!==null?(Lt=Fe,ds(Fe)):Lt=null}break t}}jt=0,cr=null,ca(e,t,c,5);break;case 6:jt=0,cr=null,ca(e,t,c,6);break;case 8:_u(),hn=6;break e;default:throw Error(u(462))}}d_();break}catch(Ve){Zp(e,Ve)}while(!0);return ei=Di=null,ct.H=o,ct.A=l,It=r,Lt!==null?0:(en=null,Dt=0,g(),hn)}function d_(){for(;Lt!==null&&!mS();)th(Lt)}function th(e){var t=hp(e.alternate,e,ni);e.memoizedProps=e.pendingProps,t===null?ds(e):Lt=t}function nh(e){var t=e,r=t.alternate;switch(t.tag){case 15:case 0:t=sp(r,t,t.pendingProps,t.type,void 0,Dt);break;case 11:t=sp(r,t,t.pendingProps,t.type.render,t.ref,Dt);break;case 5:Jt(t);var o=t;Dn&&o===Rn&&(xt?(pt(o),o.tag===5&&o.stateNode!=null&&(sn=o.stateNode)):(pt(o),xt=!0));default:Sp(r,t),t=Lt=lh(t,ni),t=hp(r,t,ni)}e.memoizedProps=e.pendingProps,t===null?ds(e):Lt=t}function ca(e,t,r,o){ei=Di=null,Jt(t),Ta=null,po=0;var l=t.return;try{if(t_(e,l,t,r,Dt)){hn=1,Qo(e,ot(r,e.current)),Lt=null;return}}catch(c){if(l!==null)throw Lt=l,c;hn=1,Qo(e,ot(r,e.current)),Lt=null;return}t.flags&32768?(xt||o===1?e=!0:Ra||(Dt&536870912)!==0?e=!1:(gi=e=!0,(o===2||o===9||o===3||o===6)&&(o=Nn.current,o!==null&&o.tag===13&&(o.flags|=16384))),rh(t,e)):ds(t)}function ds(e){var t=e;do{if((t.flags&32768)!==0){rh(t,gi);return}e=t.return;var r=a_(t.alternate,t,ni);if(r!==null){Lt=r;return}if(t=t.sibling,t!==null){Lt=t;return}Lt=t=e}while(t!==null);hn===0&&(hn=5)}function rh(e,t){do{var r=o_(e.alternate,e);if(r!==null){r.flags&=32767,Lt=r;return}if(r=e.return,r!==null&&(r.flags|=32768,r.subtreeFlags=0,r.deletions=null),!t&&(e=e.sibling,e!==null)){Lt=e;return}Lt=e=r}while(e!==null);hn=6,Lt=null}function ih(e,t,r,o,l,c,S,B,ie,ge,xe,Fe){e.cancelPendingCommit=null;do ro();while(dn!==0);if((It&6)!==0)throw Error(u(327));if(t!==null){if(t===e.current)throw Error(u(177));e===en&&(Lt=en=null,Dt=0),Gi=t,Cr=e,Wr=r,fc=l,em=o,p_(e,t,r,S,B,ie,Fe)}}function p_(e,t,r,o,l,c,S){var B=t.lanes|t.childLanes;if(cc=B,B|=ec,W(e,r,B,o,l,c),Pa=null,(r&335544064)===r?(Ia=Te(e),o=10262):(Ia=null,o=10256),(t.subtreeFlags&o)!==0||(t.flags&o)!==0?(e.callbackNode=null,e.callbackPriority=0,S_(qu,function(){return Tu(),null})):(e.callbackNode=null,e.callbackPriority=0),Ds=!1,o=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||o){o=ct.T,ct.T=null,l=Qr(),wn(2),c=It,It|=4;try{s_(e,t,r)}finally{It=c,wn(l),ct.T=o}}dn=1,Ds?Ca=b0(S,e.containerInfo,Ia,Eu,bu,m_,Mu,Tu,h_,null,null):(Eu(),bu(),Mu())}function h_(e){if(dn!==0){var t=Cr.onRecoverableError;t(e,{componentStack:null})}}function m_(){dn===3&&(dn=0,Hp(Gi,Cr),dn=4)}function Eu(){if(dn===1){dn=0;var e=Cr,t=Gi,r=Wr,o=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||o){o=ct.T,ct.T=null;var l=Qr();wn(2);var c=It;It|=4;try{mo=Us=!1,Bp(t,e,r),D_(e.containerInfo)}finally{It=c,wn(l),ct.T=o}}e.current=t,dn=2}}function bu(){if(dn===2){dn=0;var e=Cr,t=Gi,r=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||r){r=ct.T,ct.T=null;var o=Qr();wn(2);var l=It;It|=4;try{Dp(e,t.alternate,t)}finally{It=l,wn(o),ct.T=r}}dn=3}}function Mu(){if(dn===4||dn===3){dn=0;var e=Ca;Ca=null,vS();var t=Cr,r=Gi,o=Wr,l=em,c=(o&335544064)===o?10262:10256;if((r.subtreeFlags&c)!==0||(r.flags&c)!==0?dn=5:(dn=0,Gi=Cr=null,ah(t,t.pendingLanes)),c=t.pendingLanes,c===0&&(Si=null),Q(o),r=r.stateNode,sr&&typeof sr.onCommitFiberRoot=="function")try{sr.onCommitFiberRoot(so,r,void 0,(r.current.flags&128)===128)}catch{}if(l!==null){r=ct.T,c=Qr(),wn(2),ct.T=null;try{for(var S=t.onRecoverableError,B=0;B<l.length;B++){var ie=l[B];S(ie.value,{componentStack:ie.stack})}}finally{ct.T=r,wn(c)}}if(l=Pa,S=Ia,Ia=null,l!==null&&(Pa=null,S===null&&(S=[]),e!==null))for(ie=0;ie<l.length;ie++)r=(0,l[ie])(S),r!==void 0&&T0(e,r);(Wr&3)!==0&&ro(),Je(t),c=t.pendingLanes,(o&261930)!==0&&(c&42)!==0?t===Gs?So++:(So=0,Gs=t):(So=0,Gs=null),Dn&&tS(),He(0)}}function ah(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,je(t)))}function ro(){return Ca!==null&&(M0(Ca),Ca=null),Eu(),bu(),Mu(),Tu()}function Tu(){if(dn!==5)return!1;var e=Cr,t=cc;cc=0;var r=Q(Wr),o=32>r?32:r;r=ct.T;var l=Qr();try{wn(o),ct.T=null,o=fc,fc=null;var c=Cr,S=Wr;if(dn=0,Gi=Cr=null,Wr=0,(It&6)!==0)throw Error(u(331));var B=It;if(It|=4,Wp(c.current),zp(c,c.current,S,o),It=B,He(0,!1),sr&&typeof sr.onPostCommitFiberRoot=="function")try{sr.onPostCommitFiberRoot(so,c)}catch{}return!0}finally{wn(l),ct.T=r,ah(e,t)}}function oh(e,t,r){t=ot(r,t),t=Hl(e.stateNode,t,2),e=H(e,t,2),e!==null&&(V(e,2),Je(e))}function zt(e,t,r){if(e.tag===3)oh(e,e,r);else for(;t!==null;){if(t.tag===3){oh(t,e,r);break}else if(t.tag===1){var o=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(Si===null||!Si.has(o))){e=ot(r,e),r=Jd(2),o=H(t,r,2),o!==null&&(ep(r,o,t,e),V(o,2),Je(o));break}}t=t.return}}function xu(e,t,r){var o=e.pingCache;if(o===null){o=e.pingCache=new CS;var l=new Set;o.set(t,l)}else l=o.get(t),l===void 0&&(l=new Set,o.set(t,l));l.has(r)||(sc=!0,l.add(r),e=v_.bind(null,e,t,r),t.then(e,e))}function v_(e,t,r){var o=e.pingCache;o!==null&&o.delete(t),e.pingedLanes|=e.suspendedLanes&r,e.warmLanes&=~r,en===e&&(Dt&r)===r&&((hn===4||hn===3&&(Dt&62914560)===Dt&&300>Zn()-Hs)&&(It&2)===0?ua(e,0):lc|=r,Aa===Dt&&(Aa=0)),Je(e)}function sh(e,t){t===0&&(t=q()),e=ee(e,t),e!==null&&(V(e,t),Je(e))}function g_(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),sh(e,r)}function __(e,t){var r=0;switch(e.tag){case 31:case 13:var o=e.stateNode,l=e.memoizedState;l!==null&&(r=l.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(u(314))}o!==null&&o.delete(t),sh(e,r)}function S_(e,t){return Ms(e,t)}function E_(e,t,r,o){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function yu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Kr(e,t){var r=e.alternate;return r===null?(r=a(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&1206910976,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r.refCleanup=e.refCleanup,r}function lh(e,t){e.flags&=1206910978;var r=e.alternate;return r===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=r.childLanes,e.lanes=r.lanes,e.child=r.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=r.memoizedProps,e.memoizedState=r.memoizedState,e.updateQueue=r.updateQueue,e.type=r.type,t=r.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ps(e,t,r,o,l,c){var S=0;if(o=e,typeof o=="function")yu(o)&&(S=1);else if(typeof o=="string")S=_r&&cn?Nh(e,r,Un.current)?26:Vh(e)?27:5:_r?Nh(e,r,Un.current)?26:5:cn&&Vh(e)?27:5;else e:switch(o){case Nu:return e=a(31,r,t,l),e.elementType=Nu,e.lanes=c,e;case da:return Ii(r.children,l,c,t);case mh:S=8,l|=24;break;case Pu:return e=a(12,r,t,l|2),e.elementType=Pu,e.lanes=c,e;case Lu:return e=a(13,r,t,l),e.elementType=Lu,e.lanes=c,e;case Du:return e=a(19,r,t,l),e.elementType=Du,e.lanes=c,e;case x_:case Fu:return e=l|32,e=a(30,r,t,e),e.elementType=Fu,e.lanes=c,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof o=="object"&&o!==null)switch(o.$$typeof){case Zr:S=10;break e;case vh:S=9;break e;case Iu:S=11;break e;case Uu:S=14;break e;case fi:S=16,o=null;break e}S=29,r=Error(u(130,e===null?"null":typeof e,"")),o=null}return t=a(S,r,t,l),t.elementType=e,t.type=o,t.lanes=c,t}function Ii(e,t,r,o){return e=a(7,e,o,t),e.lanes=r,e}function wu(e,t,r){return e=a(6,e,null,t),e.lanes=r,e}function uh(e){var t=a(18,null,null,0);return t.stateNode=e,t}function Ru(e,t,r){return t=a(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function b_(e,t,r,o,l,c,S,B,ie){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=Li,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=D(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=D(0),this.hiddenUpdates=D(null),this.identifierPrefix=o,this.onUncaughtError=l,this.onCaughtError=c,this.onRecoverableError=S,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=ie,this.transitionTypes=null,this.incompleteTransitions=new Map}function ch(e,t,r,o,l,c,S,B,ie,ge,xe,Fe){return e=new b_(e,t,r,S,ie,ge,xe,Fe,B),t=1,c===!0&&(t|=24),c=a(3,null,null,t),e.current=c,c.stateNode=e,t=Pe(),t.refCount++,e.pooledCache=t,t.refCount++,c.memoizedState={element:o,isDehydrated:r,cache:t},ye(c),e}function fh(e){return e?(e=va,e):va}function dh(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(u(188)):(e=Object.keys(e).join(","),Error(u(268,e)));return e=p(t),e=e!==null?m(e):null,e===null?null:io(e.stateNode)}function ph(e,t,r,o,l,c){l=fh(l),o.context===null?o.context=l:o.pendingContext=l,o=L(t),o.payload={element:r},c=c===void 0?null:c,c!==null&&(o.callback=c),r=H(e,o,t),r!==null&&(Kn(r,e,t),G(r,e,t))}function hh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function Au(e,t){hh(e,t),(e=e.alternate)&&hh(e,t)}var Pt={},M_=rn,ar=qA,Cu=Object.assign,T_=Symbol.for("react.element"),hs=Symbol.for("react.transitional.element"),fa=Symbol.for("react.portal"),da=Symbol.for("react.fragment"),mh=Symbol.for("react.strict_mode"),Pu=Symbol.for("react.profiler"),vh=Symbol.for("react.consumer"),Zr=Symbol.for("react.context"),Iu=Symbol.for("react.forward_ref"),Lu=Symbol.for("react.suspense"),Du=Symbol.for("react.suspense_list"),Uu=Symbol.for("react.memo"),fi=Symbol.for("react.lazy"),Nu=Symbol.for("react.activity"),x_=Symbol.for("react.legacy_hidden"),y_=Symbol.for("react.memo_cache_sentinel"),Fu=Symbol.for("react.view_transition"),w_=Symbol.for("react.recoverable"),gh=Symbol.iterator,_h=Symbol.for("react.optimistic_key"),R_=Symbol.for("react.client.reference"),ms=Array.isArray,ct=M_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A_=i.rendererVersion,C_=i.rendererPackageName,Sh=i.extraDevToolsConfig,io=i.getPublicInstance,P_=i.getRootHostContext,I_=i.getChildHostContext,L_=i.prepareForCommit,D_=i.resetAfterCommit,U_=i.createInstance;i.cloneMutableInstance;var Ou=i.appendInitialChild,Eh=i.finalizeInitialChildren,vs=i.shouldSetTextContent,bh=i.createTextInstance;i.cloneMutableTextInstance;var N_=i.scheduleTimeout,F_=i.cancelTimeout,Li=i.noTimeout,Or=i.isPrimaryRenderer;i.warnsIfNotActing;var un=i.supportsMutation,Br=i.supportsPersistence,Dn=i.supportsHydration,O_=i.getInstanceFromNode;i.beforeActiveInstanceBlur;var B_=i.preparePortalMount;i.prepareScopeUpdate,i.getInstanceFromScope;var wn=i.setCurrentUpdatePriority,Qr=i.getCurrentUpdatePriority,k_=i.resolveUpdatePriority;i.trackSchedulerEvent,i.resolveEventType,i.resolveEventTimeStamp;var H_=i.shouldAttemptEagerTransition,z_=i.detachDeletedInstance;i.requestPostPaintCallback;var G_=i.maySuspendCommit,V_=i.maySuspendCommitOnUpdate,Bu=i.maySuspendCommitInSyncRender,Mh=i.preloadInstance,W_=i.startSuspendingCommit,Th=i.suspendInstance,X_=i.suspendOnActiveViewTransition,q_=i.waitForCommitToBeReady;i.getSuspendedCommitReason;var pa=i.NotPendingTransition,Jr=i.HostTransitionContext,Y_=i.resetFormInstance;i.bindToConsole;var j_=i.supportsMicrotasks,$_=i.scheduleMicrotask,ao=i.supportsTestSelectors,K_=i.findFiberRoot,Z_=i.getBoundingRect,Q_=i.getTextContent,oo=i.isHiddenSubtree,J_=i.matchAccessibilityRole,e0=i.setFocusIfFocusable,t0=i.setupIntersectionObserver,n0=i.appendChild,r0=i.appendChildToContainer,i0=i.commitTextUpdate,a0=i.commitMount,o0=i.commitUpdate,s0=i.insertBefore,l0=i.insertInContainerBefore,u0=i.removeChild,c0=i.removeChildFromContainer,xh=i.resetTextContent,f0=i.hideInstance,d0=i.hideTextInstance,p0=i.unhideInstance,h0=i.unhideTextInstance,yh=i.applyViewTransitionName,m0=i.restoreViewTransitionName,v0=i.cancelViewTransitionName,g0=i.cancelRootViewTransitionName,_0=i.restoreRootViewTransitionName;i.cloneRootViewTransitionContainer,i.removeRootViewTransitionClone;var ku=i.measureInstance;i.measureClonedInstance;var gs=i.wasInstanceInViewport,S0=i.hasInstanceChanged,E0=i.hasInstanceAffectedParent,b0=i.startViewTransition;i.startGestureTransition;var M0=i.stopViewTransition,T0=i.addViewTransitionFinishedListener;i.getCurrentGestureOffset;var wh=i.createViewTransitionInstance,x0=i.clearContainer,y0=i.createFragmentInstance,w0=i.updateFragmentInstanceFiber,Rh=i.commitNewChildToFragmentInstance,R0=i.deleteChildFromFragmentInstance,A0=i.cloneInstance,Ah=i.createContainerChildSet,Ch=i.appendChildToContainerChildSet,C0=i.finalizeContainerChildren,Ph=i.replaceContainerChildren,Ih=i.cloneHiddenInstance,Lh=i.cloneHiddenTextInstance,Hu=i.isSuspenseInstancePending,zu=i.isSuspenseInstanceFallback,P0=i.getSuspenseInstanceFallbackErrorDetails,I0=i.registerSuspenseInstanceRetry,L0=i.canHydrateFormStateMarker,D0=i.isFormStateMarkerMatching,Dh=i.getNextHydratableSibling,U0=i.getNextHydratableSiblingAfterSingleton,N0=i.getFirstHydratableChild,F0=i.getFirstHydratableChildWithinContainer,O0=i.getFirstHydratableChildWithinActivityInstance,B0=i.getFirstHydratableChildWithinSuspenseInstance,k0=i.getFirstHydratableChildWithinSingleton,H0=i.canHydrateInstance,z0=i.canHydrateTextInstance,G0=i.canHydrateActivityInstance,V0=i.canHydrateSuspenseInstance,W0=i.hydrateInstance,X0=i.hydrateTextInstance,q0=i.hydrateActivityInstance,Y0=i.hydrateSuspenseInstance,j0=i.getNextHydratableInstanceAfterActivityInstance,$0=i.getNextHydratableInstanceAfterSuspenseInstance,K0=i.commitHydratedInstance,Z0=i.commitHydratedContainer,Q0=i.commitHydratedActivityInstance,J0=i.commitHydratedSuspenseInstance,eS=i.finalizeHydratedChildren,tS=i.flushHydrationEvents;i.clearActivityBoundary;var nS=i.clearSuspenseBoundary;i.clearActivityBoundaryFromContainer;var rS=i.clearSuspenseBoundaryFromContainer,iS=i.hideDehydratedBoundary,aS=i.unhideDehydratedBoundary,Uh=i.shouldDeleteUnhydratedTailInstances;i.diffHydratedPropsForDevWarnings,i.diffHydratedTextForDevWarnings,i.describeHydratableInstanceForDevWarnings;var oS=i.validateHydratableInstance,sS=i.validateHydratableTextInstance,_r=i.supportsResources,Nh=i.isHostHoistableType,_s=i.getHoistableRoot,Fh=i.getResource,Oh=i.acquireResource,Bh=i.releaseResource,lS=i.hydrateHoistable,Gu=i.mountHoistable,Vu=i.unmountHoistable,kh=i.createHoistableInstance,uS=i.prepareToCommitHoistables,cS=i.mayResourceSuspendCommit,Hh=i.preloadResource,fS=i.suspendResource,cn=i.supportsSingletons,zh=i.resolveSingletonInstance,dS=i.acquireSingletonInstance,Gh=i.releaseSingletonInstance,Vh=i.isHostSingletonType,ha=i.isSingletonScope,Wu=[],ma=-1,va={},or=Math.clz32?Math.clz32:O,pS=Math.log,hS=Math.LN2,Ss=256,Es=262144,bs=4194304,Ms=ar.unstable_scheduleCallback,Xu=ar.unstable_cancelCallback,mS=ar.unstable_shouldYield,vS=ar.unstable_requestPaint,Zn=ar.unstable_now,Wh=ar.unstable_ImmediatePriority,gS=ar.unstable_UserBlockingPriority,qu=ar.unstable_NormalPriority,_S=ar.unstable_IdlePriority,SS=ar.log,ES=ar.unstable_setDisableYieldValue,so=null,sr=null,bS=0,lr=typeof Object.is=="function"?Object.is:oe,Xh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},MS=Object.prototype.hasOwnProperty,Yu,qh,ju=!1,Yh=new WeakMap,ga=[],_a=0,Ts=null,lo=0,Sr=[],Er=0,di=null,kr=1,Hr="",Un=R(null),uo=R(null),pi=R(null),xs=R(null),Rn=null,sn=null,xt=!1,hi=null,br=!1,$u=Error(u(519)),ys=R(null),Di=null,ei=null,TS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(r,o){e.push(o)}};this.abort=function(){t.aborted=!0,e.forEach(function(r){return r()})}},xS=ar.unstable_scheduleCallback,yS=ar.unstable_NormalPriority,fn={$$typeof:Zr,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0},co=null,Sa=null,Ea=null,Ku=!1,ws=!1,Zu=!1,Ui=0,fo=null,Qu=0,Ni=0,ba=null,jh=ct.S;ct.S=function(e,t){if(Jh=Zn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&_e(e,t),co!==null)for(var r=Sa;r!==null;)Qe(r,co),r=r.next;if(r=e.types,r!=null){for(var o=Sa;o!==null;)Qe(o,r),o=o.next;if(Ni!==0){o=co,o===null&&(o=co=[]);for(var l=0;l<r.length;l++){var c=r[l];o.indexOf(c)===-1&&o.push(c)}}}jh!==null&&jh(e,t)};var Fi=R(null),Ma=Error(u(460)),Ju=Error(u(474)),Rs=Error(u(542)),As={then:function(){}},Oi=null,Ta=null,po=0,Bi=Ci(!0),$h=Ci(!1),Mr=[],xa=0,ec=0,mi=!1,tc=!1,vi=R(null),Cs=R(0),Nn=R(null),qn=null,Fn=R(0),ti=0,bt=null,Kt=null,_n=null,Ps=!1,ya=!1,ki=!1,Is=0,ho=0,wa=null,wS=0,Ls={readContext:he,use:Yo,useCallback:ht,useContext:ht,useEffect:ht,useImperativeHandle:ht,useLayoutEffect:ht,useInsertionEffect:ht,useMemo:ht,useReducer:ht,useRef:ht,useState:ht,useDebugValue:ht,useDeferredValue:ht,useTransition:ht,useSyncExternalStore:ht,useId:ht,useHostTransitionStatus:ht,useFormState:ht,useActionState:ht,useOptimistic:ht,useMemoCache:ht,useCacheRefresh:ht,useEffectEvent:ht},Kh={readContext:he,use:Yo,useCallback:function(e,t){return Mn().memoizedState=[e,t===void 0?null:t],e},useContext:he,useEffect:Ud,useImperativeHandle:function(e,t,r){r=r!=null?r.concat([e]):null,$o(4194308,4,Bd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return $o(4194308,4,e,t)},useInsertionEffect:function(e,t){$o(4,2,e,t)},useMemo:function(e,t){var r=Mn();t=t===void 0?null:t;var o=e();if(ki){K(!0);try{e()}finally{K(!1)}}return r.memoizedState=[o,t],o},useReducer:function(e,t,r){var o=Mn();if(r!==void 0){var l=r(t);if(ki){K(!0);try{r(t)}finally{K(!1)}}}else l=t;return o.memoizedState=o.baseState=l,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:l},o.queue=e,e=e.dispatch=e_.bind(null,bt,e),[o.memoizedState,e]},useRef:function(e){var t=Mn();return e={current:e},t.memoizedState=e},useState:function(e){e=Ll(e);var t=e.queue,r=Yd.bind(null,bt,t);return t.dispatch=r,[e.memoizedState,r]},useDebugValue:Nl,useDeferredValue:function(e,t){var r=Mn();return Fl(r,e,t)},useTransition:function(){var e=Ll(!1);return e=Vd.bind(null,bt,e.queue,!0,!1),Mn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,r){var o=bt,l=Mn();if(xt){if(r===void 0)throw Error(u(407));r=r()}else{if(r=t(),en===null)throw Error(u(349));(Dt&127)!==0||_d(o,t,r)}l.memoizedState=r;var c={value:r,getSnapshot:t};return l.queue=c,Ud(Ed.bind(null,o,c,e),[e]),o.flags|=2048,ra(9,{destroy:void 0},Sd.bind(null,o,c,r,t),null),r},useId:function(){var e=Mn(),t=en.identifierPrefix;if(xt){var r=Hr,o=kr;r=(o&~(1<<32-or(o)-1)).toString(32)+r,t="_"+t+"R_"+r,r=Is++,0<r&&(t+="H"+r.toString(32)),t+="_"}else r=wS++,t="_"+t+"r_"+r.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Ol,useFormState:Cd,useActionState:Cd,useOptimistic:function(e){var t=Mn();t.memoizedState=t.baseState=e;var r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=r,t=Bl.bind(null,bt,!0,r),r.dispatch=t,[e,t]},useMemoCache:Cl,useCacheRefresh:function(){return Mn().memoizedState=Jg.bind(null,bt)},useEffectEvent:function(e){var t=Mn(),r={impl:e};return t.memoizedState=r,function(){if((It&2)!==0)throw Error(u(440));return r.impl.apply(void 0,arguments)}}},Zh={readContext:he,use:Yo,useCallback:Hd,useContext:he,useEffect:Ul,useImperativeHandle:kd,useInsertionEffect:Fd,useLayoutEffect:Od,useMemo:zd,useReducer:jo,useRef:Dd,useState:function(){return jo(jr)},useDebugValue:Nl,useDeferredValue:function(e,t){var r=Yt();return Gd(r,Kt.memoizedState,e,t)},useTransition:function(){var e=jo(jr)[0],t=Yt().memoizedState;return[typeof e=="boolean"?e:ja(e),t]},useSyncExternalStore:gd,useId:Xd,useHostTransitionStatus:Ol,useFormState:Pd,useActionState:Pd,useOptimistic:function(e,t){var r=Yt();return Td(r,Kt,e,t)},useMemoCache:Cl,useCacheRefresh:qd,useEffectEvent:Nd},RS={readContext:he,use:Yo,useCallback:Hd,useContext:he,useEffect:Ul,useImperativeHandle:kd,useInsertionEffect:Fd,useLayoutEffect:Od,useMemo:zd,useReducer:Il,useRef:Dd,useState:function(){return Il(jr)},useDebugValue:Nl,useDeferredValue:function(e,t){var r=Yt();return Kt===null?Fl(r,e,t):Gd(r,Kt.memoizedState,e,t)},useTransition:function(){var e=Il(jr)[0],t=Yt().memoizedState;return[typeof e=="boolean"?e:ja(e),t]},useSyncExternalStore:gd,useId:Xd,useHostTransitionStatus:Ol,useFormState:Ld,useActionState:Ld,useOptimistic:function(e,t){var r=Yt();return Kt!==null?Td(r,Kt,e,t):(r.baseState=e,[e,r.queue.dispatch])},useMemoCache:Cl,useCacheRefresh:qd,useEffectEvent:Nd},nc={enqueueSetState:function(e,t,r){e=e._reactInternals;var o=ir(),l=L(o);l.payload=t,r!=null&&(l.callback=r),t=H(e,l,o),t!==null&&(Kn(t,e,o),G(t,e,o))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var o=ir(),l=L(o);l.tag=1,l.payload=t,r!=null&&(l.callback=r),t=H(e,l,o),t!==null&&(Kn(t,e,o),G(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=ir(),o=L(r);o.tag=2,t!=null&&(o.callback=t),t=H(e,o,r),t!==null&&(Kn(t,e,r),G(t,e,r))}},rc=Error(u(461)),Sn=!1,ic={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null},Vn=!1,Ds=!1,ur=null,zr=null,Qn=0,An=!1,qt=!1,Gr=!1,ac=!1,Qh=typeof WeakSet=="function"?WeakSet:Set,Cn=null,Vr=!1,mo=!1,Us=!1,oc=!1,En=null,Jn=!1,Ar=null,Hi=8192,AS={getCacheForType:function(e){var t=he(fn),r=t.data.get(e);return r===void 0&&(r=e(),t.data.set(e,r)),r},cacheSignal:function(){return he(fn).controller.signal}},Ns=0,Fs=1,Os=2,Bs=3,ks=4;if(typeof Symbol=="function"&&Symbol.for){var vo=Symbol.for;Ns=vo("selector.component"),Fs=vo("selector.has_pseudo_class"),Os=vo("selector.role"),Bs=vo("selector.test_id"),ks=vo("selector.text")}var CS=typeof WeakMap=="function"?WeakMap:Map,It=0,en=null,Lt=null,Dt=0,jt=0,cr=null,gi=!1,Ra=!1,sc=!1,ni=0,hn=0,_i=0,zi=0,lc=0,fr=0,Aa=0,go=null,er=null,uc=!1,Hs=0,Jh=0,_o=1/0,zs=null,Si=null,dn=0,Cr=null,Gi=null,Wr=0,cc=0,fc=null,em=null,Ca=null,Pa=null,Ia=null,So=0,Gs=null;return Pt.attemptContinuousHydration=function(e){if(e.tag===13||e.tag===31){var t=ee(e,67108864);t!==null&&Kn(t,e,67108864),Au(e,67108864)}},Pt.attemptHydrationAtCurrentPriority=function(e){if(e.tag===13||e.tag===31){var t=ir();t=j(t);var r=ee(e,t);r!==null&&Kn(r,e,t),Au(e,t)}},Pt.attemptSynchronousHydration=function(e){switch(e.tag){case 3:if(e=e.stateNode,e.current.memoizedState.isDehydrated){var t=_(e.pendingLanes);if(t!==0){for(e.pendingLanes|=2,e.entangledLanes|=2;t;){var r=1<<31-or(t);e.entanglements[1]|=r,t&=~r}Je(e),(It&6)===0&&(_o=Zn()+500,He(0))}}break;case 31:case 13:t=ee(e,2),t!==null&&Kn(t,e,2),Kp(),Au(e,2)}},Pt.batchedUpdates=function(e,t){return e(t)},Pt.createComponentSelector=function(e){return{$$typeof:Ns,value:e}},Pt.createContainer=function(e,t,r,o,l,c,S,B,ie,ge){return ch(e,t,!1,null,r,o,c,null,S,B,ie,ge)},Pt.createHasPseudoClassSelector=function(e){return{$$typeof:Fs,value:e}},Pt.createHydrationContainer=function(e,t,r,o,l,c,S,B,ie,ge,xe,Fe,Ve,Rt){var Bt;return e=ch(r,o,!0,e,l,c,B,Rt,ie,ge,xe,Fe),e.context=fh(null),r=e.current,o=ir(),o=j(o),l=L(o),l.callback=(Bt=t)!=null?Bt:null,H(r,l,o),t=o,e.current.lanes=t,V(e,t),Je(e),e},Pt.createPortal=function(e,t,r){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fa,key:o==null?null:o===_h?_h:""+o,children:e,containerInfo:t,implementation:r}},Pt.createRoleSelector=function(e){return{$$typeof:Os,value:e}},Pt.createTestNameSelector=function(e){return{$$typeof:Bs,value:e}},Pt.createTextSelector=function(e){return{$$typeof:ks,value:e}},Pt.defaultOnCaughtError=function(e){console.error(e)},Pt.defaultOnRecoverableError=function(e){Xh(e)},Pt.defaultOnUncaughtError=function(e){Xh(e)},Pt.deferredUpdates=function(e){var t=ct.T,r=Qr();try{return wn(32),ct.T=null,e()}finally{wn(r),ct.T=t}},Pt.discreteUpdates=function(e,t,r,o,l){var c=ct.T,S=Qr();try{return wn(2),ct.T=null,e(t,r,o,l)}finally{wn(S),ct.T=c,It===0&&(_o=Zn()+500)}},Pt.findAllNodes=gu,Pt.findBoundingRects=function(e,t){if(!ao)throw Error(u(363));t=gu(e,t),e=[];for(var r=0;r<t.length;r++)e.push(Z_(t[r]));for(t=e.length-1;0<t;t--){r=e[t];for(var o=r.x,l=o+r.width,c=r.y,S=c+r.height,B=t-1;0<=B;B--)if(t!==B){var ie=e[B],ge=ie.x,xe=ge+ie.width,Fe=ie.y,Ve=Fe+ie.height;if(o>=ge&&c>=Fe&&l<=xe&&S<=Ve){e.splice(t,1);break}else if(o!==ge||r.width!==ie.width||Ve<c||Fe>S){if(!(c!==Fe||r.height!==ie.height||xe<o||ge>l)){ge>o&&(ie.width+=ge-o,ie.x=o),xe<l&&(ie.width=l-ge),e.splice(t,1);break}}else{Fe>c&&(ie.height+=Fe-c,ie.y=c),Ve<S&&(ie.height=S-Fe),e.splice(t,1);break}}}return e},Pt.findHostInstance=dh,Pt.findHostInstanceWithNoPortals=function(e){return e=p(e),e=e!==null?E(e):null,e===null?null:io(e.stateNode)},Pt.findHostInstanceWithWarning=function(e){return dh(e)},Pt.flushPassiveEffects=ro,Pt.flushSyncFromReconciler=function(e){var t=It;It|=1;var r=ct.T,o=Qr();try{if(wn(2),ct.T=null,e)return e()}finally{wn(o),ct.T=r,It=t,(It&6)===0&&He(0)}},Pt.flushSyncWork=Kp,Pt.focusWithin=function(e,t){if(!ao)throw Error(u(363));for(e=hu(e),t=qp(e,t),t=Array.from(t),e=0;e<t.length;){var r=t[e++],o=r.tag;if(!oo(r)){if((o===5||o===26||o===27)&&e0(r.stateNode))return!0;for(r=r.child;r!==null;)t.push(r),r=r.sibling}}return!1},Pt.getFindAllNodesFailureDescription=function(e,t){if(!ao)throw Error(u(363));var r=0,o=[];e=[hu(e),0];for(var l=0;l<e.length;){var c=e[l++],S=c.tag,B=e[l++],ie=t[B];if((S!==5&&S!==26&&S!==27||!oo(c))&&(mu(c,ie)&&(o.push(vu(ie)),B++,B>r&&(r=B)),B<t.length))for(c=c.child;c!==null;)e.push(c,B),c=c.sibling}if(r<t.length){for(e=[];r<t.length;r++)e.push(vu(t[r]));return`findAllNodes was able to match part of the selector:
  `+(o.join(" > ")+`

No matching component was found for:
  `)+e.join(" > ")}return null},Pt.getPublicRootInstance=function(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 27:case 5:return io(e.child.stateNode);default:return e.child.stateNode}},Pt.injectIntoDevTools=function(){var e={bundleType:0,version:A_,rendererPackageName:C_,currentDispatcherRef:ct,reconcilerVersion:"19.3.0"};if(Sh!==null&&(e.rendererConfig=Sh),typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u")e=!1;else{var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled||!t.supportsFiber)e=!0;else{try{so=t.inject(e),sr=t}catch{}e=!!t.checkDCE}}return e},Pt.isAlreadyRendering=function(){return(It&6)!==0},Pt.observeVisibleRects=function(e,t,r,o){if(!ao)throw Error(u(363));e=gu(e,t);var l=t0(e,r,o).disconnect;return{disconnect:function(){l()}}},Pt.shouldError=function(){return null},Pt.shouldSuspend=function(){return!1},Pt.startHostTransition=function(e,t,r,o){if(e.tag!==5)throw Error(u(476));var l=Wd(e).queue;Vd(e,l,t,pa,r===null?s:function(){var c=Wd(e);return c.next===null&&(c=e.alternate.memoizedState),$a(e,c.next.queue,{},ir()),r(o)})},Pt.updateContainer=function(e,t,r,o){var l=t.current,c=ir();return ph(l,c,e,t,r,o),c},Pt.updateContainerSync=function(e,t,r,o){return ph(t.current,2,e,t,r,o),2},Pt},n.exports.default=n.exports,Object.defineProperty(n.exports,"__esModule",{value:!0})})(km)),km.exports}var zm;function AC(){return zm||(zm=1,Bm.exports=RC()),Bm.exports}var CC=AC();const PC=wC(CC),gl={};let IC=0;const Rl=n=>`${n[0].toUpperCase()}${n.slice(1)}`;function LC(n){return n in gl}function sd(n){return gl[n]}function Ag(n){if(typeof n=="function"){const i=`${IC++}`;return gl[i]=n,i}else Object.assign(gl,n)}function DC(n){const i=PC(n);return i.injectIntoDevTools(),i}const Cg=0,UC=/^three(?=[A-Z])/;function Pg(n,i){const a=Rl(n),s=sd(a);if(n!=="primitive"&&!s)throw new Error(`R3F: ${a} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if(n==="primitive"&&!i.object)throw new Error("R3F: Primitives without 'object' are invalid!");if(i.args!==void 0&&!Array.isArray(i.args))throw new Error("R3F: The args prop must be an array!")}function NC(n,i,a){var s;return n=LC(Rl(n))?n:n.replace(UC,""),Pg(n,i),n==="primitive"&&(s=i.object)!=null&&s.__r3f&&delete i.object.__r3f,hl(i.object,a,n,i)}function FC(n){if(!n.isHidden){var i;n.props.attach&&(i=n.parent)!=null&&i.object?vl(n.parent,n):Yn(n.object)&&(n.previousVisible=n.object.visible,n.object.visible=!1),n.isHidden=!0,Vo(n)}}function Ig(n){if(n.isHidden){var i;if(n.props.attach&&(i=n.parent)!=null&&i.object)ml(n.parent,n);else if(Yn(n.object)){var a;n.object.visible=(a=n.previousVisible)!=null?a:!0}n.previousVisible=void 0,n.isHidden=!1,Vo(n)}}function ld(n,i,a){const s=i.root.getState();if(!(!n.parent&&n.object!==s.scene)){if(!i.object){var u,f;const h=sd(Rl(i.type));i.object=(u=i.props.object)!=null?u:new h(...(f=i.props.args)!=null?f:[]),i.object.__r3f=i}if(qr(i.object,i.props),i.props.attach)ml(n,i);else if(Yn(i.object)&&Yn(n.object)){const h=n.object.children.indexOf(a?.object);if(a&&h!==-1){const p=n.object.children.indexOf(i.object);if(p!==-1){n.object.children.splice(p,1);const m=p<h?h-1:h;n.object.children.splice(m,0,i.object)}else i.object.parent=n.object,n.object.children.splice(h,0,i.object),i.object.dispatchEvent({type:"added"}),n.object.dispatchEvent({type:"childadded",child:i.object})}else n.object.add(i.object)}for(const h of i.children)ld(i,h);Vo(i)}}function Mc(n,i){if(i){if(i.parent===n){const a=n.children.indexOf(i);a!==-1&&n.children.splice(a,1)}i.parent=n,n.children.push(i),ld(n,i)}}function Gm(n,i,a){if(!i||!a)return;if(i.parent===n){const u=n.children.indexOf(i);u!==-1&&n.children.splice(u,1)}i.parent=n;const s=n.children.indexOf(a);s!==-1?n.children.splice(s,0,i):n.children.push(i),ld(n,i,a)}function Lg(n){if(typeof n.dispose=="function"){const i=()=>{try{n.dispose()}catch{}};typeof IS_REACT_ACT_ENVIRONMENT<"u"?i():ri.unstable_scheduleCallback(ri.unstable_IdlePriority,i)}}function bf(n,i,a){if(!i)return;const s=!!i.parent;i.parent=null;const u=n.children.indexOf(i);u!==-1&&n.children.splice(u,1),i.props.attach?vl(n,i):Yn(i.object)&&Yn(n.object)&&(n.object.remove(i.object),uC(td(i),i.object));const f=i.props.dispose!==null&&a!==!1;for(let p=i.children.length-1;p>=0;p--){const m=i.children[p];bf(i,m,f)}if(i.children.length=0,delete i.object.__r3f,f&&i.type!=="primitive"&&i.object.type!=="Scene"&&Lg(i.object),a===void 0&&s){var h;const p=(h=i.root)==null||h.getState==null?void 0:h.getState();p&&p.internal.frames===0&&p.invalidate()}}function OC(n,i){for(const a of[n,n.alternate])if(a!==null)if(typeof a.ref=="function"){a.refCleanup==null||a.refCleanup();const s=a.ref(i);typeof s=="function"&&(a.refCleanup=s)}else a.ref&&(a.ref.current=i)}const ko=[];function BC(){if(ko.length!==0)try{kC()}finally{ko.length=0}}function kC(){for(const[a]of ko){const s=a.parent;if(s){a.props.attach?vl(s,a):Yn(a.object)&&Yn(s.object)&&s.object.remove(a.object);for(const u of a.children)u.props.attach?vl(a,u):Yn(u.object)&&Yn(a.object)&&a.object.remove(u.object)}a.isHidden&&Ig(a),a.object.__r3f&&delete a.object.__r3f,a.type!=="primitive"&&Lg(a.object)}for(const[a,s,u]of ko){a.props=s;const f=a.parent;if(f){var n,i;const h=sd(Rl(a.type)),p=a.object;a.object=(n=a.props.object)!=null?n:new h(...(i=a.props.args)!=null?i:[]),a.object.__r3f=a,OC(u,a.object),lC(td(a),p,a.object),qr(a.object,a.props),a.props.attach?ml(f,a):Yn(a.object)&&Yn(f.object)&&f.object.add(a.object);for(const m of a.children)m.props.attach?ml(a,m):Yn(m.object)&&Yn(a.object)&&a.object.add(m.object);Vo(a)}}}const Tc=()=>{},Vm={};let qs=Cg;function HC(n){switch(n){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return Om;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return Fm;case"message":switch(ri.unstable_getCurrentPriorityLevel()){case ri.unstable_ImmediatePriority:return Om;case ri.unstable_UserBlockingPriority:return Fm;case ri.unstable_NormalPriority:case ri.unstable_LowPriority:return rl;case ri.unstable_IdlePriority:return EC;default:return rl}default:return rl}}function zC(n){typeof queueMicrotask=="function"?queueMicrotask(n):typeof Promise<"u"?Promise.resolve().then(n).catch(i=>{setTimeout(()=>{throw i})}):setTimeout(n)}const Qi=DC({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:NC,removeChild:bf,appendChild:Mc,appendInitialChild:Mc,insertBefore:Gm,appendChildToContainer(n,i){const a=n.getState().scene.__r3f;!i||!a||Mc(a,i)},removeChildFromContainer(n,i){const a=n.getState().scene.__r3f;!i||!a||bf(a,i)},insertInContainerBefore(n,i,a){const s=n.getState().scene.__r3f;!i||!a||!s||Gm(s,i,a)},getRootHostContext:()=>Vm,getChildHostContext:()=>Vm,commitUpdate(n,i,a,s,u){var f,h,p;Pg(i,s);let m=!1;if((n.type==="primitive"&&a.object!==s.object||((f=s.args)==null?void 0:f.length)!==((h=a.args)==null?void 0:h.length)||(p=s.args)!=null&&p.some((E,y)=>{var x;return E!==((x=a.args)==null?void 0:x[y])}))&&(m=!0),m)ko.push([n,Sf(s),u]);else{const E=aC(n,s),y=n.props.attach;n.props=Sf(s),y!==void 0?n.props.attach=y:delete n.props.attach,Object.keys(E).length&&qr(n.object,E)}},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:n=>n?.object,prepareForCommit:()=>null,preparePortalMount:n=>hl(n.getState().scene,n,"",{}),resetAfterCommit:BC,shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:FC,unhideInstance:Ig,createTextInstance:Tc,hideTextInstance:Tc,unhideTextInstance:Tc,supportsMicrotasks:!0,scheduleMicrotask:zC,scheduleTimeout:typeof setTimeout=="function"?setTimeout:void 0,cancelTimeout:typeof clearTimeout=="function"?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:Se.createContext(null),setCurrentUpdatePriority(n){qs=n},getCurrentUpdatePriority(){return qs},resolveUpdatePriority(){var n;if(qs!==Cg)return qs;const i=typeof window<"u"?(n=window.event)==null?void 0:n.type:void 0;return i===void 0?rl:HC(i)},resetFormInstance(){},rendererPackageName:"@react-three/fiber",rendererVersion:yC.version,applyViewTransitionName(n,i,a){},restoreViewTransitionName(n,i){},cancelViewTransitionName(n,i,a){},cancelRootViewTransitionName(n){},restoreRootViewTransitionName(n){},InstanceMeasurement:null,measureInstance:n=>null,wasInstanceInViewport:n=>!0,hasInstanceChanged:(n,i)=>!1,hasInstanceAffectedParent:(n,i)=>!1,suspendOnActiveViewTransition(n,i){},startViewTransition(n,i,a,s,u,f,h,p,m,E,y){return s(),u(),y?.(),h(),null},startGestureTransition(n,i,a,s,u,f,h,p,m,E){return h(),p(),E?.(),null},stopViewTransition(n){},addViewTransitionFinishedListener(n,i){i()},createViewTransitionInstance:n=>null,getCurrentGestureOffset(n){throw new Error("startGestureTransition is not yet supported in react-three-fiber.")},cloneMutableInstance(n,i){return n},cloneMutableTextInstance(n){return n},cloneRootViewTransitionContainer(n){throw new Error("Not implemented.")},removeRootViewTransitionClone(n,i){throw new Error("Not implemented.")},createFragmentInstance:n=>null,updateFragmentInstanceFiber(n,i){},commitNewChildToFragmentInstance(n,i){},deleteChildFromFragmentInstance(n,i){},measureClonedInstance:n=>null,maySuspendCommitOnUpdate:(n,i,a)=>!1,maySuspendCommitInSyncRender:(n,i)=>!1,startSuspendingCommit:()=>null,getSuspendedCommitReason:(n,i)=>null}),xi=new Map;function _l(n,i){const a=n.state;switch(i.type){case"use":return a.status==="disposed"?!1:(n.state={status:"open"},!0);case"unmount":return a.status==="disposed"?!1:(n.state={status:"closing",token:i.token},!0);case"dispose":return a.status!=="closing"||a.token!==i.token?!1:(n.state={status:"disposed"},!0)}}function GC(n){const i=xi.get(n),a=i?.fiber,s=i?.store;i&&console.warn("R3F.createRoot should only be called once!");const u=typeof reportError=="function"?reportError:console.error,f=s||gC(ud,Ug),h=a||Qi.createContainer(f,SC,null,!1,null,"",u,u,u,null),p=i||{fiber:h,store:f,state:{status:"open"},ready:fC(void 0),configuration:{},ownsRenderer:!1};i||xi.set(n,p);let m=!1;return{get ready(){return p.ready},configure(E={}){if(!_l(p,{type:"use"}))return dC(new Error("R3F: Cannot configure a root after disposal has started."));const y=p.ready,{promise:x,resolve:R,reject:w}=pC();p.ready=x;const F=_=>{const d=f.getState();d.gl||(p.ownsRenderer=!id(E.gl),d.set({gl:_})),TC(p,n,E),!p.unwatchDpr&&(E.dpr===void 0||Array.isArray(E.dpr))&&(p.unwatchDpr=xC(p)),R(this)},O=()=>{try{var _;const d=(_=f.getState().gl)!=null?_:hC(n,E.gl);rd(d)?Promise.resolve(d).then(F).catch(w):F(d)}catch(d){w(d)}};return y.status==="pending"?y.then(O,w):O(),x},render(E){if(!_l(p,{type:"use"}))return f;if(!f.getState().gl&&p.ready.status==="fulfilled"&&this.configure(),p.ready.status==="rejected")throw p.ready.reason;const y=()=>{var x;if(p.state.status!=="open"||p.ready.status==="rejected")return;if(p.ready.status==="pending"){p.ready.then(y,u);return}const R=(x=p.configuration.previous)==null?void 0:x.onCreated,w=ze.jsx(VC,{store:f,children:E,onCreated:R,rootElement:n});if(m){Qi.updateContainer(w,h,null,Lm);return}m=!0,Qi.updateContainerSync(w,h,null,Lm),Qi.flushSyncWork()};return y(),f},unmount(){xi.get(n)===p&&WC(n)}}}function VC({store:n,children:i,onCreated:a,rootElement:s}){return na(()=>{const u=n.getState();u.set(f=>({internal:{...f.internal,active:!0}})),a&&a(u),n.getState().events.connected||u.events.connect==null||u.events.connect(s)},[]),ze.jsx(ad.Provider,{value:n,children:i})}function Eo(n){try{return n()}catch(i){console.warn("[R3F] Error while unmounting root; teardown may be incomplete:",i)}}function WC(n,i){const a=xi.get(n),s=Symbol("unmount");if(!a||!_l(a,{type:"unmount",token:s}))return;const u=()=>{var f;if(a.ready.status==="pending"){a.ready.then(u,u);return}if(!_l(a,{type:"dispose",token:s}))return;xi.delete(n);const h=a.store.getState();h.internal.active=!1,Eo(()=>a.unwatchDpr==null?void 0:a.unwatchDpr()),Eo(()=>h.events.disconnect==null?void 0:h.events.disconnect()),(f=h.gl)!=null&&f.xr&&Eo(()=>h.xr.disconnect()),h.scene&&Eo(()=>rC(h.scene));const p=Eo(()=>vC(h.gl,a.ownsRenderer));rd(p)&&p.then(()=>{})};Qi.updateContainer(null,a.fiber,null,()=>{a.state.status!=="closing"||a.state.token!==s||Qi.updateContainer(null,a.fiber,null,u)})}const XC=new Set,qC=new Set,YC=new Set;function xc(n,i){if(n.size)for(const{callback:a}of n.values())a(i)}function Io(n,i){switch(n){case"before":return xc(XC,i);case"after":return xc(qC,i);case"tail":return xc(YC,i)}}let yc,wc;function Mf(n,i,a){let s=i.clock.getDelta();i.frameloop==="never"&&typeof n=="number"&&(s=n-i.clock.elapsedTime,i.clock.oldTime=i.clock.elapsedTime,i.clock.elapsedTime=n),yc=i.internal.subscribers;for(let u=0;u<yc.length;u++)wc=yc[u],wc.ref.current(wc.store.getState(),s,a);return!i.internal.priority&&i.gl.render&&i.gl.render(i.scene,i.camera),i.internal.frames=Math.max(0,i.internal.frames-1),i.frameloop==="always"?1:i.internal.frames}let Sl=!1,Tf=!1,Rc,Wm,Ua;function Dg(n){Wm=requestAnimationFrame(Dg),Sl=!0,Rc=0,Io("before",n),Tf=!0;for(const a of xi.values()){var i;Ua=a.store.getState(),Ua.internal.active&&(Ua.frameloop==="always"||Ua.internal.frames>0)&&!((i=Ua.gl.xr)!=null&&i.isPresenting)&&(Rc+=Mf(n,Ua))}if(Tf=!1,Io("after",n),Rc===0)return Io("tail",n),Sl=!1,cancelAnimationFrame(Wm)}function ud(n,i=1){var a;if(!n)return xi.forEach(s=>ud(s.store.getState(),i));(a=n.gl.xr)!=null&&a.isPresenting||!n.internal.active||n.frameloop==="never"||(i>1?n.internal.frames=Math.min(60,n.internal.frames+i):Tf?n.internal.frames=2:n.internal.frames=1,Sl||(Sl=!0,requestAnimationFrame(Dg)))}function Ug(n,i=!0,a,s){if(i&&Io("before",n),a)Mf(n,a,s);else for(const u of xi.values())Mf(n,u.store.getState());i&&Io("after",n)}function jC(n,i,a){return ze.jsx($C,{children:n,container:i,state:a})}function Xm(n,i){const{parentStore:a,container:s}=n,u=_g((h,p)=>({...i,set:h,get:p,setEvents:m=>h(E=>({...E,events:{...E.events,...m}}))})),f={current:a.getState()};return u.setState(h=>Ng(f.current,h,n)),{parentStore:a,container:s,portalStore:u,parentStateRef:f}}function $C({state:n={},children:i,container:a}){const s=od(),{events:u,size:f,...h}=n,[p]=Se.useState(()=>new $f),[m]=Se.useState(()=>new Hn),E={parentStore:s,container:a,raycaster:p,pointer:m,events:u,size:f},y=ed((O,_)=>Ng(O,_,E)),[x,R]=Se.useState(()=>Xm(E,h));(x.parentStore!==s||x.container!==a)&&R(Xm(E,h));const{portalStore:w,parentStateRef:F}=x;return na(()=>{const O=C=>{F.current=C,w.setState(N=>y.current(C,N))},_=s.subscribe(O),d=s.getState();return d!==F.current&&O(d),_},[s,w,F]),ze.jsx(ze.Fragment,{children:Qi.createPortal(ze.jsx(ad.Provider,{value:w,children:i}),w,null)})}function Ng(n,i,a){const{parentStore:s,container:u,raycaster:f,pointer:h,events:p,size:m}=a;let E;if(i.camera&&m){const y=i.camera;E=n.viewport.getCurrentViewport(y,new yt,m),y!==n.camera&&yg(y,m)}return{...n,...i,scene:u,raycaster:f,pointer:h,mouse:h,previousRoot:s,events:{...n.events,...i.events,...p},size:{...n.size,...m},viewport:{...n.viewport,...E}}}const Ac={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function KC(n){const{handlePointer:i}=cC(n);return{priority:1,enabled:!0,compute(a,s,u){s.pointer.set(a.offsetX/s.size.width*2-1,-(a.offsetY/s.size.height)*2+1),s.raycaster.setFromCamera(s.pointer,s.camera)},connected:void 0,handlers:Object.keys(Ac).reduce((a,s)=>({...a,[s]:i(s)}),{}),update:()=>{var a;const{events:s,internal:u}=n.getState();(a=u.lastEvent)!=null&&a.current&&s.handlers&&s.handlers.onPointerMove(u.lastEvent.current)},connect:a=>{const{set:s,events:u}=n.getState();if(u.disconnect==null||u.disconnect(),s(f=>({events:{...f.events,connected:a}})),u.handlers)for(const f in u.handlers){const h=u.handlers[f],[p,m]=Ac[f];a.addEventListener(p,h,{passive:m})}},disconnect:()=>{const{set:a,events:s}=n.getState();if(s.connected){if(s.handlers)for(const u in s.handlers){const f=s.handlers[u],[h]=Ac[u];s.connected.removeEventListener(h,f)}a(u=>({events:{...u.events,connected:void 0}}))}}}}function qm(n,i){let a;return(...s)=>{window.clearTimeout(a),a=window.setTimeout(()=>n(...s),i)}}function ZC({debounce:n,scroll:i,polyfill:a,offsetSize:s}={debounce:0,scroll:!1,offsetSize:!1}){const u=a||(typeof window>"u"?class{}:window.ResizeObserver);if(!u)throw new Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");const[f,h]=Se.useState({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),p=Se.useRef({element:null,scrollContainers:null,resizeObserver:null,lastBounds:f,orientationHandler:null}),m=n?typeof n=="number"?n:n.scroll:null,E=n?typeof n=="number"?n:n.resize:null,y=Se.useRef(!1);Se.useEffect(()=>(y.current=!0,()=>{y.current=!1}));const[x,R,w]=Se.useMemo(()=>{const d=()=>{if(!p.current.element)return;const{left:C,top:N,width:P,height:q,bottom:D,right:V,x:W,y:M}=p.current.element.getBoundingClientRect(),T={left:C,top:N,width:P,height:q,bottom:D,right:V,x:W,y:M};p.current.element instanceof HTMLElement&&s&&(T.height=p.current.element.offsetHeight,T.width=p.current.element.offsetWidth),Object.freeze(T),y.current&&!t1(p.current.lastBounds,T)&&h(p.current.lastBounds=T)};return[d,E?qm(d,E):d,m?qm(d,m):d]},[h,s,m,E]);function F(){p.current.scrollContainers&&(p.current.scrollContainers.forEach(d=>d.removeEventListener("scroll",w,!0)),p.current.scrollContainers=null),p.current.resizeObserver&&(p.current.resizeObserver.disconnect(),p.current.resizeObserver=null),p.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",p.current.orientationHandler))}function O(){p.current.element&&(p.current.resizeObserver=new u(w),p.current.resizeObserver.observe(p.current.element),i&&p.current.scrollContainers&&p.current.scrollContainers.forEach(d=>d.addEventListener("scroll",w,{capture:!0,passive:!0})),p.current.orientationHandler=()=>{w()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",p.current.orientationHandler))}const _=d=>{!d||d===p.current.element||(F(),p.current.element=d,p.current.scrollContainers=Fg(d),O())};return JC(w,!!i),QC(R),Se.useEffect(()=>{F(),O()},[i,w,R]),Se.useEffect(()=>F,[]),[_,f,x]}function QC(n){Se.useEffect(()=>{const i=n;return window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i)}},[n])}function JC(n,i){Se.useEffect(()=>{if(i){const a=n;return window.addEventListener("scroll",a,{capture:!0,passive:!0}),()=>{window.removeEventListener("scroll",a,!0)}}},[n,i])}function Fg(n){const i=[];if(!n||n===document.body)return i;const{overflow:a,overflowX:s,overflowY:u}=window.getComputedStyle(n);return[a,s,u].some(f=>f==="auto"||f==="scroll")&&i.push(n),[...i,...Fg(n.parentElement)]}const e1=["x","y","top","bottom","left","right","width","height"],t1=(n,i)=>e1.every(a=>n[a]===i[a]);function n1({ref:n,children:i,fallback:a,resize:s,style:u,gl:f,events:h=KC,eventSource:p,eventPrefix:m,shadows:E,linear:y,flat:x,legacy:R,orthographic:w,frameloop:F,dpr:O,performance:_,raycaster:d,camera:C,scene:N,onPointerMissed:P,onCreated:q,...D}){Se.useMemo(()=>Ag(yA),[]);const V=KA(),[W,M]=ZC({scroll:!0,debounce:{scroll:50,resize:0},...s}),T=Se.useRef(null),z=Se.useRef(null);Se.useImperativeHandle(n,()=>T.current);const j=ed(P),Q=Se.useCallback(rt=>j.current==null?void 0:j.current(rt),[j]),[K,se]=Se.useState(!1),[ne,be]=Se.useState(!1);if(K)throw K;if(ne)throw ne;const oe=Se.useRef(null),[Ue,Le]=jA(),et=Se.useRef(null),tt=()=>p?JA(p)?p.current:p:z.current;Se.useInsertionEffect(()=>()=>{const rt=oe.current;oe.current=null,rt?.unmount()},[]),na(()=>{const rt=T.current;M.width>0&&M.height>0&&rt&&(oe.current||(oe.current=GC(rt)),oe.current.configure({gl:f,scene:N,events:h,shadows:E,linear:y,flat:x,legacy:R,orthographic:w,frameloop:F,dpr:O,performance:_,raycaster:d,camera:C,size:M,onPointerMissed:Q,onCreated:dt=>{var re;et.current=dt,dt.events.connect==null||dt.events.connect((re=tt())!=null?re:z.current),m&&dt.setEvents({compute:(ve,Ne)=>{const st=ve[m+"X"],Ye=ve[m+"Y"];Ne.pointer.set(st/Ne.size.width*2-1,-(Ye/Ne.size.height)*2+1),Ne.raycaster.setFromCamera(Ne.pointer,Ne.camera)}}),q?.(dt)}}).catch(be),oe.current.ready.status==="fulfilled"?oe.current.render(ze.jsx(V,{children:ze.jsx(QA,{set:be,children:ze.jsx(Se.Suspense,{fallback:ze.jsx(ZA,{set:se}),children:i??null})})})):oe.current.ready.status==="pending"&&Le(oe.current.ready))}),Se.useEffect(()=>{var rt;const dt=(rt=et.current)==null?void 0:rt.get(),re=tt();dt&&re&&dt.events.connected!==re&&(dt.events.connect==null||dt.events.connect(re))}),Se.useEffect(()=>{const rt=T.current;return()=>{var dt;rt.isConnected||(dt=oe.current)==null||dt.unmount()}},[]);const ot=p?"none":"auto";return ze.jsxs("div",{ref:z,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:ot,...u},...D,children:[ze.jsx("div",{ref:W,style:{width:"100%",height:"100%"},children:ze.jsx("canvas",{ref:T,style:{display:"block"},children:a})}),Ue]})}function r1(n){return ze.jsx(Mg,{children:ze.jsx(n1,{...n})})}const Og=parseInt(Rf.replace(/\D+/g,""));var Tr=Uint8Array,Ti=Uint16Array,xf=Uint32Array,Bg=new Tr([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),kg=new Tr([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),i1=new Tr([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Hg=function(n,i){for(var a=new Ti(31),s=0;s<31;++s)a[s]=i+=1<<n[s-1];for(var u=new xf(a[30]),s=1;s<30;++s)for(var f=a[s];f<a[s+1];++f)u[f]=f-a[s]<<5|s;return[a,u]},zg=Hg(Bg,2),Gg=zg[0],a1=zg[1];Gg[28]=258,a1[258]=28;var o1=Hg(kg,0),s1=o1[0],yf=new Ti(32768);for(var an=0;an<32768;++an){var Mi=(an&43690)>>>1|(an&21845)<<1;Mi=(Mi&52428)>>>2|(Mi&13107)<<2,Mi=(Mi&61680)>>>4|(Mi&3855)<<4,yf[an]=((Mi&65280)>>>8|(Mi&255)<<8)>>>1}var Lo=(function(n,i,a){for(var s=n.length,u=0,f=new Ti(i);u<s;++u)++f[n[u]-1];var h=new Ti(i);for(u=0;u<i;++u)h[u]=h[u-1]+f[u-1]<<1;var p;if(a){p=new Ti(1<<i);var m=15-i;for(u=0;u<s;++u)if(n[u])for(var E=u<<4|n[u],y=i-n[u],x=h[n[u]-1]++<<y,R=x|(1<<y)-1;x<=R;++x)p[yf[x]>>>m]=E}else for(p=new Ti(s),u=0;u<s;++u)n[u]&&(p[u]=yf[h[n[u]-1]++]>>>15-n[u]);return p}),Xo=new Tr(288);for(var an=0;an<144;++an)Xo[an]=8;for(var an=144;an<256;++an)Xo[an]=9;for(var an=256;an<280;++an)Xo[an]=7;for(var an=280;an<288;++an)Xo[an]=8;var Vg=new Tr(32);for(var an=0;an<32;++an)Vg[an]=5;var l1=Lo(Xo,9,1),u1=Lo(Vg,5,1),Cc=function(n){for(var i=n[0],a=1;a<n.length;++a)n[a]>i&&(i=n[a]);return i},Pr=function(n,i,a){var s=i/8|0;return(n[s]|n[s+1]<<8)>>(i&7)&a},Pc=function(n,i){var a=i/8|0;return(n[a]|n[a+1]<<8|n[a+2]<<16)>>(i&7)},c1=function(n){return(n/8|0)+(n&7&&1)},f1=function(n,i,a){(a==null||a>n.length)&&(a=n.length);var s=new(n instanceof Ti?Ti:n instanceof xf?xf:Tr)(a-i);return s.set(n.subarray(i,a)),s},d1=function(n,i,a){var s=n.length;if(!s||a&&!a.l&&s<5)return i||new Tr(0);var u=!i||a,f=!a||a.i;a||(a={}),i||(i=new Tr(s*3));var h=function(re){var ve=i.length;if(re>ve){var Ne=new Tr(Math.max(ve*2,re));Ne.set(i),i=Ne}},p=a.f||0,m=a.p||0,E=a.b||0,y=a.l,x=a.d,R=a.m,w=a.n,F=s*8;do{if(!y){a.f=p=Pr(n,m,1);var O=Pr(n,m+1,3);if(m+=3,O)if(O==1)y=l1,x=u1,R=9,w=5;else if(O==2){var N=Pr(n,m,31)+257,P=Pr(n,m+10,15)+4,q=N+Pr(n,m+5,31)+1;m+=14;for(var D=new Tr(q),V=new Tr(19),W=0;W<P;++W)V[i1[W]]=Pr(n,m+W*3,7);m+=P*3;for(var M=Cc(V),T=(1<<M)-1,z=Lo(V,M,1),W=0;W<q;){var j=z[Pr(n,m,T)];m+=j&15;var _=j>>>4;if(_<16)D[W++]=_;else{var Q=0,K=0;for(_==16?(K=3+Pr(n,m,3),m+=2,Q=D[W-1]):_==17?(K=3+Pr(n,m,7),m+=3):_==18&&(K=11+Pr(n,m,127),m+=7);K--;)D[W++]=Q}}var se=D.subarray(0,N),ne=D.subarray(N);R=Cc(se),w=Cc(ne),y=Lo(se,R,1),x=Lo(ne,w,1)}else throw"invalid block type";else{var _=c1(m)+4,d=n[_-4]|n[_-3]<<8,C=_+d;if(C>s){if(f)throw"unexpected EOF";break}u&&h(E+d),i.set(n.subarray(_,C),E),a.b=E+=d,a.p=m=C*8;continue}if(m>F){if(f)throw"unexpected EOF";break}}u&&h(E+131072);for(var be=(1<<R)-1,oe=(1<<w)-1,Ue=m;;Ue=m){var Q=y[Pc(n,m)&be],Le=Q>>>4;if(m+=Q&15,m>F){if(f)throw"unexpected EOF";break}if(!Q)throw"invalid length/literal";if(Le<256)i[E++]=Le;else if(Le==256){Ue=m,y=null;break}else{var et=Le-254;if(Le>264){var W=Le-257,tt=Bg[W];et=Pr(n,m,(1<<tt)-1)+Gg[W],m+=tt}var ot=x[Pc(n,m)&oe],rt=ot>>>4;if(!ot)throw"invalid distance";m+=ot&15;var ne=s1[rt];if(rt>3){var tt=kg[rt];ne+=Pc(n,m)&(1<<tt)-1,m+=tt}if(m>F){if(f)throw"unexpected EOF";break}u&&h(E+131072);for(var dt=E+et;E<dt;E+=4)i[E]=i[E-ne],i[E+1]=i[E+1-ne],i[E+2]=i[E+2-ne],i[E+3]=i[E+3-ne];E=dt}}a.l=y,a.p=Ue,a.b=E,y&&(p=1,a.m=R,a.d=x,a.n=w)}while(!p);return E==i.length?i:f1(i,0,E)},p1=new Tr(0),h1=function(n){if((n[0]&15)!=8||n[0]>>>4>7||(n[0]<<8|n[1])%31)throw"invalid zlib data";if(n[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Ys(n,i){return d1((h1(n),n.subarray(2,-4)),i)}var m1=typeof TextDecoder<"u"&&new TextDecoder,v1=0;try{m1.decode(p1,{stream:!0}),v1=1}catch{}const g1=n=>n&&n.isCubeTexture;class _1 extends pr{constructor(i,a){var s,u;const f=g1(i),p=((u=f?(s=i.image[0])==null?void 0:s.width:i.image.width)!=null?u:1024)/4,m=Math.floor(Math.log2(p)),E=Math.pow(2,m),y=3*Math.max(E,112),x=4*E,R=[f?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/y}`,`#define CUBEUV_TEXEL_HEIGHT ${1/x}`,`#define CUBEUV_MAX_MIP ${m}.0`],w=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,F=R.join(`
`)+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${Og>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `,O={map:{value:i},height:{value:a?.height||15},radius:{value:a?.radius||100}},_=new sg(1,16),d=new nr({uniforms:O,fragmentShader:F,vertexShader:w,side:dr});super(_,d)}set radius(i){this.material.uniforms.radius.value=i}get radius(){return this.material.uniforms.radius.value}set height(i){this.material.uniforms.height.value=i}get height(){return this.material.uniforms.height.value}}const S1={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},E1={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `};class b1 extends jf{constructor(i){super(i),this.type=On}parse(i){const h=function(W,M){switch(W){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(M||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(M||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(M||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(M||""))}},x=function(W,M,T){M=M||1024;let j=W.pos,Q=-1,K=0,se="",ne=String.fromCharCode.apply(null,new Uint16Array(W.subarray(j,j+128)));for(;0>(Q=ne.indexOf(`
`))&&K<M&&j<W.byteLength;)se+=ne,K+=ne.length,j+=128,ne+=String.fromCharCode.apply(null,new Uint16Array(W.subarray(j,j+128)));return-1<Q?(W.pos+=K+Q+1,se+ne.slice(0,Q)):!1},R=function(W){const M=/^#\?(\S+)/,T=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,z=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,j=/^\s*FORMAT=(\S+)\s*$/,Q=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,K={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let se,ne;for((W.pos>=W.byteLength||!(se=x(W)))&&h(1,"no header found"),(ne=se.match(M))||h(3,"bad initial token"),K.valid|=1,K.programtype=ne[1],K.string+=se+`
`;se=x(W),se!==!1;){if(K.string+=se+`
`,se.charAt(0)==="#"){K.comments+=se+`
`;continue}if((ne=se.match(T))&&(K.gamma=parseFloat(ne[1])),(ne=se.match(z))&&(K.exposure=parseFloat(ne[1])),(ne=se.match(j))&&(K.valid|=2,K.format=ne[1]),(ne=se.match(Q))&&(K.valid|=4,K.height=parseInt(ne[1],10),K.width=parseInt(ne[2],10)),K.valid&2&&K.valid&4)break}return K.valid&2||h(3,"missing format specifier"),K.valid&4||h(3,"missing image size specifier"),K},w=function(W,M,T){const z=M;if(z<8||z>32767||W[0]!==2||W[1]!==2||W[2]&128)return new Uint8Array(W);z!==(W[2]<<8|W[3])&&h(3,"wrong scanline width");const j=new Uint8Array(4*M*T);j.length||h(4,"unable to allocate buffer space");let Q=0,K=0;const se=4*z,ne=new Uint8Array(4),be=new Uint8Array(se);let oe=T;for(;oe>0&&K<W.byteLength;){K+4>W.byteLength&&h(1),ne[0]=W[K++],ne[1]=W[K++],ne[2]=W[K++],ne[3]=W[K++],(ne[0]!=2||ne[1]!=2||(ne[2]<<8|ne[3])!=z)&&h(3,"bad rgbe scanline format");let Ue=0,Le;for(;Ue<se&&K<W.byteLength;){Le=W[K++];const tt=Le>128;if(tt&&(Le-=128),(Le===0||Ue+Le>se)&&h(3,"bad scanline data"),tt){const ot=W[K++];for(let rt=0;rt<Le;rt++)be[Ue++]=ot}else be.set(W.subarray(K,K+Le),Ue),Ue+=Le,K+=Le}const et=z;for(let tt=0;tt<et;tt++){let ot=0;j[Q]=be[tt+ot],ot+=z,j[Q+1]=be[tt+ot],ot+=z,j[Q+2]=be[tt+ot],ot+=z,j[Q+3]=be[tt+ot],Q+=4}oe--}return j},F=function(W,M,T,z){const j=W[M+3],Q=Math.pow(2,j-128)/255;T[z+0]=W[M+0]*Q,T[z+1]=W[M+1]*Q,T[z+2]=W[M+2]*Q,T[z+3]=1},O=function(W,M,T,z){const j=W[M+3],Q=Math.pow(2,j-128)/255;T[z+0]=Ki.toHalfFloat(Math.min(W[M+0]*Q,65504)),T[z+1]=Ki.toHalfFloat(Math.min(W[M+1]*Q,65504)),T[z+2]=Ki.toHalfFloat(Math.min(W[M+2]*Q,65504)),T[z+3]=Ki.toHalfFloat(1)},_=new Uint8Array(i);_.pos=0;const d=R(_),C=d.width,N=d.height,P=w(_.subarray(_.pos),C,N);let q,D,V;switch(this.type){case kn:V=P.length/4;const W=new Float32Array(V*4);for(let T=0;T<V;T++)F(P,T*4,W,T*4);q=W,D=kn;break;case On:V=P.length/4;const M=new Uint16Array(V*4);for(let T=0;T<V;T++)O(P,T*4,M,T*4);q=M,D=On;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:C,height:N,data:q,header:d.string,gamma:d.gamma,exposure:d.exposure,type:D}}setDataType(i){return this.type=i,this}load(i,a,s,u){function f(h,p){switch(h.type){case kn:case On:"colorSpace"in h?h.colorSpace="srgb-linear":h.encoding=3e3,h.minFilter=Bn,h.magFilter=Bn,h.generateMipmaps=!1,h.flipY=!0;break}a&&a(h,p)}return super.load(i,f,s,u)}}const bo=Og>=152;class M1 extends jf{constructor(i){super(i),this.type=On}parse(i){const M=Math.pow(2.7182818,2.2);function T(g,A){for(var X=0,ee=0;ee<65536;++ee)(ee==0||g[ee>>3]&1<<(ee&7))&&(A[X++]=ee);for(var ce=X-1;X<65536;)A[X++]=0;return ce}function z(g){for(var A=0;A<16384;A++)g[A]={},g[A].len=0,g[A].lit=0,g[A].p=null}const j={l:0,c:0,lc:0};function Q(g,A,X,ee,ce){for(;X<g;)A=A<<8|Je(ee,ce),X+=8;X-=g,j.l=A>>X&(1<<g)-1,j.c=A,j.lc=X}const K=new Array(59);function se(g){for(var A=0;A<=58;++A)K[A]=0;for(var A=0;A<65537;++A)K[g[A]]+=1;for(var X=0,A=58;A>0;--A){var ee=X+K[A]>>1;K[A]=X,X=ee}for(var A=0;A<65537;++A){var ce=g[A];ce>0&&(g[A]=ce|K[ce]++<<6)}}function ne(g,A,X,ee,ce,le,ye){for(var v=X,L=0,H=0;ce<=le;ce++){if(v.value-X.value>ee)return!1;Q(6,L,H,g,v);var G=j.l;if(L=j.c,H=j.lc,ye[ce]=G,G==63){if(v.value-X.value>ee)throw"Something wrong with hufUnpackEncTable";Q(8,L,H,g,v);var U=j.l+6;if(L=j.c,H=j.lc,ce+U>le+1)throw"Something wrong with hufUnpackEncTable";for(;U--;)ye[ce++]=0;ce--}else if(G>=59){var U=G-59+2;if(ce+U>le+1)throw"Something wrong with hufUnpackEncTable";for(;U--;)ye[ce++]=0;ce--}}se(ye)}function be(g){return g&63}function oe(g){return g>>6}function Ue(g,A,X,ee){for(;A<=X;A++){var ce=oe(g[A]),le=be(g[A]);if(ce>>le)throw"Invalid table entry";if(le>14){var ye=ee[ce>>le-14];if(ye.len)throw"Invalid table entry";if(ye.lit++,ye.p){var v=ye.p;ye.p=new Array(ye.lit);for(var L=0;L<ye.lit-1;++L)ye.p[L]=v[L]}else ye.p=new Array(1);ye.p[ye.lit-1]=A}else if(le)for(var H=0,L=1<<14-le;L>0;L--){var ye=ee[(ce<<14-le)+H];if(ye.len||ye.p)throw"Invalid table entry";ye.len=le,ye.lit=A,H++}}return!0}const Le={c:0,lc:0};function et(g,A,X,ee){g=g<<8|Je(X,ee),A+=8,Le.c=g,Le.lc=A}const tt={c:0,lc:0};function ot(g,A,X,ee,ce,le,ye,v,L,H){if(g==A){ee<8&&(et(X,ee,ce,ye),X=Le.c,ee=Le.lc),ee-=8;var G=X>>ee,G=new Uint8Array([G])[0];if(L.value+G>H)return!1;for(var U=v[L.value-1];G-- >0;)v[L.value++]=U}else if(L.value<H)v[L.value++]=g;else return!1;tt.c=X,tt.lc=ee}function rt(g){return g&65535}function dt(g){var A=rt(g);return A>32767?A-65536:A}const re={a:0,b:0};function ve(g,A){var X=dt(g),ee=dt(A),ce=ee,le=X+(ce&1)+(ce>>1),ye=le,v=le-ce;re.a=ye,re.b=v}function Ne(g,A){var X=rt(g),ee=rt(A),ce=X-(ee>>1)&65535,le=ee+ce-32768&65535;re.a=le,re.b=ce}function st(g,A,X,ee,ce,le,ye){for(var v=ye<16384,L=X>ce?ce:X,H=1,G;H<=L;)H<<=1;for(H>>=1,G=H,H>>=1;H>=1;){for(var U=0,pe=U+le*(ce-G),ue=le*H,me=le*G,Ee=ee*H,Re=ee*G,Oe,De,Ke,mt;U<=pe;U+=me){for(var lt=U,St=U+ee*(X-G);lt<=St;lt+=Re){var qe=lt+Ee,Be=lt+ue,Ct=Be+Ee;v?(ve(g[lt+A],g[Be+A]),Oe=re.a,Ke=re.b,ve(g[qe+A],g[Ct+A]),De=re.a,mt=re.b,ve(Oe,De),g[lt+A]=re.a,g[qe+A]=re.b,ve(Ke,mt),g[Be+A]=re.a,g[Ct+A]=re.b):(Ne(g[lt+A],g[Be+A]),Oe=re.a,Ke=re.b,Ne(g[qe+A],g[Ct+A]),De=re.a,mt=re.b,Ne(Oe,De),g[lt+A]=re.a,g[qe+A]=re.b,Ne(Ke,mt),g[Be+A]=re.a,g[Ct+A]=re.b)}if(X&H){var Be=lt+ue;v?ve(g[lt+A],g[Be+A]):Ne(g[lt+A],g[Be+A]),Oe=re.a,g[Be+A]=re.b,g[lt+A]=Oe}}if(ce&H)for(var lt=U,St=U+ee*(X-G);lt<=St;lt+=Re){var qe=lt+Ee;v?ve(g[lt+A],g[qe+A]):Ne(g[lt+A],g[qe+A]),Oe=re.a,g[qe+A]=re.b,g[lt+A]=Oe}G=H,H>>=1}return U}function Ye(g,A,X,ee,ce,le,ye,v,L,H){for(var G=0,U=0,pe=v,ue=Math.trunc(ce.value+(le+7)/8);ce.value<ue;)for(et(G,U,X,ce),G=Le.c,U=Le.lc;U>=14;){var me=G>>U-14&16383,Ee=A[me];if(Ee.len)U-=Ee.len,ot(Ee.lit,ye,G,U,X,ee,ce,L,H,pe),G=tt.c,U=tt.lc;else{if(!Ee.p)throw"hufDecode issues";var Re;for(Re=0;Re<Ee.lit;Re++){for(var Oe=be(g[Ee.p[Re]]);U<Oe&&ce.value<ue;)et(G,U,X,ce),G=Le.c,U=Le.lc;if(U>=Oe&&oe(g[Ee.p[Re]])==(G>>U-Oe&(1<<Oe)-1)){U-=Oe,ot(Ee.p[Re],ye,G,U,X,ee,ce,L,H,pe),G=tt.c,U=tt.lc;break}}if(Re==Ee.lit)throw"hufDecode issues"}}var De=8-le&7;for(G>>=De,U-=De;U>0;){var Ee=A[G<<14-U&16383];if(Ee.len)U-=Ee.len,ot(Ee.lit,ye,G,U,X,ee,ce,L,H,pe),G=tt.c,U=tt.lc;else throw"hufDecode issues"}return!0}function Mt(g,A,X,ee,ce,le){var ye={value:0},v=X.value,L=we(A,X),H=we(A,X);X.value+=4;var G=we(A,X);if(X.value+=4,L<0||L>=65537||H<0||H>=65537)throw"Something wrong with HUF_ENCSIZE";var U=new Array(65537),pe=new Array(16384);z(pe);var ue=ee-(X.value-v);if(ne(g,A,X,ue,L,H,U),G>8*(ee-(X.value-v)))throw"Something wrong with hufUncompress";Ue(U,L,H,pe),Ye(U,pe,g,A,X,G,H,le,ce,ye)}function ln(g,A,X){for(var ee=0;ee<X;++ee)A[ee]=g[A[ee]]}function k(g){for(var A=1;A<g.length;A++){var X=g[A-1]+g[A]-128;g[A]=X}}function Vt(g,A){for(var X=0,ee=Math.floor((g.length+1)/2),ce=0,le=g.length-1;!(ce>le||(A[ce++]=g[X++],ce>le));)A[ce++]=g[ee++]}function pt(g){for(var A=g.byteLength,X=new Array,ee=0,ce=new DataView(g);A>0;){var le=ce.getInt8(ee++);if(le<0){var ye=-le;A-=ye+1;for(var v=0;v<ye;v++)X.push(ce.getUint8(ee++))}else{var ye=le;A-=2;for(var L=ce.getUint8(ee++),v=0;v<ye+1;v++)X.push(L)}}return X}function it(g,A,X,ee,ce,le){var qe=new DataView(le.buffer),ye=X[g.idx[0]].width,v=X[g.idx[0]].height,L=3,H=Math.floor(ye/8),G=Math.ceil(ye/8),U=Math.ceil(v/8),pe=ye-(G-1)*8,ue=v-(U-1)*8,me={value:0},Ee=new Array(L),Re=new Array(L),Oe=new Array(L),De=new Array(L),Ke=new Array(L);for(let wt=0;wt<L;++wt)Ke[wt]=A[g.idx[wt]],Ee[wt]=wt<1?0:Ee[wt-1]+G*U,Re[wt]=new Float32Array(64),Oe[wt]=new Uint16Array(64),De[wt]=new Uint16Array(G*64);for(let wt=0;wt<U;++wt){var mt=8;wt==U-1&&(mt=ue);var lt=8;for(let Ft=0;Ft<G;++Ft){Ft==G-1&&(lt=pe);for(let at=0;at<L;++at)Oe[at].fill(0),Oe[at][0]=ce[Ee[at]++],Ge(me,ee,Oe[at]),Wt(Oe[at],Re[at]),We(Re[at]);ut(Re);for(let at=0;at<L;++at)Xt(Re[at],De[at],Ft*64)}let Ut=0;for(let Ft=0;Ft<L;++Ft){const at=X[g.idx[Ft]].type;for(let Qt=8*wt;Qt<8*wt+mt;++Qt){Ut=Ke[Ft][Qt];for(let on=0;on<H;++on){const Ot=on*64+(Qt&7)*8;qe.setUint16(Ut+0*at,De[Ft][Ot+0],!0),qe.setUint16(Ut+2*at,De[Ft][Ot+1],!0),qe.setUint16(Ut+4*at,De[Ft][Ot+2],!0),qe.setUint16(Ut+6*at,De[Ft][Ot+3],!0),qe.setUint16(Ut+8*at,De[Ft][Ot+4],!0),qe.setUint16(Ut+10*at,De[Ft][Ot+5],!0),qe.setUint16(Ut+12*at,De[Ft][Ot+6],!0),qe.setUint16(Ut+14*at,De[Ft][Ot+7],!0),Ut+=16*at}}if(H!=G)for(let Qt=8*wt;Qt<8*wt+mt;++Qt){const on=Ke[Ft][Qt]+8*H*2*at,Ot=H*64+(Qt&7)*8;for(let Jt=0;Jt<lt;++Jt)qe.setUint16(on+Jt*2*at,De[Ft][Ot+Jt],!0)}}}for(var St=new Uint16Array(ye),qe=new DataView(le.buffer),Be=0;Be<L;++Be){X[g.idx[Be]].decoded=!0;var Ct=X[g.idx[Be]].type;if(X[Be].type==2)for(var Et=0;Et<v;++Et){const wt=Ke[Be][Et];for(var ht=0;ht<ye;++ht)St[ht]=qe.getUint16(wt+ht*2*Ct,!0);for(var ht=0;ht<ye;++ht)qe.setFloat32(wt+ht*2*Ct,J(St[ht]),!0)}}}function Ge(g,A,X){for(var ee,ce=1;ce<64;)ee=A[g.value],ee==65280?ce=64:ee>>8==255?ce+=ee&255:(X[ce]=ee,ce++),g.value++}function Wt(g,A){A[0]=J(g[0]),A[1]=J(g[1]),A[2]=J(g[5]),A[3]=J(g[6]),A[4]=J(g[14]),A[5]=J(g[15]),A[6]=J(g[27]),A[7]=J(g[28]),A[8]=J(g[2]),A[9]=J(g[4]),A[10]=J(g[7]),A[11]=J(g[13]),A[12]=J(g[16]),A[13]=J(g[26]),A[14]=J(g[29]),A[15]=J(g[42]),A[16]=J(g[3]),A[17]=J(g[8]),A[18]=J(g[12]),A[19]=J(g[17]),A[20]=J(g[25]),A[21]=J(g[30]),A[22]=J(g[41]),A[23]=J(g[43]),A[24]=J(g[9]),A[25]=J(g[11]),A[26]=J(g[18]),A[27]=J(g[24]),A[28]=J(g[31]),A[29]=J(g[40]),A[30]=J(g[44]),A[31]=J(g[53]),A[32]=J(g[10]),A[33]=J(g[19]),A[34]=J(g[23]),A[35]=J(g[32]),A[36]=J(g[39]),A[37]=J(g[45]),A[38]=J(g[52]),A[39]=J(g[54]),A[40]=J(g[20]),A[41]=J(g[22]),A[42]=J(g[33]),A[43]=J(g[38]),A[44]=J(g[46]),A[45]=J(g[51]),A[46]=J(g[55]),A[47]=J(g[60]),A[48]=J(g[21]),A[49]=J(g[34]),A[50]=J(g[37]),A[51]=J(g[47]),A[52]=J(g[50]),A[53]=J(g[56]),A[54]=J(g[59]),A[55]=J(g[61]),A[56]=J(g[35]),A[57]=J(g[36]),A[58]=J(g[48]),A[59]=J(g[49]),A[60]=J(g[57]),A[61]=J(g[58]),A[62]=J(g[62]),A[63]=J(g[63])}function We(g){const A=.5*Math.cos(.7853975),X=.5*Math.cos(3.14159/16),ee=.5*Math.cos(3.14159/8),ce=.5*Math.cos(3*3.14159/16),le=.5*Math.cos(5*3.14159/16),ye=.5*Math.cos(3*3.14159/8),v=.5*Math.cos(7*3.14159/16);for(var L=new Array(4),H=new Array(4),G=new Array(4),U=new Array(4),pe=0;pe<8;++pe){var ue=pe*8;L[0]=ee*g[ue+2],L[1]=ye*g[ue+2],L[2]=ee*g[ue+6],L[3]=ye*g[ue+6],H[0]=X*g[ue+1]+ce*g[ue+3]+le*g[ue+5]+v*g[ue+7],H[1]=ce*g[ue+1]-v*g[ue+3]-X*g[ue+5]-le*g[ue+7],H[2]=le*g[ue+1]-X*g[ue+3]+v*g[ue+5]+ce*g[ue+7],H[3]=v*g[ue+1]-le*g[ue+3]+ce*g[ue+5]-X*g[ue+7],G[0]=A*(g[ue+0]+g[ue+4]),G[3]=A*(g[ue+0]-g[ue+4]),G[1]=L[0]+L[3],G[2]=L[1]-L[2],U[0]=G[0]+G[1],U[1]=G[3]+G[2],U[2]=G[3]-G[2],U[3]=G[0]-G[1],g[ue+0]=U[0]+H[0],g[ue+1]=U[1]+H[1],g[ue+2]=U[2]+H[2],g[ue+3]=U[3]+H[3],g[ue+4]=U[3]-H[3],g[ue+5]=U[2]-H[2],g[ue+6]=U[1]-H[1],g[ue+7]=U[0]-H[0]}for(var me=0;me<8;++me)L[0]=ee*g[16+me],L[1]=ye*g[16+me],L[2]=ee*g[48+me],L[3]=ye*g[48+me],H[0]=X*g[8+me]+ce*g[24+me]+le*g[40+me]+v*g[56+me],H[1]=ce*g[8+me]-v*g[24+me]-X*g[40+me]-le*g[56+me],H[2]=le*g[8+me]-X*g[24+me]+v*g[40+me]+ce*g[56+me],H[3]=v*g[8+me]-le*g[24+me]+ce*g[40+me]-X*g[56+me],G[0]=A*(g[me]+g[32+me]),G[3]=A*(g[me]-g[32+me]),G[1]=L[0]+L[3],G[2]=L[1]-L[2],U[0]=G[0]+G[1],U[1]=G[3]+G[2],U[2]=G[3]-G[2],U[3]=G[0]-G[1],g[0+me]=U[0]+H[0],g[8+me]=U[1]+H[1],g[16+me]=U[2]+H[2],g[24+me]=U[3]+H[3],g[32+me]=U[3]-H[3],g[40+me]=U[2]-H[2],g[48+me]=U[1]-H[1],g[56+me]=U[0]-H[0]}function ut(g){for(var A=0;A<64;++A){var X=g[0][A],ee=g[1][A],ce=g[2][A];g[0][A]=X+1.5747*ce,g[1][A]=X-.1873*ee-.4682*ce,g[2][A]=X+1.8556*ee}}function Xt(g,A,X){for(var ee=0;ee<64;++ee)A[X+ee]=Ki.toHalfFloat($t(g[ee]))}function $t(g){return g<=1?Math.sign(g)*Math.pow(Math.abs(g),2.2):Math.sign(g)*Math.pow(M,Math.abs(g)-1)}function I(g){return new DataView(g.array.buffer,g.offset.value,g.size)}function b(g){var A=g.viewer.buffer.slice(g.offset.value,g.offset.value+g.size),X=new Uint8Array(pt(A)),ee=new Uint8Array(X.length);return k(X),Vt(X,ee),new DataView(ee.buffer)}function Z(g){var A=g.array.slice(g.offset.value,g.offset.value+g.size),X=Ys(A),ee=new Uint8Array(X.length);return k(X),Vt(X,ee),new DataView(ee.buffer)}function de(g){for(var A=g.viewer,X={value:g.offset.value},ee=new Uint16Array(g.width*g.scanlineBlockSize*(g.channels*g.type)),ce=new Uint8Array(8192),le=0,ye=new Array(g.channels),v=0;v<g.channels;v++)ye[v]={},ye[v].start=le,ye[v].end=ye[v].start,ye[v].nx=g.width,ye[v].ny=g.lines,ye[v].size=g.type,le+=ye[v].nx*ye[v].ny*ye[v].size;var L=Ie(A,X),H=Ie(A,X);if(H>=8192)throw"Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";if(L<=H)for(var v=0;v<H-L+1;v++)ce[v+L]=He(A,X);var G=new Uint16Array(65536),U=T(ce,G),pe=we(A,X);Mt(g.array,A,X,pe,ee,le);for(var v=0;v<g.channels;++v)for(var ue=ye[v],me=0;me<ye[v].size;++me)st(ee,ue.start+me,ue.nx,ue.size,ue.ny,ue.nx*ue.size,U);ln(G,ee,le);for(var Ee=0,Re=new Uint8Array(ee.buffer.byteLength),Oe=0;Oe<g.lines;Oe++)for(var De=0;De<g.channels;De++){var ue=ye[De],Ke=ue.nx*ue.size,mt=new Uint8Array(ee.buffer,ue.end*2,Ke*2);Re.set(mt,Ee),Ee+=Ke*2,ue.end+=Ke}return new DataView(Re.buffer)}function he(g){var A=g.array.slice(g.offset.value,g.offset.value+g.size),X=Ys(A);const ee=g.lines*g.channels*g.width,ce=g.type==1?new Uint16Array(ee):new Uint32Array(ee);let le=0,ye=0;const v=new Array(4);for(let L=0;L<g.lines;L++)for(let H=0;H<g.channels;H++){let G=0;switch(g.type){case 1:v[0]=le,v[1]=v[0]+g.width,le=v[1]+g.width;for(let U=0;U<g.width;++U){const pe=X[v[0]++]<<8|X[v[1]++];G+=pe,ce[ye]=G,ye++}break;case 2:v[0]=le,v[1]=v[0]+g.width,v[2]=v[1]+g.width,le=v[2]+g.width;for(let U=0;U<g.width;++U){const pe=X[v[0]++]<<24|X[v[1]++]<<16|X[v[2]++]<<8;G+=pe,ce[ye]=G,ye++}break}}return new DataView(ce.buffer)}function fe(g){var A=g.viewer,X={value:g.offset.value},ee=new Uint8Array(g.width*g.lines*(g.channels*g.type*2)),ce={version:Ce(A,X),unknownUncompressedSize:Ce(A,X),unknownCompressedSize:Ce(A,X),acCompressedSize:Ce(A,X),dcCompressedSize:Ce(A,X),rleCompressedSize:Ce(A,X),rleUncompressedSize:Ce(A,X),rleRawSize:Ce(A,X),totalAcUncompressedCount:Ce(A,X),totalDcUncompressedCount:Ce(A,X),acCompression:Ce(A,X)};if(ce.version<2)throw"EXRLoader.parse: "+Xn.compression+" version "+ce.version+" is unsupported";for(var le=new Array,ye=Ie(A,X)-2;ye>0;){var v=Ze(A.buffer,X),L=He(A,X),H=L>>2&3,G=(L>>4)-1,U=new Int8Array([G])[0],pe=He(A,X);le.push({name:v,index:U,type:pe,compression:H}),ye-=v.length+3}for(var ue=Xn.channels,me=new Array(g.channels),Ee=0;Ee<g.channels;++Ee){var Re=me[Ee]={},Oe=ue[Ee];Re.name=Oe.name,Re.compression=0,Re.decoded=!1,Re.type=Oe.pixelType,Re.pLinear=Oe.pLinear,Re.width=g.width,Re.height=g.lines}for(var De={idx:new Array(3)},Ke=0;Ke<g.channels;++Ke)for(var Re=me[Ke],Ee=0;Ee<le.length;++Ee){var mt=le[Ee];Re.name==mt.name&&(Re.compression=mt.compression,mt.index>=0&&(De.idx[mt.index]=Ke),Re.offset=Ke)}if(ce.acCompressedSize>0)switch(ce.acCompression){case 0:var qe=new Uint16Array(ce.totalAcUncompressedCount);Mt(g.array,A,X,ce.acCompressedSize,qe,ce.totalAcUncompressedCount);break;case 1:var lt=g.array.slice(X.value,X.value+ce.totalAcUncompressedCount),St=Ys(lt),qe=new Uint16Array(St.buffer);X.value+=ce.totalAcUncompressedCount;break}if(ce.dcCompressedSize>0){var Be={array:g.array,offset:X,size:ce.dcCompressedSize},Ct=new Uint16Array(Z(Be).buffer);X.value+=ce.dcCompressedSize}if(ce.rleRawSize>0){var lt=g.array.slice(X.value,X.value+ce.rleCompressedSize),St=Ys(lt),Et=pt(St.buffer);X.value+=ce.rleCompressedSize}for(var ht=0,wt=new Array(me.length),Ee=0;Ee<wt.length;++Ee)wt[Ee]=new Array;for(var Ut=0;Ut<g.lines;++Ut)for(var Ft=0;Ft<me.length;++Ft)wt[Ft].push(ht),ht+=me[Ft].width*g.type*2;it(De,wt,me,qe,Ct,ee);for(var Ee=0;Ee<me.length;++Ee){var Re=me[Ee];if(!Re.decoded)switch(Re.compression){case 2:for(var at=0,Qt=0,Ut=0;Ut<g.lines;++Ut){for(var on=wt[Ee][at],Ot=0;Ot<Re.width;++Ot){for(var Jt=0;Jt<2*Re.type;++Jt)ee[on++]=Et[Qt+Jt*Re.width*Re.height];Qt++}at++}break;default:throw"EXRLoader.parse: unsupported channel compression"}}return new DataView(ee.buffer)}function Ze(g,A){for(var X=new Uint8Array(g),ee=0;X[A.value+ee]!=0;)ee+=1;var ce=new TextDecoder().decode(X.slice(A.value,A.value+ee));return A.value=A.value+ee+1,ce}function Pe(g,A,X){var ee=new TextDecoder().decode(new Uint8Array(g).slice(A.value,A.value+X));return A.value=A.value+X,ee}function je(g,A){var X=Te(g,A),ee=we(g,A);return[X,ee]}function Qe(g,A){var X=we(g,A),ee=we(g,A);return[X,ee]}function Te(g,A){var X=g.getInt32(A.value,!0);return A.value=A.value+4,X}function we(g,A){var X=g.getUint32(A.value,!0);return A.value=A.value+4,X}function Je(g,A){var X=g[A.value];return A.value=A.value+1,X}function He(g,A){var X=g.getUint8(A.value);return A.value=A.value+1,X}const Ce=function(g,A){let X;return"getBigInt64"in DataView.prototype?X=Number(g.getBigInt64(A.value,!0)):X=g.getUint32(A.value+4,!0)+Number(g.getUint32(A.value,!0)<<32),A.value+=8,X};function nt(g,A){var X=g.getFloat32(A.value,!0);return A.value+=4,X}function Y(g,A){return Ki.toHalfFloat(nt(g,A))}function J(g){var A=(g&31744)>>10,X=g&1023;return(g>>15?-1:1)*(A?A===31?X?NaN:1/0:Math.pow(2,A-15)*(1+X/1024):6103515625e-14*(X/1024))}function Ie(g,A){var X=g.getUint16(A.value,!0);return A.value+=2,X}function Xe(g,A){return J(Ie(g,A))}function Me(g,A,X,ee){for(var ce=X.value,le=[];X.value<ce+ee-1;){var ye=Ze(A,X),v=Te(g,X),L=He(g,X);X.value+=3;var H=Te(g,X),G=Te(g,X);le.push({name:ye,pixelType:v,pLinear:L,xSampling:H,ySampling:G})}return X.value+=1,le}function _e(g,A){var X=nt(g,A),ee=nt(g,A),ce=nt(g,A),le=nt(g,A),ye=nt(g,A),v=nt(g,A),L=nt(g,A),H=nt(g,A);return{redX:X,redY:ee,greenX:ce,greenY:le,blueX:ye,blueY:v,whiteX:L,whiteY:H}}function $e(g,A){var X=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],ee=He(g,A);return X[ee]}function gt(g,A){var X=we(g,A),ee=we(g,A),ce=we(g,A),le=we(g,A);return{xMin:X,yMin:ee,xMax:ce,yMax:le}}function Ht(g,A){var X=["INCREASING_Y"],ee=He(g,A);return X[ee]}function At(g,A){var X=nt(g,A),ee=nt(g,A);return[X,ee]}function $n(g,A){var X=nt(g,A),ee=nt(g,A),ce=nt(g,A);return[X,ee,ce]}function Pn(g,A,X,ee,ce){if(ee==="string"||ee==="stringvector"||ee==="iccProfile")return Pe(A,X,ce);if(ee==="chlist")return Me(g,A,X,ce);if(ee==="chromaticities")return _e(g,X);if(ee==="compression")return $e(g,X);if(ee==="box2i")return gt(g,X);if(ee==="lineOrder")return Ht(g,X);if(ee==="float")return nt(g,X);if(ee==="v2f")return At(g,X);if(ee==="v3f")return $n(g,X);if(ee==="int")return Te(g,X);if(ee==="rational")return je(g,X);if(ee==="timecode")return Qe(g,X);if(ee==="preview")return X.value+=ce,"skipped";X.value+=ce}function Ri(g,A,X){const ee={};if(g.getUint32(0,!0)!=20000630)throw"THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";ee.version=g.getUint8(4);const ce=g.getUint8(5);ee.spec={singleTile:!!(ce&2),longName:!!(ce&4),deepFormat:!!(ce&8),multiPart:!!(ce&16)},X.value=8;for(var le=!0;le;){var ye=Ze(A,X);if(ye==0)le=!1;else{var v=Ze(A,X),L=we(g,X),H=Pn(g,A,X,v,L);H===void 0?console.warn(`EXRLoader.parse: skipped unknown header attribute type '${v}'.`):ee[ye]=H}}if((ce&-5)!=0)throw console.error("EXRHeader:",ee),"THREE.EXRLoader: provided file is currently unsupported.";return ee}function mr(g,A,X,ee,ce){const le={size:0,viewer:A,array:X,offset:ee,width:g.dataWindow.xMax-g.dataWindow.xMin+1,height:g.dataWindow.yMax-g.dataWindow.yMin+1,channels:g.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:g.channels[0].pixelType,uncompress:null,getter:null,format:null,[bo?"colorSpace":"encoding"]:null};switch(g.compression){case"NO_COMPRESSION":le.lines=1,le.uncompress=I;break;case"RLE_COMPRESSION":le.lines=1,le.uncompress=b;break;case"ZIPS_COMPRESSION":le.lines=1,le.uncompress=Z;break;case"ZIP_COMPRESSION":le.lines=16,le.uncompress=Z;break;case"PIZ_COMPRESSION":le.lines=32,le.uncompress=de;break;case"PXR24_COMPRESSION":le.lines=16,le.uncompress=he;break;case"DWAA_COMPRESSION":le.lines=32,le.uncompress=fe;break;case"DWAB_COMPRESSION":le.lines=256,le.uncompress=fe;break;default:throw"EXRLoader.parse: "+g.compression+" is unsupported"}if(le.scanlineBlockSize=le.lines,le.type==1)switch(ce){case kn:le.getter=Xe,le.inputSize=2;break;case On:le.getter=Ie,le.inputSize=2;break}else if(le.type==2)switch(ce){case kn:le.getter=nt,le.inputSize=4;break;case On:le.getter=Y,le.inputSize=4}else throw"EXRLoader.parse: unsupported pixelType "+le.type+" for "+g.compression+".";le.blockCount=(g.dataWindow.yMax+1)/le.scanlineBlockSize;for(var ye=0;ye<le.blockCount;ye++)Ce(A,ee);le.outputChannels=le.channels==3?4:le.channels;const v=le.width*le.height*le.outputChannels;switch(ce){case kn:le.byteArray=new Float32Array(v),le.channels<le.outputChannels&&le.byteArray.fill(1,0,v);break;case On:le.byteArray=new Uint16Array(v),le.channels<le.outputChannels&&le.byteArray.fill(15360,0,v);break;default:console.error("THREE.EXRLoader: unsupported type: ",ce);break}return le.bytesPerLine=le.width*le.inputSize*le.channels,le.outputChannels==4?le.format=Wn:le.format=Of,bo?le.colorSpace="srgb-linear":le.encoding=3e3,le}const zn=new DataView(i),Ai=new Uint8Array(i),yr={value:0},Xn=Ri(zn,i,yr),_t=mr(Xn,zn,Ai,yr,this.type),vr={value:0},Ci={R:0,G:1,B:2,A:3,Y:0};for(let g=0;g<_t.height/_t.scanlineBlockSize;g++){const A=we(zn,yr);_t.size=we(zn,yr),_t.lines=A+_t.scanlineBlockSize>_t.height?_t.height-A:_t.scanlineBlockSize;const ee=_t.size<_t.lines*_t.bytesPerLine?_t.uncompress(_t):I(_t);yr.value+=_t.size;for(let ce=0;ce<_t.scanlineBlockSize;ce++){const le=ce+g*_t.scanlineBlockSize;if(le>=_t.height)break;for(let ye=0;ye<_t.channels;ye++){const v=Ci[Xn.channels[ye].name];for(let L=0;L<_t.width;L++){vr.value=(ce*(_t.channels*_t.width)+ye*_t.width+L)*_t.inputSize;const H=(_t.height-1-le)*(_t.width*_t.outputChannels)+L*_t.outputChannels+v;_t.byteArray[H]=_t.getter(ee,vr)}}}}return{header:Xn,width:_t.width,height:_t.height,data:_t.byteArray,format:_t.format,[bo?"colorSpace":"encoding"]:_t[bo?"colorSpace":"encoding"],type:this.type}}setDataType(i){return this.type=i,this}load(i,a,s,u){function f(h,p){bo?h.colorSpace=p.colorSpace:h.encoding=p.encoding,h.minFilter=Bn,h.magFilter=Bn,h.generateMipmaps=!1,h.flipY=!1,a&&a(h,p)}return super.load(i,f,s,u)}}const Wg=(n,i,a)=>{let s;switch(n){case xr:s=new Uint8ClampedArray(i*a*4);break;case On:s=new Uint16Array(i*a*4);break;case Ji:s=new Uint32Array(i*a*4);break;case Nf:s=new Int8Array(i*a*4);break;case Ff:s=new Int16Array(i*a*4);break;case Ml:s=new Int32Array(i*a*4);break;case kn:s=new Float32Array(i*a*4);break;default:throw new Error("Unsupported data type")}return s};let js;const T1=(n,i,a,s)=>{if(js!==void 0)return js;const u=new Dr(1,1,s);i.setRenderTarget(u);const f=new pr(new qa,new qf({color:16777215}));i.render(f,a),i.setRenderTarget(null);const h=Wg(n,u.width,u.height);return i.readRenderTargetPixels(u,0,0,u.width,u.height,h),u.dispose(),f.geometry.dispose(),f.material.dispose(),js=h[0]!==0,js};class cd{constructor(i){mn(this,"_renderer");mn(this,"_rendererIsDisposable",!1);mn(this,"_material");mn(this,"_scene");mn(this,"_camera");mn(this,"_quad");mn(this,"_renderTarget");mn(this,"_width");mn(this,"_height");mn(this,"_type");mn(this,"_colorSpace");mn(this,"_supportsReadPixels",!0);mn(this,"render",()=>{this._renderer.setRenderTarget(this._renderTarget);try{this._renderer.render(this._scene,this._camera)}catch(i){throw this._renderer.setRenderTarget(null),i}this._renderer.setRenderTarget(null)});this._width=i.width,this._height=i.height,this._type=i.type,this._colorSpace=i.colorSpace;const a={format:Wn,depthBuffer:!1,stencilBuffer:!1,type:this._type,colorSpace:this._colorSpace,anisotropy:i.renderTargetOptions?.anisotropy!==void 0?i.renderTargetOptions?.anisotropy:1,generateMipmaps:i.renderTargetOptions?.generateMipmaps!==void 0?i.renderTargetOptions?.generateMipmaps:!1,magFilter:i.renderTargetOptions?.magFilter!==void 0?i.renderTargetOptions?.magFilter:Bn,minFilter:i.renderTargetOptions?.minFilter!==void 0?i.renderTargetOptions?.minFilter:Bn,samples:i.renderTargetOptions?.samples!==void 0?i.renderTargetOptions?.samples:void 0,wrapS:i.renderTargetOptions?.wrapS!==void 0?i.renderTargetOptions?.wrapS:Xr,wrapT:i.renderTargetOptions?.wrapT!==void 0?i.renderTargetOptions?.wrapT:Xr};if(this._material=i.material,i.renderer?this._renderer=i.renderer:(this._renderer=cd.instantiateRenderer(),this._rendererIsDisposable=!0),this._scene=new xl,this._camera=new Tl,this._camera.position.set(0,0,10),this._camera.left=-.5,this._camera.right=.5,this._camera.top=.5,this._camera.bottom=-.5,this._camera.updateProjectionMatrix(),!T1(this._type,this._renderer,this._camera,a)){let s;this._type===On&&(s=this._renderer.extensions.has("EXT_color_buffer_float")?kn:void 0),s!==void 0?(console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${kn}`),this._type=s):(this._supportsReadPixels=!1,console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown"))}this._quad=new pr(new qa,this._material),this._quad.geometry.computeBoundingBox(),this._scene.add(this._quad),this._renderTarget=new Dr(this.width,this.height,a),this._renderTarget.texture.mapping=i.renderTargetOptions?.mapping!==void 0?i.renderTargetOptions?.mapping:Oo}static instantiateRenderer(){const i=new Zf;return i.setSize(128,128),i}toArray(){if(!this._supportsReadPixels)throw new Error("Can't read pixels in this browser");const i=Wg(this._type,this._width,this._height);return this._renderer.readRenderTargetPixels(this._renderTarget,0,0,this._width,this._height,i),i}toDataTexture(i){const a=new og(this.toArray(),this.width,this.height,Wn,this._type,i?.mapping||Oo,i?.wrapS||Xr,i?.wrapT||Xr,i?.magFilter||Bn,i?.minFilter||Bn,i?.anisotropy||1,oi);return a.generateMipmaps=i?.generateMipmaps!==void 0?i?.generateMipmaps:!1,a}disposeOnDemandRenderer(){this._renderer.setRenderTarget(null),this._rendererIsDisposable&&(this._renderer.dispose(),this._renderer.forceContextLoss())}dispose(i){this.disposeOnDemandRenderer(),i&&this.renderTarget.dispose(),this.material instanceof nr&&Object.values(this.material.uniforms).forEach(a=>{a.value instanceof yi&&a.value.dispose()}),Object.values(this.material).forEach(a=>{a instanceof yi&&a.dispose()}),this.material.dispose(),this._quad.geometry.dispose()}get width(){return this._width}set width(i){this._width=i,this._renderTarget.setSize(this._width,this._height)}get height(){return this._height}set height(i){this._height=i,this._renderTarget.setSize(this._width,this._height)}get renderer(){return this._renderer}get renderTarget(){return this._renderTarget}set renderTarget(i){this._renderTarget=i,this._width=i.width,this._height=i.height}get material(){return this._material}get type(){return this._type}get colorSpace(){return this._colorSpace}}const x1="urn:iso:std:iso:ts:21496:-1\0",y1=128,w1=8,R1=4,A1=n=>{const i=new DataView(n.buffer,n.byteOffset,n.byteLength);let a=0;const s=()=>{const N=i.getUint16(a);return a+=2,N},u=()=>{const N=i.getUint32(a);return a+=4,N},f=()=>{const N=i.getInt32(a);return a+=4,N},h=s();if(h!==0)throw new Error(`Unsupported ISO 21496-1 minimum_version ${h}`);s();const p=i.getUint8(a++);if(p&R1)throw new Error("ISO 21496-1 metadata with HDR base image is not supported");const m=p&y1?3:1,E=p&w1?u():void 0,y=N=>{const P=N?f():u(),q=E??u();if(q===0)throw new Error("Invalid ISO 21496-1 fraction with zero denominator");return P/q},x=y(!1),R=y(!1);if(x>R)throw new Error("ISO 21496-1 metadata with HDR base image is not supported");const w=[],F=[],O=[],_=[],d=[];for(let N=0;N<m;N++)w.push(y(!0)),F.push(y(!0)),O.push(y(!1)),_.push(y(!0)),d.push(y(!0));const C=N=>m===3?N:[N[0],N[0],N[0]];return{gainMapMin:C(w),gainMapMax:C(F),gamma:C(O),offsetSdr:C(_),offsetHdr:C(d),hdrCapacityMin:x,hdrCapacityMax:R}};class Xg extends Error{}class qg extends Error{}const Ym=Array.from(x1,n=>n.charCodeAt(0)),C1=n=>{const i=new DataView(n.buffer,n.byteOffset,n.byteLength),a=4+Ym.length;for(let s=0;s+a<n.length;s++){if(n[s]!==255||n[s+1]!==226||!Ym.every((f,h)=>n[s+4+h]===f))continue;const u=Math.min(n.length,s+2+i.getUint16(s+2));if(!(u-(s+a)<=4))try{return A1(n.subarray(s+a,u))}catch{return}}},Mo=(n,i,a)=>{const s=new RegExp(`${i}="([^"]*)"`,"i").exec(n);if(s)return s[1];const u=new RegExp(`<${i}[^>]*>([\\s\\S]*?)</${i}>`,"i").exec(n);if(u){const f=u[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);return f&&f.length===3?f.map(h=>h.replace(/<\/?rdf:li>/g,"")):u[1].trim()}if(a!==void 0)return a;throw new Error(`Can't find ${i} in gainmap metadata`)},P1=n=>{let i;typeof TextDecoder<"u"?i=new TextDecoder().decode(n):i=n.toString();let a=i.indexOf("<x:xmpmeta");for(;a!==-1;){const s=i.indexOf("x:xmpmeta>",a),u=i.slice(a,s+10);try{const f=Mo(u,"hdrgm:GainMapMin","0"),h=Mo(u,"hdrgm:GainMapMax"),p=Mo(u,"hdrgm:Gamma","1"),m=Mo(u,"hdrgm:OffsetSDR","0.015625"),E=Mo(u,"hdrgm:OffsetHDR","0.015625"),y=/hdrgm:HDRCapacityMin="([^"]*)"/.exec(u),x=y?y[1]:"0",R=/hdrgm:HDRCapacityMax="([^"]*)"/.exec(u);if(!R)throw new Error("Incomplete gainmap metadata");const w=R[1];return{gainMapMin:Array.isArray(f)?f.map(F=>parseFloat(F)):[parseFloat(f),parseFloat(f),parseFloat(f)],gainMapMax:Array.isArray(h)?h.map(F=>parseFloat(F)):[parseFloat(h),parseFloat(h),parseFloat(h)],gamma:Array.isArray(p)?p.map(F=>parseFloat(F)):[parseFloat(p),parseFloat(p),parseFloat(p)],offsetSdr:Array.isArray(m)?m.map(F=>parseFloat(F)):[parseFloat(m),parseFloat(m),parseFloat(m)],offsetHdr:Array.isArray(E)?E.map(F=>parseFloat(F)):[parseFloat(E),parseFloat(E),parseFloat(E)],hdrCapacityMin:parseFloat(x),hdrCapacityMax:parseFloat(w)}}catch{}a=i.indexOf("<x:xmpmeta",s)}};class I1{constructor(i){mn(this,"options");this.options={debug:i&&i.debug!==void 0?i.debug:!1,extractFII:i&&i.extractFII!==void 0?i.extractFII:!0,extractNonFII:i&&i.extractNonFII!==void 0?i.extractNonFII:!0}}extract(i){return new Promise((a,s)=>{const u=this.options.debug,f=new DataView(i.buffer);if(f.getUint16(0)!==65496){s(new Error("Not a valid jpeg"));return}const h=f.byteLength;let p=2,m=0,E;for(;p<h;){if(++m>250){s(new Error(`Found no marker after ${m} loops 😵`));return}if(f.getUint8(p)!==255){s(new Error(`Not a valid marker at offset 0x${p.toString(16)}, found: 0x${f.getUint8(p).toString(16)}`));return}if(E=f.getUint8(p+1),u&&console.log(`Marker: ${E.toString(16)}`),E===226){u&&console.log("Found APP2 marker (0xffe2)");const y=p+4;if(f.getUint32(y)===1297106432){const x=y+4;let R;if(f.getUint16(x)===18761)R=!1;else if(f.getUint16(x)===19789)R=!0;else{s(new Error("No valid endianness marker found in TIFF header"));return}if(f.getUint16(x+2,!R)!==42){s(new Error("Not valid TIFF data! (no 0x002A marker)"));return}const w=f.getUint32(x+4,!R);if(w<8){s(new Error("Not valid TIFF data! (First offset less than 8)"));return}const F=x+w,O=f.getUint16(F,!R),_=F+2;let d=0;for(let q=_;q<_+12*O;q+=12)f.getUint16(q,!R)===45057&&(d=f.getUint32(q+8,!R));const N=F+2+O*12+4,P=[];for(let q=N;q<N+d*16;q+=16){const D={MPType:f.getUint32(q,!R),size:f.getUint32(q+4,!R),dataOffset:f.getUint32(q+8,!R),dependantImages:f.getUint32(q+12,!R),start:-1,end:-1,isFII:!1};D.dataOffset?(D.start=x+D.dataOffset,D.isFII=!1):(D.start=0,D.isFII=!0),D.end=D.start+D.size,P.push(D)}if(this.options.extractNonFII&&P.length){const q=new Blob([f]),D=[];for(const V of P){if(V.isFII&&!this.options.extractFII)continue;const W=q.slice(V.start,V.end+1,"image/jpeg");D.push(W)}a(D)}}}p+=2+f.getUint16(p+2)}})}}const L1=async n=>{const i=C1(n)??P1(n);if(!i)throw new qg("Gain map XMP metadata not found");const s=await new I1({extractFII:!0,extractNonFII:!0}).extract(n);if(s.length!==2)throw new Xg("Gain map recovery image not found");return{sdr:new Uint8Array(await s[0].arrayBuffer()),gainMap:new Uint8Array(await s[1].arrayBuffer()),metadata:i}},jm=n=>new Promise((i,a)=>{const s=document.createElement("img");s.onload=()=>{i(s)},s.onerror=u=>{a(u)},s.src=URL.createObjectURL(n)}),D1=async(n,i,a)=>{const s=i?new Blob([i],{type:"image/jpeg"}):void 0,u=new Blob([n],{type:"image/jpeg"});let f,h,p=!1;if(typeof createImageBitmap>"u"){const m=await Promise.all([s?jm(s):Promise.resolve(void 0),jm(u)]);h=m[0],f=m[1],p=a==="flipY"}else{const m=await Promise.all([s?createImageBitmap(s,{imageOrientation:a||"flipY"}):Promise.resolve(void 0),createImageBitmap(u,{imageOrientation:a||"flipY"})]);h=m[0],f=m[1]}return{sdrImage:f,gainMapImage:h,needsFlip:p}},U1=(n,i,a)=>{const s=new yi(i||new ImageData(2,2),Oo,Xr,Xr,Bn,mf,Wn,xr,1,oi);s.flipY=a,s.needsUpdate=!0;const u=new yi(n,Oo,Xr,Xr,Bn,mf,Wn,xr,1,zo);return u.flipY=a,u.needsUpdate=!0,{gainMap:s,sdr:u}};class N1 extends lg{constructor(a,s){super(s);mn(this,"_renderer");mn(this,"_renderTargetOptions");mn(this,"_internalLoadingManager");mn(this,"_config");this._config=a,a.renderer&&(this._renderer=a.renderer),this._internalLoadingManager=new ug}setRenderer(a){return this._renderer=a,this}setRenderTargetOptions(a){return this._renderTargetOptions=a,this}prepareQuadRenderer(){this._renderer||console.warn("WARNING: A Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");const a=this._config.createMaterial({gainMapMax:[1,1,1],gainMapMin:[0,0,0],gamma:[1,1,1],offsetHdr:[1,1,1],offsetSdr:[1,1,1],hdrCapacityMax:1,hdrCapacityMin:0,maxDisplayBoost:1,gainMap:new yi,sdr:new yi});return this._config.createQuadRenderer({width:16,height:16,type:On,colorSpace:oi,material:a,renderer:this._renderer,renderTargetOptions:this._renderTargetOptions})}processImages(a,s,u){return D1(a,s,u)}createTextures(a,s,u){return U1(a,s,u)}updateQuadRenderer(a,s,u,f,h){a.width=s.width,a.height=s.height,a.material.gainMap=u,a.material.sdr=f,a.material.gainMapMin=h.gainMapMin,a.material.gainMapMax=h.gainMapMax,a.material.offsetHdr=h.offsetHdr,a.material.offsetSdr=h.offsetSdr,a.material.gamma=h.gamma,a.material.hdrCapacityMin=h.hdrCapacityMin,a.material.hdrCapacityMax=h.hdrCapacityMax,a.material.maxDisplayBoost=Math.pow(2,h.hdrCapacityMax),a.material.needsUpdate=!0}}const F1=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,O1=`
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`;class B1 extends nr{constructor({gamma:a,offsetHdr:s,offsetSdr:u,gainMapMin:f,gainMapMax:h,maxDisplayBoost:p,hdrCapacityMin:m,hdrCapacityMax:E,sdr:y,gainMap:x}){super({name:"GainMapDecoderMaterial",vertexShader:F1,fragmentShader:O1,uniforms:{sdr:{value:y},gainMap:{value:x},gamma:{value:new yt(1/a[0],1/a[1],1/a[2])},offsetHdr:{value:new yt().fromArray(s)},offsetSdr:{value:new yt().fromArray(u)},gainMapMin:{value:new yt().fromArray(f)},gainMapMax:{value:new yt().fromArray(h)},weightFactor:{value:(Math.log2(p)-m)/(E-m)}},blending:ai,depthTest:!1,depthWrite:!1});mn(this,"_maxDisplayBoost");mn(this,"_hdrCapacityMin");mn(this,"_hdrCapacityMax");this._maxDisplayBoost=p,this._hdrCapacityMin=m,this._hdrCapacityMax=E,this.needsUpdate=!0,this.uniformsNeedUpdate=!0}get sdr(){return this.uniforms.sdr.value}set sdr(a){this.uniforms.sdr.value=a}get gainMap(){return this.uniforms.gainMap.value}set gainMap(a){this.uniforms.gainMap.value=a}get offsetHdr(){return this.uniforms.offsetHdr.value.toArray()}set offsetHdr(a){this.uniforms.offsetHdr.value.fromArray(a)}get offsetSdr(){return this.uniforms.offsetSdr.value.toArray()}set offsetSdr(a){this.uniforms.offsetSdr.value.fromArray(a)}get gainMapMin(){return this.uniforms.gainMapMin.value.toArray()}set gainMapMin(a){this.uniforms.gainMapMin.value.fromArray(a)}get gainMapMax(){return this.uniforms.gainMapMax.value.toArray()}set gainMapMax(a){this.uniforms.gainMapMax.value.fromArray(a)}get gamma(){const a=this.uniforms.gamma.value;return[1/a.x,1/a.y,1/a.z]}set gamma(a){const s=this.uniforms.gamma.value;s.x=1/a[0],s.y=1/a[1],s.z=1/a[2]}get hdrCapacityMin(){return this._hdrCapacityMin}set hdrCapacityMin(a){this._hdrCapacityMin=a,this.calculateWeight()}get hdrCapacityMax(){return this._hdrCapacityMax}set hdrCapacityMax(a){this._hdrCapacityMax=a,this.calculateWeight()}get maxDisplayBoost(){return this._maxDisplayBoost}set maxDisplayBoost(a){this._maxDisplayBoost=Math.max(1,Math.min(65504,a)),this.calculateWeight()}calculateWeight(){const a=(Math.log2(this._maxDisplayBoost)-this._hdrCapacityMin)/(this._hdrCapacityMax-this._hdrCapacityMin);this.uniforms.weightFactor.value=Math.max(0,Math.min(1,a))}}class Yg extends N1{constructor(i,a){super({renderer:i,createMaterial:s=>new B1(s),createQuadRenderer:s=>new cd(s)},a)}async render(i,a,s,u){const{sdrImage:f,gainMapImage:h,needsFlip:p}=await this.processImages(s,u,"flipY"),{gainMap:m,sdr:E}=this.createTextures(f,h,p);this.updateQuadRenderer(i,f,m,E,a),i.render()}}class k1 extends Yg{load([i,a,s],u,f,h){const p=this.prepareQuadRenderer();let m,E,y;const x=async()=>{if(m&&E&&y){try{await this.render(p,y,m,E)}catch(M){this.manager.itemError(i),this.manager.itemError(a),this.manager.itemError(s),typeof h=="function"&&h(M),p.disposeOnDemandRenderer();return}typeof u=="function"&&u(p),this.manager.itemEnd(i),this.manager.itemEnd(a),this.manager.itemEnd(s),p.disposeOnDemandRenderer()}};let R=!0,w=0,F=0,O=!0,_=0,d=0,C=!0,N=0,P=0;const q=()=>{if(typeof f=="function"){const M=w+_+N,T=F+d+P,z=R&&O&&C;f(new ProgressEvent("progress",{lengthComputable:z,loaded:T,total:M}))}};this.manager.itemStart(i),this.manager.itemStart(a),this.manager.itemStart(s);const D=new Co(this._internalLoadingManager);D.setResponseType("arraybuffer"),D.setRequestHeader(this.requestHeader),D.setPath(this.path),D.setWithCredentials(this.withCredentials),D.load(i,async M=>{if(typeof M=="string")throw new Error("Invalid sdr buffer");m=M,await x()},M=>{R=M.lengthComputable,F=M.loaded,w=M.total,q()},M=>{this.manager.itemError(i),typeof h=="function"&&h(M)});const V=new Co(this._internalLoadingManager);V.setResponseType("arraybuffer"),V.setRequestHeader(this.requestHeader),V.setPath(this.path),V.setWithCredentials(this.withCredentials),V.load(a,async M=>{if(typeof M=="string")throw new Error("Invalid gainmap buffer");E=M,await x()},M=>{O=M.lengthComputable,d=M.loaded,_=M.total,q()},M=>{this.manager.itemError(a),typeof h=="function"&&h(M)});const W=new Co(this._internalLoadingManager);return W.setRequestHeader(this.requestHeader),W.setPath(this.path),W.setWithCredentials(this.withCredentials),W.load(s,async M=>{if(typeof M!="string")throw new Error("Invalid metadata string");y=JSON.parse(M),await x()},M=>{C=M.lengthComputable,P=M.loaded,N=M.total,q()},M=>{this.manager.itemError(s),typeof h=="function"&&h(M)}),p}}class H1 extends Yg{load(i,a,s,u){const f=this.prepareQuadRenderer(),h=new Co(this._internalLoadingManager);return h.setResponseType("arraybuffer"),h.setRequestHeader(this.requestHeader),h.setPath(this.path),h.setWithCredentials(this.withCredentials),this.manager.itemStart(i),h.load(i,async p=>{if(typeof p=="string")throw new Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");const m=new Uint8Array(p);let E,y,x;try{const R=await L1(m);E=R.sdr,y=R.gainMap,x=R.metadata}catch(R){if(R instanceof qg||R instanceof Xg)console.warn(`Failure to reconstruct an HDR image from ${i}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`),x={gainMapMin:[0,0,0],gainMapMax:[1,1,1],gamma:[1,1,1],hdrCapacityMin:0,hdrCapacityMax:1,offsetHdr:[0,0,0],offsetSdr:[0,0,0]},E=m;else throw R}try{await this.render(f,x,E.buffer,y?.buffer)}catch(R){this.manager.itemError(i),typeof u=="function"&&u(R),f.disposeOnDemandRenderer();return}typeof a=="function"&&a(f),this.manager.itemEnd(i),f.disposeOnDemandRenderer()},s,p=>{this.manager.itemError(i),typeof u=="function"&&u(p)}),f}}const Ho={apartment:"lebombo_1k.hdr",city:"potsdamer_platz_1k.hdr",dawn:"kiara_1_dawn_1k.hdr",forest:"forest_slope_1k.hdr",lobby:"st_fagans_interior_1k.hdr",night:"dikhololo_night_1k.hdr",park:"rooitou_park_1k.hdr",studio:"studio_small_03_1k.hdr",sunset:"venice_sunset_1k.hdr",warehouse:"empty_warehouse_01_1k.hdr"},jg="https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/",Ha=n=>Array.isArray(n),fd=["/px.png","/nx.png","/py.png","/ny.png","/pz.png","/nz.png"];function Al({files:n=fd,path:i="",preset:a=void 0,colorSpace:s=void 0,extensions:u}={}){a&&(dd(a),n=Ho[a],i=jg);const f=Ha(n),{extension:h,isCubemap:p}=pd(n),m=hd(h);if(!m)throw new Error("useEnvironment: Unrecognized file extension: "+n);const E=wi(w=>w.gl);Se.useLayoutEffect(()=>{if(h!=="webp"&&h!=="jpg"&&h!=="jpeg")return;function w(){Xa.clear(m,f?[n]:n)}E.domElement.addEventListener("webglcontextlost",w,{once:!0})},[n,E.domElement]);const y=Xa(m,f?[n]:n,w=>{(h==="webp"||h==="jpg"||h==="jpeg")&&w.setRenderer(E),w.setPath==null||w.setPath(i),u&&u(w)});let x=f?y[0]:y;if(h==="jpg"||h==="jpeg"||h==="webp"){var R;x=(R=x.renderTarget)==null?void 0:R.texture}return x.mapping=p?ea:Fo,x.colorSpace=s??(p?"srgb":"srgb-linear"),x}const z1={files:fd,path:"",preset:void 0,extensions:void 0};Al.preload=n=>{const i={...z1,...n};let{files:a,path:s=""}=i;const{preset:u,extensions:f}=i;u&&(dd(u),a=Ho[u],s=jg);const{extension:h}=pd(a);if(h==="webp"||h==="jpg"||h==="jpeg")throw new Error("useEnvironment: Preloading gainmaps is not supported");const p=hd(h);if(!p)throw new Error("useEnvironment: Unrecognized file extension: "+a);Xa.preload(p,Ha(a)?[a]:a,m=>{m.setPath==null||m.setPath(s),f&&f(m)})};const G1={files:fd,preset:void 0};Al.clear=n=>{const i={...G1,...n};let{files:a}=i;const{preset:s}=i;s&&(dd(s),a=Ho[s]);const{extension:u}=pd(a),f=hd(u);if(!f)throw new Error("useEnvironment: Unrecognized file extension: "+a);Xa.clear(f,Ha(a)?[a]:a)};function dd(n){if(!(n in Ho))throw new Error("Preset must be one of: "+Object.keys(Ho).join(", "))}function pd(n){var i;const a=Ha(n)&&n.length===6,s=Ha(n)&&n.length===3&&n.some(h=>h.endsWith("json")),u=Ha(n)?n[0]:n;return{extension:a?"cube":s?"webp":u.startsWith("data:application/exr")?"exr":u.startsWith("data:application/hdr")?"hdr":u.startsWith("data:image/jpeg")?"jpg":(i=u.split(".").pop())==null||(i=i.split("?"))==null||(i=i.shift())==null?void 0:i.toLowerCase(),isCubemap:a,isGainmap:s}}function hd(n){return n==="cube"?ag:n==="hdr"?b1:n==="exr"?M1:n==="jpg"||n==="jpeg"?H1:n==="webp"?k1:null}const V1=n=>n.current&&n.current.isScene,W1=n=>V1(n)?n.current:n;function md(n,i,a,s,u={}){var f,h,p,m;u={backgroundBlurriness:0,backgroundIntensity:1,backgroundRotation:[0,0,0],environmentIntensity:1,environmentRotation:[0,0,0],...u};const E=W1(i||a),y=E.background,x=E.environment,R={backgroundBlurriness:E.backgroundBlurriness,backgroundIntensity:E.backgroundIntensity,backgroundRotation:(f=(h=E.backgroundRotation)==null||h.clone==null?void 0:h.clone())!==null&&f!==void 0?f:[0,0,0],environmentIntensity:E.environmentIntensity,environmentRotation:(p=(m=E.environmentRotation)==null||m.clone==null?void 0:m.clone())!==null&&p!==void 0?p:[0,0,0]};return n!=="only"&&(E.environment=s),n&&(E.background=s),qr(E,u),()=>{n!=="only"&&(E.environment=x),n&&(E.background=y),qr(E,R)}}function vd({scene:n,background:i=!1,map:a,...s}){const u=wi(f=>f.scene);return Se.useLayoutEffect(()=>{if(a)return md(i,n,u,a,s)}),null}function $g({background:n=!1,scene:i,blur:a,backgroundBlurriness:s,backgroundIntensity:u,backgroundRotation:f,environmentIntensity:h,environmentRotation:p,...m}){const E=Al(m),y=wi(x=>x.scene);return Se.useLayoutEffect(()=>md(n,i,y,E,{backgroundBlurriness:a??s,backgroundIntensity:u,backgroundRotation:f,environmentIntensity:h,environmentRotation:p})),Se.useEffect(()=>()=>{E.dispose()},[E]),null}function X1({children:n,near:i=.1,far:a=1e3,resolution:s=256,frames:u=1,map:f,background:h=!1,blur:p,backgroundBlurriness:m,backgroundIntensity:E,backgroundRotation:y,environmentIntensity:x,environmentRotation:R,scene:w,files:F,path:O,preset:_=void 0,extensions:d}){const C=wi(W=>W.gl),N=wi(W=>W.scene),P=Se.useRef(null),[q]=Se.useState(()=>new xl),D=Se.useMemo(()=>{const W=new zf(s);return W.texture.type=On,W},[s]);Se.useEffect(()=>()=>{D.dispose()},[D]),Se.useLayoutEffect(()=>{if(u===1){const W=C.autoClear;C.autoClear=!0,P.current.update(C,q),C.autoClear=W}return md(h,w,N,D.texture,{backgroundBlurriness:p??m,backgroundIntensity:E,backgroundRotation:y,environmentIntensity:x,environmentRotation:R})},[n,q,D.texture,w,N,h,u,C]);let V=1;return Wo(()=>{if(u===1/0||V<u){const W=C.autoClear;C.autoClear=!0,P.current.update(C,q),C.autoClear=W,V++}}),Se.createElement(Se.Fragment,null,jC(Se.createElement(Se.Fragment,null,n,Se.createElement("cubeCamera",{ref:P,args:[i,a,D]}),F||_?Se.createElement($g,{background:!0,files:F,preset:_,path:O,extensions:d}):f?Se.createElement(vd,{background:!0,map:f,extensions:d}):null),q))}function q1(n){var i,a,s,u;const f=Al(n),h=n.map||f;Se.useMemo(()=>Ag({GroundProjectedEnvImpl:_1}),[]),Se.useEffect(()=>()=>{f.dispose()},[f]);const p=Se.useMemo(()=>[h],[h]),m=(i=n.ground)==null?void 0:i.height,E=(a=n.ground)==null?void 0:a.radius,y=(s=(u=n.ground)==null?void 0:u.scale)!==null&&s!==void 0?s:1e3;return Se.createElement(Se.Fragment,null,Se.createElement(vd,Wa({},n,{map:h})),Se.createElement("groundProjectedEnvImpl",{args:p,scale:y,height:m,radius:E}))}function Y1(n){return n.ground?Se.createElement(q1,n):n.map?Se.createElement(vd,n):n.children?Se.createElement(X1,n):Se.createElement($g,n)}const j1=Se.forwardRef(({scale:n=10,frames:i=1/0,opacity:a=1,width:s=1,height:u=1,blur:f=1,near:h=0,far:p=10,resolution:m=512,smooth:E=!0,color:y="#000000",depthWrite:x=!1,renderOrder:R,...w},F)=>{const O=Se.useRef(null),_=wi(K=>K.scene),d=wi(K=>K.gl),C=Se.useRef(null);s=s*(Array.isArray(n)?n[0]:n||1),u=u*(Array.isArray(n)?n[1]:n||1);const[N,P,q,D,V,W,M]=Se.useMemo(()=>{const K=new Dr(m,m),se=new Dr(m,m);se.texture.generateMipmaps=K.texture.generateMipmaps=!1;const ne=new qa(s,u).rotateX(Math.PI/2),be=new pr(ne),oe=new Pf;oe.depthTest=oe.depthWrite=!1,oe.onBeforeCompile=et=>{et.uniforms={...et.uniforms,ucolor:{value:new Zt(y)}},et.fragmentShader=et.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),et.fragmentShader=et.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const Ue=new nr(S1),Le=new nr(E1);return Le.depthTest=Ue.depthTest=!1,[K,ne,oe,be,Ue,Le,se]},[m,s,u,n,y]),T=K=>{D.visible=!0,D.material=V,V.uniforms.tDiffuse.value=N.texture,V.uniforms.h.value=K*1/256,d.setRenderTarget(M),d.render(D,C.current),D.material=W,W.uniforms.tDiffuse.value=M.texture,W.uniforms.v.value=K*1/256,d.setRenderTarget(N),d.render(D,C.current),D.visible=!1};let z=0,j,Q;return Wo(()=>{C.current&&(i===1/0||z<i)&&(z++,j=_.background,Q=_.overrideMaterial,O.current.visible=!1,_.background=null,_.overrideMaterial=q,d.setRenderTarget(N),d.render(_,C.current),T(f),E&&T(f*.4),d.setRenderTarget(null),O.current.visible=!0,_.overrideMaterial=Q,_.background=j)}),Se.useImperativeHandle(F,()=>O.current,[]),Se.createElement("group",Wa({"rotation-x":Math.PI/2},w,{ref:O}),Se.createElement("mesh",{renderOrder:R,geometry:P,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},Se.createElement("meshBasicMaterial",{transparent:!0,map:N.texture,opacity:a,depthWrite:x})),Se.createElement("orthographicCamera",{ref:C,args:[-s/2,s/2,u/2,-u/2,h,p]}))}),Ic=Se.forwardRef(({light:n,args:i,map:a,toneMapped:s=!1,color:u="white",form:f="rect",intensity:h=1,scale:p=1,target:m=[0,0,0],children:E,...y},x)=>{const R=Se.useRef(null);return Se.useImperativeHandle(x,()=>R.current,[]),Se.useLayoutEffect(()=>{!E&&!y.material&&(qr(R.current.material,{color:u}),R.current.material.color.multiplyScalar(h))},[u,h,E,y.material]),Se.useLayoutEffect(()=>{y.rotation||R.current.quaternion.identity(),m&&!y.rotation&&(typeof m=="boolean"?R.current.lookAt(0,0,0):R.current.lookAt(Array.isArray(m)?new yt(...m):m))},[m,y.rotation]),p=Array.isArray(p)&&p.length===2?[p[0],p[1],1]:p,Se.createElement("mesh",Wa({ref:R,scale:p},y),f==="circle"?Se.createElement("ringGeometry",{args:i||[0,.5,64]}):f==="ring"?Se.createElement("ringGeometry",{args:i||[.25,.5,64]}):f==="rect"||f==="plane"?Se.createElement("planeGeometry",{args:i||[1,1]}):f==="box"?Se.createElement("boxGeometry",{args:i||[1,1,1]}):Se.createElement(f,{args:i}),E||Se.createElement("meshBasicMaterial",{toneMapped:s,map:a,side:dr}),n&&Se.createElement("pointLight",Wa({castShadow:!0},n)))}),$1=Se.createContext(null);function K1({iterations:n=10,ms:i=250,threshold:a=.75,step:s=.1,factor:u=.5,flipflops:f=1/0,bounds:h=R=>R>100?[60,100]:[40,60],onIncline:p,onDecline:m,onChange:E,onFallback:y,children:x}){const R=Math.pow(10,0),[w,F]=Se.useState(()=>({fps:0,index:0,factor:u,flipped:0,refreshrate:0,fallback:!1,frames:[],averages:[],subscriptions:new Map,subscribe:_=>{const d=Symbol();return w.subscriptions.set(d,_.current),()=>{w.subscriptions.delete(d)}}}));let O=0;return Wo(()=>{const{frames:_,averages:d}=w;if(!w.fallback&&d.length<n){_.push(performance.now());const C=_[_.length-1]-_[0];if(C>=i){if(w.fps=Math.round(_.length/C*1e3*R)/R,w.refreshrate=Math.max(w.refreshrate,w.fps),d[w.index++%n]=w.fps,d.length===n){const[N,P]=h(w.refreshrate),q=d.filter(V=>V>=P),D=d.filter(V=>V<N);q.length>n*a&&(w.factor=Math.min(1,w.factor+s),w.flipped++,p&&p(w),w.subscriptions.forEach(V=>V.onIncline&&V.onIncline(w))),D.length>n*a&&(w.factor=Math.max(0,w.factor-s),w.flipped++,m&&m(w),w.subscriptions.forEach(V=>V.onDecline&&V.onDecline(w))),O!==w.factor&&(O=w.factor,E&&E(w),w.subscriptions.forEach(V=>V.onChange&&V.onChange(w))),w.flipped>f&&!w.fallback&&(w.fallback=!0,y&&y(w),w.subscriptions.forEach(V=>V.onFallback&&V.onFallback(w))),w.averages=[]}w.frames=[]}}}),Se.createElement($1.Provider,{value:w},x)}const ii={x:0,y:0,source:"none"};let $m=0,Lc=null;function Z1(){const n=u=>{ii.x=u.clientX/window.innerWidth*2-1,ii.y=u.clientY/window.innerHeight*2-1,ii.source="mouse"},i=u=>{u.gamma==null||u.beta==null||(ii.x=Math.max(-1,Math.min(1,u.gamma/30)),ii.y=Math.max(-1,Math.min(1,(u.beta-45)/30)),ii.source="gyro")},a=()=>{const u=window.DeviceOrientationEvent;u&&typeof u.requestPermission=="function"&&u.requestPermission().then(f=>f==="granted"&&window.addEventListener("deviceorientation",i)).catch(()=>{}),window.removeEventListener("touchend",a)};return window.addEventListener("pointermove",n,{passive:!0}),typeof window.DeviceOrientationEvent?.requestPermission=="function"?window.addEventListener("touchend",a,{passive:!0}):window.addEventListener("deviceorientation",i),()=>{window.removeEventListener("pointermove",n),window.removeEventListener("deviceorientation",i),window.removeEventListener("touchend",a)}}function Q1(){return Se.useEffect(()=>($m++===0&&(Lc=Z1()),()=>{--$m===0&&Lc&&Lc()}),[]),ii}const $s=n=>Math.min(1,Math.max(0,n)),Km=n=>n*n*(3-2*n);function J1(n,i){return Se.useMemo(()=>{const a=VT[n],s=i==="low"?8:18,u=new hf(GT(a),{depth:a.W-.16,bevelEnabled:!0,bevelThickness:.08,bevelSize:.07,bevelSegments:i==="low"?2:5,curveSegments:s});u.translate(0,0,-(a.W-.16)/2),u.computeVertexNormals();const f=new hf(WT(a),{depth:a.W*.8,bevelEnabled:!0,bevelThickness:.06,bevelSize:.05,bevelSegments:i==="low"?2:4,curveSegments:s});return f.translate(0,0,-(a.W*.8)/2),{p:a,body:u,cabin:f}},[n,i])}function eP({R:n,side:i,spin:a,mats:s,quality:u}){const f=u==="low"?16:32;return ze.jsx("group",{rotation:[Math.PI/2,0,0],scale:[1,i,1],children:ze.jsxs("group",{ref:a,children:[ze.jsx("mesh",{material:s.tire,castShadow:!0,children:ze.jsx("cylinderGeometry",{args:[n,n,.26,f]})}),ze.jsx("mesh",{material:s.rim,position:[0,-.135,0],children:ze.jsx("cylinderGeometry",{args:[n*.64,n*.64,.02,f]})}),[0,1,2,3,4].map(h=>ze.jsx("mesh",{material:s.chrome,position:[0,-.15,0],rotation:[0,h*Math.PI*2/5,0],children:ze.jsx("boxGeometry",{args:[.06,.03,n*1.2]})},h)),ze.jsx("mesh",{material:s.chrome,position:[0,-.16,0],children:ze.jsx("cylinderGeometry",{args:[n*.16,n*.16,.03,16]})})]})})}function tP({profilId:n,color:i,lightsOn:a,quality:s,slide:u,spinRefs:f}){const{p:h,body:p,cabin:m}=J1(n,s),[E]=Se.useState(()=>new vf({color:i,metalness:.55,roughness:.28,clearcoat:1,clearcoatRoughness:.08})),y=Se.useMemo(()=>({glass:new vf({color:"#0d1117",metalness:.6,roughness:.05,clearcoat:1}),tire:new qi({color:"#141414",roughness:.9}),rim:new qi({color:"#2a2d33",metalness:.8,roughness:.35}),chrome:new qi({color:"#dfe3e8",metalness:1,roughness:.12}),head:new qi({color:"#ffffff",emissive:"#fff6e0",emissiveIntensity:0}),tail:new qi({color:"#5a0000",emissive:"#ff1a1a",emissiveIntensity:.4}),trim:new qi({color:"#0b0b0c",roughness:.6})}),[]),x=Se.useMemo(()=>new Zt(i),[i]),R=Se.useRef([]);Wo((O,_)=>{E.color.lerp(x,Math.min(1,_*4));const d=a.current;y.head.emissiveIntensity+=((d?3:.15)-y.head.emissiveIntensity)*Math.min(1,_*5),y.tail.emissiveIntensity+=((d?1.6:.4)-y.tail.emissiveIntensity)*Math.min(1,_*5),R.current.forEach(C=>C&&(C.material.opacity=Math.max(0,y.head.emissiveIntensity-.15)*.03))});const w=h.L/2,F=h.W/2-.12;return ze.jsxs("group",{ref:u,children:[ze.jsx("mesh",{geometry:p,material:E,castShadow:!0,receiveShadow:!0}),ze.jsx("mesh",{geometry:m,material:y.glass,castShadow:!0}),ze.jsx("mesh",{material:y.trim,position:[0,h.sill+.02,0],children:ze.jsx("boxGeometry",{args:[h.L*.55,.08,h.W+.02]})}),[-1,1].map(O=>ze.jsxs("group",{children:[ze.jsx("mesh",{material:y.head,position:[w-.02,h.hood-.13,O*(F-.12)],children:ze.jsx("boxGeometry",{args:[.12,.09,.34]})}),ze.jsxs("mesh",{ref:_=>R.current[O>0?0:1]=_,position:[w+1.6,h.hood-.3,O*(F-.12)],rotation:[0,0,Math.PI/2],children:[ze.jsx("coneGeometry",{args:[.7,3.2,24,1,!0]}),ze.jsx("meshBasicMaterial",{color:"#fff1d6",transparent:!0,opacity:0,blending:fl,depthWrite:!1,side:dr})]}),ze.jsx("mesh",{material:y.tail,position:[h.body?-w-.06:-w-.03,h.belt-.12,O*(F-.08)],children:ze.jsx("boxGeometry",{args:[.08,.1,.36]})})]},O)),[-1,1].map(O=>ze.jsx("mesh",{material:E,position:[h.cabin[3][0]-.12,h.belt+.08,O*(h.W/2+.05)],children:ze.jsx("boxGeometry",{args:[.16,.1,.12]})},"m"+O)),h.wheels.map((O,_)=>[-1,1].map(d=>ze.jsx("group",{position:[O,h.R,d*(h.W/2-.08)],children:ze.jsx(eP,{R:h.R,side:-d,spin:C=>f.current[_*2+(d>0?1:0)]=C,mats:y,quality:s})},`${_}${d}`)))]})}function nP({modelId:n,color:i,progress:a,reduced:s,quality:u,drag:f}){const h=Se.useRef(),p=Se.useRef(),m=Se.useRef([]),E=Se.useRef(!1),[y,x]=Se.useState(n),R=Se.useRef({phase:"idle",t:0}),w=Se.useRef({x:0,y:0}),F=Se.useRef(-.6),{camera:O,viewport:_}=wi();Q1(),Se.useEffect(()=>{n!==y&&(s?x(n):R.current={phase:"out",t:0})},[n,y,s]),Wo((C,N)=>{const P=Math.min(N,.05),q=s?0:a.current,D=R.current;let V=0,W=0;if(D.phase==="out")D.t+=P/.55,V=-Math.pow($s(D.t),2)*9,W=14*D.t,D.t>=1&&(x(n),R.current={phase:"in",t:0});else if(D.phase==="in"){D.t+=P/.8;const Q=1-Math.pow(1-$s(D.t),3);V=(1-Q)*9,W=14*(1-Q),D.t>=1&&(R.current={phase:"idle",t:0})}p.current&&(p.current.position.x=V),m.current.forEach(Q=>Q&&(Q.rotation.y-=W*P)),!s&&!f.current.active&&D.phase==="idle"&&(F.current+=P*(.25-Km($s(q*1.6))*.2)),F.current+=f.current.delta,f.current.delta*=.85,h.current&&(h.current.rotation.y=F.current),E.current=q>.35||s;const M=w.current;M.x+=((s?0:ii.x)-M.x)*.05,M.y+=((s?0:ii.y)-M.y)*.05;const T=_.aspect<1,z=T?19:_.aspect<1.3?13:11.5,j=Km($s(q*1.4));O.position.set(M.x*1.4,2.6-j*.9+M.y*.5,z-j*(T?1:2.2)),O.lookAt(0,_.aspect<1?1.1:.9,0)});const d=2.9;return ze.jsxs("group",{children:[ze.jsxs("group",{ref:h,children:[ze.jsxs("mesh",{position:[0,-.04,0],receiveShadow:!0,children:[ze.jsx("cylinderGeometry",{args:[d,d,.08,u==="low"?48:96]}),ze.jsx("meshStandardMaterial",{color:"#141416",metalness:.6,roughness:.25})]}),ze.jsx(tP,{profilId:y,color:i,lightsOn:E,quality:u,slide:p,spinRefs:m})]}),ze.jsxs("mesh",{position:[0,.005,0],rotation:[-Math.PI/2,0,0],children:[ze.jsx("ringGeometry",{args:[d+.02,d+.08,96]}),ze.jsx("meshBasicMaterial",{color:"#e10600",toneMapped:!1})]}),ze.jsxs("mesh",{position:[0,-.09,0],rotation:[-Math.PI/2,0,0],receiveShadow:!0,children:[ze.jsx("circleGeometry",{args:[14,64]}),ze.jsx("meshStandardMaterial",{color:"#0b0b0c",roughness:.5,metalness:.3})]}),u!=="low"&&ze.jsx(j1,{position:[0,.002,0],scale:9,blur:2.2,opacity:.75,far:2.5,frames:1/0,resolution:256})]})}function oP({modelId:n,color:i,progress:a,reduced:s,tier:u,active:f,onReady:h,drag:p}){const[m,E]=Se.useState(u==="low"),y=m?"low":"high";return ze.jsxs(r1,{className:"!absolute inset-0",dpr:m?1:u==="high"?1.75:1.5,frameloop:f?s?"demand":"always":"never",shadows:!m,camera:{position:[0,2.1,8.6],fov:32},gl:{antialias:!m,alpha:!0,powerPreference:"high-performance"},onCreated:()=>h?.(),"aria-hidden":"true",children:[ze.jsx(K1,{onDecline:()=>E(!0)}),ze.jsx("fog",{attach:"fog",args:["#0a0a0b",12,26]}),ze.jsx("hemisphereLight",{args:["#ffffff","#111111",.5]}),ze.jsx("directionalLight",{position:[4,7,5],intensity:2.2,castShadow:!m,"shadow-mapSize":[1024,1024]}),ze.jsx("spotLight",{position:[-6,5,-4],angle:.5,penumbra:1,intensity:60,color:"#ff2a1a",distance:20}),ze.jsxs(Y1,{resolution:m?32:128,frames:1,children:[ze.jsx(Ic,{form:"rect",intensity:4,color:"#ffffff",position:[0,6,0],"rotation-x":Math.PI/2,scale:[10,3,1]}),ze.jsx(Ic,{form:"rect",intensity:2,color:"#ffffff",position:[-6,2,3],scale:[3,6,1]}),ze.jsx(Ic,{form:"rect",intensity:1.5,color:"#ff3b2e",position:[6,1.5,-2],scale:[2,5,1]})]}),ze.jsx(nP,{modelId:n,color:i,progress:a,reduced:s,quality:y,drag:p})]})}export{oP as default};
