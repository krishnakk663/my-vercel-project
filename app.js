// ===== STATE =====
const state = {
  user: null,
  savedJobs: new Set(),
  currentJobIndex: null,
  currentCategory: 'all',
  registered: JSON.parse(localStorage.getItem('wp_users') || '[]')
};

// ===== JOB DATA =====
const JOBS = [
  {
    id: 0, title: 'Senior UI/UX Designer', company: 'Infosys', location: 'Bangalore',
    salary: '₹18–24 LPA', type: 'Full-time', category: 'design',
    logo: 'IN', logoColor: 'teal', posted: '2h ago',
    description: 'We are looking for an experienced UI/UX Designer to join our product design team. You will work closely with product managers and engineers to create beautiful, user-centric digital experiences.',
    requirements: ['4+ years of UI/UX design experience', 'Proficiency in Figma and Adobe XD', 'Strong portfolio showcasing mobile and web design', 'Experience with design systems', 'Understanding of accessibility standards'],
    perks: ['Health & dental insurance', 'Flexible work hours', 'Annual learning budget ₹50K', 'Team offsites', 'Stock options']
  },
  {
    id: 1, title: 'Full Stack Developer', company: 'TCS', location: 'Remote',
    salary: '₹22–30 LPA', type: 'Remote', category: 'tech',
    logo: 'TC', logoColor: 'blue', posted: '5h ago',
    description: 'TCS is hiring a Full Stack Developer to build scalable web applications. You will work with cutting-edge technologies to solve complex business challenges across global clients.',
    requirements: ['3+ years with React and Node.js', 'Experience with AWS or GCP', 'Strong knowledge of SQL/NoSQL databases', 'Familiarity with CI/CD pipelines', 'Good communication skills'],
    perks: ['Remote-first culture', 'Quarterly bonuses', 'Provident fund', 'Paid certifications', '25 days annual leave']
  },
  {
    id: 2, title: 'Product Manager', company: 'Wipro', location: 'Pune',
    salary: '₹28–40 LPA', type: 'Hybrid', category: 'tech',
    logo: 'WI', logoColor: 'orange', posted: '1d ago',
    description: 'Wipro is searching for a strategic Product Manager to lead product initiatives from conception to launch. You will own the product roadmap and collaborate with cross-functional teams.',
    requirements: ['5+ years in product management', 'Experience with Agile/Scrum', 'Strong analytical and data skills', 'MBA or equivalent preferred', 'Excellent stakeholder management'],
    perks: ['Hybrid model – 3 days WFH', 'ESOPs', 'On-site gym', 'Childcare benefits', 'Annual international trip']
  },
  {
    id: 3, title: 'Data Scientist', company: 'HCL Technologies', location: 'Hyderabad',
    salary: '₹20–28 LPA', type: 'Full-time', category: 'tech',
    logo: 'HC', logoColor: 'purple', posted: '2d ago',
    description: 'Join HCL's AI & Analytics practice as a Data Scientist. You will build machine learning models and derive actionable insights from large datasets to drive business decisions.',
    requirements: ['3+ years of data science experience', 'Proficiency in Python and R', 'Experience with TensorFlow or PyTorch', 'Strong statistics foundation', 'Knowledge of data pipelines'],
    perks: ['Research publication support', 'Conference allowance', 'Flexible timings', 'Medical insurance', 'Performance bonuses']
  },
  {
    id: 4, title: 'Digital Marketing Lead', company: 'Zomato', location: 'Gurugram',
    salary: '₹14–20 LPA', type: 'Full-time', category: 'marketing',
    logo: 'ZO', logoColor: 'orange', posted: '3d ago',
    description: 'Zomato is looking for a creative Digital Marketing Lead to drive brand campaigns across social media, SEO, and paid channels. You will own growth metrics and lead a small team.',
    requirements: ['4+ years digital marketing experience', 'Hands-on SEO/SEM expertise', 'Proficiency with Meta Ads & Google Ads', 'Data-driven mindset', 'Content strategy experience'],
    perks: ['Free Zomato Gold', 'Creative work environment', 'Health benefits', 'Team lunches', 'Fast-track promotions']
  },
  {
    id: 5, title: 'Financial Analyst', company: 'HDFC Bank', location: 'Mumbai',
    salary: '₹12–18 LPA', type: 'Full-time', category: 'finance',
    logo: 'HD', logoColor: 'blue', posted: '4d ago',
    description: 'HDFC Bank seeks a sharp Financial Analyst to support investment decisions, financial modeling, and reporting. You will work with senior leadership on strategic projects.',
    requirements: ['2+ years financial analysis experience', 'CFA Level 1 preferred', 'Advanced Excel and financial modeling', 'Understanding of banking products', 'Strong attention to detail'],
    perks: ['Competitive CTC', 'Banking perks', 'Pension plan', 'Housing loan benefits', 'Leadership training program']
  },
  {
    id: 6, title: 'DevOps Engineer', company: 'Razorpay', location: 'Remote',
    salary: '₹24–32 LPA', type: 'Remote', category: 'tech',
    logo: 'RZ', logoColor: 'teal', posted: '1d ago',
    description: 'Razorpay is hiring a skilled DevOps Engineer to build and maintain our cloud infrastructure at scale. You will ensure 99.99% uptime for one of India\'s leading fintech platforms.',
    requirements: ['4+ years DevOps experience', 'Expertise in Kubernetes & Docker', 'Experience with Terraform/Ansible', 'AWS/GCP certification a plus', 'Strong scripting skills (Bash/Python)'],
    perks: ['100% remote', 'Top-of-market pay', 'ESOP pool', 'Premium health cover', 'Learning stipend ₹75K/yr']
  },
  {
    id: 7, title: 'Content Strategist', company: 'Byju's', location: 'Bangalore',
    salary: '₹10–16 LPA', type: 'Hybrid', category: 'marketing',
    logo: 'BY', logoColor: 'purple', posted: '5d ago',
    description: 'Byju's is looking for a passionate Content Strategist to create compelling educational and marketing content that reaches millions of learners across India.',
    requirements: ['3+ years content writing/strategy', 'Experience in EdTech preferred', 'Strong SEO writing skills', 'Ability to simplify complex topics', 'Portfolio of long-form content'],
    perks: ['Hybrid flexibility', 'Learning platform access', 'Collaborative culture', 'Health insurance', 'Annual bonus']
  }
];

