/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js';

describe('testing pushToHistory', () => {
    test('settings test', () => {
        expect(pushToHistory('settings')).toBe(history);
    });

    test('entry test', () => {
        expect(pushToHistory('entry',7)).toBe(history);
    });

    test('default test', () => {
        expect(pushToHistory('main')).toBe(history);
    });
});