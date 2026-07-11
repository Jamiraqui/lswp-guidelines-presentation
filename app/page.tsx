"use client";

import { useEffect, useMemo, useState } from "react";

const sections = [
  ["overview", "01", "Mandate"], ["principles", "02", "Principles"], ["aid", "03", "Aid categories"],
  ["eligibility", "04", "Eligibility"], ["funding", "05", "Funding policy"], ["priority", "06", "Priority scoring"],
  ["repeat", "07", "Repeat aid"], ["tracks", "08", "Application tracks"], ["documents", "09", "Documents"],
  ["governance", "10", "Governance"], ["communication", "11", "Communication"], ["privacy", "12", "Privacy"],
  ["controls", "13", "Risk controls"], ["undertaking", "14–15", "Commitments"], ["reporting", "16", "Reporting"], ["appendices", "A–D", "Appendices"]
];

const Icon = ({name}:{name:string}) => <span className="icon" aria-hidden>{name}</span>;

export default function Home() {
  const [present, setPresent] = useState(false);
  const [query, setQuery] = useState("");
  const [donations, setDonations] = useState(100000);
  const [score, setScore] = useState({urgency:24, academic:16, gap:15, essential:12, proof:8, stewardship:4});
  const total = Object.values(score).reduce((a,b)=>a+b,0);
  const envelope = Math.round(donations*.7 + (1014100-800000)*.1);
  const q = query.toLowerCase();
  useEffect(()=>{ document.body.classList.toggle("presenting",present); return()=>document.body.classList.remove("presenting")},[present]);
  const jump = (id:string) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return <div className="app">
    <aside className="rail">
      <div className="brand"><div className="mark">L</div><div><b>LSWP</b><small>Policy briefing</small></div></div>
      <nav>{sections.map(([id,n,label])=><button key={id} onClick={()=>jump(id)}><span>{n}</span>{label}</button>)}</nav>
      <div className="rail-note">Draft policy<br/><b>29 June 2026</b></div>
    </aside>

    <main>
      <header className="topbar">
        <div className="search"><Icon name="⌕"/><input aria-label="Search guidelines" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the guidelines"/><kbd>⌘ K</kbd></div>
        <button className="outline" onClick={()=>setPresent(!present)}><Icon name={present?"×":"▣"}/>{present?"Exit presentation":"Present"}</button>
      </header>

      <section className="hero" id="overview">
        <div className="eyebrow"><span/>BOARD POLICY BRIEF · COMPREHENSIVE GUIDELINES</div>
        <h1>Lasallian Student<br/><em>Welfare Program Aid</em></h1>
        <p className="lead">A protected, need-based fund for urgent student welfare, academic continuity, and crisis response.</p>
        <div className="hero-actions"><button className="primary" onClick={()=>jump("funding")}>Explore the policy <Icon name="↓"/></button><button className="ghost" onClick={()=>jump("decision")}>View decision points</button></div>
        <div className="hero-grid">
          <div><small>STARTING FUND</small><strong>₱1.014M</strong><p>Available corpus</p></div>
          <div><small>PROTECTED RESERVE</small><strong>80%</strong><p>₱800,000 floor</p></div>
          <div><small>STANDARD AWARD</small><strong>≤ ₱5K</strong><p>Committee approval</p></div>
          <div><small>CORE POSITION</small><strong>Bridge, not subsidy</strong><p>Emergency and welfare assistance</p></div>
        </div>
      </section>

      <section className="statement" id="decision">
        <span className="section-no">RECOMMENDED POLICY POSITION</span>
        <h2>Protect the fund.<br/>Respond when it matters.</h2>
        <p>LSWP remains an emergency and welfare assistance fund, not an open-ended scholarship or recurring subsidy. The corpus is protected by a reserve floor, while aid is released from a defined school-year envelope.</p>
        <div className="decision-card"><Icon name="✓"/><div><b>Board decision sought</b><p>Adopt the reserve model, award ceilings, two-track application system, scoring matrix, and accountability controls in these guidelines.</p></div></div>
      </section>

      <section id="principles">
        <Title n="02" kicker="GOVERNING VALUES" title="Five principles shape every decision."/>
        <div className="principles">{[
          ["01","Essentialness","Necessary, time-sensitive, and directly tied to welfare or academic continuity."],
          ["02","Equity","Apply the same criteria regardless of college, organization, recommender, or visibility."],
          ["03","Sustainability","Preserve capacity for future students; never exhaust the corpus in one year."],
          ["04","Dignity & confidentiality","Treat students respectfully and restrict sensitive information to need-to-know roles."],
          ["05","Accountability","Record the basis, budget source, disbursement trail, and proportionate follow-up."]
        ].map(x=><article key={x[0]}><span>{x[0]}</span><div><h3>{x[1]}</h3><p>{x[2]}</p></div></article>)}</div>
      </section>

      <section id="aid">
        <Title n="03" kicker="WHAT THE FUND SUPPORTS" title="Three aid categories. One welfare purpose."/>
        <div className="cards three">
          <PolicyCard icon="✚" title="Emergency Health Aid" text="Urgent health expenses affecting safety, recovery, or continued study." items={["Hospital or clinic bills","Emergency procedures and medicines","Diagnostics and assistive needs","Mental health crisis referral costs"]}/>
          <PolicyCard icon="▤" title="Student Life Assistance" text="Short-term essentials for meaningful participation and academic continuity." items={["Transportation and meals","Books and supplies","Thesis or capstone requirements","Completion or graduating expenses"]}/>
          <PolicyCard icon="⌂" title="Emergency Relief Fund" text="Relief after disaster, family shock, displacement, or life-altering accident." items={["Fire, flood, or displacement","Loss of housing","Death or incapacity of provider","Verified crisis essentials"]}/>
        </div>
      </section>

      <section id="eligibility">
        <Title n="04" kicker="ELIGIBILITY" title="A clear gate before discretion."/>
        <div className="split"><div className="panel yes"><h3><Icon name="✓"/> Basic eligibility</h3><ul>{["Currently enrolled at application and disbursement, unless a completion-related exception is approved.","Request fits an approved category and shows a clear, verifiable need.","Required documents, verification consent, and post-release reporting are accepted.","All other coverage or aid for the same expense is disclosed."].map(i=><li key={i}>{i}</li>)}</ul></div>
        <div className="panel no"><h3><Icon name="×"/> Non-eligible or lower priority</h3><ul>{["Recurring tuition or full-term living expenses better addressed through long-term support.","Non-essential purchases, fines, recreation, dues, events, or unrelated expenses.","Old debts without a current emergency and no safer alternative.","Duplicate support, unless new information proves earlier aid became insufficient."].map(i=><li key={i}>{i}</li>)}</ul></div></div>
      </section>

      <section id="funding">
        <Title n="05" kicker="FUNDING MODEL" title="Spend from the envelope, not the corpus."/>
        <div className="fund-grid"><div className="fund-visual"><div className="ring"><div><strong>80%</strong><span>protected</span></div></div><div className="legend"><p><i className="green"/>Reserve floor <b>₱800,000</b></p><p><i className="gold"/>Available above floor <b>₱214,100</b></p></div></div>
        <div className="formula"><div><span>01</span><p><b>Donation split</b><br/>70% to current aid · 30% to reserve</p></div><div><span>02</span><p><b>Surplus draw</b><br/>Up to 10% of balance above the floor</p></div><div><span>03</span><p><b>Carryover</b><br/>Restore reserve first, then next year’s envelope</p></div><div><span>04</span><p><b>Emergency release</b><br/>Below-floor use needs unanimous endorsement and authorized approval</p></div></div></div>
        <div className="calculator"><div><small>LIVE POLICY CALCULATOR</small><h3>Annual aid envelope</h3><label>Unrestricted annual donations <output>₱{donations.toLocaleString()}</output></label><input type="range" min="0" max="300000" step="10000" value={donations} onChange={e=>setDonations(+e.target.value)}/></div><div className="result"><span>Recommended starting envelope</span><strong>₱{envelope.toLocaleString()}</strong><p>70% donation share + 10% of corpus above the ₱800,000 floor</p><small>≈ {Math.floor(envelope/5000)} standard grants at ₱5,000</small></div></div>
        <div className="award-table"><div className="thead"><span>AWARD TYPE</span><span>CEILING</span><span>APPROVAL STANDARD</span></div>{[
          ["Standard","Up to ₱5,000","Committee approval based on eligibility, urgency, and envelope."],
          ["Enhanced","₱5,001–₱15,000","Stronger documentation and written basis that standard aid is insufficient."],
          ["Exceptional","₱15,001–₱25,000","Expanded approval, finance confirmation, and severe or completion-critical finding."],
          ["Beyond ceiling","Above ₱25,000","Not routine LSWP aid. Refer to scholarship, crisis fund, fundraising, insurance, or institutional approval."]
        ].map(r=><div className="tr" key={r[0]}><b>{r[0]}</b><strong>{r[1]}</strong><p>{r[2]}</p></div>)}</div><p className="fine">Caps are ceilings, not entitlements. Partial awards are allowed. Direct payment to a provider, supplier, clinic, landlord, or university office is preferred when practical and respectful of privacy.</p>
      </section>

      <section id="priority">
        <Title n="06" kicker="PRIORITY MATRIX" title="Make a sample decision in real time."/>
        <div className="scorecard"><div>{Object.entries({urgency:["Urgency & safety risk",30],academic:["Academic continuity",20],gap:["Financial gap & alternatives",20],essential:["Essentialness & proportionality",15],proof:["Documentation",10],stewardship:["Program stewardship",5]}).map(([k,[label,max]])=><label key={k}><span>{label}<b>{score[k as keyof typeof score]} / {max}</b></span><input type="range" min="0" max={max as number} value={score[k as keyof typeof score]} onChange={e=>setScore({...score,[k]:+e.target.value})}/></label>)}</div><div className={`score ${total>=80?"high":total>=60?"eligible":total>=40?"wait":"low"}`}><span>PRIORITY SCORE</span><strong>{total}</strong><small>/ 100</small><h3>{total>=80?"High priority":total>=60?"Eligible, subject to funds":total>=40?"Waitlist, partial aid, or referral":"Generally not approved"}</h3><p>{total<80?"New evidence may change the result.":"Proceed to committee review and available-envelope check."}</p></div></div>
      </section>

      <section id="repeat"><Title n="07" kicker="REPEAT REQUESTS" title="One grant per year is the default."/><p className="intro">A repeat request is an exception for a distinct, material, and unforeseeable need. It must not turn short-term relief into recurring subsidy.</p><div className="checks">{["New emergency, diagnosis, disaster impact, or escalation","Prior utilization report, receipt, provider proof, or reasonable attestation","No duplicate expense paid by LSWP or another source","One academic year since release, unless urgent","Aggregate aid stays within the cap, unless exceptionally approved"].map(x=><div key={x}><Icon name="✓"/>{x}</div>)}</div><div className="cap-row"><div><small>ROUTINE STUDENT LIFE</small><b>₱10,000</b><p>Second grant usually no larger than first.</p></div><div><small>COMPLETION-CRITICAL</small><b>₱15,000</b><p>Confirm completion and required cost.</p></div><div><small>SEVERE CRISIS</small><b>₱25,000</b><p>Expanded approval and exception memo.</p></div></div></section>

      <section id="tracks"><Title n="08" kicker="APPLICATION TRACKS" title="Urgency changes speed, not accountability."/><div className="track-grid"><Track urgent/><Track/></div></section>

      <section id="documents"><Title n="09" kicker="EVIDENCE" title="Require what is useful, safe, and proportionate."/><div className="doc-grid">{[
        ["Emergency Health","Medical certificate, bill, prescription, diagnostic request, quotation, insurance note, discharge instruction, or clinician referral."],
        ["Student Life","Book or supply quotation, thesis estimate, transport estimate, meal need statement, adviser confirmation, or completion certification."],
        ["Emergency Relief","Incident or disaster certification, barangay certificate, photos, quotation, death certificate, unemployment notice, police report, or social worker note."],
        ["Repeat Request","Prior utilization report, receipts or payee confirmation, explanation of new emergency, updated intent letter, and updated proof."]].map(([a,b])=><article key={a}><h3>{a}</h3><p>{b}</p></article>)}</div><div className="callout"><Icon name="!"/><p><b>Compassionate evidence rule</b><br/>Do not demand documents that are impossible or unsafe to obtain during a crisis. Preliminary proof may support expedited release, with follow-up verification.</p></div></section>

      <section id="governance"><Title n="10" kicker="SCREENING · APPROVAL · DISBURSEMENT" title="Separate judgment, release, and accountability."/><div className="flow"><div><span>1</span><b>Intake</b><small>Completeness & verification</small></div><i>→</i><div><span>2</span><b>Committee review</b><small>Score, conflict check, record</small></div><i>→</i><div><span>3</span><b>Approval</b><small>At least 3 voting members</small></div><i>→</i><div><span>4</span><b>Disbursement</b><small>Direct pay preferred</small></div><i>→</i><div><span>5</span><b>Follow-up</b><small>Proof, ledger, referral</small></div></div><div className="govern-grid"><div><h3>Committee and quorum</h3><p>Voting members may include the Academic Support Coordinator, Student Success Director, Dean and Associate Dean of Student Affairs. Authorized SSC and OSA staff may serve as non-voting members.</p><ul><li>Routine approval: at least 3 voting members</li><li>Enhanced/exceptional: written justification and chair or Dean approval</li><li>Conflicted member discloses and recuses</li><li>No single person approves, releases, and liquidates end-to-end</li></ul></div><div><h3>Decision record</h3><ul><li>Identity, program, and enrollment status</li><li>Category, request, approval, and funding source</li><li>Track, evidence, interview/testimony, and score</li><li>Reason for decision or referral</li><li>Payee, liquidation, and follow-up date</li></ul></div><div><h3>Disbursement controls</h3><ul><li>Direct provider payment when practical</li><li>Proportionate receipt, acknowledgement, or attestation</li><li>Flag duplicate payees, receipts, expenses, and unusual recommender clusters</li><li>Live ledger of envelope, commitments, releases, pending cases, and balance</li></ul></div></div></section>

      <section id="communication"><Title n="11" kicker="APPLICANT EXPERIENCE" title="Clear, respectful, and time-bound communication."/><div className="timeline"><div><b>Official channel</b><p>University email and applicant contact number</p></div><div><b>Approval notice</b><p>Amount, purpose, method, liquidation, follow-up</p></div><div><b>Denial or waitlist</b><p>Brief reasons and referrals where possible</p></div><div><b>Reconsideration</b><p>Within 5 working days, only for new evidence, corrected documents, or procedural error</p></div></div></section>

      <section id="privacy"><Title n="12" kicker="CONFIDENTIALITY & RECORDS" title="Need-to-know access. Anonymized accountability."/><div className="privacy"><div className="lock">⌾</div><div><h3>Information is shared only for evaluation, approval, disbursement, audit, referral, or support.</h3><div className="mini-grid"><p><b>Minimize</b><br/>Collect only what is necessary.</p><p><b>Consent</b><br/>Obtain written consent for verification and extra disclosure.</p><p><b>Restrict</b><br/>Use role-based storage access.</p><p><b>Retain responsibly</b><br/>Follow institutional retention, then securely dispose.</p><p><b>Report safely</b><br/>Use anonymized summaries unless separate consent is given.</p></div></div></div></section>

      <section id="controls"><Title n="13" kicker="LOOPHOLES & CONTROLS" title="Design against predictable failure."/><div className="risk-table">{[
        ["Early fund depletion","Set an annual envelope, phase funds by term/month, waitlist, and rank by priority."], ["Recurring subsidy","One-grant default, new-emergency test, utilization report, cooling period, and caps."], ["Recommender bias","Testimony expedites; it never guarantees. Require conflicts and uniform scoring."], ["Double funding","Disclosure, coordination with other offices, and a shared grant ledger."], ["Fraud or exaggeration","Verify suspicious/high-value proof, prefer direct payees, and state consequences."], ["Unclear donor restrictions","Tag restricted and unrestricted donations; follow donor intent."], ["Privacy leakage","Limit access, require extra-disclosure consent, anonymize reports."], ["Unchecked emergency release","Small provisional cap, three authorizers, next-meeting ratification."], ["Oversized grants","Award ceilings, enhanced rules, exceptional approvals."], ["Long-term hardship","Refer to scholarships, counseling, student success, social services, or fundraising."]].filter(r=>!q||r.join(" ").toLowerCase().includes(q)).map(([risk,control])=><div key={risk}><b>{risk}</b><p>{control}</p><span>CONTROLLED</span></div>)}</div></section>

      <section id="undertaking"><Title n="14–15" kicker="TWO-WAY COMMITMENT" title="Testimony supports. The student undertakes."/><div className="split"><div className="panel"><h3>Character testimony</h3><p>Includes identity and relationship, direct observations, hardship and urgency, conflict declaration, consent to verification, and whether the student can safely await regular processing.</p><blockquote>“This testimony supports review but does not guarantee approval.”</blockquote></div><div className="panel"><h3>Student undertaking after release</h3><ul><li>Use aid only for the approved purpose</li><li>Submit proof by the stated deadline, unless waived</li><li>Return unused funds or seek written redirection approval</li><li>Accept recovery, future ineligibility, or conduct referral for falsification, duplicate-aid concealment, or misuse</li></ul></div></div></section>

      <section id="reporting"><Title n="16" kicker="REVIEW & REPORTING" title="Measure stewardship without exposing students."/><div className="metrics">{["Opening balance","Donations","Aid envelope","Applications","Approvals","Denials","Waitlisted","Total disbursed","Average award","Categories served","Repeat requests","Ending balance"].map(x=><span key={x}>{x}</span>)}</div><p className="intro">Prepare a termly anonymized report. Review ceilings, reserve floor, and scoring at least annually. Use anonymized case patterns, unmet demand, average grants, and reach to strengthen fundraising.</p></section>

      <section id="appendices"><Title n="A–D" kicker="IMPLEMENTATION KIT" title="Ready-to-use forms and process aids."/><div className="appendix-grid">{[
        ["A","Process summary","Side-by-side triggers, intake, interview, decision targets, and safeguards for both tracks."],
        ["B","Application letter","Identity, enrollment, category, need, amount, other support, declarations, consent, and attachments."],
        ["C","Data privacy consent","Voluntary consent for collection, use, storage, verification, processing, authorized purposes, access, correction, and withdrawal."],
        ["D","Character testimony","Recommender identity, relationship, direct knowledge, need, conflict declaration, attestation, verification consent, and signature."]].map(([l,t,d])=><article key={l}><span>{l}</span><h3>{t}</h3><p>{d}</p></article>)}</div><div className="track-summary"><div><b>EXPEDITED</b><span>Urgent + credible testimony</span><strong>1–3 working days</strong><small>24–48 hours for provisional aid</small></div><div><b>REGULAR</b><span>No recommender / non-urgent / fuller review</span><strong>5 working days</strong><small>Decision after complete submission; disbursement normally within 10 working days</small></div></div></section>

      <footer><div className="mark">L</div><p><b>Lasallian Student Welfare Program Aid</b><br/>Comprehensive Guidelines · Board Policy Brief</p><span>Student Welfare Fund<br/><b>Account #61018701</b></span><button onClick={()=>scrollTo({top:0,behavior:"smooth"})}>Back to top ↑</button></footer>
    </main>
  </div>
}

