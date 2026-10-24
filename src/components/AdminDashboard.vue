<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isDashboard = ref(false)
const showPassword = ref(false)
const email = ref('')
const password = ref('')
const activeSection = ref('Overview')

const initials = computed(() => {
  const name = email.value.split('@')[0]?.trim()
  return name ? name.slice(0, 2).toUpperCase() : 'AD'
})

const metrics = [
  {
    label: 'Total revenue',
    value: '$48,294',
    change: '+12.8%',
    icon: 'bi-currency-dollar',
    tone: 'violet',
  },
  {
    label: 'Total orders',
    value: '1,284',
    change: '+8.2%',
    icon: 'bi-bag-check',
    tone: 'blue',
  },
  {
    label: 'Products',
    value: '356',
    change: '+4.6%',
    icon: 'bi-box-seam',
    tone: 'orange',
  },
  {
    label: 'Customers',
    value: '8,549',
    change: '+16.4%',
    icon: 'bi-people',
    tone: 'green',
  },
]

const sales = [
  { day: 'Mon', height: 38 },
  { day: 'Tue', height: 56 },
  { day: 'Wed', height: 45 },
  { day: 'Thu', height: 73 },
  { day: 'Fri', height: 61 },
  { day: 'Sat', height: 88 },
  { day: 'Sun', height: 68 },
]

const orders = [
  { id: '#MG-2048', customer: 'Sophia Carter', initials: 'SC', product: 'PlayStation Gift Card', date: 'Oct 23, 2026', amount: '$50.00', status: 'Completed' },
  { id: '#MG-2047', customer: 'Noah Williams', initials: 'NW', product: 'Xbox Game Pass Ultimate', date: 'Oct 23, 2026', amount: '$16.99', status: 'Processing' },
  { id: '#MG-2046', customer: 'Olivia Martinez', initials: 'OM', product: 'Steam Wallet Code', date: 'Oct 22, 2026', amount: '$25.00', status: 'Completed' },
  { id: '#MG-2045', customer: 'Liam Thompson', initials: 'LT', product: 'Nintendo eShop Card', date: 'Oct 22, 2026', amount: '$35.00', status: 'Pending' },
]

function enterPreview() {
  isDashboard.value = true
}

function signOut() {
  isDashboard.value = false
  password.value = ''
}

function returnToStore() {
  router.push('/')
}
</script>

