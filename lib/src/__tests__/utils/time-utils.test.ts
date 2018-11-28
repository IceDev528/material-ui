import { convertToMeridiem, getHours, getMinutes } from '../../_helpers/time-utils';
import { utilsToUse } from '../test-utils';

describe('Time utils', () => {
  it('Should properly calculate hours', () => {
    expect(getHours(25, 50, false)).toBe(10);
  });

  it('Should properly calculate minutes', () => {
    expect(getMinutes(25, 50)).toBe(51);
  });

  it('Should convert time to meridiem', () => {
    const time = convertToMeridiem(utilsToUse.date('2017-01-01T16:00'), 'am', true, utilsToUse);
    expect(utilsToUse.getHours(time)).toBe(4);
  });
});
