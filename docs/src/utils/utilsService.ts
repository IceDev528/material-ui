import { UtilsLib } from '../App';

export const createUtilsService = (lib: UtilsLib) => ({
  getFormatString(formats: { moment: string; dateFns: string; luxon?: string }) {
    switch (lib) {
      case 'date-fns':
        return formats.dateFns;
      case 'luxon':
        return formats.luxon || formats.dateFns;
      case 'moment':
        return formats.moment;
      default:
        return formats.dateFns;
    }
  },
});

export type UtilsService = ReturnType<typeof createUtilsService>;