<template>
  <main v-if="!isDashboard" class="admin-login">
    <div class="login-art">
      <a class="admin-brand" href="/" @click.prevent="returnToStore">
        <img src="/images/carla.jpeg" alt="" />
        <span>CARLACARD<span class="brand-mark">.</span></span>
      </a>

      <div class="login-promo">
        <span class="promo-label"><i class="bi bi-stars"></i> ADMIN CONTROL CENTER</span>
        <h1>Everything your<br />store needs,<br /><span>in one place.</span></h1>
        <p>Manage your marketplace, follow your sales, and keep every order moving.</p>

        <div class="promo-stat">
          <div class="promo-avatars" aria-hidden="true">
            <span>JD</span><span>MK</span><span>AL</span>
          </div>
          <div>
            <strong>Built for your team</strong>
            <small>A clearer view of your business</small>
          </div>
        </div>
      </div>

      <div class="login-art-footer">
        <span>© 2026 Carlacard</span>
        <span>ADMIN PORTAL <i class="bi bi-arrow-up-right"></i></span>
      </div>
    </div>

    <div class="login-panel">
      <div class="login-panel-top">
        <span>Already browsing?</span>
        <a href="/" @click.prevent="returnToStore">Back to store <i class="bi bi-arrow-right"></i></a>
      </div>

      <section class="login-card" aria-labelledby="admin-login-title">
        <div class="login-icon"><i class="bi bi-shield-lock"></i></div>
        <span class="login-eyebrow">WELCOME BACK</span>
        <h2 id="admin-login-title">Sign in to your account</h2>
        <p class="login-subtitle">Enter your details to access the admin workspace.</p>

        <form @submit.prevent="enterPreview">
          <label for="admin-email">Email address</label>
          <div class="login-input-wrap">
            <i class="bi bi-envelope"></i>
            <input id="admin-email" v-model="email" type="email" autocomplete="username" placeholder="name@company.com" required />
          </div>

          <div class="password-label">
            <label for="admin-password">Password</label>
            <a href="#password-help" @click.prevent>Forgot password?</a>
          </div>
          <div class="login-input-wrap">
            <i class="bi bi-lock"></i>
            <input
              id="admin-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="Enter your password"
              required
            />
            <button
              class="password-toggle"
              type="button"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>

          <label class="remember-option">
            <input type="checkbox" />
            <span>Remember me for 30 days</span>
          </label>

          <button class="sign-in-button" type="submit">Sign in <i class="bi bi-arrow-right"></i></button>
        </form>

        <div class="preview-notice">
          <i class="bi bi-info-circle"></i>
          <span>Preview only. Authentication is not connected, and no credentials are verified.</span>
        </div>
      </section>

      <p class="login-help">Need help? <a href="mailto:support@carlacard.com">Contact support</a></p>
    </div>
  </main>

  <main v-else class="admin-dashboard">
    <aside class="admin-sidebar">
      <a class="dashboard-brand" href="/" @click.prevent="returnToStore">
        <img src="/images/carla.jpeg" alt="" />
        <span>CARLACARD<span>.</span><small>ADMIN CONSOLE</small></span>
      </a>

      <span class="sidebar-label">WORKSPACE</span>
      <nav class="sidebar-nav" aria-label="Admin navigation">
        <button
          v-for="item in [
            { name: 'Overview', icon: 'bi-grid-1x2' },
            { name: 'Orders', icon: 'bi-bag' },
            { name: 'Products', icon: 'bi-box-seam' },
            { name: 'Customers', icon: 'bi-people' },
          ]"
          :key="item.name"
          type="button"
          :class="{ active: activeSection === item.name }"
          @click="activeSection = item.name"
        >
          <i :class="`bi ${item.icon}`"></i>
          <span>{{ item.name }}</span>
          <span v-if="item.name === 'Orders'" class="nav-count">8</span>
        </button>
      </nav>

      <div class="sidebar-bottom">
        <div class="sidebar-tip">
          <i class="bi bi-lightbulb"></i>
          <strong>Quick tip</strong>
          <p>Keep your product listings up to date to help customers find what they need.</p>
          <button type="button" @click="activeSection = 'Products'">View products <i class="bi bi-arrow-right"></i></button>
        </div>
        <button class="sidebar-store-link" type="button" @click="returnToStore">
          <i class="bi bi-box-arrow-up-right"></i> Visit storefront
        </button>
        <button class="sidebar-profile" type="button" @click="signOut">
          <span class="profile-avatar">{{ initials }}</span>
          <span class="profile-copy"><strong>{{ email.split('@')[0] || 'Admin' }}</strong><small>Administrator</small></span>
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </aside>

    <section class="dashboard-main">
      <header class="dashboard-topbar">
        <div class="breadcrumb"><span>Workspace</span><i class="bi bi-chevron-right"></i><strong>{{ activeSection }}</strong></div>
        <div class="topbar-actions">
          <label class="dashboard-search">
            <i class="bi bi-search"></i>
            <input type="search" placeholder="Search anything..." aria-label="Search dashboard" />
            <kbd>⌘ K</kbd>
          </label>
          <button class="topbar-icon" type="button" aria-label="Help"><i class="bi bi-question-circle"></i></button>
          <button class="topbar-icon notification-button" type="button" aria-label="Notifications">
            <i class="bi bi-bell"></i><span></span>
          </button>
          <span class="topbar-avatar">{{ initials }}</span>
        </div>
      </header>

      <div class="dashboard-content">
        <div class="dashboard-heading">
          <div>
            <span class="dashboard-date"><i class="bi bi-calendar3"></i> Friday, October 23, 2026</span>
            <h1>{{ activeSection === 'Overview' ? 'Good morning' : activeSection }}<span v-if="activeSection === 'Overview'">, {{ email.split('@')[0] || 'Admin' }} 👋</span></h1>
            <p>{{ activeSection === 'Overview' ? 'Here’s what’s happening with your store today.' : `A quick look at your ${activeSection.toLowerCase()} activity.` }}</p>
          </div>
          <button class="date-filter" type="button"><i class="bi bi-calendar4"></i> Last 7 days <i class="bi bi-chevron-down"></i></button>
        </div>

        <div class="metrics-grid">
          <article v-for="metric in metrics" :key="metric.label" class="metric-card">
            <div class="metric-top">
              <span>{{ metric.label }}</span>
              <span class="metric-icon" :class="metric.tone"><i :class="`bi ${metric.icon}`"></i></span>
            </div>
            <strong class="metric-value">{{ metric.value }}</strong>
            <div class="metric-change"><span><i class="bi bi-arrow-up-right"></i> {{ metric.change }}</span> <small>vs last week</small></div>
          </article>
        </div>

        <div class="dashboard-grid">
          <section class="dashboard-card sales-card">
            <div class="card-heading">
              <div><h2>Sales overview</h2><p>Daily revenue performance</p></div>
              <button class="card-menu" type="button" aria-label="More sales options"><i class="bi bi-three-dots"></i></button>
            </div>
            <div class="sales-summary"><strong>$12,840.50</strong><span><i class="bi bi-arrow-up-right"></i> 12.8%</span><small>vs last week</small></div>
            <div class="chart" role="img" aria-label="Bar chart showing sales rising through the week">
              <div class="chart-guides"><span>$4k</span><span>$3k</span><span>$2k</span><span>$1k</span></div>
              <div class="chart-bars">
                <div v-for="day in sales" :key="day.day" class="chart-column">
                  <div class="chart-bar" :style="{ height: `${day.height}%` }"></div>
                  <span>{{ day.day }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="dashboard-card activity-card">
            <div class="card-heading">
              <div><h2>Store activity</h2><p>A snapshot of your store</p></div>
              <button class="card-menu" type="button" aria-label="More activity options"><i class="bi bi-three-dots"></i></button>
            </div>
            <div class="activity-stat"><span class="activity-icon violet"><i class="bi bi-cart3"></i></span><div><strong>Orders today</strong><small>Compared to yesterday</small></div><b>48 <small>+8.4%</small></b></div>
            <div class="activity-stat"><span class="activity-icon orange"><i class="bi bi-person-plus"></i></span><div><strong>New customers</strong><small>This week</small></div><b>126 <small>+12.6%</small></b></div>
            <div class="activity-stat"><span class="activity-icon green"><i class="bi bi-star"></i></span><div><strong>Store rating</strong><small>From 2,430 reviews</small></div><b>4.9 <small>★</small></b></div>
            <div class="activity-footer"><span>Store status</span><span><i></i> All systems operational</span></div>
          </section>
        </div>

        <section class="dashboard-card orders-card">
          <div class="card-heading orders-heading">
            <div><h2>Recent orders</h2><p>Keep track of your latest transactions.</p></div>
            <button type="button" class="view-all" @click="activeSection = 'Orders'">View all orders <i class="bi bi-arrow-right"></i></button>
          </div>
          <div class="orders-table-wrap">
            <table>
              <thead><tr><th>ORDER</th><th>CUSTOMER</th><th>PRODUCT</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id">
                  <td class="order-id">{{ order.id }}</td>
                  <td><span class="customer-avatar">{{ order.initials }}</span>{{ order.customer }}</td>
                  <td>{{ order.product }}</td>
                  <td>{{ order.date }}</td>
                  <td class="order-amount">{{ order.amount }}</td>
                  <td><span class="order-status" :class="order.status.toLowerCase()">{{ order.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <p class="dashboard-disclaimer"><i class="bi bi-info-circle"></i> Preview dashboard with sample data. Sign-in is not connected to an authentication service.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.admin-login,
.admin-dashboard {
  min-height: 100vh;
  color: #202235;
  font-family: Inter, sans-serif;
}

.admin-login {
  display: grid;
  grid-template-columns: minmax(340px, 0.95fr) 1.05fr;
  background: #fff;
}

.login-art {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  padding: 42px clamp(32px, 6vw, 88px) 28px;
  background:
    radial-gradient(ellipse at 72% 34%, rgba(129, 102, 250, 0.28), transparent 32%),
    radial-gradient(ellipse at 10% 85%, rgba(80, 65, 176, 0.3), transparent 45%),
    #17162c;
  color: white;
}

.login-art::before,
.login-art::after {
  position: absolute;
  width: 460px;
  height: 460px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.login-art::before {
  right: -230px;
  bottom: 12%;
}

.login-art::after {
  right: -175px;
  bottom: 20%;
  width: 350px;
  height: 350px;
}

.admin-brand,
.dashboard-brand {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 11px;
  width: fit-content;
  color: inherit;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.3px;
}

.admin-brand img,
.dashboard-brand img {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  object-fit: cover;
}

.brand-mark,
.dashboard-brand > span > span {
  color: #ffbf4a;
}

.login-promo {
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin: auto 0;
  padding: 70px 0;
}

.promo-label,
.login-eyebrow {
  color: #bcb5ff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.8px;
}

.promo-label i {
  margin-right: 6px;
  color: #ffc35c;
}

.login-promo h1 {
  margin: 26px 0 18px;
  font-size: clamp(42px, 5.1vw, 68px);
  font-weight: 700;
  letter-spacing: -3.5px;
  line-height: 1.08;
}

.login-promo h1 span {
  color: #bcb5ff;
}

.login-promo > p {
  max-width: 380px;
  color: #aaa9c1;
  font-size: 14px;
  line-height: 1.8;
}

.promo-stat {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 54px;
}

.promo-avatars {
  display: flex;
  padding-left: 4px;
}

.promo-avatars span,
.customer-avatar {
  display: inline-grid;
  width: 31px;
  height: 31px;
  place-items: center;
  margin-left: -4px;
  border: 2px solid #211f3d;
  border-radius: 50%;
  background: #c4bcff;
  color: #30285d;
  font-size: 9px;
  font-weight: 700;
}

.promo-avatars span:nth-child(2) {
  background: #ffc987;
  color: #764b27;
}

.promo-avatars span:nth-child(3) {
  background: #a8e1d3;
  color: #245547;
}

.promo-stat strong,
.promo-stat small {
  display: block;
}

.promo-stat strong {
  font-size: 12px;
}

.promo-stat small {
  margin-top: 4px;
  color: #aaa9c1;
  font-size: 10px;
}

.login-art-footer {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  color: #8988a5;
  font-size: 9px;
  letter-spacing: 1px;
}

.login-art-footer i {
  margin-left: 5px;
}

.login-panel {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 36px clamp(24px, 5vw, 76px) 24px;
}

.login-panel-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  color: #85869a;
  font-size: 11px;
}

.login-panel-top a,
.password-label a,
.login-help a {
  color: #6555c9;
  font-weight: 700;
}

.login-panel-top a i {
  margin-left: 5px;
}

.login-card {
  width: min(100%, 390px);
  margin: auto;
  padding: 44px 0;
}

.login-icon {
  display: grid;
  width: 47px;
  height: 47px;
  place-items: center;
  margin-bottom: 24px;
  border-radius: 14px;
  background: #f0edff;
  color: #6555c9;
  font-size: 21px;
}

.login-eyebrow {
  color: #7063c5;
  font-size: 9px;
}

.login-card h2 {
  margin: 10px 0 8px;
  color: #202235;
  font-size: 27px;
  font-weight: 700;
  letter-spacing: -0.8px;
}

.login-subtitle {
  margin-bottom: 30px;
  color: #85869a;
  font-size: 12px;
}

.login-card form > label,
.password-label label {
  display: block;
  margin-bottom: 8px;
  color: #414256;
  font-size: 11px;
  font-weight: 700;
}

.password-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 19px;
}

.password-label a {
  margin-bottom: 8px;
  font-size: 10px;
}

.login-input-wrap {
  display: flex;
  min-height: 47px;
  align-items: center;
  gap: 11px;
  padding: 0 13px;
  border: 1px solid #e5e5ed;
  border-radius: 9px;
  color: #9697a8;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.login-input-wrap:focus-within {
  border-color: #9588e8;
  box-shadow: 0 0 0 3px rgba(112, 99, 197, 0.1);
}

.login-input-wrap > i {
  font-size: 14px;
}

.login-input-wrap input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #292a3d;
  font-size: 11px;
}

.login-input-wrap input::placeholder {
  color: #a7a8b6;
}

.password-toggle {
  padding: 5px;
  border: 0;
  background: transparent;
  color: #88899c;
}

.remember-option {
  display: flex !important;
  align-items: center;
  gap: 8px;
  margin: 17px 0 20px !important;
  color: #6f7085 !important;
  font-size: 10px !important;
  font-weight: 500 !important;
}

.remember-option input {
  width: 14px;
  height: 14px;
  accent-color: #7163c8;
}

.sign-in-button {
  display: flex;
  width: 100%;
  min-height: 47px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 0;
  border-radius: 9px;
  background: #6555c9;
  color: white;
  font-size: 12px;
  font-weight: 700;
  transition: background 0.15s, transform 0.15s;
}

.sign-in-button:hover {
  transform: translateY(-1px);
  background: #5545b8;
}

.preview-notice {
  display: flex;
  gap: 9px;
  margin-top: 20px;
  padding: 12px;
  border: 1px solid #e9e5fb;
  border-radius: 8px;
  background: #f8f7ff;
  color: #77728f;
  font-size: 9px;
  line-height: 1.6;
}

.preview-notice i {
  flex: 0 0 auto;
  color: #7063c5;
}

.login-help {
  margin: 0;
  color: #9697a8;
  font-size: 10px;
  text-align: center;
}

.admin-dashboard {
  display: flex;
  background: #f7f8fc;
}

.admin-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 2;
  display: flex;
  width: 246px;
  flex-direction: column;
  padding: 26px 17px 16px;
  border-right: 1px solid #ececf3;
  background: #fff;
}

