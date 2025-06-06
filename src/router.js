import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import client from '@/helpers/client';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Boards = () => import(/* webpackChunkName: "boards" */ '@/views/Boards.vue');

const Simulator = () => import(/* webpackChunkName: "simulator" */ '@/views/Bootcamp/Simulator.vue');
const CreateBanner = () => import(/* webpackChunkName: "createbanner" */ '@/views/CreateBanner.vue');

const Jobs = () => import(/* webpackChunkName: "jobs" */ '@/views/Jobs/Jobs.vue');
const GangJobs = () => import(/* webpackChunkName: "gangjobs" */ '@/views/Jobs/GangJobs.vue');

const Tutorial = () => import(/* webpackChunkName: "tutorial" */ '@/views/News/Tutorial.vue');
const Overview = () => import(/* webpackChunkName: "overview" */ '@/views/Overview/Overview.vue');
const Resources = () =>
  import(/* webpackChunkName: "resources" */ '@/views/Overview/Resources.vue');
const PaymentHistory = () =>
  import(/* webpackChunkName: "history" */ '@/views/Overview/History.vue');

const News = () => import(/* webpackChunkName: "news" */ '@/views/News/News.vue');

const Base = () => import(/* webpackChunkName: "base" */ '@/views/Overview/Base.vue');

const Buildings = () => import(/* webpackChunkName: "buildings" */ '@/views/Buildings/Office.vue');
const Drugs = () => import(/* webpackChunkName: "drugs" */ '@/views/Buildings/Drugs.vue');
const Weapons = () => import(/* webpackChunkName: "weapons" */ '@/views/Buildings/Weapons.vue');
const Alcohol = () => import(/* webpackChunkName: "alcohol" */ '@/views/Buildings/Alcohol.vue');
const Defense = () => import(/* webpackChunkName: "defense" */ '@/views/Buildings/Defense.vue');
const BuildingDetail = () =>
  import(/* webpackChunkName: "buildingdetail" */ '@/components/BuildingDetail.vue');

const DrugDetail = () => import(/* webpackChunkName: "drugdetail" */ '@/components/DrugDetail.vue');

const Units = () => import(/* webpackChunkName: "units" */ '@/views/Bootcamp/Units.vue');
const UnitsBunker = () => import(/* webpackChunkName: "unitsbunker" */ '@/views/Bootcamp/Bunker.vue');
const UnitsSettings = () =>
  import(/* webpackChunkName: "unitssettings" */ '@/views/Bootcamp/Settings.vue');
const UnitsHelp = () =>
  import(/* webpackChunkName: "unitshelp" */ '@/views/Bootcamp/Help.vue');
const Training = () => import(/* webpackChunkName: "training" */ '@/views/Bootcamp/Training.vue');

const Missions = () => import(/* webpackChunkName: "missions" */ '@/views/Actions/Actions.vue');
const Occup = () => import(/* webpackChunkName: "occupy" */ '@/views/Actions/Occup.vue');

const Outgoing = () => import(/* webpackChunkName: "outgoing" */ '@/views/Actions/Outgoing.vue');
const Incoming = () => import(/* webpackChunkName: "incoming" */ '@/views/Actions/Incoming.vue');
const Targets = () => import(/* webpackChunkName: "targets" */ '@/views/Actions/Targets.vue');
const Station = () => import(/* webpackChunkName: "station" */ '@/views/Actions/Station.vue');
const Transport = () => import(/* webpackChunkName: "transport" */ '@/views/Actions/Transport.vue');

const HallOfFame = () => import(/* webpackChunkName: "hall-of-fame" */ '@/views/HallOfFame.vue');

const Gangs = () => import(/* webpackChunkName: "gangs" */ '@/views/Gangs/Gangs.vue');
const GangCreate = () => import(/* webpackChunkName: "gang-create" */ '@/views/Gangs/Create.vue');
const Gang = () => import(/* webpackChunkName: "gang" */ '@/views/Gangs/Gang.vue');
const GangSettings = () =>
  import(/* webpackChunkName: "gang-settings" */ '@/views/Gangs/GangSettings.vue');
const GangBuildings = () =>
  import(/* webpackChunkName: "gang-buildings" */ '@/views/Gangs/Buildings.vue');
const Diplomacy = () =>
  import(/* webpackChunkName: "gang-diplomacy" */ '@/views/Gangs/Diplomacy.vue');
const GangDeposits = () =>
  import(/* webpackChunkName: "gang-deposits" */ '@/views/Gangs/Deposits.vue');
