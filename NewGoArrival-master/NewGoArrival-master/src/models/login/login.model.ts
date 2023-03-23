import { CompanyLogin } from "./company-login.model";
import { CostCenter } from "./cost-center.model";
import { DocumentLogin } from "./document.model";
import { MenuLogin } from "./menu.model";
import { Role } from "./role.model";

export interface Login {
  allowedAccess: boolean;
  email: string;
  gender: string;
  isActive: boolean;
  lcostCenter: CostCenter[];
  lmenu: MenuLogin[];
  loginUser: string;
  oagency: any;
  ocompany: CompanyLogin;
  odocument: DocumentLogin;
  oerror: any;
  orole: Role;
  partnerClub: boolean;
  personId: string;
  phoneNumber: string;
  requiredChangePassword: boolean;
  travelerCode: string;
  userId: string;
  userLastName: string;
  userName: string;
  vip: boolean;
}