.dashboard-brand {
  gap: 10px;
  margin: 0 5px 43px;
  color: #25263a;
  font-size: 13px;
  letter-spacing: 0;
}

.dashboard-brand img {
  width: 36px;
  height: 36px;
  border-radius: 11px;
}

.dashboard-brand > span {
  display: flex;
  flex-direction: column;
}

.dashboard-brand small {
  margin-top: 3px;
  color: #9a9baa;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 1.25px;
}

.sidebar-label {
  margin: 0 11px 11px;
  color: #a3a4b2;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.sidebar-nav {
  display: grid;
  gap: 4px;
}

.sidebar-nav button,
.sidebar-store-link {
  display: flex;
  min-height: 41px;
  align-items: center;
  gap: 11px;
  padding: 0 11px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #77798d;
  font-size: 11px;
  text-align: left;
}

.sidebar-nav button > i,
.sidebar-store-link > i {
  font-size: 15px;
}

.sidebar-nav button.active {
  background: #f0edff;
  color: #6555c9;
  font-weight: 700;
}

.nav-count {
  display: grid;
  width: 19px;
  height: 19px;
  place-items: center;
  margin-left: auto;
  border-radius: 6px;
  background: #fff;
  color: #6555c9;
  font-size: 9px;
  font-weight: 700;
}

