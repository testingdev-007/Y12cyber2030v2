;(function(){
if(!window.CW_MODULES)window.CW_MODULES={};
window.CW_MODULES['Social Engineering']={
icon:"🎭",cat:"Social Engineering",col:"#ffdd66",
explain:["ATTACK: SOCIAL ENGINEERING  |  OCR 1.3.3(c)","━━━━━━━━━━━━━━━━━━━━━",
  "Attackers impersonate IT support or executives to trick staff into giving credentials.",
  "Exploits human psychology — people are naturally helpful and trusting of authority.",
  "OCR 1.3.3(c): social engineering is explicitly listed as a network threat."],
mutations:[
  {name:"Well-researched",label:"🔍 OSINT-DRIVEN",escMulti:1.4,spreadMult:1.5,userMult:1.0},
  {name:"Insider accomplice",label:"🤝 INSIDER",escMulti:1.6,spreadMult:1.4,userMult:1.2},
  {name:"Cold caller",label:"🎲 COLD CALLER",escMulti:0.7,spreadMult:0.5,userMult:0.8}],
scenarios:[
 {id:"helpdesk_vishing",name:"IT Helpdesk Vishing",short:"Phone call impersonating IT support — requesting credentials",
  escs:["Suspicious IT helpdesk calls requesting password resets",
        "Three employees gave credentials to caller claiming to be IT",
        "VPN ACCESS GRANTED — internal network compromised"],
  escR:35,uMin:50,uMax:2000,spread:"Phishing",
  responses:[
   {id:"security_alert",name:"Urgent Security Broadcast",team:"identity",baseDuration:10,
    ocrRef:"1.3.3(c)",effectiveness:85,scorePts:65,
    description:"Broadcast an immediate all-staff security alert: IT will NEVER ask for passwords by phone.",
    duringRisk:"Staff already on a call with the attacker remain vulnerable.",
    narrative:[
      "Identity Team broadcasting urgent security alert to all staff...",
      "Vishing (voice phishing) exploits trust in authority — a core social engineering technique.",
      "OCR 1.3.3(c): social engineering attacks humans, not systems. Training is the primary defence.",
      "Alert: 'IT will NEVER ask for your password. If someone calls asking for it — hang up and report it.'",
      "Callback verification protocol activated: all IT calls must be verified via known-good number."],
    complications:[{at:.4,chance:.15,msg:"Alert sent to email only — some staff not at computers",extraTime:.25}],
    earlyFinish:{chance:.2,msg:"Quick broadcast via Teams and email — wide coverage instantly"}},
   {id:"lockout_accounts",name:"Lock Compromised Accounts",team:"identity",baseDuration:18,
    ocrRef:"1.3.3(c)",effectiveness:80,scorePts:60,
    description:"Lock all accounts that may have been given to the caller, forcing out any active attacker sessions.",
    duringRisk:"Attacker may complete their objective before lockout is applied.",
    narrative:[
      "Identifying accounts that may have been disclosed to the caller...",
      "Locking 3 confirmed accounts. Active sessions terminated.",
      "Sending out-of-band notifications to affected users.",
      "New credentials issued via verified in-person process only."],
    complications:[{at:.5,chance:.2,msg:"One account used to create further accounts — extended audit",extraTime:.3}],
    earlyFinish:{chance:.1,msg:"Quick identification of affected accounts from call logs"}},
   {id:"analyst_policy",name:"Update Verification Policy (YOU)",team:"analyst",baseDuration:35,
    ocrRef:"1.3.3(c)",effectiveness:100,scorePts:115,
    description:"Rewrite the IT verification policy to make social engineering structurally impossible to succeed.",
    duringRisk:"You are unavailable for ~35 seconds.",
    narrative:["Reviewing current IT helpdesk verification procedures..."],
    complications:[],earlyFinish:{chance:.15,msg:"Policy template already existed — quick adaptation"},
    analystChallenge:{
      context:"Social engineering attacks exploit human psychology. The attacker called pretending to be from IT and convinced staff to share their passwords.",
      question:"Social engineering attacks HUMAN _________ rather than software vulnerabilities.\n\nType the one-word answer:",
      ocrLink:"OCR 1.3.3(c): Social engineering is the manipulation of people into performing actions or disclosing confidential information. It exploits human PSYCHOLOGY — specifically trust, authority, urgency and fear. Technical defences (firewalls, encryption) cannot stop social engineering because it bypasses technology entirely.",
      hint1:"It's what makes people feel trust, urgency or fear — all emotions used in social engineering.",
      hint2:"Not software, not hardware — social engineering targets the human _________ (mind/behaviour).",
      hint3:"PSYCHOLOGY — social engineering exploits human psychology: trust in authority, natural helpfulness, fear of consequences.",
      fullAnswer:"psychology",
      checkFn:(s)=>s.trim().toLowerCase().includes("psych")||s.trim().toLowerCase().includes("mind")||s.trim().toLowerCase().includes("behaviour")}}]},

 {id:"ceo_fraud",name:"CEO Fraud / BEC",short:"Executive impersonation requesting urgent wire transfer",
  escs:["CEO email impersonation — urgent wire transfer to unknown account",
        "Finance manager processing £180,000 transfer",
        "£180,000 TRANSFERRED — funds already moved to cryptocurrency"],
  escR:28,uMin:1,uMax:10,spread:"Phishing",
  responses:[
   {id:"warn_finance",name:"Alert Finance Team",team:"identity",baseDuration:8,
    ocrRef:"1.3.3(c)",effectiveness:90,scorePts:70,
    description:"Call the finance team directly and warn them of the CEO fraud attempt.",
    duringRisk:"Transfer may be processed before the warning reaches the right person.",
    narrative:[
      "BEC (Business Email Compromise) is a £3B/year crime — OCR 1.3.3(c).",
      "Identity Team calling finance director's personal mobile — bypassing compromised email.",
      "Finance manager warned. Transfer cancelled. CEO impersonation domain blocked.",
      "Dual-authorisation policy for transfers over £10,000 implemented."],
    complications:[{at:.3,chance:.3,msg:"Finance director travelling, finance manager already approved — rushing to halt",extraTime:.4}],
    earlyFinish:{chance:.2,msg:"Finance team was suspicious — quick confirmation appreciated"}}]}
]};
})();
