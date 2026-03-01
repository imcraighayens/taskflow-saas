import { Task, Feature, Activity, User } from './types';

export const DEFAULT_USERS: User[] = [
  { id: 'u1', name: 'Tshiamo', email: 'tshiamo@ecokode.com', role: 'admin', status: 'active', initials: 'TM' },
  { id: 'u2', name: 'Kgosi', email: 'kgosi@ecokode.com', role: 'admin', status: 'active', initials: 'KG' },
  { id: 'u3', name: 'Craig', email: 'craig@ecokode.com', role: 'admin', status: 'active', initials: 'CR' },
];

export const DEFAULT_TASKS: Task[] = [
  {id:1, title:'Design new onboarding flow',        desc:'Wireframes and hi-fi mockups for user onboarding screens.',          status:'todo',        priority:'high', tag:'design', due:'2026-03-10', done:false, fav:true,  assignee:'Craig'},
  {id:2, title:'Implement REST API endpoints',       desc:'Build /tasks and /projects endpoints with full CRUD support.',        status:'in-progress', priority:'high', tag:'dev',    due:'2026-03-05', done:false, fav:false, assignee:'Tshiamo'},
  {id:3, title:'Write unit tests for auth module',   desc:'Cover login, logout and token refresh using Jest.',                  status:'todo',        priority:'mid',  tag:'qa',     due:'2026-03-15', done:false, fav:false, assignee:'Kgosi'},
  {id:4, title:'Update brand style guide',           desc:'Revise typography scale and add new icon set throughout the app.',   status:'done',        priority:'low',  tag:'design', due:'2026-02-20', done:true,  fav:false, assignee:'Craig'},
  {id:5, title:'Set up CI/CD pipeline',              desc:'Configure GitHub Actions for auto-deploy to staging and production.',status:'in-progress', priority:'high', tag:'dev',    due:'2026-03-02', done:false, fav:false, assignee:'Tshiamo'},
  {id:6, title:'Data migration script',              desc:'Move legacy records from MySQL to PostgreSQL with zero downtime.',   status:'todo',        priority:'mid',  tag:'data',   due:'2026-03-18', done:false, fav:false, assignee:'Tshiamo'},
  {id:7, title:'Quarterly review presentation',      desc:'Prepare slides and talking points for Q1 stakeholder review.',      status:'done',        priority:'mid',  tag:'mgmt',   due:'2026-02-28', done:true,  fav:false, assignee:'Craig'},
  {id:8, title:'Accessibility audit',                desc:'Run axe-core and fix all WCAG 2.1 AA violations before launch.',    status:'todo',        priority:'low',  tag:'qa',     due:'2026-03-20', done:false, fav:false, assignee:'Kgosi'},
  {id:9, title:'Dashboard analytics module',         desc:'Build real-time charts using Chart.js for fleet activity feed.',    status:'in-progress', priority:'high', tag:'data',   due:'2026-03-08', done:false, fav:true,  assignee:'Tshiamo'},
  {id:10,title:'Mobile push notification setup',     desc:'Integrate Firebase Cloud Messaging for iOS and Android clients.',   status:'todo',        priority:'mid',  tag:'dev',    due:'2026-03-22', done:false, fav:false, assignee:'Tshiamo'},
  {id:11,title:'Component library documentation',    desc:'Document all reusable UI components with Storybook examples.',      status:'done',        priority:'low',  tag:'design', due:'2026-02-25', done:true,  fav:false, assignee:'Kgosi'},
  {id:12,title:'Security penetration testing',       desc:'Engage third-party pen-test firm and triage all findings.',         status:'todo',        priority:'high', tag:'qa',     due:'2026-04-01', done:false, fav:false, assignee:'Craig'},
  {id:13,title:'Fleet GPS data pipeline',            desc:'Stream real-time vehicle location data into the analytics store.',  status:'in-progress', priority:'high', tag:'data',   due:'2026-03-12', done:false, fav:true,  assignee:'Tshiamo'},
  {id:14,title:'Vendor contract renewals',           desc:'Review and renew SLAs with all active technology vendors.',         status:'todo',        priority:'mid',  tag:'mgmt',   due:'2026-03-30', done:false, fav:false, assignee:'Craig'},
  {id:15,title:'Dark mode polish pass',              desc:'Fix inconsistent colours in modals, tooltips and data tables.',     status:'done',        priority:'low',  tag:'design', due:'2026-02-22', done:true,  fav:false, assignee:'Tshiamo'},
  {id:16,title:'Load testing (10k concurrent)',      desc:'Stress-test API gateway using k6 and identify bottlenecks.',        status:'todo',        priority:'high', tag:'qa',     due:'2026-03-28', done:false, fav:false, assignee:'Kgosi'},
];