// ===== SCREEN NAVIGATION =====
function showScreen(id) {
  const screens = document.querySelectorAll('.screen');
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(id);
  if (!next || current === next) return;

  if (current) {
    current.classList.add('slide-out-left');
    setTimeout(() => {
      current.classList.remove('active', 'slide-out-left');
    }, 380);
  }

  next.classList.add('active');
  next.scrollTop = 0;
}

// ===== AUTH =====
function handleRegister(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
  const firstName = inputs[0].value.trim();
  const email = inputs[2] ? inputs[2].value.trim() : inputs[1].value.trim();

  const emailInput = form.querySelector('input[type="email"]');
  const emailVal = emailInput.value.trim();

  const existing = state.registered.find(u => u.email === emailVal);
  if (existing) {
    showToast('⚠️ Email already registered. Sign in instead.');
    return;
  }

  const newUser = { firstName, email: emailVal };
  state.registered.push(newUser);
  localStorage.setItem('wp_users', JSON.stringify(state.registered));
  state.user = newUser;

  loginUser(newUser);
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;

  if (!email || !pass) { showToast('⚠️ Please fill in all fields'); return; }

  // Demo: accept any credentials or stored users
  const found = state.registered.find(u => u.email === email);
  const user = found || { firstName: email.split('@')[0], email };

  state.user = user;
  loginUser(user);
}

function handleGuestLogin() {
  state.user = { firstName: 'Guest', email: 'guest@workpulse.in' };
  loginUser(state.user);
}

function loginUser(user) {
  const nameEl = document.getElementById('user-name-display');
  if (nameEl) nameEl.textContent = `Hi, ${user.firstName} 👋`;
  const avatar = document.querySelector('.avatar');
  if (avatar) avatar.textContent = user.firstName[0].toUpperCase();

  renderJobs(JOBS);
  showScreen('screen-home');
  showToast(`Welcome, ${user.firstName}! 🎉`);
}

// ===== ROLE TOGGLE =====
function setRole(btn) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const role = btn.dataset.role;
  document.getElementById('role-field-jobseeker').style.display = role === 'jobseeker' ? 'flex' : 'none';
  document.getElementById('role-field-employer').style.display = role === 'employer' ? 'flex' : 'none';
}

// ===== PASSWORD TOGGLE =====
function togglePass(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  const showing = input.type === 'text';
  input.type = showing ? 'password' : 'text';
  btn.style.color = showing ? 'var(--text3)' : 'var(--accent)';
}