.sidebar-bottom {
  margin-top: auto;
}

.sidebar-tip {
  margin: 0 2px 18px;
  padding: 15px;
  border: 1px solid #ece9fb;
  border-radius: 10px;
  background: #faf9ff;
}

.sidebar-tip > i {
  display: grid;
  width: 27px;
  height: 27px;
  place-items: center;
  margin-bottom: 10px;
  border-radius: 8px;
  background: #efecff;
  color: #7063c5;
}

.sidebar-tip strong {
  font-size: 10px;
}

.sidebar-tip p {
  margin: 5px 0 10px;
  color: #89899c;
  font-size: 9px;
  line-height: 1.6;
}

.sidebar-tip button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #6555c9;
  font-size: 9px;
  font-weight: 700;
}

.sidebar-tip button i {
  margin-left: 4px;
}

.sidebar-store-link {
  width: 100%;
  margin-bottom: 10px;
}

.sidebar-profile {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 9px;
  padding: 12px 3px 0;
  border: 0;
  border-top: 1px solid #eeeff4;
  background: transparent;
  text-align: left;
}

.profile-avatar,
.topbar-avatar {
  display: grid;
  width: 33px;
  height: 33px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 11px;
  background: #f4deca;
  color: #805133;
  font-size: 10px;
  font-weight: 700;
}