export const MP_DEFAULT: Feature[] = [
  {id:'mp1', name:'Payroll Reconciliation', desc:'Automatically reconcile payroll data against bank statements and flag discrepancies for review. Reduces manual effort by 80%.',               icon:'💰', dept:['finance'],      status:'available',   author:'Craig',    version:'2.1.0', installs:24, rating:4.8, tags:['automation','finance']},
  {id:'mp2', name:'Leave Management Portal', desc:'End-to-end employee leave requests, approvals and balance tracking. Integrates with calendar and sends automated notifications.',           icon:'🏖', dept:['hr'],          status:'installed',   author:'Kgosi',    version:'1.4.2', installs:31, rating:4.9, tags:['hr','workflow']},
  {id:'mp3', name:'Budget Tracker Pro',      desc:'Real-time departmental budget monitoring with forecast charts, approval workflows and over-budget alerts to finance leads.',             icon:'📊', dept:['finance','ops'],status:'available',   author:'Tshiamo',   version:'3.0.0', installs:18, rating:4.6, tags:['finance','reporting']},
  {id:'mp4', name:'Onboarding Wizard',       desc:'Guided new-hire onboarding checklist with document collection, IT provisioning requests and buddy assignment automation.',               icon:'🎓', dept:['hr'],          status:'installed',   author:'Tshiamo',  version:'1.0.1', installs:40, rating:4.7, tags:['hr','onboarding']},
  {id:'mp5', name:'Contract Lifecycle Mgr',  desc:'Draft, review, sign and archive contracts in one place. Built-in e-signature, deadline alerts and clause compliance checks.',           icon:'⚖', dept:['legal','finance'],status:'available', author:'Craig',    version:'1.2.0', installs:12, rating:4.5, tags:['legal','contracts']},
  {id:'mp6', name:'Fleet GPS Dashboard',     desc:'Real-time vehicle tracking, route history replay, fuel consumption analytics and geofence alerts — powered by EcoTrack data.',         icon:'🚗', dept:['operations'],  status:'installed',   author:'Craig',    version:'4.0.0', installs:67, rating:5.0, tags:['fleet','tracking','ops']},
  {id:'mp7', name:'Sales Pipeline CRM',      desc:'Kanban-style deal pipeline with lead scoring, follow-up reminders, email templates and revenue forecasting dashboards.',                icon:'📈', dept:['sales'],       status:'available',   author:'Tshiamo',   version:'2.3.1', installs:22, rating:4.4, tags:['sales','crm']},
  {id:'mp8', name:'Design Token Library',    desc:'Shared Figma-to-code design token sync. One-click export to CSS variables, keeping dev and design perfectly in sync.',                 icon:'🎨', dept:['design','engineering'],status:'parked',author:'Tshiamo',version:'0.9.0', installs:0,  rating:0,   tags:['design','dev']},
  {id:'mp9', name:'Expense Claim Automation',desc:'Submit, approve and reimburse employee expenses with OCR receipt scanning, policy checks and direct bank transfer integration.',        icon:'🧾', dept:['finance','hr'], status:'available',  author:'Kgosi',    version:'1.1.0', installs:29, rating:4.6, tags:['finance','expenses']},
  {id:'mp10',name:'Performance Review Suite',desc:'360° employee reviews with rating scales, goal tracking, calibration sessions and automated development plan generation.',              icon:'⭐', dept:['hr'],          status:'coming-soon', author:'Craig',    version:'0.1.0', installs:0,  rating:0,   tags:['hr','performance']},
  {id:'mp11',name:'Compliance Audit Tool',   desc:'Automated ISO 27001 / POPIA compliance checks, evidence collection, gap analysis reports and remediation task assignment.',            icon:'🔐', dept:['legal','engineering'],status:'in-review',author:'Craig',version:'0.8.0',installs:3, rating:3.8, tags:['compliance','security']},
  {id:'mp12',name:'Micro-Lending Engine',    desc:'FlowCash-ready affordability scoring, loan origination, repayment scheduling and arrears management for embedded fintech products.',    icon:'💳', dept:['finance'],     status:'parked',      author:'Craig',    version:'0.5.0', installs:0,  rating:0,   tags:['fintech','lending']},
  {id:'mp13',name:'Drone Incident Reporter', desc:'Field reporting tool for drone security incidents — photo capture, GPS tagging, auto-generated PDF reports to dispatch and clients.',   icon:'🚁', dept:['operations'],  status:'parked',      author:'Tshiamo',  version:'0.3.0', installs:0,  rating:0,   tags:['security','drone']},
  {id:'mp14',name:'IT Asset Tracker',        desc:'Track hardware inventory, software licences, warranty expiry and IT request fulfilment with barcode scanning and helpdesk integration.',icon:'💻', dept:['engineering','ops'],status:'available',author:'Tshiamo',version:'2.0.0',installs:15,rating:4.3,tags:['it','assets']},
  {id:'mp15',name:'Client Portal Builder',   desc:'White-label portal generator for municipal and corporate clients — document sharing, progress dashboards, billing history.',             icon:'🏛', dept:['sales','operations'],status:'in-review',author:'Craig',version:'0.7.0',installs:2,rating:4.0,tags:['portal','clients']},
  {id:'mp16',name:'AI Affordability Check',  desc:'Machine-learning credit decisioning for moola/FlowCash — real-time bureau integrations, fraud signals and explainability reports.',    icon:'🤖', dept:['finance','engineering'],status:'parked',author:'Craig',version:'0.2.0',installs:0,rating:0,tags:['ai','fintech']},
];