// ===== JOB RENDERING =====
function renderJobs(jobs) {
  const list = document.getElementById('job-list');
  if (!list) return;
  list.innerHTML = '';

  if (jobs.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text3);padding:32px 0;">No jobs found for this filter.</p>';
    return;
  }

  jobs.forEach((job, idx) => {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.onclick = () => openJob(job.id);
    card.innerHTML = `
      <div class="job-card-logo company-logo ${job.logoColor}">${job.logo}</div>
      <div class="job-card-body">
        <div class="job-card-top">
          <div>
            <h4>${job.title}</h4>
            <p class="company-name">${job.company} · ${job.location}</p>
          </div>
          <span class="posted-time">${job.posted}</span>
        </div>
        <div class="job-tags">
          <span class="type-tag ${job.type === 'Remote' ? 'remote' : job.type === 'Hybrid' ? 'hybrid' : ''}">${job.type}</span>
          <span class="salary">${job.salary}</span>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

function filterJobs(query) {
  const q = query.toLowerCase();
  const filtered = JOBS.filter(j =>
    j.title.toLowerCase().includes(q) ||
    j.company.toLowerCase().includes(q) ||
    j.location.toLowerCase().includes(q)
  );
  const catFiltered = state.currentCategory === 'all'
    ? filtered
    : filtered.filter(j => j.category === state.currentCategory || (state.currentCategory === 'remote' && j.type === 'Remote'));
  renderJobs(catFiltered);
}

function filterCategory(btn, cat) {
  state.currentCategory = cat;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all' ? JOBS
    : cat === 'remote' ? JOBS.filter(j => j.type === 'Remote')
    : JOBS.filter(j => j.category === cat);
  renderJobs(filtered);
}

// ===== JOB DETAIL =====
function openJob(id) {
  const job = JOBS.find(j => j.id === id);
  if (!job) return;
  state.currentJobIndex = id;

  const body = document.getElementById('job-detail-body');
  body.innerHTML = `
    <div class="detail-company">
      <div class="detail-logo company-logo ${job.logoColor}">${job.logo}</div>
      <div class="detail-company-info">
        <h3>${job.title}</h3>
        <p>${job.company} · ${job.location}</p>
      </div>
    </div>

    <div class="detail-tags">
      <span class="detail-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
        ${job.type}
      </span>
      <span class="detail-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${job.location}
      </span>
      <span class="detail-tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${job.posted}
      </span>
    </div>

    <div class="detail-section">
      <h5>About the Role</h5>
      <p>${job.description}</p>
    </div>

    <div class="detail-section">
      <h5>Requirements</h5>
      <ul>${job.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>

    <div class="detail-section">
      <h5>Perks & Benefits</h5>
      <ul>${job.perks.map(p => `<li>${p}</li>`).join('')}</ul>
    </div>
  `;

  document.getElementById('apply-salary').textContent = job.salary;

  const saveBtn = document.getElementById('saveBtn');
  saveBtn.className = 'save-btn' + (state.savedJobs.has(id) ? ' saved' : '');

  showScreen('screen-job-detail');
}

function toggleSave() {
  const id = state.currentJobIndex;
  const saveBtn = document.getElementById('saveBtn');
  if (state.savedJobs.has(id)) {
    state.savedJobs.delete(id);
    saveBtn.className = 'save-btn';
    showToast('Removed from saved jobs');
  } else {
    state.savedJobs.add(id);
    saveBtn.className = 'save-btn saved';
    showToast('✅ Job saved!');
  }
}

function applyJob() {
  const job = JOBS.find(j => j.id === state.currentJobIndex);
  showToast(`🚀 Applied to ${job?.company || 'job'}! Good luck!`);
}

// ===== BOTTOM NAV TABS =====
function switchTab(btn, tab) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (tab === 'saved') {
    const saved = JOBS.filter(j => state.savedJobs.has(j.id));
    renderJobs(saved);
    showToast(saved.length > 0 ? `📌 ${saved.length} saved job${saved.length > 1 ? 's' : ''}` : 'No saved jobs yet');
  } else if (tab === 'home') {
    renderJobs(JOBS);
  } else if (tab === 'profile') {
    showToast('👤 Profile coming soon!');
  } else if (tab === 'search') {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) searchInput.focus();
  }
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== FILTER (placeholder) =====
function toggleFilter() {
  showToast('🔧 Advanced filters coming soon!');
}

function showProfile() {
  showToast(`👤 ${state.user?.email || 'Guest'}`);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Make splash screen visible
  const splash = document.getElementById('screen-splash');
  if (splash) {
    splash.classList.add('active');
  }
});