.profile-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.profile-copy strong {
  overflow: hidden;
  color: #343548;
  font-size: 10px;
  text-overflow: ellipsis;
}

.profile-copy small {
  color: #9899a8;
  font-size: 9px;
}

.sidebar-profile > i {
  color: #999aaa;
}

.dashboard-main {
  width: calc(100% - 246px);
  min-height: 100vh;
  margin-left: 246px;
}

.dashboard-topbar {
  display: flex;
  min-height: 67px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 34px;
  border-bottom: 1px solid #ececf3;
  background: #fff;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #999aaa;
  font-size: 10px;
}

.breadcrumb i {
  font-size: 8px;
}

.breadcrumb strong {
  color: #424356;
  font-weight: 600;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.dashboard-search {
  display: flex;
  width: 221px;
  min-height: 34px;
  align-items: center;
  gap: 8px;
  padding: 0 9px;
  border: 1px solid #ececf2;
  border-radius: 7px;
  color: #999aaa;
}

.dashboard-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  color: #424356;
  font-size: 9px;
}

.dashboard-search input::placeholder {
  color: #a5a6b3;
}

.dashboard-search kbd {
  flex: 0 0 auto;
  padding: 3px 4px;
  border: 1px solid #ececf2;
  border-radius: 4px;
  color: #88899a;
  font-size: 8px;
}