export const DEFAULT_ACTIVITY: Activity[] = [
  {type:'blue',text:'Sprint started',time:'Just now'},
  {type:'green',text:'Quarterly review marked complete',time:'4h ago'},
  {type:'orange',text:'REST API endpoints started',time:'6h ago'},
];

export const TAG_GRADS: Record<string, string> = {
  design:'linear-gradient(135deg,#F97316,#EC4899)',
  dev:   'linear-gradient(135deg,#4A6CF7,#8B5CF6)',
  data:  'linear-gradient(135deg,#06B6D4,#10B981)',
  mgmt:  'linear-gradient(135deg,#F59E0B,#F97316)',
  qa:    'linear-gradient(135deg,#8B5CF6,#EC4899)',
  docs:  'linear-gradient(135deg,#10B981,#06B6D4)',
};

export const STATUS_GRADS: Record<string, string> = {
  todo: 'linear-gradient(135deg,#F97316,#F59E0B)', // Orange/Amber
  'in-progress': 'linear-gradient(135deg,#4A6CF7,#8B5CF6)', // Blue/Purple
  done: 'linear-gradient(135deg,#10B981,#06B6D4)', // Emerald/Cyan
};

export const ACT_COLORS: Record<string, string> = {
  blue: '#4A6CF7',
  green: '#10B981',
  orange: '#F97316',
  red: '#EF4444',
  purple: '#8B5CF6',
};

export const AV_COLORS = ['#4A6CF7','#8B5CF6','#F97316','#10B981','#EC4899','#06B6D4','#F59E0B','#EF4444'];
