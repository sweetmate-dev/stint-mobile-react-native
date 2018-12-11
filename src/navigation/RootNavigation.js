import {
  Easing,
  Animated
} from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'
import { flipY, zoomIn } from 'react-navigation-transitions';

import { 
  WelcomeScreen, 
  LetsDoThisScreen,
  SignInScreen,
  ForgotPasswordScreen,
  BusinessHomeScreen,
  StudentHomeScreen,
  SignUpStudentStep1,
  SignUpStudentPopUp,
  SignUpStudentStep2,
  SignUpVerify,
  SignUpBusinessScreen,
  PostScreen,
  SelectTitle,
  InstructionScreen,
  EditInstruction,
  CheckOutScreen,
  PostOptionScreen,
  DirectDebitScreen,
  ConfirmPostScreen,
  MatchScreen,
  BusinessSettingScreen,
  CompleteProfileScreen,
  CompletePhotoScreen,
  CompletePaymentScreen,
  CompleteAddPaymentScreen,
  CompleteMobileNumberScreen,
  CompletedProfileScreen,
  CreateBusinessWelcomeScreen,
  CreateBusinessScreen,
  CreateBusinessLogoScreen,
  CompleteBusinessDetailScreen,
  SelectCountryScreen,
  CreateBusinessPaymentScreen,
  CreateBusinessPaymentAddScreen,
  MyStintListScreen,
  MyStintScreen,
  InviteTeamMemberScreen,
  BusinessPersonalDetailScreen,
  BusinessDetailScreen,
  PaymentDetailScreen,
  BusinessDetailsAddCardScreen,
  ShowTeamMemberScreen,
  HelpCenterScreen,
  TermsAndConditionsScreen,
  PrivacyAndPolicyScreen,
  MyStintGuideScreen,
  MyStintEditGuideScreen
} from './routes'

export function fromBottom(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initHeight } = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initHeight, 0, 0],
      });

      const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

      return { opacity, transform: [{ translateY }] };
    },
  };
}

const CompletePaymentStack = createStackNavigator(
  {
    // MainApp: AppRootNavigation, 
    CompletePayment: CompletePaymentScreen,
    AddPayment: CompleteAddPaymentScreen,
    /* add routes here where you want the drawer to be locked */
  },
  {
    headerMode: 'none',
    transitionConfig: () => zoomIn(300)
  }
)