.topbar-icon {
  position: relative;
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 0;
  background: transparent;
  color: #77798d;
  font-size: 15px;
}

.notification-button span {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 6px;
  height: 6px;
  border: 1px solid #fff;
  border-radius: 50%;
  background: #f17b70;
}

.topbar-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 9px;
}

.dashboard-content {
  width: min(100%, 1330px);
  margin: 0 auto;
  padding: 29px 34px 24px;
}

.dashboard-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 22px;
}

.dashboard-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #9293a3;
  font-size: 9px;
}

.dashboard-heading h1 {
  margin: 8px 0 5px;
  color: #26273b;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -0.8px;
}

.dashboard-heading > div > p {
  margin: 0;
  color: #898a9c;
  font-size: 10px;
}

.date-filter {
  display: flex;
  min-height: 35px;
  align-items: center;
  gap: 8px;
  padding: 0 11px;
  border: 1px solid #e7e8ef;
  border-radius: 7px;
  background: #fff;
  color: #66687b;
  font-size: 9px;
}

.date-filter i:last-child {
  margin-left: 5px;
  font-size: 8px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.metric-card,
.dashboard-card {
  border: 1px solid #ececf3;
  border-radius: 10px;
  background: #fff;
}

.metric-card {
  min-width: 0;
  padding: 15px 16px;
}

.metric-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: #858698;
  font-size: 9px;
}

.metric-icon,
.activity-icon {
  display: grid;
  width: 31px;
  height: 31px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  font-size: 14px;
}

.violet {
  background: #f0edff;
  color: #7768d4;
}

