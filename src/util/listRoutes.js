import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import ForgotPassword from '~/pages/ForgotPassword';
import ChangePassword from '~/pages/ChangePassword';
import Activated from '~/pages/Activated';



// list route partner
const listRoutePartner = listPartnerIdHospital.map(item => {
  return {
    id: item,
    path: `/${item}`,
    childDynamic: listRouteDynamic.map(current => {
      return {
        ...current,
        id: `${item}-${current.id}`
      };
    })
  };
});

// list total route
const listRouters = [
  {
    id: 1,
    path: "/",
    component: Home,
    authorized: false,
    breadcrumb: false,
    childDynamic: null,
    exact: true
  },
  {
    id: 2,
    path: "/thong-tin-tai-khoan",
    component: Profile,
    authorized: false,
    breadcrumb: false,
    childDynamic: null,
    exact: true
  },
  {
    id: 3,
    path: "/dang-nhap",
    component: FaqDetail,
    authorized: false,
    breadcrumb: false,
    childDynamic: null,
    exact: true
  },
  {
    id: 4,
    path: "/dang-ky",
    component: Contact,
    authorized: false,
    breadcrumb: false,
    childDynamic: null,
    exact: true
  },
  {
    id: 5,
    path: "/gioi-thieu",
    component: Introduce,
    authorized: false,
    breadcrumb: false,
    childDynamic: null,
    exact: true
  },
  {
    id: 6,
    path: "/chon-chuyen-khoa",
    component: ChooseSpecialty,
    authorized: false,
    breadcrumb: true,
    childDynamic: null,
    exact: true
  },
  {
    id: 6,
    path: "/chon-lich-kham",
    component: ChooseCalendar,
    authorized: false,
    breadcrumb: true,
    childDynamic: null,
    exact: true
  },
  {
    id: 7,
    path: "/chon-ho-so",
    component: ChoosePatient,
    authorized: false,
    breadcrumb: true,
    childDynamic: null,
    exact: true
  },
  {    
    id: 7,
    path: "/xac-nhan-thong-tin",
    component: TrustInformation,
    authorized: false,
    breadcrumb: true,
    childDynamic: null,
    exact: true
  },
  {
    id: 8,
    path: "/hinh-thuc-thanh-toan",
    component: PaymentMethod,
    authorized: false,
    breadcrumb: true,
    exact: true
  },
];

export default listRouters.concat(listRoutePartner);
