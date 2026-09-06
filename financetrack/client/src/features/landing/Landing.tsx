import fullLogo from '../../assets/financetrack-logo.svg'
import logoMark from '../../assets/financetrack-mark.svg'
import { useMemo, useState } from 'react'

type LandingProps = {
  onGetStarted: () => void
  onSignIn: () => void
}

const savingsImage = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=85'
const footerPeopleImage = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=85'
const heroMoneyImage = 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=88'
const heroWorkspaceImage = 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=88'

function Landing({ onGetStarted, onSignIn }: LandingProps) {
  const [recallQuery, setRecallQuery] = useState('McDonald\'s')
  const recalledExpenses = useMemo(() => [
    { merchant: "McDonald's", date: '02 July, 07:20 PM', amount: '₹562', category: 'FOOD & DRINKS' },
    { merchant: "McDonald's", date: '18 June, 01:12 PM', amount: '₹398', category: 'FOOD & DRINKS' },
    { merchant: "McDonald's", date: '03 June, 08:45 PM', amount: '₹749', category: 'FOOD & DRINKS' },
  ].filter((expense) => expense.merchant.toLowerCase().includes(recallQuery.toLowerCase().trim())), [recallQuery])

  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <a className="landing-brand" href="#top" aria-label="FinanceTrack home">
          <img src={fullLogo} alt="FinanceTrack" />
        </a>

        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </div>

        <div className="landing-nav-actions">
          <button className="landing-sign-in" type="button" onClick={onSignIn}>Sign in</button>
          <button className="landing-nav-cta" type="button" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </nav>

      <section className="landing-hero" id="top">
        <div className="landing-hero-copy">
          <span className="landing-kicker">SMART MONEY · BETTER TOMORROW</span>
          <h1>Take control of your finances with <em>confidence.</em></h1>
          <p>
            Track your income, expenses, and savings in one calm, focused place.
            Make smarter decisions and build better habits.
          </p>
          <div className="landing-hero-actions">
            <button className="landing-primary-button" type="button" onClick={onGetStarted}>
              Get Started Free <span>→</span>
            </button>
            <a className="landing-demo-link" href="#how-it-works">
              <span>▶</span> Watch demo
            </a>
          </div>
          <div className="landing-trust-row">
            <span>✓ No credit card required</span>
            <span>✓ Your data stays private</span>
          </div>
        </div>

        <div className="landing-hero-art" aria-label="FinanceTrack dashboard preview">
          <div className="landing-orbit landing-orbit-a" />
          <img className="hero-money-photo" src={heroMoneyImage} alt="Coins and banknotes representing money management" />
          <img className="hero-workspace-photo" src={heroWorkspaceImage} alt="A financial planning workspace" />
          <div className="landing-phone">
            <div className="landing-phone-top"><span>FinanceTrack</span><span>•••</span></div>
            <p>Total Balance</p>
            <strong>₹85,420</strong>
            <small>+12% from last month</small>
            <div className="landing-phone-chart"><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="landing-phone-row"><span className="landing-mini-icon income">↑</span><span>Income</span><strong>₹1,20,000</strong></div>
            <div className="landing-phone-row"><span className="landing-mini-icon expense">↓</span><span>Expenses</span><strong>₹34,580</strong></div>
            <div className="landing-phone-row"><span className="landing-mini-icon savings">◆</span><span>Savings</span><strong>₹85,420</strong></div>
          </div>
          <div className="landing-floating-card">
            <span>Monthly overview</span>
            <strong>₹24,300</strong>
            <small>+8.4% this month</small>
          </div>
        </div>
      </section>

      <section className="landing-proof-bar" aria-label="FinanceTracko benefits">
        <div><strong>One view</strong><span>Balances, expenses and income</span></div>
        <div><strong>Private by design</strong><span>Your account, your financial record</span></div>
        <div><strong>Built for action</strong><span>Useful patterns, not noisy charts</span></div>
      </section>

      <section className="landing-recall-section">
        <div className="landing-recall-visual">
          <div className="recall-search-shell">
            <span className="recall-search-icon">⌕</span>
            <input
              aria-label="Search your transactions"
              value={recallQuery}
              onChange={(event) => setRecallQuery(event.target.value)}
              placeholder="Search your transactions..."
            />
            <span className="recall-refresh">↻</span>
          </div>
          <div className="recall-filters">
            <span>↓ INCOMING</span><span>↑ OUTGOING</span><span>◉ TAGS</span><span>T TODAY</span><span>M THIS MONTH</span><span>W THIS WEEK</span>
          </div>
          <div className="recall-results">
            {recalledExpenses.length > 0 ? recalledExpenses.map((expense) => (
              <article className="recall-row" key={`${expense.date}-${expense.amount}`}>
                <div><strong>{expense.merchant}</strong><span>{expense.date}</span></div>
                <div><b>− {expense.amount}</b><em>◈ {expense.category}</em></div>
              </article>
            )) : <div className="recall-empty">No transactions found for “{recallQuery}”.</div>}
          </div>
        </div>
        <div className="landing-recall-copy">
          <div>
            <span className="landing-kicker">SEARCH YOUR MONEY</span>
            <h2>Search. Recall.<br />Filter.</h2>
          </div>
          <div className="landing-recall-summary">
            <div className="landing-pill-row"><span>⌁ INCOMING</span><span>⌁ OUTGOING</span><span>⌁ TAGS</span></div>
            <p>Just type in McDonald’s for example and see all the times you have spent at McDonald’s. Then type Gym Membership, realise there’s no such transactions. Look yourself in the mirror, stop eating from McDonald’s so much.</p>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-section-heading">
          <span className="landing-kicker">BUILT FOR CLARITY</span>
          <h2>Everything important, in one clear view.</h2>
        </div>
        <div className="clarity-grid">
          <article className="clarity-card clarity-card-statements">
            <div className="clarity-mockup statement-mockup">
              <div className="mockup-line short" />
              <div className="mockup-line medium" />
              <div className="mockup-actions"><span>Share statement</span><b>↓</b></div>
            </div>
            <div className="clarity-card-copy"><h3>Download and share <strong>bank statements</strong> without losing your data or temper.</h3></div>
          </article>
          <article className="clarity-card clarity-card-details">
            <div className="clarity-mockup details-mockup"><span>SWIFT BIC</span><strong>ICICINBBCTS</strong><hr /><span>IFSC CODE</span><strong>ICIC0003168</strong></div>
            <div className="clarity-card-copy"><h3>Keep important <strong>bank details</strong> close, secure, and easy to find.</h3></div>
          </article>
          <article className="clarity-card clarity-card-flow">
            <div className="clarity-mockup flow-mockup"><span className="flow-income">Incoming<br /><b>+ ₹25,860</b></span><span className="flow-invested">Invested<br /><b>₹4,860</b></span><span className="flow-outgoing">Outgoing<br /><b>− ₹13,969</b></span><div className="flow-months">Feb&nbsp;&nbsp; Apr&nbsp;&nbsp; May&nbsp;&nbsp; <strong>Jun</strong>&nbsp;&nbsp; Jul&nbsp;&nbsp; Aug</div></div>
            <div className="clarity-card-copy"><h3>See your <strong>cash flow</strong> at a glance, without a spreadsheet headache.</h3></div>
          </article>
          <article className="clarity-card clarity-card-search">
            <div className="clarity-mockup search-mockup"><span>⌕</span><span>e.g. spent on travel this month...</span></div>
            <div className="clarity-card-copy"><h3>Ask better questions. Find <strong>modern answers</strong> in seconds.</h3></div>
          </article>
        </div>
      </section>

      <section className="landing-product-section landing-product-after-hero" id="how-it-works">
        <div className="landing-expense-visual">
          <div className="expense-visual-backdrop" />
          <div className="expense-list-window" aria-label="Recent expenses">
            <div className="expense-list-track">
              <div className="expense-list-group">
                <article className="expense-row"><strong>Swiggy</strong><span>Today, 6:31 PM</span><b>− ₹398</b><em>◈ FOOD &amp; DRINKS</em></article>
                <article className="expense-row"><strong>McDonald’s</strong><span>Today, 11:17 PM</span><b>− ₹562</b><em>◈ FOOD &amp; DRINKS</em></article>
                <article className="expense-row"><strong>Muntra</strong><span>Yesterday, 5:31 PM</span><b>− ₹2,586</b><em>◈ SHOPPING</em></article>
                <article className="expense-row"><strong>Netflix</strong><span>30 November, 12:15 AM</span><b>− ₹199</b><em>◈ SUBSCRIPTION</em></article>
              </div>
              <div className="expense-list-group" aria-hidden="true">
                <article className="expense-row"><strong>Swiggy</strong><span>Today, 6:31 PM</span><b>− ₹398</b><em>◈ FOOD &amp; DRINKS</em></article>
                <article className="expense-row"><strong>McDonald’s</strong><span>Today, 11:17 PM</span><b>− ₹562</b><em>◈ FOOD &amp; DRINKS</em></article>
                <article className="expense-row"><strong>Muntra</strong><span>Yesterday, 5:31 PM</span><b>− ₹2,586</b><em>◈ SHOPPING</em></article>
                <article className="expense-row"><strong>Netflix</strong><span>30 November, 12:15 AM</span><b>− ₹199</b><em>◈ SUBSCRIPTION</em></article>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-product-copy">
          <h2>Stop recording expenses manually.</h2>
          <div className="landing-pill-row"><span>⌁ No spreadsheet chasing</span><span>⌁ No mental math</span></div>
          <p>
            It’s easy to forget, fall off the wagon, and miss. FinanceTrack
            keeps your everyday expenses clear, categorized, and ready to understand.
          </p>
        </div>
      </section>

      <section className="landing-product-section landing-product-before-footer">
        <div className="landing-product-copy">
          <span className="landing-kicker">SEE THE BIGGER PICTURE</span>
          <h2>Separate anxiety from money.</h2>
          <div className="landing-pill-row"><span>● Clear patterns</span><span>● Useful decisions</span></div>
          <p>
            Track the flow without letting it take over your day. Small,
            consistent visibility makes the next good decision much easier.
          </p>
        </div>
        <div className="landing-product-visual">
          <img src={savingsImage} alt="A person planning a savings goal with notes and a calculator" />
          <div className="landing-product-note">Progress feels better<br /><strong>when it is visible.</strong></div>
        </div>
      </section>

      <section className="landing-navy-statement">
        <span className="landing-kicker">A BETTER MONEY HABIT STARTS HERE</span>
        <h2>Your money should work for your life.</h2>
      </section>

      <footer className="landing-footer landing-footer-grid" id="pricing">
        <div className="footer-download-card">
          <img src={logoMark} alt="" />
          <div className="footer-platforms"><span>●</span><span>▣</span></div>
          <strong>Scan &amp; Download</strong>
          <small>FinanceTrack for your everyday money.</small>
        </div>
        <div className="footer-people-card">
          <img src={footerPeopleImage} alt="Friends planning their future together" />
          <div><span className="landing-kicker">OUR APPROACH</span><h3>Money is better when it gives you more life.</h3></div>
        </div>
        <div className="footer-links-card">
          <img src={fullLogo} alt="FinanceTrack" />
          <a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="#top">About us</a><a href="#top">Help center</a><a href="#top">Privacy policy</a><a href="#top">Terms of service</a>
        </div>
        <div className="footer-legal-card">
          <p>© 2026 FinanceTrack.</p>
          <p>Made for clearer financial decisions.</p>
          <a href="mailto:hello@financetrack.app">hello@financetrack.app</a>
        </div>
      </footer>
    </main>
  )
}

export default Landing