.blue {
  background: #eaf2ff;
  color: #5289dd;
}

.orange {
  background: #fff2e7;
  color: #e49a4e;
}

.green {
  background: #e8f7f0;
  color: #4fa681;
}

.metric-value {
  display: block;
  margin-top: 12px;
  color: #2b2c40;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -0.7px;
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 7px;
  font-size: 8px;
}

.metric-change > span,
.sales-summary > span {
  color: #48a17b;
  font-weight: 700;
}

.metric-change small,
.sales-summary > small {
  color: #9a9baa;
  font-size: 8px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(270px, 0.9fr);
  gap: 15px;
  margin-bottom: 16px;
}

.dashboard-card {
  min-width: 0;
  padding: 17px 18px;
}

.card-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-heading h2 {
  margin: 0;
  color: #343548;
  font-size: 12px;
  font-weight: 700;
}

.card-heading p {
  margin: 5px 0 0;
  color: #9697a7;
  font-size: 9px;
}

.card-menu {
  padding: 1px 2px;
  border: 0;
  background: transparent;
  color: #898a9c;
}

.sales-summary {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 18px;
}

.sales-summary > strong {
  color: #292a3e;
  font-size: 21px;
}

.sales-summary > span {
  font-size: 8px;
}

.chart {
  position: relative;
  display: flex;
  height: 153px;
  margin-top: 11px;
  padding: 0 0 21px 27px;
}

.chart-guides {
  position: absolute;
  inset: 0 0 22px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: repeating-linear-gradient(to bottom, transparent 0, transparent 1px, #f0f0f5 1px, #f0f0f5 2px, transparent 2px, transparent 32%);
  color: #a0a1af;
  font-size: 8px;
}

.chart-guides span {
  position: relative;
  top: -4px;
  width: 24px;
  background: #fff;
}

.chart-bars {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: stretch;
  justify-content: space-around;
  gap: 11px;
  padding-left: 9px;
}

.chart-column {
  display: flex;
  min-width: 12px;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 7px;
}

.chart-bar {
  width: min(100%, 25px);
  min-height: 10px;
  border-radius: 5px 5px 2px 2px;
  background: #c6bef7;
  transition: background 0.15s;
}

.chart-column:nth-child(6) .chart-bar,
.chart-bar:hover {
  background: #7565d1;
}

.chart-column > span {
  position: absolute;
  bottom: 0;
  color: #9697a7;
  font-size: 8px;
}

.activity-card {
  padding-bottom: 12px;
}

.activity-stat {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f5;
}

.activity-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-size: 12px;
}