const CompleteProfileStack = createStackNavigator(
  {
    // MainApp: AppRootNavigation,       
    CompleteProfile: CompleteProfileScreen,
    CompletePhoto: CompletePhotoScreen,
    CompletePayment: CompletePaymentStack,
    CompleteMobile: CompleteMobileNumberScreen,
    CompletedProfile: CompletedProfileScreen
    /* add routes here where you want the drawer to be locked */
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

const CreateBusinessStack = createStackNavigator(
  {
    // MainApp: AppRootNavigation,       
    CreateBusiness: CreateBusinessWelcomeScreen,
    CreateBusinessStep: CreateBusinessScreen,
    CreateBusinessLogo: CreateBusinessLogoScreen,
    CreateBusinessDetail: CompleteBusinessDetailScreen,
    CreateBusinessSelectCountry: SelectCountryScreen,
    CreateBusinessPayment: CreateBusinessPaymentScreen,
    CreateBusinessPaymentCreate: CreateBusinessPaymentAddScreen,
    CompletedBusiness: CompletedProfileScreen
    /* add routes here where you want the drawer to be locked */
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

const BusinessPostStack = createStackNavigator(
  {
    // MainApp: AppRootNavigation,       
    Post: PostScreen,
    SelectTitle: SelectTitle,
    GiveInstruction: InstructionScreen,
    EditInstruction: EditInstruction,
    CheckOut: CheckOutScreen,
    PostOption: PostOptionScreen,
    DirectDebit: DirectDebitScreen,
    Confirm: ConfirmPostScreen,
    Match: MatchScreen,
    /* add routes here where you want the drawer to be locked */
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

const BusinessStack = createStackNavigator(
  {
    // MainApp: AppRootNavigation,
    
    Home: BusinessHomeScreen,
    Post: BusinessPostStack,
    Settings: BusinessSettingScreen,
    CompleteProfile: CompleteProfileStack,
    CreateBusiness: CreateBusinessStack,
    // settings
    MyStintList: MyStintListScreen,
    MyStint: MyStintScreen,
    MyStintGuide: MyStintGuideScreen,
    MyStintEditGuide: MyStintEditGuideScreen,
    InviteMember: InviteTeamMemberScreen,
    PersonalDetails: BusinessPersonalDetailScreen,
    BusinessDetails: BusinessDetailScreen,
    BusinessDetailSelectCountry: SelectCountryScreen,
    PaymentDetails: PaymentDetailScreen,
    PaymentDetailsAddCard: BusinessDetailsAddCardScreen,
    ShowTeamMember: ShowTeamMemberScreen,
    HelpCenter: HelpCenterScreen,
    TermsAndConditions: TermsAndConditionsScreen,
    PrivacyPolicy: PrivacyAndPolicyScreen
    /* add routes here where you want the drawer to be locked */
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

const StudentStack = createStackNavigator(
  {
    Home: StudentHomeScreen
  },
  {
    headerMode: 'none'
  }
)

const SignUpStudentStack = createStackNavigator(
  {
    Step1: SignUpStudentStep1,
    SelectUniversity: SignUpStudentPopUp,
    Step2: SignUpStudentStep2,
    Verify: SignUpVerify
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

const SignUpBusinessStack = createStackNavigator(
  {
    SignUpBusiness: SignUpBusinessScreen,
    Verify: SignUpVerify,
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

const AppStack = createStackNavigator(
  {
    // MainApp: AppRootNavigation,
    Welcome: WelcomeScreen,
    TodoThis: LetsDoThisScreen,
    SignIn: SignInScreen,
    ForgotPassword: ForgotPasswordScreen,
    SignUpStudent: SignUpStudentStack,
    SignUpBusiness: SignUpBusinessStack,
    Business: BusinessStack,
    Student: StudentStack
    /* add routes here where you want the drawer to be locked */
  },
  {
    headerMode: 'none',
    transitionConfig: () => fromBottom()
  }
)

// // initial route, show welcome if not logged in already
// const RootSwitchNavigation = createSwitchNavigator(
//   {
//     Landing: {
//       screen: LetsDoThisScreen,
//       navigationOptions: {
//         drawerLockMode: 'locked' // here
//       }
//     },
//     SignUp: { screen: ChatScreen }
//   },
//   {
//     headerMode: 'none',
//     initialRouteParams: {}

//   }
// )

// const SignUpStackNavigation = createStackNavigator(
//   {
//     LetsDoThis: {
//       screen: LetsDoThisScreen
//     },
//     // sign up as student business
//     SignUpStudent:{
//       screen: SignUpStudent
//     },
//     BusinessSignUp:{
//       screen: BusinessSignUp
//     }
//   },
//   {
//     headerMode: 'none'
//   }
// )


// StudentNavigationStack  = createStackNavigator({
//   StudentHome:{
//     screen: StudentHomeScreen
//   },
  

// });

// BusinessNavigationStack  = createStackNavigator({
//   BusinessHome:{
//     screen: BusinessHomeScreen
//   },

// });

// UserTypeStackNavigator = createStackNavigator({
//   StudentProfile:{
//     screen: StudentNavigationStack
//   },
//   BusinessProfile: {
//     screen: BusinessNavigationStack
//   }
// })

// // main application navigation once signed in
// const AppRootNavigation = createDrawerNavigator(
//   {
//     RootSwitch: {
//       screen: RootSwitchNavigation
//     }
//   },
//   {
//     contentComponent: DrawerContent,
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle',
//     navigationOptions: {
//       gesturesEnabled: false
//     }
//   }
// )

export default AppStack
