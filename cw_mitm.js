;(function(){
if(!window.CW_MODULES)window.CW_MODULES={};
window.CW_MODULES['Man-in-the-Middle']={
icon:"👁",cat:"Network Attack",col:"#66ccff",
explain:["ATTACK: MITM  |  OCR 1.3.3(c) + 1.3.1(c)","━━━━━━━━━━━━━━━━━━━━━",
  "Attacker positions between client and server — reading all traffic silently.",
  "OCR 1.3.1(c): TLS/HTTPS encrypts traffic — intercepted packets are unreadable ciphertext.",
  "TLS certificates verify server identity, preventing fake servers."],
mutations:[
  {name:"State wiretap",label:"🏴 STATE WIRETAP",escMulti:1.6,spreadMult:1.8,userMult:2.0},
  {name:"Rogue hotspot",label:"📡 ROGUE WIFI",escMulti:1.1,spreadMult:1.4,userMult:1.3},
  {name:"ARP spoof tool",label:"🎲 ARP SPOOF",escMulti:0.8,spreadMult:0.6,userMult:0.8}],
scenarios:[
 {id:"arp_poisoning",name:"ARP Poisoning Attack",short:"Rogue device intercepting all LAN traffic silently",
  escs:["ARP poisoning on LAN — all traffic being intercepted",
        "Session cookies being harvested — accounts hijacked",
        "FINANCIAL TRANSACTIONS INTERCEPTED and silently modified"],
  escR:30,uMin:200,uMax:5000,spread:"Credential Stuffing",
  responses:[
   {id:"vlan_segment",name:"VLAN Network Segmentation",team:"network",baseDuration:25,
    ocrRef:"1.3.3(c)",effectiveness:90,scorePts:80,
    description:"Segment the affected VLAN to isolate the rogue device and prevent further interception.",
    duringRisk:"Interception continues until segmentation is applied.",
    narrative:[
      "Network Team implementing VLAN segmentation to contain ARP poisoning...",
      "ARP poisoning sends fake MAC-to-IP mappings — traffic flows through attacker (1.3.3c).",
      "Rogue device identified by MAC address: aa:bb:cc:11:22:33 on VLAN 14.",
      "VLAN 14 segmented. Rogue device isolated. Traffic routing corrected.",
      "HTTPS/TLS would have protected traffic even if interception occurred — session tokens encrypted.",
      "ARP inspection enabled. Future ARP spoofing attempts will be detected."],
    complications:[{at:.5,chance:.2,msg:"Rogue device moved to different switch port — extended tracking",extraTime:.35}],
    earlyFinish:{chance:.1,msg:"Rogue device had unique vendor fingerprint — quick identification"}},
   {id:"analyst_tls",name:"Enforce HTTPS/TLS Policy (YOU)",team:"analyst",baseDuration:40,
    ocrRef:"1.3.1(c)",effectiveness:100,scorePts:125,
    description:"Configure HSTS and certificate pinning so intercepted traffic is useless to attackers.",
    duringRisk:"You are unavailable for ~40 seconds.",
    narrative:["Auditing HTTPS enforcement policy across all services...","Configuring HSTS headers and certificate pinning..."],
    complications:[],earlyFinish:{chance:.15,msg:"HSTS already partially configured — quick completion"},
    analystChallenge:{
      context:"A MITM attack is intercepting traffic. If HTTPS/TLS were properly enforced, intercepted traffic would be useless to attackers — just unreadable ciphertext. What protocol creates the encrypted tunnel that defeats MITM?",
      question:"What protocol (and its predecessor) creates an ENCRYPTED TUNNEL between client and server, making MITM interception useless?\n\nType the acronym (the 'S' in HTTPS):",
      ocrLink:"OCR 1.3.1(c): TLS (Transport Layer Security) is the cryptographic protocol that secures HTTPS connections. It provides: ENCRYPTION (data unreadable in transit), AUTHENTICATION (server's identity verified via certificate), and INTEGRITY (data cannot be modified without detection). A certificate authority vouches for the server's public key — preventing fake servers.",
      hint1:"It's the protocol that makes the 'S' in HTTPS — the secure version of HTTP.",
      hint2:"HTTP = plain text. HTTPS = HTTP + ___ (3-letter acronym for the encryption layer).",
      hint3:"TLS — Transport Layer Security. It encrypts the connection between browser and server, so even if a MITM intercepts packets, all they see is ciphertext.",
      fullAnswer:"TLS",
      checkFn:(s)=>s.trim().toUpperCase()==="TLS"||s.trim().toUpperCase()==="SSL"||s.toLowerCase().includes("transport layer")||s.toLowerCase().includes("secure socket")}}]},

 {id:"ssl_stripping",name:"SSL Stripping Attack",short:"HTTPS silently downgraded to HTTP — encryption removed",
  escs:["SSL stripping proxy detected — HTTPS being downgraded",
        "Login credentials transmitted in plaintext",
        "BANKING SESSION TOKENS STOLEN — accounts accessed in real time"],
  escR:28,uMin:100,uMax:8000,spread:"Credential Stuffing",
  responses:[
   {id:"enforce_hsts",name:"Deploy HSTS Headers",team:"network",baseDuration:16,
    ocrRef:"1.3.1(c)",effectiveness:95,scorePts:80,
    description:"Deploy HTTP Strict Transport Security headers — browsers will refuse to connect via HTTP.",
    duringRisk:"Users actively being stripped continue to be vulnerable until HSTS propagates.",
    narrative:[
      "SSL stripping removes HTTPS — users think they're secure but traffic is plaintext.",
      "HSTS (HTTP Strict Transport Security) tells browsers: ONLY connect via HTTPS, ever.",
      "Browsers cache HSTS policy — future HTTP connections are automatically upgraded.",
      "With HSTS, SSL stripping becomes impossible — browsers refuse the downgrade.",
      "HSTS deployed. SSL stripping neutralised."],
    complications:[{at:.4,chance:.2,msg:"HSTS requires browser cache to propagate — some users still at risk",extraTime:.3}],
    earlyFinish:{chance:.15,msg:"HSTS header pre-configured — quick deployment"}}]}
]};
})();