.activity-stat > div {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.activity-stat > div strong {
  color: #414255;
  font-size: 9px;
  font-weight: 600;
}

.activity-stat > div small {
  color: #9b9caa;
  font-size: 8px;
}

.activity-stat > b {
  color: #323347;
  font-size: 12px;
}

.activity-stat > b small {
  color: #48a17b;
  font-size: 8px;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-top: 13px;
  color: #858698;
  font-size: 8px;
}

.activity-footer span:last-child {
  color: #53a380;
}

.activity-footer i {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 50%;
  background: #61c193;
}

.orders-card {
  padding: 17px 0 3px;
}

.orders-heading {
  padding: 0 18px 14px;
}

.view-all {
  padding: 3px 0;
  border: 0;
  background: transparent;
  color: #6555c9;
  font-size: 9px;
  font-weight: 700;
}

.view-all i {
  margin-left: 4px;
}

.orders-table-wrap {
  overflow-x: auto;
}

.orders-table-wrap table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.orders-table-wrap th {
  padding: 10px 13px;
  border-top: 1px solid #f0f0f5;
  border-bottom: 1px solid #f0f0f5;
  background: #fbfbfd;
  color: #9a9baa;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-align: left;
}

.orders-table-wrap th:first-child,
.orders-table-wrap td:first-child {
  padding-left: 18px;
}

.orders-table-wrap td {
  padding: 11px 13px;
  border-bottom: 1px solid #f2f2f6;
  color: #737587;
  font-size: 8px;
}

.orders-table-wrap tr:last-child td {
  border-bottom: 0;
}

.order-id,
.order-amount {
  color: #414255 !important;
  font-weight: 700;
}

.customer-avatar {
  width: 23px;
  height: 23px;
  margin: 0 7px 0 0;
  border: 0;
  background: #f0edff;
  color: #7163c8;
  vertical-align: middle;
  font-size: 7px;
}

tbody tr:nth-child(2) .customer-avatar {
  background: #e8f7f0;
  color: #4d9a79;
}

tbody tr:nth-child(3) .customer-avatar {
  background: #fff2e7;
  color: #ce8843;
}

.order-status {
  display: inline-flex;
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 7px;
  font-weight: 600;
}

.order-status.completed {
  background: #eaf7f1;
  color: #469877;
}

.order-status.processing {
  background: #eef2ff;
  color: #6878c9;
}

.order-status.pending {
  background: #fff5e9;
  color: #cd9149;
}

.dashboard-disclaimer {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 14px 0 0;
  color: #9899a8;
  font-size: 8px;
}

.dashboard-disclaimer i {
  color: #8b84c4;
}

@media (max-width: 1100px) {
  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .admin-login {
    grid-template-columns: 1fr;
  }

  .login-art {
    min-height: 260px;
    padding: 24px;
  }

  .login-promo {
    padding: 35px 0 18px;
  }

  .login-promo h1 {
    margin: 13px 0 8px;
    font-size: 37px;
    letter-spacing: -2px;
  }

  .login-promo > p {
    margin-bottom: 0;
    font-size: 11px;
  }

  .promo-stat,
  .login-art-footer {
    display: none;
  }

  .login-panel {
    min-height: calc(100vh - 260px);
    padding: 20px 24px;
  }

  .login-card {
    padding: 35px 0;
  }

  .admin-sidebar {
    position: static;
    width: 66px;
    flex: 0 0 66px;
    align-items: center;
    padding: 18px 8px;
  }

  .dashboard-brand {
    margin: 0 0 30px;
  }

  .dashboard-brand > span,
  .sidebar-label,
  .sidebar-nav button > span,
  .sidebar-tip,
  .sidebar-store-link,
  .profile-copy,
  .sidebar-profile > i {
    display: none;
  }

  .sidebar-nav {
    width: 100%;
  }

  .sidebar-nav button {
    justify-content: center;
    padding: 0;
  }

  .sidebar-nav button > i {
    font-size: 17px;
  }

  .sidebar-bottom {
    display: flex;
    flex: 1;
    align-items: flex-end;
  }

  .sidebar-profile {
    justify-content: center;
    padding: 12px 0 0;
  }

  .dashboard-main {
    width: calc(100% - 66px);
    margin-left: 0;
  }

  .dashboard-topbar {
    min-height: 58px;
    padding: 0 15px;
  }

  .topbar-actions {
    gap: 7px;
  }

  .dashboard-search {
    width: min(34vw, 180px);
  }

  .dashboard-search kbd,
  .topbar-icon:first-of-type {
    display: none;
  }

  .dashboard-content {
    padding: 22px 15px;
  }
}

@media (max-width: 520px) {
  .dashboard-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .dashboard-heading h1 {
    font-size: 21px;
  }

  .metrics-grid {
    gap: 9px;
  }

  .metric-card {
    padding: 12px;
  }

  .metric-top {
    align-items: flex-start;
    font-size: 8px;
  }

  .metric-icon {
    width: 26px;
    height: 26px;
    font-size: 12px;
  }

  .metric-value {
    font-size: 20px;
  }

  .dashboard-card {
    padding-right: 12px;
    padding-left: 12px;
  }

  .orders-heading {
    padding-right: 12px;
    padding-left: 12px;
  }

  .orders-table-wrap th:first-child,
  .orders-table-wrap td:first-child {
    padding-left: 12px;
  }
}
</style>
