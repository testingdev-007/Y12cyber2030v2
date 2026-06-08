;(function(){
if(!window.CW_MODULES)window.CW_MODULES={};
window.CW_MODULES['DNS Poisoning']={
icon:"☣",cat:"Network Attack",col:"#44ffcc",
explain:["ATTACK: DNS POISONING  |  OCR 1.3.3(b) + 1.3.3(c)","━━━━━━━━━━━━━━━━━━━━━",
  "DNS translates domain names to IPs. Poisoning injects fake records — users reach attacker servers.",
  "DNSSEC uses digital signatures to authenticate DNS responses.",
  "Users type bank.com, poisoned DNS says: go to 193.27.x.x (attacker's fake site)."],
mutations:[
  {name:"ISP-level",label:"🌐 ISP COMPROMISE",escMulti:1.7,spreadMult:2.0,userMult:3.0},
  {name:"Router hack",label:"📡 ROUTER HACK",escMulti:1.3,spreadMult:1.4,userMult:1.5},
  {name:"Local cache",label:"🎲 LOCAL CACHE",escMulti:0.7,spreadMult:0.5,userMult:0.6}],
scenarios:[
 {id:"cache_poisoning",name:"DNS Cache Poisoning",short:"Corporate DNS resolver injected with fake records",
  escs:["Corporate DNS cache poisoned — fake records active",
        "Staff silently redirected to credential-harvesting sites",
        "BANKING CREDENTIALS HARVESTED — 2,400 accounts compromised"],
  escR:25,uMin:500,uMax:20000,spread:"Phishing",
  responses:[
   {id:"flush_deploy",name:"Flush Cache + Deploy DNSSEC",team:"network",baseDuration:22,
    ocrRef:"1.3.3(c)",effectiveness:100,scorePts:85,
    description:"Flush all poisoned DNS cache entries and deploy DNSSEC to prevent future poisoning.",
    duringRisk:"Users remain redirected to fake sites until cache is flushed.",
    narrative:[
      "DNS poisoning redirects users to fake sites without them knowing (1.3.3c).",
      "STEP 1: Flushing poisoned DNS cache entries across all corporate resolvers.",
      "All DNS records cleared. Users will now receive fresh, legitimate responses.",
      "STEP 2: Deploying DNSSEC — digital signatures on all DNS records.",
      "DNSSEC allows DNS resolvers to verify records are authentic and unmodified.",
      "Cache poisoning is now impossible — all responses cryptographically verified."],
    complications:[{at:.5,chance:.2,msg:"DNSSEC key rollover required — extending deployment",extraTime:.3}],
    earlyFinish:{chance:.1,msg:"DNSSEC pre-configured — quick activation"}},
   {id:"analyst_dnssec",name:"Configure DNSSEC Policy (YOU)",team:"analyst",baseDuration:40,
    ocrRef:"1.3.3(c)",effectiveness:100,scorePts:120,
    description:"Configure the full DNSSEC chain of trust for the organisation's domains.",
    duringRisk:"You are unavailable for ~40 seconds.",
    narrative:["Setting up DNSSEC key pairs and signing zones..."],
    complications:[],earlyFinish:{chance:.15,msg:"Domain already DNSSEC-ready — quick key deployment"},
    analystChallenge:{
      context:"DNS cache poisoning injects fake records into DNS resolvers. DNSSEC prevents this using cryptographic authentication.",
      question:"DNSSEC prevents DNS poisoning by adding _________ signatures to DNS records, proving they haven't been tampered with.\n\nType the one-word answer:",
      ocrLink:"OCR 1.3.3(c): DNSSEC (DNS Security Extensions) uses PUBLIC KEY CRYPTOGRAPHY to digitally sign DNS records. Each DNS zone has a key pair — the private key signs records, the public key verifies them. Resolvers check the digital signature before trusting a DNS response, making injected fake records detectable.",
      hint1:"It's a type of cryptographic verification — proves a record came from the legitimate source.",
      hint2:"DNSSEC uses the same concept as email authentication and HTTPS certificates: _________ signatures.",
      hint3:"DIGITAL signatures — DNSSEC adds digital signatures to DNS records so resolvers can verify authenticity. Poisoned records won't have a valid signature.",
      fullAnswer:"digital",
      checkFn:(s)=>s.trim().toLowerCase().includes("digital")||s.trim().toLowerCase().includes("cryptograph")}}]},

 {id:"router_dns",name:"Home Router DNS Hijack",short:"ISP router firmware compromised — DNS redirected",
  escs:["Home routers with default passwords — DNS changed remotely",
        "60,000 home users redirected to phishing infrastructure",
        "MASS CREDENTIAL HARVEST — banking and email logins stolen"],
  escR:20,uMin:5000,uMax:100000,spread:"Credential Stuffing",
  responses:[
   {id:"notify_isp",name:"Coordinate with ISP",team:"network",baseDuration:30,
    ocrRef:"1.3.3(c)",effectiveness:90,scorePts:75,
    description:"Work with the ISP to push corrective DNS settings to affected routers and notify customers.",
    duringRisk:"Affected users continue to reach fake sites during remediation.",
    narrative:[
      "Router DNS hijack exploits default/weak admin passwords on home routers.",
      "OCR 1.3.3(c): default credentials are a known attack vector — change them always.",
      "Coordinating with ISP to push emergency DNS reset via ISP management channel.",
      "60,000 routers being patched remotely. Default password change forced on all affected."],
    complications:[{at:.5,chance:.25,msg:"Some routers have outdated firmware preventing remote reset",extraTime:.4}],
    earlyFinish:{chance:.1,msg:"ISP had emergency protocol — faster than expected rollout"}}]}
]};
})();
