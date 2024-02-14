import { environment } from '../../../environments/environment';

export class Constants {
  public static HOST = 'http://localhost:8080';
  public static APPNAME = environment.appName;
  public static APPPASSWORD = environment.appPassword;
}


/*
export class Constants {
  public static HOST = environment.host;
  public static APPNAME = environment.appName;
  public static APPPASSWORD = environment.appPassword;
}
 */

