;(function(){
if(!window.CW_MODULES)window.CW_MODULES={};
window.CW_MODULES['Zero-Day']={
icon:"☢",cat:"Advanced Exploit",col:"#ff88aa",
explain:["ATTACK: ZERO-DAY  |  OCR 1.3.3(c)","━━━━━━━━━━━━━━━━━━━━━",
  "Zero-day: unknown vulnerability — zero days since vendor was informed. No patch exists.",
  "Standard signature-based AV fails — it matches KNOWN patterns only.",
  "Defence in depth: multiple independent layers mean one flaw doesn't compromise everything."],
mutations:[
  {name:"Nation-state APT",label:"🏴 STATE-SPONSORED",escMulti:1.8,spreadMult:2.5,userMult:1.8},
  {name:"Criminal group",label:"💰 CRIMINAL GROUP",escMulti:1.4,spreadMult:1.6,userMult:1.4},
  {name:"Opportunistic",label:"🎲 OPPORTUNISTIC",escMulti:0.8,spreadMult:0.6,userMult:0.9}],
scenarios:[
 {id:"vpn_zeroday",name:"VPN Appliance Zero-Day",short:"Critical flaw in edge VPN device — perimeter breached",
  escs:["ZERO-DAY: VPN appliance flaw being actively exploited",
        "Attacker authenticated to internal network via VPN",
        "LATERAL MOVEMENT: attacker accessing internal servers"],
  escR:11,uMin:500,uMax:30000,spread:"Trojan Backdoor",
  responses:[
   {id:"isolate_vpn",name:"Isolate VPN Appliance",team:"security",baseDuration:15,
    ocrRef:"1.3.3(c)",effectiveness:85,scorePts:75,
    description:"Take the vulnerable VPN appliance offline — stop the exploit at the cost of remote access.",
    duringRisk:"Remote workers lose access until VPN is restored. Attack continues until fully isolated.",
    narrative:[
      "Security Ops taking VPN appliance offline...",
      "Zero-day: no patch exists yet — ISOLATION is the only defence (1.3.3c).",
      "This is 'defence in depth' in action — removing a compromised layer.",
      "VPN offline. Remote access suspended. Attacker's entry point eliminated.",
      "Vendor contacted for emergency patch. Network scanning for signs of lateral movement."],
    complications:[{at:.5,chance:.25,msg:"Attacker already moved laterally before isolation — extended scan",extraTime:.4}],
    earlyFinish:{chance:.1,msg:"VPN appliance had redundant backup — quick failover isolation"}},
   {id:"patch_apply",name:"Emergency Vendor Patch",team:"security",baseDuration:50,
    ocrRef:"1.3.3(c)",effectiveness:100,scorePts:100,
    description:"Apply the emergency vendor patch and scan the network for signs of compromise.",
    duringRisk:"50 seconds of exposure while patch is tested and deployed.",
    narrative:[
      "Emergency patch received from vendor — testing in isolated environment first.",
      "Zero-day patches must be tested before deployment — a bad patch can brick the appliance.",
      "Patch validated. Deploying to production VPN appliance.",
      "VPN patched and restarted. Flaw eliminated. Scanning for lateral movement indicators.",
      "Network scan complete. No further compromise detected."],
    complications:[{at:.4,chance:.3,msg:"Patch introduces new bug — rollback and manual workaround",extraTime:.5}],
    earlyFinish:{chance:.05,msg:"Clean patch — no issues in production deployment"}},
   {id:"analyst_threat",name:"Threat Intelligence Analysis (YOU)",team:"analyst",baseDuration:40,
    ocrRef:"1.3.3(c)",effectiveness:90,scorePts:120,
    description:"Analyse the zero-day to understand its scope and identify any other affected systems.",
    duringRisk:"You are unavailable for ~40 seconds.",
    narrative:["Reverse-engineering the exploit payload...","Scanning for similar vulnerability signatures..."],
    complications:[],earlyFinish:{chance:.15,msg:"CVE already documented by security researcher — intelligence ready"},
    analystChallenge:{
      context:"A zero-day exploit is attacking your VPN. Standard antivirus didn't detect it. Why not?",
      question:"Why did antivirus software fail to detect this zero-day attack?\n\nAV uses ________-based detection that only matches KNOWN threats.\n\nType the missing word:",
      ocrLink:"OCR 1.3.3(c): Traditional antivirus uses SIGNATURE-based detection — it compares files against a database of known malware fingerprints. Zero-days are unknown, so no signature exists yet. Behavioural detection (watching what programs DO rather than what they ARE) is more effective against unknown threats.",
      hint1:"Traditional AV works by matching files against a database of known threats. This database contains the 'signature' of each known malware.",
      hint2:"AV compares each file against stored malware ___________s (like fingerprints of known threats).",
      hint3:"SIGNATURE-based detection — matches files against known malware signatures. Zero-days have no signature yet, so they're invisible to traditional AV.",
      fullAnswer:"signature",
      checkFn:(s)=>s.trim().toLowerCase().includes("signature")}}]},

 {id:"supply_chain",name:"Supply Chain Zero-Day",short:"Malicious update in trusted software vendor",
  escs:["SUPPLY CHAIN: trusted software update contains malicious payload",
        "Payload executing on all machines that auto-updated",
        "THOUSANDS OF MACHINES COMPROMISED via software trust chain"],
  escR:9,uMin:2000,uMax:80000,spread:"Trojan Backdoor",
  responses:[
   {id:"rollback",name:"Emergency Software Rollback",team:"security",baseDuration:30,
    ocrRef:"1.3.3(c)",effectiveness:90,scorePts:80,
    description:"Roll back the malicious software update to the last known-clean version.",
    duringRisk:"Machines continue running malicious payload during rollback deployment.",
    narrative:[
      "Supply chain attack: malicious code injected into legitimate vendor update (1.3.3c).",
      "This is why software signing and update integrity verification matters.",
      "Pushing emergency rollback to previous known-good version across all machines.",
      "Rollback complete. Malicious payload removed. Vendor notified of compromise."],
    complications:[{at:.5,chance:.3,msg:"Some machines applied the update days ago — extended rollback",extraTime:.4}],
    earlyFinish:{chance:.1,msg:"Centralised update management — quick rollback deployment"}}]}
]};
})();