const GangFights = () => import(/* webpackChunkName: "gang-fights" */ '@/views/Gangs/Fights.vue');
const Rewards = () => import(/* webpackChunkName: "rewards" */ '@/views/Rewards.vue');

const Pablo = () => import(/* webpackChunkName: "pablo" */ '@/views/Pablo.vue');
const Tasks = () => import(/* webpackChunkName: "tasks" */ '@/views/Tasks.vue');

const NewContract = () =>
  import(/* webpackChunkName: "newcontract" */ '@/views/Contracts/Create.vue');
const Contracts = () =>
  import(/* webpackChunkName: "contracts" */ '@/views/Contracts/Contracts.vue');

const Shop = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop.vue');
const Tokens = () => import(/* webpackChunkName: "tokens" */ '@/views/Shop/Tokens.vue');

const Withdraw = () => import(/* webpackChunkName: "withdraw" */ '@/views/Market/Withdraw.vue');

const WMap = () => import(/* webpackChunkName: "map" */ '@/views/Map/Map.vue');
const Territory = () => import(/* webpackChunkName: "territory" */ '@/views/Map/Territory.vue');
const Leaderboards = () =>
  import(/* webpackChunkName: "leaderboards" */ '@/views/Leaderboards/Leaderboards.vue');
const Heistboard = () =>
  import(/* webpackChunkName: "heistboard" */ '@/views/Leaderboards/Heistboard.vue');
const Fightboard = () =>
  import(/* webpackChunkName: "fightboard" */ '@/views/Leaderboards/Fightboard.vue');
const Jobboard = () =>
  import(/* webpackChunkName: "jobboard" */ '@/views/Leaderboards/Jobboard.vue');
const LotteryBoard = () =>
  import(/* webpackChunkName: "lotteryboard" */ '@/views/Leaderboards/LotteryBoard.vue');
const CrueltyBoard = () =>
  import(/* webpackChunkName: "crueltyboard" */ '@/views/Leaderboards/CrueltyBoard.vue');

const DeleteBuilding = () =>
  import(/* webpackChunkName: "jobboard" */ '@/views/Settings/DeleteBuilding.vue');


const EarlyAccess = () => import(/* webpackChunkName: "earlyaccess" */ '@/views/EarlyAccess.vue');
const Settings = () => import(/* webpackChunkName: "settings" */ '@/views/Settings/Settings.vue');
const Privacy = () => import(/* webpackChunkName: "privacy" */ '@/views/Settings/Privacy.vue');
const History = () => import(/* webpackChunkName: "userhistory" */ '@/views/Settings/History.vue');

