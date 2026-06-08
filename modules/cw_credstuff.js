;(function(){
if(!window.CW_MODULES)window.CW_MODULES={};
window.CW_MODULES['Credential Stuffing']={
icon:"🔑",cat:"Auth Attack",col:"#ff8844",
explain:["ATTACK: CREDENTIAL STUFFING  |  OCR 1.3.3(c)","━━━━━━━━━━━━━━━━━━━━━",
  "Billions of username:password pairs from past breaches are tested at scale.",
  "Works because 85% of people reuse passwords across multiple services.",
  "MFA defeats this completely — even with correct password, second factor blocks access."],
mutations:[
  {name:"Fresh breach DB",label:"💾 FRESH BREACH DB",escMulti:1.4,spreadMult:1.5,userMult:2.0},
  {name:"Botnet distributed",label:"🌐 BOTNET DIST.",escMulti:1.3,spreadMult:1.3,userMult:1.8},
  {name:"Automated scan",label:"🎲 AUTOMATED SCAN",escMulti:0.7,spreadMult:0.6,userMult:0.9}],
scenarios:[
 {id:"dark_web_db",name:"Dark Web Database Attack",short:"14.7M fresh breach credentials tested against all accounts",
  escs:["Stuffing using fresh dark web breach DB — 2M attempts/hour",
        "847 accounts successfully accessed — customer data at risk",
        "PAYMENT DETAILS ACCESSED — GDPR mandatory breach notification triggered"],
  escR:20,uMin:5000,uMax:100000,spread:"Phishing",
  responses:[
   {id:"lockout_matching",name:"Lock Breach-Matched Accounts",team:"identity",baseDuration:20,
    ocrRef:"1.3.3(c)",effectiveness:90,scorePts:75,
    description:"Cross-reference accounts against the breach database and lock all matches pending password reset.",
    duringRisk:"Unmatched accounts with reused passwords remain at risk.",
    narrative:[
      "Identity Team cross-referencing user accounts against breach database...",
      "Credential stuffing exploits password reuse — 85% of people affected (1.3.3c).",
      "2,847 accounts matched to breach database entries. All locked immediately.",
      "Password reset emails sent to affected users. Out-of-band verification required.",
      "MFA enforcement activated — even with correct password, a second factor now required.",
      "Future stuffing attempts will fail — breach credentials no longer sufficient."],
    complications:[{at:.5,chance:.2,msg:"Breach DB matching service slow — manual fallback needed",extraTime:.3}],
    earlyFinish:{chance:.1,msg:"Breach DB previously cached — instant matching"}},
   {id:"rate_block",name:"Rate Limit Auth Attempts",team:"network",baseDuration:14,
    ocrRef:"1.3.3(c)",effectiveness:75,scorePts:60,
    description:"Rate limit authentication attempts per IP to slow the stuffing attack.",
    duringRisk:"Distributed attack uses many IPs — rate limiting may be partially effective only.",
    narrative:[
      "Credential stuffing uses thousands of IPs to avoid rate limiting.",
      "Deploying IP-based rate limits: 10 login attempts per IP per minute.",
      "Botnet distributed across 45,000 IPs — rate limiting slows but doesn't stop attack.",
      "Combining with CAPTCHA to make each attempt require human interaction."],
    complications:[{at:.4,chance:.25,msg:"Attacker using residential IP proxy — normal-looking traffic",extraTime:.35}],
    earlyFinish:{chance:.1,msg:"Attack concentrated on small IP range — quick rate limit effective"}},
   {id:"analyst_mfa",name:"Implement MFA Organisation-wide (YOU)",team:"analyst",baseDuration:45,
    ocrRef:"1.3.3(c)",effectiveness:100,scorePts:130,
    description:"Configure MFA across all authentication endpoints — making credential stuffing permanently ineffective.",
    duringRisk:"You are unavailable for ~45 seconds.",
    narrative:["Auditing authentication endpoints for MFA capability...","Configuring TOTP and push notification MFA options..."],
    complications:[],earlyFinish:{chance:.15,msg:"Most endpoints already MFA-capable — quick configuration"},
    analystChallenge:{
      context:"Credential stuffing attacks are very effective against organisations without MFA. Even if an attacker has 14.7 million correct username/password pairs, MFA stops them from logging in.",
      question:"Credential stuffing succeeds because most people reuse passwords across sites.\n\nApproximately what PERCENTAGE of people reuse passwords? (Type the number):",
      ocrLink:"OCR 1.3.3(c): Password reuse is a critical security vulnerability. Studies consistently show ~85% of people reuse passwords. When one service is breached, all services sharing that password become vulnerable. MFA (Multi-Factor Authentication) mitigates this by requiring a second verification factor that attackers cannot obtain from a breach database.",
      hint1:"It's a surprisingly high number — most people do it. Think of a number between 80 and 90.",
      hint2:"Research shows the vast majority of people reuse passwords. The figure is approximately 8_% (fill in the blank).",
      hint3:"85% — approximately 85% of people reuse passwords across multiple services. This is why one breach leads to many compromised accounts.",
      fullAnswer:"85",
      checkFn:(s)=>{const n=parseInt(s.trim());return n>=80&&n<=90;}}}]},

 {id:"sector_spray",name:"Financial Sector Credential Attack",short:"High-value banking accounts systematically targeted",
  escs:["Financial credentials being tested — high-value accounts targeted",
        "Banking accounts accessed — transfers attempted",
        "£4.2M IN FRAUDULENT TRANSFERS INITIATED — fraud team alerted"],
  escR:16,uMin:1000,uMax:40000,spread:"Man-in-the-Middle",
  responses:[
   {id:"lock_high_value",name:"Freeze High-Value Accounts",team:"identity",baseDuration:16,
    ocrRef:"1.3.3(c)",effectiveness:85,scorePts:70,
    description:"Immediately freeze accounts above £10,000 balance pending out-of-band verification.",
    duringRisk:"Ongoing transfers may complete before freeze is applied.",
    narrative:[
      "Financial credential stuffing targets accounts with high balances.",
      "Freezing all accounts that have received more than 1 failed login attempt today.",
      "Out-of-band verification required to unfreeze: phone call to registered mobile only.",
      "Transaction monitoring alerting on any transfer over £500 to new payees.",
      "Fraudulent transfer chain halted. £4.2M at risk — £3.8M recovered before transfer completed."],
    complications:[{at:.4,chance:.25,msg:"Attackers initiated multiple small transfers to avoid detection",extraTime:.35}],
    earlyFinish:{chance:.1,msg:"Fraud detection system caught pattern — quick lockdown"}}]}
]};
})();