function Title({n,kicker,title}:{n:string,kicker:string,title:string}){return <div className="title"><span>{n}</span><div><small>{kicker}</small><h2>{title}</h2></div></div>}
function PolicyCard({icon,title,text,items}:{icon:string,title:string,text:string,items:string[]}){return <article className="policy-card"><Icon name={icon}/><h3>{title}</h3><p>{text}</p><ul>{items.map(i=><li key={i}>{i}</li>)}</ul></article>}
function Track({urgent=false}:{urgent?:boolean}){return <article className={`track ${urgent?"urgent":""}`}><div className="track-head"><span>{urgent?"EXPEDITED":"REGULAR"}</span><b>{urgent?"Urgent + testimony":"Full assessment"}</b></div><p>{urgent?"Delay may harm health, safety, welfare, academic continuity, or completion, and a credible recommender has direct knowledge.":"No recommender, non-urgent case, or a fuller picture is needed before decision."}</p><h4>Core file</h4><ul>{(urgent?["Emergency intake/application","Student ID + enrollment proof","Brief need statement","Character testimony + conflict declaration","Available proof + privacy consent","Verified payee details"]:["Full application + intent letter","Student ID + enrollment proof","Category documents","Financial context when available","Privacy and verification consent","Disbursement details","Prior utilization for repeats"]).map(x=><li key={x}>{x}</li>)}</ul><div className="track-time"><b>{urgent?"1–3 working days":"5 working days"}</b><small>{urgent?"24–48h provisional release up to ₱5,000 by 3 members; ratify later. Missing non-critical documents within 10 days.":"Interview and decision normally within 5 days of completeness; disbursement within 10 days after approval and FAO clearance."}</small></div></article>}