const Referral = () => import(/* webpackChunkName: "referral" */ '@/views/Referral.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const Help = () => import(/* webpackChunkName: "help" */ '@/views/Help/Help.vue');
const GetStarted = () => import(/* webpackChunkName: "getstarted" */ '@/views/Help/GetStarted.vue');
const Guides = () => import(/* webpackChunkName: "guides" */ '@/views/Help/Guides.vue');

const Error404 = () => import(/* webpachChunkName: "error404" */ '@/views/404.vue');

Vue.use(Router);

setInterval(() => {
  store.dispatch('updateTimestamp');
}, 1000);
export let lastRoute = null;


const requireAuth = (to, from, next) => {
  lastRoute = from;
  if (to.path === '/banner' || from.path === '/banner') {
    store.dispatch('hideLoading');
    next({ name: 'banner' })
  }
  else if (client.ws.readyState === 3 && store.state.auth.account) {
    client.restart()
    store.dispatch('showLoading');
    store.dispatch('login', store.state.auth.account).then(() => {
      if (store.state.auth.username) {
        next();
        store.dispatch('hideLoading');
        // store.dispatch('init', { user: store.state.auth.account, showLoading: true }).then(() => {
        //   next();
        // });
      } else {
        const redirect = to.fullPath === '/' ? undefined : to.fullPath;
        next({ name: 'home', query: { redirect } });
      }
    });
  } else if (!store.state.game.user && store.state.auth.account) {
    store.dispatch('showLoading');

    store.dispatch('login', store.state.auth.account).then(() => {
      if (store.state.auth.username) {

        store.dispatch('hideLoading');
        next();

        // store.dispatch('init', { user: store.state.auth.account, showLoading: true }).then(() => {
        //   next();
        // });
      } else {
        const redirect = to.fullPath === '/' ? undefined : to.fullPath;
        next({ name: 'home', query: { redirect } });
      }
    });
  } else if (!store.state.auth.username) {
    //store.dispatch('hideLoading');

    const redirect = to.fullPath === '/' ? undefined : to.fullPath;
    next({ name: 'home', query: { redirect } });

  }
  else {
    next();
  }
};


export default new Router({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/banner',
      name: 'banner',
      component: CreateBanner
    },
    {
      path: '/units/simulator/:values',
      name: 'simulator',
      component: Simulator
    },
    {
      path: '/home',
      name: 'rewards',
      component: Rewards,
      beforeEnter: requireAuth,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/pablo',
      name: 'pablo',
      component: Pablo,
      beforeEnter: requireAuth,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: requireAuth,
      meta: {
        base: "production",
        hideSidebar: true,
      },
    },
    {
      path: '/boards/pablo',
      name: 'boards',
      component: Boards,
      beforeEnter: requireAuth,
      meta: {
        base: "pablo",
        hideSidebar: true,
      },
    },
    {
      path: '/boards/fights',
      name: 'boards',
      component: Boards,
      beforeEnter: requireAuth,
      meta: {
        base: "fights",
        hideSidebar: true,
      },
    },
    {
      path: '/boards/contracts',
      name: 'boards',
      component: Boards,
      beforeEnter: requireAuth,
      meta: {
        base: "contracts",
        hideSidebar: true,
      },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      beforeEnter: requireAuth,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/news',
      name: 'news',
      beforeEnter: requireAuth,
      component: News,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      beforeEnter: requireAuth,
      component: Tutorial,
    },
    {
      path: '/overview',
      name: 'overview',
      beforeEnter: requireAuth,
      component: Overview,
    },
    {
      path: '/overview/resources',
      name: 'resources',
      beforeEnter: requireAuth,
      component: Resources,
    },
    {
      path: '/overview/base',
      name: 'base',
      beforeEnter: requireAuth,
      component: Base,
    },
    {
      path: '/overview/payment',
      name: 'history',
      beforeEnter: requireAuth,
      component: PaymentHistory,
    },
    {
      path: '/jobs',
      name: 'jobs',
      beforeEnter: requireAuth,
      component: Jobs,
    },
    {
      path: '/jobs/gang',
      name: 'gangjobs',
      beforeEnter: requireAuth,
      component: GangJobs,
    },
    {
      path: '/buildings',
      name: 'buildings',
      beforeEnter: requireAuth,
      component: Buildings,
    },
    {
      path: '/buildings/drugs',
      name: 'drugs',
      beforeEnter: requireAuth,
      component: Drugs,
    },
    {
      path: '/buildings/weapons',
      name: 'weapons',
      beforeEnter: requireAuth,
      component: Weapons,
    },
    {
      path: '/buildings/alcohol',
      name: 'alcohol',
      beforeEnter: requireAuth,
      component: Alcohol,
    },
    {
      path: '/buildings/defense',
      name: 'defense',
      beforeEnter: requireAuth,
      component: Defense,
    },
    {
      path: '/buildings/detail',
      name: 'buildingdetail',
      beforeEnter: requireAuth,
      component: BuildingDetail,
    },
    {
      path: '/drugs/detail',
      name: 'drugdetail',
      beforeEnter: requireAuth,
      component: DrugDetail,
    },
    {
      path: '/units',
      name: 'units',
      beforeEnter: requireAuth,
      component: Units,
    },
    {
      path: '/units/training',
      name: 'training',
      beforeEnter: requireAuth,
      component: Training,
    },
    {
      path: '/units/help',
      name: 'unitshelp',
      beforeEnter: requireAuth,
      component: UnitsHelp,
    },
    {
      path: '/units/bunker',
      name: 'unitsbunker',
      beforeEnter: requireAuth,
      component: UnitsBunker,
    },
    {
      path: '/units/settings',
      name: 'unitsettings',
      beforeEnter: requireAuth,
      component: UnitsSettings,
    },
    {
      path: '/actions',
      name: 'missions',
      beforeEnter: requireAuth,
      component: Missions,
    },
    {
      path: '/actions/transport',
      name: 'transport',
      beforeEnter: requireAuth,
      component: Transport,
    },
    {
      path: '/actions/occupy',
      name: 'occupy',
      beforeEnter: requireAuth,
      component: Occup,
    },
    {
      path: '/actions/outgoing',
      name: 'outgoing',
      beforeEnter: requireAuth,
      component: Outgoing,
    },
    {
      path: '/actions/incoming',
      name: 'incoming',
      beforeEnter: requireAuth,
      component: Incoming,
    },
    {
      path: '/actions/targets',
      name: 'targets',
      beforeEnter: requireAuth,
      component: Targets,
    },
    {
      path: '/actions/transport',
      name: 'transport',
      beforeEnter: requireAuth,
      component: Transport,
    },
    {
      path: '/actions/station',
      name: 'station',
      beforeEnter: requireAuth,
      component: Station,
    },
    {
      path: '/hall-of-fame',
      name: 'hall-of-fame',
      beforeEnter: requireAuth,
      component: HallOfFame,
    },
    {
      path: '/contracts',
      name: 'contracts',
      beforeEnter: requireAuth,
      component: Contracts,
    },
    {
      path: '/contracts/create',
      name: 'newcontract',
      beforeEnter: requireAuth,
      component: NewContract,
    },
    {
      path: '/gangs',
      name: 'gangs',
      beforeEnter: requireAuth,
      component: Gangs,
    },
    {
      path: '/gangs/gang/:id',
      name: 'gang',
      beforeEnter: requireAuth,
      component: Gang,
    },
    {
      path: '/gangs/gang/:id/settings',
      name: 'gang-settings',
      beforeEnter: requireAuth,
      component: GangSettings,
    },
    {
      path: '/gangs/gang/:id/buildings',
      name: 'gang-buildings',
      beforeEnter: requireAuth,
      component: GangBuildings,
    },
    {
      path: '/gangs/gang/:id/diplomacy',
      name: 'gang-diplomacy',
      beforeEnter: requireAuth,
      component: Diplomacy,
    },
    {
      path: '/gangs/gang/:id/deposit',
      name: 'gang-deposit',
      beforeEnter: requireAuth,
      component: GangDeposits,
    },
    {
      path: '/gangs/gang/:id/fights',
      name: 'gang-fights',
      beforeEnter: requireAuth,
      component: GangFights,
    },
    {
      path: '/shop',
      name: 'shop',
      beforeEnter: requireAuth,
      component: Shop,
    },
    {
      path: '/shop/tokens',
      name: 'tokens',
      beforeEnter: requireAuth,
      component: Tokens,
    },
    {
      path: '/market/withdraw',
      name: 'withdraw',
      beforeEnter: requireAuth,
      component: Withdraw,
    },
    {
      path: '/gangs/create',
      name: 'gang-create',
      beforeEnter: requireAuth,
      component: GangCreate,
    },
    {
      path: '/rewards',
      name: 'rewards',
      beforeEnter: requireAuth,
      component: Rewards,
    },
    {
      path: '/leaderboards',
      name: 'leaderboards',
      beforeEnter: requireAuth,
      component: Leaderboards,
    },
    {
      path: '/leaderboards/heist',
      name: 'heistboard',
      beforeEnter: requireAuth,
      component: Heistboard,
    },
    {
      path: '/leaderboards/fights',
      name: 'fightboard',
      beforeEnter: requireAuth,
      component: Fightboard,
    },
    {
      path: '/leaderboards/jobs',
      name: 'jobboard',
      beforeEnter: requireAuth,
      component: Jobboard,
    },
    {
      path: '/leaderboards/lottery',
      name: 'lottery',
      beforeEnter: requireAuth,
      component: LotteryBoard,
    },
    {
      path: '/leaderboards/cruelty',
      name: 'cruelty',
      beforeEnter: requireAuth,
      component: CrueltyBoard,
    },
    {
      path: '/map',
      name: 'map',
      beforeEnter: requireAuth,
      component: WMap,
    },
    {
      path: '/map/territory',
      name: 'territory',
      beforeEnter: requireAuth,
      component: Territory,
    },
    {
      path: '/settings',
      name: 'settings',
      beforeEnter: requireAuth,
      component: Settings,
    },
    {
      path: '/referral',
      name: 'referral',
      beforeEnter: requireAuth,
      component: Referral,
    },
    {
      path: '/settings/privacy',
      name: 'privacy',
      beforeEnter: requireAuth,
      component: Privacy,
    },
    {
      path: '/settings/history',
      name: 'history',
      beforeEnter: requireAuth,
      component: History,
    },
    {
      path: '/settings/building',
      name: 'deletebuilding',
      beforeEnter: requireAuth,
      component: DeleteBuilding,
    },

    {
      path: '/about',
      name: 'about',
      beforeEnter: requireAuth,
      component: About,
    },
    {
      path: '/help',
      name: 'help',
      component: GetStarted,
    },
    {
      path: '/help/getstarted',
      name: 'getstarted',
      beforeEnter: requireAuth,
      component: Help,
    },
    {
      path: '/help/guides',
      name: 'guides',
      beforeEnter: requireAuth,
      component: Guides,
    },
    {
      path: '/help/earlyaccess',
      name: 'earlyaccess',
      beforeEnter: requireAuth,
      component: EarlyAccess,
    },
    {
      path: '*',
      component: Error404,

    },
  ],
});
