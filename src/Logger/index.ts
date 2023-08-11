
import chalk from 'chalk';


const getPrefix = () => {
  return `${chalk.bold.cyan(`[${new Date().toISOString()}]`)} ${chalk.bold.yellow('[socket]')}`;
};

class Logger {
  public static instance?: typeof console;

  public static prefix() {
    return getPrefix();
  }

  public static setInstance(inst?: typeof console) {
    Logger.instance = inst;
  }

  public static error = (...rest: any): void => {
    if (Logger.instance) {
      Logger.instance.error.call(Logger.instance.error, Logger.prefix(), ...rest);
    }
  };

  public static info = (...rest: any): void => {
    if (Logger.instance) {
      Logger.instance.info.call(Logger.instance.info, Logger.prefix(), ...rest);
    }
  };

  public static debug = (...rest: any): void => {
    if (Logger.instance) {
      Logger.instance.debug.call(Logger.instance.debug, Logger.prefix(), ...rest);
    }
  };

  public static warn = (...rest: any): void => {
    if (Logger.instance) {
      Logger.instance.warn.call(Logger.instance.warn, Logger.prefix(), ...rest);
    }
  };

  public static log = (...rest: any): void => {
    if (Logger.instance) {
      Logger.instance.log.call(Logger.instance.log, Logger.prefix(), ...rest);
    }
  };

  
}


export default Logger;
